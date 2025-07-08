'use client'

import React from 'react'

interface WriterPortfolioProps {
  isVisible: boolean
  onClose: () => void
}

const WriterPortfolio = ({ isVisible, onClose }: WriterPortfolioProps) => {
  if (!isVisible) return null

  const loremText = [
    "With a diverse background spanning sound design, artistic direction, digital strategy, and creative facilitation, I bring a unique multidisciplinary perspective to full-stack development. From conceptualising immersive audio-visual performances to spearheading comprehensive web presence overhauls for energy and hospitality clients, my experience demonstrates adaptability and technical innovation across creative and digital domains.",
    
    " That's why I chose to undertake a bootcamp with Northcoders - to synthesise my creative expertise with robust technical skills and continue pushing boundaries in digital realms. I am an adaptable, intuitive and passionate person whose natural curiosity, innovation, and analytical skill set means that I thrive in dynamic roles that demand learning and growth.",
    
  ]

  // Repeat the text multiple times for continuous scrolling
  const repeatedText = Array(24).fill(loremText).flat()

  return (
    <div className="fixed top-1/4 right-12 z-30 pointer-events-none">
      <div className="w-96 h-96 bg-[#f0edcf] rounded-lg p-6 overflow-hidden relative pointer-events-auto">

        {/* Scrolling Content */}
        <div className="h-full overflow-hidden">
          <div className="animate-scroll-up libertinus-mono-regular text-gray-700 leading-relaxed space-y-4">
            {repeatedText.map((paragraph, index) => (
              <p key={index} className="text-sm">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        {/* Gradient overlay to fade out text at edges */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f0edcf] to-transparent pointer-events-none"></div>
        <div className="absolute top-16 left-0 right-0 h-8 bg-gradient-to-b from-[#f0edcf] to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}

export default WriterPortfolio
