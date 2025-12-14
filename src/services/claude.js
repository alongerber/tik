// Claude API service for frontend
// All actual API calls go through the backend endpoint to protect the API key

const API_BASE = '/api'

export async function analyzeDocument(imageBase64, mimeType = 'image/png') {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'document',
      content: imageBase64,
      mimeType,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze document')
  }

  return response.json()
}

export async function analyzeEmail(emailText) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'email',
      content: emailText,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze email')
  }

  return response.json()
}

export async function analyzeMeeting(transcript) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'meeting',
      content: transcript,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze meeting')
  }

  return response.json()
}

export async function generateProposal(formData) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'proposal',
      content: formData,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate proposal')
  }

  return response.json()
}

export async function askFAQBot(question, conversationHistory = []) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'faq',
      content: question,
      history: conversationHistory,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get FAQ response')
  }

  return response.json()
}
