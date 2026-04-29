import { useState, useEffect } from 'react'
import { adminAPI } from '../lib/api'
import { FiCheck, FiX, FiChevronLeft, FiChevronRight, FiTrash2 } from 'react-icons/fi'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })

  const fetchCertificates = async (page = 1) => {
    setLoading(true)
    try {
      const params = { page, limit: 20 }
      if (filter) params.verified = filter
      const res = await adminAPI.getCertificates(params)
      setCertificates(res.data.data || [])
      setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 })
    } catch (err) {
      console.error('Failed to fetch certificates:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates(1)
  }, [filter])

  const handleVerify = async (id, isVerified) => {
    try {
      await adminAPI.verifyCertificate(id, { isVerified })
      setCertificates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isVerified, status: isVerified ? 'verified' : 'rejected' } : c))
      )
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update certificate')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this certificate? This action cannot be undone.')) return
    try {
      await adminAPI.deleteCertificate(id)
      setCertificates((prev) => prev.filter((c) => c._id !== id))
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete certificate')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
        <span className="text-sm text-gray-500">{pagination.total} total</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { label: 'All', value: '' },
          { label: 'Verified', value: 'true' },
          { label: 'Pending', value: 'false' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.value
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">User</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Field</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Expiry</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Photo</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No certificates found
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{cert.user?.name || '—'}</p>
                        <p className="text-xs text-gray-500">{cert.user?.email || ''}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{cert.certificateType?.name?.en || cert.certificateType?.name || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">{cert.field?.name?.en || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(cert.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {cert.certificatePhoto ? (
                        <a
                          href={cert.certificatePhoto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs"
                        >
                          View Photo
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          cert.status === 'verified' ? 'bg-green-50 text-green-700' :
                          cert.status === 'rejected' ? 'bg-red-50 text-red-700' :
                          'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {cert.status === 'verified' ? 'Verified' : 
                         cert.status === 'rejected' ? 'Rejected' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {/* Verify/Reject */}
                        {cert.status !== 'verified' && (
                          <button
                            onClick={() => handleVerify(cert._id, true)}
                            className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="Verify"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                        )}
                        {cert.status === 'verified' && (
                          <button
                            onClick={() => handleVerify(cert._id, false)}
                            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Reject"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cert._id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Certificate"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => fetchCertificates(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => fetchCertificates(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
