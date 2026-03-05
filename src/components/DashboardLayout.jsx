import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { authAPI } from '../lib/api'
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiCreditCard,
  FiPackage,
  FiLogOut,
  FiMenu,
  FiX,
  FiTag,
  FiBookOpen,
  FiFileText,
} from 'react-icons/fi'

const navItems = [
  { to: '/', icon: FiHome, label: 'Overview', end: true },
  { to: '/users', icon: FiUsers, label: 'Users' },
  { to: '/companies', icon: FiBriefcase, label: 'Companies' },
  { to: '/certificates', icon: FiAward, label: 'Certificates' },
  { to: '/certificate-types', icon: FiTag, label: 'Cert. Types' },
  { to: '/courses', icon: FiBookOpen, label: 'Courses' },
  { to: '/course-categories', icon: FiTag, label: 'Course Categories' },
  { to: '/course-plans', icon: FiPackage, label: 'Course Plans' },
  { to: '/plans', icon: FiPackage, label: 'Plans' },
  { to: '/subscriptions', icon: FiCreditCard, label: 'Subscriptions' },
  { to: '/about', icon: FiFileText, label: 'About Page' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authAPI.getMe()
        if (res.data?.data?.role !== 'admin') {
          navigate('/login')
          return
        }
        setAdmin(res.data.data)
      } catch {
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
    } catch {
      // ignore
    }
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 w-64 bg-white border-e border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
          <span className="text-xl font-bold text-primary">
            C<span className="text-primary-light">H</span>
            <span className="text-sm font-normal text-gray-500 ml-2">Admin</span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary text-sm font-bold">
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {admin?.name || 'Admin'}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
