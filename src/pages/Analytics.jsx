import { Link } from 'react-router-dom'
import { ArrowRight, Users, MousePointer, Clock, TrendingUp, BarChart3, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'

// Simulated analytics data
const generateAnalytics = () => ({
  totalVisits: Math.floor(Math.random() * 500) + 1200,
  uniqueVisitors: Math.floor(Math.random() * 300) + 800,
  avgTimeOnSite: `${Math.floor(Math.random() * 2) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  toolsUsed: Math.floor(Math.random() * 200) + 450,
  topTools: [
    { name: 'מעבד מסמכים', uses: Math.floor(Math.random() * 100) + 150, trend: '+12%' },
    { name: 'מרכז אימיילים', uses: Math.floor(Math.random() * 80) + 120, trend: '+8%' },
    { name: 'מחולל דוחות', uses: Math.floor(Math.random() * 60) + 100, trend: '+23%' },
    { name: 'ממיר פגישות', uses: Math.floor(Math.random() * 50) + 80, trend: '+5%' },
    { name: 'עוזר נהלים', uses: Math.floor(Math.random() * 40) + 60, trend: '+15%' },
    { name: 'מחולל הצעות', uses: Math.floor(Math.random() * 30) + 50, trend: '+10%' }
  ],
  recentActivity: [
    { action: 'שימוש במעבד מסמכים', time: 'לפני 2 דקות' },
    { action: 'צפייה בתובנות', time: 'לפני 5 דקות' },
    { action: 'הורדת קורות חיים', time: 'לפני 12 דקות' },
    { action: 'שימוש בעוזר נהלים', time: 'לפני 18 דקות' },
    { action: 'צפייה במסע שלי', time: 'לפני 25 דקות' }
  ],
  weeklyData: [
    { day: 'א׳', visits: 45 },
    { day: 'ב׳', visits: 62 },
    { day: 'ג׳', visits: 58 },
    { day: 'ד׳', visits: 71 },
    { day: 'ה׳', visits: 55 },
    { day: 'ו׳', visits: 38 },
    { day: 'ש׳', visits: 22 }
  ]
})

export default function Analytics() {
  const [data, setData] = useState(generateAnalytics())
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setData(generateAnalytics())
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const maxVisits = Math.max(...data.weeklyData.map(d => d.visits))

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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              אנליטיקס
            </h1>
            <p className="text-gray-400">
              נתוני שימוש בזמן אמת
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${isLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-gray-400'}`}
            >
              {isLive ? 'Live' : 'Paused'}
            </button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'מבקרים', value: data.uniqueVisitors.toLocaleString(), color: 'blue' },
            { icon: Eye, label: 'צפיות', value: data.totalVisits.toLocaleString(), color: 'purple' },
            { icon: MousePointer, label: 'שימושים בכלים', value: data.toolsUsed.toLocaleString(), color: 'emerald' },
            { icon: Clock, label: 'זמן ממוצע', value: data.avgTimeOnSite, color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Chart */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">צפיות השבוע</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {data.weeklyData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(day.visits / maxVisits) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">פעילות אחרונה</h3>
            <div className="space-y-3">
              {data.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <span className="text-gray-300 text-sm">{activity.action}</span>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Usage */}
        <div className="mt-8 glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">שימוש בכלים</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.topTools.map((tool, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">{tool.name}</span>
                  <span className="text-emerald-400 text-sm">{tool.trend}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(tool.uses / data.topTools[0].uses) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-12">{tool.uses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            * הנתונים מדומים למטרות הדגמה
          </p>
        </div>
      </div>
    </div>
  )
}
