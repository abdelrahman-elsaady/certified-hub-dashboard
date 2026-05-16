import { useState, useEffect, useRef } from 'react'
import { aboutAPI } from '../lib/api'
import { IconSelect } from '../components/PageEditor'
import { FiSave, FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiUpload, FiX, FiImage, FiVideo, FiLink } from 'react-icons/fi'
import { useToast } from '../components/ToastProvider'

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

export default function AboutPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [openSections, setOpenSections] = useState({ hero: true })
  const [heroMediaFile, setHeroMediaFile] = useState(null)
  const [heroMediaPreview, setHeroMediaPreview] = useState(null)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const { showToast } = useToast()
  const heroFileRef = useRef(null)
  const [uploadingAboutImage, setUploadingAboutImage] = useState([false, false, false])
  const aboutImageRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await aboutAPI.get()
      setData(res.data.data)
    } catch (err) {
      console.error('Failed to load about page data:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAboutImageUpload = async (index, file) => {
    if (!file) return
    setUploadingAboutImage((prev) => { const n = [...prev]; n[index] = true; return n })
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await aboutAPI.uploadAboutImage(formData)
      const newImages = [...(data.about?.images || ['', '', ''])]
      newImages[index] = res.data.url
      setData((prev) => ({ ...prev, about: { ...prev.about, images: newImages } }))
      showToast({
        type: 'success',
        title: 'Image uploaded',
        text: `About image ${index + 1} uploaded successfully.`,
      })
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Image upload failed',
        text: err.response?.data?.message || 'Upload failed.',
      })
    } finally {
      setUploadingAboutImage((prev) => { const n = [...prev]; n[index] = false; return n })
      if (aboutImageRefs[index].current) aboutImageRefs[index].current.value = ''
    }
  }

  const handleHeroMediaSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setHeroMediaFile(file)
    const url = URL.createObjectURL(file)
    setHeroMediaPreview(url)
  }

  const handleHeroMediaUpload = async () => {
    if (!heroMediaFile) return
    setUploadingMedia(true)
    try {
      const formData = new FormData()
      formData.append('media', heroMediaFile)
      // detect type
      let mediaType = 'image'
      if (heroMediaFile.type === 'image/gif') mediaType = 'gif'
      else if (heroMediaFile.type.startsWith('video/')) mediaType = 'video'
      formData.append('mediaType', mediaType)

      const res = await aboutAPI.uploadHeroMedia(formData)
      setData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          mediaUrl: res.data.data.mediaUrl,
          mediaType: res.data.data.mediaType,
          youtubeUrl: '',
        },
      }))
      setHeroMediaFile(null)
      setHeroMediaPreview(null)
      if (heroFileRef.current) heroFileRef.current.value = ''
      showToast({
        type: 'success',
        title: 'Hero media uploaded',
        text: 'The hero media was uploaded successfully.',
      })
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Hero media upload failed',
        text: err.response?.data?.message || 'Upload failed.',
      })
    } finally {
      setUploadingMedia(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await aboutAPI.update(data)
      showToast({
        type: 'success',
        title: 'About page updated',
        text: 'About page saved successfully.',
      })
    } catch (err) {
      showToast({
        type: 'error',
        title: "Couldn't save About page",
        text: err.response?.data?.message || 'Failed to save.',
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

  const updateArrayItem = (section, arrayField, index, field, value) => {
    setData((prev) => {
      const arr = [...(prev[section]?.[arrayField] || prev[section] || [])]
      if (arrayField) {
        arr[index] = { ...arr[index], [field]: value }
        return { ...prev, [section]: { ...prev[section], [arrayField]: arr } }
      }
      return prev
    })
  }

  const addArrayItem = (section, arrayField, template) => {
    setData((prev) => {
      if (arrayField) {
        const arr = [...(prev[section]?.[arrayField] || [])]
        arr.push(template)
        return { ...prev, [section]: { ...prev[section], [arrayField]: arr } }
      }
      const arr = [...(prev[section] || [])]
      arr.push(template)
      return { ...prev, [section]: arr }
    })
  }

  const removeArrayItem = (section, arrayField, index) => {
    setData((prev) => {
      if (arrayField) {
        const arr = [...(prev[section]?.[arrayField] || [])]
        arr.splice(index, 1)
        return { ...prev, [section]: { ...prev[section], [arrayField]: arr } }
      }
      const arr = [...(prev[section] || [])]
      arr.splice(index, 1)
      return { ...prev, [section]: arr }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-center text-gray-500 py-20">Failed to load about page data.</p>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <FiSave className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
      <div className="space-y-4">

        {/* 1. Hero */}
        <SectionWrapper title="1. Hero Section" open={openSections.hero} onToggle={() => toggleSection('hero')}>
          <BilingualInput label="Tagline" value={data.hero?.tagline} onChange={(v) => updateField('hero', 'tagline', v)} textarea rows={2} />
          <BilingualInput label="Subtitle" value={data.hero?.subtitle} onChange={(v) => updateField('hero', 'subtitle', v)} />

          {/* Media Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Hero Media Type</label>
            <div className="flex gap-2 flex-wrap">
              {['none', 'image', 'gif', 'video', 'youtube'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField('hero', 'mediaType', type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    data.hero?.mediaType === type
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                  }`}
                >
                  {type === 'none' ? 'No Media' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* YouTube URL */}
          {data.hero?.mediaType === 'youtube' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">YouTube URL</label>
              <div className="flex gap-2">
                <FiLink className="w-4 h-4 text-gray-400 mt-2.5 shrink-0" />
                <input
                  value={data.hero?.youtubeUrl || ''}
                  onChange={(e) => updateField('hero', 'youtubeUrl', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
          )}

          {/* File Upload (image / gif / video) */}
          {['image', 'gif', 'video'].includes(data.hero?.mediaType) && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Upload {data.hero?.mediaType === 'video' ? 'Video' : data.hero?.mediaType === 'gif' ? 'GIF' : 'Image'}
              </label>

              {/* Current media preview */}
              {data.hero?.mediaUrl && !heroMediaPreview && (
                <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video">
                  {data.hero.mediaType === 'video' ? (
                    <video src={data.hero.mediaUrl} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={data.hero.mediaUrl} alt="Hero" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 end-2">
                    <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  </div>
                </div>
              )}

              {/* New file preview */}
              {heroMediaPreview && (
                <div className="relative rounded-xl overflow-hidden bg-gray-100 border-2 border-primary aspect-video">
                  {heroMediaFile?.type.startsWith('video/') ? (
                    <video src={heroMediaPreview} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={heroMediaPreview} alt="Preview" className="w-full h-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => { setHeroMediaFile(null); setHeroMediaPreview(null); if (heroFileRef.current) heroFileRef.current.value = '' }}
                    className="absolute top-2 end-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 start-2">
                    <span className="bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full">New — not uploaded yet</span>
                  </div>
                </div>
              )}

              {/* File input + upload button */}
              <div className="flex gap-2">
                <label className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  {data.hero?.mediaType === 'video'
                    ? <FiVideo className="w-4 h-4 text-gray-400" />
                    : <FiImage className="w-4 h-4 text-gray-400" />
                  }
                  <span className="text-sm text-gray-500">
                    {heroMediaFile ? heroMediaFile.name : `Choose ${data.hero?.mediaType}...`}
                  </span>
                  <input
                    ref={heroFileRef}
                    type="file"
                    accept={
                      data.hero?.mediaType === 'video'
                        ? 'video/mp4,video/webm,video/mov'
                        : data.hero?.mediaType === 'gif'
                        ? 'image/gif'
                        : 'image/jpeg,image/png,image/webp'
                    }
                    onChange={handleHeroMediaSelect}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleHeroMediaUpload}
                  disabled={!heroMediaFile || uploadingMedia}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40"
                >
                  <FiUpload className="w-4 h-4" />
                  {uploadingMedia ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              <p className="text-[10px] text-gray-400">
                {data.hero?.mediaType === 'video' ? 'Max 50MB — MP4, WebM, MOV' : data.hero?.mediaType === 'gif' ? 'Max 50MB — GIF' : 'Max 50MB — JPG, PNG, WebP'}
              </p>
            </div>
          )}
        </SectionWrapper>

        {/* 2. About */}
        <SectionWrapper title="2. About Us" open={openSections.about} onToggle={() => toggleSection('about')}>
          <BilingualInput label="Title" value={data.about?.title} onChange={(v) => updateField('about', 'title', v)} />
          <BilingualInput label="Description" value={data.about?.description} onChange={(v) => updateField('about', 'description', v)} textarea rows={5} />
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Section Images (up to 3)</label>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((index) => {
                const currentUrl = data.about?.images?.[index]
                return (
                  <div key={index} className="space-y-2">
                    <span className="text-[10px] text-gray-400 font-medium">Image {index + 1}</span>
                    {/* Preview */}
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
                      {currentUrl ? (
                        <>
                          <img src={currentUrl} alt={`About ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const imgs = [...(data.about?.images || ['', '', ''])]
                              imgs[index] = ''
                              setData((prev) => ({ ...prev, about: { ...prev.about, images: imgs } }))
                            }}
                            className="absolute top-1.5 end-1.5 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-400">
                          <FiImage className="w-6 h-6" />
                          <span className="text-[10px]">No image</span>
                        </div>
                      )}
                      {uploadingAboutImage[index] && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    {/* Upload button */}
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-xs text-gray-500">
                      <FiUpload className="w-3.5 h-3.5" />
                      {uploadingAboutImage[index] ? 'Uploading...' : 'Upload'}
                      <input
                        ref={aboutImageRefs[index]}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleAboutImageUpload(index, e.target.files[0])}
                        disabled={uploadingAboutImage[index]}
                        className="hidden"
                      />
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* 3. Vision */}
        <SectionWrapper title="3. Vision" open={openSections.vision} onToggle={() => toggleSection('vision')}>
          <BilingualInput label="Title" value={data.vision?.title} onChange={(v) => updateField('vision', 'title', v)} />
          <BilingualInput label="Description" value={data.vision?.description} onChange={(v) => updateField('vision', 'description', v)} textarea rows={4} />
        </SectionWrapper>

        {/* 4. Mission */}
        <SectionWrapper title="4. Mission" open={openSections.mission} onToggle={() => toggleSection('mission')}>
          <BilingualInput label="Title" value={data.mission?.title} onChange={(v) => updateField('mission', 'title', v)} />
          <BilingualInput label="Description" value={data.mission?.description} onChange={(v) => updateField('mission', 'description', v)} textarea rows={4} />
        </SectionWrapper>

        {/* 5. Core Values */}
        <SectionWrapper title="5. Core Values" open={openSections.coreValues} onToggle={() => toggleSection('coreValues')}>
          {(data.coreValues || []).map((val, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">Value {i + 1}</span>
                <button onClick={() => { const arr = [...data.coreValues]; arr.splice(i, 1); setData({ ...data, coreValues: arr }) }} className="p-1 text-red-500 hover:bg-red-50 rounded"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
              <BilingualInput label="Title" value={val.title} onChange={(v) => { const arr = [...data.coreValues]; arr[i] = { ...arr[i], title: v }; setData({ ...data, coreValues: arr }) }} />
              <BilingualInput label="Description" value={val.description} onChange={(v) => { const arr = [...data.coreValues]; arr[i] = { ...arr[i], description: v }; setData({ ...data, coreValues: arr }) }} textarea rows={2} />
            </div>
          ))}
          <button onClick={() => setData({ ...data, coreValues: [...(data.coreValues || []), { title: { en: '', ar: '' }, description: { en: '', ar: '' } }] })} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark"><FiPlus className="w-4 h-4" /> Add Value</button>
        </SectionWrapper>

        {/* 6. The Problem */}
        <SectionWrapper title="6. The Problem" open={openSections.problem} onToggle={() => toggleSection('problem')}>
          <BilingualInput label="Title" value={data.problem?.title} onChange={(v) => updateField('problem', 'title', v)} />
          <BilingualInput label="Subtitle" value={data.problem?.subtitle} onChange={(v) => updateField('problem', 'subtitle', v)} />
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Problem Points</label>
            {(data.problem?.points || []).map((pt, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span className="text-xs text-gray-400 mt-2.5 shrink-0">{i + 1}.</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input value={pt?.en || ''} onChange={(e) => { const pts = [...data.problem.points]; pts[i] = { ...pts[i], en: e.target.value }; updateField('problem', 'points', pts) }} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="EN" />
                  <input value={pt?.ar || ''} onChange={(e) => { const pts = [...data.problem.points]; pts[i] = { ...pts[i], ar: e.target.value }; updateField('problem', 'points', pts) }} dir="rtl" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="AR" />
                </div>
                <button onClick={() => { const pts = [...data.problem.points]; pts.splice(i, 1); updateField('problem', 'points', pts) }} className="p-1.5 text-red-500 hover:bg-red-50 rounded mt-1"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            <button onClick={() => updateField('problem', 'points', [...(data.problem?.points || []), { en: '', ar: '' }])} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark"><FiPlus className="w-4 h-4" /> Add Point</button>
          </div>
          <BilingualInput label="Result Statement" value={data.problem?.result} onChange={(v) => updateField('problem', 'result', v)} textarea rows={2} />
        </SectionWrapper>

        {/* 7. Our Solution */}
        <SectionWrapper title="7. Our Solution" open={openSections.solution} onToggle={() => toggleSection('solution')}>
          <BilingualInput label="Title" value={data.solution?.title} onChange={(v) => updateField('solution', 'title', v)} />
          <BilingualInput label="Subtitle" value={data.solution?.subtitle} onChange={(v) => updateField('solution', 'subtitle', v)} />
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Features</label>
            {(data.solution?.features || []).map((feat, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Feature {i + 1}</span>
                  <button onClick={() => removeArrayItem('solution', 'features', i)} className="p-1 text-red-500 hover:bg-red-50 rounded"><FiTrash2 className="w-3.5 h-3.5" /></button>
                </div>
                <IconSelect value={feat.icon} onChange={(v) => updateArrayItem('solution', 'features', i, 'icon', v)} />
                <BilingualInput label="Title" value={feat.title} onChange={(v) => updateArrayItem('solution', 'features', i, 'title', v)} />
                <BilingualInput label="Description" value={feat.description} onChange={(v) => updateArrayItem('solution', 'features', i, 'description', v)} textarea rows={2} />
              </div>
            ))}
            <button onClick={() => addArrayItem('solution', 'features', { icon: '', title: { en: '', ar: '' }, description: { en: '', ar: '' } })} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark"><FiPlus className="w-4 h-4" /> Add Feature</button>
          </div>
          <BilingualInput label="Result Statement" value={data.solution?.result} onChange={(v) => updateField('solution', 'result', v)} textarea rows={2} />
        </SectionWrapper>

        {/* 8. Objectives */}
        <SectionWrapper title="8. Objectives" open={openSections.objectives} onToggle={() => toggleSection('objectives')}>
          <BilingualInput label="Section Title" value={data.objectives?.title} onChange={(v) => updateField('objectives', 'title', v)} />
          {(data.objectives?.items || []).map((obj, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">Objective {i + 1}</span>
                <button onClick={() => removeArrayItem('objectives', 'items', i)} className="p-1 text-red-500 hover:bg-red-50 rounded"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
              <BilingualInput label="Title" value={obj.title} onChange={(v) => updateArrayItem('objectives', 'items', i, 'title', v)} />
              <BilingualInput label="Description" value={obj.description} onChange={(v) => updateArrayItem('objectives', 'items', i, 'description', v)} textarea rows={2} />
            </div>
          ))}
          <button onClick={() => addArrayItem('objectives', 'items', { title: { en: '', ar: '' }, description: { en: '', ar: '' } })} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark"><FiPlus className="w-4 h-4" /> Add Objective</button>
        </SectionWrapper>

        {/* 9. FAQ */}
        <SectionWrapper title="9. FAQ" open={openSections.faq} onToggle={() => toggleSection('faq')}>
          <BilingualInput label="Section Title" value={data.faq?.title} onChange={(v) => updateField('faq', 'title', v)} />
          {(data.faq?.items || []).map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">FAQ {i + 1}</span>
                <button onClick={() => removeArrayItem('faq', 'items', i)} className="p-1 text-red-500 hover:bg-red-50 rounded"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
              <BilingualInput label="Question" value={item.question} onChange={(v) => updateArrayItem('faq', 'items', i, 'question', v)} />
              <BilingualInput label="Answer" value={item.answer} onChange={(v) => updateArrayItem('faq', 'items', i, 'answer', v)} textarea rows={3} />
            </div>
          ))}
          <button onClick={() => addArrayItem('faq', 'items', { question: { en: '', ar: '' }, answer: { en: '', ar: '' } })} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark"><FiPlus className="w-4 h-4" /> Add FAQ</button>
        </SectionWrapper>

      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 mt-6 py-4 bg-gray-100/80 backdrop-blur-sm border-t border-gray-200 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <FiSave className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
