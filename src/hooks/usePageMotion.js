import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, motion, syncMotionDiagnostics } from '../motion/motion'

const inView = (node) => {
  const rect = node.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

/** Page-scoped motion. CSS and markup are visible before GSAP initializes. */
export function usePageMotion(scope, dependencies) {
  const revealed = useRef(new WeakSet())

  useGSAP(() => {
    const root = scope.current
    if (!root || typeof window.matchMedia !== 'function') return undefined
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add({
      reduce: '(prefers-reduced-motion: reduce)',
      mobile: '(max-width: 767px)',
      desktop: '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
      normal: '(prefers-reduced-motion: no-preference)',
    }, ({ conditions }) => {
      if (conditions.reduce) return undefined
      const distance = conditions.mobile ? 8 : motion.distance
      const duration = conditions.mobile ? 0.4 : motion.section
      const triggers = new Set()
      const running = new Map()
      let disposed = false

      const finish = (animation) => {
        animation.totalProgress(1).pause()
      }

      // Each reveal owns its trigger. Fast scrolling completes an outgoing reveal
      // immediately instead of allowing invisible work to keep running.
      const reveal = (node, delay = 0, photo = false) => {
        if (revealed.current.has(node)) return
        if (node.getBoundingClientRect().bottom <= 0) {
          revealed.current.add(node)
          return
        }
        const target = photo ? node.querySelector('[data-photo-cover]') : node
        if (!target) return
        let trigger
        node.dataset.motionState = 'pending'
        const animation = gsap.fromTo(target,
          photo ? { scaleY: 1 } : { opacity: 0, y: distance },
          {
            ...(photo ? { scaleY: 0 } : { opacity: 1, y: 0 }),
            duration: photo ? (conditions.mobile ? 0.45 : 0.6) : duration,
            delay,
            ease: photo ? 'power2.inOut' : motion.ease,
            paused: true,
            clearProps: photo ? 'transform' : 'opacity,transform',
            onStart: () => {
              revealed.current.add(node)
              node.dataset.motionState = 'running'
            },
            onComplete: () => {
              revealed.current.add(node)
              node.dataset.motionState = 'complete'
              running.delete(animation)
              trigger?.kill()
              syncMotionDiagnostics()
            },
          })
        trigger = ScrollTrigger.create({
          trigger: node,
          start: 'top 96%',
          end: 'bottom top',
          onEnter: () => {
            running.set(animation, node)
            animation.play()
          },
          onLeave: () => finish(animation),
          onLeaveBack: () => finish(animation),
        })
        triggers.add(trigger)
      }

      const hero = root.querySelector('[data-hero]')
      if (hero && !revealed.current.has(hero)) {
        if (inView(hero)) {
          const timeline = gsap.timeline({
            onStart: () => revealed.current.add(hero),
            onComplete: () => {
              running.delete(timeline)
              hero.dataset.motionState = 'complete'
            },
          })
          hero.dataset.motionState = 'running'
          timeline.fromTo(hero.querySelectorAll('[data-hero-item]'),
            { opacity: 0, y: conditions.mobile ? 12 : 18 },
            {
              opacity: 1, y: 0,
              duration: conditions.mobile ? 0.56 : motion.hero,
              stagger: 0.08, ease: motion.ease,
              clearProps: 'opacity,transform',
            })
          running.set(timeline, hero)
          const heroTrigger = ScrollTrigger.create({
            trigger: hero, start: 'top bottom', end: 'bottom top',
            onLeave: () => finish(timeline),
            onLeaveBack: () => finish(timeline),
          })
          triggers.add(heroTrigger)
          timeline.eventCallback('onComplete', () => {
            running.delete(timeline)
            hero.dataset.motionState = 'complete'
            heroTrigger.kill()
            syncMotionDiagnostics()
          })
        } else {
          revealed.current.add(hero)
        }
      }

      root.querySelectorAll('[data-reveal]').forEach(node => reveal(node))
      root.querySelectorAll('[data-motion-group]').forEach(group => {
        const columns = Math.max(1, getComputedStyle(group).gridTemplateColumns.split(' ').length)
        group.querySelectorAll('[data-motion-card]').forEach((card, index) => {
          reveal(card, Math.min((index % columns) * motion.stagger, motion.maxDelay))
        })
      })
      root.querySelectorAll('[data-photo-reveal]').forEach(node => reveal(node, 0, true))

      // Direct scrub has no trailing tween: only scroll updates move the photo.
      // The overscan lives in AboutSection.module.css, independent of its reveal.
      if (conditions.desktop) {
        root.querySelectorAll('[data-parallax-photo]').forEach(image => {
          const owner = image.closest('[data-photo-reveal]')
          const animation = gsap.fromTo(image, { yPercent: -3 }, {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: owner, start: 'top bottom', end: 'bottom top', scrub: true,
              onToggle: self => { owner.dataset.parallaxActive = String(self.isActive) },
            },
          })
          triggers.add(animation.scrollTrigger)
        })
      }

      const settleOffscreen = () => {
        running.forEach((node, animation) => {
          if (!inView(node)) finish(animation)
        })
      }
      const onVisibility = () => {
        if (document.hidden) running.forEach((_, animation) => animation.pause())
        else {
          settleOffscreen()
          running.forEach((_, animation) => animation.play())
        }
      }
      // Keyboard navigation never lands on an invisible in-progress control.
      const onFocus = event => {
        running.forEach((node, animation) => {
          if (node.contains(event.target)) finish(animation)
        })
        const pending = event.target.closest('[data-motion-state="pending"]')
        if (pending) {
          triggers.forEach(trigger => {
            if (trigger.trigger === pending) trigger.vars.onEnter?.()
          })
          running.forEach((node, animation) => { if (node === pending) finish(animation) })
        }
      }
      // Font and image completion are bounded, event-driven refreshes.
      const refresh = () => {
        if (!disposed) {
          // Safe refresh waits for scrolling to settle. Lazy image loads must
          // not interrupt the user's native smooth anchor navigation.
          ScrollTrigger.refresh(true)
          settleOffscreen()
        }
      }
      const images = Array.from(root.querySelectorAll('img')).filter(image => !image.complete)
      images.forEach(image => image.addEventListener('load', refresh, { once: true }))
      document.fonts?.ready.then(refresh)
      document.addEventListener('visibilitychange', onVisibility)
      root.addEventListener('focusin', onFocus)
      onVisibility()
      syncMotionDiagnostics()

      return () => {
        disposed = true
        images.forEach(image => image.removeEventListener('load', refresh))
        document.removeEventListener('visibilitychange', onVisibility)
        root.removeEventListener('focusin', onFocus)
        triggers.forEach(trigger => trigger.kill())
        running.clear()
        root.querySelectorAll('[data-motion-state], [data-parallax-active]').forEach(node => {
          delete node.dataset.motionState
          delete node.dataset.parallaxActive
        })
        syncMotionDiagnostics()
      }
    }, root)

    return () => media.revert()
  // Targets are already queried through root. Keeping a ref-based GSAP selector
  // here would leave a null selector during route/media-query handoffs.
  }, { dependencies, revertOnUpdate: true })
}
