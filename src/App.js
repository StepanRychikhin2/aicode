import React from 'react'
import Hero from './components/Hero'
import InfoCards from './components/InfoCards'
import Advantages from './components/Advantages'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import Header from './components/Header'
import './App.css'

function App() {
	return (
		<div className="App">
			<Header />
			<Hero />
			<InfoCards />
			<Advantages />
			<CallToAction />
			<Footer />
		</div>
	)
}

export default App
