import styled from 'styled-components'

export const StoryGallerySection = styled.section`
  margin-top: clamp(2.5rem, 6vw, 3.5rem);
`

export const StorySectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: '';
    flex: none;
    width: 1.5rem;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const StoryGalleryFrame = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 640px) {
    aspect-ratio: 4 / 3;
  }

  > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const StoryGalleryPrev = styled.button`
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const StoryGalleryNext = styled.button`
  position: absolute;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const StoryGalleryMeta = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`

export const StoryGalleryCounter = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    margin: 0 0.4rem;
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const StoryGalleryThumbs = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1.25rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StoryGalleryThumb = styled.button`
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  padding: 3px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  ${({ $isActive, theme }) => $isActive && `border-color: ${theme.colors.gold};`}

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const StoryGalleryThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
  display: block;
`
