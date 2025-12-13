import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import DocumentProcessor from './components/Tools/DocumentProcessor'
import EmailCenter from './components/Tools/EmailCenter'
import MeetingConverter from './components/Tools/MeetingConverter'
import ProposalGenerator from './components/Tools/ProposalGenerator'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/documents" element={<DocumentProcessor />} />
        <Route path="/tools/email" element={<EmailCenter />} />
        <Route path="/tools/meetings" element={<MeetingConverter />} />
        <Route path="/tools/proposals" element={<ProposalGenerator />} />
      </Routes>
    </Layout>
  )
}

export default App
