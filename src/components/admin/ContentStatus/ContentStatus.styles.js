import styled, { css } from 'styled-components'

const statusStyle = css`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: capitalize;
  white-space: nowrap;

  ${({ theme, $tone }) => {
    const toneMap = {
      success: {
        background: 'rgba(63, 125, 84, 0.14)',
        color: theme.colors.success,
      },
      warning: {
        background: 'rgba(201, 138, 46, 0.14)',
        color: theme.colors.warning,
      },
      danger: {
        background: 'rgba(201, 74, 70, 0.12)',
        color: theme.colors.danger,
      },
      info: {
        background: 'rgba(59, 110, 143, 0.14)',
        color: theme.colors.info,
      },
      neutral: {
        background: 'rgba(165, 137, 116, 0.16)',
        color: theme.colors.taupeText,
      },
      gold: {
        background: 'rgba(200, 154, 94, 0.14)',
        color: '#8a6626',
      },
    }
    const style = toneMap[$tone]
    if (style) {
      return css`
        background: ${style.background};
        color: ${style.color};
      `
    }
    return ''
  }}
`

export const StatusPill = styled.span`
  ${statusStyle}
`