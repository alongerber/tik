import Button from '../../shared/Button'

const PROJECT_TYPES = ['Consulting', 'Development', 'Training', 'Support', 'Custom']
const TIMELINES = ['1 week', '2 weeks', '1 month', '3 months', 'Custom']
const CURRENCIES = ['USD', 'EUR', 'ILS']

export default function ProposalForm({
  formData,
  onChange,
  onGenerate,
  onTryExample,
  isLoading,
}) {
  const handleChange = (field) => (e) => {
    onChange({ ...formData, [field]: e.target.value })
  }

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    onChange({ ...formData, [field]: value })
  }

  const isValid =
    formData.clientName &&
    formData.contactName &&
    formData.projectType &&
    formData.description &&
    formData.timeline &&
    formData.price

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name
        </label>
        <input
          type="text"
          value={formData.clientName}
          onChange={handleChange('clientName')}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
          placeholder="Company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Name
        </label>
        <input
          type="text"
          value={formData.contactName}
          onChange={handleChange('contactName')}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
          placeholder="Primary contact"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Type
        </label>
        <select
          value={formData.projectType}
          onChange={handleChange('projectType')}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
        >
          <option value="">Select type...</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description
        </label>
        <textarea
          value={formData.description}
          onChange={handleChange('description')}
          disabled={isLoading}
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
          placeholder="Describe the project scope and objectives..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timeline
        </label>
        <select
          value={formData.timeline}
          onChange={handleChange('timeline')}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
        >
          <option value="">Select timeline...</option>
          {TIMELINES.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={handleNumberChange('price')}
            disabled={isLoading}
            min="0"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={handleChange('currency')}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex gap-3">
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
          onClick={onGenerate}
          disabled={isLoading || !isValid}
        >
          Generate
        </Button>
      </div>
    </div>
  )
}
