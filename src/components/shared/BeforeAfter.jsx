import { Clock, Zap, ArrowLeft } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function BeforeAfter({ before, after }) {
  const [isVisible, setIsVisible] = useState(false)
  const [beforeTime, setBeforeTime] = useState(0)
  const [afterTime, setAfterTime] = useState(0)
  const ref = useRef(null)

  // Parse time strings to seconds for animation
  const parseTimeToSeconds = (timeStr) => {
    if (timeStr.includes('שעות')) {
      return parseFloat(timeStr) * 3600
    } else if (timeStr.includes('שעה')) {
      return parseFloat(timeStr) * 3600
    } else if (timeStr.includes('דקות')) {
      return parseFloat(timeStr) * 60
    } else if (timeStr.includes('דקה')) {
      return parseFloat(timeStr) * 60
    } else if (timeStr.includes('שניות')) {
      return parseFloat(timeStr)
    }
    return 60
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate the time displays
          const beforeSeconds = parseTimeToSeconds(before.time)
          const afterSeconds = parseTimeToSeconds(after.time)

          // Animate before time counting up
          let beforeStart = 0
          const beforeInterval = setInterval(() => {
            beforeStart += beforeSeconds / 30
            if (beforeStart >= beforeSeconds) {
              setBeforeTime(beforeSeconds)
              clearInterval(beforeInterval)
            } else {
              setBeforeTime(Math.floor(beforeStart))
            }
          }, 50)

          // Animate after time (much smaller, quick animation)
          setTimeout(() => {
            setAfterTime(afterSeconds)
          }, 1500)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [before.time, after.time])

  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      return `${(seconds / 3600).toFixed(1)} שעות`
    } else if (seconds >= 60) {
      return `${Math.floor(seconds / 60)} דקות`
    }
    return `${seconds} שניות`
  }

  const savingsPercent = Math.round((1 - parseTimeToSeconds(after.time) / parseTimeToSeconds(before.time)) * 100)

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">לפני / אחרי</h3>
        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
          חיסכון של {savingsPercent}%
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="relative">
          <div className="absolute top-0 right-0 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-bl-lg rounded-tr-xl">
            לפני
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-red-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-red-400" />
              <div className="text-3xl font-bold text-red-400">
                {isVisible ? formatTime(beforeTime) : '0'}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{before.description}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </div>

        {/* After */}
        <div className="relative">
          <div className="absolute top-0 right-0 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-bl-lg rounded-tr-xl">
            אחרי
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-8 h-8 text-emerald-400" />
              <div className={`text-3xl font-bold text-emerald-400 transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
                {after.time}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{after.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
