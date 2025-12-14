import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Send, User, Bot } from 'lucide-react'
import BeforeAfter from '../../shared/BeforeAfter'
import CaseStudy from '../../shared/CaseStudy'

const faqDatabase = {
  'מה התהליך לשחרור מכס': {
    answer: 'תהליך שחרור מכס כולל: 1) הגשת רשימון יבוא למכס 2) בדיקת מסמכים (חשבון ספק, שטר מטען, תעודת מקור) 3) תשלום מיסים ואגרות 4) בדיקה פיזית (במידת הצורך) 5) שחרור המטען. זמן ממוצע: 2-3 ימי עבודה.',
    relatedTopics: ['מסמכים נדרשים', 'עלויות מכס', 'זמני שחרור']
  },
  'איך מחשבים מכס': {
    answer: 'חישוב מכס מבוסס על: ערך CIF (עלות + ביטוח + הובלה) × שיעור המכס לפי סיווג המוצר. לדוגמה: מוצר בערך $10,000 עם מכס 12% = $1,200. בנוסף יש מע"מ 17% על הסכום הכולל.',
    relatedTopics: ['סיווג מוצרים', 'פטורים ממכס', 'הסכמי סחר']
  },
  'מה עושים כשיש עיכוב': {
    answer: 'בעיכוב משלוח: 1) בדוק סטטוס באתר חברת הספנות 2) וודא שכל המסמכים הוגשו 3) בדוק אם יש בדיקה פיזית במכס 4) צור קשר עם הסוכן בנמל. טיפ: רוב העיכובים נגרמים ממסמכים חסרים - תמיד שלח רשימת בדיקה מראש.',
    relatedTopics: ['מעקב משלוחים', 'תקשורת עם לקוחות', 'פיצויים']
  },
  'מהם זמני הובלה מסין': {
    answer: 'זמני הובלה מסין לישראל: ימי (FCL) - 25-30 יום, ימי (LCL) - 30-35 יום, אווירי - 5-7 ימים, אקספרס - 3-4 ימים. הזמנים לא כוללים שחרור מכס. בתקופות עומס (לפני חגים סיניים) הוסף 5-7 ימים.',
    relatedTopics: ['עלויות הובלה', 'בחירת נמל', 'ביטוח מטען']
  },
  'מה ההבדל בין FCL ל-LCL': {
    answer: 'FCL (Full Container Load) - מכולה שלמה ללקוח אחד, משתלם מעל 15 קוב. LCL (Less than Container Load) - מטען משותף עם יבואנים אחרים, משתלם עד 10 קוב. FCL מהיר יותר ופחות סיכון לנזק, LCL גמיש יותר לכמויות קטנות.',
    relatedTopics: ['גדלי מכולות', 'תמחור הובלה', 'אריזה למשלוח']
  },
  'איך מתמודדים עם נזק למטען': {
    answer: 'בנזק למטען: 1) תעד הכל בתמונות מיד עם קבלה 2) רשום הסתייגות על שטר המטען 3) הגש תביעה לביטוח תוך 3 ימים 4) שמור את האריזה המקורית. חשוב: בלי תיעוד מיידי, קשה מאוד לקבל פיצוי.',
    relatedTopics: ['ביטוח מטען', 'תביעות', 'מניעת נזקים']
  }
}

const suggestedQuestions = [
  'מה התהליך לשחרור מכס',
  'איך מחשבים מכס',
  'מה עושים כשיש עיכוב',
  'מהם זמני הובלה מסין',
  'מה ההבדל בין FCL ל-LCL',
  'איך מתמודדים עם נזק למטען'
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

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase()
    for (const [key, value] of Object.entries(faqDatabase)) {
      if (lowerQuestion.includes(key.toLowerCase()) ||
          key.toLowerCase().includes(lowerQuestion) ||
          lowerQuestion.split(' ').some(word => key.toLowerCase().includes(word) && word.length > 3)) {
        return value
      }
    }
    return {
      answer: 'שאלה טובה! בהקשר של לוגיסטיקה וספנות, זה תלוי בכמה גורמים. אשמח לפרט אם תשאל על נושא ספציפי יותר - למשל מכס, זמני הובלה, או תיעוד.',
      relatedTopics: ['שחרור מכס', 'זמני הובלה', 'תיעוד משלוחים']
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = findAnswer(userMessage)
    setIsTyping(false)
    setMessages(prev => [...prev, {
      type: 'bot',
      text: response.answer,
      relatedTopics: response.relatedTopics
    }])
  }

  const handleSuggestion = (question) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
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
                תשובות מיידיות על נהלי יבוא, מכס ולוגיסטיקה - בלי לחפש במיילים
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
                            className="text-xs px-3 py-1 bg-slate-700/50 text-gray-400 rounded-full hover:bg-slate-700 hover:text-white transition-all"
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
                  placeholder="שאל שאלה על נהלים..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="btn-glow px-4 py-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 relative z-10" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">שאלות נפוצות</h3>
            <div className="space-y-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(q)}
                  className="w-full text-right px-4 py-3 bg-slate-800/50 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all text-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <CaseStudy
          title="למה בניתי את זה"
          context="עובדים חדשים היו שואלים את אותן שאלות שוב ושוב. 'איך מחשבים מכס?' 'מה עושים כשיש עיכוב?'. במקום לענות בפעם ה-50, או לשלוח אותם לחפש במסמכים מפוזרים..."
          solution="ריכזתי את כל הידע לבוט אחד שעונה מיד. כל תשובה מבוססת על ניסיון אמיתי מהשטח."
          result="הכשרת עובד חדש ירדה מ-3 ימים ליום אחד. והכי חשוב - התשובות עקביות."
        />
      </div>
    </div>
  )
}
