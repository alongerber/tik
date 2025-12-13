import { Link } from 'react-router-dom'
import { FileText, Mail, Users, FileEdit } from 'lucide-react'
import Button from '../shared/Button'

export default function ToolsGrid() {
  const tools = [
    {
      icon: FileText,
      title: 'Smart Document Processor',
      description: 'Extract structured data from invoices, POs, and contracts automatically.',
      path: '/tools/documents',
    },
    {
      icon: Mail,
      title: 'Email Command Center',
      description: 'Turn chaotic emails into clear action items with priority and tags.',
      path: '/tools/email',
    },
    {
      icon: Users,
      title: 'Meeting-to-Action Converter',
      description: 'Transform meeting transcripts into summaries, decisions, and tasks.',
      path: '/tools/meetings',
    },
    {
      icon: FileEdit,
      title: 'Proposal Draft Generator',
      description: 'Create professional proposals in seconds from simple inputs.',
      path: '/tools/proposals',
    },
  ]

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Automation Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interactive demonstrations of AI-powered tools that automate common business operations.
            Each tool works in under 30 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#3b82f6] transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <Link to={tool.path}>
                    <Button variant="primary" size="sm">
                      Try it
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
