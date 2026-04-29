import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import IndividualsPage from './pages/IndividualsPage'
import CompaniesPage from './pages/CompaniesPage'
import CertificatesPage from './pages/CertificatesPage'
import PlansPage from './pages/PlansPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import CertificateTypesPage from './pages/CertificateTypesPage'
import CertificateFieldsPage from './pages/CertificateFieldsPage'
import CoursesPage from './pages/CoursesPage'
import CourseCategoriesPage from './pages/CourseCategoriesPage'
import CoursePlansPage from './pages/CoursePlansPage'
import AboutPage from './pages/AboutPage'
import ContactMessagesPage from './pages/ContactMessagesPage'
import HomePage from './pages/HomePage'
import PartnersPage from './pages/PartnersPage'
import KnowledgeHubPage from './pages/KnowledgeHubPage'
import ForIndividualsPage from './pages/ForIndividualsPage'
import ForEmployersPage from './pages/ForEmployersPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import CertifiedStaffPage from './pages/CertifiedStaffPage'
import SiteSettingsPage from './pages/SiteSettingsPage'
import ListOptionsPage from './pages/ListOptionsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="individuals" element={<IndividualsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="certificate-types" element={<CertificateTypesPage />} />
        <Route path="certificate-fields" element={<CertificateFieldsPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="course-categories" element={<CourseCategoriesPage />} />
        <Route path="course-plans" element={<CoursePlansPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactMessagesPage />} />
        <Route path="page-home" element={<HomePage />} />
        <Route path="page-partners" element={<PartnersPage />} />
        <Route path="page-knowledge-hub" element={<KnowledgeHubPage />} />
        <Route path="page-for-individuals" element={<ForIndividualsPage />} />
        <Route path="page-for-employers" element={<ForEmployersPage />} />
        <Route path="page-contact" element={<ContactPage />} />
        <Route path="page-legal" element={<LegalPage />} />
        <Route path="page-certified-staff" element={<CertifiedStaffPage />} />
        <Route path="site-settings" element={<SiteSettingsPage />} />
        <Route path="list-options" element={<ListOptionsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
