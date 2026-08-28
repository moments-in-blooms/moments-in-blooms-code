import { FiArrowRight, FiCheck } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";

import * as S from "./LuxePhotoboothShowcase.styles.js";

function LuxePhotoboothShowcase({ highlights, packages = [] }) {
  if (!highlights) return null;

  return (
    <S.PhotoboothSection>
      <S.StoryHeroBlock>
        <S.StoryHeroContent>
          <S.TabTag>Refined Entertainment</S.TabTag>
          <S.StoryHeroTitle>Luxury Booth Experience</S.StoryHeroTitle>
          <S.StoryHeroDesc>
            Designed for Melbourne&rsquo;s most elegant celebrations, our studio
            photobooths elevate traditional event captures into high-fashion
            portraiture. Equipped with beauty softbox lights and
            high-resolution DSLR sensors, every photo looks like a magazine
            print.
          </S.StoryHeroDesc>
          <div>
            <Button to="/contact" variant="primary" size="large">
              <span>Reserve Your Date</span>
              <FiArrowRight />
            </Button>
          </div>
        </S.StoryHeroContent>
        <S.StoryHeroImageWrapper>
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury Photobooth Guest Moment"
            loading="lazy"
          />
        </S.StoryHeroImageWrapper>
      </S.StoryHeroBlock>

      <S.ExclusiveFramesFeature>
        <div>
          <S.ExclusiveFramesBadge>
            {highlights.framesFeature?.badge}
          </S.ExclusiveFramesBadge>
          <S.ExclusiveFramesTitle>
            {highlights.framesFeature?.title}
          </S.ExclusiveFramesTitle>
          <S.ExclusiveFramesDesc>
            {highlights.framesFeature?.description}
          </S.ExclusiveFramesDesc>
          <S.HighlightList $onDark>
            {(highlights.framesFeature?.highlights ?? []).map((item, index) => (
              <li key={index}>
                <FiCheck />
                <span>{item}</span>
              </li>
            ))}
          </S.HighlightList>
        </div>
        <S.ExclusiveFramesImage>
          <img
            src={highlights.framesFeature?.image?.src}
            alt={highlights.framesFeature?.image?.alt || ""}
            loading="lazy"
          />
        </S.ExclusiveFramesImage>
      </S.ExclusiveFramesFeature>

      <div>
        <S.StudioHeader>
          <S.TabTag>{highlights.studioGrade?.badge}</S.TabTag>
          <S.StudioTitle>{highlights.studioGrade?.title}</S.StudioTitle>
          <S.StudioDesc>{highlights.studioGrade?.description}</S.StudioDesc>
        </S.StudioHeader>

        <S.StudioGradeGrid>
          {(highlights.studioGrade?.features ?? []).map((feature, index) => (
            <S.StudioFeatureCard key={index}>
              <h6>• {feature.title}</h6>
              <p>{feature.desc}</p>
            </S.StudioFeatureCard>
          ))}
        </S.StudioGradeGrid>
      </div>

      <S.PricingContainer>
        <S.PricingHeader>
          <S.TabTag>Transparent Investment</S.TabTag>
          <S.PricingTitle>Luxury Photobooth Packages</S.PricingTitle>
          <S.PricingDesc>
            All-inclusive packages tailored with zero hidden fees. Select the
            perfect suite for your event duration and guest experience.
          </S.PricingDesc>
        </S.PricingHeader>

        <S.PackageGrid>
          {packages.map((pkg) => (
            <S.PackageCard key={pkg.id} $popular={pkg.popular}>
              {pkg.popular && <S.PackageBadge>{pkg.badge}</S.PackageBadge>}

              <S.PackageName>{pkg.name}</S.PackageName>

              <S.PackagePrice $popular={pkg.popular}>
                <span className="amount">{pkg.price}</span>
                <span className="duration">/ {pkg.hireDuration}</span>
              </S.PackagePrice>

              <S.PackageTagline $popular={pkg.popular}>
                {pkg.description}
              </S.PackageTagline>

              <S.InclusionsBlock>
                <h6>Inclusions</h6>
                <S.HighlightList $popular={pkg.popular}>
                  {(pkg.inclusions ?? []).map((inclusion, index) => (
                    <li key={index}>
                      <FiCheck />
                      <span>{inclusion}</span>
                    </li>
                  ))}
                </S.HighlightList>
              </S.InclusionsBlock>

              <S.AddOnsBlock $popular={pkg.popular}>
                <h6>Optional Add-Ons</h6>
                <ul>
                  {(pkg.addOns ?? []).map((addOn, index) => (
                    <li key={index}>• {addOn}</li>
                  ))}
                </ul>
              </S.AddOnsBlock>

              <S.TravelNote>Note: {pkg.travelNotes}</S.TravelNote>

              <div>
                <Button
                  to="/contact"
                  variant={pkg.popular ? "primary" : "secondary"}
                  size="medium"
                  fullWidth
                >
                  <span>{pkg.ctaText}</span>
                  <FiArrowRight />
                </Button>
              </div>
            </S.PackageCard>
          ))}
        </S.PackageGrid>
      </S.PricingContainer>
    </S.PhotoboothSection>
  );
}

export default LuxePhotoboothShowcase;
