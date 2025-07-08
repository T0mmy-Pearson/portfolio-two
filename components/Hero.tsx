
import React, { useState } from 'react'
import WriterPortfolio from './WriterPortfolio'

interface HeroProps {
  onViewProjects?: () => void
  onAboutClick?: () => void
  onContactClick?: () => void
}

const Hero = ({ onViewProjects, onAboutClick, onContactClick }: HeroProps) => {
  const [showPaintSplats, setShowPaintSplats] = useState(false)
  const [showFloatingText, setShowFloatingText] = useState(false)

  const handleArtistClick = () => {
    setShowPaintSplats(true)
    // Reset animation after it completes
 /*    setTimeout(() => setShowPaintSplats(false), 3000) */
  }

  const handleWriterClick = () => {
    setShowFloatingText(true)
    // Reset animation after it completes
   // setTimeout(() => setShowFloatingText(false), 5000)
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
        onClick={onViewProjects}
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

  {/* Paint Splat Animation */}
  {showPaintSplats && (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Large paint splats with irregular shapes */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#cb4242] animate-paint-splat" 
           style={{
             animationDelay: '0s',
             borderRadius: '40% 60% 70% 30%',
             opacity: 0.8
           }}>
        {/* Splatter drops */}
        <div className="absolute -top-2 -left-1 w-3 h-3 bg-[#cb4242] rounded-full opacity-60"></div>
        <div className="absolute -bottom-1 -right-2 w-2 h-2 bg-[#cb4242] rounded-full opacity-50"></div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-500 animate-paint-splat" 
           style={{
             animationDelay: '1s',
             borderRadius: '60% 40% 30% 70%',
             opacity: 0.7
           }}>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -left-1 w-4 h-4 bg-blue-500 opacity-40" style={{borderRadius: '50% 30% 60% 40%'}}></div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-yellow-500 animate-paint-splat" 
           style={{
             animationDelay: '2s',
             borderRadius: '30% 70% 60% 40%',
             opacity: 0.75
           }}>
        <div className="absolute -top-3 left-2 w-3 h-3 bg-yellow-500 rounded-full opacity-50"></div>
        <div className="absolute -right-2 top-1 w-2 h-5 bg-yellow-500 opacity-60" style={{borderRadius: '40% 60%'}}></div>
      </div>
      
      <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-green-500 animate-paint-splat" 
           style={{
             animationDelay: '3s',
             borderRadius: '70% 30% 40% 60%',
             opacity: 0.8
           }}>
        <div className="absolute -bottom-1 -left-2 w-3 h-2 bg-green-500 opacity-50" style={{borderRadius: '60% 40%'}}></div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/5 w-18 h-18 bg-purple-500 animate-paint-splat" 
           style={{
             animationDelay: '4s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.7
           }}>
        <div className="absolute -top-2 right-1 w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
        <div className="absolute -bottom-3 -right-1 w-4 h-3 bg-purple-500 opacity-50" style={{borderRadius: '50% 30%'}}></div>
      </div>
      
      <div className="absolute top-2/3 left-1/5 w-10 h-10 bg-orange-500 animate-paint-splat" 
           style={{
             animationDelay: '5s',
             borderRadius: '60% 40% 70% 30%',
             opacity: 0.75
           }}>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full opacity-50"></div>
      </div>
      
      {/* Smaller splatter effects */}
      <div className="absolute top-1/6 left-1/2 w-6 h-6 bg-pink-500 animate-paint-splat-small" 
           style={{
             animationDelay: '1.5s',
             borderRadius: '50% 30% 60% 40%',
             opacity: 0.6
           }}></div>
      <div className="absolute bottom-1/6 left-2/3 w-8 h-8 bg-indigo-500 animate-paint-splat-small" 
           style={{
             animationDelay: '2.5s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.65
           }}></div>
      <div className="absolute top-3/4 right-1/2 w-4 h-4 bg-red-400 animate-paint-splat-small" 
           style={{
             animationDelay: '3.5s',
             borderRadius: '70% 30%',
             opacity: 0.7
           }}></div>

      {/* Additional large splats to fill more space */}
      <div className="absolute top-10 left-10 w-14 h-14 bg-teal-500 animate-paint-splat" 
           style={{
             animationDelay: '0.5s',
             borderRadius: '30% 70% 40% 60%',
             opacity: 0.6
           }}>
        <div className="absolute -bottom-2 -right-1 w-3 h-3 bg-teal-500 rounded-full opacity-40"></div>
      </div>

      <div className="absolute top-20 right-10 w-16 h-16 bg-rose-500 animate-paint-splat" 
           style={{
             animationDelay: '1.5s',
             borderRadius: '70% 30% 60% 40%',
             opacity: 0.7
           }}>
        <div className="absolute -top-1 -left-2 w-2 h-4 bg-rose-500 opacity-50" style={{borderRadius: '30% 70%'}}></div>
      </div>

      <div className="absolute bottom-10 left-16 w-18 h-18 bg-cyan-500 animate-paint-splat" 
           style={{
             animationDelay: '2.5s',
             borderRadius: '50% 30% 70% 40%',
             opacity: 0.65
           }}>
        <div className="absolute -top-2 right-2 w-3 h-2 bg-cyan-500 opacity-45"></div>
      </div>

      <div className="absolute bottom-16 right-20 w-15 h-15 bg-lime-500 animate-paint-splat" 
           style={{
             animationDelay: '3.5s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.8
           }}></div>

      <div className="absolute top-1/5 left-2/3 w-13 h-13 bg-violet-500 animate-paint-splat" 
           style={{
             animationDelay: '4.5s',
             borderRadius: '60% 40% 50% 30%',
             opacity: 0.7
           }}></div>

      <div className="absolute bottom-1/5 left-1/2 w-17 h-17 bg-amber-500 animate-paint-splat" 
           style={{
             animationDelay: '5.5s',
             borderRadius: '30% 70% 40% 60%',
             opacity: 0.75
           }}>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-500 rounded-full opacity-50"></div>
      </div>

      <div className="absolute top-3/4 left-3/4 w-12 h-12 bg-emerald-500 animate-paint-splat" 
           style={{
             animationDelay: '6s',
             borderRadius: '70% 30% 60% 40%',
             opacity: 0.6
           }}></div>

      {/* Small splats scattered everywhere */}
      <div className="absolute top-12 left-1/3 w-5 h-5 bg-sky-400 animate-paint-splat-small" 
           style={{
             animationDelay: '6.5s',
             borderRadius: '60% 40%',
             opacity: 0.5
           }}></div>
      <div className="absolute top-1/8 right-1/3 w-4 h-4 bg-fuchsia-400 animate-paint-splat-small" 
           style={{
             animationDelay: '7s',
             borderRadius: '50% 30% 70% 40%',
             opacity: 0.55
           }}></div>
      <div className="absolute bottom-12 right-1/4 w-6 h-6 bg-slate-400 animate-paint-splat-small" 
           style={{
             animationDelay: '7.5s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.6
           }}></div>
      <div className="absolute bottom-1/8 left-1/4 w-3 h-3 bg-neutral-400 animate-paint-splat-small" 
           style={{
             animationDelay: '2s',
             borderRadius: '70% 30%',
             opacity: 0.5
           }}></div>

      {/* Corner splats */}
      <div className="absolute top-8 left-8 w-8 h-8 bg-blue-300 animate-paint-splat-small" 
           style={{
             animationDelay: '8s',
             borderRadius: '30% 70%',
             opacity: 0.6
           }}></div>
      <div className="absolute top-8 right-8 w-7 h-7 bg-green-300 animate-paint-splat-small" 
           style={{
             animationDelay: '8.5s',
             borderRadius: '70% 30% 60% 40%',
             opacity: 0.55
           }}></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 bg-yellow-300 animate-paint-splat-small" 
           style={{
             animationDelay: '9s',
             borderRadius: '40% 60%',
             opacity: 0.65
           }}></div>
      <div className="absolute bottom-8 right-8 w-5 h-5 bg-purple-300 animate-paint-splat-small" 
           style={{
             animationDelay: '9.5s',
             borderRadius: '60% 40% 30% 70%',
             opacity: 0.6
           }}></div>

      {/* Edge splats */}
      <div className="absolute top-0 left-1/4 w-4 h-4 bg-orange-300 animate-paint-splat-small" 
           style={{
             animationDelay: '10s',
             borderRadius: '50%',
             opacity: 0.4
           }}></div>
      <div className="absolute top-0 right-1/4 w-3 h-3 bg-teal-300 animate-paint-splat-small" 
           style={{
             animationDelay: '10.5s',
             borderRadius: '70% 30%',
             opacity: 0.45
           }}></div>
      <div className="absolute bottom-0 left-1/3 w-5 h-5 bg-rose-300 animate-paint-splat-small" 
           style={{
             animationDelay: '11s',
             borderRadius: '30% 70% 40% 60%',
             opacity: 0.5
           }}></div>
      <div className="absolute bottom-0 right-1/3 w-4 h-4 bg-cyan-300 animate-paint-splat-small" 
           style={{
             animationDelay: '11.5s',
             borderRadius: '60% 40%',
             opacity: 0.45
           }}></div>
      <div className="absolute left-0 top-1/4 w-3 h-3 bg-lime-300 animate-paint-splat-small" 
           style={{
             animationDelay: '12s',
             borderRadius: '50%',
             opacity: 0.4
           }}></div>
      <div className="absolute left-0 bottom-1/4 w-4 h-4 bg-violet-300 animate-paint-splat-small" 
           style={{
             animationDelay: '12.5s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.5
           }}></div>
      <div className="absolute right-0 top-1/3 w-5 h-5 bg-amber-300 animate-paint-splat-small" 
           style={{
             animationDelay: '13s',
             borderRadius: '70% 30% 50% 40%',
             opacity: 0.45
           }}></div>
      <div className="absolute right-0 bottom-1/3 w-3 h-3 bg-emerald-300 animate-paint-splat-small" 
           style={{
             animationDelay: '13.5s',
             borderRadius: '50%',
             opacity: 0.4
           }}></div>

      {/* Center area fill splats */}
      <div className="absolute top-1/3 left-1/2 w-9 h-9 bg-pink-400 animate-paint-splat-small" 
           style={{
             animationDelay: '14s',
             borderRadius: '40% 60% 30% 70%',
             opacity: 0.55
           }}></div>
      <div className="absolute bottom-1/3 right-1/2 w-7 h-7 bg-indigo-400 animate-paint-splat-small" 
           style={{
             animationDelay: '14.5s',
             borderRadius: '60% 40% 70% 30%',
             opacity: 0.6
           }}></div>
      <div className="absolute top-2/3 left-1/6 w-8 h-8 bg-yellow-400 animate-paint-splat-small" 
           style={{
             animationDelay: '15s',
             borderRadius: '30% 70% 50% 40%',
             opacity: 0.5
           }}></div>
      <div className="absolute bottom-2/3 right-1/6 w-6 h-6 bg-green-400 animate-paint-splat-small" 
           style={{
             animationDelay: '15.5s',
             borderRadius: '70% 30% 40% 60%',
             opacity: 0.55
           }}></div>

      {/* Random middle area splats */}
      <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-red-300 animate-paint-splat-small" 
           style={{
             animationDelay: '3.7s',
             borderRadius: '50% 30%',
             opacity: 0.45
           }}></div>
      <div className="absolute bottom-1/4 right-1/6 w-5 h-5 bg-blue-400 animate-paint-splat-small" 
           style={{
             animationDelay: '3.8s',
             borderRadius: '30% 70% 40% 60%',
             opacity: 0.5
           }}></div>
      <div className="absolute top-1/2 left-1/8 w-3 h-3 bg-green-300 animate-paint-splat-small" 
           style={{
             animationDelay: '3.9s',
             borderRadius: '60% 40%',
             opacity: 0.4
           }}></div>
      <div className="absolute bottom-1/2 right-1/8 w-6 h-6 bg-purple-400 animate-paint-splat-small" 
           style={{
             animationDelay: '4s',
             borderRadius: '40% 60% 50% 30%',
             opacity: 0.55
           }}></div>
    </div>
  )}
</>
)
}

export default Hero