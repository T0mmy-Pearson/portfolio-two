import React, { useState, useEffect } from 'react'
import WriterPortfolio from './WriterPortfolio'
import PaintTrailEffect from './PaintTrailEffect'
import FloatingProjectCards from './FloatingProjectCards'

interface HeroProps {
  onAboutClick?: () => void
  onContactClick?: () => void
}

const Hero = ({ onAboutClick, onContactClick }: HeroProps) => {
  const [showFloatingText, setShowFloatingText] = useState(false)
  const [isPaintMode, setIsPaintMode] = useState(false)
  const [showProjectCards, setShowProjectCards] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const [clickedLinks, setClickedLinks] = useState({
    fullStack: false,
    artist: false,
    writer: false,
    contact: false
  })

  useEffect(() => {
    // Check if device is mobile (below lg breakpoint)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleFullStackClick = () => {
    setClickedLinks(prev => ({ ...prev, fullStack: true }))
    if (isMobile) {
      // Mobile: close WriterPortfolio and use sliding behavior
      setShowFloatingText(false)
      setIsSliding(true)
      setTimeout(() => {
        setShowProjectCards(true)
      }, 50)
    } else {
      // Desktop: show floating cards immediately
      setShowProjectCards(true)
    }
  }

  const handleBackToHero = () => {
    setShowProjectCards(false)
    setTimeout(() => {
      setIsSliding(false)
    }, 300) // Wait for slide animation to complete
  }

  const handleArtistClick = () => {
    setClickedLinks(prev => ({ ...prev, artist: true }))
    setIsPaintMode(true)
  }

  const handleWriterClick = () => {
    setClickedLinks(prev => ({ ...prev, writer: true }))
    setShowFloatingText(true)
  }

  const handleContactClick = () => {
    setClickedLinks(prev => ({ ...prev, contact: true }))
    if (onContactClick) {
      onContactClick()
    }
  }

  return (
    <>
      {/* Mobile Writer Portfolio - appears above hero on mobile/tablet */}
      {isMobile && showFloatingText && (
        <WriterPortfolio 
          isVisible={showFloatingText} 
          onClose={() => setShowFloatingText(false)} 
        />
      )}

      {/* Main container - conditional sliding behavior for mobile only */}
      <div className={`relative min-h-screen bg-[#f0edcf] ${isMobile ? 'overflow-hidden' : ''}`}>
        
        {/* Hero Section Panel */}
        <section 
          className={`${isMobile ? 'absolute inset-0 pt-64' : 'min-h-screen pt-64'} flex flex-row justify-center items-center px-12 ${
            isMobile && showProjectCards 
              ? 'transition-transform duration-700 ease-in-out -translate-x-full' 
              : isMobile 
                ? 'transition-transform duration-700 ease-in-out translate-x-0'
                : ''
          }`}
          id="hero"
        >
          {/* Left Column - Hero Content */}
          <div className="flex flex-col flex-1 max-w-lg">
            <h1 className="text-slate-400 text-lg mb-2 opacity-0 animate-fade-in-up libertinus-mono-regular" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>Hi, my name is</h1>
            <h2 className="text-5xl font-bold mb-4 libertinus-mono-regular opacity-0 animate-fade-in-up border-b-2 border-[#cb4242]" style={{animationDelay: '2.5s', animationFillMode: 'forwards'}}>Tom Pearson.</h2>
            <div className="border-b border-[#cb4242] space-x-6 flex flex-row animate-fade-in-up opacity-0" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>
              <p 
                className={`text-l text-gray-400 bb cursor-pointer hover:text-gray-600 hover:scale-110 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.fullStack ? 'line-through' : ''}`}
                onClick={handleFullStackClick}
              >
                Full-Stack Developer.
              </p>
              <p 
                className={`text-l text-gray-400 text-right cursor-pointer hover:text-gray-600 hover:scale-110 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.artist ? 'line-through' : ''}`}
                onClick={handleArtistClick}
              >
                Artist.
              </p>
              <p 
                className={`text-l text-gray-400 text-right cursor-pointer hover:text-gray-600 hover:scale-110 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.writer ? 'line-through' : ''}`}
                onClick={handleWriterClick}
              >
                Writer.
              </p>
            </div>
            {/* Navigation Links */}
            <ul className="flex gap-8 text-right font-medium mt-4 opacity-0 animate-fade-in-up" style={{animationDelay: '4.5s', animationFillMode: 'forwards'}}>
              <button 
                onClick={handleContactClick}
                className={`hover:text-slate-400 hover:scale-210 libertinus-mono-regular cursor-pointer transition-all duration-200 ${clickedLinks.contact ? 'line-through' : ''}`}
              >
                Contact.
              </button>
            </ul>
          </div>
        </section>

        {/* Mobile Projects Panel - slides in from right (mobile only) */}
        {isMobile && (
          <section 
            className={`absolute inset-0 flex flex-col transition-transform duration-700 ease-in-out ${
              showProjectCards ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Back button */}
            {showProjectCards && (
              <div className="absolute top-8 left-8 z-10">
                <button
                  onClick={handleBackToHero}
                  className="bg-black/20 hover:bg-black/40 text-black rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Back to hero"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Project Cards for mobile */}
            {showProjectCards && (
              <FloatingProjectCards 
                isTriggered={showProjectCards}
                onTrigger={() => setShowProjectCards(true)}
                isMobileSliding={true}
              />
            )}
          </section>
        )}
      </div>

      {/* Desktop Floating Project Cards - overlay style for desktop */}
      {!isMobile && (
        <FloatingProjectCards 
          isTriggered={showProjectCards}
          onTrigger={() => setShowProjectCards(true)}
          isMobileSliding={false}
        />
      )}

      {/* Desktop Writer Portfolio Overlay - only on desktop */}
      {!isMobile && (
        <WriterPortfolio 
          isVisible={showFloatingText} 
          onClose={() => setShowFloatingText(false)} 
        />
      )}

      {/* Paint Trail Effect */}
      <PaintTrailEffect 
        isActive={isPaintMode}
        onDeactivate={() => setIsPaintMode(false)}
      />
    </>
  )
}

export default Hero
