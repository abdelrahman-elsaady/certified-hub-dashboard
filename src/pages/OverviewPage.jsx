import { useState, useEffect } from 'react'
import { adminAPI } from '../lib/api'
import { FiUsers, FiBriefcase, FiAward, FiCreditCard, FiUserCheck, FiClock, FiDollarSign } from 'react-icons/fi'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function OverviewPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getStats()
        setStats(res.data.data)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const cards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FiUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Individual Users',
      value: stats?.individualUsers || 0,
      icon: FiUsers,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
    {
      label: 'Companies',
      value: stats?.totalCompanies || 0,
      icon: FiBriefcase,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Certificates',
      value: stats?.totalCertificates || 0,
      icon: FiAward,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Active Subscriptions',
      value: stats?.activeSubscriptions || 0,
      icon: FiCreditCard,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Trial Subscriptions',
      value: stats?.trialSubscriptions || 0,
      icon: FiClock,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
    },
    {
      label: 'Paid Subscriptions',
      value: stats?.paidSubscriptions || 0,
      icon: FiDollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Employees',
      value: stats?.totalEmployees || 0,
      icon: FiUserCheck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
  ]

  const chartData = [
    { name: 'Users', value: stats?.totalUsers || 0 },
    { name: 'Companies', value: stats?.totalCompanies || 0 },
    { name: 'Certificates', value: stats?.totalCertificates || 0 },
    { name: 'Trial', value: stats?.trialSubscriptions || 0 },
    { name: 'Paid', value: stats?.paidSubscriptions || 0 },
    { name: 'Employees', value: stats?.totalEmployees || 0 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{card.label}</span>
              <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#1B5EAB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
