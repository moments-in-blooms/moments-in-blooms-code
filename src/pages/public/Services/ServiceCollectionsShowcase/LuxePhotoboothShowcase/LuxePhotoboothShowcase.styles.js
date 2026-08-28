import styled from "styled-components";

export const PhotoboothSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
`;

export const TabTag = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.675rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
`;

export const StoryHeroBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  background: ${({ theme }) => theme.gradients.storyHero};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(2rem, 4vw, 3.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`;

export const StoryHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const StoryHeroTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  line-height: 1.1;
`;

export const StoryHeroDesc = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.8;
`;

export const StoryHeroImageWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
  height: 340px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ExclusiveFramesFeature = styled.div`
  background: ${({ theme }) => theme.gradients.exclusiveFrames};
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(2rem, 4vw, 3.5rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

export const ExclusiveFramesBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: rgba(201, 178, 138, 0.16);
  color: ${({ theme }) => theme.colors.goldLight};
  border: 1px solid rgba(201, 178, 138, 0.4);
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii.pill};
  margin-bottom: 0.75rem;
`;

export const ExclusiveFramesTitle = styled.h4`
  margin: 0 0 1rem;
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 500;
  line-height: 1.15;
`;

export const ExclusiveFramesDesc = styled.p`
  margin: 0 0 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.7;
`;

export const ExclusiveFramesImage = styled.div`
  border-radius: 16px;
  overflow: hidden;
  height: 320px;
  border: 1px solid rgba(201, 178, 138, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.85rem;
    line-height: 1.45;
    color: ${({ $onDark }) => ($onDark ? "rgba(255, 255, 255, 0.85)" : "inherit")};

    svg {
      color: ${({ $popular, $onDark, theme }) =>
        $popular ? theme.colors.gold : $onDark ? theme.colors.gold : theme.colors.textSecondary};
      flex-shrink: 0;
      font-size: 1rem;
      margin-top: 0.1rem;
    }
  }
`;

export const StudioHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
`;

export const StudioTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  line-height: 1.1;
`;

export const StudioDesc = styled.p`
  margin: 0;
  max-width: 650px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
`;

export const StudioGradeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

export const StudioFeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};

  h6 {
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 1.15rem;
    font-weight: 500;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    line-height: 1.6;
  }
`;

export const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PricingHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  max-width: 650px;
  margin: 0 auto;
`;

export const PricingTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
`;

export const PricingDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
`;

export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
`;

export const PackageCard = styled.div`
  position: relative;
  background: ${({ $popular, theme }) =>
    $popular
      ? theme.gradients.packagePopular
      : theme.colors.surface};
  color: ${({ $popular, theme }) => ($popular ? theme.colors.surface : "inherit")};
  border: ${({ $popular, theme }) =>
    $popular ? `2px solid ${theme.colors.gold}` : `1px solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(2rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $popular }) =>
    $popular
      ? "0 20px 40px rgba(0, 0, 0, 0.25)"
      : "0 10px 30px rgba(0, 0, 0, 0.04)"};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

export const PackageBadge = styled.span`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.35rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(165, 137, 116, 0.4);
`;

export const PackageName = styled.h5`
  margin: 0 0 0.25rem;
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

export const PackagePrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  span.amount {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 2.75rem;
    font-weight: 600;
    line-height: 1;
    color: ${({ $popular, theme }) => ($popular ? theme.colors.surface : "inherit")};
  }

  span.duration {
    font-size: 0.85rem;
    opacity: 0.8;
  }
`;

export const PackageTagline = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  opacity: 0.85;
  line-height: 1.5;
  padding-bottom: 1rem;
  border-bottom: 1px solid
    ${({ $popular }) =>
      $popular ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0.08)"};
`;

export const InclusionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.9;
  }
`;

export const AddOnsBlock = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px dashed
    ${({ $popular }) =>
      $popular ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0.1)"};
  margin-bottom: 1.25rem;

  h6 {
    margin: 0 0 0.5rem;
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    li {
      font-size: 0.8rem;
      opacity: 0.85;
    }
  }
`;

export const TravelNote = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.75rem;
  font-style: italic;
  opacity: 0.75;
  line-height: 1.4;
`;
