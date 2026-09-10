import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import CollectionSelector from "../../../../components/CollectionSelector/index.js";
import Container from "../../../../components/Container/index.js";
import Section from "../../../../components/Section/index.js";
import { serviceCollectionsShowcase } from "../../../../constants/services.js";
import { SECTION_TONES } from "../../../../constants/ui.js";

import BlissfulNestShowcase from "./BlissfulNestShowcase/BlissfulNestShowcase.jsx";
import DecorHireCatalogue from "./DecorHireCatalogue/DecorHireCatalogue.jsx";
import LuxePhotoboothShowcase from "./LuxePhotoboothShowcase/LuxePhotoboothShowcase.jsx";

import * as S from "./ServiceCollectionsShowcase.styles.js";

function CollectionContent({
  collection,
  photoboothPackages,
  photoboothHighlights,
  blissfulNestIntro,
  blissfulNestPackages,
}) {
  // Generic: any collection with sections uses data-driven catalogue
  if (Array.isArray(collection.sections) && collection.sections.length > 0) {
    return <DecorHireCatalogue collection={collection} />;
  }

  if (collection.id === "decor-hire") {
    return <DecorHireCatalogue collection={collection} />;
  }

  if (collection.id === "luxe-photobooth") {
    return (
      <LuxePhotoboothShowcase
        highlights={photoboothHighlights}
        packages={photoboothPackages}
      />
    );
  }

  if (collection.type === "sub-brand") {
    return (
      <BlissfulNestShowcase
        collection={collection}
        intro={blissfulNestIntro}
        packages={blissfulNestPackages}
      />
    );
  }

  // New generic collections without sections — hero already rendered, no extra
  return null;
}

function ServiceCollectionsShowcase({
  collections = [],
  photoboothPackages = [],
  photoboothHighlights = null,
  blissfulNestIntro = null,
  blissfulNestPackages = [],
  id,
}) {
  // The URL is the single source of truth for the active collection:
  // router-aware reads/writes only (no native history.replaceState, which
  // React Router cannot observe and which used to fight manual selection).
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCollectionId = searchParams.get("collection");

  const collectionIds = useMemo(
    () => new Set((collections ?? []).map((collection) => collection.id)),
    [collections],
  );
  const isValidRequest =
    Boolean(requestedCollectionId) && collectionIds.has(requestedCollectionId);

  const activeCollectionId = isValidRequest
    ? requestedCollectionId
    : collections?.[0]?.id || "";

  // Deep-link landing: scroll to the showcase after ScrollToTop has forced
  // top-of-page. Also fires when the ?collection= param changes via external
  // navigation (a footer/home link clicked while already on /services) but
  // never for in-page tab clicks — those only switch content in place.
  // ScrollToTop ignores search-only changes, so an in-page footer click never
  // gets yanked to the page top either.
  const isLocalSelectionRef = useRef(false);
  const scrolledForRef = useRef(null);
  useEffect(() => {
    if (!isValidRequest || !id || !collections?.length) return;
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
  }, [isValidRequest, requestedCollectionId, id, collections]);

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

  if (!collections || !collections.length) return null;

  const activeCollection =
    collections.find((collection) => collection.id === activeCollectionId) ||
    collections[0];

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
            categories={collections}
            activeId={activeCollection.id}
            ariaLabel="Main Service Collections"
            idPrefix="collection"
            onSelect={handleSelectCollection}
          />

          {collections.map((collection) => (
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
                collection={collection}
                photoboothPackages={photoboothPackages}
                photoboothHighlights={photoboothHighlights}
                blissfulNestIntro={blissfulNestIntro}
                blissfulNestPackages={blissfulNestPackages}
              />
            </S.CollectionPanel>
          ))}
        </S.ShowcaseSection>
      </Container>
    </Section>
  );
}

export default ServiceCollectionsShowcase;
