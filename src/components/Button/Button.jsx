import { NavLink } from 'react-router-dom'
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../../constants/ui.js'
import { Button as StyledButton, ButtonSpinner } from './Button.styles.js'

function Button({
  children,
  loading = false,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  variant = BUTTON_VARIANTS.PRIMARY,
  radius = 'pill',
  fullWidth = false,
  type = 'button',
  to,
  as,
  ...props
}) {
  const isDisabled = disabled || loading
  const Component = as || (to ? NavLink : 'button')

  const linkProps =
    to && isDisabled
      ? { 'aria-disabled': true, tabIndex: -1, onClick: (event) => event.preventDefault() }
      : null

  return (
    <StyledButton
      as={Component}
      to={to}
      $size={size}
      $variant={variant}
      $radius={radius}
      $fullWidth={fullWidth}
      aria-busy={loading}
      disabled={isDisabled}
      type={to ? undefined : type}
      {...linkProps}
      {...props}
    >
      {loading ? <ButtonSpinner aria-hidden="true" /> : children}
    </StyledButton>
  )
}

export default Button
