import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
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

function App() {
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
      </Routes>
    </Layout>
  )
}

export default App
