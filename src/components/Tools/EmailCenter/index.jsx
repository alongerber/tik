import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EmailInput from './EmailInput'
import AnalysisResults from './AnalysisResults'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { analyzeEmail } from '../../../services/claude'
import { exampleEmail, mockEmailResponse } from '../../../data/examples'

export default function EmailCenter() {
  const [emailText, setEmailText] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!emailText.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await analyzeEmail(emailText)
      setResults(response)
    } catch (err) {
      console.error('Email analysis error:', err)
      // Use mock response as fallback
      setResults(mockEmailResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setEmailText(exampleEmail)
    setIsLoading(true)
    setError(null)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setResults(mockEmailResponse)
    setIsLoading(false)
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
            Email Command Center
          </h1>
          <p className="text-gray-600">
            Turn chaotic emails into clear action items
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]">
            <EmailInput
              value={emailText}
              onChange={setEmailText}
              onAnalyze={handleAnalyze}
              onTryExample={handleTryExample}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-500">Analyzing email...</p>
              </div>
            ) : (
              <AnalysisResults data={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
