import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Sparkles, Copy, Check, Circle } from 'lucide-react'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { analyzeEmail } from '../../../services/claude'
import { exampleEmail, mockEmailResponse } from '../../../data/examples'

export default function EmailCenter() {
  const [emailText, setEmailText] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!emailText.trim()) return
    setIsLoading(true)
    try {
      const response = await analyzeEmail(emailText)
      setResults(response)
    } catch (err) {
      setResults(mockEmailResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setEmailText(exampleEmail)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setResults(mockEmailResponse)
    setIsLoading(false)
  }

  const handleCopyReply = async () => {
    if (results?.suggested_reply) {
      await navigator.clipboard.writeText(results.suggested_reply)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const priorityColors = {
    HIGH: 'from-red-500 to-orange-500',
    MEDIUM: 'from-yellow-500 to-amber-500',
    LOW: 'from-green-500 to-emerald-500',
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">מרכז פיקוד אימיילים</h1>
            <p className="text-gray-400 mt-1">הפיכת אימיילים כאוטיים לרשימת משימות ברורה</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="glass-card rounded-2xl p-6 min-h-[500px] flex flex-col">
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="הדביקו כאן תוכן אימייל..."
              disabled={isLoading}
              className="flex-1 w-full p-4 bg-white/5 border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 disabled:opacity-50"
            />
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
              <button onClick={handleTryExample} disabled={isLoading} className="flex-1 glass px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                נסו דוגמה
              </button>
              <button onClick={handleAnalyze} disabled={isLoading || !emailText.trim()} className="flex-1 btn-glow px-4 py-3 rounded-xl text-white font-medium disabled:opacity-50">
                <span className="relative z-10">נתח</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl p-6 min-h-[500px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400">מנתח אימייל...</p>
              </div>
            ) : results ? (
              <div className="space-y-4 h-full overflow-y-auto">
                {/* Priority */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${priorityColors[results.priority]} text-white font-medium`}>
                  <Circle className="w-3 h-3 fill-current" />
                  עדיפות: {results.priority === 'HIGH' ? 'גבוהה' : results.priority === 'MEDIUM' ? 'בינונית' : 'נמוכה'}
                </div>

                {/* Tags */}
                {results.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {results.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 glass rounded-full text-sm text-blue-300">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Summary */}
                {results.summary && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">סיכום</h4>
                    <p className="text-gray-400">{results.summary}</p>
                  </div>
                )}

                {/* Tasks */}
                {results.tasks?.length > 0 && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">משימות שזוהו</h4>
                    <ul className="space-y-3">
                      {results.tasks.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded border-2 border-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-300">{item.task}</p>
                            {item.deadline && <p className="text-sm text-gray-500">עד: {item.deadline}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Reply */}
                {results.suggested_reply && (
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">תשובה מוצעת</h4>
                      <button onClick={handleCopyReply} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
                        {copied ? <><Check className="w-4 h-4 text-green-400" /> הועתק</> : <><Copy className="w-4 h-4" /> העתק</>}
                      </button>
                    </div>
                    <p className="text-gray-400 whitespace-pre-wrap text-sm">{results.suggested_reply}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>הדביקו אימייל או נסו את הדוגמה</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
