import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const motion = {
  ease: 'power2.out',
  section: 0.5,
  hero: 0.64,
  stagger: 0.07,
  maxDelay: 0.21,
  distance: 16,
}

// Development-only, read-only counters for route-cycle and idle audits.
// No polling, global debug functions, or production telemetry.
export function syncMotionDiagnostics() {
  if (process.env.NODE_ENV !== 'development') return
  document.documentElement.dataset.motionTriggers = String(ScrollTrigger.getAll().length)
}

export { gsap, ScrollTrigger, useGSAP }
