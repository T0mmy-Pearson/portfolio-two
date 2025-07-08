'use client'

import { useEffect, useState, useRef } from 'react'

interface CardPhysics {
  id: number
  project: typeof projects[0]
  x: number
  y: number
  vx: number // velocity x
  vy: number // velocity y
  animationDelay: number
}

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

interface FloatingCard {
  id: number
  project: typeof projects[0]
  x: number
  y: number
  animationDelay: number
  floatDelay: number
}

interface FloatingProjectCardsProps {
  isTriggered?: boolean
  onTrigger?: () => void
}

const FloatingProjectCards = ({ isTriggered = false, onTrigger }: FloatingProjectCardsProps) => {
  const [cards, setCards] = useState<FloatingCard[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isTriggered) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      const initialCards = projects.map((project, index) => {
        // Use section dimensions instead of full screen
        const sectionWidth = 1200 // Approximate section width
        const sectionHeight = 800 // Approximate section height
        
        let x, y
        let attempts = 0
        
        do {
          x = Math.random() * (sectionWidth - 300) + 50 // Add margins
          y = Math.random() * (sectionHeight - 200) + 50
          attempts++
        } while (attempts < 20) // Simplified positioning for section
        
        return {
          id: index,
          project,
          x,
          y,
          animationDelay: index * 1.5, 
          floatDelay: (index * 3) + 2 
        }
      })
      setCards(initialCards)
    }, 1000) // Reduced delay since it's user-triggered

    return () => clearTimeout(timer)
  }, [isTriggered])

  const handleCardClick = (card: FloatingCard) => {
    setSelectedProject(card.project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleVisitProject = () => {
    if (selectedProject?.url) {
      window.open(selectedProject.url, '_blank')
    }
    closeModal()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {cards.map((card) => {
          // Assign Pong ball animation patterns
          const pongAnimations = [
            'animate-pong-ball-1', 
            'animate-pong-ball-2', 
            'animate-pong-ball-3',
            'animate-pong-ball-4',
            'animate-pong-ball-5'
          ]
          const pongAnimation = pongAnimations[card.id % pongAnimations.length]
          
          return (
            <div
              key={card.id}
              className="absolute pointer-events-auto cursor-pointer opacity-0 animate-fade-in-up"
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                animationDelay: `${card.animationDelay}s`,
                animationFillMode: 'forwards'
              }}
              onClick={() => handleCardClick(card)}
            >
              <div 
                className={`bg-[#f0edcf]/90  rounded-lg p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-bounce-float ${pongAnimation} w-48 border border-white/40`}
                style={{
                  animationDelay: `${card.floatDelay}s`,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                <div className="w-full h-24 mb-2 overflow-hidden rounded shadow-inner">
                  <img 
                    src={card.project.imageUrl} 
                    alt={card.project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 drop-shadow-sm">{card.project.title}</h3>
                <p className="text-xs text-gray-700 line-clamp-2 drop-shadow-sm">{card.project.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-500 p-4"
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
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
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
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {selectedProject.description2 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Details</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.description2}</p>
                    </div>
                  )}

                  {selectedProject.videoUrl && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Demo Video</h3>
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
                      className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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

export default FloatingProjectCards
