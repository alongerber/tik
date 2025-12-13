import { Download, Edit2, Check } from 'lucide-react'
import Button from '../../shared/Button'
import { generatePDF } from '../../../utils/pdfGenerator'

export default function ProposalPreview({ formData, generatedContent, onEdit }) {
  if (!generatedContent) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Fill the form or try the example to generate a proposal</p>
      </div>
    )
  }

  const {
    executive_summary,
    scope_of_work,
    deliverables,
    timeline_breakdown,
    terms,
  } = generatedContent

  const formatCurrency = (amount, currency) => {
    const symbols = { USD: '$', EUR: '€', ILS: '₪' }
    return `${symbols[currency] || '$'}${amount?.toLocaleString()}`
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleDownloadPDF = () => {
    generatePDF('proposal-preview', `proposal-${formData.clientName}.pdf`)
  }

  return (
    <div className="space-y-4">
      <div id="proposal-preview" className="bg-white">
        {/* Header */}
        <div className="bg-[#1e3a5f] text-white p-6 rounded-t-lg">
          <div className="text-sm text-blue-200 mb-1">PROPOSAL</div>
          <h2 className="text-2xl font-bold">{formData.clientName}</h2>
        </div>

        <div className="p-6 space-y-6 border border-t-0 border-gray-200 rounded-b-lg">
          {/* Meta Info */}
          <div className="flex justify-between text-sm text-gray-600 pb-4 border-b border-gray-200">
            <div>Prepared for: {formData.contactName}</div>
            <div>Date: {currentDate}</div>
          </div>

          {/* Executive Summary */}
          {executive_summary && (
            <section>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                PROJECT OVERVIEW
              </h3>
              <p className="text-gray-600">{executive_summary}</p>
            </section>
          )}

          {/* Scope of Work */}
          {scope_of_work && scope_of_work.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                SCOPE OF WORK
              </h3>
              <ul className="space-y-2">
                {scope_of_work.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Deliverables */}
          {deliverables && deliverables.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                DELIVERABLES
              </h3>
              <ul className="space-y-2">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Timeline */}
          {timeline_breakdown && timeline_breakdown.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                TIMELINE
              </h3>
              <div className="space-y-3">
                {timeline_breakdown.map((phase, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-sm font-medium text-[#3b82f6] whitespace-nowrap">
                      {phase.duration}
                    </div>
                    <div>
                      <div className="font-medium text-[#1e3a5f]">{phase.phase}</div>
                      <div className="text-sm text-gray-600">{phase.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Investment */}
          <section className="bg-[#f8fafc] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
              INVESTMENT
            </h3>
            <div className="text-3xl font-bold text-[#1e3a5f]">
              {formatCurrency(formData.price, formData.currency)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Timeline: {formData.timeline}
            </div>
          </section>

          {/* Terms */}
          {terms && terms.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                TERMS & CONDITIONS
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {terms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Signature Line */}
          <section className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="border-b border-gray-300 pb-8 mb-2" />
                <div className="text-sm text-gray-600">Client Signature</div>
                <div className="text-sm text-gray-400">{formData.contactName}</div>
              </div>
              <div>
                <div className="border-b border-gray-300 pb-8 mb-2" />
                <div className="text-sm text-gray-600">Provider Signature</div>
                <div className="text-sm text-gray-400">Alon Gerber</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" size="sm" onClick={handleDownloadPDF}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="w-4 h-4" />
          Edit
        </Button>
      </div>
    </div>
  )
}
