import { FiArrowUpRight, FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Container from '../../../../components/Container/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import { footerContact, footerSocialLinks } from '../../../../constants/navigation.js'
import * as S from './ContactInformation.styles.js'

function ContactInformation({ content, id }) {
  if (!content) return null

  const contactItems = [
    {
      icon: <FiMail aria-hidden="true" color="currentColor" size={17} />,
      label: 'Email',
      render: () => (
        <S.InfoLink href={`mailto:${footerContact.email}`}>
          {footerContact.email}
          <FiArrowUpRight aria-hidden="true" color="currentColor" size={13} />
        </S.InfoLink>
      ),
    },
    {
      icon: <FiPhone aria-hidden="true" color="currentColor" size={17} />,
      label: 'Phone',
      render: () => (
        <S.InfoLink href={`tel:${footerContact.phone.replaceAll(' ', '')}`}>
          {footerContact.phone}
          <FiArrowUpRight aria-hidden="true" color="currentColor" size={13} />
        </S.InfoLink>
      ),
    },
    {
      icon: <FiMapPin aria-hidden="true" color="currentColor" size={17} />,
      label: 'Location',
      render: () => <S.InfoValue>{footerContact.location}</S.InfoValue>,
    },
  ]

  const socialIcons = {
    Instagram: FiInstagram,
    Facebook: FiFacebook,
  }

  return (
    <S.InfoRoot id={id}>
      <Container>
        <S.InfoGrid>
          <SafeReveal from={{ y: 24 }} duration={0.6}>
            <S.InfoCopy>
              <S.InfoEyebrow>{content.eyebrow}</S.InfoEyebrow>
              <S.InfoTitle>
                <TitleReveal>{content.title}</TitleReveal>
              </S.InfoTitle>
              <SafeReveal from={{ y: 20 }} duration={0.55} delay={0.1}>
                <S.InfoDescription>{content.description}</S.InfoDescription>
              </SafeReveal>
              <SafeReveal from={{ y: 16 }} duration={0.55} delay={0.2}>
                <S.InfoNote>{content.responseNote}</S.InfoNote>
              </SafeReveal>
            </S.InfoCopy>
          </SafeReveal>

          <SafeReveal from={{ y: 28 }} duration={0.7} delay={0.15}>
            <S.InfoList>
              {contactItems.map((item) => (
                <S.InfoItem key={item.label}>
                  <S.InfoIcon>{item.icon}</S.InfoIcon>
                  <div>
                    <S.InfoLabel>{item.label}</S.InfoLabel>
                    {item.render()}
                  </div>
                </S.InfoItem>
              ))}
              <S.InfoItem>
                <S.InfoIcon>
                  <FiInstagram aria-hidden="true" color="currentColor" size={17} />
                </S.InfoIcon>
                <div>
                  <S.InfoLabel>Follow along</S.InfoLabel>
                  <S.InfoSocialRow>
                    {footerSocialLinks.map((social) => {
                      const Icon = socialIcons[social.label]
                      return (
                        <S.InfoLink
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon aria-hidden="true" color="currentColor" size={14} />
                          {social.label}
                          <FiArrowUpRight aria-hidden="true" color="currentColor" size={13} />
                        </S.InfoLink>
                      )
                    })}
                  </S.InfoSocialRow>
                </div>
              </S.InfoItem>
            </S.InfoList>
          </SafeReveal>
        </S.InfoGrid>
      </Container>
    </S.InfoRoot>
  )
}

export default ContactInformation