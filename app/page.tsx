'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import About from '../components/About'

export default function Home() {
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const handleShowAbout = () => {
    setShowAboutModal(true)
  }

  const handleCloseAbout = () => {
    setShowAboutModal(false)
  }

  const handleShowContact = () => {
    setShowContactModal(true)
  }

  const handleCloseContact = () => {
    setShowContactModal(false)
  }

  return (
    <div className="relative bg-[#f0edcf]">
      {/* Hero Section - Main content */}
      <Hero 
        onAboutClick={handleShowAbout}
        onContactClick={handleShowContact}
      />

      {/* Contact Modal Overlay */}
      {showContactModal && (
        <Contact onClose={handleCloseContact} />
      )}

      {/* About Modal Overlay */}
      {showAboutModal && (
        <About onClose={handleCloseAbout} />
      )}
    </div>
  )
}
