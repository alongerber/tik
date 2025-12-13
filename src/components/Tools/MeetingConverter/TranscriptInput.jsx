import Button from '../../shared/Button'

export default function TranscriptInput({
  value,
  onChange,
  onProcess,
  onTryExample,
  isLoading,
}) {
  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste meeting transcript here..."
        disabled={isLoading}
        className="flex-1 w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 placeholder-gray-400 font-mono text-sm"
      />

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onTryExample}
          disabled={isLoading}
        >
          Try Example
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={onProcess}
          disabled={isLoading || !value.trim()}
        >
          Process
        </Button>
      </div>
    </div>
  )
}
