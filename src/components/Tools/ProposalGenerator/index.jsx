import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProposalForm from './ProposalForm'
import ProposalPreview from './ProposalPreview'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { generateProposal } from '../../../services/claude'
import { exampleProposal, mockProposalResponse } from '../../../data/examples'

const initialFormData = {
  clientName: '',
  contactName: '',
  projectType: '',
  description: '',
  timeline: '',
  price: '',
  currency: 'USD',
}

export default function ProposalGenerator() {
  const [formData, setFormData] = useState(initialFormData)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await generateProposal(formData)
      setGeneratedContent(response)
    } catch (err) {
      console.error('Proposal generation error:', err)
      // Use mock response as fallback
      setGeneratedContent(mockProposalResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setFormData(exampleProposal)
    setIsLoading(true)
    setError(null)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setGeneratedContent(mockProposalResponse)
    setIsLoading(false)
  }

  const handleEdit = () => {
    setGeneratedContent(null)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
            Proposal Draft Generator
          </h1>
          <p className="text-gray-600">
            Create professional proposals in seconds
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <ProposalForm
              formData={formData}
              onChange={setFormData}
              onGenerate={handleGenerate}
              onTryExample={handleTryExample}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-auto max-h-[800px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 min-h-[400px]">
                <LoadingSpinner size="lg" />
                <p className="text-gray-500">Generating proposal...</p>
              </div>
            ) : (
              <ProposalPreview
                formData={formData}
                generatedContent={generatedContent}
                onEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
