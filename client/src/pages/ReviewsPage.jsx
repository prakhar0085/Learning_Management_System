import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ReviewPage from '../components/ReviewPage'

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
        <Nav/>
        <div className="pt-20 pb-10">
            <ReviewPage/>
        </div>
        <Footer/>
    </div>
  )
}

export default ReviewsPage
