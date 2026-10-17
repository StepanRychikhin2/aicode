import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('GC Cheese UI/UX Storefront', () => {
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
})

