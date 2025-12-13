import { Code, Cpu, Zap, Ship } from 'lucide-react'

export default function About() {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'API Integration', level: 95 },
    { name: 'Process Automation', level: 95 },
    { name: 'AI/LLM Integration', level: 90 },
  ]

  const highlights = [
    { icon: Ship, text: 'קוראל - ספנות ולוגיסטיקה בינלאומית' },
    { icon: Cpu, text: 'בניית מערכות אוטומציה מקצה לקצה' },
    { icon: Code, text: 'פיתוח כלים מבוססי AI' },
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
              מתפעול ספנות להנדסת אוטומציה.
            </p>

            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              אחרי 9 שנים בקוראל - תיאום פעולות מטען בינלאומיות, ניהול לוחות זמנים של כלי שיט,
              תיעוד מכס ולוגיסטיקה מול מחזיקי עניין מרובים בנמלי ישראל - גיליתי
              שלרוב צווארי הבקבוק התפעוליים יש דבר אחד במשותף: אפשר לבצע אותם אוטומטית.
            </p>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              בניתי כלים שחסכו 20+ שעות עבודה ידנית בשבוע.
              <span className="gradient-text font-medium"> עכשיו אני בונה אותם עבור אחרים.</span>
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

          {/* Right side - Skills */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">טכנולוגיות</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
