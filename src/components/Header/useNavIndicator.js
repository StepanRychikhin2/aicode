import { useLayoutEffect, useRef } from 'react'
import { gsap, useGSAP } from '../../motion/motion'

// One persistent underline; reusable tweens prevent queues during rapid hovering.
export function useNavIndicator(navRef, indicatorRef, activeKey, language, open) {
  const active = useRef(activeKey)
  const update = useRef(null)
  active.current = activeKey

  useGSAP(() => {
    const nav = navRef.current
    const line = indicatorRef.current
    if (!nav || !line) return undefined
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const options = { duration: 0.3, ease: 'power2.out' }
    const xTo = gsap.quickTo(line, 'x', options)
    const yTo = gsap.quickTo(line, 'y', options)
    const widthTo = gsap.quickTo(line, 'scaleX', options)
    const tweens = [xTo.tween, yTo.tween, widthTo.tween]
    let ready = false
    let hovered = null
    let disposed = false

    const current = () => nav.querySelector(`[data-nav-key="${active.current}"]`)
    const focused = () => nav.contains(document.activeElement)
      ? document.activeElement.closest('a[data-nav-key]') : null

    const place = (link, animate = true) => {
      if (disposed || !link) return
      const label = link.querySelector('[data-nav-label]')
      const navRect = nav.getBoundingClientRect()
      const rect = label.getBoundingClientRect()
      if (!navRect.width || !rect.width) {
        tweens.forEach(tween => tween.pause())
        gsap.set(line, { opacity: 0 })
        ready = false
        return
      }
      const x = rect.left - navRect.left - nav.clientLeft
      const y = link.offsetTop + link.offsetHeight - 3
      if (ready && animate && !reduced?.matches) {
        xTo(x)
        yTo(y)
        widthTo(rect.width)
      } else {
        tweens.forEach(tween => tween.pause())
        gsap.set(line, { x, y, scaleX: rect.width })
      }
      gsap.set(line, { opacity: 1 })
      ready = true
    }
    const restore = () => place(focused() || current())
    const onPointerOver = event => {
      if (event.pointerType === 'touch') return
      const link = event.target.closest('a[data-nav-key]')
      if (link && nav.contains(link)) { hovered = link; place(link) }
    }
    const onPointerLeave = () => { hovered = null; restore() }
    const onFocusIn = event => place(event.target.closest('a[data-nav-key]'))
    const onFocusOut = event => {
      if (!nav.contains(event.relatedTarget)) place(hovered || current())
    }
    const relayout = () => place(hovered || focused() || current(), false)
    // Route/section changes take precedence over any previous keyboard focus.
    update.current = () => { hovered = null; place(current()) }
    const observer = window.ResizeObserver ? new ResizeObserver(relayout) : null
    observer?.observe(nav)
    nav.querySelectorAll('a').forEach(link => observer?.observe(link))
    window.addEventListener('resize', relayout)
    nav.addEventListener('pointerover', onPointerOver)
    nav.addEventListener('pointerleave', onPointerLeave)
    nav.addEventListener('focusin', onFocusIn)
    nav.addEventListener('focusout', onFocusOut)
    reduced?.addEventListener('change', relayout)
    document.fonts?.ready.then(() => { if (!disposed) relayout() })
    place(current(), false)

    return () => {
      disposed = true
      update.current = null
      observer?.disconnect()
      window.removeEventListener('resize', relayout)
      nav.removeEventListener('pointerover', onPointerOver)
      nav.removeEventListener('pointerleave', onPointerLeave)
      nav.removeEventListener('focusin', onFocusIn)
      nav.removeEventListener('focusout', onFocusOut)
      reduced?.removeEventListener('change', relayout)
    }
  })

  useLayoutEffect(() => { update.current?.() }, [activeKey, language, open])
}
