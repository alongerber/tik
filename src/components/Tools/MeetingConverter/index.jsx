import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Sparkles, Check, HelpCircle, Copy } from 'lucide-react'
import LoadingSpinner from '../../shared/LoadingSpinner'
import BeforeAfter from '../../shared/BeforeAfter'
import CaseStudy from '../../shared/CaseStudy'
import { analyzeMeeting } from '../../../services/claude'
import { exampleMeetingTranscript, mockMeetingResponse } from '../../../data/examples'

export default function MeetingConverter() {
  const [transcript, setTranscript] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleProcess = async () => {
    if (!transcript.trim()) return
    setIsLoading(true)
    try {
      const response = await analyzeMeeting(transcript)
      setResults(response)
    } catch (err) {
      setResults(mockMeetingResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setTranscript(exampleMeetingTranscript)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setResults(mockMeetingResponse)
    setIsLoading(false)
  }

  const handleCopyAll = async () => {
    if (!results) return
    const text = `סיכום: ${results.summary}\n\nהחלטות:\n${results.decisions?.map(d => `- ${d.decision}`).join('\n')}\n\nמשימות:\n${results.action_items?.map(a => `- ${a.task} [${a.owner || ''}]`).join('\n')}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">ממיר פגישות לפעולות</h1>
            <p className="text-gray-400 mt-1">הפיכת תמלולי פגישות לסיכומים, החלטות ומשימות</p>
          </div>
        </div>

        <BeforeAfter
          before={{
            time: '30 דקות',
            description: 'האזנה להקלטה, רישום נקודות, ארגון לפי נושאים, שליחת סיכום'
          }}
          after={{
            time: '20 שניות',
            description: 'הדבקת תמלול - סיכום, החלטות ומשימות מוכנים'
          }}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Input */}
          <div className="glass-card rounded-2xl p-6 min-h-[500px] flex flex-col">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="הדביקו כאן תמלול פגישה..."
              disabled={isLoading}
              className="flex-1 w-full p-4 bg-white/5 border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 disabled:opacity-50 font-mono text-sm"
            />
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
              <button onClick={handleTryExample} disabled={isLoading} className="flex-1 glass px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                נסו דוגמה
              </button>
              <button onClick={handleProcess} disabled={isLoading || !transcript.trim()} className="flex-1 btn-glow px-4 py-3 rounded-xl text-white font-medium disabled:opacity-50">
                <span className="relative z-10">עבד</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl p-6 min-h-[500px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400">מעבד תמלול...</p>
              </div>
            ) : results ? (
              <div className="space-y-4 h-full overflow-y-auto">
                {/* Summary */}
                {results.summary && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">סיכום</h4>
                    <p className="text-gray-400">{results.summary}</p>
                  </div>
                )}

                {/* Decisions */}
                {results.decisions?.length > 0 && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">החלטות ({results.decisions.length})</h4>
                    <ul className="space-y-3">
                      {results.decisions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-300">{item.decision}</p>
                            {item.owner && <p className="text-sm text-gray-500">{item.owner}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Items */}
                {results.action_items?.length > 0 && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">משימות ({results.action_items.length})</h4>
                    <ul className="space-y-3">
                      {results.action_items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                          <div>
                            <p className="text-gray-300">
                              {item.task}
                              {item.owner && <span className="mr-2 px-2 py-0.5 bg-white/10 text-gray-400 text-sm rounded">{item.owner}</span>}
                            </p>
                            {item.deadline && <p className="text-sm text-gray-500">עד: {item.deadline}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Open Questions */}
                {results.open_questions?.length > 0 && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">שאלות פתוחות ({results.open_questions.length})</h4>
                    <ul className="space-y-3">
                      {results.open_questions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-300">{item.question}</p>
                            {item.status && <p className="text-sm text-gray-500">{item.status}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Copy Button */}
                <button onClick={handleCopyAll} className="glass px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  {copied ? 'הועתק!' : 'העתק הכל'}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>הדביקו תמלול או נסו את הדוגמה</p>
              </div>
            )}
          </div>
        </div>

        <CaseStudy
          title="הסיפור מאחורי הכלי"
          context="אחרי כל פגישה עם ספקים או לקוחות, הייתי צריך לכתוב סיכום. לפעמים זה לקח יותר זמן מהפגישה עצמה. והכי גרוע - משימות היו נשכחות כי הן 'טמונות' בתוך שיחה."
          solution="כלי שמקבל תמלול (או הערות גסות) ומפיק סיכום מסודר עם החלטות ברורות ומשימות עם אחראים."
          result="אפס משימות שנפלו בין הכיסאות. וסיכומים שיוצאים תוך דקה אחרי הפגישה."
        />
      </div>
    </div>
  )
}
