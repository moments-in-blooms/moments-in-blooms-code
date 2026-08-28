import { useRef } from "react";

import { serviceCollectionsShowcase } from "../../../../../constants/services.js";

import * as S from "./SubcategoryNav.styles.js";

function SubcategoryNav({
  sections = [],
  activeId,
  onSelect,
  ariaLabel = "Collections",
  idPrefix = "subcategory",
}) {
  const itemRefs = useRef({});

  const options = [
    { id: "all", title: serviceCollectionsShowcase.allCollectionsLabel },
    ...sections.map((section) => ({ id: section.id, title: section.title })),
  ];

  if (!options.length) return null;

  const handleKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") nextIndex = index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();

    const clampedIndex = (nextIndex + options.length) % options.length;
    const nextOption = options[clampedIndex];
    onSelect(nextOption.id);
    itemRefs.current[nextOption.id]?.focus();
  };

  return (
    <S.SubcategoryBar>
      <S.SubcategoryLabel>
        {serviceCollectionsShowcase.subcategoryLabel}
      </S.SubcategoryLabel>

      <S.SubcategoryGrid role="tablist" aria-label={ariaLabel}>
        {options.map((option, index) => {
          const isActive = option.id === activeId;

          return (
            <S.SubcategoryTile
              key={option.id}
              type="button"
              role="tab"
              id={`${idPrefix}-subtab-${option.id}`}
              aria-selected={isActive}
              aria-controls={
                option.id === "all"
                  ? undefined
                  : `${idPrefix}-subpanel-${option.id}`
              }
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                itemRefs.current[option.id] = node;
              }}
              $isActive={isActive}
              onClick={() => onSelect(option.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <S.TileBullet $isActive={isActive} aria-hidden="true" />
              <S.TileTitle $isActive={isActive}>{option.title}</S.TileTitle>
            </S.SubcategoryTile>
          );
        })}
      </S.SubcategoryGrid>
    </S.SubcategoryBar>
  );
}

export default SubcategoryNav;