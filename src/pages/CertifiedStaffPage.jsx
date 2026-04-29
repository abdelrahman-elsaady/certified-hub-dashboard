import PageEditor, { BilingualInput, SectionWrapper } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function CertifiedStaffPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getCertifiedStaff}
      apiUpdate={pagesAPI.updateCertifiedStaff}
      pageName="Certified Staff Page"
    >
      {({ data, updateField }) => (
        <>
          <SectionWrapper
            title="Hero Section"
            open={openSections.hero}
            onToggle={() => setOpenSections(p => ({ ...p, hero: !p.hero }))}
          >
            <BilingualInput label="Title" value={data?.hero?.title} onChange={(v) => updateField('hero', 'title', v)} />
            <BilingualInput label="Description" value={data?.hero?.description} onChange={(v) => updateField('hero', 'description', v)} textarea />
          </SectionWrapper>

          <SectionWrapper
            title="Disclaimer"
            open={openSections.disclaimer}
            onToggle={() => setOpenSections(p => ({ ...p, disclaimer: !p.disclaimer }))}
          >
            <BilingualInput label="Title" value={data?.disclaimer?.title} onChange={(v) => updateField('disclaimer', 'title', v)} />
            <BilingualInput label="Description" value={data?.disclaimer?.desc} onChange={(v) => updateField('disclaimer', 'desc', v)} textarea rows={5} />
          </SectionWrapper>

          <SectionWrapper
            title="Bottom CTA"
            open={openSections.bottomCta}
            onToggle={() => setOpenSections(p => ({ ...p, bottomCta: !p.bottomCta }))}
          >
            <BilingualInput label="Join Community" value={data?.bottomCta?.joinCommunity} onChange={(v) => updateField('bottomCta', 'joinCommunity', v)} />
            <BilingualInput label="Add Certificate Title" value={data?.bottomCta?.addCertificateTitle} onChange={(v) => updateField('bottomCta', 'addCertificateTitle', v)} />
            <BilingualInput label="Add Certificate Desc" value={data?.bottomCta?.addCertificateDesc} onChange={(v) => updateField('bottomCta', 'addCertificateDesc', v)} textarea />
            <BilingualInput label="Register CTA" value={data?.bottomCta?.registerCta} onChange={(v) => updateField('bottomCta', 'registerCta', v)} />
            <BilingualInput label="Register Your Certificate" value={data?.bottomCta?.registerYourCertificate} onChange={(v) => updateField('bottomCta', 'registerYourCertificate', v)} />
            <BilingualInput label="Add Your Certificate" value={data?.bottomCta?.addYourCertificate} onChange={(v) => updateField('bottomCta', 'addYourCertificate', v)} />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
