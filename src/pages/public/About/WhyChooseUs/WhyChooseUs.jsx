import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { rise, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  DifferentiatorsGrid,
  HighlightCard,
  HighlightDescription,
  HighlightHeader,
  HighlightNumber,
  HighlightTitle,
} from './WhyChooseUs.styles.js'

function WhyChooseUs({ content, id }) {
  const { subtitle, title, description, highlights } = content

  return (
    <Section
      id={id}
      subtitle={subtitle}
      title={title}
      description={description}
      tone={SECTION_TONES.DEFAULT}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <DifferentiatorsGrid>
            {highlights.map((item, index) => (
              <HighlightCard key={item.number || index} variants={rise}>
                <HighlightHeader>
                  <HighlightNumber>{item.number}</HighlightNumber>
                </HighlightHeader>
                <HighlightTitle>{item.title}</HighlightTitle>
                <HighlightDescription>{item.description}</HighlightDescription>
              </HighlightCard>
            ))}
          </DifferentiatorsGrid>
        </motion.div>
      </Container>
    </Section>
  )
}

export default WhyChooseUs
