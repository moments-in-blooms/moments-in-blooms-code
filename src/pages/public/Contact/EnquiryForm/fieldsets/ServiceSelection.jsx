import { useController } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
import * as S from '../EnquiryForm.styles.js'

function ServiceSelection({ control, titleId, serviceInterestOptions }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'services',
    control,
    rules: {
      validate: (value) =>
        Array.isArray(value) && value.length > 0
          ? true
          : 'Please select at least one service, or choose "Not sure yet".',
    },
  })

  const selected = Array.isArray(field.value) ? field.value : []

  const toggleService = (optionValue, isChecked) => {
    if (optionValue === 'not-sure') {
      field.onChange(isChecked ? ['not-sure'] : [])
      return
    }

    const next = isChecked
      ? [...selected.filter((value) => value !== 'not-sure'), optionValue]
      : selected.filter((value) => value !== optionValue)

    field.onChange(next)
  }

  return (
    <S.Fieldset>
      <legend className="sr-only">Service Interest</legend>
      <S.FieldsetHeading id={titleId} tabIndex={-1}>
        <S.FieldsetKicker>Part 03</S.FieldsetKicker>
        <S.FieldsetTitle>Service Interest</S.FieldsetTitle>
      </S.FieldsetHeading>

      <S.Field>
        <S.FieldLabel as="span">
          What are you curious about? <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
        </S.FieldLabel>
        <S.HelpText>
          Choose as many as you like — many celebrations combine several services.
        </S.HelpText>
      </S.Field>

      <S.ChoiceGroup>
        {serviceInterestOptions.map((option) => {
          const isChecked = selected.includes(option.value)
          return (
            <S.ChoiceLabel key={option.value}>
              <S.ChoiceInput
                type="checkbox"
                value={option.value}
                checked={isChecked}
                onChange={(event) => toggleService(option.value, event.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'contact-services-error' : undefined}
              />
              <S.ChoicePill $checked={isChecked}>
                <span className="choice-dot" aria-hidden="true" />
                {option.label}
              </S.ChoicePill>
            </S.ChoiceLabel>
          )
        })}
      </S.ChoiceGroup>

      {error ? (
        <S.ErrorText id="contact-services-error" aria-live="polite">
          <FiAlertCircle aria-hidden="true" size={13} />
          {error.message}
        </S.ErrorText>
      ) : null}
    </S.Fieldset>
  )
}

export default ServiceSelection