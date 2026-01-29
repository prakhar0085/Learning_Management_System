import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import About from '../components/About'
import Logos from '../components/Logos'

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
        <Nav/>
        <div className="pt-20">
            <About/>
            <Logos/>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutPage
