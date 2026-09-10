import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGift } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import {
  rise,
  staggerContainer,
  VIEWPORT_DEFAULT,
} from "../../../../../styles/animations.js";
import ItemDetailModal from "../ItemDetailModal/ItemDetailModal.jsx";
import { toBlissfulPackageDetail } from "../itemDetail.js";

import * as S from "./BlissfulNestShowcase.styles.js";

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

function PackageCard({ pkg, contextLabel, onOpenDetail }) {
  const imgSrc = getImageSrc(pkg.image);
  const imgAlt = getImageAlt(pkg.image, pkg.name);
  return (
    <motion.div variants={rise}>
      <S.PackageCardButton
        type="button"
        aria-haspopup="dialog"
        aria-label={`View full details: ${pkg.name}`}
        onClick={() => onOpenDetail(pkg, contextLabel)}
      >
        <S.PackageImageWrapper>
          <img src={imgSrc} alt={imgAlt} loading="lazy" />
        </S.PackageImageWrapper>
        <S.PackageBody>
          {pkg.isFeatured ? <S.PackageBadge>Featured</S.PackageBadge> : <S.PackageBadge>{pkg.badge}</S.PackageBadge>}
          <S.PackageName>{pkg.name}</S.PackageName>
          <S.PackageTagline>{pkg.tagline}</S.PackageTagline>
          {pkg.price ? <S.PackagePrice>{pkg.price}</S.PackagePrice> : null}
          <S.PackageDesc>{pkg.description}</S.PackageDesc>
          <S.PackageItems>
            {(pkg.items ?? []).map((item) => (
              <li key={item}>
                <FiGift />
                <span>{item}</span>
              </li>
            ))}
          </S.PackageItems>
        </S.PackageBody>
      </S.PackageCardButton>
    </motion.div>
  );
}

function SubcategoryHeaderMedia({ subcategory }) {
  const imageSrc = getImageSrc(subcategory?.image);
  if (!imageSrc) return null;
  return (
    <S.ProductCategoryImage>
      <img
        src={imageSrc}
        alt={getImageAlt(subcategory?.image, subcategory?.title)}
        loading="lazy"
      />
    </S.ProductCategoryImage>
  );
}

function BlissfulNestShowcase({ collection, intro }) {
  const subcategories = Array.isArray(collection?.subcategories)
    ? collection.subcategories
    : [];
  const directItems = Array.isArray(collection?.items) ? collection.items : [];
  const introText = intro?.paragraph ?? "";
  const [detail, setDetail] = useState(null);

  const openDetail = useCallback((pkg, contextLabel) => {
    setDetail({ item: toBlissfulPackageDetail(pkg), contextLabel });
  }, []);

  const closeDetail = useCallback(() => {
    setDetail(null);
  }, []);

  if (subcategories.length === 0 && directItems.length === 0) return null;

  return (
    <S.NestSection>
      <S.NestIntro>
        <S.NestBrandTitle>{collection.title}</S.NestBrandTitle>
        <S.NestIntroText>{introText}</S.NestIntroText>
        <div>
          <Button to="/contact" variant="primary" size="large">
            <span>Enquire Now</span>
            <FiArrowRight />
          </Button>
        </div>
      </S.NestIntro>

      {subcategories.map((subcategory) => (
        <S.ProductCategory key={subcategory.id}>
          <S.ProductCategoryHeader>
            <SubcategoryHeaderMedia subcategory={subcategory} />
            <S.ProductCategoryTag>Current Offering</S.ProductCategoryTag>
            <S.ProductCategoryTitle>{subcategory.title}</S.ProductCategoryTitle>
            {subcategory.description && (
              <S.ProductCategoryDesc>{subcategory.description}</S.ProductCategoryDesc>
            )}
            {subcategory.priceFrom ? (
              <S.ProductCategoryPrice>Price starts at {subcategory.priceFrom}</S.ProductCategoryPrice>
            ) : null}
          </S.ProductCategoryHeader>

          <S.PackageGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
          >
            {(subcategory.items ?? []).map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                contextLabel={`${collection.title} · ${subcategory.title}`}
                onOpenDetail={openDetail}
              />
            ))}
          </S.PackageGrid>
        </S.ProductCategory>
      ))}
      {directItems.length > 0 ? (
        <S.ProductCategory>
          <S.ProductCategoryHeader>
            <S.ProductCategoryTag>More options</S.ProductCategoryTag>
            <S.ProductCategoryTitle>{collection.title}</S.ProductCategoryTitle>
          </S.ProductCategoryHeader>

          <S.PackageGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
          >
            {directItems.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                contextLabel={collection.title}
                onOpenDetail={openDetail}
              />
            ))}
          </S.PackageGrid>
        </S.ProductCategory>
      ) : null}
      <ItemDetailModal
        item={detail?.item}
        contextLabel={detail?.contextLabel}
        onClose={closeDetail}
      />
    </S.NestSection>
  );
}

export default BlissfulNestShowcase;
