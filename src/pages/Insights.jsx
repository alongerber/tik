import { Link } from 'react-router-dom'
import { ArrowRight, Clock, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'

const insights = [
  {
    id: 1,
    title: 'למה 80% מהדוחות שאתם מכינים מיותרים',
    readTime: '4 דקות',
    category: 'יעילות',
    icon: TrendingUp,
    summary: 'אחרי שנים של הכנת דוחות שבועיים, גיליתי שרובם לא נקראים. הנה מה שבאמת צריך לדווח.',
    content: [
      {
        type: 'intro',
        text: 'כל שבוע הכנתי דוח של 12 עמודים. גרפים, טבלאות, ניתוחים. יום אחד שאלתי את המנהל שלי: "מה הכי חשוב לך בדוח?" התשובה הפתיעה אותי.'
      },
      {
        type: 'insight',
        title: 'מה שמנהלים באמת רוצים לדעת',
        points: [
          'כמה כסף נכנס השבוע (מספר אחד)',
          'מה לא עבד ולמה (2-3 נקודות)',
          'מה צריך את תשומת הלב שלהם (פעולה נדרשת)',
          'זהו. הכל השאר הם מסתכלים רק כשיש בעיה.'
        ]
      },
      {
        type: 'practical',
        title: 'מה עשיתי',
        text: 'קיצרתי את הדוח לעמוד אחד. 3 מספרים למעלה, 3 נקודות באמצע, המלצה אחת בסוף. המנהל אמר שזה הדוח הראשון שהוא קורא עד הסוף.'
      },
      {
        type: 'takeaway',
        text: 'לפני שאתם מכינים דוח, שאלו: "מה ההחלטה שהדוח הזה צריך לתמוך בה?" אם אין החלטה - אין צורך בדוח.'
      }
    ]
  },
  {
    id: 2,
    title: 'הטעות שעולה לכם 5 שעות בשבוע',
    readTime: '3 דקות',
    category: 'אוטומציה',
    icon: Clock,
    summary: 'אם אתם מעתיקים נתונים מאקסל למערכת אחרת יותר מפעם ביום, אתם עושים משהו לא נכון.',
    content: [
      {
        type: 'intro',
        text: 'ספרתי פעם כמה פעמים ביום אני מעתיק נתונים ממקום למקום. 23 פעמים. כל העתקה לקחה 2-5 דקות. עשו את החשבון.'
      },
      {
        type: 'insight',
        title: 'הבעיה האמיתית',
        points: [
          'לא ההעתקה עצמה - אלא הטעויות',
          'שורה שנשכחת, מספר שמתחלף',
          'ואז שעות של "למה המספרים לא מסתדרים?"',
          'הזמן האמיתי: 5 דקות העתקה + 30 דקות תיקון טעויות'
        ]
      },
      {
        type: 'practical',
        title: 'הפתרון הפשוט',
        text: 'אם שתי מערכות צריכות את אותם נתונים, הן צריכות לדבר אחת עם השנייה. לא דרככם. גם אקסל פשוט יכול למשוך נתונים ממקום אחר אוטומטית.'
      },
      {
        type: 'takeaway',
        text: 'כלל אצבע: אם אתם עושים את אותה פעולה ידנית יותר מ-3 פעמים ביום, זה סימן שצריך לאוטומט.'
      }
    ]
  },
  {
    id: 3,
    title: 'איך לזהות עיכוב לפני שהוא קורה',
    readTime: '5 דקות',
    category: 'לוגיסטיקה',
    icon: AlertCircle,
    summary: 'ב-90% מהמקרים, עיכוב במשלוח לא "קורה" - הוא נבנה לאט לאט. הנה הסימנים.',
    content: [
      {
        type: 'intro',
        text: 'משלוח מתעכב וכולם מופתעים. אבל כשחוזרים אחורה, תמיד יש סימנים. למדתי לזהות אותם אחרי שני משלוחים שעלו לי ביוקר.'
      },
      {
        type: 'insight',
        title: 'סימני אזהרה מוקדמים',
        points: [
          'הספק לא עונה למייל תוך 24 שעות (בד"כ עונה תוך שעות)',
          'שינוי קטן בתנאים - "רק יום אחד יותר"',
          'מסמך חסר שמבטיחים לשלוח "מחר"',
          'אנייה משנה נמל טעינה (גם אם "זה רגיל")'
        ]
      },
      {
        type: 'practical',
        title: 'מה עושים',
        text: 'בניתי רשימת בדיקה אוטומטית שמתריעה על כל אחד מהסימנים האלה. לא מחכה שמישהו יבדוק - המערכת שולחת התראה.'
      },
      {
        type: 'takeaway',
        text: 'עיכוב שמזהים 3 ימים מראש עולה שליש מעיכוב שמגלים ביום האחרון. ההשקעה בזיהוי מוקדם משתלמת פי 3.'
      }
    ]
  },
  {
    id: 4,
    title: 'מה למדתי מ-500+ משלוחים בשנה',
    readTime: '6 דקות',
    category: 'ניסיון',
    icon: Lightbulb,
    summary: '9 שנים, אלפי משלוחים, מאות בעיות. הנה 5 דברים שהייתי רוצה לדעת ביום הראשון.',
    content: [
      {
        type: 'intro',
        text: 'התחלתי בתפקיד בלי ידע קודם בספנות. למדתי הכל בדרך הקשה. הנה מה שהיה חוסך לי שנים.'
      },
      {
        type: 'insight',
        title: '5 לקחים מהשטח',
        points: [
          '1. תמיד יש עוד עלות שלא סיפרו לך עליה. תוסיף 15% לכל הצעת מחיר.',
          '2. מסמכים זה 50% מהעבודה. מי ששולט בתיעוד, שולט במשלוח.',
          '3. קשר אישי עם סוכן בנמל שווה יותר מכל מערכת מעקב.',
          '4. הלקוח לא באמת רוצה לדעת איפה המשלוח - הוא רוצה להיות רגוע.',
          '5. 80% מהבעיות חוזרות על עצמן. תתעד פעם אחת, תחסוך לנצח.'
        ]
      },
      {
        type: 'practical',
        title: 'הדבר הכי חשוב',
        text: 'בניתי לעצמי "ספר בעיות" - כל בעיה שנתקלתי בה, איך פתרתי, ומה הייתי עושה אחרת. אחרי שנתיים, כמעט לא היו הפתעות.'
      },
      {
        type: 'takeaway',
        text: 'הניסיון לא נמדד בשנים - נמדד בבעיות שפתרת ובלקחים שהפנמת.'
      }
    ]
  }
]

export default function Insights() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            תובנות מהשטח
          </h1>
          <p className="text-xl text-gray-400">
            דברים שלמדתי ב-9 שנים של תפעול - בלי הסיסמאות
          </p>
        </div>

        <div className="space-y-8">
          {insights.map((insight) => (
            <article key={insight.id} className="glass-card rounded-2xl p-8 hover:border-blue-500/30 transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                  <insight.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      {insight.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {insight.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{insight.title}</h2>
                  <p className="text-gray-400">{insight.summary}</p>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                {insight.content.map((section, i) => (
                  <div key={i}>
                    {section.type === 'intro' && (
                      <p className="text-gray-300 text-lg leading-relaxed">{section.text}</p>
                    )}
                    {section.type === 'insight' && (
                      <div className="bg-slate-800/50 rounded-xl p-5">
                        <h4 className="font-bold text-white mb-3">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.points.map((point, j) => (
                            <li key={j} className="text-gray-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {section.type === 'practical' && (
                      <div className="border-r-2 border-blue-500 pr-4">
                        <h4 className="font-bold text-blue-400 mb-2">{section.title}</h4>
                        <p className="text-gray-300">{section.text}</p>
                      </div>
                    )}
                    {section.type === 'takeaway' && (
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-500/20">
                        <p className="text-white font-medium">
                          <span className="gradient-text">השורה התחתונה: </span>
                          {section.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
