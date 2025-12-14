import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

function Particles() {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

function TypeWriter({ text, delay = 100 }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center animated-bg overflow-hidden">
      <Particles />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 text-sm text-blue-300">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          מחפש את האתגר הבא
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="gradient-text">אלון גרבר</span>
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
          <TypeWriter text="מומחה אוטומציה תפעולית" delay={80} />
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { value: '9', label: 'שנות ניסיון' },
            { value: 'קוראל', label: 'ספנות ולוגיסטיקה' },
            { value: 'AI', label: 'אוטומציה חכמה' },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card px-6 py-4 rounded-2xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{item.value}</div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          9 שנים של ניסיון תפעולי לימדו אותי לזהות בעיות.
          <br />
          <span className="text-gray-300">כלי AI מאפשרים לי לפתור אותן - בלי לכתוב שורת קוד.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools/documents">
            <button className="btn-glow px-8 py-4 rounded-xl text-white font-medium text-lg relative z-10">
              <span className="relative z-10">גלו את הכלים</span>
            </button>
          </Link>
          <a href="/resume.pdf" download>
            <button className="glass px-8 py-4 rounded-xl text-white font-medium text-lg hover:bg-white/10 transition-all duration-300">
              הורדת קורות חיים
            </button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-500" />
      </div>
    </section>
  )
}
