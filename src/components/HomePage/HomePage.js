import styles from './HomePage.module.css'
import React, { useRef } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { usePageMotion } from '../../hooks/usePageMotion'
import Hero from '../Hero/Hero'
import Advantages from '../Advantages/Advantages'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import AboutSection from '../AboutSection/AboutSection'
import RestaurantSection from '../RestaurantSection/RestaurantSection'
import Reviews from '../Reviews/Reviews'
import OrderSteps from '../OrderSteps/OrderSteps'
import OrderForm from '../OrderForm/OrderForm'

export default function HomePage({ onProduct }) {
  const scope = useRef(null)
  const { lang } = useLang()
  usePageMotion(scope, [lang])
  return <main ref={scope} className={styles.home} id="main-content" tabIndex={-1}>
    <Hero />
    <Advantages />
    <FeaturedProducts onProduct={onProduct} />
    <AboutSection />
    <RestaurantSection />
    <Reviews />
    <OrderSteps />
    <OrderForm />
  </main>
}
