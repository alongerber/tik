import { Mail, Linkedin, Github, Phone, Send } from 'lucide-react'

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: 'אימייל',
      value: 'alon@example.com',
      href: 'mailto:alon@example.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Linkedin,
      label: 'לינקדאין',
      value: 'alongerber',
      href: 'https://linkedin.com/in/alongerber',
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      icon: Github,
      label: 'גיטהאב',
      value: 'alongerber',
      href: 'https://github.com/alongerber',
      gradient: 'from-gray-600 to-gray-400',
    },
    {
      icon: Phone,
      label: 'טלפון',
      value: '+972-XX-XXX-XXXX',
      href: 'tel:+972XXXXXXXX',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section id="contact" className="relative py-24">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 text-sm text-blue-300">
            <Send className="w-4 h-4" />
            בואו נדבר
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">צרו קשר</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-lg mx-auto">
            מעוניינים בפתרונות אוטומציה לתפעול שלכם?
            <br />
            <span className="text-gray-300">בואו נדבר על איך אפשר לייעל את התהליכים.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group glass-card rounded-2xl p-6 flex items-center gap-4 card-shine"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} p-0.5 flex-shrink-0`}>
                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">{contact.label}</div>
                <div className="text-white font-medium group-hover:gradient-text transition-all duration-300">
                  {contact.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
