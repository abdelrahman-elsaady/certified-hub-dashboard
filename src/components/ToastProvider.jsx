import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'

const ToastContext = createContext(null)

const TOAST_STYLES = {
  success: {
    icon: FiCheckCircle,
    card: 'border-emerald-200 bg-white',
    iconWrap: 'bg-emerald-50 text-emerald-600',
    title: 'Success',
    duration: 3200,
  },
  error: {
    icon: FiAlertCircle,
    card: 'border-red-200 bg-white',
    iconWrap: 'bg-red-50 text-red-600',
    title: 'Something went wrong',
    duration: 5200,
  },
  info: {
    icon: FiInfo,
    card: 'border-sky-200 bg-white',
    iconWrap: 'bg-sky-50 text-sky-600',
    title: 'Notice',
    duration: 3600,
  },
}

function ToastViewport({ toasts, removeToast }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 top-4 z-[120] flex flex-col items-center gap-3 sm:inset-x-auto sm:end-4 sm:items-end"
    >
      {toasts.map((toast) => {
        const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info
        const Icon = style.icon

        return (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto w-full max-w-sm rounded-2xl border shadow-[0_16px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur ${style.card}`}
          >
            <div className="flex items-start gap-3 p-4">
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconWrap}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {toast.title || style.title}
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-600">
                  {toast.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Dismiss notification"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ type = 'info', title, text, duration }) => {
    if (!text) return null

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const resolvedDuration = duration ?? TOAST_STYLES[type]?.duration ?? 3600

    setToasts((prev) => [...prev, { id, type, title, text }])

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, resolvedDuration)

    return id
  }, [])

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [removeToast, showToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
