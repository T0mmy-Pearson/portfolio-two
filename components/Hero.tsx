import React, { useState, useEffect } from 'react'
import WriterPortfolio from './WriterPortfolio'
import PaintTrailEffect from './PaintTrailEffect'
import ProjectCarousel from './ProjectCarousel'
import type { ActivePanel } from '../app/page'

interface HeroProps {
  activePanel: ActivePanel
  onActivate: (panel: ActivePanel) => void
}

const Hero = ({ activePanel, onActivate }: HeroProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const [clickedLinks, setClickedLinks] = useState({
    fullStack: false,
    artist: false,
    writer: false,
    contact: false,
    techStack: false
  })

  const showProjectCards = activePanel === 'projects'
  const showFloatingText = activePanel === 'writer'
  const isPaintMode = activePanel === 'paint'

  useEffect(() => {
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
      setIsSliding(true)
      setTimeout(() => onActivate('projects'), 50)
    } else {
      onActivate('projects')
    }
  }

  const handleBackToHero = () => {
    onActivate(null)
    setTimeout(() => setIsSliding(false), 300)
  }

  const handleArtistClick = () => {
    setClickedLinks(prev => ({ ...prev, artist: true }))
    onActivate('paint')
  }

  const handleWriterClick = () => {
    setClickedLinks(prev => ({ ...prev, writer: true }))
    onActivate('writer')
  }

  const handleContactClick = () => {
    setClickedLinks(prev => ({ ...prev, contact: true }))
    onActivate('contact')
  }

  const handleTechStackClick = () => {
    setClickedLinks(prev => ({ ...prev, techStack: true }))
    onActivate('techStack')
  }

  return (
    <>
      {/* Mobile Writer Portfolio - appears above hero on mobile/tablet */}
      {isMobile && showFloatingText && (
        <WriterPortfolio
          isVisible={showFloatingText}
          onClose={() => onActivate(null)}
        />
      )}

      {/* Main container - conditional sliding behavior for mobile only */}
      <div className={`relative min-h-screen bg-white ${isMobile ? 'overflow-hidden' : ''}`}>

        {/* Hero Section Panel */}
        <section
          className={`${isMobile ? 'absolute inset-0 pt-16' : 'min-h-screen pt-16'} flex flex-col items-start justify-start px-12 ${
            isMobile && showProjectCards
              ? 'transition-transform duration-700 ease-in-out -translate-x-full'
              : isMobile
                ? 'transition-transform duration-700 ease-in-out translate-x-0'
                : ''
          }`}
          id="hero"
        >
          {/* Hero Content - top left, constrained to left half */}
          <div className="flex flex-col w-full md:w-1/2 md:pr-8">
            <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold mb-8 libertinus-mono-regular opacity-0 animate-fade-in-up border-b-2 border-black pb-4" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>Tom Pearson.</h1>
            <div className="border-b border-black flex flex-row flex-wrap gap-x-8 md:gap-x-12 gap-y-2 pb-4 animate-fade-in-up opacity-0" style={{animationDelay: '3s', animationFillMode: 'forwards'}}>
              <p
                className={`text-2xl md:text-3xl xl:text-4xl text-gray-400 cursor-pointer hover:text-gray-700 hover:scale-105 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.fullStack ? 'line-through' : ''}`}
                onClick={handleFullStackClick}
              >
                Full-Stack Developer.
              </p>
              <p
                className={`text-2xl md:text-3xl xl:text-4xl text-gray-400 cursor-pointer hover:text-gray-700 hover:scale-105 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.artist ? 'line-through' : ''}`}
                onClick={handleArtistClick}
              >
                Artist.
              </p>
              <p
                className={`text-2xl md:text-3xl xl:text-4xl text-gray-400 cursor-pointer hover:text-gray-700 hover:scale-105 transition-all duration-200 libertinus-mono-regular animate-pulse-shadow ${clickedLinks.writer ? 'line-through' : ''}`}
                onClick={handleWriterClick}
              >
                Writer.
              </p>
            </div>
            {/* Navigation Links */}
            <ul className="flex flex-wrap gap-x-12 gap-y-2 font-medium mt-8 opacity-0 animate-fade-in-up" style={{animationDelay: '4.5s', animationFillMode: 'forwards'}}>
              <button
                onClick={handleContactClick}
                className={`text-xl md:text-2xl xl:text-3xl hover:text-gray-500 hover:scale-105 libertinus-mono-regular cursor-pointer transition-all duration-200 ${clickedLinks.contact ? 'line-through' : ''}`}
              >
                Contact.
              </button>
              <button
                onClick={handleTechStackClick}
                className={`text-xl md:text-2xl xl:text-3xl hover:text-gray-500 hover:scale-105 libertinus-mono-regular cursor-pointer transition-all duration-200 ${clickedLinks.techStack ? 'line-through' : ''}`}
              >
                Tech Stack.
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

            {/* Project Carousel for mobile */}
            {showProjectCards && (
              <ProjectCarousel
                isTriggered={showProjectCards}
                onTrigger={() => onActivate(null)}
                isMobileSliding={true}
              />
            )}
          </section>
        )}
      </div>

      {/* Desktop Project Carousel - modal style for desktop */}
      {!isMobile && (
        <ProjectCarousel
          isTriggered={showProjectCards}
          onTrigger={() => onActivate(null)}
          isMobileSliding={false}
        />
      )}

      {/* Desktop Writer Portfolio Overlay - only on desktop */}
      {!isMobile && (
        <WriterPortfolio
          isVisible={showFloatingText}
          onClose={() => onActivate(null)}
        />
      )}

      {/* Paint Trail Effect */}
      <PaintTrailEffect
        isActive={isPaintMode}
        onDeactivate={() => onActivate(null)}
      />
    </>
  )
}

export default Hero
