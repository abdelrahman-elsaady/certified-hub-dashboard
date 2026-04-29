import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function HomePage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getHome}
      apiUpdate={pagesAPI.updateHome}
      pageName="Home Page"
    >
      {({ data, setData, updateField }) => (
        <>
          <SectionWrapper
            title="Hero Section"
            open={openSections.hero}
            onToggle={() => setOpenSections(p => ({ ...p, hero: !p.hero }))}
          >
            <BilingualInput label="Tagline" value={data?.hero?.tagline} onChange={(v) => updateField('hero', 'tagline', v)} />
            <BilingualInput label="Title" value={data?.hero?.title} onChange={(v) => updateField('hero', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.hero?.subtitle} onChange={(v) => updateField('hero', 'subtitle', v)} textarea />
            <BilingualInput label="CTA 1" value={data?.hero?.cta1} onChange={(v) => updateField('hero', 'cta1', v)} />
            <BilingualInput label="CTA 2" value={data?.hero?.cta2} onChange={(v) => updateField('hero', 'cta2', v)} />
            <BilingualInput label="CTA 3" value={data?.hero?.cta3} onChange={(v) => updateField('hero', 'cta3', v)} />
          </SectionWrapper>

          <SectionWrapper
            title="Features"
            open={openSections.features}
            onToggle={() => setOpenSections(p => ({ ...p, features: !p.features }))}
          >
            <ArrayEditor
              label="Features"
              items={data?.features || []}
              onChange={(items) => setData(prev => ({ ...prev, features: items }))}
              template={{ icon: '', title: { en: '', ar: '' }, desc: { en: '', ar: '' } }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <input
                    value={item.icon || ''}
                    onChange={(e) => onUpdate({ ...item, icon: e.target.value })}
                    placeholder="Icon name (e.g. shield)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  />
                  <BilingualInput label="Title" value={item.title} onChange={(v) => onUpdate({ ...item, title: v })} />
                  <BilingualInput label="Description" value={item.desc} onChange={(v) => onUpdate({ ...item, desc: v })} textarea />
                </>
              )}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Why Section"
            open={openSections.why}
            onToggle={() => setOpenSections(p => ({ ...p, why: !p.why }))}
          >
            <BilingualInput label="Title" value={data?.why?.title} onChange={(v) => updateField('why', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.why?.subtitle} onChange={(v) => updateField('why', 'subtitle', v)} />
            <BilingualInput label="Problem Title" value={data?.why?.problemTitle} onChange={(v) => updateField('why', 'problemTitle', v)} />
            <BilingualInput label="Problem Description" value={data?.why?.problemDesc} onChange={(v) => updateField('why', 'problemDesc', v)} textarea />
            <BilingualInput label="Solution Title" value={data?.why?.solutionTitle} onChange={(v) => updateField('why', 'solutionTitle', v)} />
            <BilingualInput label="Solution Description" value={data?.why?.solutionDesc} onChange={(v) => updateField('why', 'solutionDesc', v)} textarea />
          </SectionWrapper>

          <SectionWrapper
            title="CTA Section"
            open={openSections.cta}
            onToggle={() => setOpenSections(p => ({ ...p, cta: !p.cta }))}
          >
            <BilingualInput label="Title" value={data?.cta?.title} onChange={(v) => updateField('cta', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.cta?.subtitle} onChange={(v) => updateField('cta', 'subtitle', v)} textarea />
            <BilingualInput label="CTA Individual" value={data?.cta?.ctaIndividual} onChange={(v) => updateField('cta', 'ctaIndividual', v)} />
            <BilingualInput label="CTA Employer" value={data?.cta?.ctaEmployer} onChange={(v) => updateField('cta', 'ctaEmployer', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
