import { Mail, Linkedin, Github, Phone } from 'lucide-react'

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alon@example.com',
      href: 'mailto:alon@example.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/alongerber',
      href: 'https://linkedin.com/in/alongerber',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/alongerber',
      href: 'https://github.com/alongerber',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+972-XX-XXX-XXXX',
      href: 'tel:+972XXXXXXXX',
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-lg mx-auto">
          Interested in automation solutions for your operations?
          Let's discuss how I can help streamline your workflows.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#3b82f6] hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                <contact.icon className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{contact.label}</div>
                <div className="text-[#1e3a5f] font-medium">{contact.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
