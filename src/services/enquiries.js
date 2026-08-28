import { publicSupabase, supabase } from './supabaseClient.js'
import { sendEnquiryEmail } from './email.js'

const DEMO_STORAGE_KEY = 'mib_demo_public_enquiries'

/** Canonical enquiries table columns — keep in sync with the Supabase migration. */
export const DOCUMENTED_COLUMNS = [
  'customer_name',
  'email',
  'phone',
  'event_date',
  'event_type',
  'venue',
  'guest_count',
  'selected_services',
  'setup_required',
  'setup_requests',
  'custom_inquiry',
  'status',
]

const FALLBACK_ERROR_MESSAGE =
  "We couldn't send your enquiry just yet. Please try again or contact us directly."

const DELETE_FALLBACK_ERROR_MESSAGE =
  "We couldn't delete the enquiry. Please try again."

const shapeError = (error) => {
  console.error('[enquiries] operation failed', error)
  return { message: FALLBACK_ERROR_MESSAGE }
}

const trimToNull = (value) => {
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

const toExternal = (values) => {
  const serviceLabels = Array.isArray(values.serviceLabels)
    ? values.serviceLabels.map((label) => String(label).trim()).filter(Boolean)
    : []

  return {
    customer_name: trimToNull(values.name),
    email: trimToNull(values.email)?.toLowerCase() ?? null,
    phone: trimToNull(values.phone),
    event_type: trimToNull(values.eventType),
    selected_services: serviceLabels,
    event_date: values.eventDate || null,
    venue: trimToNull(values.venue),
    guest_count: trimToNull(values.guestCount),
    setup_required: trimToNull(values.setupRequired),
    custom_inquiry: trimToNull(values.message),
  }
}

function readDemoQueue() {
  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeDemoQueue(queue) {
  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(queue))
  } catch (error) {
    console.warn('[enquiries] demo storage unavailable', error)
  }
}

function storeDemoEnquiry(payload) {
  const record = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...payload,
  }

  const queue = readDemoQueue()
  queue.push(record)
  writeDemoQueue(queue)

  console.warn(
    '[enquiries] Supabase not configured — enquiry stored in browser demo storage instead.',
  )

  return { data: record, error: null, demo: true }
}

async function insertIntoSupabase(payload) {
  try {
    const { error } = await publicSupabase.from('enquiries').insert(payload)

    if (error) throw error
    return { data: null, error: null, demo: false }
  } catch (error) {
    return { data: null, error: shapeError(error), demo: false }
  }
}

export async function createEnquiry(values) {
  const payload = toExternal(values)

  const result = supabase
    ? await insertIntoSupabase(payload)
    : storeDemoEnquiry(payload)

  if (!result.error) {
    const emailError = await sendEnquiryEmail(values)
    if (emailError) {
      console.warn('[enquiries] notification email failed', emailError)
    }
  }

  return result
}

export function listDemoEnquiries() {
  return readDemoQueue()
}

export async function listEnquiries(limit) {
  if (!supabase) {
    const queue = readDemoQueue()
    const sorted = [...queue].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )
    const sliced = Number.isInteger(limit) ? sorted.slice(0, limit) : sorted
    return { data: sliced, error: null, demo: true }
  }

  try {
    let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    if (Number.isInteger(limit)) query = query.limit(limit)
    const { data, error } = await query

    if (error) throw error
    return { data, error: null, demo: false }
  } catch (error) {
    return { data: null, error: shapeError(error), demo: false }
  }
}

export async function getEnquiry(id) {
  if (!supabase) {
    const record = readDemoQueue().find((entry) => entry.id === id) ?? null
    return { data: record, error: null, demo: true }
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    return { data, error: null, demo: false }
  } catch (error) {
    return { data: null, error: shapeError(error), demo: false }
  }
}

export async function updateEnquiryStatus(id, status) {
  if (!supabase) {
    const queue = readDemoQueue()
    const next = queue.map((record) =>
      record.id === id
        ? { ...record, status, updated_at: new Date().toISOString() }
        : record,
    )
    writeDemoQueue(next)
    return { data: next.find((record) => record.id === id) ?? null, error: null, demo: true }
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null, demo: false }
  } catch (error) {
    return { data: null, error: shapeError(error), demo: false }
  }
}

export async function deleteEnquiry(id) {
  if (!supabase) {
    const queue = readDemoQueue()
    writeDemoQueue(queue.filter((record) => record.id !== id))
    return { data: { id }, error: null, demo: true }
  }

  try {
    const { error } = await supabase.from('enquiries').delete().eq('id', id)
    if (error) throw error
    return { data: { id }, error: null, demo: false }
  } catch (error) {
    console.error('[enquiries] delete failed', error)
    return { data: null, error: { message: DELETE_FALLBACK_ERROR_MESSAGE }, demo: false }
  }
}