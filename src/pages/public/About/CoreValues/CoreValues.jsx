import { motion } from 'framer-motion'
import { FiAward, FiFeather, FiGift, FiHeart, FiShield, FiStar, FiSun } from 'react-icons/fi'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { rise, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  IconContainer,
  ValueCard,
  ValueDescription,
  ValuesGrid,
  ValueTitle,
} from './CoreValues.styles.js'

const iconMap = {
  FiStar: FiStar,
  FiAward: FiAward,
  FiFeather: FiFeather,
  FiHeart: FiHeart,
  FiShield: FiShield,
  FiGift: FiGift,
  FiSun: FiSun,
}

function CoreValues({ items = [], id }) {
  return (
    <Section
      id={id}
      subtitle="Our Principles"
      title="Values that guide every arrangement"
      description="The foundational standards behind our creative direction, floral selection, and client relationships."
      tone={SECTION_TONES.INK}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <ValuesGrid>
            {items.map((item, index) => {
              const IconComponent = iconMap[item.iconName] || FiStar

              return (
                <ValueCard key={item.id || index} variants={rise}>
                  <IconContainer>
                    <IconComponent aria-hidden="true" />
                  </IconContainer>
                  <ValueTitle>{item.title}</ValueTitle>
                  <ValueDescription>{item.description}</ValueDescription>
                </ValueCard>
              )
            })}
          </ValuesGrid>
        </motion.div>
      </Container>
    </Section>
  )
}

export default CoreValues
