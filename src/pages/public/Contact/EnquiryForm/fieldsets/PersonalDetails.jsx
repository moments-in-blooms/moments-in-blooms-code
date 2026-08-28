import { FiAlertCircle } from 'react-icons/fi'
import { EMAIL_PATTERN } from '../../../../../utils/validation.js'
import * as S from '../EnquiryForm.styles.js'

function PersonalDetails({ register, errors, titleId }) {
  return (
    <S.Fieldset>
      <legend className="sr-only">Your Details</legend>
      <S.FieldsetHeading id={titleId} tabIndex={-1}>
        <S.FieldsetKicker>Part 01</S.FieldsetKicker>
        <S.FieldsetTitle>Your Details</S.FieldsetTitle>
      </S.FieldsetHeading>

      <S.FieldRow>
        <S.Field>
          <S.FieldLabel htmlFor="contact-name">
            Full Name <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
          </S.FieldLabel>
          <S.Input
            id="contact-name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            $error={Boolean(errors.fullName)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
            {...register('fullName', {
              required: 'Please provide your name.',
            })}
          />
          {errors.fullName ? (
            <S.ErrorText id="contact-name-error" aria-live="polite">
              <FiAlertCircle aria-hidden="true" size={13} />
              {errors.fullName.message}
            </S.ErrorText>
          ) : null}
        </S.Field>

        <S.Field>
          <S.FieldLabel htmlFor="contact-email">
            Email Address <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
          </S.FieldLabel>
          <S.Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            $error={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            {...register('email', {
              required: 'Please provide your email address.',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Please enter a valid email address.',
              },
            })}
          />
          {errors.email ? (
            <S.ErrorText id="contact-email-error" aria-live="polite">
              <FiAlertCircle aria-hidden="true" size={13} />
              {errors.email.message}
            </S.ErrorText>
          ) : null}
        </S.Field>
      </S.FieldRow>

      <S.Field>
        <S.FieldLabel htmlFor="contact-phone">
          Phone Number <span aria-hidden="true">(optional)</span>
        </S.FieldLabel>
        <S.Input
          id="contact-phone"
          type="tel"
          placeholder="Best number to reach you"
          autoComplete="tel"
          inputMode="tel"
          {...register('phone')}
        />
      </S.Field>
    </S.Fieldset>
  )
}

export default PersonalDetails