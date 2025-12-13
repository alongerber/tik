export default function About() {
  const skills = [
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'API Integration',
    'Process Automation',
    'AI/LLM Integration',
  ]

  return (
    <section className="py-16 md:py-20 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-8 text-center">
          About
        </h2>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[#1e3a5f] font-medium mb-6">
            From shipping operations to automation engineering.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            After 14 years coordinating international cargo operations - managing vessel schedules,
            customs documentation, and multi-stakeholder logistics across Israeli ports - I discovered
            that most operational bottlenecks have one thing in common: they can be automated.
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            I built tools that eliminated 20+ hours of weekly manual work. Now I build them for others.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
