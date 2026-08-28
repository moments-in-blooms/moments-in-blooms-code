import { motion } from "framer-motion";
import { css } from "styled-components";
import styled from "styled-components";

export const CollectionNav = styled.nav`
  width: 100%;
`;

export const CollectionInstruction = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.85rem;
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};

    &::before {
      content: "";
      flex-shrink: 0;
      width: 1.5rem;
      height: 1px;
      background: ${({ theme }) => theme.colors.gold};
    }
  }
`;

export const CollectionNavList = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    overflow: visible;
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const CollectionItem = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex: 1 1 0;
  min-width: 0;
  padding: 1.15rem 1.5rem;
  background: transparent;
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  text-align: left;
  outline: none;
  scroll-snap-align: start;
  -webkit-tap-highlight-color: transparent;
  transition: background ${({ theme }) => theme.transitions.standard};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? "transparent" : "rgba(165, 137, 116, 0.05)"};
  }

  &:hover [data-arrow] {
    opacity: 1;
    transform: translateX(3px);
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      border: 1px solid ${theme.colors.primary};
      border-radius: ${theme.radii.md};
      border-right: 1px solid ${theme.colors.primary};

      &:last-child {
        border-right: 1px solid ${theme.colors.primary};
      }

      &:focus-visible {
        box-shadow: none;
        outline: 2px solid ${theme.colors.gold};
        outline-offset: 2px;
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    flex: none;
    min-width: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
    padding: 1.1rem 1.25rem;
    min-height: ${({ theme }) => theme.controls.tapTarget};
    border: 1px solid
      ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    border-right: 1px solid
      ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : theme.colors.border};
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : theme.colors.blushSoft};
    box-shadow: ${({ $isActive, theme }) =>
      $isActive
        ? `inset 0 2px 0 ${theme.colors.gold}, 0 10px 24px rgba(26, 26, 26, 0.16)`
        : theme.shadows.card};
    transition: background ${({ theme }) => theme.transitions.standard},
      box-shadow ${({ theme }) => theme.transitions.standard},
      transform 150ms ease;

    &:hover {
      background: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : theme.colors.blushSoft};
    }

    &:focus-visible {
      outline: 2px solid
        ${({ $isActive, theme }) =>
          $isActive ? theme.colors.gold : theme.colors.primary};
      outline-offset: 2px;
    }

    &:last-child {
      border-right: 1px solid
        ${({ $isActive, theme }) =>
          $isActive ? theme.colors.primary : theme.colors.border};
    }

    @media (prefers-reduced-motion: no-preference) {
      &:active {
        transform: scale(0.99);
      }
    }
  }
`;

export const ActivePill = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: inset 0 2px 0 ${({ theme }) => theme.colors.gold},
    0 14px 30px rgba(26, 26, 26, 0.3);
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const CollectionIndex = styled.span`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.gold : theme.colors.textSecondary};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.8)};
  transition: color ${({ theme }) => theme.transitions.standard};
`;

export const CollectionTextGroup = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  min-width: 0;
  flex: 1;
  padding: 0.55rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $isActive }) =>
    $isActive
      ? "rgba(165, 137, 116, 0.14)"
      : "rgba(165, 137, 116, 0.07)"};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "inset 0 0 0 1px rgba(165, 137, 116, 0.3)" : "none"};
  transition: background ${({ theme }) => theme.transitions.standard},
    box-shadow ${({ theme }) => theme.transitions.standard};

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: transparent;
      box-shadow: none;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0.3rem;
    padding: 0;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const CollectionName = styled.span`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.3rem, 1.7vw, 1.6rem);
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.nearWhite : theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color ${({ theme }) => theme.transitions.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.35rem;
  }
`;

export const CollectionDesc = styled.span`
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.greige : theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color ${({ theme }) => theme.transitions.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.82rem;
    line-height: 1.5;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
`;

export const CollectionMeta = styled.span`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.greige : theme.colors.primaryHover};
  transition: color ${({ theme }) => theme.transitions.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    letter-spacing: 0.09em;
  }
`;

export const CollectionArrow = styled.span`
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.gold : theme.colors.textSecondary};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
  transform: translateX(0);
  transition: all ${({ theme }) => theme.transitions.standard};

  svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
