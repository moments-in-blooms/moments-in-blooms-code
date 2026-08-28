import { motion } from 'framer-motion'
import { softReveal, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  TrustEyebrow,
  TrustMarks,
  TrustStatement,
  TrustStatementLead,
  TrustedByContainer,
  TrustedByRoot,
} from './TrustedBy.styles.js'

function TrustedBy({ marks, id = 'home-trusted-by' }) {
  return (
    <TrustedByRoot id={id}>
      <TrustedByContainer>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TrustEyebrow>Trusted by beautiful celebrations</TrustEyebrow>
        </motion.div>
        <TrustStatement
          variants={softReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <TrustStatementLead>We believe a celebration should feel</TrustStatementLead>{' '}
          as beautiful as the reason you&apos;re gathering.
        </TrustStatement>
        <TrustMarks
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {marks.map((mark) => (
            <motion.li
              key={mark}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
            >
              {mark}
            </motion.li>
          ))}
        </TrustMarks>
      </TrustedByContainer>
    </TrustedByRoot>
  )
}

export default TrustedBy
