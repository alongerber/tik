import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="bg-[#1e3a5f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold hover:text-blue-200 transition-colors">
          Alon Gerber
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`hover:text-blue-200 transition-colors ${isHome ? 'text-blue-200' : ''}`}
          >
            Home
          </Link>
          <div className="relative group">
            <span className="cursor-pointer hover:text-blue-200 transition-colors">
              Tools
            </span>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link
                  to="/tools/documents"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Document Processor
                </Link>
                <Link
                  to="/tools/email"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Email Command Center
                </Link>
                <Link
                  to="/tools/meetings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Meeting Converter
                </Link>
                <Link
                  to="/tools/proposals"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Proposal Generator
                </Link>
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="hover:text-blue-200 transition-colors"
          >
            Contact
          </a>
        </nav>

        <a
          href="/resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1e3a5f] rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Download Resume
        </a>
      </div>
    </header>
  )
}
