import { FiArrowRight, FiFacebook, FiGlobe, FiInstagram } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import logoWhite from '../../assets/images/logo-old-white.png'
import { routeMetadata } from '../../constants/navigation.js'
import useSiteSettings from '../../hooks/useSiteSettings.js'
import Button from '../Button/index.js'
import * as S from './Footer.styles.js'

const socialIcons = {
  Instagram: FiInstagram,
  Facebook: FiFacebook,
}

function Footer() {
  const { contact: footerContact, socialLinks: footerSocialLinks, footerGroups: footerNavigationGroups } = useSiteSettings()
  return (
    <S.FooterShell>
      <S.FooterContainer>
        <S.FooterGrid>
          <div>
            <S.FooterLogo src={logoWhite} alt="Moments in Blooms" />
            <S.FooterBrand>{routeMetadata.public.title}</S.FooterBrand>
            <S.FooterDescription>
              Thoughtful floral design and considered event styling for life&apos;s most beautiful gatherings.
            </S.FooterDescription>
            <S.FooterCta aria-labelledby="footer-enquiry-title">
              <S.FooterCtaEyebrow>Let&apos;s create something beautiful</S.FooterCtaEyebrow>
              <S.FooterCtaTitle id="footer-enquiry-title">Planning a celebration?</S.FooterCtaTitle>
              <S.FooterCtaCopy>
                Share your vision with us and we&apos;ll help shape an unforgettable event in full bloom.
              </S.FooterCtaCopy>
              <Button as={NavLink} to="/contact" variant="light">
                Start an enquiry
                <FiArrowRight aria-hidden="true" color="currentColor" size={17} />
              </Button>
            </S.FooterCta>
          </div>

          <S.FooterLinks>
            {footerNavigationGroups.map((group) => (
              <S.FooterLinkGroup key={group.title}>
                <S.FooterLinkHeading>{group.title}</S.FooterLinkHeading>
                <S.FooterLinkList>
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <NavLink to={link.path}>
                        <S.FooterLink>{link.label}</S.FooterLink>
                      </NavLink>
                    </li>
                  ))}
                </S.FooterLinkList>
              </S.FooterLinkGroup>
            ))}
            <S.FooterLinkGroup>
              <S.FooterLinkHeading>Contact</S.FooterLinkHeading>
              <S.FooterContact>
                <span>{footerContact.location}</span>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
                <a href={`tel:${footerContact.phone.replaceAll(' ', '')}`}>{footerContact.phone}</a>
                <S.FooterSocials aria-label="Social links">
                  {footerSocialLinks.map((social) => {
                    const Icon = socialIcons[social.label] ?? FiGlobe
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                        <Icon aria-hidden="true" color="currentColor" size={16} />
                        {social.label}
                      </a>
                    )
                  })}
                </S.FooterSocials>
              </S.FooterContact>
            </S.FooterLinkGroup>
          </S.FooterLinks>
        </S.FooterGrid>

        <S.FooterBottom>
          <span>© {new Date().getFullYear()} Moments in Blooms</span>
          <span>Made for beautiful moments</span>
          <S.FooterWatermark aria-hidden="true">MOMENTS IN BLOOMS</S.FooterWatermark>
        </S.FooterBottom>
      </S.FooterContainer>
    </S.FooterShell>
  )
}

export default Footer
