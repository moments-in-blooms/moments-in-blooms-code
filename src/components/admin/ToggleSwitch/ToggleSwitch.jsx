import { useId } from 'react'
import { ToggleHint, ToggleKnob, ToggleLabel, ToggleRow, ToggleTrack } from './ToggleSwitch.styles.js'

function ToggleSwitch({ label, hint, checked, onChange, disabled = false }) {
  const id = useId()

  return (
    <ToggleRow>
      {label ? (
        <ToggleLabel htmlFor={id}>
          {label}
          {hint ? <ToggleHint>{hint}</ToggleHint> : null}
        </ToggleLabel>
      ) : null}
      <ToggleTrack $checked={Boolean(checked)}>
        <input
          id={id}
          type="checkbox"
          checked={Boolean(checked)}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <ToggleKnob $checked={Boolean(checked)} aria-hidden="true" />
      </ToggleTrack>
    </ToggleRow>
  )
}

export default ToggleSwitch