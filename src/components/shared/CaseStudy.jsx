import { Quote } from 'lucide-react'

export default function CaseStudy({ title, context, solution, result, className = '' }) {
  return (
    <div className={`mt-12 ${className}`}>
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
            <Quote className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <div className="space-y-6">
          <div className="relative pr-6 border-r-2 border-slate-700">
            <div className="absolute right-0 top-0 w-3 h-3 bg-slate-700 rounded-full -translate-x-[7px]" />
            <div className="text-sm text-gray-500 mb-1">הבעיה</div>
            <p className="text-gray-300">{context}</p>
          </div>

          <div className="relative pr-6 border-r-2 border-blue-500/50">
            <div className="absolute right-0 top-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-[7px]" />
            <div className="text-sm text-blue-400 mb-1">הפתרון</div>
            <p className="text-gray-300">{solution}</p>
          </div>

          <div className="relative pr-6 border-r-2 border-emerald-500/50">
            <div className="absolute right-0 top-0 w-3 h-3 bg-emerald-500 rounded-full -translate-x-[7px]" />
            <div className="text-sm text-emerald-400 mb-1">התוצאה</div>
            <p className="text-white font-medium">{result}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
