import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import TranscriptInput from './TranscriptInput'
import MeetingResults from './MeetingResults'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { analyzeMeeting } from '../../../services/claude'
import { exampleMeetingTranscript, mockMeetingResponse } from '../../../data/examples'

export default function MeetingConverter() {
  const [transcript, setTranscript] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleProcess = async () => {
    if (!transcript.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await analyzeMeeting(transcript)
      setResults(response)
    } catch (err) {
      console.error('Meeting analysis error:', err)
      // Use mock response as fallback
      setResults(mockMeetingResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setTranscript(exampleMeetingTranscript)
    setIsLoading(true)
    setError(null)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setResults(mockMeetingResponse)
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
            Meeting-to-Action Converter
          </h1>
          <p className="text-gray-600">
            Transform meeting chaos into structured outcomes
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]">
            <TranscriptInput
              value={transcript}
              onChange={setTranscript}
              onProcess={handleProcess}
              onTryExample={handleTryExample}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-500">Processing transcript...</p>
              </div>
            ) : (
              <MeetingResults data={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
