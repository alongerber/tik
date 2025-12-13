import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText } from 'lucide-react'
import Button from '../../shared/Button'

export default function DropZone({ onFileSelect, onTryExample, isLoading, currentFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: isLoading,
  })

  return (
    <div className="flex flex-col h-full">
      <div
        {...getRootProps()}
        className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[#3b82f6] bg-blue-50'
            : 'border-gray-300 hover:border-[#3b82f6] hover:bg-gray-50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />

        {currentFile ? (
          <div className="text-center">
            <FileText className="w-12 h-12 text-[#3b82f6] mx-auto mb-3" />
            <p className="text-[#1e3a5f] font-medium mb-1">{currentFile.name}</p>
            <p className="text-sm text-gray-500">
              {(currentFile.size / 1024).toFixed(1)} KB
            </p>
            <p className="text-sm text-gray-400 mt-2">Drop another file to replace</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            {isDragActive ? (
              <p className="text-[#3b82f6] font-medium">Drop the file here</p>
            ) : (
              <>
                <p className="text-gray-600 mb-1">
                  Drop PDF or image here, or click to upload
                </p>
                <p className="text-sm text-gray-400">
                  Supports PNG, JPG, WebP, PDF
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full"
          onClick={onTryExample}
          disabled={isLoading}
        >
          Try with Example Invoice
        </Button>
      </div>
    </div>
  )
}
