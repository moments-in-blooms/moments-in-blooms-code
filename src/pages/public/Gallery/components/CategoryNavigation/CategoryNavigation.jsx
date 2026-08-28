import * as S from './CategoryNavigation.styles.js'

const INDICATOR_SPRING = { type: 'spring', stiffness: 420, damping: 34 }

function CategoryNavigation({ categories, activeCategory, onCategoryChange }) {
  return (
    <S.CategoryNavSection>
      <S.CategoryNavContainer>
        <S.CategoryNavLabel>Filter By Category</S.CategoryNavLabel>
        <S.CategoryNavList role="tablist" aria-label="Gallery Categories">
          {categories.map((category) => {
            const isActive = activeCategory === category.id

            return (
              <S.CategoryNavItem
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="gallery-panel"
                onClick={() => onCategoryChange(category.id)}
              >
                {isActive && (
                  <S.ActiveIndicator
                    layoutId="category-active-indicator"
                    transition={INDICATOR_SPRING}
                  />
                )}
                <S.CategoryNavItemLabel>{category.label}</S.CategoryNavItemLabel>
                {isActive && <S.ActiveUnderline aria-hidden="true" />}
              </S.CategoryNavItem>
            )
          })}
        </S.CategoryNavList>
      </S.CategoryNavContainer>
    </S.CategoryNavSection>
  )
}

export default CategoryNavigation
