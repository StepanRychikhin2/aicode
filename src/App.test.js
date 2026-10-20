import React from 'react'
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('GC Cheese UI/UX Storefront', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState(null, '', '/')
    window.scrollTo = jest.fn()
  })
  test('renders header brand and navigation', () => {
    render(<App />)
    const brandElements = screen.getAllByText(/GC/i)
    expect(brandElements.length).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: /Відкрити меню|Open menu/i })
    ).toBeInTheDocument()
  })

  test('adds product to cart and displays notification', () => {
    render(<App />)
    const addButtons = screen.getAllByRole('button', { name: /У кошик:/i })
    expect(addButtons.length).toBeGreaterThan(0)
    fireEvent.click(addButtons[0])
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('restarts the confirmation and its timeout when the same product is added again', () => {
    jest.useFakeTimers()
    try {
      render(<App />)
      const add = screen.getByRole('button', { name: 'У кошик: Гауда', exact: true })
      fireEvent.click(add)
      const firstConfirmation = screen.getByRole('status')
      act(() => jest.advanceTimersByTime(2200))
      fireEvent.click(add)
      expect(screen.getByRole('status')).not.toBe(firstConfirmation)
      act(() => jest.advanceTimersByTime(1200))
      expect(screen.getByRole('status')).toBeInTheDocument()
      act(() => jest.advanceTimersByTime(2000))
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    } finally {
      jest.useRealTimers()
    }
  })

  test('opens and closes cart drawer', () => {
    render(<App />)
    const cartTrigger = screen.getByRole('button', { name: /^Ваш кошик|^Your basket/i })
    fireEvent.click(cartTrigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const closeBtn = screen.getByRole('button', { name: /Закрити|Close/i })
    fireEvent.click(closeBtn)
  })

  test('toggles theme between light and dark mode', () => {
    render(<App />)
    const themeBtn = screen.getByRole('button', { name: /темну тему|dark mode|світлу тему|light mode/i })
    expect(themeBtn).toBeInTheDocument()

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light'
    fireEvent.click(themeBtn)
    const toggledTheme = document.documentElement.getAttribute('data-theme')
    expect(toggledTheme).toBe(initialTheme === 'dark' ? 'light' : 'dark')

    // Click again to toggle back
    fireEvent.click(themeBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe(initialTheme)
  })

  test('filters catalog products and keeps products visible', () => {
    render(<App />)
    // Navigate to catalog
    const catalogNav = screen.getByRole('link', { name: /^Каталог$|^Catalog$/i })
    fireEvent.click(catalogNav)

    // Check filter chips are rendered as tabs
    const filterTabs = screen.getAllByRole('tab')
    expect(filterTabs.length).toBeGreaterThan(0)

    // Click a filter tab (e.g., Hard or Semi-hard)
    fireEvent.click(filterTabs[1])

    // Verify products are still present in document
    const productHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(productHeadings.length).toBeGreaterThan(0)
  })

  test('keeps focus inside the cart and restores it when dismissed', () => {
    render(<App />)
    const trigger = screen.getByRole('button', { name: /^Ваш кошик/i })
    trigger.focus()
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog')
    const close = within(dialog).getByRole('button', { name: 'Закрити' })
    expect(close).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')
    userEvent.tab({ shift: true })
    expect(within(dialog).getByRole('button', { name: /Перейти до каталогу сирів/i })).toHaveFocus()
    userEvent.tab()
    expect(close).toHaveFocus()
    fireEvent.keyDown(close, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  test('resets the quantity for a newly opened product', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Гауда — Про сир' }))
    fireEvent.click(screen.getByRole('button', { name: 'Збільшити кількість' }))
    expect(within(screen.getByRole('dialog')).getByText('370 ₴')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Закрити' }))
    fireEvent.click(screen.getByRole('button', { name: 'Брі — Про сир' }))
    expect(within(screen.getByRole('dialog')).getByText('210 ₴')).toBeInTheDocument()
  })

  test('switches catalog categories using keyboard arrows', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: 'Каталог', exact: true }))
    const all = screen.getByRole('tab', { name: 'Усі' })
    all.focus()
    fireEvent.keyDown(all, { key: 'ArrowRight' })
    const soft = screen.getByRole('tab', { name: 'М’які' })
    expect(soft).toHaveFocus()
    expect(soft).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', soft.id)
    expect(screen.queryByRole('button', { name: 'Гауда — Про сир' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Брі — Про сир' })).toBeInTheDocument()
  })
})

