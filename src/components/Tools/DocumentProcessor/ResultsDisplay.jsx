import Card, { CardContent, CardHeader } from '../../shared/Card'
import ExportButtons from '../../shared/ExportButtons'

export default function ResultsDisplay({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Upload a document or try the example to see results</p>
      </div>
    )
  }

  const { document_type, confidence, fields, line_items } = data

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Document Type</span>
              <h3 className="text-xl font-semibold text-[#1e3a5f]">{document_type}</h3>
            </div>
            {confidence && (
              <div className="text-right">
                <span className="text-sm text-gray-500">Confidence</span>
                <p className="text-lg font-medium text-[#3b82f6]">
                  {(confidence * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fields && Object.entries(fields).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="font-medium text-[#1e3a5f]">
                  {typeof value === 'number' && key.includes('amount')
                    ? `$${value.toLocaleString()}`
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {line_items && line_items.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-[#1e3a5f]">Line Items</h3>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600 font-medium">Description</th>
                    <th className="text-right py-2 text-gray-600 font-medium">Qty</th>
                    <th className="text-right py-2 text-gray-600 font-medium">Unit Price</th>
                    <th className="text-right py-2 text-gray-600 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {line_items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 text-[#1e3a5f]">{item.description}</td>
                      <td className="py-2 text-right text-gray-600">{item.quantity}</td>
                      <td className="py-2 text-right text-gray-600">
                        ${item.unit_price?.toLocaleString()}
                      </td>
                      <td className="py-2 text-right font-medium text-[#1e3a5f]">
                        ${item.total?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <ExportButtons data={data} filename="document-data" />
    </div>
  )
}
