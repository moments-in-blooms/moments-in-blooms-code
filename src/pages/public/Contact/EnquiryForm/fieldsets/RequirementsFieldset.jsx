import { FiAlertCircle } from 'react-icons/fi'
import * as S from '../EnquiryForm.styles.js'

function RequirementsFieldset({ register, errors, watch, titleId, setupRequirementOptions }) {
  const setupRequired = watch('setupRequired')

  return (
    <S.Fieldset>
      <legend className="sr-only">Setup and Styling of Hired Items</legend>
      <S.FieldsetHeading id={titleId} tabIndex={-1}>
        <S.FieldsetKicker>Part 04</S.FieldsetKicker>
        <S.FieldsetTitle>Setup &amp; Styling of Hired Items</S.FieldsetTitle>
        <S.FieldsetHint>
          Our team offers professional setup and styling of your hired items on the
          day — not full event styling.
        </S.FieldsetHint>
      </S.FieldsetHeading>

      <S.Field>
        <S.FieldLabel as="span">
          Will you need setup and styling for your hired items?{' '}
          <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
        </S.FieldLabel>
        <S.ChoiceGroup>
          {setupRequirementOptions.map((option) => (
            <S.ChoiceLabel key={option}>
              <S.ChoiceInput
                type="radio"
                value={option}
                aria-invalid={Boolean(errors.setupRequired)}
                aria-describedby={
                  errors.setupRequired ? 'contact-setup-error' : undefined
                }
                {...register('setupRequired', {
                  required:
                    "Please let us know whether you'll need setup and styling.",
                })}
              />
              <S.ChoicePill $checked={setupRequired === option}>
                <span className="choice-dot" aria-hidden="true" />
                {option}
              </S.ChoicePill>
            </S.ChoiceLabel>
          ))}
        </S.ChoiceGroup>
        {errors.setupRequired ? (
          <S.ErrorText id="contact-setup-error" aria-live="polite">
            <FiAlertCircle aria-hidden="true" size={13} />
            {errors.setupRequired.message}
          </S.ErrorText>
        ) : null}
      </S.Field>

      <S.Field>
        <S.FieldLabel htmlFor="contact-message">
          Anything else we should know?
        </S.FieldLabel>
        <S.Textarea
          id="contact-message"
          placeholder="Describe the mood, colours, or details you have in mind — setup and styling preferences, photobooth or claw machine requests, or anything else the team should know."
          aria-describedby="contact-message-hint"
          {...register('message')}
        />
        <S.HelpText id="contact-message-hint">
          This is your space for everything else — general notes, custom
          inquiries, or specific setup and styling requests. This field is
          optional.
        </S.HelpText>
      </S.Field>
    </S.Fieldset>
  )
}

export default RequirementsFieldset