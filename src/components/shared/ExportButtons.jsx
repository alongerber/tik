import { Download } from 'lucide-react'
import Button from './Button'

export default function ExportButtons({ data, filename = 'export', onExportPDF }) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadBlob(blob, `${filename}.json`)
  }

  const exportCSV = () => {
    const csvContent = convertToCSV(data)
    const blob = new Blob([csvContent], { type: 'text/csv' })
    downloadBlob(blob, `${filename}.csv`)
  }

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const convertToCSV = (obj) => {
    if (Array.isArray(obj)) {
      if (obj.length === 0) return ''
      const headers = Object.keys(obj[0])
      const rows = obj.map(item =>
        headers.map(header => JSON.stringify(item[header] ?? '')).join(',')
      )
      return [headers.join(','), ...rows].join('\n')
    }

    // For single object, flatten and convert
    const flattenObject = (o, prefix = '') => {
      return Object.keys(o).reduce((acc, key) => {
        const value = o[key]
        const newKey = prefix ? `${prefix}_${key}` : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          Object.assign(acc, flattenObject(value, newKey))
        } else {
          acc[newKey] = Array.isArray(value) ? JSON.stringify(value) : value
        }
        return acc
      }, {})
    }

    const flat = flattenObject(obj)
    const headers = Object.keys(flat)
    const values = headers.map(h => JSON.stringify(flat[h] ?? ''))
    return [headers.join(','), values.join(',')].join('\n')
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={exportJSON}>
        <Download className="w-4 h-4" />
        Export JSON
      </Button>
      <Button variant="outline" size="sm" onClick={exportCSV}>
        <Download className="w-4 h-4" />
        Export CSV
      </Button>
      {onExportPDF && (
        <Button variant="outline" size="sm" onClick={onExportPDF}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      )}
    </div>
  )
}
