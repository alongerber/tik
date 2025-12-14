import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import LoadingSpinner from '../../shared/LoadingSpinner'
import BeforeAfter from '../../shared/BeforeAfter'
import CaseStudy from '../../shared/CaseStudy'

const mockReportData = {
  period: '8-14 דצמבר 2024',
  summary: {
    totalShipments: 47,
    onTime: 43,
    delayed: 4,
    revenue: '₪2,340,000',
    avgTransitTime: '4.2 ימים'
  },
  highlights: [
    { type: 'success', text: 'שיפור של 12% בזמני מעבר מכס' },
    { type: 'success', text: '3 לקוחות חדשים הצטרפו השבוע' },
    { type: 'warning', text: 'עיכוב בנמל אשדוד - השפעה על 4 משלוחים' },
    { type: 'success', text: 'חיסכון של 18% בעלויות הובלה יבשתית' }
  ],
  topClients: [
    { name: 'אלקטרה', shipments: 12, revenue: '₪580,000' },
    { name: 'שטראוס', shipments: 8, revenue: '₪420,000' },
    { name: 'טבע', shipments: 7, revenue: '₪380,000' }
  ],
  issues: [
    { vessel: 'MSC DIANA', issue: 'עיכוב 48 שעות בנמל פיראוס', impact: '3 משלוחים', action: 'עדכון לקוחות בוצע' },
    { vessel: 'COSCO SHIPPING', issue: 'תיעוד מכס חסר', impact: 'משלוח 1', action: 'הושלם' }
  ],
  nextWeek: [
    '12 משלוחים צפויים להגעה',
    'ביקור לקוח - אלקטרה (יום ג\')',
    'חידוש חוזה עם ספק הובלה'
  ]
}

export default function ReportGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState('current')

  const generateReport = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setReport(mockReportData)
    setIsLoading(false)
  }

  const handleTryExample = () => {
    generateReport()
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
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                מחולל דוחות שבועיים
              </h1>
              <p className="text-gray-400 mt-1">
                דוח מנהלים מוכן בלחיצת כפתור - עם גרפים, מגמות וחריגים
              </p>
            </div>
          </div>
        </div>

        <BeforeAfter
          before={{
            time: '3 שעות',
            description: 'איסוף נתונים מ-5 מערכות, עיצוב בוורד, בדיקות'
          }}
          after={{
            time: '30 שניות',
            description: 'לחיצה אחת - דוח מוכן עם כל הנתונים'
          }}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Input Panel */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">הגדרות דוח</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">תקופה</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="current">השבוע הנוכחי</option>
                  <option value="last">שבוע שעבר</option>
                  <option value="month">חודש אחרון</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['משלוחים', 'הכנסות', 'עיכובים', 'לקוחות'].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                    <input type="checkbox" defaultChecked className="rounded bg-slate-700 border-slate-600" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateReport}
                disabled={isLoading}
                className="flex-1 btn-glow px-6 py-3 rounded-xl text-white font-medium disabled:opacity-50"
              >
                <span className="relative z-10">צור דוח</span>
              </button>
              <button
                onClick={handleTryExample}
                disabled={isLoading}
                className="px-6 py-3 glass rounded-xl text-white font-medium hover:bg-white/10 transition-all"
              >
                נסו דוגמה
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="glass-card rounded-2xl p-6 min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400">מייצר דוח...</p>
              </div>
            ) : report ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">דוח שבועי</h3>
                    <p className="text-gray-400 text-sm">{report.period}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold gradient-text">{report.summary.totalShipments}</div>
                    <div className="text-xs text-gray-400">משלוחים</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{report.summary.onTime}</div>
                    <div className="text-xs text-gray-400">בזמן</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{report.summary.delayed}</div>
                    <div className="text-xs text-gray-400">עיכוב</div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">נקודות עיקריות</h4>
                  <div className="space-y-2">
                    {report.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        {item.type === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        )}
                        <span className="text-gray-300">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Clients Mini */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">לקוחות מובילים</h4>
                  <div className="space-y-1">
                    {report.topClients.slice(0, 3).map((client, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-400">{client.name}</span>
                        <span className="text-white">{client.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                <p>לחץ "נסו דוגמה" לראות דוח לדוגמה</p>
              </div>
            )}
          </div>
        </div>

        <CaseStudy
          title="איך זה עובד בפועל"
          context="כל יום ראשון בבוקר הייתי מבלה 3 שעות באיסוף נתונים מאקסלים שונים, מערכת ה-ERP, ומיילים - רק כדי להכין דוח שבועי למנהל."
          solution="בניתי מחולל שמושך את כל הנתונים אוטומטית, מזהה חריגים, ומייצר דוח מעוצב."
          result="היום הדוח מוכן ב-30 שניות. והכי חשוב - הוא עקבי ולא מפספס כלום."
        />
      </div>
    </div>
  )
}
