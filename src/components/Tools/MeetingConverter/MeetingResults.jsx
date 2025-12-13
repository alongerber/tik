import { useState } from 'react'
import { Check, Copy, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../shared/Card'
import Button from '../../shared/Button'
import { copyToClipboard, generatePDF } from '../../../utils/pdfGenerator'

export default function MeetingResults({ data }) {
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    decisions: true,
    actions: true,
    questions: true,
  })

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Paste a transcript or try the example to see results</p>
      </div>
    )
  }

  const { summary, decisions, action_items, open_questions } = data

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatForCopy = () => {
    let text = '# Meeting Summary\n\n'

    if (summary) {
      text += `## Summary\n${summary}\n\n`
    }

    if (decisions?.length) {
      text += '## Decisions\n'
      decisions.forEach((d) => {
        text += `- ${d.decision}${d.owner ? ` [${d.owner}]` : ''}\n`
      })
      text += '\n'
    }

    if (action_items?.length) {
      text += '## Action Items\n'
      action_items.forEach((a) => {
        text += `- ${a.task}${a.owner ? ` [${a.owner}]` : ''}${a.deadline ? ` - Due: ${a.deadline}` : ''}\n`
      })
      text += '\n'
    }

    if (open_questions?.length) {
      text += '## Open Questions\n'
      open_questions.forEach((q) => {
        text += `- ${q.question}${q.status ? ` (${q.status})` : ''}\n`
      })
    }

    return text
  }

  const handleCopyAll = async () => {
    await copyToClipboard(formatForCopy())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    generatePDF('meeting-results', 'meeting-summary.pdf')
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px]" id="meeting-results">
      {/* Summary */}
      {summary && (
        <Card>
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleSection('summary')}
          >
            <div className="flex items-center gap-2">
              {expandedSections.summary ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <h3 className="font-semibold text-[#1e3a5f]">SUMMARY</h3>
            </div>
          </CardHeader>
          {expandedSections.summary && (
            <CardContent>
              <p className="text-gray-600">{summary}</p>
            </CardContent>
          )}
        </Card>
      )}

      {/* Decisions */}
      {decisions && decisions.length > 0 && (
        <Card>
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleSection('decisions')}
          >
            <div className="flex items-center gap-2">
              {expandedSections.decisions ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <h3 className="font-semibold text-[#1e3a5f]">
                DECISIONS ({decisions.length})
              </h3>
            </div>
          </CardHeader>
          {expandedSections.decisions && (
            <CardContent>
              <ul className="space-y-3">
                {decisions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{item.decision}</p>
                      {item.owner && (
                        <p className="text-sm text-gray-500">{item.owner}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}

      {/* Action Items */}
      {action_items && action_items.length > 0 && (
        <Card>
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleSection('actions')}
          >
            <div className="flex items-center gap-2">
              {expandedSections.actions ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <h3 className="font-semibold text-[#1e3a5f]">
                ACTION ITEMS ({action_items.length})
              </h3>
            </div>
          </CardHeader>
          {expandedSections.actions && (
            <CardContent>
              <ul className="space-y-3">
                {action_items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-gray-700">
                        {item.task}
                        {item.owner && (
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded">
                            {item.owner}
                          </span>
                        )}
                      </p>
                      {item.deadline && (
                        <p className="text-sm text-gray-500">
                          Due: {item.deadline}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}

      {/* Open Questions */}
      {open_questions && open_questions.length > 0 && (
        <Card>
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleSection('questions')}
          >
            <div className="flex items-center gap-2">
              {expandedSections.questions ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <h3 className="font-semibold text-[#1e3a5f]">
                OPEN QUESTIONS ({open_questions.length})
              </h3>
            </div>
          </CardHeader>
          {expandedSections.questions && (
            <CardContent>
              <ul className="space-y-3">
                {open_questions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{item.question}</p>
                      {item.status && (
                        <p className="text-sm text-gray-500">{item.status}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}

      {/* Export Buttons */}
      <div className="flex gap-2 flex-wrap pt-2">
        <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopyAll}>
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
