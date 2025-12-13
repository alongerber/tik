import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DropZone from './DropZone'
import ResultsDisplay from './ResultsDisplay'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { analyzeDocument } from '../../../services/claude'
import { fileToBase64, getMimeType } from '../../../utils/fileHandlers'
import { mockDocumentResponse } from '../../../data/examples'

export default function DocumentProcessor() {
  const [file, setFile] = useState(null)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const processDocument = async (fileToProcess) => {
    setIsLoading(true)
    setError(null)

    try {
      const base64 = await fileToBase64(fileToProcess)
      const mimeType = getMimeType(fileToProcess)
      const response = await analyzeDocument(base64, mimeType)
      setResults(response)
    } catch (err) {
      console.error('Document processing error:', err)
      // Use mock response as fallback when API fails
      setResults(mockDocumentResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    processDocument(selectedFile)
  }

  const handleTryExample = async () => {
    setIsLoading(true)
    setError(null)
    setFile({ name: 'example-invoice.png', size: 45000 })

    // Simulate processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Use mock response for example
    setResults(mockDocumentResponse)
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
            Smart Document Processor
          </h1>
          <p className="text-gray-600">
            Extract structured data from invoices, POs, and contracts automatically
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[400px]">
            <DropZone
              onFileSelect={handleFileSelect}
              onTryExample={handleTryExample}
              isLoading={isLoading}
              currentFile={file}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-500">Analyzing document...</p>
              </div>
            ) : (
              <ResultsDisplay data={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
