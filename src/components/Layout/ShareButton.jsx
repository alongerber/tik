import { useState } from 'react'
import { Share2, X, Copy, Check, MessageCircle, Linkedin, Mail } from 'lucide-react'

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = 'https://along.vercel.app'
  const title = 'תיק עבודות - אלון גרבר | מומחה אוטומציה תפעולית'
  const text = 'צפו בתיק העבודות של אלון גרבר - כלי אוטומציה חכמים לתפעול'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    {
      name: 'וואטסאפ',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    },
    {
      name: 'לינקדאין',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'אימייל',
      icon: Mail,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank')
    },
  ]

  return (
    <>
      {/* Floating Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
        aria-label="שתפו"
      >
        <Share2 className="w-6 h-6" />
      </button>

      {/* Share Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative glass-card rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 text-center">שתפו את תיק העבודות</h3>
            <p className="text-gray-400 text-sm text-center mb-6">עזרו לי להגיע ליותר הזדמנויות</p>

            {/* Share Options */}
            <div className="flex justify-center gap-4 mb-6">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center text-white transition-all hover:scale-105`}
                  title={option.name}
                >
                  <option.icon className="w-6 h-6" />
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-gray-300 text-sm"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
