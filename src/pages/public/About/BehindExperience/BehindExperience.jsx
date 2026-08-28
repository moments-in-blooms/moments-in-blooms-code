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
} from './BehindExperience.styles.js'

function BehindExperience({ content, id }) {
  const { subtitle, title, description, steps } = content

  return (
    <Section
      id={id}
      subtitle={subtitle}
      title={title}
      description={description}
      tone={SECTION_TONES.IVORY}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <ProcessTimeline>
            {steps.map((step, index) => (
              <StepCard key={step.stepNumber || index} variants={stepIn(index % 2 === 0 ? 'left' : 'right')}>
                <StepNumber>{step.stepNumber}</StepNumber>
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

export default BehindExperience
