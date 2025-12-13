import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText } from 'lucide-react'
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
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setResults(mockDocumentResponse)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                מעבד מסמכים חכם
              </h1>
              <p className="text-gray-400 mt-1">
                חילוץ נתונים מובנים מחשבוניות, הזמנות רכש וחוזים באופן אוטומטי
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 glass border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6 min-h-[450px]">
            <DropZone
              onFileSelect={handleFileSelect}
              onTryExample={handleTryExample}
              isLoading={isLoading}
              currentFile={file}
            />
          </div>

          <div className="glass-card rounded-2xl p-6 min-h-[450px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400">מנתח מסמך...</p>
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
