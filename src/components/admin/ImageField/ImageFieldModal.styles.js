import styled from 'styled-components'

export const ModalDropzone = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  min-height: 9.5rem;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.taupe};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  ${({ $dragging, theme }) =>
    $dragging &&
    `
      border-color: ${theme.colors.focus};
      background: rgba(165, 137, 116, 0.12);
      box-shadow: ${theme.shadows.focus};
    `}

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }
`

export const ModalDropTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.85rem;
  font-weight: 700;
`

export const ModalDropHint = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.72rem;
  line-height: 1.6;
`

export const ModalError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.5;
`

export const ModalPreviewWrap = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-items: center;
`

export const ModalPreview = styled.img`
  width: 100%;
  max-height: 20rem;
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
`

export const ModalSelectedName = styled.p`
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.74rem;
`

export const PickAnotherButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const ModalCurrentRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`

export const ModalCurrentThumb = styled.img`
  flex: 0 0 auto;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
`

export const ModalCurrentText = styled.div`
  display: grid;
  gap: 0.15rem;
  min-width: 0;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.78rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.74rem;
    line-height: 1.5;
  }
`

export const HiddenInput = styled.input`
  display: none;
`

export const ModalTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const ModalTab = styled.button`
  flex: 1;
  padding: 0.55rem 0.5rem;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.surface : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.taupe};
  }
`

export const LibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 22rem;
  overflow-y: auto;
`

export const LibraryItem = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
`

export const LibraryThumbButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 5.5rem;
    object-fit: cover;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -2px;
  }
`

export const LibraryDeleteButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(26, 26, 26, 0.78);
  color: #fff;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.66rem;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.danger};
  }

  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }
`

export const LibraryEmpty = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  line-height: 1.6;
  text-align: center;
`