import { css } from "styled-components";
import styled from "styled-components";

export const CatalogueSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
`;

export const CollectionBlock = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(1.75rem, 3.5vw, 3rem);
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  &[hidden] {
    display: none;
  }

  @keyframes subcategory-panel-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:not([hidden]) {
    animation: subcategory-panel-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    &:not([hidden]) {
      animation: none;
    }
  }
`;

export const CollectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1.25rem;
`;

export const CollectionTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  font-weight: 500;
`;

export const CollectionSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const FeaturedIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
`;

export const FeaturedTag = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.675rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
`;

export const FeaturedName = styled.h5`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 500;
  line-height: 1.2;
`;

export const FeaturedFeature = styled.div`
  background: ${({ theme }) => theme.gradients.redRomance};
  border: 1px solid rgba(165, 137, 116, 0.35);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const OptionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(26, 24, 23, 0.04);

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
`;

export const OptionCardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const OptionName = styled.h6`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.15rem;
  font-weight: 500;
`;

export const OptionSpecs = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const OptionDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 1.25rem;
`;

export const GalleryItem = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  aspect-ratio: 4 / 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const GalleryCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.85rem;
  font-weight: 500;
`;

export const SplitFeature = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;

    ${({ $reversed }) =>
      $reversed &&
      css`
        & ${SplitImageWrapper} {
          order: 2;
        }
      `}
  }
`;

export const SplitImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  height: 280px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SplitContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;
