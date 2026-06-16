import React from 'react'
import SplitText from './SplitText'

function Hero() {
	return (
		<section id="hero" className="hero">
			<div className="overlay">
				<SplitText
					tag="h1"
					text="Смакуй сир сьогодні"
					className="hero-title"
					delay={80}
					duration={0.6}
					ease="power3.out"
					splitType="chars"
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					threshold={0.1}
					rootMargin="-100px"
					textAlign="center"
				/>

				<div className="hero-buttons">
					<a href="#products" className="btn-modern">
						Перейти до каталогу
					</a>
				</div>
			</div>
		</section>
	)
}

export default Hero
