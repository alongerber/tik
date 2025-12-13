import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Download } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tools = [
    { name: 'מעבד מסמכים', path: '/tools/documents' },
    { name: 'מרכז אימיילים', path: '/tools/email' },
    { name: 'ממיר פגישות', path: '/tools/meetings' },
    { name: 'מחולל הצעות', path: '/tools/proposals' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">
          אלון גרבר
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`hover:text-blue-400 transition-colors ${isHome ? 'text-blue-400' : 'text-gray-300'}`}
          >
            בית
          </Link>
          <div className="relative group">
            <span className="cursor-pointer text-gray-300 hover:text-blue-400 transition-colors">
              כלים
            </span>
            <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            צור קשר
          </a>
        </nav>

        <a
          href="/resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 btn-glow px-4 py-2 rounded-lg text-white font-medium text-sm"
        >
          <Download className="w-4 h-4 relative z-10" />
          <span className="relative z-10">קורות חיים</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              בית
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {tool.name}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              צור קשר
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
