import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Download, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const tools = [
    { name: 'מעבד מסמכים', path: '/tools/documents' },
    { name: 'מרכז אימיילים', path: '/tools/email' },
    { name: 'ממיר פגישות', path: '/tools/meetings' },
    { name: 'מחולל הצעות', path: '/tools/proposals' },
    { name: 'מחולל דוחות', path: '/tools/reports' },
    { name: 'עוזר נהלים', path: '/tools/faq' },
  ]

  const pages = [
    { name: 'תובנות', path: '/insights' },
    { name: 'המסע שלי', path: '/timeline' },
    { name: 'בלוג', path: '/blog' },
    { name: 'אנליטיקס', path: '/analytics' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">
          אלון גרבר
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`hover:text-blue-400 transition-colors ${isHome ? 'text-blue-400' : 'text-gray-300'}`}
          >
            בית
          </Link>

          {/* Tools Dropdown */}
          <div className="relative group">
            <span className="cursor-pointer text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-1">
              כלים
              <ChevronDown className="w-4 h-4" />
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

          {/* Pages */}
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className={`hover:text-blue-400 transition-colors ${location.pathname === page.path ? 'text-blue-400' : 'text-gray-300'}`}
            >
              {page.name}
            </Link>
          ))}

          <a
            href="#contact"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            צור קשר
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </button>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 btn-glow px-4 py-2 rounded-lg text-white font-medium text-sm"
          >
            <Download className="w-4 h-4 relative z-10" />
            <span className="relative z-10">קורות חיים</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
            <div className="text-sm text-gray-500 mt-4 mb-2">כלים</div>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white pr-4"
              >
                {tool.name}
              </Link>
            ))}
            <div className="text-sm text-gray-500 mt-4 mb-2">עוד</div>
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {page.name}
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
