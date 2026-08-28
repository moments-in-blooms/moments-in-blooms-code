import Heading from '../Heading/index.js'
import SafeReveal from '../Reveal/SafeReveal.jsx'
import TitleReveal from '../Reveal/TitleReveal.jsx'
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionSubtitle,
  SectionAction,
  SectionTitleMask,
} from './Section.styles.js'

function Section({
  action,
  children,
  description,
  subtitle,
  title,
  headingLevel = 2,
  tone = 'default',
  ...props
}) {
  const hasHeader = Boolean(title || subtitle || description || action)

  return (
    <SectionRoot $tone={tone} {...props}>
      {hasHeader ? (
        <SectionHeader>
          {subtitle ? (
            <SafeReveal from={{ y: 12 }} duration={0.6}>
              <SectionSubtitle>{subtitle}</SectionSubtitle>
            </SafeReveal>
          ) : null}
          {title ? (
            <SectionTitleMask>
              <TitleReveal>
                <Heading level={headingLevel}>{title}</Heading>
              </TitleReveal>
            </SectionTitleMask>
          ) : null}
          {description ? (
            <SafeReveal from={{ y: 28 }} duration={0.55}>
              <SectionDescription>{description}</SectionDescription>
            </SafeReveal>
          ) : null}
          {action ? (
            <SafeReveal from={{ y: 14 }} duration={0.7}>
              <SectionAction>{action}</SectionAction>
            </SafeReveal>
          ) : null}
        </SectionHeader>
      ) : null}
      {children}
    </SectionRoot>
  )
}

export default Section
