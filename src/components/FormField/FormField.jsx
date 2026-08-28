import { useId } from 'react'
import {
  ErrorText,
  Field,
  FieldLabel,
  HelpText,
  Input,
  RequiredMark,
  Select,
  Textarea,
} from './FormField.styles.js'

function useFieldA11y({ idProp, error, hint }) {
  const autoId = useId()
  const id = idProp || autoId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined
  return { id, errorId, hintId, describedBy }
}

function TextField({ label, hint, error, required = false, id: idProp, ...props }) {
  const { id, errorId, hintId, describedBy } = useFieldA11y({ idProp, error, hint })

  return (
    <Field>
      {label ? (
        <FieldLabel htmlFor={id}>
          {label}
          {required ? <RequiredMark aria-hidden="true"> *</RequiredMark> : null}
        </FieldLabel>
      ) : null}
      <Input
        id={id}
        $error={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...props}
      />
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
      {hint ? <HelpText id={hintId}>{hint}</HelpText> : null}
    </Field>
  )
}

function TextAreaField({
  label,
  hint,
  error,
  required = false,
  rows,
  id: idProp,
  ...props
}) {
  const { id, errorId, hintId, describedBy } = useFieldA11y({ idProp, error, hint })

  return (
    <Field>
      {label ? (
        <FieldLabel htmlFor={id}>
          {label}
          {required ? <RequiredMark aria-hidden="true"> *</RequiredMark> : null}
        </FieldLabel>
      ) : null}
      <Textarea
        id={id}
        rows={rows}
        $error={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...props}
      />
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
      {hint ? <HelpText id={hintId}>{hint}</HelpText> : null}
    </Field>
  )
}

function SelectField({
  label,
  options = [],
  placeholder,
  hint,
  error,
  required = false,
  id: idProp,
  ...props
}) {
  const { id, errorId, hintId, describedBy } = useFieldA11y({ idProp, error, hint })

  return (
    <Field>
      {label ? (
        <FieldLabel htmlFor={id}>
          {label}
          {required ? <RequiredMark aria-hidden="true"> *</RequiredMark> : null}
        </FieldLabel>
      ) : null}
      <Select
        id={id}
        $error={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            )
          }
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </Select>
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
      {hint ? <HelpText id={hintId}>{hint}</HelpText> : null}
    </Field>
  )
}

export { TextField, TextAreaField, SelectField }