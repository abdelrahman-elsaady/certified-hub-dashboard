import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor, BilingualArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function PartnersPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getPartners}
      apiUpdate={pagesAPI.updatePartners}
      pageName="Partners Page"
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
            <BilingualInput label="CTA Apply" value={data?.hero?.ctaApply} onChange={(v) => updateField('hero', 'ctaApply', v)} />
            <BilingualInput label="CTA Join" value={data?.hero?.ctaJoin} onChange={(v) => updateField('hero', 'ctaJoin', v)} />
          </SectionWrapper>

          <SectionWrapper
            title="Benefits"
            open={openSections.benefits}
            onToggle={() => setOpenSections(p => ({ ...p, benefits: !p.benefits }))}
          >
            <ArrayEditor
              label="Benefits"
              items={data?.benefits || []}
              onChange={(items) => setData(prev => ({ ...prev, benefits: items }))}
              template={{ icon: '', title: { en: '', ar: '' }, desc: { en: '', ar: '' } }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <input value={item.icon || ''} onChange={(e) => onUpdate({ ...item, icon: e.target.value })} placeholder="Icon name" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                  <BilingualInput label="Title" value={item.title} onChange={(v) => onUpdate({ ...item, title: v })} />
                  <BilingualInput label="Description" value={item.desc} onChange={(v) => onUpdate({ ...item, desc: v })} textarea />
                </>
              )}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Partner Types"
            open={openSections.types}
            onToggle={() => setOpenSections(p => ({ ...p, types: !p.types }))}
          >
            <BilingualInput label="Section Title" value={data?.typesTitle} onChange={(v) => setData(prev => ({ ...prev, typesTitle: v }))} />
            <ArrayEditor
              label="Partner Types"
              items={data?.partnerTypes || []}
              onChange={(items) => setData(prev => ({ ...prev, partnerTypes: items }))}
              template={{ icon: '', title: { en: '', ar: '' }, desc: { en: '', ar: '' } }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <input value={item.icon || ''} onChange={(e) => onUpdate({ ...item, icon: e.target.value })} placeholder="Icon name" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                  <BilingualInput label="Title" value={item.title} onChange={(v) => onUpdate({ ...item, title: v })} />
                  <BilingualInput label="Description" value={item.desc} onChange={(v) => onUpdate({ ...item, desc: v })} textarea />
                </>
              )}
            />
          </SectionWrapper>

          <SectionWrapper
            title="CTA Section"
            open={openSections.cta}
            onToggle={() => setOpenSections(p => ({ ...p, cta: !p.cta }))}
          >
            <BilingualInput label="Title" value={data?.cta?.title} onChange={(v) => updateField('cta', 'title', v)} />
            <BilingualInput label="CTA Apply" value={data?.cta?.ctaApply} onChange={(v) => updateField('cta', 'ctaApply', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
