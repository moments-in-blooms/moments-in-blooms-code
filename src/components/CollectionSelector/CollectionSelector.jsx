import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MotionConfig } from "framer-motion";
import { COLLECTION_INSTRUCTION } from "../../constants/ui.js";
import { shouldShowScrollHint } from "./scrollHints.js";
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
  CollectionScrollFade,
  CollectionScrollHint,
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
  const listRef = useRef(null);
  const [showHint, setShowHint] = useState(false);

  // The "scroll for more" note (and trailing fade) appear only while the
  // row actually overflows and the user has not reached the end. Re-checked
  // on scroll, resize and category changes.
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return undefined;
    const update = () => {
      setShowHint(
        shouldShowScrollHint({
          scrollLeft: list.scrollLeft,
          scrollWidth: list.scrollWidth,
          clientWidth: list.clientWidth,
        })
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, [categories]);

  const focusCategory = useCallback((categoryId) => {
    const node = itemRefs.current[categoryId];
    node?.focus();
    // Pull keyboard-reached tabs into view without moving the page.
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node?.scrollIntoView?.({
      inline: "nearest",
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

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
    focusCategory(nextCategory.id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <CollectionNav aria-label={ariaLabel}>
        <CollectionInstruction>{COLLECTION_INSTRUCTION}</CollectionInstruction>

        <CollectionNavList
          ref={listRef}
          role="tablist"
          aria-label={ariaLabel}
        >
          <CollectionScrollFade aria-hidden="true" $visible={showHint} />
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
                  {category.countText && (
                    <CollectionMeta $isActive={isActive}>
                      {category.countText}
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
        <CollectionScrollHint aria-hidden="true" $visible={showHint}>
          Scroll for more
          <FiArrowRight aria-hidden="true" size={12} />
        </CollectionScrollHint>
      </CollectionNav>
    </MotionConfig>
  );
}

export default CollectionSelector;
