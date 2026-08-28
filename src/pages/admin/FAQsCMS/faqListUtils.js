export const byOrder = (a, b) =>
  (a.display_order ?? 0) - (b.display_order ?? 0) ||
  String(a.created_at ?? '').localeCompare(String(b.created_at ?? ''))

export const isActive = (row) => !row.deleted_at