import {
  FiBriefcase,
  FiChevronsLeft,
  FiChevronsRight,
  FiHelpCircle,
  FiHome,
  FiImage,
  FiMail,
  FiSearch,
  FiSend,
  FiSettings,
  FiGrid,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import logoPrimary from '../../assets/images/logo-old-primary.png'
import { adminNavigationGroups } from '../../constants/navigation.js'
import {
  DrawerOverlay,
  SidebarBrand,
  SidebarBrandCaption,
  SidebarBrandLogo,
  SidebarBrandName,
  SidebarCollapse,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarLink,
  SidebarNav,
  SidebarShell,
} from './Sidebar.styles.js'

const navigationIcons = {
  dashboard: FiGrid,
  homepage: FiHome,
  about: FiUser,
  services: FiBriefcase,
  gallery: FiImage,
  faqs: FiHelpCircle,
  contact: FiSend,
  enquiries: FiMail,
  seo: FiSearch,
  settings: FiSettings,
  team: FiUsers,
}

function Sidebar({ open = false, onClose, collapsed = false, onToggleCollapse }) {
  const handleNavigate = () => {
    if (open) {
      onClose?.()
    }
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
          {adminNavigationGroups.map((group) => (
            <SidebarGroup key={group.id}>
              {!collapsed ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
              {group.items.map((item) => {
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
                      <Icon aria-hidden="true" size={17} />
                      {!collapsed ? <span>{item.label}</span> : null}
                    </SidebarLink>
                  </NavLink>
                )
              })}
            </SidebarGroup>
          ))}
        </SidebarNav>

        {onToggleCollapse ? (
          <SidebarCollapse
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <FiChevronsRight aria-hidden="true" size={16} />
            ) : (
              <FiChevronsLeft aria-hidden="true" size={16} />
            )}
            {!collapsed ? <span>Collapse</span> : null}
          </SidebarCollapse>
        ) : null}
      </SidebarShell>
    </>
  )
}

export default Sidebar