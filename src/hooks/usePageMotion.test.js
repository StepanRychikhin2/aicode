import React, { StrictMode, useRef } from 'react'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import { usePageMotion } from './usePageMotion'
import { gsap, ScrollTrigger } from '../motion/motion'

function MotionPage({ language = 'ua' }) {
  const scope = useRef(null)
  usePageMotion(scope, [language])
  return <main ref={scope}><h2 data-reveal>{language === 'ua' ? 'Наш сир' : 'Our cheese'}</h2></main>
}

describe('page motion lifecycle', () => {
  let reduced
  let oldMatchMedia
  let rect

  beforeEach(() => {
    reduced = false
    oldMatchMedia = window.matchMedia
    window.matchMedia = jest.fn(query => ({
      media: query,
      matches: query === '(prefers-reduced-motion: reduce)' ? reduced
        : query === '(prefers-reduced-motion: no-preference)' ? !reduced : false,
      addListener: jest.fn(), removeListener: jest.fn(),
      addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }))
    rect = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      top: 100, bottom: 200, left: 0, right: 400, width: 400, height: 100,
    })
    window.scrollTo = jest.fn()
  })

  afterEach(() => {
    rect.mockRestore()
    window.matchMedia = oldMatchMedia
  })

  test('reverts styles and releases its triggers after language changes and unmount', () => {
    const baseline = ScrollTrigger.getAll().length
    const { rerender, unmount } = render(<StrictMode><MotionPage /></StrictMode>)
    expect(ScrollTrigger.getAll().length).toBe(baseline + 1)
    rerender(<StrictMode><MotionPage language="en" /></StrictMode>)
    expect(screen.getByRole('heading', { name: 'Our cheese' })).toBeInTheDocument()
    expect(ScrollTrigger.getAll().length).toBe(baseline + 1)
    const heading = screen.getByRole('heading')
    unmount()
    expect(ScrollTrigger.getAll().length).toBe(baseline)
    expect(heading.style.opacity).toBe('')
    expect(heading.style.transform).toBe('')
  })

  test('keeps content visible and removes motion when reduced motion changes live', () => {
    const { unmount } = render(<MotionPage />)
    expect(ScrollTrigger.getAll().length).toBeGreaterThan(0)
    act(() => {
      reduced = true
      gsap.matchMediaRefresh()
    })
    const heading = screen.getByRole('heading')
    expect(heading.style.opacity).toBe('')
    expect(heading.style.transform).toBe('')
    expect(ScrollTrigger.getAll()).toHaveLength(0)
    unmount()
  })
})
