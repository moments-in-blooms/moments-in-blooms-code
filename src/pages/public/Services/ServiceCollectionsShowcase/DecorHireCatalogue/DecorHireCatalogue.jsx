import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import SubcategoryNav from "../SubcategoryNav/index.js";

import * as S from "./DecorHireCatalogue.styles.js";

function DecorHireCatalogue({ collection }) {
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  if (!collection.sections || !collection.sections.length) return null;

  return (
    <S.CatalogueSection>
      <SubcategoryNav
        sections={collection.sections}
        activeId={activeSubcategory}
        onSelect={setActiveSubcategory}
        ariaLabel="Decor Hire Collections"
        idPrefix="decor"
      />

      {collection.sections.map((section) => (
        <S.CollectionBlock
          key={section.id}
          id={`decor-subpanel-${section.id}`}
          role="tabpanel"
          aria-labelledby={`decor-subtab-${section.id}`}
          hidden={
            activeSubcategory !== "all" && activeSubcategory !== section.id
          }
        >
          <S.CollectionHeader>
            <S.CollectionTitle>{section.title}</S.CollectionTitle>
            <S.CollectionSubtitle>{section.subtitle}</S.CollectionSubtitle>
          </S.CollectionHeader>

          {section.id === "flower-arrangements" && section.featuredItem && (
            <S.FeaturedFeature>
              <div>
                <S.FeaturedTag>Featured Collection</S.FeaturedTag>
                <S.FeaturedName>{section.featuredItem.name}</S.FeaturedName>
                <S.CollectionSubtitle>
                  {section.featuredItem.description}
                </S.CollectionSubtitle>
              </div>

              <S.OptionGrid>
                {section.featuredItem.options?.map((option, index) => (
                  <S.OptionCard key={index}>
                    <img src={option.image} alt={option.name} loading="lazy" />
                    <S.OptionCardBody>
                      <S.OptionName>{option.name}</S.OptionName>
                      <S.OptionSpecs>{option.specs}</S.OptionSpecs>
                      <S.OptionDesc>{option.desc}</S.OptionDesc>
                    </S.OptionCardBody>
                  </S.OptionCard>
                ))}
              </S.OptionGrid>
            </S.FeaturedFeature>
          )}

          {section.id === "whimsical-garden" && section.featuredItem && (
            <div>
              <S.FeaturedIntro>
                <S.FeaturedName>{section.featuredItem.name}</S.FeaturedName>
                <S.CollectionSubtitle>
                  {section.featuredItem.description}
                </S.CollectionSubtitle>
              </S.FeaturedIntro>
              <S.GalleryGrid>
                {section.featuredItem.gallery?.map((item, index) => (
                  <S.GalleryItem key={index}>
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <S.GalleryCaption>{item.title}</S.GalleryCaption>
                  </S.GalleryItem>
                ))}
              </S.GalleryGrid>
            </div>
          )}

          {(section.id === "backdrops-collection" ||
            section.id === "plinths-props") &&
            section.featuredItem && (
              <S.SplitFeature $reversed={section.id === "plinths-props"}>
                <S.SplitImageWrapper>
                  <img
                    src={section.featuredItem.image}
                    alt={section.featuredItem.name}
                    loading="lazy"
                  />
                </S.SplitImageWrapper>
                <S.SplitContent>
                  <S.OptionSpecs>
                    {section.id === "backdrops-collection"
                      ? `Dimensions: ${section.featuredItem.dimensions}`
                      : "Catalogue Showcase"}
                  </S.OptionSpecs>
                  <S.FeaturedName>{section.featuredItem.name}</S.FeaturedName>
                  <S.CollectionSubtitle>
                    {section.featuredItem.description}
                  </S.CollectionSubtitle>
                  <div>
                    <Button
                      to="/contact"
                      variant={
                        section.id === "backdrops-collection"
                          ? "primary"
                          : "secondary"
                      }
                      size="medium"
                    >
                      <span>Request a Quote</span>
                      <FiArrowRight />
                    </Button>
                  </div>
                </S.SplitContent>
              </S.SplitFeature>
            )}
        </S.CollectionBlock>
      ))}
    </S.CatalogueSection>
  );
}

export default DecorHireCatalogue;
