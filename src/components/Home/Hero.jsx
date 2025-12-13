import { Link } from 'react-router-dom'
import Button from '../shared/Button'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#1e3a5f] to-[#2a4a73] text-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Alon Gerber
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-8">
          Operations Automation Specialist
        </p>

        <div className="text-lg md:text-xl text-blue-100 space-y-2 mb-10 max-w-2xl mx-auto">
          <p>14 years managing 500+ vessels annually</p>
          <p>Built automation tools that saved 200,000 NIS/year</p>
          <p>Reduced reporting time by 95%</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools/documents">
            <Button size="lg" className="w-full sm:w-auto bg-white text-[#1e3a5f] hover:bg-blue-50">
              Explore Tools
            </Button>
          </Link>
          <a href="/resume.pdf" download>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
              Download Resume
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
