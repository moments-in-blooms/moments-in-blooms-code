import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MotionConfig } from "framer-motion";
import { COLLECTION_INSTRUCTION } from "../../constants/ui.js";
import {
  ActivePill,
  CollectionArrow,
  CollectionDesc,
  CollectionIndex,
  CollectionInstruction,
  CollectionItem,
  CollectionMeta,
  CollectionName,
  CollectionNav,
  CollectionNavList,
  CollectionTextGroup,
} from "./CollectionSelector.styles.js";

function CollectionSelector({
  categories = [],
  activeId,
  onSelect,
  ariaLabel = "Service Collections",
  idPrefix = "category",
}) {
  const itemRefs = useRef({});

  if (!categories.length) return null;

  const handleKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") nextIndex = index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = categories.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();

    const clampedIndex = (nextIndex + categories.length) % categories.length;
    const nextCategory = categories[clampedIndex];
    onSelect(nextCategory.id);
    itemRefs.current[nextCategory.id]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <CollectionNav aria-label={ariaLabel}>
        <CollectionInstruction>{COLLECTION_INSTRUCTION}</CollectionInstruction>

        <CollectionNavList role="tablist" aria-label={ariaLabel}>
          {categories.map((category, index) => {
            const isActive = category.id === activeId;

            return (
              <CollectionItem
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${idPrefix}-panel-${category.id}`}
                id={`${idPrefix}-tab-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(node) => {
                  itemRefs.current[category.id] = node;
                }}
                $isActive={isActive}
                onClick={() => onSelect(category.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {isActive && (
                  <ActivePill
                    layoutId={`${idPrefix}ActivePill`}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}

                <CollectionTextGroup $isActive={isActive}>
                  <CollectionIndex $isActive={isActive} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </CollectionIndex>
                  <CollectionName $isActive={isActive}>
                    {category.title}
                  </CollectionName>
                  {category.navSub && (
                    <CollectionDesc $isActive={isActive}>
                      {category.navSub}
                    </CollectionDesc>
                  )}
                  {category.navMeta && (
                    <CollectionMeta $isActive={isActive}>
                      {category.navMeta}
                    </CollectionMeta>
                  )}
                </CollectionTextGroup>

                <CollectionArrow
                  $isActive={isActive}
                  data-arrow
                  aria-hidden="true"
                >
                  <FiArrowRight />
                </CollectionArrow>
              </CollectionItem>
            );
          })}
        </CollectionNavList>
      </CollectionNav>
    </MotionConfig>
  );
}

export default CollectionSelector;
