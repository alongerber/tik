import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Fast loading animation - completes in ~1 second
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setFadeOut(true)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 10
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Logo/Name */}
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
          אלון גרבר
        </h1>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mt-4">
          מומחה אוטומציה תפעולית
        </p>
      </div>
    </div>
  )
}
