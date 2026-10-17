import React from 'react'

export default function ProductSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <article className="product-card skeleton-card" key={idx} aria-hidden="true">
          <div className="skeleton-image-wrapper">
            <div className="skeleton-shimmer skeleton-image" />
          </div>
          <div className="product-info skeleton-info">
            <div className="skeleton-text-group">
              <div className="skeleton-shimmer skeleton-tag" />
              <div className="skeleton-shimmer skeleton-title" />
            </div>
            <div className="skeleton-shimmer skeleton-weight" />
          </div>
          <div className="skeleton-shimmer skeleton-desc" />
          <div className="skeleton-shimmer skeleton-desc short" />
          <div className="product-bottom skeleton-bottom">
            <div className="skeleton-shimmer skeleton-price" />
            <div className="skeleton-shimmer skeleton-btn" />
          </div>
        </article>
      ))}
    </>
  )
}

