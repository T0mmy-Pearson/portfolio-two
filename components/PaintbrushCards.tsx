'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const projects = [
  {
    title:"WIP - projectpartnership",
    description: "State site design for an energy cooperative based in Aberdeen. Built in React with pure CSS and Javascript.",
    imageUrl: "/pp.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://projectpartnership.netlify.app/",
  },
  {
    title: "CapCheck",
    description: "From the final group project on the Northcoders' bootcamp, CapCheck is a comprehensive mushroom identification app featuring an interactive map with real-time sighting locations, rainfall overlays, and searchable species markers, plus a database of over 250 mushrooms with advanced filtering by edibility and season. The app includes personalized user profiles with photo uploads, discovery tracking, and achievement systems, all built with a mobile-first design supporting both iOS and Android platforms.",
    description2:"CapCheck is built with React Native and Expo for cross-platform mobile development, featuring TypeScript, React Navigation, and React Native Maps with Google Maps integration for interactive mapping functionality. The backend utilizes FastAPI with Python for the API layer, PostgreSQL for data storage, and integrates external services like OpenWeatherMap for weather overlays, all hosted on the Render cloud platform.",
    imageUrl: "/capcheck.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    isModal: true,
    videoUrl: "https://0eswuvlc9p7jubst.public.blob.vercel-storage.com/CapCheck-Demo-fUHd6hUvzVbCJAKTX83ClzFKjzk7mK.mp4" 
  },
  {
    title: "Duologue: poetry slot machine",
    description: "A  poetry fruit machine that produces unique alignments and word patterns from the long poem \Duologue\. Using react and pure CSS to create a simple slot machine experience and random phrase generator, based on one of my poems. All logic in JS and CSS, no backend.",
    imageUrl: "/duologue.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://duologue-slot-machine.netlify.app/"
  },
  {
    title: "Tic-Tac-Toe",
    description: "A basic two-player Tic-Tac-Toe game built with React and CSS, desktop-only. The game features a simple and intuitive interface, allowing players to take turns marking their spaces on a 3x3 grid. It's built with canvas for rendering and includes basic game logic to determine the winner or a draw.",
    imageUrl: "/ttt.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://nought.netlify.app/"
  },
  {
    title: "Planet of the Day",
    description: "A React application that displays a new planet every day from NASA's API, showcasing the beauty of our solar system through a modal info page. The app features a clean and responsive design, allowing users to explore, on different days, various planets with detailed information and images, randomly selected from Nasa's API.",
    imageUrl: "/potd.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://planetoftheday.netlify.app/"
  },
  {
    title: "Nc News App",
    description: "A solo project from the Northcoder's bootcampA full-stack news application built with React and Node.js, featuring user authentication, article creation, and commenting. My first experience with a full-stack application using react, constructing APIs to a database hosted on Render, and deploying a React frontend to Netlify.",
    imageUrl: "/nc-news.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://ncnews-t0mmy-pearson.netlify.app/"
  },
  {
    title: "A Quick To-Do list",
    description: "React application that allows users to create, manage, and track their tasks. Quick and easy to use. A tutorial completed during the Northcoders bootcamp, this app features a simple and intuitive interface for task management, allowing users to add, edit, and delete tasks with ease. It includes basic functionality such as task completion tracking and local storage for persistence.",
    imageUrl: "/Tdl.png",
    ghLink: "https://github.com/yourusername/projectpartnership",
    url: "https://yourquicktodolist.netlify.app/"
  }
]

interface PaintTrail {
  id: number
  x: number
  y: number
  color: string
  size: number
  opacity: number
  timestamp: number
}

interface FloatingCard {
  id: number
  project: typeof projects[0]
  x: number
  y: number
  animationDelay: number
}

interface PaintbrushCardsProps {
  isTriggered?: boolean
  onTrigger?: () => void
}

const PaintbrushCards = ({ isTriggered = false, onTrigger }: PaintbrushCardsProps) => {
  const [cards, setCards] = useState<FloatingCard[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [paintTrails, setPaintTrails] = useState<PaintTrail[]>([])
  const [currentColor, setCurrentColor] = useState('#ff6b35')
  const containerRef = useRef<HTMLDivElement>(null)
  const trailIdRef = useRef(0)

  const paintColors = ['#ff6b35', '#f7931e', '#ffd23f', '#06ffa5', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444']

  // Handle mouse movement for paint trails
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isVisible || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create new paint trail dot
    const newTrail: PaintTrail = {
      id: trailIdRef.current++,
      x,
      y,
      color: currentColor,
      size: Math.random() * 8 + 4, // Random size between 4-12px
      opacity: 1,
      timestamp: Date.now()
    }

    setPaintTrails(prev => [...prev, newTrail])

    // Change color occasionally
    if (Math.random() < 0.05) {
      setCurrentColor(paintColors[Math.floor(Math.random() * paintColors.length)])
    }
  }, [isVisible, currentColor])

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setPaintTrails(prev => {
        const now = Date.now()
        return prev
          .map(trail => ({
            ...trail,
            opacity: Math.max(0, 1 - (now - trail.timestamp) / 3000) // Fade out over 3 seconds
          }))
          .filter(trail => trail.opacity > 0.01)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Add mouse move listener
  useEffect(() => {
    if (isVisible && containerRef.current) {
      const container = containerRef.current
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isVisible, handleMouseMove])

  useEffect(() => {
    if (!isTriggered) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      const initialCards = projects.map((project, index) => {
        const sectionWidth = 600
        const sectionHeight = 800
        
        let x, y
        let attempts = 0
        
        do {
          x = Math.random() * (sectionWidth - 300) + 50
          y = Math.random() * (sectionHeight - 200) + 50
          attempts++
        } while (attempts < 20)
        
        return {
          id: index,
          project,
          x,
          y,
          animationDelay: index * 0.3,
        }
      })
      
      setCards(initialCards)
      onTrigger?.()
    }, 500)

    return () => clearTimeout(timer)
  }, [isTriggered, onTrigger])

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  const handleVisitProject = () => {
    if (selectedProject?.url) {
      window.open(selectedProject.url, '_blank')
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ cursor: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M3 21L12 12L21 3L18 0L9 9L0 18L3 21Z\' fill=\'%23333\'/%3E%3C/svg%3E") 12 12, auto' }}
      >
        {/* Paint trails */}
        {paintTrails.map(trail => (
          <div
            key={trail.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: trail.x - trail.size / 2,
              top: trail.y - trail.size / 2,
              width: trail.size,
              height: trail.size,
              backgroundColor: trail.color,
              opacity: trail.opacity,
              transition: 'opacity 0.1s ease-out'
            }}
          />
        ))}

        {/* Floating project cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="absolute cursor-pointer pointer-events-auto animate-bounce-slow"
            style={{
              left: card.x,
              top: card.y,
              animationDelay: `${card.animationDelay}s`,
            }}
            onClick={() => openModal(card.project)}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200">
              <div className="w-full h-24 mb-2 overflow-hidden rounded-lg">
                <img 
                  src={card.project.imageUrl} 
                  alt={card.project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 libertinus-mono-bold">{card.project.title}</h3>
              <p className="text-xs text-gray-700 line-clamp-2 libertinus-mono-regular">{card.project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-500 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Project image */}
              <div className="w-full h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 libertinus-mono-bold">{selectedProject.title}</h2>
                  {selectedProject.ghLink && (
                    <button
                      onClick={() => window.open(selectedProject.ghLink, '_blank')}
                      className="flex-2 bg-transparent hover:bg-transparent text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <img 
                        src="/icons8-github-64.png" 
                        alt="GitHub" 
                        className="w-8 h-8"
                      />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 leading-relaxed libertinus-mono-regular">{selectedProject.description}</p>
                  </div>

                  {selectedProject.description2 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Technical Details</h3>
                      <p className="text-gray-600 leading-relaxed libertinus-mono-regular">{selectedProject.description2}</p>
                    </div>
                  )}

                  {selectedProject.videoUrl && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Demo Video</h3>
                      <video 
                        controls 
                        className="w-full rounded-lg shadow-lg"
                        poster={selectedProject.imageUrl}
                      >
                        <source src={selectedProject.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-6">
                  {selectedProject.url && (
                    <button
                      onClick={handleVisitProject}
                      className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 libertinus-mono-regular"
                    >
                      Visit Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaintbrushCards
