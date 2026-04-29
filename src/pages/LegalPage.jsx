import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor, BilingualArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

const LegalSectionEditor = ({ section, onChange }) => (
  <div className="space-y-4">
    <BilingualInput label="Section Title" value={section?.title} onChange={(v) => onChange({ ...section, title: v })} />
    <ArrayEditor
      label="Sub-sections"
      items={section?.sections || []}
      onChange={(items) => onChange({ ...section, sections: items })}
      template={{ title: { en: '', ar: '' }, content: [{ en: '', ar: '' }] }}
      renderItem={(item, i, onUpdate) => (
        <>
          <BilingualInput label="Sub-section Title" value={item.title} onChange={(v) => onUpdate({ ...item, title: v })} />
          <BilingualArrayEditor
            label="Content Paragraphs"
            items={item.content || []}
            onChange={(content) => onUpdate({ ...item, content })}
          />
        </>
      )}
    />
  </div>
)

export default function LegalPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getLegal}
      apiUpdate={pagesAPI.updateLegal}
      pageName="Legal Page"
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
          </SectionWrapper>

          <SectionWrapper
            title="Terms & Conditions"
            open={openSections.terms}
            onToggle={() => setOpenSections(p => ({ ...p, terms: !p.terms }))}
          >
            <LegalSectionEditor
              section={data?.terms}
              onChange={(updated) => setData(prev => ({ ...prev, terms: updated }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Privacy Policy"
            open={openSections.privacy}
            onToggle={() => setOpenSections(p => ({ ...p, privacy: !p.privacy }))}
          >
            <LegalSectionEditor
              section={data?.privacy}
              onChange={(updated) => setData(prev => ({ ...prev, privacy: updated }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Consent Forms"
            open={openSections.consent}
            onToggle={() => setOpenSections(p => ({ ...p, consent: !p.consent }))}
          >
            <LegalSectionEditor
              section={data?.consent}
              onChange={(updated) => setData(prev => ({ ...prev, consent: updated }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Refund Policy"
            open={openSections.refund}
            onToggle={() => setOpenSections(p => ({ ...p, refund: !p.refund }))}
          >
            <LegalSectionEditor
              section={data?.refund}
              onChange={(updated) => setData(prev => ({ ...prev, refund: updated }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Disclaimer"
            open={openSections.disclaimer}
            onToggle={() => setOpenSections(p => ({ ...p, disclaimer: !p.disclaimer }))}
          >
            <LegalSectionEditor
              section={data?.disclaimer}
              onChange={(updated) => setData(prev => ({ ...prev, disclaimer: updated }))}
            />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
