import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { rise, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  StatCard,
  StatDescription,
  StatLabel,
  StatsGrid,
  StatValue,
} from './Stats.styles.js'

function Stats({ content, id }) {
  const { subtitle, title, description, items } = content

  return (
    <Section
      id={id}
      subtitle={subtitle}
      title={title}
      description={description}
      tone={SECTION_TONES.BLUSH}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <StatsGrid>
            {items.map((item, index) => (
              <StatCard key={item.label || index} variants={rise}>
                <StatValue>{item.value}</StatValue>
                <StatLabel>{item.label}</StatLabel>
                <StatDescription>{item.description}</StatDescription>
              </StatCard>
            ))}
          </StatsGrid>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Stats
