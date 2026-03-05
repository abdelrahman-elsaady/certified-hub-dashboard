import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import UsersPage from './pages/UsersPage'
import CompaniesPage from './pages/CompaniesPage'
import CertificatesPage from './pages/CertificatesPage'
import PlansPage from './pages/PlansPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import CertificateTypesPage from './pages/CertificateTypesPage'
import CoursesPage from './pages/CoursesPage'
import CourseCategoriesPage from './pages/CourseCategoriesPage'
import CoursePlansPage from './pages/CoursePlansPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="certificate-types" element={<CertificateTypesPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="course-categories" element={<CourseCategoriesPage />} />
        <Route path="course-plans" element={<CoursePlansPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
