import {
  FiBriefcase,
  FiChevronDown,
  FiFileText,
  FiFolder,
  FiHelpCircle,
  FiHome,
  FiImage,
  FiLayers,
  FiLayout,
  FiMail,
  FiSearch,
  FiSend,
  FiSettings,
  FiGrid,
  FiTag,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoPrimary from '../../assets/images/logo-old-primary.png'
import { adminNavigationGroups } from '../../constants/navigation.js'
import {
  DrawerOverlay,
  SidebarBrand,
  SidebarBrandCaption,
  SidebarBrandLogo,
  SidebarBrandName,
  SidebarGroup,
  SidebarGroupItems,
  SidebarGroupLabel,
  SidebarGroupToggle,
  SidebarLink,
  SidebarNav,
  SidebarShell,
} from './Sidebar.styles.js'

const navigationIcons = {
  dashboard: FiGrid,
  homepage: FiHome,
  about: FiUser,
  services: FiBriefcase,
  categories: FiFolder,
  subcategories: FiLayers,
  items: FiTag,
  websitePages: FiLayout,
  pageSections: FiFileText,
  gallery: FiImage,
  faqs: FiHelpCircle,
  contact: FiSend,
  enquiries: FiMail,
  seo: FiSearch,
  settings: FiSettings,
  team: FiUsers,
}

const isItemActive = (pathname, itemPath) =>
  pathname === itemPath || pathname.startsWith(`${itemPath}/`)

const findActiveGroupId = (pathname) => {
  const direct = adminNavigationGroups.find((group) =>
    group.items.some((item) => isItemActive(pathname, item.path)),
  )
  if (direct) return direct.id
  // Legacy deep links (e.g. /admin/services/serviceCollections/…) belong to
  // a group without matching a child link yet.
  const prefixed = adminNavigationGroups.find(
    (group) => group.matchPrefix && pathname.startsWith(group.matchPrefix),
  )
  return prefixed?.id ?? null
}

const collapsibleGroupIds = adminNavigationGroups
  .filter((group) => group.collapsible)
  .map((group) => group.id)

function Sidebar({ open = false, onClose, collapsed = false }) {
  const { pathname } = useLocation()
  const activeGroupId = findActiveGroupId(pathname)
  // Accordion behaviour layered over the route-derived state: the group
  // holding the active route expands by default, opening one group closes
  // the others, and navigation resets to just the active group.
  const [navState, setNavState] = useState(() => ({
    pathname,
    opened: new Set(),
    closed: new Set(),
  }))
  if (navState.pathname !== pathname) {
    setNavState({ pathname, opened: new Set(), closed: new Set() })
  }
  const { opened, closed } = navState
  const isExpanded = (groupId) =>
    !closed.has(groupId) && (opened.has(groupId) || groupId === activeGroupId)

  const handleNavigate = () => {
    if (open) {
      onClose?.()
    }
  }

  const toggleGroup = (groupId) => {
    const currentlyExpanded =
      !closed.has(groupId) && (opened.has(groupId) || groupId === activeGroupId)
    setNavState((prev) => {
      if (currentlyExpanded) {
        const nextOpened = new Set(prev.opened)
        const nextClosed = new Set(prev.closed)
        nextClosed.add(groupId)
        nextOpened.delete(groupId)
        return { pathname: prev.pathname, opened: nextOpened, closed: nextClosed }
      }
      // Opening a group closes every other dropdown.
      return {
        pathname: prev.pathname,
        opened: new Set([groupId]),
        closed: new Set(collapsibleGroupIds.filter((id) => id !== groupId)),
      }
    })
  }

  const renderItem = (item) => {
    const Icon = navigationIcons[item.icon]
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === '/admin/dashboard'}
        onClick={handleNavigate}
        title={collapsed ? item.label : undefined}
      >
        <SidebarLink>
          {Icon ? <Icon aria-hidden="true" size={17} /> : null}
          {!collapsed ? <span>{item.label}</span> : null}
        </SidebarLink>
      </NavLink>
    )
  }

  return (
    <>
      <DrawerOverlay
        $open={open}
        onClick={onClose}
        aria-hidden="true"
      />
      <SidebarShell
        id="admin-sidebar"
        $open={open}
        $collapsed={collapsed}
        aria-label="Admin navigation"
      >
        <SidebarBrand to="/admin/dashboard" onClick={handleNavigate}>
          <SidebarBrandLogo src={logoPrimary} alt="" aria-hidden="true" />
          <SidebarBrandName hidden={collapsed}>
            Moments in Blooms
            <SidebarBrandCaption>Studio Admin</SidebarBrandCaption>
          </SidebarBrandName>
        </SidebarBrand>

        <SidebarNav>
          {adminNavigationGroups.map((group) => {
            const groupExpanded = isExpanded(group.id)
            // Collapsible groups render as dropdowns; in collapsed
            // (icon-only) mode every child renders flat with a tooltip.
            if (!group.collapsible || collapsed) {
              return (
                <SidebarGroup key={group.id}>
                  {!collapsed ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                  {group.items.map(renderItem)}
                </SidebarGroup>
              )
            }
            const groupActive = group.items.some((item) => isItemActive(pathname, item.path))
            const GroupIcon = group.icon ? navigationIcons[group.icon] : null
            return (
              <SidebarGroup key={group.id}>
                <SidebarGroupToggle
                  type="button"
                  aria-expanded={groupExpanded}
                  aria-controls={`admin-nav-group-${group.id}`}
                  $expanded={groupExpanded}
                  $active={groupActive}
                  onClick={() => toggleGroup(group.id)}
                >
                  {GroupIcon ? <GroupIcon aria-hidden="true" size={17} /> : null}
                  <span>{group.label}</span>
                  <FiChevronDown aria-hidden="true" size={16} />
                </SidebarGroupToggle>
                {groupExpanded ? (
                  <SidebarGroupItems id={`admin-nav-group-${group.id}`}>
                    {group.items.map(renderItem)}
                  </SidebarGroupItems>
                ) : null}
              </SidebarGroup>
            )
          })}
        </SidebarNav>
      </SidebarShell>
    </>
  )
}

export default Sidebar