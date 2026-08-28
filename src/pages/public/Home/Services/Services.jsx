import { FiArrowUpRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import { ImageReveal, SafeReveal, TitleReveal } from '../../../../components/Reveal/index.js'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import {
  ServiceBody,
  ServiceCard,
  ServiceDescription,
  ServiceEyebrow,
  ServiceImage,
  ServiceImageFrame,
  ServiceImageLink,
  ServiceLink,
  ServicesContainer,
  ServicesEyebrow,
  ServicesGrid,
  ServicesIntro,
  ServicesIntroCopy,
  ServicesRoot,
  ServicesTitle,
  ServiceTitle,
} from './Services.styles.js'

function Services({ items, id = 'home-services' }) {
  return (
    <ServicesRoot id={id}>
      <ServicesContainer>
        <ServicesIntro>
          <div>
            <SafeReveal from={{ y: 12 }} duration={0.6}>
              <ServicesEyebrow>Designed around your day</ServicesEyebrow>
            </SafeReveal>
            <ServicesTitle>
              <TitleReveal>Details with a point of view.</TitleReveal>
            </ServicesTitle>
          </div>
          <SafeReveal from={{ y: 20 }} duration={0.7} delay={0.15}>
            <ServicesIntroCopy>
              From the atmosphere in the room to the little moments guests take home, we style celebrations with warmth, intention and a hint of the unexpected.
            </ServicesIntroCopy>
            <Button as={NavLink} to="/services" variant={BUTTON_VARIANTS.GHOST}>
              Explore our services
              <FiArrowUpRight aria-hidden="true" color="currentColor" size={16} />
            </Button>
          </SafeReveal>
        </ServicesIntro>
        <ServicesGrid>
          {items.map((service) => (
            <SafeReveal
              key={service.id}
              as={ServiceCard}
              $offset={service.offset}
              from={{ y: 28, scale: 0.985 }}
              whileHover={{ y: -4 }}
            >
              <ServiceImageLink as={NavLink} to={service.path} aria-label={`Explore ${service.title}`}>
                <ServiceImageFrame>
                  <ImageReveal>
                    <ServiceImage src={service.image.src} alt={service.image.alt} loading="lazy" />
                  </ImageReveal>
                </ServiceImageFrame>
              </ServiceImageLink>
              <ServiceBody>
                <SafeReveal from={{ y: 14 }} duration={0.7}>
                  <ServiceEyebrow>{service.eyebrow}</ServiceEyebrow>
                </SafeReveal>
                <SafeReveal from={{ y: 14 }} duration={0.7}>
                  <NavLink to={service.path}>
                    <ServiceTitle>{service.title}</ServiceTitle>
                  </NavLink>
                </SafeReveal>
                <SafeReveal from={{ y: 14 }} duration={0.7}>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </SafeReveal>
                <SafeReveal from={{ y: 14 }} duration={0.7}>
                  <ServiceLink as={NavLink} to={service.path}>
                    Learn more
                    <FiArrowUpRight aria-hidden="true" color="currentColor" size={14} />
                  </ServiceLink>
                </SafeReveal>
                <span className="sr-only">{service.image.credit}</span>
              </ServiceBody>
            </SafeReveal>
          ))}
        </ServicesGrid>
      </ServicesContainer>
    </ServicesRoot>
  )
}

export default Services
