import { faqCategories, faqItems, faqPageContent } from '../constants/faqs.js'
import { isSupabaseConfigured, publicSupabase, supabase } from './supabaseClient.js'

const DEMO_STORAGE_KEY = 'mib_admin_faqs_v1'

const PUBLISH_ERROR_MESSAGE = "We couldn't load the FAQs. Please try again."
const SAVE_ERROR_MESSAGE = "We couldn't save your changes. Please try again."
const DELETE_ERROR_MESSAGE = "We couldn't delete the item. Please try again."

/**
 * FAQ content service — single source of truth for every FAQ-related piece
 * of content on the public /faqs page (categories, accordion items, hero and
 * CTA copy).
 *
 *   Public: anon session-less client (publicSupabase), published rows only.
 *   Admin:  session client (supabase), full CRUD; archiving is a soft delete
 *           (deleted_at + is_published = false) — nothing is hard-deleted.
 *
 * When Supabase is not configured (.env missing) the service falls back to a
 * demo store in localStorage seeded from `src/constants/faqs.js`, so the full
 * admin → public flow keeps working without a backend.
 */

/* -------------------------------------------------------------------------- */
/* Demo store                                                                */
/* -------------------------------------------------------------------------- */

const clone = (value) => JSON.parse(JSON.stringify(value))

const nowIso = () => new Date().toISOString()

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `faq-${Date.now()}`

function demoSeed() {
  return {
    categories: faqCategories.map((category, index) => ({
      id: category.id,
      name: category.label,
      slug: category.id,
      description: null,
      display_order: index + 1,
      is_published: true,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    })),
    faqs: faqItems.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category_id: item.category,
      display_order: item.order,
      is_published: item.active,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    })),
    page: {
      section: { ...faqPageContent.section },
      hero: { ...faqPageContent.hero },
      cta: { ...faqPageContent.cta },
    },
  }
}

function readDemoStore() {
  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (parsed && Array.isArray(parsed.faqs) && Array.isArray(parsed.categories)) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

function writeDemoStore(state) {
  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('[faqs] storage unavailable', error)
  }
}

function demoData() {
  return readDemoStore() ?? demoSeed()
}

function normalizeDemoPage(page) {
  const seed = demoSeed().page
  return {
    section: page?.section ?? { ...seed.section },
    hero: page?.hero ?? { ...seed.hero },
    cta: page?.cta ?? { ...seed.cta },
  }
}

function updateDemoStore(updater) {
  const next = updater(clone(demoData()))
  writeDemoStore(next)
  return next
}

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                             */
/* -------------------------------------------------------------------------- */

export const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const byOrder = (a, b) =>
  (a.display_order ?? 0) - (b.display_order ?? 0) ||
  String(a.created_at ?? '').localeCompare(String(b.created_at ?? ''))

const isActive = (row) => !row.deleted_at

const buildPublicPage = (store) => {
  const faqs = (store.faqs ?? [])
    .filter((faq) => faq.is_published && isActive(faq))
    .sort(byOrder)
  const categories = (store.categories ?? [])
    .filter((category) => category.is_published && isActive(category))
    .sort(byOrder)
    .map((category) => ({
      ...category,
      faqs: faqs.filter((faq) => faq.category_id === category.id),
    }))
    .filter((category) => category.faqs.length > 0)

  const page = store.page ?? demoSeed().page
  return {
    categories,
    section: page.section ?? demoSeed().page.section,
    hero: page.hero,
    cta: page.cta,
  }
}

const normalizePageRow = (row) => ({
  section: {
    eyebrow: row.section_eyebrow,
    title: row.section_title,
    description: row.section_description,
  },
  hero: {
    eyebrow: row.hero_eyebrow,
    title: row.hero_title,
    description: row.hero_description,
  },
  cta: {
    eyebrow: row.cta_eyebrow,
    title: row.cta_title,
    description: row.cta_description,
    primaryLabel: row.cta_primary_label,
    primaryUrl: row.cta_primary_url,
    secondaryLabel: row.cta_secondary_label,
    secondaryUrl: row.cta_secondary_url,
  },
})

const toPageRow = (page) => ({
  section_eyebrow: page.section.eyebrow,
  section_title: page.section.title,
  section_description: page.section.description,
  hero_eyebrow: page.hero.eyebrow,
  hero_title: page.hero.title,
  hero_description: page.hero.description,
  cta_eyebrow: page.cta.eyebrow,
  cta_title: page.cta.title,
  cta_description: page.cta.description,
  cta_primary_label: page.cta.primaryLabel,
  cta_primary_url: page.cta.primaryUrl,
  cta_secondary_label: page.cta.secondaryLabel,
  cta_secondary_url: page.cta.secondaryUrl,
})

const faqPayload = (input) => ({
  question: input.question,
  answer: input.answer,
  category_id: input.category_id,
  display_order: Number(input.display_order) || 0,
  is_published: Boolean(input.is_published),
})

const categoryPayload = (input) => ({
  name: input.name,
  slug: input.slug || slugify(input.name),
  description: input.description ?? null,
  display_order: Number(input.display_order) || 0,
  is_published: Boolean(input.is_published),
})

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Everything the public /faqs page needs in one call: published categories
 * (each with its published FAQs, ordered), hero copy and CTA copy.
 */
export async function fetchPublicFaqPage() {
  if (!isSupabaseConfigured()) {
    return { data: buildPublicPage(demoData()), error: null }
  }

  const [categoriesResult, faqsResult, pageResult] = await Promise.all([
    publicSupabase
      .from('faq_categories')
      .select('id, name, slug, description, display_order, is_published, deleted_at')
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true }),
    publicSupabase
      .from('faqs')
      .select('id, question, answer, category_id, display_order, is_published, deleted_at')
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true }),
    publicSupabase.from('faq_page').select('*').eq('id', 1).maybeSingle(),
  ])

  const error =
    categoriesResult.error ?? faqsResult.error ?? pageResult.error
  if (error) {
    console.error('[faqs] public fetch failed', error)
    return { data: null, error: { message: PUBLISH_ERROR_MESSAGE } }
  }

  return {
    data: buildPublicPage({
      categories: categoriesResult.data ?? [],
      faqs: faqsResult.data ?? [],
      page: pageResult.data ? normalizePageRow(pageResult.data) : null,
    }),
    error: null,
  }
}

/** Fallback hero/CTA copy used when the live fetch fails (public page). */
export const getPublicPageFallback = () => ({
  section: { ...faqPageContent.section },
  hero: { ...faqPageContent.hero },
  cta: { ...faqPageContent.cta },
})

/* -------------------------------------------------------------------------- */
/* Admin — reads                                                              */
/* -------------------------------------------------------------------------- */

export async function fetchFaqsAdmin() {
  if (!isSupabaseConfigured()) {
    const data = demoData()
    return {
      data: { categories: data.categories, faqs: data.faqs },
      error: null,
    }
  }

  const [categoriesResult, faqsResult] = await Promise.all([
    supabase
      .from('faq_categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true }),
    supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ])

  const error = categoriesResult.error ?? faqsResult.error
  if (error) {
    console.error('[faqs] admin fetch failed', error)
    return { data: null, error: { message: PUBLISH_ERROR_MESSAGE } }
  }

  return {
    data: {
      categories: categoriesResult.data ?? [],
      faqs: faqsResult.data ?? [],
    },
    error: null,
  }
}

export async function fetchFaqPageAdmin() {
  if (!isSupabaseConfigured()) {
    const data = demoData()
    return { data: normalizeDemoPage(data.page), error: null }
  }

  const result = await supabase
    .from('faq_page')
    .select('*')
    .eq('id', 1)
    .maybeSingle()

  if (result.error) {
    console.error('[faqs] page fetch failed', result.error)
    return { data: null, error: { message: PUBLISH_ERROR_MESSAGE } }
  }

  return {
    data: result.data ? normalizePageRow(result.data) : { ...demoSeed().page },
    error: null,
  }
}

/* -------------------------------------------------------------------------- */
/* Admin — FAQ mutations                                                      */
/* -------------------------------------------------------------------------- */

export async function createFaq(input) {
  const payload = faqPayload(input)

  if (!isSupabaseConfigured()) {
    const faq = {
      id: newId(),
      ...payload,
      created_at: nowIso(),
      updated_at: nowIso(),
      deleted_at: null,
    }
    updateDemoStore((current) => ({ ...current, faqs: [...current.faqs, faq] }))
    return { data: faq, error: null }
  }

  const result = await supabase
    .from('faqs')
    .insert(payload)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] create failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function updateFaq(id, input) {
  const payload = faqPayload(input)

  if (!isSupabaseConfigured()) {
    const updated = {
      ...payload,
      id,
      updated_at: nowIso(),
      created_at: null,
      deleted_at: null,
    }
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.map((faq) => (faq.id === id ? updated : faq)),
    }))
    return { data: updated, error: null }
  }

  const result = await supabase
    .from('faqs')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] update failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function archiveFaq(id) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.map((faq) =>
        faq.id === id
          ? { ...faq, deleted_at: nowIso(), is_published: false }
          : faq,
      ),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase
    .from('faqs')
    .update({ deleted_at: nowIso(), is_published: false })
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] archive failed', result.error)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function deleteFaq(id) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.filter((faq) => faq.id !== id),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase.from('faqs').delete().eq('id', id)

  if (result.error) {
    console.error('[faqs] delete failed', result.error)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  return { data: { id }, error: null }
}

export async function deleteFaqs(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return { data: [], error: null }
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.filter((faq) => !ids.includes(faq.id)),
    }))
    return { data: ids.map((id) => ({ id })), error: null }
  }
  const result = await supabase.from('faqs').delete().in('id', ids)
  if (result.error) {
    console.error('[faqs] bulk delete failed', result.error)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  return { data: ids.map((id) => ({ id })), error: null }
}

export async function restoreFaq(id) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.map((faq) =>
        faq.id === id ? { ...faq, deleted_at: null } : faq,
      ),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase
    .from('faqs')
    .update({ deleted_at: null })
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] restore failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function setFaqOrder(id, displayOrder) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      faqs: current.faqs.map((faq) =>
        faq.id === id ? { ...faq, display_order: displayOrder } : faq,
      ),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase
    .from('faqs')
    .update({ display_order: displayOrder })
    .eq('id', id)
    .select('id')

  if (result.error) {
    console.error('[faqs] reorder failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: { id }, error: null }
}

/* -------------------------------------------------------------------------- */
/* Admin — category mutations                                                 */
/* -------------------------------------------------------------------------- */

export async function createCategory(input) {
  const payload = categoryPayload(input)

  if (!isSupabaseConfigured()) {
    const category = {
      id: newId(),
      ...payload,
      created_at: nowIso(),
      updated_at: nowIso(),
      deleted_at: null,
    }
    updateDemoStore((current) => ({
      ...current,
      categories: [...current.categories, category],
    }))
    return { data: category, error: null }
  }

  const result = await supabase
    .from('faq_categories')
    .insert(payload)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] category create failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function updateCategory(id, input) {
  const payload = categoryPayload(input)

  if (!isSupabaseConfigured()) {
    const updated = {
      ...payload,
      id,
      updated_at: nowIso(),
      created_at: null,
      deleted_at: null,
    }
    updateDemoStore((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === id ? updated : category,
      ),
    }))
    return { data: updated, error: null }
  }

  const result = await supabase
    .from('faq_categories')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] category update failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

/**
 * Archive a category. `moveFaqsTo` (a category id) is required when the
 * category still has FAQs — they are reassigned first so nothing is orphaned.
 */
export async function archiveCategory(id, { moveFaqsTo } = {}) {
  if (!isSupabaseConfigured()) {
    const current = demoData()
    const assigned = current.faqs.filter(
      (faq) => faq.category_id === id && isActive(faq),
    )
    if (assigned.length > 0 && !moveFaqsTo) {
      return {
        data: null,
        error: {
          message: `This category still has ${assigned.length} FAQ${assigned.length === 1 ? '' : 's'}. Reassign them before deleting.`,
        },
      }
    }
    const next = clone(current)
    next.faqs = next.faqs.map((faq) =>
      faq.category_id === id && isActive(faq) && moveFaqsTo
        ? { ...faq, category_id: moveFaqsTo }
        : faq,
    )
    next.categories = next.categories.map((category) =>
      category.id === id
        ? { ...category, deleted_at: nowIso(), is_published: false }
        : category,
    )
    writeDemoStore(next)
    return { data: { id }, error: null }
  }

  if (moveFaqsTo) {
    const moveResult = await supabase
      .from('faqs')
      .update({ category_id: moveFaqsTo })
      .eq('category_id', id)
      .is('deleted_at', null)
    if (moveResult.error) {
      console.error('[faqs] category reassign failed', moveResult.error)
      return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
    }
  }

  const result = await supabase
    .from('faq_categories')
    .update({ deleted_at: nowIso(), is_published: false })
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] category archive failed', result.error)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function restoreCategory(id) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === id ? { ...category, deleted_at: null } : category,
      ),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase
    .from('faq_categories')
    .update({ deleted_at: null })
    .eq('id', id)
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] category restore failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: result.data, error: null }
}

export async function deleteCategory(id) {
  if (!isSupabaseConfigured()) {
    const current = demoData()
    const assigned = current.faqs.filter((faq) => faq.category_id === id && isActive(faq))
    if (assigned.length > 0) {
      return {
        data: null,
        error: { message: `This category still has ${assigned.length} FAQ${assigned.length === 1 ? '' : 's'}. Reassign them before deleting.` },
      }
    }
    updateDemoStore((current) => ({
      ...current,
      categories: current.categories.filter((category) => category.id !== id),
    }))
    return { data: { id }, error: null }
  }

  // Block if category still has active FAQs
  const { data: assigned, error: checkError } = await supabase
    .from('faqs')
    .select('id')
    .eq('category_id', id)
    .is('deleted_at', null)
  if (checkError) {
    console.error('[faqs] category delete check failed', checkError)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  if (assigned && assigned.length > 0) {
    return {
      data: null,
      error: { message: `This category still has ${assigned.length} FAQ${assigned.length === 1 ? '' : 's'}. Reassign them before deleting.` },
    }
  }

  const result = await supabase.from('faq_categories').delete().eq('id', id)
  if (result.error) {
    console.error('[faqs] category delete failed', result.error)
    return { data: null, error: { message: DELETE_ERROR_MESSAGE } }
  }
  return { data: { id }, error: null }
}

export async function setCategoryOrder(id, displayOrder) {
  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === id ? { ...category, display_order: displayOrder } : category,
      ),
    }))
    return { data: { id }, error: null }
  }

  const result = await supabase
    .from('faq_categories')
    .update({ display_order: displayOrder })
    .eq('id', id)
    .select('id')

  if (result.error) {
    console.error('[faqs] category reorder failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: { id }, error: null }
}

/* -------------------------------------------------------------------------- */
/* Admin — FAQ page content (section heading + hero + CTA)                    */
/* -------------------------------------------------------------------------- */

export async function saveFaqPage({ section, hero, cta }) {
  const payload = toPageRow({ section, hero, cta })

  if (!isSupabaseConfigured()) {
    updateDemoStore((current) => ({
      ...current,
      page: {
        section: { ...section },
        hero: { ...hero },
        cta: { ...cta },
      },
    }))
    return { data: { section, hero, cta }, error: null }
  }

  const result = await supabase
    .from('faq_page')
    .upsert({ id: 1, ...payload }, { onConflict: 'id' })
    .select()
    .single()

  if (result.error) {
    console.error('[faqs] page save failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }
  return { data: normalizePageRow(result.data), error: null }
}