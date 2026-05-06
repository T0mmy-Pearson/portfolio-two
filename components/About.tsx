import React from 'react'

interface AboutProps {
  onClose: () => void
}

const About = ({ onClose }: AboutProps) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-full md:w-1/2 bg-white border-l border-black z-[9999] overflow-y-auto">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6 border-b border-black pb-3">
          <h2 className="text-2xl font-bold libertinus-mono-bold">About</h2>
          <button
            onClick={onClose}
            className="text-black hover:opacity-60 text-2xl libertinus-mono-regular"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="space-y-4 libertinus-mono-regular">
          <p>About content goes here...</p>
        </div>
      </div>
    </div>
  )
}

export default About