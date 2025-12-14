import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Send, User, Bot, Sparkles } from 'lucide-react'
import BeforeAfter from '../../shared/BeforeAfter'
import CaseStudy from '../../shared/CaseStudy'
import { askFAQBot } from '../../../services/claude'

const suggestedQuestions = [
  'מה זה תנאי FOB ואיך זה משפיע עליי?',
  'מה התהליך לשחרור מכס?',
  'איך מחשבים עלויות מכס?',
  'מה ההבדל בין FCL ל-LCL?',
  'מהם זמני הובלה מסין לישראל?',
  'מה עושים כשיש נזק למטען?'
]

export default function FAQBot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'שלום! אני יכול לעזור בשאלות על יבוא, מכס, לוגיסטיקה והובלה ימית. מה תרצה לדעת?'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setIsTyping(true)

    try {
      // Call Claude API
      const response = await askFAQBot(userMessage, messages)

      setMessages(prev => [...prev, {
        type: 'bot',
        text: response.answer,
        relatedTopics: response.relatedTopics
      }])
    } catch (error) {
      console.error('FAQ Bot error:', error)
      // Fallback response if API fails
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'מצטער, נתקלתי בבעיה טכנית. נסה שוב בעוד רגע, או שאל שאלה אחרת.',
        relatedTopics: ['שחרור מכס', 'זמני הובלה', 'תנאי מכר']
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestion = async (question) => {
    if (isTyping) return

    // Directly send the suggestion without going through input state
    setMessages(prev => [...prev, { type: 'user', text: question }])
    setIsTyping(true)

    try {
      const response = await askFAQBot(question, messages)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: response.answer,
        relatedTopics: response.relatedTopics
      }])
    } catch (error) {
      console.error('FAQ Bot error:', error)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'מצטער, נתקלתי בבעיה טכנית. נסה שוב בעוד רגע.',
        relatedTopics: ['שחרור מכס', 'זמני הובלה', 'תנאי מכר']
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                עוזר נהלים פנימי
              </h1>
              <p className="text-gray-400 mt-1">
                תשובות מיידיות על נהלי יבוא, מכס ולוגיסטיקה - מופעל על ידי Claude
              </p>
            </div>
          </div>
        </div>

        <BeforeAfter
          before={{
            time: '15-30 דקות',
            description: 'חיפוש בתיקיות, שאילת קולגות, חיטוט במיילים ישנים'
          }}
          after={{
            time: '10 שניות',
            description: 'שאלה → תשובה מיידית עם כל הפרטים'
          }}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Chat Window */}
          <div className="lg:col-span-2 glass-card rounded-2xl flex flex-col h-[500px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'text-left' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-gray-200'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.relatedTopics && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.relatedTopics.map((topic, j) => (
                          <button
                            key={j}
                            onClick={() => handleSuggestion(topic)}
                            disabled={isTyping}
                            className="text-xs px-3 py-1 bg-slate-700/50 text-gray-400 rounded-full hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-800 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="שאל שאלה על יבוא, מכס, לוגיסטיקה..."
                  disabled={isTyping}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="btn-glow px-4 py-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 relative z-10" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">נסו לשאול</h3>
            </div>
            <div className="space-y-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(q)}
                  disabled={isTyping}
                  className="w-full text-right px-4 py-3 bg-slate-800/50 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all text-sm disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              הבוט מופעל על ידי Claude ויכול לענות על כל שאלה בנושאי לוגיסטיקה, יבוא ומכס.
            </p>
          </div>
        </div>

        <CaseStudy
          title="למה בניתי את זה"
          context="עובדים חדשים היו שואלים את אותן שאלות שוב ושוב. 'איך מחשבים מכס?' 'מה עושים כשיש עיכוב?'. במקום לענות בפעם ה-50, או לשלוח אותם לחפש במסמכים מפוזרים..."
          solution="בניתי בוט חכם שמבין שאלות בשפה טבעית ונותן תשובות מקצועיות מבוססות על 15 שנות ניסיון בתחום."
          result="הכשרת עובד חדש ירדה מ-3 ימים ליום אחד. והכי חשוב - התשובות מקצועיות ועקביות."
        />
      </div>
    </div>
  )
}
