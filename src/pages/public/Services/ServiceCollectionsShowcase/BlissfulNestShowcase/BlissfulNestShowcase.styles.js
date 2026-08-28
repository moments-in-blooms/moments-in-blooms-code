import { motion } from "framer-motion";
import styled from "styled-components";

export const NestSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
  background: ${({ theme }) => theme.gradients.blissNestPanel};
  border: 1px solid rgba(165, 137, 116, 0.35);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(2rem, 5vw, 4rem);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -140px;
    right: -120px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(165, 137, 116, 0.4),
      transparent 70%
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -160px;
    left: -140px;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(165, 137, 116, 0.14),
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const NestIntro = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 720px;
`;

export const NestBrandTitle = styled.h3`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

export const NestIntroText = styled.p`
  margin: 0 0 1.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.8;
`;

export const ProductCategory = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProductCategoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ProductCategoryTag = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.675rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const ProductCategoryTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 500;
  line-height: 1.2;
`;

export const ProductCategoryDesc = styled.p`
  margin: 0;
  max-width: 640px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.7;
`;

export const PackageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const PackageCard = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(165, 137, 116, 0.3);
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(26, 24, 23, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(26, 24, 23, 0.12);
  }
`;

export const PackageImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  ${PackageCard}:hover img {
    transform: scale(1.06);
  }
`;

export const PackageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1;
  padding: 1.5rem;
`;

export const PackageBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(165, 137, 116, 0.14);
  border: 1px solid rgba(165, 137, 116, 0.45);
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

export const PackageName = styled.h5`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
`;

export const PackageTagline = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const PackageDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.65;
`;

export const PackageItems = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 1rem 0 0;
  border-top: 1px dashed rgba(165, 137, 116, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.85rem;
    line-height: 1.45;

    svg {
      color: ${({ theme }) => theme.colors.primaryHover};
      flex-shrink: 0;
      font-size: 1rem;
      margin-top: 0.1rem;
    }
  }
`;
