import { FiCheck } from 'react-icons/fi'
import { ENQUIRY_STEPS } from './constants.js'
import * as S from './StepIndicator.styles.js'

function StepIndicator({ steps = ENQUIRY_STEPS, currentIndex = 0 }) {
  const total = steps.length

  return (
    <div>
      <S.Header aria-live="polite">
        Step {currentIndex + 1} of {total} — {steps[currentIndex].label}
      </S.Header>
      <S.List aria-label="Enquiry progress">
        {steps.map((step, index) => {
          const state =
            index < currentIndex
              ? 'completed'
              : index === currentIndex
                ? 'active'
                : 'upcoming'

          return (
            <S.Item
              key={step.number}
              $state={state}
              aria-current={index === currentIndex ? 'step' : undefined}
            >
              <S.Marker $state={state} aria-hidden="true">
                {index < currentIndex ? <FiCheck /> : <span>{step.number}</span>}
              </S.Marker>
              <S.Label $state={state}>{step.label}</S.Label>
            </S.Item>
          )
        })}
      </S.List>
    </div>
  )
}

export default StepIndicator