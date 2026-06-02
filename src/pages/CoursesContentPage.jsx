import PageEditor, { BilingualInput, SectionWrapper } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function CoursesContentPage() {
  const [openSections, setOpenSections] = useState({
    hero: true,
    emptyState: false,
    companyPlans: false,
  })

  return (
    <PageEditor
      apiGet={pagesAPI.getCoursesPage}
      apiUpdate={pagesAPI.updateCoursesPage}
      pageName="Courses Page Content"
    >
      {({ data, updateField }) => (
        <>
          <SectionWrapper
            title="Hero Section"
            open={openSections.hero}
            onToggle={() => setOpenSections(p => ({ ...p, hero: !p.hero }))}
          >
            <BilingualInput label="Eyebrow" value={data?.hero?.eyebrow} onChange={(v) => updateField('hero', 'eyebrow', v)} />
            <BilingualInput label="Title" value={data?.hero?.title} onChange={(v) => updateField('hero', 'title', v)} />
            <BilingualInput label="Description" value={data?.hero?.description} onChange={(v) => updateField('hero', 'description', v)} textarea />
          </SectionWrapper>

          {/* <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Category filter labels and options are managed from the Courses Categories model. They are intentionally hidden on this page.
          </div> */}

          {/* <SectionWrapper
            title="Empty State"
            open={openSections.emptyState}
            onToggle={() => setOpenSections(p => ({ ...p, emptyState: !p.emptyState }))}
          >
            <BilingualInput label="Title" value={data?.emptyState?.title} onChange={(v) => updateField('emptyState', 'title', v)} />
            <BilingualInput label="Description" value={data?.emptyState?.description} onChange={(v) => updateField('emptyState', 'description', v)} textarea />
          </SectionWrapper> */}

          <SectionWrapper
            title="Company Plans Section"
            open={openSections.companyPlans}
            onToggle={() => setOpenSections(p => ({ ...p, companyPlans: !p.companyPlans }))}
          >
            <BilingualInput label="Title" value={data?.companyPlans?.title} onChange={(v) => updateField('companyPlans', 'title', v)} />
            <BilingualInput label="Subtitle" value={data?.companyPlans?.subtitle} onChange={(v) => updateField('companyPlans', 'subtitle', v)} textarea />
            {/* <BilingualInput label="Audience Label" value={data?.companyPlans?.audienceLabel} onChange={(v) => updateField('companyPlans', 'audienceLabel', v)} /> */}
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
