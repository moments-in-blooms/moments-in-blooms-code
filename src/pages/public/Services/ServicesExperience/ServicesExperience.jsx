import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { staggerContainer, stepIn, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  ProcessTimeline,
  StepCard,
  StepContent,
  StepDescription,
  StepNumber,
  StepTitle,
} from './ServicesExperience.styles.js'

function ServicesExperience({ content, id }) {
  if (!content) return null

  return (
    <Section
      id={id}
      subtitle={content.subtitle}
      title={content.title}
      description={content.description}
      tone={SECTION_TONES.SOFT}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <ProcessTimeline>
            {(content.steps ?? []).map((step, index) => (
              <StepCard
                key={step.number || index}
                variants={stepIn(index % 2 === 0 ? 'left' : 'right')}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </StepCard>
            ))}
          </ProcessTimeline>
        </motion.div>
      </Container>
    </Section>
  )
}

export default ServicesExperience
