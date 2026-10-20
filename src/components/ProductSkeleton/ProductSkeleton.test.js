import React from 'react'
import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import ProductSkeleton from './ProductSkeleton'

test('runs only visible skeletons and disconnects visibility tracking on unmount', () => {
  const oldObserver = window.IntersectionObserver
  const oldMedia = window.matchMedia
  let notify
  let notifyMotion
  let reduced = false
  const disconnect = jest.fn()
  window.IntersectionObserver = jest.fn(callback => {
    notify = callback
    return { observe: jest.fn(), disconnect }
  })
  window.matchMedia = () => ({
    get matches() { return reduced },
    addEventListener: (_, callback) => { notifyMotion = callback },
    removeEventListener: jest.fn(),
  })
  try {
    const { container, unmount } = render(<ProductSkeleton count={2} />)
    const [first, second] = container.querySelectorAll('article')
    expect(first).toHaveAttribute('data-animation-active', 'false')
    act(() => notify([{ target: first, isIntersecting: true }]))
    expect(first).toHaveAttribute('data-animation-active', 'true')
    expect(second).toHaveAttribute('data-animation-active', 'false')
    act(() => notify([{ target: first, isIntersecting: false }]))
    expect(first).toHaveAttribute('data-animation-active', 'false')
    act(() => notify([{ target: first, isIntersecting: true }]))
    act(() => { reduced = true; notifyMotion() })
    expect(first).toHaveAttribute('data-animation-active', 'false')
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  } finally {
    window.IntersectionObserver = oldObserver
    window.matchMedia = oldMedia
  }
})
