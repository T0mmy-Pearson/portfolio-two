import React from 'react'

interface AboutProps {
  onClose: () => void
}

export default function About({ onClose }: AboutProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#f0edcf] p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed libertinus-mono-regular">
            With a diverse background spanning sound design, artistic direction, digital strategy, and creative facilitation, I bring a unique multidisciplinary perspective to full-stack development. From conceptualising immersive audio-visual performances to spearheading comprehensive web presence overhauls for energy and hospitality clients, my experience demonstrates adaptability and technical innovation across creative and digital domains.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed libertinus-mono-regular">
            That's why I chose to undertake a bootcamp with Northcoders - to synthesise my creative expertise with robust technical skills and continue pushing boundaries in digital realms. I am an adaptable, intuitive and passionate person whose natural curiosity, innovation, and analytical skill set means that I thrive in dynamic roles that demand learning and growth.
          </p>
        </div>
      </div>
    </div>
  )
}
