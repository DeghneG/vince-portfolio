import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * useReveal: slowly reveals every [data-reveal] descendant as it scrolls into view.
 * Children of a [data-reveal-group] stagger together.
 */
export function useReveal({ duration = 1.6, distance = 48, stagger = 0.18 } = {}) {
  const scope = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const groups = gsap.utils.toArray('[data-reveal-group]')
        groups.forEach((group) => {
          const items = group.querySelectorAll('[data-reveal]')
          gsap.set(items, { autoAlpha: 0, y: distance, filter: 'blur(10px)' })
          ScrollTrigger.create({
            trigger: group,
            start: 'top 82%',
            once: true,
            onEnter: () =>
              gsap.to(items, {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration,
                ease: 'power3.out',
                stagger,
              }),
          })
        })

        gsap.utils
          .toArray('[data-reveal]')
          .filter((el) => !el.closest('[data-reveal-group]'))
          .forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: distance, filter: 'blur(10px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              },
            )
          })

        // growing hairlines
        gsap.utils.toArray('[data-line]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: duration * 1.4,
              ease: 'power2.inOut',
              transformOrigin: 'left center',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope },
  )

  return scope
}
