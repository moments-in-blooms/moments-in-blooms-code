import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { rise, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  CardDescription,
  CardsGrid,
  CardTag,
  CardTitle,
  StyledMissionCard,
} from './MissionVision.styles.js'

function MissionVision({ content = {}, id }) {
  const { subtitle, title, mission, vision } = content

  return (
    <Section id={id} subtitle={subtitle} title={title} tone={SECTION_TONES.SOFT}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <CardsGrid>
            {mission ? (
              <StyledMissionCard variants={rise}>
                <CardTag>{mission.tag}</CardTag>
                <CardTitle>{mission.title}</CardTitle>
                <CardDescription>{mission.description}</CardDescription>
              </StyledMissionCard>
            ) : null}

            {vision ? (
              <StyledMissionCard variants={rise}>
                <CardTag>{vision.tag}</CardTag>
                <CardTitle>{vision.title}</CardTitle>
                <CardDescription>{vision.description}</CardDescription>
              </StyledMissionCard>
            ) : null}
          </CardsGrid>
        </motion.div>
      </Container>
    </Section>
  )
}

export default MissionVision
