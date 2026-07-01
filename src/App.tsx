// 与善同行 - 应用入口与路由配置
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import HomePage from './pages/HomePage'
// 考生端 Hub 与子页
import StudentHubPage from './pages/StudentHubPage'
import QuizPage from './pages/QuizPage'
import ExamPage from './pages/ExamPage'
import WrongBookPage from './pages/WrongBookPage'
import StudyPlanPage from './pages/StudyPlanPage'
// 社工端 Hub 与子页
import SocialWorkerHubPage from './pages/SocialWorkerHubPage'
import WorkbenchPage from './pages/WorkbenchPage'
import ClientsPage from './pages/ClientsPage'
import CaseKanbanPage from './pages/CaseKanbanPage'
import CaseDetailPage from './pages/CaseDetailPage'
import AIAdvicePage from './pages/AIAdvicePage'
import AlertsPage from './pages/AlertsPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* 考生端 */}
        <Route path="/student" element={<StudentHubPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/wrong-book" element={<WrongBookPage />} />
        <Route path="/study-plan" element={<StudyPlanPage />} />
        {/* 社工端 */}
        <Route path="/social-worker" element={<SocialWorkerHubPage />} />
        <Route path="/workbench" element={<WorkbenchPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/cases" element={<CaseKanbanPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
        <Route path="/ai-advice" element={<AIAdvicePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
