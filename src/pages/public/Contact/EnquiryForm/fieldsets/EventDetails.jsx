import { FiAlertCircle } from 'react-icons/fi'
import { todayIsoDate } from '../../../../../utils/validation.js'
import DatePicker from '../DatePicker/index.js'
import Dropdown from '../Dropdown/index.js'
import * as S from '../EnquiryForm.styles.js'

function EventDetails({ register, watch, setValue, errors, titleId, eventTypeOptions, guestCountOptions }) {
  return (
    <S.Fieldset>
      <legend className="sr-only">Event Details</legend>
      <S.FieldsetHeading id={titleId} tabIndex={-1}>
        <S.FieldsetKicker>Part 02</S.FieldsetKicker>
        <S.FieldsetTitle>Event Details</S.FieldsetTitle>
      </S.FieldsetHeading>

      <S.FieldRow>
        <S.Field>
          <S.FieldLabel as="span">
            Event Type <S.RequiredMark aria-hidden="true">*</S.RequiredMark>
          </S.FieldLabel>
          <Dropdown
            id="contact-event-type"
            name="eventType"
            register={register}
            watch={watch}
            setValue={setValue}
            rules={{ required: 'Please select the type of event.' }}
            options={eventTypeOptions}
            placeholder="Select an event type"
            ariaLabel="Event Type"
            invalid={Boolean(errors.eventType)}
            ariaDescribedBy={
              errors.eventType
                ? 'contact-event-type-error'
                : 'contact-event-type-hint'
            }
          />
          <S.HelpText id="contact-event-type-hint">
            For anything else, choose Other and tell us more below.
          </S.HelpText>
          {errors.eventType ? (
            <S.ErrorText id="contact-event-type-error" aria-live="polite">
              <FiAlertCircle aria-hidden="true" size={13} />
              {errors.eventType.message}
            </S.ErrorText>
          ) : null}
        </S.Field>

        <S.Field>
          <S.FieldLabel as="span">Event Date</S.FieldLabel>
          <DatePicker
            id="contact-event-date"
            name="eventDate"
            register={register}
            watch={watch}
            setValue={setValue}
            rules={{
              validate: (value) =>
                !value ||
                value >= todayIsoDate() ||
                'Please choose today or a later date.',
            }}
            placeholder="Select a date"
            ariaLabel="Event Date"
            invalid={Boolean(errors.eventDate)}
            ariaDescribedBy={
              errors.eventDate
                ? 'contact-event-date-error'
                : 'contact-event-date-hint'
            }
          />
          <S.HelpText id="contact-event-date-hint">
            This is an enquiry date, not a booking confirmation.
          </S.HelpText>
          {errors.eventDate ? (
            <S.ErrorText id="contact-event-date-error" aria-live="polite">
              <FiAlertCircle aria-hidden="true" size={13} />
              {errors.eventDate.message}
            </S.ErrorText>
          ) : null}
        </S.Field>
      </S.FieldRow>

      <S.FieldRow>
        <S.Field>
          <S.FieldLabel as="span">Event Location / Venue</S.FieldLabel>
          <S.Input
            id="contact-event-location"
            type="text"
            placeholder="Venue, suburb or city"
            autoComplete="street-address"
            aria-describedby="contact-event-location-hint"
            {...register('eventLocation')}
          />
          <S.HelpText id="contact-event-location-hint">
            Venue, suburb or city — we service Greater Melbourne and beyond.
          </S.HelpText>
        </S.Field>

        <S.Field>
          <S.FieldLabel as="span">Approximate Guest Count</S.FieldLabel>
          <Dropdown
            id="contact-guest-count"
            name="guestCount"
            register={register}
            watch={watch}
            setValue={setValue}
            options={guestCountOptions}
            placeholder="Select a range"
            ariaLabel="Approximate Guest Count"
            ariaDescribedBy="contact-guest-count-hint"
          />
          <S.HelpText id="contact-guest-count-hint">
            A rough idea helps us understand the scale of your celebration.
          </S.HelpText>
        </S.Field>
      </S.FieldRow>
    </S.Fieldset>
  )
}

export default EventDetails