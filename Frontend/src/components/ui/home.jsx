import React from 'react'
import Navbar from './shared/navbar'
import HeroSection from './heroSection'
import CategoryCarousel from './categoryCarousel'
import LatestJobs from './latestJobs'
import Footer from './shared/footer'

function Home() {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />

    </div>
  )
}

export default Home