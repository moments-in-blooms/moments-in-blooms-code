import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi'
import Button from '../../../../components/Button/index.js'
import { ButtonSpinner } from '../../../../components/Button/Button.styles.js'
import Container from '../../../../components/Container/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import { footerContact } from '../../../../constants/navigation.js'
import { createEnquiry } from '../../../../services/enquiries.js'
import EventDetails from './fieldsets/EventDetails.jsx'
import PersonalDetails from './fieldsets/PersonalDetails.jsx'
import RequirementsFieldset from './fieldsets/RequirementsFieldset.jsx'
import ServiceSelection from './fieldsets/ServiceSelection.jsx'
import StepIndicator from './StepIndicator/index.js'
import { ENQUIRY_STEPS } from './StepIndicator/constants.js'
import * as S from './EnquiryForm.styles.js'

const TOTAL_STEPS = ENQUIRY_STEPS.length

const STEP_FIELDS = Object.freeze([
  ['fullName', 'email'],
  ['eventType'],
  ['services'],
  ['setupRequired'],
])

const DEFAULT_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  eventLocation: '',
  guestCount: '',
  services: [],
  setupRequired: '',
  message: '',
}

function EnquiryForm({ content, id, eventTypeOptions, serviceInterestOptions, guestCountOptions, setupRequirementOptions }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState(null)
  const successRef = useRef(null)
  const errorRef = useRef(null)
  const activeStep = useRef(0)
  const submittingRef = useRef(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  })

  const isSubmitting = status === 'submitting'

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus({ preventScroll: true })
    }
    if (status === 'idle' && submitError) {
      errorRef.current?.focus({ preventScroll: true })
    }
  }, [status, submitError])

  useEffect(() => {
    if (activeStep.current === step) return
    activeStep.current = step
    document.getElementById(`enquiry-step-heading-${step}`)?.focus()
  }, [step])

  const validateStep = async (index) => {
    if (index >= STEP_FIELDS.length || index < 0) return true
    return trigger(STEP_FIELDS[index])
  }

  const goNext = async () => {
    if (isSubmitting || step >= TOTAL_STEPS - 1) return
    const isValid = await validateStep(step)
    if (isValid) setStep((current) => current + 1)
  }

  const goBack = () => {
    if (isSubmitting || step <= 0) return
    setStep((current) => current - 1)
  }

  const resetEnquiry = () => {
    clearErrors()
    reset(DEFAULT_VALUES)
    submittingRef.current = false
    setSubmitError(null)
    setStatus('idle')
    setStep(0)
  }

  const onSubmit = async (values) => {
    submittingRef.current = true
    setStatus('submitting')
    setSubmitError(null)

    const serviceLabels = values.services.map(
      (value) =>
        serviceInterestOptions.find((option) => option.value === value)?.label ??
        value,
    )

    const result = await createEnquiry({
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      eventType: values.eventType,
      serviceLabels,
      eventDate: values.eventDate,
      venue: values.eventLocation,
      guestCount: values.guestCount,
      setupRequired: values.setupRequired,
      message: values.message,
    })

    if (result.error) {
      submittingRef.current = false
      setSubmitError(result.error.message)
      setStatus('idle')
      return
    }

    setStatus('success')
  }

  const handleFormSubmit = (event) => {
    if (submittingRef.current || status === 'success') return
    handleSubmit(onSubmit)(event)
  }

  const handleFormKeyDown = (event) => {
    if (event.key !== 'Enter') return
    const { target } = event
    const isTextField =
      target?.tagName === 'TEXTAREA' ||
      (target?.tagName === 'INPUT' &&
        !['checkbox', 'radio', 'button', 'submit'].includes(target.type))
    if (!isTextField) return
    if (target?.tagName === 'TEXTAREA' && step >= TOTAL_STEPS - 1) return
    event.preventDefault()
    if (step < TOTAL_STEPS - 1) goNext()
  }

  return (
    <S.FormSection id={id}>
      <Container>
        <S.FormGrid>
          <SafeReveal from={{ y: 24 }} duration={0.6}>
            <S.Rail>
              <S.RailEyebrow>{content.eyebrow}</S.RailEyebrow>
              <S.RailTitle>
                <TitleReveal>{content.title}</TitleReveal>
              </S.RailTitle>
              <S.RailSteps>
                {content.steps.map((step, index) => (
                  <S.RailStep key={index}>
                    <S.RailStepNumber>{String(index + 1).padStart(2, '0')}</S.RailStepNumber>
                    <div>
                      <S.RailStepTitle>{step.title}</S.RailStepTitle>
                      <S.RailStepDescription>{step.description}</S.RailStepDescription>
                    </div>
                  </S.RailStep>
                ))}
              </S.RailSteps>
              <S.RailNote>{content.note}</S.RailNote>
            </S.Rail>
          </SafeReveal>

          <SafeReveal from={{ y: 28 }} duration={0.7} delay={0.1}>
            <S.FormPanel>
              {status === 'success' ? (
                <S.SuccessPanel ref={successRef} tabIndex={-1}>
                  <div className="success-icon">
                    <FiCheckCircle aria-hidden="true" color="currentColor" />
                  </div>
                  <S.SuccessEyebrow>Enquiry received</S.SuccessEyebrow>
                  <S.SuccessTitle>Thank you.</S.SuccessTitle>
                  <S.SuccessText>
                    Your enquiry has been sent successfully. The Moments in Blooms
                    team will review your details and get back to you within one to
                    two business days.
                  </S.SuccessText>
                  <S.SuccessText>
                    In the meantime, you can also reach the team directly at{' '}
                    <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>.
                  </S.SuccessText>
                  <S.SuccessActions>
                    <Button to="/" variant="primary">
                      Back to the homepage
                    </Button>
                    <Button variant="ghost" onClick={resetEnquiry}>
                      Send another enquiry
                    </Button>
                  </S.SuccessActions>
                </S.SuccessPanel>
              ) : (
                <form
                  noValidate
                  onSubmit={handleFormSubmit}
                  onKeyDown={handleFormKeyDown}
                >
                  <StepIndicator currentIndex={step} />

                  <S.StepPanel hidden={step !== 0} aria-labelledby="enquiry-step-heading-0">
                    <PersonalDetails
                      register={register}
                      errors={errors}
                      titleId="enquiry-step-heading-0"
                    />
                  </S.StepPanel>

                  <S.StepPanel hidden={step !== 1} aria-labelledby="enquiry-step-heading-1">
                    <EventDetails
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      errors={errors}
                      titleId="enquiry-step-heading-1"
                      eventTypeOptions={eventTypeOptions}
                      guestCountOptions={guestCountOptions}
                    />
                  </S.StepPanel>

                  <S.StepPanel hidden={step !== 2} aria-labelledby="enquiry-step-heading-2">
                    <ServiceSelection
                      control={control}
                      titleId="enquiry-step-heading-2"
                      serviceInterestOptions={serviceInterestOptions}
                    />
                  </S.StepPanel>

                  <S.StepPanel hidden={step !== 3} aria-labelledby="enquiry-step-heading-3">
                    <RequirementsFieldset
                      register={register}
                      errors={errors}
                      watch={watch}
                      titleId="enquiry-step-heading-3"
                      setupRequirementOptions={setupRequirementOptions}
                    />
                  </S.StepPanel>

                  {submitError ? (
                    <S.ErrorBanner
                      ref={errorRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                    >
                      <span>{submitError}</span>
                      <span>
                        Or write to us directly at{' '}
                        <a href={`mailto:${footerContact.email}`}>
                          {footerContact.email}
                        </a>
                        .
                      </span>
                    </S.ErrorBanner>
                  ) : null}

                  <S.NavRow>
                    {step > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        disabled={isSubmitting}
                      >
                        <FiArrowLeft aria-hidden="true" size={16} />
                        Back
                      </Button>
                    ) : null}

                    <S.NavForward>
                      {step < TOTAL_STEPS - 1 ? (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={goNext}
                          disabled={isSubmitting}
                        >
                          Next
                          <FiArrowRight aria-hidden="true" size={16} />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          aria-busy={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <ButtonSpinner aria-hidden="true" />
                              Sending your enquiry…
                            </>
                          ) : (
                            <>
                              Send Enquiry
                              <FiArrowUpRight
                                aria-hidden="true"
                                color="currentColor"
                                size={17}
                              />
                            </>
                          )}
                        </Button>
                      )}
                    </S.NavForward>
                  </S.NavRow>

                  <S.SubmitNote>
                    Sending this enquiry doesn&apos;t confirm or book anything —
                    it simply shares your details with the team. Your information
                    is never shared with anyone else.
                  </S.SubmitNote>
                </form>
              )}
            </S.FormPanel>
          </SafeReveal>
        </S.FormGrid>
      </Container>
    </S.FormSection>
  )
}

export default EnquiryForm