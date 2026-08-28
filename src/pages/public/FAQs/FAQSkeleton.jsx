import {
  HeroSkeleton,
  ListSkeleton,
  ListSkeletonRow,
  NavSkeleton,
  NavSkeletonPill,
  SkeletonBar,
} from './FAQSkeleton.styles.js'

function FaqHeroSkeleton() {
  return (
    <HeroSkeleton aria-hidden="true">
      <SkeletonBar $onDark $width="13rem" />
      <SkeletonBar $onDark $width="min(30rem, 90%)" $height="3rem" />
      <SkeletonBar $onDark $width="min(26rem, 80%)" />
    </HeroSkeleton>
  )
}

function FaqNavSkeleton() {
  return (
    <NavSkeleton aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <NavSkeletonPill key={index}>
          <SkeletonBar $width="5rem" />
        </NavSkeletonPill>
      ))}
    </NavSkeleton>
  )
}

function FaqListSkeleton() {
  return (
    <ListSkeleton aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <ListSkeletonRow key={index}>
          <SkeletonBar $width="80%" />
          <SkeletonBar $width="60%" />
        </ListSkeletonRow>
      ))}
    </ListSkeleton>
  )
}

export { FaqHeroSkeleton, FaqListSkeleton, FaqNavSkeleton }