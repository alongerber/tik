import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LoadingScreen from './components/Layout/LoadingScreen'
import Home from './pages/Home'
import DocumentProcessor from './components/Tools/DocumentProcessor'
import EmailCenter from './components/Tools/EmailCenter'
import MeetingConverter from './components/Tools/MeetingConverter'
import ProposalGenerator from './components/Tools/ProposalGenerator'
import ReportGenerator from './components/Tools/ReportGenerator'
import FAQBot from './components/Tools/FAQBot'
import Insights from './pages/Insights'
import Timeline from './pages/Timeline'
import Analytics from './pages/Analytics'
import Blog from './pages/Blog'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Only show loading on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true')
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/documents" element={<DocumentProcessor />} />
        <Route path="/tools/email" element={<EmailCenter />} />
        <Route path="/tools/meetings" element={<MeetingConverter />} />
        <Route path="/tools/proposals" element={<ProposalGenerator />} />
        <Route path="/tools/reports" element={<ReportGenerator />} />
        <Route path="/tools/faq" element={<FAQBot />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Layout>
  )
}

export default App
