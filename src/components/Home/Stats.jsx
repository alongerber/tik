export default function Stats() {
  const stats = [
    { value: '14', label: 'Years Operations Experience' },
    { value: '500+', label: 'Vessels Managed Annually' },
    { value: '200K', label: 'NIS Saved Through Automation' },
    { value: '95%', label: 'Reduction in Manual Reporting' },
  ]

  return (
    <section className="bg-[#f8fafc] py-12 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
