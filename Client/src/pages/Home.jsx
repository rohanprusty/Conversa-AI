import React from 'react'
import HeroSection from '../Components/HeroSection'
import FeatureGrid from '../Components/FeatureGrid'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div className='w-full'>
      <HeroSection />
      <FeatureGrid />
      <Footer />
    </div>
  )
}

export default Home
