import { useState, useEffect } from 'react'
import { FiSave, FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useToast } from './ToastProvider'

const BilingualInput = ({ label, value, onChange, textarea = false, rows = 3 }) => (
  <div className="space-y-2">
    {label && <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>}
    <div className="grid grid-cols-2 gap-3">
      <div>
        <span className="text-[10px] text-gray-400 mb-0.5 block">English</span>
        {textarea ? (
          <textarea
            value={value?.en || ''}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            rows={rows}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        ) : (
          <input
            value={value?.en || ''}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        )}
      </div>
      <div>
        <span className="text-[10px] text-gray-400 mb-0.5 block">Arabic</span>
        {textarea ? (
          <textarea
            value={value?.ar || ''}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
            rows={rows}
            dir="rtl"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        ) : (
          <input
            value={value?.ar || ''}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
            dir="rtl"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        )}
      </div>
    </div>
  </div>
)

const SectionWrapper = ({ title, open, onToggle, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      {open ? <FiChevronUp className="w-4 h-4 text-gray-400" /> : <FiChevronDown className="w-4 h-4 text-gray-400" />}
    </button>
    {open && <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">{children}</div>}
  </div>
)

const ArrayEditor = ({ label, items, onChange, template, renderItem }) => {
  if (!items) return null
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
        <button
          type="button"
          onClick={() => onChange([...items, template])}
          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-dark font-medium"
        >
          <FiPlus className="w-3 h-3" /> Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
          {renderItem(item, i, (updated) => {
            const newItems = [...items]
            newItems[i] = updated
            onChange(newItems)
          })}
        </div>
      ))}
    </div>
  )
}

const BilingualArrayEditor = ({ label, items, onChange }) => (
  <ArrayEditor
    label={label}
    items={items}
    onChange={onChange}
    template={{ en: '', ar: '' }}
    renderItem={(item, i, onUpdate) => (
      <BilingualInput
        value={item}
        onChange={onUpdate}
        textarea
        rows={2}
      />
    )}
  />
)

const ICON_OPTIONS = [
  { value: 'FiBookOpen', label: 'Book / Training' },
  { value: 'FiAward', label: 'Award / Trophy' },
  { value: 'FiShield', label: 'Shield / Security' },
  { value: 'FiCheckCircle', label: 'Check / Verified' },
  { value: 'FiUsers', label: 'Users / Team' },
  { value: 'FiUser', label: 'User / Person' },
  { value: 'FiUserPlus', label: 'User Plus / Recruit' },
  { value: 'FiBell', label: 'Bell / Alert' },
  { value: 'FiStar', label: 'Star / Favorite' },
  { value: 'FiTrendingUp', label: 'Trending Up / Growth' },
  { value: 'FiAlertCircle', label: 'Alert Circle / Warning' },
  { value: 'FiFileText', label: 'File / Document' },
  { value: 'FiMapPin', label: 'Map Pin / Location' },
  { value: 'FiGlobe', label: 'Globe / World' },
  { value: 'FiZap', label: 'Zap / Lightning' },
  { value: 'FiClock', label: 'Clock / Time' },
  { value: 'FiMonitor', label: 'Monitor / Dashboard' },
  { value: 'FiBriefcase', label: 'Briefcase / Business' },
  { value: 'FiHome', label: 'Home / Building' },
  { value: 'FiSearch', label: 'Search' },
  { value: 'FiGrid', label: 'Grid / Layout' },
  { value: 'FiTarget', label: 'Target / Goal' },
  { value: 'FiLock', label: 'Lock / Secure' },
  { value: 'FiMail', label: 'Mail / Email' },
  { value: 'FiPhone', label: 'Phone' },
  { value: 'FiMessageCircle', label: 'Message / Chat' },
  { value: 'FiLink', label: 'Link' },
  { value: 'FiImage', label: 'Image / Photo' },
  { value: 'FiVideo', label: 'Video' },
  { value: 'FiUpload', label: 'Upload' },
  { value: 'FiDownload', label: 'Download' },
  { value: 'FiHeart', label: 'Heart' },
  { value: 'FiThumbsUp', label: 'Thumbs Up' },
  { value: 'FiFlag', label: 'Flag' },
  { value: 'FiPercent', label: 'Percent / Discount' },
  { value: 'FiDollarSign', label: 'Dollar / Price' },
  { value: 'FiCalendar', label: 'Calendar' },
  { value: 'FiBarChart2', label: 'Bar Chart / Analytics' },
  { value: 'FiPieChart', label: 'Pie Chart' },
  { value: 'FiSettings', label: 'Settings / Gear' },
  { value: 'FiTool', label: 'Tool / Wrench' },
  { value: 'FiLayers', label: 'Layers / Stack' },
  { value: 'FiPackage', label: 'Package / Box' },
  { value: 'FiTruck', label: 'Truck / Delivery' },
  { value: 'FiHeadphones', label: 'Headphones / Support' },
  { value: 'FiLifeBuoy', label: 'Life Buoy / Help' },
  { value: 'FiClipboard', label: 'Clipboard / Checklist' },
  { value: 'FiEdit3', label: 'Edit / Pencil' },
  { value: 'FiExternalLink', label: 'External Link' },
  { value: 'FiArrowRight', label: 'Arrow Right' },
  { value: 'FiArrowUp', label: 'Arrow Up' },
  { value: 'FiChevronRight', label: 'Chevron Right' },
  { value: 'FiCornerRightUp', label: 'Corner Up' },
]

const IconSelect = ({ value, onChange }) => (
  <div>
    <label className="block text-[10px] text-gray-400 mb-0.5">Icon</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    >
      <option value="">Select icon</option>
      {ICON_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
)

export { BilingualInput, SectionWrapper, ArrayEditor, BilingualArrayEditor, IconSelect, ICON_OPTIONS }

export default function PageEditor({ apiGet, apiUpdate, pageName, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await apiGet()
      setData(res.data.data)
    } catch (err) {
      console.error(`Failed to load ${pageName} data:`, err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await apiUpdate(data)
      showToast({
        type: 'success',
        title: `${pageName} updated`,
        text: `${pageName} saved successfully.`,
      })
    } catch (err) {
      showToast({
        type: 'error',
        title: `Couldn't save ${pageName}`,
        text: err.response?.data?.message || 'Failed to save your changes.',
      })
    } finally {
      setSaving(false)
    }
  }

  const updateField = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const updateDeepField = (path, value) => {
    setData((prev) => {
      const keys = path.split('.')
      const result = { ...prev }
      let current = result
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return result
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{pageName}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <FiSave className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {children({ data, setData, updateField, updateDeepField })}
    </div>
  )
}
