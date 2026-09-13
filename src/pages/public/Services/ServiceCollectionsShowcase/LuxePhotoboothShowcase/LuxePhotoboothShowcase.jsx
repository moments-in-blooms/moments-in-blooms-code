import { useRef, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import Button from "../../../../../components/Button/index.js";
import { buildBoothTabs } from "../../../../../services/photobooth.js";

import * as S from "./LuxePhotoboothShowcase.styles.js";

function LuxePhotoboothShowcase({ highlights, groups = [], labels = {} }) {
  const inclusionsLabel = labels.inclusions ?? 'Inclusions'
  const addOnsLabel = labels.optionalAddOns ?? 'Optional Add-Ons'
  const notePrefix = labels.notePrefix ?? 'Note:'
  const [activeGroupId, setActiveGroupId] = useState(() => groups[0]?.id);
  const tabRefs = useRef({});

  if (!highlights) return null;

  const pricing = highlights.pricing ?? {};
  const showTabs = groups.length > 1;
  const tabs = showTabs ? buildBoothTabs(groups) : [];
  const visibleGroup =
    (showTabs
      ? groups.find((group) => String(group.id) === String(activeGroupId))
      : groups[0]) ??
    groups[0] ??
    null;

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") nextIndex = index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();

    const clampedIndex = (nextIndex + tabs.length) % tabs.length;
    const nextTab = tabs[clampedIndex];
    setActiveGroupId(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  return (
    <S.PhotoboothSection>
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
          <S.TabTag>{pricing.tag ?? 'Transparent Investment'}</S.TabTag>
          <S.PricingTitle>{pricing.title ?? 'Luxury Photobooth Packages'}</S.PricingTitle>
          <S.PricingDesc>
            {pricing.description ??
              'All-inclusive packages tailored with zero hidden fees. Select the perfect suite for your event duration and guest experience.'}
          </S.PricingDesc>
        </S.PricingHeader>

        {showTabs ? (
          <S.BoothTabBar role="tablist" aria-label="Photobooth packages">
            {tabs.map((tab, index) => {
              const isActive = String(tab.id) === String(visibleGroup?.id);
              return (
                <S.BoothTab
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`booth-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`booth-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(node) => {
                    tabRefs.current[tab.id] = node;
                  }}
                  $isActive={isActive}
                  onClick={() => setActiveGroupId(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {tab.label}
                </S.BoothTab>
              );
            })}
          </S.BoothTabBar>
        ) : null}

        {visibleGroup ? (
          <div
            key={visibleGroup.id}
            {...(showTabs
              ? {
                  role: "tabpanel",
                  id: `booth-panel-${visibleGroup.id}`,
                  "aria-labelledby": `booth-tab-${visibleGroup.id}`,
                }
              : {})}
          >
            <S.PackageGrid>
              {visibleGroup.packages.map((pkg) => (
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
                <h6>{inclusionsLabel}</h6>
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
                <h6>{addOnsLabel}</h6>
                <ul>
                  {(pkg.addOns ?? []).map((addOn, index) => (
                    <li key={index}>• {addOn}</li>
                  ))}
                </ul>
              </S.AddOnsBlock>

              <S.TravelNote>{notePrefix} {pkg.travelNotes}</S.TravelNote>

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
          </div>
        ) : null}
      </S.PricingContainer>
    </S.PhotoboothSection>
  );
}

export default LuxePhotoboothShowcase;
