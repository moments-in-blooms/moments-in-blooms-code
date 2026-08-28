import { motion } from "framer-motion";
import { FiArrowRight, FiGift } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import {
  rise,
  staggerContainer,
  VIEWPORT_DEFAULT,
} from "../../../../../styles/animations.js";

import * as S from "./BlissfulNestShowcase.styles.js";

function BlissfulNestShowcase({ collection, intro, packages = [] }) {
  const productCategories = collection.productCategories || [];
  const introText = intro?.paragraph ?? "";

  if (!productCategories.length) return null;

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

      {productCategories.map((category) => (
        <S.ProductCategory key={category.id}>
          <S.ProductCategoryHeader>
            <S.ProductCategoryTag>Current Offering</S.ProductCategoryTag>
            <S.ProductCategoryTitle>{category.name}</S.ProductCategoryTitle>
            {category.description && (
              <S.ProductCategoryDesc>{category.description}</S.ProductCategoryDesc>
            )}
          </S.ProductCategoryHeader>

          <S.PackageGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
          >
            {packages.map((pkg) => (
              <motion.div key={pkg.id} variants={rise}>
                <S.PackageCard>
                  <S.PackageImageWrapper>
                    <img src={pkg.image} alt={pkg.name} loading="lazy" />
                  </S.PackageImageWrapper>
                  <S.PackageBody>
                    <S.PackageBadge>{pkg.badge}</S.PackageBadge>
                    <S.PackageName>{pkg.name}</S.PackageName>
                    <S.PackageTagline>{pkg.tagline}</S.PackageTagline>
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
                </S.PackageCard>
              </motion.div>
            ))}
          </S.PackageGrid>
        </S.ProductCategory>
      ))}
    </S.NestSection>
  );
}

export default BlissfulNestShowcase;
