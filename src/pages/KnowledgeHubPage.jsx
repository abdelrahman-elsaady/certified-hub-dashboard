import PageEditor, { BilingualInput, SectionWrapper, ArrayEditor } from '../components/PageEditor'
import { pagesAPI } from '../lib/api'
import { useState } from 'react'

export default function KnowledgeHubPage() {
  const [openSections, setOpenSections] = useState({ hero: true })

  return (
    <PageEditor
      apiGet={pagesAPI.getKnowledgeHub}
      apiUpdate={pagesAPI.updateKnowledgeHub}
      pageName="Knowledge Hub Page"
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
            title="Categories"
            open={openSections.categories}
            onToggle={() => setOpenSections(p => ({ ...p, categories: !p.categories }))}
          >
            <ArrayEditor
              label="Categories"
              items={data?.categories || []}
              onChange={(items) => setData(prev => ({ ...prev, categories: items }))}
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
            title="Blog Section"
            open={openSections.blog}
            onToggle={() => setOpenSections(p => ({ ...p, blog: !p.blog }))}
          >
            <BilingualInput label="Blog Title" value={data?.blogTitle} onChange={(v) => setData(prev => ({ ...prev, blogTitle: v }))} />
            <BilingualInput label="Blog Subtitle" value={data?.blogSubtitle} onChange={(v) => setData(prev => ({ ...prev, blogSubtitle: v }))} textarea />
            <ArrayEditor
              label="Articles"
              items={data?.articles || []}
              onChange={(items) => setData(prev => ({ ...prev, articles: items }))}
              template={{ title: { en: '', ar: '' }, content: { en: '', ar: '' } }}
              renderItem={(item, i, onUpdate) => (
                <>
                  <BilingualInput label="Title" value={item.title} onChange={(v) => onUpdate({ ...item, title: v })} />
                  <BilingualInput label="Content" value={item.content} onChange={(v) => onUpdate({ ...item, content: v })} textarea rows={5} />
                </>
              )}
            />
          </SectionWrapper>
        </>
      )}
    </PageEditor>
  )
}
