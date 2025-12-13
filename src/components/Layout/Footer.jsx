import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const tools = [
    { name: 'מעבד מסמכים', path: '/tools/documents' },
    { name: 'מרכז אימיילים', path: '/tools/email' },
    { name: 'ממיר פגישות', path: '/tools/meetings' },
    { name: 'מחולל הצעות', path: '/tools/proposals' },
  ]

  const socials = [
    { icon: Mail, href: 'mailto:alon@example.com' },
    { icon: Linkedin, href: 'https://linkedin.com/in/alongerber' },
    { icon: Github, href: 'https://github.com/alongerber' },
  ]

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">אלון גרבר</h3>
            <p className="text-gray-400 leading-relaxed">
              מומחה אוטומציה תפעולית עם 9 שנות ניסיון בהפיכת תהליכים ידניים לפתרונות אוטומטיים יעילים.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">כלים</h3>
            <nav className="flex flex-col gap-3">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">עקבו אחריי</h3>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {currentYear} אלון גרבר. כל הזכויות שמורות.
          </p>
          <p className="text-gray-600 text-sm">
            נבנה עם React, Tailwind ו-Claude AI
          </p>
        </div>
      </div>
    </footer>
  )
}
