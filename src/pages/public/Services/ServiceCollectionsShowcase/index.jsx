import { useEffect, useMemo, useRef, useState } from "react";
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
  const [searchParams] = useSearchParams();
  const requestedCollectionId = searchParams.get("collection");

  const collectionIds = useMemo(
    () => new Set((collections ?? []).map((collection) => collection.id)),
    [collections],
  );
  const isValidRequest =
    Boolean(requestedCollectionId) && collectionIds.has(requestedCollectionId);

  const [activeCollectionId, setActiveCollectionId] = useState(
    isValidRequest ? requestedCollectionId : collections?.[0]?.id || "",
  );

  // Sync when the ?collection= param changes or collections resolve async
  // (CMS content can arrive after mount). Never clobbers a valid selection
  // with anything else — unknown params fall back to the first collection.
  useEffect(() => {
    if (!collections?.length) return;
    if (isValidRequest && requestedCollectionId !== activeCollectionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- external URL param sync
      setActiveCollectionId(requestedCollectionId);
    } else if (!collectionIds.has(activeCollectionId)) {
      setActiveCollectionId(collections[0].id);
    }
  }, [
    requestedCollectionId,
    isValidRequest,
    collections,
    collectionIds,
    activeCollectionId,
  ]);

  // Deep-link landing: scroll to the showcase after ScrollToTop has forced
  // top-of-page. Runs once per mount so in-page tab clicks stay put.
  // The URL is updated with history.replaceState (not setSearchParams) so tab
  // clicks don't retrigger ScrollToTop's scroll-to-top on search change.
  const didDeepLinkScrollRef = useRef(false);
  useEffect(() => {
    if (didDeepLinkScrollRef.current || !isValidRequest || !id) return;
    if (!collections?.length) return;
    didDeepLinkScrollRef.current = true;
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
  }, [isValidRequest, id, collections]);

  const handleSelectCollection = (nextId) => {
    setActiveCollectionId(nextId);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("collection", nextId);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    } catch {
      // URL sync is best-effort; selection state is already updated.
    }
  };

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
