import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

const CONTACT_ICONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'location', label: 'Location' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'website', label: 'Website' },
]

export default function ContactPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getContact}
      apiUpdate={pagesAPI.updateContact}
      pageName="Contact Page"
    >
      {({ data, setData, updateField }) => (
        <>
          <SectionWrapper
            title="Hero Section"
            open={openSections.hero}
            onToggle={() => setOpenSections(p => ({ ...p, hero: !p.hero }))}
          >
            <BilingualInput label="Title" value={data?.hero?.title} onChange={(v) => updateField('hero', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.hero?.subtitle} onChange={(v) => updateField('hero', 'subtitle', v)} />
            <BilingualInput label="Description" value={data?.hero?.heroDesc} onChange={(v) => updateField('hero', 'heroDesc', v)} textarea />
          </SectionWrapper>

          <SectionWrapper
            title="Contact Cards"
            open={openSections.cards}
            onToggle={() => setOpenSections(p => ({ ...p, cards: !p.cards }))}
          >
            <ArrayEditor
              label="Contact Cards"
              items={data?.cards || []}
              onChange={(items) => setData(prev => ({ ...prev, cards: items }))}
              template={{ icon: 'email', label: { en: '', ar: '' }, value: { en: '', ar: '' }, href: '' }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Icon</label>
                      <select
                        value={item.icon || 'email'}
                        onChange={(e) => onUpdate({ ...item, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        {CONTACT_ICONS.map(icon => (
                          <option key={icon.value} value={icon.value}>{icon.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Link (optional)</label>
                      <input value={item.href || ''} onChange={(e) => onUpdate({ ...item, href: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                    </div>
                  </div>
                  <BilingualInput label="Label" value={item.label} onChange={(v) => onUpdate({ ...item, label: v })} />
                  <BilingualInput label="Value" value={item.value} onChange={(v) => onUpdate({ ...item, value: v })} />
                </>
              )}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Form Section"
            open={openSections.form}
            onToggle={() => setOpenSections(p => ({ ...p, form: !p.form }))}
          >
            <BilingualInput label="Form Title" value={data?.form?.title} onChange={(v) => updateField('form', 'title', v)} />
            <BilingualInput label="Name Label" value={data?.form?.name} onChange={(v) => updateField('form', 'name', v)} />
            <BilingualInput label="Email Label" value={data?.form?.email} onChange={(v) => updateField('form', 'email', v)} />
            <BilingualInput label="Subject Label" value={data?.form?.subject} onChange={(v) => updateField('form', 'subject', v)} />
            <BilingualInput label="Message Label" value={data?.form?.message} onChange={(v) => updateField('form', 'message', v)} />
            <BilingualInput label="Submit Button" value={data?.form?.submit} onChange={(v) => updateField('form', 'submit', v)} />
            <BilingualInput label="Success Message" value={data?.form?.success} onChange={(v) => updateField('form', 'success', v)} />
            <BilingualInput label="Error Message" value={data?.form?.error} onChange={(v) => updateField('form', 'error', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
