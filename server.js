// Development server with Claude API proxy
// Run with: node server.js

import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const PROMPTS = {
  document: `Analyze this document image and extract all structured data. Return a JSON object with:
- document_type: the type of document (Invoice, Purchase Order, Contract, Bill of Lading, Manifest, Receipt, or Other)
- confidence: your confidence score from 0 to 1
- fields: an object containing extracted fields like document_number, date, due_date, vendor_name, vendor_address, total_amount, currency, etc.
- line_items: an array of items if applicable, each with description, quantity, unit_price, and total

Return ONLY valid JSON, no additional text.`,

  email: `Analyze this email and extract structured information. Return a JSON object with:
- priority: "HIGH", "MEDIUM", or "LOW" based on urgency indicators
- tags: an array of relevant category tags (e.g., "urgent", "client", "finance", "deadline")
- tasks: an array of identified action items, each with task, deadline (if mentioned), and assignee (if mentioned)
- summary: a 1-2 sentence summary of the email's main points
- suggested_reply: a professional reply addressing the key points

Return ONLY valid JSON, no additional text.`,

  meeting: `Analyze this meeting transcript and extract structured outcomes. Return a JSON object with:
- summary: a 2-3 sentence summary of what was discussed
- decisions: an array of decisions made, each with decision text and owner (if mentioned)
- action_items: an array of tasks, each with task, owner (if mentioned), and deadline (if mentioned)
- open_questions: an array of unresolved items, each with question and status

Return ONLY valid JSON, no additional text.`,

  proposal: `Based on the provided project details, generate professional proposal content. Return a JSON object with:
- executive_summary: 2-3 sentences summarizing the proposal's value proposition
- scope_of_work: an array of 5-7 scope items describing what will be done
- deliverables: an array of 4-6 specific deliverables the client will receive
- timeline_breakdown: an array of phases, each with phase name, duration, and description
- terms: an array of 3-5 standard terms and conditions

Return ONLY valid JSON, no additional text.`,
}

app.post('/api/analyze', async (req, res) => {
  const { type, content, mimeType } = req.body

  if (!type || !content) {
    return res.status(400).json({ error: 'Missing type or content' })
  }

  if (!PROMPTS[type]) {
    return res.status(400).json({ error: 'Invalid analysis type' })
  }

  try {
    let messages

    if (type === 'document') {
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType || 'image/png',
                data: content,
              },
            },
            {
              type: 'text',
              text: PROMPTS.document,
            },
          ],
        },
      ]
    } else if (type === 'proposal') {
      messages = [
        {
          role: 'user',
          content: `Generate a professional proposal based on these details:

Client: ${content.clientName}
Contact: ${content.contactName}
Project Type: ${content.projectType}
Description: ${content.description}
Timeline: ${content.timeline}
Price: ${content.currency} ${content.price}

${PROMPTS.proposal}`,
        },
      ]
    } else {
      messages = [
        {
          role: 'user',
          content: `${PROMPTS[type]}\n\nContent to analyze:\n${content}`,
        },
      ]
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages,
    })

    const textContent = response.content.find((c) => c.type === 'text')
    if (!textContent) {
      throw new Error('No text response from Claude')
    }

    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response')
    }

    const result = JSON.parse(jsonMatch[0])
    return res.json(result)
  } catch (error) {
    console.error('Claude API error:', error)
    return res.status(500).json({
      error: 'Failed to process request',
      details: error.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
