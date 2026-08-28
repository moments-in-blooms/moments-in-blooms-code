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

  ${({ $status }) => {
    const statusMap = {
      new: {
        background: 'rgba(200, 154, 94, 0.14)',
        color: '#8a6626',
      },
      contacted: {
        background: 'rgba(165, 137, 116, 0.16)',
        color: '#6e5745',
      },
      quoted: {
        background: 'rgba(63, 125, 84, 0.14)',
        color: '#38a16f',
      },
      closed: {
        background: '#e2e8f0',
        color: '#1e293b',
      },
    }
    const style = statusMap[$status]
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