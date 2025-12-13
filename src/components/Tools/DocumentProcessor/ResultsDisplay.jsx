import { Download } from 'lucide-react'

export default function ResultsDisplay({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>העלו מסמך או נסו את הדוגמה כדי לראות תוצאות</p>
      </div>
    )
  }

  const { document_type, confidence, fields, line_items } = data

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document-data.json'
    a.click()
  }

  const fieldLabels = {
    document_number: 'מספר מסמך',
    date: 'תאריך',
    due_date: 'תאריך יעד',
    vendor_name: 'שם ספק',
    vendor_address: 'כתובת ספק',
    total_amount: 'סכום כולל',
    currency: 'מטבע',
  }

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">סוג מסמך</span>
          <h3 className="text-2xl font-bold gradient-text">{document_type}</h3>
        </div>
        {confidence && (
          <div className="text-left">
            <span className="text-sm text-gray-500">רמת ביטחון</span>
            <p className="text-2xl font-bold text-green-400">
              {(confidence * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="glass rounded-xl p-4 space-y-3">
        {fields && Object.entries(fields).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-white/10 last:border-0">
            <span className="text-gray-400">
              {fieldLabels[key] || key.replace(/_/g, ' ')}
            </span>
            <span className="font-medium text-white">
              {typeof value === 'number' && key.includes('amount')
                ? `$${value.toLocaleString()}`
                : String(value)}
            </span>
          </div>
        ))}
      </div>

      {/* Line Items */}
      {line_items && line_items.length > 0 && (
        <div className="glass rounded-xl p-4">
          <h4 className="font-semibold text-white mb-4">פריטים</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right py-2 text-gray-400 font-medium">תיאור</th>
                  <th className="text-left py-2 text-gray-400 font-medium">כמות</th>
                  <th className="text-left py-2 text-gray-400 font-medium">מחיר</th>
                  <th className="text-left py-2 text-gray-400 font-medium">סה"כ</th>
                </tr>
              </thead>
              <tbody>
                {line_items.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 last:border-0">
                    <td className="py-3 text-white">{item.description}</td>
                    <td className="py-3 text-gray-400">{item.quantity}</td>
                    <td className="py-3 text-gray-400">${item.unit_price?.toLocaleString()}</td>
                    <td className="py-3 font-medium text-blue-400">${item.total?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export */}
      <button
        onClick={exportJSON}
        className="glass px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        ייצוא JSON
      </button>
    </div>
  )
}
