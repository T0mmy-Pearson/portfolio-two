import React, { useState } from 'react'
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

  const handleFullStackClick = () => {
    setShowProjectCards(true)
  }

  const handleArtistClick = () => {
    setIsPaintMode(true)
  }

  const handleWriterClick = () => {
    setShowFloatingText(true)
  }

  return (
<>
  <section className="min-h-screen flex flex-row justify-center items-center bg-[#f0edcf] px-12" id="hero">
    {/* Left Column - Hero Content */}
    <div className="flex flex-col flex-1 max-w-lg">
      <h1 className="text-slate-400 text-lg mb-2 opacity-0 animate-fade-in-up libertinus-mono-regular" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>Hi, my name is</h1>
      <h2 className="text-5xl font-bold mb-4 libertinus-mono-regular opacity-0 animate-fade-in-up border-b-2 border-[#cb4242]" style={{animationDelay: '2.5s', animationFillMode: 'forwards'}}>Tom Pearson.</h2>
    <div className="border-b border-[#cb4242] space-x-6 flex flex-row">
      <p 
        className="text-l text-gray-400 bb opacity-0 animate-fade-in-up cursor-pointer hover:text-gray-600 transition-colors duration-200 libertinus-mono-regular" 
        style={{animationDelay: '2.5s', animationFillMode: 'forwards'}}
        onClick={handleFullStackClick}
      >
        Full-Stack Developer.
      </p>
      <p 
        className="text-l text-gray-400 text-right opacity-0 animate-fade-in-up cursor-pointer hover:text-gray-600 transition-colors duration-200 libertinus-mono-regular" 
        style={{animationDelay: '3.5s', animationFillMode: 'forwards'}}
        onClick={handleArtistClick}
      >
        Artist.
      </p>
      <p 
        className="text-l text-gray-400 text-right opacity-0 animate-fade-in-up cursor-pointer hover:text-gray-600 transition-colors duration-200 libertinus-mono-regular" 
        style={{animationDelay: '4s', animationFillMode: 'forwards'}}
        onClick={handleWriterClick}
      >
        Writer.
      </p>
      </div>
      {/* Navigation Links */}
       <ul className="flex gap-8 text-right font-medium mt-4 opacity-0 animate-fade-in-up" style={{animationDelay: '4.5s', animationFillMode: 'forwards'}}>
      <li>
        <button 
          onClick={onContactClick}
          className="hover:text-slate-400 libertinus-mono-regular cursor-pointer transition-colors duration-200"
        >
          Contact.
        </button>
      </li>
    </ul>
    </div>
  </section>

  {/* Writer Portfolio Overlay */}
  <WriterPortfolio 
    isVisible={showFloatingText} 
    onClose={() => setShowFloatingText(false)} 
  />

  {/* Paint Trail Effect */}
  <PaintTrailEffect 
    isActive={isPaintMode}
    onDeactivate={() => setIsPaintMode(false)}
  />

  {/* Floating Project Cards */}
  <FloatingProjectCards 
    isTriggered={showProjectCards}
    onTrigger={() => setShowProjectCards(true)}
  />
</>
)
}

export default Hero
