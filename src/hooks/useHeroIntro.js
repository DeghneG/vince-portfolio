import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/** Slow, staggered character rise for the hero headline on load. */
export function useHeroIntro() {
  const ref = useRef(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from('.hero__char', { yPercent: 110, duration: 1.8, stagger: 0.035 })
          .from('.hero__meta > *', { autoAlpha: 0, y: 20, filter: 'blur(8px)', duration: 1.6, stagger: 0.2 }, '-=1.1')
          .from('.hero__orb', { scale: 0.4, autoAlpha: 0, duration: 2.6, ease: 'power2.out' }, 0)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return ref
}
