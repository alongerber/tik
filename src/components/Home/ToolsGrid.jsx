import { Link } from 'react-router-dom'
import { FileText, Mail, Users, FileEdit, ArrowLeft, Zap, BarChart3, MessageCircle } from 'lucide-react'

export default function ToolsGrid() {
  const tools = [
    {
      icon: FileText,
      title: 'מעבד מסמכים חכם',
      description: 'חילוץ נתונים מובנים מחשבוניות, הזמנות רכש וחוזים באופן אוטומטי.',
      path: '/tools/documents',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Mail,
      title: 'מרכז פיקוד אימיילים',
      description: 'הפיכת אימיילים כאוטיים לרשימת משימות ברורה עם עדיפויות ותגיות.',
      path: '/tools/email',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'ממיר פגישות לפעולות',
      description: 'הפיכת תמלולי פגישות לסיכומים, החלטות ומשימות מובנות.',
      path: '/tools/meetings',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FileEdit,
      title: 'מחולל הצעות מחיר',
      description: 'יצירת הצעות מחיר מקצועיות תוך שניות מקלט פשוט.',
      path: '/tools/proposals',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: BarChart3,
      title: 'מחולל דוחות שבועיים',
      description: 'דוח מנהלים מוכן בלחיצת כפתור - עם גרפים, מגמות וחריגים.',
      path: '/tools/reports',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MessageCircle,
      title: 'עוזר נהלים פנימי',
      description: 'תשובות מיידיות על נהלי יבוא, מכס ולוגיסטיקה - בלי לחפש במיילים.',
      path: '/tools/faq',
      gradient: 'from-violet-500 to-purple-500',
    },
  ]

  return (
    <section id="tools" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 text-sm text-purple-300">
            <Zap className="w-4 h-4" />
            אוטומציה בפעולה
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">כלי אוטומציה</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            כלים שבניתי כדי לחסוך זמן על משימות שחוזרות על עצמן.
            <br />
            <span className="text-gray-300">לחצו "נסו דוגמה" - בלי צורך להעלות קבצים.</span>
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.path}
              state={{ scrollToDemo: true }}
              className="group glass-card rounded-2xl p-8 card-shine block"
            >
              {/* Icon with gradient background */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} p-0.5 mb-6`}>
                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                {tool.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="font-medium">נסו עכשיו</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
