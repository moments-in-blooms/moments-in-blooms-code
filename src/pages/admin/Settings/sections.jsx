/* eslint-disable react-refresh/only-export-components */
import { FieldRow, TextField } from '../../../components/FormField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'

export const settingsSections = [
  {
    key: 'footerContact',
    title: 'Studio contact details',
    description: 'The phone number, email and location shown in the footer.',
    type: 'object',
    sectionMeta: (values) =>
      [values.footerContact?.email, values.footerContact?.phone].filter(Boolean),
    form: FooterContactForm,
  },
  {
    key: 'footerSocialLinks',
    title: 'Social links',
    description: 'The links shown in the footer and social buttons across the site.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.footerSocialLinks ?? []).length} links`],
    form: SocialLinksForm,
  },
  {
    key: 'footerGroups',
    title: 'Footer navigation',
    description: 'The link groups listed in the footer columns.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.footerGroups ?? []).length} groups`],
    form: FooterGroupsForm,
  },
]

function FooterContactForm({ value, onChange }) {
  const patch = (next) => onChange({ ...value, ...next })
  return (
    <>
      <TextField
        label="Location"
        value={value?.location ?? ''}
        onChange={(event) => patch({ location: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Email"
          type="email"
          value={value?.email ?? ''}
          onChange={(event) => patch({ email: event.target.value })}
        />
        <TextField
          label="Phone"
          value={value?.phone ?? ''}
          onChange={(event) => patch({ phone: event.target.value })}
        />
      </FieldRow>
    </>
  )
}

function SocialLinksForm({ value, onChange }) {
  return (
    <Repeater
      items={value ?? []}
      onChange={onChange}
      createItem={() => ({ label: 'New platform', href: 'https://' })}
      addLabel="Add social link"
      itemTitle={(item) => item.label || 'Unnamed link'}
      renderItem={(item, index, { update: patch }) => (
        <FieldRow>
          <TextField
            label="Platform"
            value={item.label ?? ''}
            onChange={(event) => patch({ label: event.target.value })}
            placeholder="e.g. Instagram"
          />
          <TextField
            label="URL"
            type="url"
            value={item.href ?? ''}
            onChange={(event) => patch({ href: event.target.value })}
            placeholder="https://instagram.com/yourhandle"
          />
        </FieldRow>
      )}
    />
  )
}

function FooterGroupsForm({ value, onChange }) {
  return (
    <Repeater
      items={value ?? []}
      onChange={onChange}
      createItem={() => ({ title: 'New group', links: [] })}
      addLabel="Add group"
      itemTitle={(item) => item.title || 'Unnamed group'}
      renderItem={(group, index, { update: patch }) => (
        <>
          <TextField
            label="Group title"
            value={group.title ?? ''}
            onChange={(event) => patch({ title: event.target.value })}
          />
          <Repeater
            items={group.links ?? []}
            onChange={(links) => patch({ links })}
            createItem={() => ({ label: 'New link', path: '/' })}
            addLabel="Add link"
            itemTitle={(link) => link.label || 'Unnamed link'}
            renderItem={(link, linkIndex, { update: patchLink }) => (
              <TextField
                label="Label"
                value={link.label ?? ''}
                onChange={(event) => patchLink({ label: event.target.value })}
                placeholder="e.g. About us"
              />
            )}
          />
        </>
      )}
    />
  )
}
