import { useState } from "react";

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
  const [activeCollectionId, setActiveCollectionId] = useState(
    collections?.[0]?.id || "",
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
            onSelect={setActiveCollectionId}
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
