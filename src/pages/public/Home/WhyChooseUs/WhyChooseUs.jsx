import { motion } from 'framer-motion'
import TitleReveal from '../../../../components/Reveal/index.js'
import {
  staggerContainer,
  stepIn,
  VIEWPORT_DEFAULT,
} from '../../../../styles/animations.js'
import {
  ReasonContent,
  ReasonDescription,
  ReasonNumber,
  ReasonsList,
  ReasonRow,
  ReasonTitle,
  WhyContainer,
  WhyCopy,
  WhyEyebrow,
  WhyLead,
  WhyRoot,
  WhyTitle,
} from './WhyChooseUs.styles.js'

function WhyChooseUs({ reasons, id = 'home-why-choose-us' }) {
  return (
    <WhyRoot id={id}>
      <WhyContainer>
        <WhyLead>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <WhyEyebrow>The difference is in the detail</WhyEyebrow>
          </motion.div>
          <WhyTitle>
            <TitleReveal>Why us?</TitleReveal>
          </WhyTitle>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <WhyCopy>
              You bring the reason to celebrate. We bring the calm, creative thinking and considered details that make it all feel easy.
            </WhyCopy>
          </motion.div>
        </WhyLead>
        <ReasonsList
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          {reasons.map((reason, index) => (
            <ReasonRow key={reason.number} variants={stepIn(index % 2 === 0 ? 'left' : 'right')}>
              <ReasonNumber aria-hidden="true">{reason.number}</ReasonNumber>
              <ReasonContent>
                <ReasonTitle>{reason.title}</ReasonTitle>
                <ReasonDescription>{reason.description}</ReasonDescription>
              </ReasonContent>
            </ReasonRow>
          ))}
        </ReasonsList>
      </WhyContainer>
    </WhyRoot>
  )
}

export default WhyChooseUs
