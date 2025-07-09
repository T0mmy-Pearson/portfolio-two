'use client'

import React, { useState, useEffect } from 'react'

interface WriterPortfolioProps {
  isVisible: boolean
  onClose: () => void
}

const WriterPortfolio = ({ isVisible, onClose }: WriterPortfolioProps) => {
  const [isPaused, setIsPaused] = useState(false)
  
  // Handle spacebar key press for pause/play
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isVisible) {
        event.preventDefault()
        setIsPaused(prev => !prev)
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isVisible])
  
  if (!isVisible) return null

  const loremText = [
    "With a diverse background spanning sound design, artistic direction, digital strategy, and creative facilitation, I bring a unique multidisciplinary perspective to full-stack development. From conceptualising immersive audio-visual performances to spearheading comprehensive web presence overhauls for energy and hospitality clients, my experience demonstrates adaptability and technical innovation across creative and digital domains.",
    
    "That's why I chose to undertake a bootcamp with Northcoders - to synthesise my creative expertise with robust technical skills and continue pushing boundaries in digital realms. I am an adaptable, intuitive and passionate person whose natural curiosity, innovation, and analytical skill set means that I thrive in dynamic roles that demand learning and growth.",
    
  ]


  const repeatedText = Array(24).fill(loremText).flat()

  return (
    <div className="fixed top-5 right-12 z-30 pointer-events-none">
      <div className="w-96 h-110 bg-[#f0edcf] rounded-lg p-6  relative pointer-events-auto">
        
        {/* Header with Writer title and close button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {/* Pause/Play button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors duration-200"
              aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
            >
              {isPaused ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              )}
            </button>
            {/* Close button */}
            <button
              onClick={onClose}
              className="bg-black/70 hover:bg-black text-white rounded-full p-1.5 transition-colors duration-200"
              aria-label="Close Writer portfolio"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Scrolling Content */}
        <div className="h-full overflow-hidden relative pt-4">
          <div 
            className={`libertinus-mono-regular text-gray-700 leading-relaxed space-y-4 ${isPaused ? '' : 'animate-scroll-up'}`}
            style={isPaused ? { animationPlayState: 'paused' } : { animationPlayState: 'running' }}
          >
            {repeatedText.map((paragraph, index) => (
              <p key={index} className="text-sm">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        {/* Gradient overlay to fade out text at edges */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f0edcf] to-transparent pointer-events-none"></div>
        <div className="absolute  left-0 right-0 h-8 bg-gradient-to-b from-[#f0edcf] to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}

export default WriterPortfolio
