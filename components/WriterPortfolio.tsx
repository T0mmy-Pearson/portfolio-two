'use client'

import React, { useState, useEffect } from 'react'

interface WriterPortfolioProps {
  isVisible: boolean
  onClose: () => void
}

const WriterPortfolio = ({ isVisible, onClose }: WriterPortfolioProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  const fullText = [
    "With a diverse background spanning sound design, artistic direction, digital strategy, and creative facilitation, I bring a unique multidisciplinary perspective to full-stack development. From conceptualising immersive audio-visual performances to spearheading comprehensive web presence overhauls for energy and hospitality clients, my experience demonstrates adaptability and technical innovation across creative and digital domains.",
    
    "That's why I chose to undertake a bootcamp with Northcoders - to synthesise my creative expertise with robust technical skills and continue pushing boundaries in digital realms. I am an adaptable, intuitive and passionate person whose natural curiosity, innovation, and analytical skill set means that I thrive in dynamic roles that demand learning and growth.",
  ]

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('')
      setCurrentParagraph(0)
      setCurrentChar(0)
      setIsTypingComplete(false)
      return
    }

    if (currentParagraph >= fullText.length) {
      setIsTypingComplete(true)
      return
    }

    const currentText = fullText[currentParagraph]
    
    if (currentChar < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => {
          const paragraphs = prev.split('\n\n')
          if (paragraphs.length <= currentParagraph) {
            return prev + currentText[currentChar]
          } else {
            paragraphs[currentParagraph] = (paragraphs[currentParagraph] || '') + currentText[currentChar]
            return paragraphs.join('\n\n')
          }
        })
        setCurrentChar(prev => prev + 1)
      }, 30) // Typing speed - adjust as needed

      return () => clearTimeout(timer)
    } else {
      // Finished current paragraph, move to next
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + '\n\n')
        setCurrentParagraph(prev => prev + 1)
        setCurrentChar(0)
      }, 800) // Pause between paragraphs

      return () => clearTimeout(timer)
    }
  }, [isVisible, currentParagraph, currentChar, fullText])
  
  if (!isVisible) return null

  return (
    <div 
      id="writer-portfolio"
      className="w-full bg-[#f0edcf] px-4 py-8 sm:pt-0 lg:fixed lg:top-5 lg:right-12 lg:z-30 lg:pointer-events-none lg:w-auto lg:px-0 lg:py-0"
    >
      <div className="w-full max-w-4xl mx-auto p-6 relative lg:w-[480px] lg:h-[500px] lg:max-w-none lg:mx-0 lg:pointer-events-auto">

        {/* Typewriter Content */}
        <div className="relative pt-4 lg:h-full lg:overflow-y-auto">
          <div className="libertinus-mono-regular text-gray-700 leading-relaxed">
            <div className="text-sm whitespace-pre-line">
              {displayedText}
              {!isTypingComplete && (
                <span className="animate-pulse">|</span>
              )}
            </div>
            
            {/* Close button - appears at the end of text after typing is complete */}
            {isTypingComplete && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={onClose}
                  className="text-black underline hover:text-gray-600 transition-colors duration-200 libertinus-mono-regular"
                  aria-label="Close Writer portfolio"
                >
                  Close Text
                </button>
              </div>
            )}
          </div>
        </div>
    
      </div>
    </div>
  )
}

export default WriterPortfolio
