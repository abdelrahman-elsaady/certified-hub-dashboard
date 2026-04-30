import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor, BilingualArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function ForEmployersPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getForEmployers}
      apiUpdate={pagesAPI.updateForEmployers}
      pageName="For Employers Page"
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
            <BilingualInput label="CTA Subscribe" value={data?.hero?.ctaSubscribe} onChange={(v) => updateField('hero', 'ctaSubscribe', v)} />
            <BilingualInput label="CTA View Plans" value={data?.hero?.ctaViewPlans} onChange={(v) => updateField('hero', 'ctaViewPlans', v)} />
          </SectionWrapper>

          <SectionWrapper
            title="Training Section"
            open={openSections.training}
            onToggle={() => setOpenSections(p => ({ ...p, training: !p.training }))}
          >
            <BilingualInput label="Title" value={data?.training?.title} onChange={(v) => updateField('training', 'title', v)} />
            <BilingualInput label="Description" value={data?.training?.desc} onChange={(v) => updateField('training', 'desc', v)} textarea />
            <BilingualInput label="Courses For All Levels" value={data?.training?.coursesForAllLevels} onChange={(v) => updateField('training', 'coursesForAllLevels', v)} />
            <BilingualInput label="CTA Browse Training" value={data?.training?.ctaBrowseTraining} onChange={(v) => updateField('training', 'ctaBrowseTraining', v)} />
            <BilingualArrayEditor
              label="Courses"
              items={data?.training?.courses || []}
              onChange={(items) => setData(prev => ({ ...prev, training: { ...prev.training, courses: items } }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Corporate Packages"
            open={openSections.packages}
            onToggle={() => setOpenSections(p => ({ ...p, packages: !p.packages }))}
          >
            <BilingualInput label="Title" value={data?.packages?.title} onChange={(v) => updateField('packages', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.packages?.subtitle} onChange={(v) => updateField('packages', 'subtitle', v)} />
            <BilingualArrayEditor
              label="Notes"
              items={data?.packages?.notes || []}
              onChange={(items) => setData(prev => ({ ...prev, packages: { ...prev.packages, notes: items } }))}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Staff Registry"
            open={openSections.registry}
            onToggle={() => setOpenSections(p => ({ ...p, registry: !p.registry }))}
          >
            <BilingualInput label="Title" value={data?.registry?.title} onChange={(v) => updateField('registry', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.registry?.subtitle} onChange={(v) => updateField('registry', 'subtitle', v)} />
            <BilingualInput label="Description" value={data?.registry?.desc} onChange={(v) => updateField('registry', 'desc', v)} textarea />
          </SectionWrapper>

          <SectionWrapper
            title="Compliance CTA"
            open={openSections.compliance}
            onToggle={() => setOpenSections(p => ({ ...p, compliance: !p.compliance }))}
          >
            <BilingualInput label="Title" value={data?.compliance?.title} onChange={(v) => updateField('compliance', 'title', v)} />
            <BilingualInput label="Description" value={data?.compliance?.desc} onChange={(v) => updateField('compliance', 'desc', v)} textarea />
            <BilingualInput label="CTA Subscribe" value={data?.compliance?.ctaSubscribe} onChange={(v) => updateField('compliance', 'ctaSubscribe', v)} />
            <BilingualInput label="CTA View Plans" value={data?.compliance?.ctaViewPlans} onChange={(v) => updateField('compliance', 'ctaViewPlans', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
