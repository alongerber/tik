import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Sparkles } from 'lucide-react'

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
        className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-blue-500 hover:bg-white/5'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />

        {currentFile ? (
          <div className="text-center">
            <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-white font-medium mb-1">{currentFile.name}</p>
            <p className="text-sm text-gray-500">
              {(currentFile.size / 1024).toFixed(1)} KB
            </p>
            <p className="text-sm text-gray-500 mt-3">גררו קובץ אחר להחלפה</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-400 font-medium text-lg">שחררו את הקובץ כאן</p>
            ) : (
              <>
                <p className="text-gray-300 mb-2 text-lg">
                  גררו PDF או תמונה לכאן
                </p>
                <p className="text-gray-500">
                  או לחצו לבחירת קובץ
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  תומך ב-PNG, JPG, WebP, PDF
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <button
          onClick={onTryExample}
          disabled={isLoading}
          className="w-full btn-glow px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">נסו עם חשבונית לדוגמה</span>
        </button>
      </div>
    </div>
  )
}
