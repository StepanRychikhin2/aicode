import React, { Suspense, lazy } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import './App.css'

const InfoCards = lazy(() => import('./components/InfoCards'))
const Advantages = lazy(() => import('./components/Advantages'))
const CallToAction = lazy(() => import('./components/CallToAction'))
const Footer = lazy(() => import('./components/Footer'))

const LazySection = ({ children }) => (
	<Suspense fallback={null}>{children}</Suspense>
)

function App() {
	return (
		<div className="App">
			<Header />
			<Hero />
			<LazySection>
				<InfoCards />
			</LazySection>
			<LazySection>
				<Advantages />
			</LazySection>
			<LazySection>
				<CallToAction />
			</LazySection>
			<LazySection>
				<Footer />
			</LazySection>
		</div>
	)
}

export default App
