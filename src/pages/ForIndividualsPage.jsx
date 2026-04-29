import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor, BilingualArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function ForIndividualsPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getForIndividuals}
      apiUpdate={pagesAPI.updateForIndividuals}
      pageName="For Individuals Page"
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
            <BilingualInput label="CTA Register" value={data?.hero?.ctaRegister} onChange={(v) => updateField('hero', 'ctaRegister', v)} />
            <BilingualInput label="CTA Upload" value={data?.hero?.ctaUpload} onChange={(v) => updateField('hero', 'ctaUpload', v)} />
            <BilingualInput label="CTA Browse Training" value={data?.hero?.ctaBrowseTraining} onChange={(v) => updateField('hero', 'ctaBrowseTraining', v)} />
          </SectionWrapper>

          <SectionWrapper
            title="Training Section"
            open={openSections.training}
            onToggle={() => setOpenSections(p => ({ ...p, training: !p.training }))}
          >
            <BilingualInput label="Title" value={data?.training?.title} onChange={(v) => updateField('training', 'title', v)} />
            <BilingualInput label="Description" value={data?.training?.desc} onChange={(v) => updateField('training', 'desc', v)} textarea />
            <BilingualArrayEditor
              label="Training Items"
              items={data?.training?.items || []}
              onChange={(items) => setData(prev => ({ ...prev, training: { ...prev.training, items } }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Registry Section"
            open={openSections.registry}
            onToggle={() => setOpenSections(p => ({ ...p, registry: !p.registry }))}
          >
            <BilingualInput label="Title" value={data?.registry?.title} onChange={(v) => updateField('registry', 'title', v)} />
            <BilingualInput label="Description" value={data?.registry?.desc} onChange={(v) => updateField('registry', 'desc', v)} textarea />
          </SectionWrapper>

          <SectionWrapper
            title="Benefits Section"
            open={openSections.benefits}
            onToggle={() => setOpenSections(p => ({ ...p, benefits: !p.benefits }))}
          >
            <BilingualInput label="Benefits Title" value={data?.benefitsTitle} onChange={(v) => setData(prev => ({ ...prev, benefitsTitle: v }))} />
            <ArrayEditor
              label="Benefits"
              items={data?.benefits || []}
              onChange={(items) => setData(prev => ({ ...prev, benefits: items }))}
              template={{ icon: '', text: { en: '', ar: '' } }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <input value={item.icon || ''} onChange={(e) => onUpdate({ ...item, icon: e.target.value })} placeholder="Icon name" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
                  <BilingualInput label="Text" value={item.text} onChange={(v) => onUpdate({ ...item, text: v })} />
                </>
              )}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Bottom CTA"
            open={openSections.bottomCta}
            onToggle={() => setOpenSections(p => ({ ...p, bottomCta: !p.bottomCta }))}
          >
            <BilingualInput label="Title" value={data?.bottomCta?.title} onChange={(v) => updateField('bottomCta', 'title', v)} />
            <BilingualInput label="CTA Upload" value={data?.bottomCta?.ctaUpload} onChange={(v) => updateField('bottomCta', 'ctaUpload', v)} />
            <BilingualInput label="CTA Browse Registry" value={data?.bottomCta?.ctaBrowseRegistry} onChange={(v) => updateField('bottomCta', 'ctaBrowseRegistry', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
