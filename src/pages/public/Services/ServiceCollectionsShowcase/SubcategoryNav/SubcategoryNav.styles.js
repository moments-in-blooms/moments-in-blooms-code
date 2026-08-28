import { css } from "styled-components";
import styled from "styled-components";

export const SubcategoryBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const SubcategoryLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.65rem;
  font-weight: 700;
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
`;

export const SubcategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2.5rem;
    row-gap: 0.35rem;
  }
`;

export const TileBullet = styled.span`
  flex-shrink: 0;
  align-self: center;
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.gold : theme.colors.taupe};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.45)};
  transition: background ${({ theme }) => theme.transitions.standard},
    opacity ${({ theme }) => theme.transitions.standard};
`;

export const TileTitle = styled.span`
  flex: 1;
  min-width: 0;
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.standard};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: none;
    font-size: 1.05rem;
  }
`;

export const SubcategoryTile = styled.button`
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  width: 100%;
  min-width: 0;
  min-height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0.7rem 0.25rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  text-align: left;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color ${({ theme }) => theme.transitions.standard};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.taupe};
  }

  &:hover ${TileBullet} {
    background: ${({ theme }) => theme.colors.taupeText};
    opacity: 1;
  }

  &:hover ${TileTitle} {
    color: ${({ theme }) => theme.colors.charcoal};
    font-weight: 500;
  }

  &:active {
    background: rgba(165, 137, 116, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      border-bottom: 2px solid ${theme.colors.gold};

      ${TileBullet} {
        background: ${theme.colors.gold};
        opacity: 1;
      }

      ${TileTitle} {
        color: ${theme.colors.charcoal};
        font-weight: 600;
      }
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: auto;
    min-height: 0;
    padding: 0.4rem 0.15rem;
    border-bottom: 2px solid transparent;

    &:last-child {
      border-bottom: 2px solid transparent;
    }

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.taupe};
    }

    ${({ $isActive, theme }) =>
      $isActive &&
      css`
        border-bottom-color: ${theme.colors.gold};
      `}
  }
`;