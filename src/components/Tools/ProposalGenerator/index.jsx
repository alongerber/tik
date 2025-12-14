import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileEdit, Sparkles, Download, Check } from 'lucide-react'
import LoadingSpinner from '../../shared/LoadingSpinner'
import BeforeAfter from '../../shared/BeforeAfter'
import CaseStudy from '../../shared/CaseStudy'
import { generateProposal } from '../../../services/claude'
import { exampleProposal, mockProposalResponse } from '../../../data/examples'
import { generatePDF } from '../../../utils/pdfGenerator'

const PROJECT_TYPES = ['ייעוץ', 'פיתוח', 'הדרכה', 'תמיכה', 'מותאם אישית']
const TIMELINES = ['שבוע', 'שבועיים', 'חודש', '3 חודשים', 'מותאם אישית']

export default function ProposalGenerator() {
  const [formData, setFormData] = useState({
    clientName: '', contactName: '', projectType: '', description: '', timeline: '', price: '', currency: 'ILS'
  })
  const [generatedContent, setGeneratedContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const response = await generateProposal(formData)
      setGeneratedContent(response)
    } catch (err) {
      setGeneratedContent(mockProposalResponse)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryExample = async () => {
    setFormData(exampleProposal)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGeneratedContent(mockProposalResponse)
    setIsLoading(false)
  }

  const handleDownloadPDF = () => generatePDF('proposal-preview', `הצעה-${formData.clientName}.pdf`)

  const isValid = formData.clientName && formData.contactName && formData.projectType && formData.description && formData.timeline && formData.price

  const currencySymbol = { USD: '$', EUR: '€', ILS: '₪' }[formData.currency] || '₪'

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <FileEdit className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">מחולל הצעות מחיר</h1>
            <p className="text-gray-400 mt-1">יצירת הצעות מחיר מקצועיות תוך שניות</p>
          </div>
        </div>

        <BeforeAfter
          before={{
            time: '1 שעה',
            description: 'פתיחת תבנית, עריכת טקסטים, התאמת מחירים, עיצוב, שמירה ל-PDF'
          }}
          after={{
            time: '1 דקה',
            description: 'מילוי פרטים בסיסיים - הצעה מקצועית מוכנה להורדה'
          }}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Form */}
          <div className="glass-card rounded-2xl p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">שם לקוח</label>
                <input type="text" value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="שם החברה" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">שם איש קשר</label>
                <input type="text" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="שם פרטי ומשפחה" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">סוג פרויקט</label>
                <select value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" className="bg-slate-900">בחרו סוג...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">תיאור הפרויקט</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} disabled={isLoading} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="תארו את היקף העבודה..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">לוח זמנים</label>
                <select value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" className="bg-slate-900">בחרו...</option>
                  {TIMELINES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">מחיר</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">מטבע</label>
                  <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} disabled={isLoading} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="ILS" className="bg-slate-900">ILS ₪</option>
                    <option value="USD" className="bg-slate-900">USD $</option>
                    <option value="EUR" className="bg-slate-900">EUR €</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <button onClick={handleTryExample} disabled={isLoading} className="flex-1 glass px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  נסו דוגמה
                </button>
                <button onClick={handleGenerate} disabled={isLoading || !isValid} className="flex-1 btn-glow px-4 py-3 rounded-xl text-white font-medium disabled:opacity-50">
                  <span className="relative z-10">צור הצעה</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card rounded-2xl p-6 overflow-auto max-h-[800px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 min-h-[400px]">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400">מייצר הצעה...</p>
              </div>
            ) : generatedContent ? (
              <div className="space-y-4">
                <div id="proposal-preview" className="bg-slate-800 rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="text-sm text-blue-200 mb-1">הצעת מחיר</div>
                    <h2 className="text-2xl font-bold">{formData.clientName}</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>עבור: {formData.contactName}</div>
                      <div>תאריך: {new Date().toLocaleDateString('he-IL')}</div>
                    </div>
                    {generatedContent.executive_summary && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">סקירה כללית</h3>
                        <p className="text-gray-400">{generatedContent.executive_summary}</p>
                      </div>
                    )}
                    {generatedContent.scope_of_work?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">היקף העבודה</h3>
                        <ul className="space-y-2">
                          {generatedContent.scope_of_work.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400">
                              <span className="text-blue-400">•</span>{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {generatedContent.deliverables?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">תוצרים</h3>
                        <ul className="space-y-2">
                          {generatedContent.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400">
                              <Check className="w-4 h-4 text-green-400 mt-1" />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="glass rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">השקעה</h3>
                      <div className="text-3xl font-bold gradient-text">
                        {currencySymbol}{Number(formData.price).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">לוח זמנים: {formData.timeline}</div>
                    </div>
                  </div>
                </div>
                <button onClick={handleDownloadPDF} className="btn-glow px-4 py-3 rounded-xl text-white font-medium w-full flex items-center justify-center gap-2">
                  <Download className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">הורד PDF</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 min-h-[400px]">
                <p>מלאו את הטופס או נסו את הדוגמה</p>
              </div>
            )}
          </div>
        </div>

        <CaseStudy
          title="איך נולד הכלי"
          context="כל פעם שהיה צריך לשלוח הצעת מחיר, הייתי פותח את הוורד, משנה את השם, מעדכן את המחיר, מתקן את התאריך, ושוכח לעדכן את לוח הזמנים. הצעות לא עקביות, טעויות מביכות."
          solution="טופס פשוט שמייצר הצעה מקצועית ועקבית עם כל הפרטים במקום הנכון. כולל PDF להורדה."
          result="כל הצעה נראית מקצועית. אפס טעויות. והזמן מהבקשה להצעה ירד מ-שעה לדקה."
        />
      </div>
    </div>
  )
}
