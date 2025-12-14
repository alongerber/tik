import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Award, Zap, TrendingUp, Target } from 'lucide-react'
import { useState } from 'react'

const timelineEvents = [
  {
    year: '2016',
    title: 'התחלה בקוראל',
    role: 'רכז תפעול',
    description: 'הצטרפתי לצוות התפעול. התחלתי ללמוד את עולם הספנות מאפס - תיעוד מכס, תיאום משלוחים, עבודה מול נמלים.',
    icon: Briefcase,
    achievement: 'למדתי 3 מערכות תוך חודשיים',
    color: 'blue'
  },
  {
    year: '2017',
    title: 'הבעיה הראשונה שפתרתי',
    role: 'רכז תפעול',
    description: 'שמתי לב שכל יום אנחנו מעתיקים את אותם נתונים בין 3 מערכות. בניתי אקסל שעושה את זה אוטומטית.',
    icon: Zap,
    achievement: 'חיסכון של שעתיים ביום לצוות',
    color: 'emerald'
  },
  {
    year: '2018',
    title: 'התמחות בתיעוד מכס',
    role: 'רכז תפעול בכיר',
    description: 'התמקדתי בתהליכי שחרור מכס. הפכתי למומחה הצוות בכל מה שקשור לתיעוד יבוא ופטורים.',
    icon: Award,
    achievement: 'צמצום טעויות בתיעוד ב-60%',
    color: 'purple'
  },
  {
    year: '2019',
    title: 'מערכת התראות ראשונה',
    role: 'רכז תפעול בכיר',
    description: 'בניתי מערכת שמתריעה על עיכובים צפויים לפי דפוסים שזיהיתי. התחלתי לראות את הכוח של נתונים.',
    icon: Target,
    achievement: 'זיהוי 80% מהעיכובים מראש',
    color: 'amber'
  },
  {
    year: '2020',
    title: 'אוטומציה של דוחות',
    role: 'רכז תפעול בכיר',
    description: 'הפכתי את הדוח השבועי מ-3 שעות עבודה ל-5 דקות. המנהל ביקש שאציג את זה להנהלה.',
    icon: TrendingUp,
    achievement: 'חיסכון של 150 שעות בשנה',
    color: 'cyan'
  },
  {
    year: '2021',
    title: 'כלים לכל הצוות',
    role: 'רכז תפעול בכיר',
    description: 'התחלתי לבנות כלים לא רק לעצמי. מערכת FAQ לעובדים חדשים, תבניות מסמכים, מחשבוני עלויות.',
    icon: Zap,
    achievement: 'הכשרת עובד חדש: מ-3 ימים ליום',
    color: 'blue'
  },
  {
    year: '2022',
    title: 'גילוי כלי ה-AI',
    role: 'רכז תפעול בכיר',
    description: 'התחלתי להשתמש בכלים חדשים שמאפשרים לבנות פתרונות בלי קוד. הבנתי שהגבול היחיד הוא הדמיון.',
    icon: Zap,
    achievement: 'בנייה של 5 כלים חדשים תוך חודש',
    color: 'purple'
  },
  {
    year: '2023',
    title: 'חשיבה מערכתית',
    role: 'רכז תפעול בכיר',
    description: 'הפסקתי לחשוב על "פתרון בעיות" והתחלתי לחשוב על "בניית מערכות". לא לתקן - למנוע.',
    icon: Target,
    achievement: 'צמצום פניות חוזרות ב-40%',
    color: 'emerald'
  },
  {
    year: '2024',
    title: 'תיק עבודות',
    role: 'מחפש את האתגר הבא',
    description: 'ריכזתי את כל הכלים והידע לתיק עבודות. הגיע הזמן להביא את הערך הזה למקום חדש.',
    icon: Award,
    achievement: 'האתר הזה',
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
            9 שנים של למידה, פתרון בעיות, ובניית כלים
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
            { value: '9', label: 'שנות ניסיון' },
            { value: '500+', label: 'משלוחים בשנה' },
            { value: '20+', label: 'כלים שנבנו' },
            { value: '∞', label: 'בעיות שנפתרו' }
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
