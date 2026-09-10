import { Navigate, useParams } from 'react-router-dom'
import { useContent } from '../../../hooks/useContent.js'
import {
  categoriesPath,
  categoryPath,
  getCategory,
  itemPath,
  itemsPath,
  newItemPath,
  resolveCatalogNode,
  servicesPagePath,
  servicesPageSectionPath,
  subcategoriesPath,
  subcategoryPath,
} from './catalog.js'
import { PAGE_SECTION_KEYS } from './ServicesPageSections.jsx'

// Legacy list sections whose editors moved into the catalog.
const LEGACY_LIST_SECTIONS = new Set(['photoboothPackages', 'blissfulNestPackages'])

/**
 * Resolves retired Services admin URLs to their canonical replacements.
 * Legacy shapes share ids with the canonical tree (decor "services" were
 * sections; packages/prizes keep their ids), so bookmarks keep working.
 */
function ServicesLegacyRedirect({ mode }) {
  const params = useParams()
  const { values } = useContent('services')

  if (mode === 'category') {
    const target = getCategory(values, params.collectionId)
      ? categoryPath(params.collectionId)
      : categoriesPath
    return <Navigate replace to={target} />
  }

  if (mode === 'subcategory') {
    const node = resolveCatalogNode(values, params.sectionId)
    if (node?.type === 'subcategory') return <Navigate replace to={subcategoryPath(node.subcategory.id)} />
    if (node?.type === 'item') return <Navigate replace to={itemPath(node.item.id)} />
    const category = getCategory(values, params.collectionId)
    return <Navigate replace to={category ? categoryPath(category.id) : categoriesPath} />
  }

  if (mode === 'newItem') {
    const category = getCategory(values, params.categoryId)
    return <Navigate replace to={category ? newItemPath({ categoryId: category.id }) : itemsPath} />
  }

  if (mode === 'item') {
    const node = resolveCatalogNode(values, params.serviceId)
    if (node?.type === 'subcategory') return <Navigate replace to={subcategoryPath(node.subcategory.id)} />
    if (node?.type === 'item') return <Navigate replace to={itemPath(node.item.id)} />
    return <Navigate replace to={itemsPath} />
  }

  if (mode === 'section') {
    if (PAGE_SECTION_KEYS.includes(params.sectionKey)) {
      return <Navigate replace to={servicesPageSectionPath(params.sectionKey)} />
    }
    if (params.sectionKey === 'serviceCollections') {
      return <Navigate replace to={categoriesPath} />
    }
    if (LEGACY_LIST_SECTIONS.has(params.sectionKey)) {
      return <Navigate replace to={itemsPath} />
    }
    return <Navigate replace to={servicesPagePath} />
  }

  if (mode === 'sectionItem') {
    const node = resolveCatalogNode(values, params.itemId)
    if (node?.type === 'item') return <Navigate replace to={itemPath(node.item.id)} />
    if (node?.type === 'subcategory') return <Navigate replace to={subcategoryPath(node.subcategory.id)} />
    return <Navigate replace to={itemsPath} />
  }

  return <Navigate replace to={subcategoriesPath} />
}

export default ServicesLegacyRedirect
