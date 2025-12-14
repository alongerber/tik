import { Bot, Cpu, Zap, Ship, Target, Workflow } from 'lucide-react'

export default function About() {
  const capabilities = [
    { name: 'זיהוי צווארי בקבוק', icon: Target },
    { name: 'בניית פתרונות עם AI', icon: Bot },
    { name: 'אוטומציה של תהליכים', icon: Workflow },
    { name: 'חיבור בין מערכות', icon: Cpu },
  ]

  const highlights = [
    { icon: Ship, text: 'קוראל - ספנות ולוגיסטיקה בינלאומית' },
    { icon: Cpu, text: 'בניית מערכות אוטומציה מקצה לקצה' },
    { icon: Bot, text: 'שימוש בכלי AI להשגת תוצאות' },
    { icon: Zap, text: 'ייעול תהליכים תפעוליים' },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">קצת עליי</span>
            </h2>

            <p className="text-xl text-gray-300 font-medium mb-6">
              מתפעול ספנות לאוטומציה מונעת AI.
            </p>

            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              9 שנים בקוראל - תיאום מטען בינלאומי, ניהול לוחות זמנים של כלי שיט,
              תיעוד מכס ולוגיסטיקה. למדתי לזהות את הבעיות התפעוליות שגוזלות הכי הרבה זמן.
            </p>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              היום, עם כלי AI, אני יכול לבנות פתרונות שפעם דרשו צוות מפתחים -
              <span className="gradient-text font-medium"> בלי לכתוב שורת קוד אחת.</span>
              <br />
              התוצאות? אותן תוצאות. הדרך? חדשה לגמרי.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-400">
                  <item.icon className="w-5 h-5 text-blue-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Capabilities */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">מה אני מביא לשולחן</h3>
            <div className="grid grid-cols-2 gap-4">
              {capabilities.map((cap, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all">
                  <cap.icon className="w-8 h-8 text-blue-400 mb-3" />
                  <span className="text-gray-300 text-center text-sm">{cap.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <p className="text-gray-300 text-center text-sm">
                <span className="gradient-text font-medium">הגישה שלי:</span>
                <br />
                לא צריך לדעת לתכנת כדי לבנות פתרונות.
                <br />
                צריך לדעת לשאול את השאלות הנכונות.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
