import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Award, Zap, TrendingUp, Target } from 'lucide-react'
import { useState } from 'react'

const timelineEvents = [
  {
    year: '2008',
    title: 'הולנד - בקרת איכות',
    role: 'מתאם קשרי חברות ובקרת איכות',
    description: 'בורסת הפרחים באלסמיר. פיקוח ובקרת איכות על שרשרת אספקה גלובלית בסביבה רב-תרבותית. כאן למדתי מה זה לוגיסטיקה בינלאומית.',
    icon: Award,
    achievement: 'ניהול QC לשרשרת אספקה גלובלית',
    color: 'blue'
  },
  {
    year: '2010',
    title: 'מנהל תפעול - סכיפהול',
    role: 'Operations Manager',
    description: 'Agriver / פרחים ישיר - נמל התעופה סכיפהול, הולנד. ניהול תפעולי של מרלו"ג כולל הובלת צוות של 20 עובדים. תכנון קווי הפצה בינלאומיים.',
    icon: Briefcase,
    achievement: 'ניהול צוות 20 עובדים',
    color: 'emerald'
  },
  {
    year: '2012',
    title: 'ZIM - לקוחות אסטרטגיים',
    role: 'מתאם לוגיסטיקה ולקוחות VIP',
    description: 'צים, חיפה. ניהול תיקי לקוחות אסטרטגיים (Key Accounts) ותמחור הסכמים מסחריים מורכבים. ניהול שרשרת אספקה מקצה לקצה. במקביל - לימודי הנדסת תוכנה בטכניון.',
    icon: Target,
    achievement: 'ניהול Key Accounts + לימודים',
    color: 'purple'
  },
  {
    year: '2016',
    title: 'קוראל - סוכן ספנות בכיר',
    role: 'Senior Shipping Agent',
    description: 'Coral Maritime Services, חיפה. ניהול אופרטיבי בכיר עבור 500+ אניות בשנה. אחריות ישירה על תיאום מול רשויות, פתרון משברים בזמן אמת, וניהול מו"מ מסחרי.',
    icon: TrendingUp,
    achievement: '500+ אניות בשנה',
    color: 'cyan'
  },
  {
    year: '2023',
    title: 'גילוי עולם האוטומציה',
    role: 'Senior Shipping Agent & Automation Lead',
    description: 'התחלתי לגלות כלים שמאפשרים לבנות פתרונות בלי רקע טכני. הבנתי שאפשר לקחת 15 שנות ניסיון תפעולי ולהפוך אותן לכלים שחוסכים זמן לכולם.',
    icon: Zap,
    achievement: 'בניית כלים פנימיים ראשונים',
    color: 'amber'
  },
  {
    year: '2024',
    title: 'אוטומציה בקנה מידה',
    role: 'Automation Lead',
    description: 'פיתוח כלי אוטומציה In-House שחסכו לארגון 200,000 ₪ בשנה. קיצור זמן הפקת דוחות מ-4 שעות ל-12 דקות. עיבוד מניפסטים משעות לשניות.',
    icon: Award,
    achievement: 'חיסכון 200,000 ₪ לארגון',
    color: 'gradient'
  }
]

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(null)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            המסע שלי
          </h1>
          <p className="text-xl text-gray-400">
            15+ שנים של לוגיסטיקה בינלאומית, ניהול תפעול, ואוטומציה
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />

          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 border-blue-500/50',
                emerald: 'from-emerald-500 to-emerald-600 border-emerald-500/50',
                purple: 'from-purple-500 to-purple-600 border-purple-500/50',
                amber: 'from-amber-500 to-amber-600 border-amber-500/50',
                cyan: 'from-cyan-500 to-cyan-600 border-cyan-500/50',
                gradient: 'from-blue-500 to-purple-500 border-blue-500/50'
              }

              const colors = colorClasses[event.color] || colorClasses.blue

              return (
                <div
                  key={index}
                  className={`relative flex gap-6 cursor-pointer transition-all duration-300 ${activeEvent === index ? 'scale-[1.02]' : ''}`}
                  onClick={() => setActiveEvent(activeEvent === index ? null : index)}
                  onMouseEnter={() => setActiveEvent(index)}
                  onMouseLeave={() => setActiveEvent(null)}
                >
                  {/* Year marker */}
                  <div className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${colors.split(' ')[0]} ${colors.split(' ')[1]} flex items-center justify-center shrink-0 shadow-lg`}>
                    <event.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 glass-card rounded-2xl p-6 border ${colors.split(' ')[2]} transition-all duration-300 ${activeEvent === index ? 'border-opacity-100 bg-white/5' : 'border-opacity-30'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold gradient-text">{event.year}</span>
                      <span className="text-sm text-gray-500">|</span>
                      <span className="text-sm text-gray-400">{event.role}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <Award className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-300">{event.achievement}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '15+', label: 'שנות ניסיון' },
            { value: '500+', label: 'אניות בשנה' },
            { value: '3', label: 'מדינות' },
            { value: '200K', label: '₪ חיסכון שנתי' }
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
