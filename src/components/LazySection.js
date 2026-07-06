import { useEffect, useRef, useState } from 'react'

function LazySection({ children, fallback = null }) {
	const ref = useRef(null)
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		if (shouldRender || !ref.current) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					setShouldRender(true)
					observer.disconnect()
				}
			},
			{ rootMargin: '250px 0px' },
		)

		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [shouldRender])

	return <div ref={ref}>{shouldRender ? children : fallback}</div>
}

export default LazySection
