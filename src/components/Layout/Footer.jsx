import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1e3a5f] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Alon Gerber</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Operations Automation Specialist with 14 years of experience
              transforming manual processes into efficient automated solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/tools/documents" className="text-blue-200 hover:text-white transition-colors text-sm">
                Document Processor
              </Link>
              <Link to="/tools/email" className="text-blue-200 hover:text-white transition-colors text-sm">
                Email Command Center
              </Link>
              <Link to="/tools/meetings" className="text-blue-200 hover:text-white transition-colors text-sm">
                Meeting Converter
              </Link>
              <Link to="/tools/proposals" className="text-blue-200 hover:text-white transition-colors text-sm">
                Proposal Generator
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="mailto:alon@example.com"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                alon@example.com
              </a>
              <a
                href="https://linkedin.com/in/alongerber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/alongerber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-400/30 text-center text-blue-200 text-sm">
          {currentYear} Alon Gerber. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
