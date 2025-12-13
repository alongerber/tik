import { useState } from 'react'
import { Check, Copy, Circle } from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../shared/Card'
import Button from '../../shared/Button'
import { copyToClipboard } from '../../../utils/pdfGenerator'

export default function AnalysisResults({ data }) {
  const [copied, setCopied] = useState(false)

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Paste an email or try the example to see analysis</p>
      </div>
    )
  }

  const { priority, tags, tasks, summary, suggested_reply } = data

  const priorityColors = {
    HIGH: 'bg-red-100 text-red-700 border-red-200',
    MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    LOW: 'bg-green-100 text-green-700 border-green-200',
  }

  const handleCopyReply = async () => {
    await copyToClipboard(suggested_reply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px]">
      {/* Priority Badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium ${priorityColors[priority] || priorityColors.MEDIUM}`}
      >
        <Circle className="w-3 h-3 fill-current" />
        PRIORITY: {priority}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-[#1e3a5f]">Summary</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Tasks */}
      {tasks && tasks.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-[#1e3a5f]">Tasks Identified</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tasks.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{item.task}</p>
                    {item.deadline && (
                      <p className="text-sm text-gray-500">Due: {item.deadline}</p>
                    )}
                    {item.assignee && (
                      <p className="text-sm text-gray-500">Assigned to: {item.assignee}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Suggested Reply */}
      {suggested_reply && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1e3a5f]">Suggested Reply</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyReply}
                className="gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Reply
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap">{suggested_reply}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
