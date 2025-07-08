'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import AnimatedCard from '../components/AnimatedCard.module.css'
import Contact from '../components/Contact'
import About from '../components/About'
import FloatingProjectCards from '../components/FloatingProjectCards'

export default function Home() {
  const [showFloatingCards, setShowFloatingCards] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const handleViewProjects = () => {
    setShowFloatingCards(true)
  }

  const handleHideProjects = () => {
    setShowFloatingCards(false)
  }

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
        onViewProjects={handleViewProjects} 
        onAboutClick={handleShowAbout}
        onContactClick={handleShowContact}
      />
      {/* Floating Project Cards Overlay */}
      {showFloatingCards && (
        <div className="fixed inset-0 z-10 overflow-hidden">
          {/* Background depth layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(203,66,66,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(203,66,66,0.08),transparent_60%)]"></div>
          
          {/* Floating geometric shapes for depth */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#cb4242]/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 bg-[#cb4242]/15 rounded-lg rotate-45 animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#cb4242]/10 rounded-full animate-float-slow"></div>
          
          {/* Hide Projects Button */}
          <button
            onClick={handleHideProjects}
            className="absolute top-6 right-6 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative z-20">
            <FloatingProjectCards isTriggered={showFloatingCards} />
          </div>
        </div>
      )}

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