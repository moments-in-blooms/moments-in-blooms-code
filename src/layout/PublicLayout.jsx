import { Outlet, useLocation } from 'react-router-dom'
import BackToTop from '../components/BackToTop/index.js'
import Footer from '../components/Footer/index.js'
import Navbar from '../components/Navbar/index.js'
import SocialContact from '../components/SocialContact/index.js'
import { publicNavigation } from '../constants/navigation.js'
import { NAVBAR_THEMES } from '../constants/ui.js'
import { PublicMain, PublicShell } from './PublicLayout.styles.js'

function PublicLayout() {
  const location = useLocation()
  const currentRoute = publicNavigation.find((item) => item.path === location.pathname)
  const navbarTheme = currentRoute?.navbarTheme ?? NAVBAR_THEMES.LIGHT

  return (
    <PublicShell>
      <Navbar variant={navbarTheme} />
      <PublicMain id="main-content">
        <Outlet />
      </PublicMain>
      <BackToTop />
      <SocialContact />
      <Footer />
    </PublicShell>
  )
}

export default PublicLayout
