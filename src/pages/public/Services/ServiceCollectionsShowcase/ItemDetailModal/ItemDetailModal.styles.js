import styled from 'styled-components'

export const ItemOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.layers.menu};
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(165, 137, 116, 0.5) transparent;
  background: rgba(26, 26, 26, 0.55);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(165, 137, 116, 0.5);
    border: 0;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(165, 137, 116, 0.7);
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`

export const ItemPanel = styled.div`
  position: relative;
  display: grid;
  width: min(100%, 56rem);
  max-height: calc(100svh - 4rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(165, 137, 116, 0.5) transparent;
  scrollbar-gutter: stable;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.dialog};

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(165, 137, 116, 0.5);
    border: 0;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(165, 137, 116, 0.7);
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`

export const ItemToolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 0;
`

export const ItemClose = styled.button`
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

export const ItemMedia = styled.div`
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.secondary};
`

export const ItemMediaImage = styled.img`
  width: 100%;
  max-height: 64svh;
  object-fit: contain;
  display: block;
  border-radius: ${({ theme }) => theme.radii.md};
`

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xxl};
`

export const ItemKicker = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.675rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const ItemTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 500;
  line-height: 1.15;
`

export const ItemBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgba(165, 137, 116, 0.14);
  border: 1px solid rgba(165, 137, 116, 0.45);
  border-radius: ${({ theme }) => theme.radii.pill};
`

export const ItemTagline = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
`

export const ItemSpecs = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

export const ItemDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
`

export const ItemList = styled.ul`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  padding: ${({ theme }) => theme.spacing.md} 0 0;
  border-top: 1px dashed rgba(165, 137, 116, 0.4);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.9rem;
    line-height: 1.5;

    svg {
      color: ${({ theme }) => theme.colors.primaryHover};
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
  }
`

export const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`
