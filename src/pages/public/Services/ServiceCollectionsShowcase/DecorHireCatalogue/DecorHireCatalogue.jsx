import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import SubcategoryNav from "../SubcategoryNav/index.js";

import * as S from "./DecorHireCatalogue.styles.js";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.src ?? "";
};

const getImageAlt = (image, fallback = "") => {
  if (!image) return fallback;
  if (typeof image === "string") return fallback;
  return image.alt || fallback;
};

function FeaturedItemBlock({ item }) {
  const imageSrc = getImageSrc(item.image);
  const hasOptions = Array.isArray(item.options) && item.options.length > 0;
  const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0;
  const hasImage = Boolean(imageSrc);

  // Generic layout: if has options -> option grid, if has gallery -> gallery grid, else split feature
  if (hasOptions) {
    return (
      <S.FeaturedFeature>
        <div>
          <S.FeaturedTag>Featured Collection</S.FeaturedTag>
          <S.FeaturedName>{item.name}</S.FeaturedName>
          {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
          {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
          {item.dimensions ? <S.OptionSpecs>{item.dimensions}</S.OptionSpecs> : null}
        </div>
        <S.OptionGrid>
          {item.options.map((option, index) => {
            const optSrc = getImageSrc(option.image);
            return (
              <S.OptionCard key={option.id ?? index}>
                {optSrc ? <img src={optSrc} alt={getImageAlt(option.image, option.name)} loading="lazy" /> : null}
                <S.OptionCardBody>
                  <S.OptionName>{option.name}</S.OptionName>
                  {option.specs ? <S.OptionSpecs>{option.specs}</S.OptionSpecs> : null}
                  {option.desc ? <S.OptionDesc>{option.desc}</S.OptionDesc> : null}
                </S.OptionCardBody>
              </S.OptionCard>
            );
          })}
        </S.OptionGrid>
      </S.FeaturedFeature>
    );
  }

  if (hasGallery) {
    return (
      <div>
        <S.FeaturedIntro>
          <S.FeaturedName>{item.name}</S.FeaturedName>
          {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
          {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
        </S.FeaturedIntro>
        <S.GalleryGrid>
          {item.gallery.map((gItem, index) => (
            <S.GalleryItem key={gItem.id ?? index}>
              <img src={gItem.src} alt={gItem.alt || gItem.title} loading="lazy" />
              <S.GalleryCaption>{gItem.title}</S.GalleryCaption>
            </S.GalleryItem>
          ))}
        </S.GalleryGrid>
      </div>
    );
  }

  if (hasImage) {
    return (
      <S.SplitFeature>
        <S.SplitImageWrapper>
          <img src={imageSrc} alt={getImageAlt(item.image, item.name)} loading="lazy" />
        </S.SplitImageWrapper>
        <S.SplitContent>
          {item.dimensions ? <S.OptionSpecs>Dimensions: {item.dimensions}</S.OptionSpecs> : <S.OptionSpecs>Catalogue Showcase</S.OptionSpecs>}
          <S.FeaturedName>{item.name}</S.FeaturedName>
          {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
          {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
          <div>
            <Button to="/contact" variant="primary" size="medium">
              <span>Request a Quote</span>
              <FiArrowRight />
            </Button>
          </div>
        </S.SplitContent>
      </S.SplitFeature>
    );
  }

  // fallback minimal
  return (
    <S.FeaturedFeature>
      <S.FeaturedName>{item.name}</S.FeaturedName>
      {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
    </S.FeaturedFeature>
  );
}

function DecorHireCatalogue({ collection }) {
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  if (!collection.sections || !collection.sections.length) return null;

  return (
    <S.CatalogueSection>
      <SubcategoryNav
        sections={collection.sections}
        activeId={activeSubcategory}
        onSelect={setActiveSubcategory}
        ariaLabel={`${collection.title} Collections`}
        idPrefix={`decor-${collection.id}`}
      />

      {collection.sections.map((section) => (
        <S.CollectionBlock
          key={section.id}
          id={`decor-subpanel-${section.id}`}
          role="tabpanel"
          aria-labelledby={`decor-subtab-${section.id}`}
          hidden={activeSubcategory !== "all" && activeSubcategory !== section.id}
        >
          <S.CollectionHeader>
            <S.CollectionTitle>{section.title}</S.CollectionTitle>
            {section.subtitle ? <S.CollectionSubtitle>{section.subtitle}</S.CollectionSubtitle> : null}
            {section.description ? <S.CollectionSubtitle>{section.description}</S.CollectionSubtitle> : null}
          </S.CollectionHeader>

          {(() => {
            const allItems = Array.isArray(section.featuredItems)
              ? section.featuredItems
              : section.featuredItem
                ? [section.featuredItem]
                : [];
            // Decision: no fallback — if zero featured, render nothing
            const featuredItems = allItems.filter((it) => it.isFeatured !== false);
            if (featuredItems.length === 0) return null;
            return featuredItems.map((item, idx) => (
              <FeaturedItemBlock key={item.id ?? idx} item={item} />
            ));
          })()}
        </S.CollectionBlock>
      ))}
    </S.CatalogueSection>
  );
}

export default DecorHireCatalogue;
