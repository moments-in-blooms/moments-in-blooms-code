import { useCallback, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import { BUTTON_VARIANTS } from "../../../../../constants/ui.js";
import SubcategoryBanner from "../SubcategoryBanner/index.js";
import SubcategoryNav from "../SubcategoryNav/index.js";
import ItemDetailModal from "../ItemDetailModal/ItemDetailModal.jsx";
import {
  toDecorFeatureDetail,
  toDecorGalleryDetail,
  toDecorOptionDetail,
} from "../itemDetail.js";

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

function FeaturedItemBlock({ item, contextLabel, onOpenDetail, labels = {} }) {
  const featuredTag = labels.featuredCollection ?? 'Featured Collection'
  const detailsLabel = labels.viewFullDetails ?? 'View full details'
  const requestLabel = labels.requestQuote ?? 'Request a Quote'
  const dimensionsPrefix = labels.dimensionsPrefix ?? 'Dimensions:'
  const showcaseFallback = labels.catalogueShowcase ?? 'Catalogue Showcase'
  const imageSrc = getImageSrc(item.image);
  const hasOptions = Array.isArray(item.options) && item.options.length > 0;
  const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0;
  const hasImage = Boolean(imageSrc);

  // Main photo: the CMS "Featured image" wins; for option-based items fall
  // back to the first option's image so a main photo always appears.
  const optionMainSrc =
    imageSrc || (hasOptions ? getImageSrc(item.options[0]?.image) : "");
  const optionMainAlt = imageSrc
    ? getImageAlt(item.image, item.name)
    : getImageAlt(item.options?.[0]?.image, item.name);
  const hasOptionMain = Boolean(optionMainSrc);

  const openFeatureDetail = () =>
    onOpenDetail(
      toDecorFeatureDetail(item, { src: optionMainSrc, alt: optionMainAlt }, requestLabel),
      contextLabel,
    );

  const priceNode = item.price ? (
    <S.CollectionPrice>{item.price}</S.CollectionPrice>
  ) : null;

  // Generic layout: if has options -> option grid, if has gallery -> gallery grid, else split feature
  if (hasOptions) {
    return (
      <S.FeaturedFeature>
        {hasOptionMain ? (
          <S.SplitFeature>
            <S.SplitImageButton
              type="button"
              aria-haspopup="dialog"
              aria-label={`View full preview: ${item.name}`}
              onClick={openFeatureDetail}
            >
              <img src={optionMainSrc} alt={optionMainAlt} loading="lazy" />
            </S.SplitImageButton>
            <S.SplitContent>
              <S.FeaturedTag>{featuredTag}</S.FeaturedTag>
              <S.FeaturedName>{item.name}</S.FeaturedName>
              {priceNode}
              {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
              {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
              {item.dimensions ? <S.OptionSpecs>{item.dimensions}</S.OptionSpecs> : null}
              <S.SplitActions>
                <Button
                  type="button"
                  variant={BUTTON_VARIANTS.GHOST}
                  size="medium"
                  onClick={openFeatureDetail}
                >
                  <span>{detailsLabel}</span>
                </Button>
              </S.SplitActions>
            </S.SplitContent>
          </S.SplitFeature>
        ) : (
          <div>
            <S.FeaturedTag>{featuredTag}</S.FeaturedTag>
            <S.FeaturedName>{item.name}</S.FeaturedName>
            {priceNode}
            {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
            {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
            {item.dimensions ? <S.OptionSpecs>{item.dimensions}</S.OptionSpecs> : null}
          </div>
        )}
        <S.OptionGrid>
          {item.options.map((option, index) => {
            const optSrc = getImageSrc(option.image);
            if (!optSrc) {
              return (
                <S.OptionCard key={option.id ?? index}>
                  <S.OptionCardBody>
                    <S.OptionName>{option.name}</S.OptionName>
                    {option.specs ? <S.OptionSpecs>{option.specs}</S.OptionSpecs> : null}
                    {option.desc ? <S.OptionDesc>{option.desc}</S.OptionDesc> : null}
                  </S.OptionCardBody>
                </S.OptionCard>
              );
            }
            return (
              <S.OptionCardButton
                key={option.id ?? index}
                type="button"
                aria-haspopup="dialog"
                aria-label={`View full details: ${option.name}`}
                onClick={() => onOpenDetail(toDecorOptionDetail(option, requestLabel), contextLabel)}
              >
                <img src={optSrc} alt={getImageAlt(option.image, option.name)} loading="lazy" />
                <S.OptionCardBody>
                  <S.OptionName>{option.name}</S.OptionName>
                  {option.specs ? <S.OptionSpecs>{option.specs}</S.OptionSpecs> : null}
                  {option.desc ? <S.OptionDesc>{option.desc}</S.OptionDesc> : null}
                </S.OptionCardBody>
              </S.OptionCardButton>
            );
          })}
        </S.OptionGrid>
      </S.FeaturedFeature>
    );
  }

  if (hasGallery) {
    return (
      <div>
        {hasImage ? (
          <S.SplitFeature>
            <S.SplitImageButton
              type="button"
              aria-haspopup="dialog"
              aria-label={`View full preview: ${item.name}`}
              onClick={() => onOpenDetail(toDecorFeatureDetail(item, undefined, requestLabel), contextLabel)}
            >
              <img src={imageSrc} alt={getImageAlt(item.image, item.name)} loading="lazy" />
            </S.SplitImageButton>
            <S.SplitContent>
              <S.FeaturedName>{item.name}</S.FeaturedName>
              {priceNode}
              {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
              {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
              <S.SplitActions>
                <Button
                  type="button"
                  variant={BUTTON_VARIANTS.GHOST}
                  size="medium"
                  onClick={() => onOpenDetail(toDecorFeatureDetail(item, undefined, requestLabel), contextLabel)}
                >
                  <span>{detailsLabel}</span>
                </Button>
              </S.SplitActions>
            </S.SplitContent>
          </S.SplitFeature>
        ) : (
          <S.FeaturedIntro>
            <S.FeaturedName>{item.name}</S.FeaturedName>
            {priceNode}
            {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
            {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
          </S.FeaturedIntro>
        )}
        <S.GalleryGrid>
          {item.gallery.map((gItem, index) => (
            <S.GalleryItemButton
              key={gItem.id ?? index}
              type="button"
              aria-haspopup="dialog"
              aria-label={`View full details: ${gItem.title}`}
              onClick={() => onOpenDetail(toDecorGalleryDetail(gItem, requestLabel), contextLabel)}
            >
              <img src={gItem.src} alt={gItem.alt || gItem.title} loading="lazy" />
              <S.GalleryCaption>{gItem.title}</S.GalleryCaption>
            </S.GalleryItemButton>
          ))}
        </S.GalleryGrid>
      </div>
    );
  }

  if (hasImage) {
    return (
      <S.SplitFeature>
        <S.SplitImageButton
          type="button"
          aria-haspopup="dialog"
          aria-label={`View full preview: ${item.name}`}
          onClick={() => onOpenDetail(toDecorFeatureDetail(item), contextLabel)}
        >
          <img src={imageSrc} alt={getImageAlt(item.image, item.name)} loading="lazy" />
        </S.SplitImageButton>
            <S.SplitContent>
              {item.dimensions ? <S.OptionSpecs>{dimensionsPrefix} {item.dimensions}</S.OptionSpecs> : <S.OptionSpecs>{showcaseFallback}</S.OptionSpecs>}
              <S.FeaturedName>{item.name}</S.FeaturedName>
              {priceNode}
              {item.tagline ? <S.CollectionSubtitle>{item.tagline}</S.CollectionSubtitle> : null}
              {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
              <S.SplitActions>
                <Button to="/contact" variant="primary" size="medium">
                  <span>{requestLabel}</span>
                  <FiArrowRight />
                </Button>
                <Button
                  type="button"
                  variant={BUTTON_VARIANTS.GHOST}
                  size="medium"
                  onClick={() => onOpenDetail(toDecorFeatureDetail(item, undefined, requestLabel), contextLabel)}
                >
                  <span>{detailsLabel}</span>
                </Button>
              </S.SplitActions>
        </S.SplitContent>
      </S.SplitFeature>
    );
  }

  // fallback minimal
  return (
    <S.FeaturedFeature>
      <S.FeaturedName>{item.name}</S.FeaturedName>
      {priceNode}
      {item.description ? <S.CollectionSubtitle>{item.description}</S.CollectionSubtitle> : null}
    </S.FeaturedFeature>
  );
}

function DecorHireCatalogue({ collection, showcase = {}, labels = {} }) {  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [detail, setDetail] = useState(null);
  const priceStartsAt =
    showcase.priceStartsAtLabel ?? labels.priceStartsAt ?? "Price starts at";
  const requestLabel = labels.requestQuote ?? "Request a Quote";

  const openDetail = useCallback((item, contextLabel) => {
    setDetail({ item, contextLabel });
  }, []);

  const closeDetail = useCallback(() => {
    setDetail(null);
  }, []);

  if (!collection.sections || !collection.sections.length) return null;

  return (
    <S.CatalogueSection>
      <SubcategoryNav
        sections={collection.sections}
        activeId={activeSubcategory}
        onSelect={setActiveSubcategory}
        ariaLabel={`${collection.title} Collections`}
        idPrefix={`decor-${collection.id}`}
        allLabel={showcase.allCollectionsLabel}
        listLabel={showcase.subcategoryLabel}
      />

      {collection.sections.map((section) => (
        <S.CollectionBlock
          key={section.id}
          id={`decor-subpanel-${section.id}`}
          role="tabpanel"
          aria-labelledby={`decor-subtab-${section.id}`}
          hidden={activeSubcategory !== "all" && activeSubcategory !== section.id}
        >
          <SubcategoryBanner
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            priceFrom={section.priceFrom}
            image={section.image}
            priceLabel={priceStartsAt}
          />

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
              <FeaturedItemBlock
                key={item.id ?? idx}
                item={item}
                contextLabel={`${collection.title} · ${section.title}`}
                onOpenDetail={openDetail}
                labels={labels}
              />
            ));
          })()}
        </S.CollectionBlock>
      ))}
      <ItemDetailModal
        item={detail?.item}
        contextLabel={detail?.contextLabel}
        onClose={closeDetail}
        ctaFallback={requestLabel}
      />
    </S.CatalogueSection>
  );
}

export default DecorHireCatalogue;
