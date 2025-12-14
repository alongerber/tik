import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, ArrowLeft, BookOpen, Lightbulb, TrendingUp, Shield, Zap } from 'lucide-react'

const articles = [
  {
    id: 1,
    icon: TrendingUp,
    title: '5 טעויות יקרות ביבוא שאפשר למנוע בקלות',
    subtitle: 'למדתי אותן בדרך הקשה - אתם לא חייבים',
    readTime: '4 דקות',
    gradient: 'from-red-500 to-orange-500',
    content: `
## למה זה חשוב?
בכל שנה, יבואנים ישראליים מפסידים מיליוני שקלים על טעויות שניתן למנוע. אחרי 15 שנה בתחום, ריכזתי את 5 הטעויות הנפוצות ביותר.

## 1. סיווג מכס שגוי
**הבעיה:** רבים מסתמכים על הספק לסווג את הסחורה, אבל הספק לא מכיר את ההנחות וההסכמים של ישראל.

**הפתרון:** בדקו תמיד את הסיווג מול רשימת הפרקים במכס. ישראל חתומה על הסכמי סחר חופשי עם האיחוד האירופי, ארה"ב ומדינות נוספות - זה יכול לחסוך 6-12% מכס!

**טיפ מעשי:** השתמשו באתר רשות המיסים לבדיקת מכסים לפי קוד HS.

## 2. אי-ניצול תעודות מקור
**הבעיה:** יבואנים משלמים מכס מלא כי לא ביקשו EUR.1 או תעודת מקור מהספק.

**מספרים:** על משלוח של 100,000$ מאירופה, תעודת מקור חוסכת ~8,000$ מכס.

**הפתרון:** כבר בשלב ההזמנה, דרשו תעודת מקור. זה עולה לספק 50-100$ אבל חוסך לכם אלפים.

## 3. ביטוח לא מתאים
**הבעיה:** רבים מסתפקים בביטוח בסיסי של חברת הספנות (אחריות מוגבלת ל-500$ לאריזה).

**הפתרון:** ביטוח פרטי All Risk עולה 0.3-0.5% מערך הסחורה ומכסה נזק מלא.

## 4. תנאי תשלום לא נכונים
**הבעיה:** תשלום מראש (T/T) לספק חדש = סיכון.

**הפתרון:** L/C (מכתב אשראי) בעסקה ראשונה, ואז מעבר הדרגתי ל-30/60/90 ימים.

## 5. אי-בדיקת הספק מראש
**הבעיה:** הזמנה מספק שנראה זול, אבל הסחורה באיכות ירודה או לא מגיעה בכלל.

**הפתרון:** בקשו דוגמאות, בדקו ב-Alibaba את הדירוג, ושלחו מפקח מטעמכם למפעל.

## סיכום
כל טעות כאן יכולה לעלות אלפי עד עשרות אלפי שקלים. ההשקעה בלמידה ובבדיקה מראש משתלמת פי כמה וכמה.
    `,
  },
  {
    id: 2,
    icon: Shield,
    title: 'איך לבחור סוכן מכס - השאלות שחייבים לשאול',
    subtitle: 'המדריך שהלוואי שהיה לי בהתחלה',
    readTime: '3 דקות',
    gradient: 'from-blue-500 to-cyan-500',
    content: `
## למה סוכן המכס כל כך קריטי?
סוכן המכס הוא לא רק מישהו שממלא טפסים. הוא השותף שלכם בכל עסקה - וטעות שלו עולה לכם כסף.

## 5 שאלות שחייבים לשאול

### 1. "מה הניסיון שלכם בתחום הספציפי שלי?"
סוכן שמתמחה באלקטרוניקה לא בהכרח מכיר מזון או כימיקלים. כל תחום דורש ידע ספציפי ברגולציה.

### 2. "מה זמן השחרור הממוצע שלכם?"
סוכן טוב משחרר תוך 24-48 שעות. מעל 72 שעות? בעיה.

### 3. "האם יש לכם קשרים עם בודקי המכס?"
לא מדובר בשוחד - אלא במוניטין מקצועי. סוכן מוכר עובר בדיקות מהר יותר.

### 4. "מה כלול במחיר?"
בקשו פירוט: שחרור, אחסנה, הובלה, ייצוג. הפתעות בחשבונית = סימן רע.

### 5. "מה קורה אם יש בעיה?"
בקשו דוגמה לבעיה שפתרו. סוכן טוב יספר לכם על מקרה שהציל יבואן מקנס.

## טיפ זהב: בקשו המלצות
דברו עם 2-3 לקוחות קיימים. שאלו ספציפית על תקשורת, מהירות, ופתרון בעיות.

## מה לא להתפשר עליו?
- זמינות בטלפון
- דיווחים שוטפים על סטטוס המשלוח
- יכולת להתריע על בעיות פוטנציאליות מראש
    `,
  },
  {
    id: 3,
    icon: Zap,
    title: 'אוטומציה בלוגיסטיקה: מאיפה להתחיל?',
    subtitle: 'המדריך המעשי ליבואן שרוצה לעבוד חכם',
    readTime: '5 דקות',
    gradient: 'from-purple-500 to-pink-500',
    content: `
## למה עכשיו?
ב-2024, יבואנים שעובדים "בשיטות הישנות" מפסידים ליבואנים שאימצו אוטומציה. לא מדובר במיליונים - אפשר להתחיל בחינם.

## שלב 1: זהו את "כאבי הראש" שלכם
**שאלו את עצמכם:**
- כמה זמן אתם מבלים על מעקב משלוחים?
- כמה פעמים שכחתם לעקוב אחרי מועד אספקה?
- כמה זמן לוקח להכין דוח למנהל?

## שלב 2: התחילו קטן
**אוטומציה ראשונה מומלצת: התראות משלוח**

במקום לבדוק ידנית את אתר חברת הספנות, השתמשו ב:
- **Flexport** - מעקב אוטומטי + התראות
- **Freightos** - השוואת מחירים + tracking
- **Project44** - visibility בזמן אמת

**עלות:** רוב השירותים חינמיים לכמויות קטנות.

## שלב 3: אוטומציה של מסמכים
**הבעיה:** העתקה ידנית של נתונים מחשבונית ל-Excel ל-ERP.

**הפתרון:** כלי OCR + AI שקוראים מסמכים אוטומטית.
- חיסכון: 2-3 שעות עבודה ליום
- דיוק: 99% לעומת 95% ידני

## שלב 4: דוחות אוטומטיים
**במקום:** לשבת שעתיים על Excel כל שבוע
**עכשיו:** דוח נשלח אוטומטית ב-PDF לכל הנוגעים בדבר

## ROI מציאותי
| פעולה | זמן ידני | זמן עם אוטומציה | חיסכון שנתי |
|-------|----------|-----------------|-------------|
| מעקב משלוחים | 1 שעה/יום | 5 דקות | 200+ שעות |
| הזנת מסמכים | 2 שעות/יום | 10 דקות | 400+ שעות |
| דוחות | 3 שעות/שבוע | 0 | 150 שעות |

## סיכום
אל תנסו לאטמט הכל ביום אחד. התחילו מדבר אחד שמציק לכם, ראו תוצאות, והמשיכו משם.
    `,
  },
  {
    id: 4,
    icon: Lightbulb,
    title: 'Incoterms 2020: מה שבאמת צריך לדעת',
    subtitle: 'בלי השטויות - רק מה שמשפיע על הכסף שלכם',
    readTime: '4 דקות',
    gradient: 'from-amber-500 to-yellow-500',
    content: `
## למה Incoterms חשובים?
תנאי המכר קובעים מי משלם על מה, ומי אחראי לסחורה בכל שלב. טעות כאן = הפתעות יקרות.

## 3 התנאים הכי נפוצים (ומתי להשתמש בכל אחד)

### EXW (Ex Works) - "מהמפעל"
**מה זה אומר:** אתם אחראים לכל: איסוף מהמפעל, ביטוח, הובלה, מכס.

**מתי להשתמש:** כשיש לכם סוכן שילוח טוב ואתם רוצים שליטה מלאה.

**מתי לא:** עסקה ראשונה עם ספק / אין לכם ניסיון בייצוא מאותה מדינה.

**טיפ:** עלות EXW + שילוח עצמאי לפעמים זולה ב-15-20% מ-CIF.

### FOB (Free On Board) - "על הסיפון"
**מה זה אומר:** הספק אחראי עד שהסחורה עלתה על האונייה. משם - עליכם.

**מתי להשתמש:** התנאי הכי מאוזן. מומלץ לרוב העסקאות.

**יתרון:** אתם בוחרים את חברת הספנות (=שליטה על עלויות ולוחות זמנים).

### CIF (Cost, Insurance, Freight) - "עלות, ביטוח, הובלה"
**מה זה אומר:** הספק מביא את הסחורה עד הנמל בישראל, כולל ביטוח.

**מתי להשתמש:** כשאתם רוצים פשטות ואין לכם זמן להתעסק.

**אזהרה:** הביטוח של הספק בדרך כלל מינימלי. בדקו את הפוליסה!

## טעות נפוצה: DAP
**DAP (Delivered at Place)** - הספק מביא עד המחסן שלכם.

**למה להיזהר:** אם יש עיכוב במכס, אתם עדיין משלמים אחסנה בנמל. הספק "סיים" כשהסחורה הגיעה - לא כשהיא אצלכם.

## טבלת החלטה מהירה

| אני רוצה... | התנאי המתאים |
|-------------|--------------|
| מחיר הכי נמוך | EXW |
| איזון בין שליטה לפשטות | FOB |
| הכי פשוט, בלי כאב ראש | CIF |
| שהספק יביא עד אליי | DDP |

## הטיפ שווה הכי הרבה כסף
**תמיד השוו:** קבלו הצעה EXW + הצעת שילוח עצמאית, לעומת CIF מהספק. לפעמים ההפרש מגיע ל-20%.
    `,
  },
  {
    id: 5,
    icon: BookOpen,
    title: 'בדיקת סחורה בסין: השקעה או בזבוז?',
    subtitle: 'מתי זה הכרחי, מתי זה מיותר, וכמה זה באמת עולה',
    readTime: '4 דקות',
    gradient: 'from-green-500 to-emerald-500',
    content: `
## הדילמה
הזמנתם סחורה ב-50,000$. בדיקה במפעל עולה 300$. האם זה שווה?

## התשובה הקצרה: תלוי

### מתי בדיקה היא חובה?
1. **עסקה ראשונה עם ספק חדש** - אין אמון, אין היסטוריה
2. **מוצר מורכב טכנית** - אלקטרוניקה, מכונות, רכיבים מדויקים
3. **הזמנה גדולה** - מעל 20,000$ = סיכון גדול מדי
4. **מוצר עם רגולציה** - CE, FDA, תקנים ישראליים
5. **ספק שכבר אכזב** - הזדמנות שנייה, אבל עם פיקוח

### מתי אפשר לוותר?
1. ספק ותיק עם הזמנות מוצלחות קודמות
2. מוצר פשוט (שקיות, קרטונים, טקסטיל בסיסי)
3. הזמנה קטנה שניתנת להחלפה בקלות

## סוגי בדיקות ועלויות

| סוג בדיקה | מה בודקים | עלות משוערת |
|-----------|-----------|-------------|
| PSI (Pre-Shipment) | כמות, מראה, אריזה | $150-300 |
| During Production | תהליך ייצור, חומרי גלם | $200-400 |
| Lab Testing | תקנים, בטיחות, הרכב | $300-1000+ |
| Factory Audit | יכולות המפעל, תנאים | $400-600 |

## חברות בדיקה מומלצות
- **SGS** - הכי גדולה, הכי יקרה, הכי אמינה
- **Bureau Veritas** - איכות דומה, קצת יותר זולה
- **QIMA** - טובה למוצרי צריכה, מחירים תחרותיים
- **Asia Inspection** - מחירים נמוכים, איכות סבירה

## הסיפור שמלמד הכל
יבואן הזמין 10,000 יחידות של מוצר אלקטרוני. חסך 300$ על בדיקה. הסחורה הגיעה - 40% לא עבדו. עלות הנזק: החזרת כסף ללקוחות, מוניטין, זמן. סה"כ: ~30,000$.

## המלצה מעשית
**בדיקה מינימלית לכל הזמנה מעל 10,000$:**
- תמונות וידאו לפני האריזה (בקשו מהספק, חינם)
- PSI בסיסי (300$)
- שמירת דוגמה אחת לפני המשלוח

## סיכום
300$ על בדיקה זה לא הוצאה - זה ביטוח. על משלוח של 50,000$ זה 0.6%. שווה כל שקל.
    `,
  },
]

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  if (selectedArticle) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לכל המאמרים
          </button>

          <article className="glass-card rounded-2xl p-8 md:p-12">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${selectedArticle.gradient} bg-opacity-20 text-white text-sm mb-4`}>
              <selectedArticle.icon className="w-4 h-4" />
              <span>{selectedArticle.readTime} קריאה</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {selectedArticle.title}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              {selectedArticle.subtitle}
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              {selectedArticle.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold text-white">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-gray-300 mr-4">{line.replace('- ', '')}</li>
                }
                if (line.startsWith('|')) {
                  return null // Skip table rows for now
                }
                if (line.trim() === '') {
                  return <br key={i} />
                }
                // Handle inline bold
                const parts = line.split(/(\*\*.*?\*\*)/)
                return (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    {parts.map((part, j) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="text-white">{part.replace(/\*\*/g, '')}</strong>
                        : part
                    )}
                  </p>
                )
              })}
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 text-sm text-purple-300">
            <BookOpen className="w-4 h-4" />
            תובנות מהשטח
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            בלוג
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            טיפים מעשיים מ-15 שנות ניסיון בלוגיסטיקה ויבוא.
            <br />
            <span className="text-gray-300">בלי תיאוריה - רק מה שעובד.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group glass-card rounded-2xl p-6 text-right card-shine block w-full"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${article.gradient} p-0.5 mb-4`}>
                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                  <article.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {article.subtitle}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span className="text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                  קראו עוד
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
