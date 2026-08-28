import { useEffect, useState } from 'react'

function useScrolled(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false,
  )

  useEffect(() => {
    const handleScroll = () => {
      const nextValue = window.scrollY > threshold
      setIsScrolled((currentValue) => (currentValue === nextValue ? currentValue : nextValue))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

export default useScrolled
