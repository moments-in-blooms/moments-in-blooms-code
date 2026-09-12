import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import CollectionSelector from "../../../../components/CollectionSelector/index.js";
import Container from "../../../../components/Container/index.js";
import Section from "../../../../components/Section/index.js";
import { serviceCollectionsShowcase } from "../../../../constants/services.js";
import { SECTION_TONES } from "../../../../constants/ui.js";
import {
  buildServicesCatalog,
  inferCatalogKind,
} from "../../../../services/content.js";
import { groupBoothPackages } from "../../../../services/photobooth.js";

import BlissfulNestShowcase from "./BlissfulNestShowcase/BlissfulNestShowcase.jsx";
import DecorHireCatalogue from "./DecorHireCatalogue/DecorHireCatalogue.jsx";
import LuxePhotoboothShowcase from "./LuxePhotoboothShowcase/LuxePhotoboothShowcase.jsx";

import * as S from "./ServiceCollectionsShowcase.styles.js";

// The catalogue renderers predate the canonical tree, so each category is
// adapted to the shape its renderer reads. Field names are identical — this
// only selects which slice of the canonical category each renderer gets.

const toDecorSections = (category) => {
  const sections = (
    Array.isArray(category?.subcategories) ? category.subcategories : []
  ).map((subcategory) => ({
    ...subcategory,
    featuredItems: Array.isArray(subcategory?.items) ? subcategory.items : [],
  }));
  const direct = Array.isArray(category?.items) ? category.items : [];
  if (direct.length > 0) {
    sections.push({
      id: `${category.id}-services`,
      title: category.title,
      subtitle: "",
      description: "",
      featuredItems: direct,
    });
  }
  return sections;
};

function CollectionContent({
  category,
  photoboothHighlights,
  blissfulNestIntro,
}) {
  const kind = inferCatalogKind(category);

  if (kind === "package") {
    return (
      <LuxePhotoboothShowcase
        highlights={photoboothHighlights}
        groups={groupBoothPackages(category)}
      />
    );
  }

  if (kind === "prize") {
    return <BlissfulNestShowcase collection={category} intro={blissfulNestIntro} />;
  }

  // Generic: any other collection renders its sub-categories as the
  // data-driven catalogue (plus a section for direct items, if any).
  return (
    <DecorHireCatalogue
      collection={{ ...category, sections: toDecorSections(category) }}
    />
  );
}

function ServiceCollectionsShowcase({
  catalog,
  photoboothHighlights = null,
  blissfulNestIntro = null,
  id,
}) {
  // The canonical tree is the single source of truth; legacy-only blobs
  // (e.g. mid-migration saves) are converted on the fly.
  const categories = useMemo(() => {
    if (catalog && Array.isArray(catalog.categories)) return catalog.categories;
    return buildServicesCatalog({}).categories;
  }, [catalog]);

  // The URL is the single source of truth for the active collection:
  // router-aware reads/writes only (no native history.replaceState, which
  // React Router cannot observe and which used to fight manual selection).
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCollectionId = searchParams.get("collection");

  const collectionIds = useMemo(
    () => new Set((categories ?? []).map((collection) => collection.id)),
    [categories],
  );
  const isValidRequest =
    Boolean(requestedCollectionId) && collectionIds.has(requestedCollectionId);

  const activeCollectionId = isValidRequest
    ? requestedCollectionId
    : categories?.[0]?.id || "";

  // Deep-link landing: scroll to the showcase after ScrollToTop has forced
  // top-of-page. Also fires when the ?collection= param changes via external
  // navigation (a footer/home link clicked while already on /services) but
  // never for in-page tab clicks — those only switch content in place.
  // ScrollToTop ignores search-only changes, so an in-page footer click never
  // gets yanked to the page top either.
  const isLocalSelectionRef = useRef(false);
  const scrolledForRef = useRef(null);
  useEffect(() => {
    if (!isValidRequest || !id || !categories?.length) return;
    if (isLocalSelectionRef.current) {
      isLocalSelectionRef.current = false;
      scrolledForRef.current = requestedCollectionId;
      return;
    }
    if (scrolledForRef.current === requestedCollectionId) return;
    scrolledForRef.current = requestedCollectionId;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }, 0);
    });
  }, [isValidRequest, requestedCollectionId, id, categories]);

  const handleSelectCollection = useCallback(
    (nextId) => {
      if (!collectionIds.has(nextId)) return;
      isLocalSelectionRef.current = true;
      const params = new URLSearchParams(searchParams);
      params.set("collection", nextId);
      setSearchParams(params, { replace: true });
    },
    [collectionIds, searchParams, setSearchParams],
  );

  if (!categories || !categories.length) return null;

  const activeCollection =
    categories.find((collection) => collection.id === activeCollectionId) ||
    categories[0];

  return (
    <Section
      id={id}
      subtitle={serviceCollectionsShowcase.subtitle}
      title={serviceCollectionsShowcase.title}
      description={serviceCollectionsShowcase.description}
      tone={SECTION_TONES.SURFACE}
    >
      <Container>
        <S.ShowcaseSection>
          <CollectionSelector
            categories={categories}
            activeId={activeCollection.id}
            ariaLabel="Main Service Collections"
            idPrefix="collection"
            onSelect={handleSelectCollection}
          />

          {categories.map((collection) => (
            <S.CollectionPanel
              key={collection.id}
              id={`collection-panel-${collection.id}`}
              role="tabpanel"
              aria-labelledby={`collection-tab-${collection.id}`}
              hidden={collection.id !== activeCollection.id}
            >
              <S.ActiveCollectionHero>
                <S.CollectionHeroContent>
                  <S.CollectionHeroTagline>
                    {collection.tagline}
                  </S.CollectionHeroTagline>
                  <S.CollectionHeroTitle>
                    {collection.title}
                  </S.CollectionHeroTitle>
                  <S.CollectionHeroDesc>
                    {collection.description}
                  </S.CollectionHeroDesc>
                  {collection.priceFrom ? (
                    <S.CollectionHeroPrice>
                      Price starts at {collection.priceFrom}
                    </S.CollectionHeroPrice>
                  ) : null}
                </S.CollectionHeroContent>
                <S.CollectionHeroImageWrapper>
                  <img
                    src={collection.coverImage?.src}
                    alt={
                      collection.coverImage?.alt || collection.title
                    }
                    loading="lazy"
                  />
                </S.CollectionHeroImageWrapper>
              </S.ActiveCollectionHero>

              <CollectionContent
                category={collection}
                photoboothHighlights={photoboothHighlights}
                blissfulNestIntro={blissfulNestIntro}
              />
            </S.CollectionPanel>
          ))}
        </S.ShowcaseSection>
      </Container>
    </Section>
  );
}

export default ServiceCollectionsShowcase;
