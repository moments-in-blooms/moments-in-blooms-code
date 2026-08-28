import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isConfigured = Boolean(serviceId && templateId && publicKey)

if (isConfigured) {
  emailjs.init({ publicKey })
}

export const isEmailConfigured = () => isConfigured

const present = (value) => {
  if (value === null || value === undefined) return 'Not stated'
  const text = String(value).trim()
  return text === '' ? 'Not stated' : text
}

const toTemplateParams = (values) => {
  const serviceLabels = Array.isArray(values.serviceLabels)
    ? values.serviceLabels.map(String).filter(Boolean)
    : []

  return {
    fullName: present(values.name),
    email: present(values.email),
    phone: present(values.phone),
    eventType: present(values.eventType),
    eventDate: present(values.eventDate),
    venue: present(values.venue),
    guestCount: present(values.guestCount),
    services: serviceLabels.length ? serviceLabels.join(', ') : 'Not stated',
    setupRequired: present(values.setupRequired),
    message: present(values.message),
  }
}

export async function sendEnquiryEmail(values) {
  if (!isConfigured) return null

  try {
    await emailjs.send(serviceId, templateId, toTemplateParams(values))
    return null
  } catch (error) {
    console.warn('[email] sendEnquiryEmail failed', {
      status: error?.status,
      text: error?.text,
    })
    return error?.text ?? 'Unknown EmailJS error'
  }
}