'use client'

import { useEffect, useState, useRef } from 'react'


const projects = [
 {
      title:"WIP - projectpartnership",
      description: "State site design for an energy cooperative based in Aberdeen. Built in React with pure CSS and Javascript. From development through research, branding and planning, all the way to final code and deployment. Currently working on integrating user feedback and optimizing performance.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/pp.png",
      ghLink: "https://github.com/T0mmy-Pearson/projectpartnership-final",
      url: "https://projectpartnership.netlify.app/",
    },
     {
      title: "CapCheck",
      description: "From the final group project on the Northcoders' bootcamp, CapCheck is a comprehensive mushroom identification app featuring an interactive map with real-time sighting locations, rainfall overlays, and searchable species markers, plus a database of over 250 mushrooms with advanced filtering by edibility and season. The app includes personalized user profiles with photo uploads, discovery tracking, and achievement systems, all built with a mobile-first design supporting both iOS and Android platforms.",
      description2:"CapCheck is built with React Native and Expo for cross-platform mobile development, featuring TypeScript, React Navigation, and React Native Maps with Google Maps integration for interactive mapping functionality. The backend utilizes FastAPI with Python for the API layer, PostgreSQL for data storage, and integrates external services like OpenWeatherMap for weather overlays, all hosted on the Render cloud platform.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/capcheck.png",
      ghLink: "https://github.com/T0mmy-Pearson/capcheck",
      isModal: true,
      videoUrl: "https://0eswuvlc9p7jubst.public.blob.vercel-storage.com/CapCheck-Demo-fUHd6hUvzVbCJAKTX83ClzFKjzk7mK.mp4" 
    },
     {
      title: "Duologue: poetry slot machine",
      description: "All logic in JS and CSS, no backend. A  poetry fruit machine that produces unique alignments and word patterns from my 3000 line poem \Duologue\. Using react and pure CSS to create a simple slot machine experience and random phrase generator, based on one the poem. It involved parsing logic to break the poem into an array of lines, and then randomly selecting lines to create unique combinations. The app features a bold casino interface, allowing users to spin the machine and generate new poetic phrases with each click.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/duologue.png",
      ghLink: "https://github.com/T0mmy-Pearson/poem-duolouge",
      url: "https://duologue-slot-machine.netlify.app/"
    },
    {
      title: "Tic-Tac-Toe",
      description: "A basic two-player Tic-Tac-Toe game built with React and CSS, desktop-only. The game features a simple and intuitive interface, allowing players to take turns marking their spaces on a 3x3 grid. It's built with canvas for rendering and includes basic game logic to determine the winner or a draw.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/ttt.png",
      ghLink: "https://github.com/T0mmy-Pearson/tic-tac-toe",
      url: "https://nought.netlify.app/"
    },
    {
      title: "Planet of the Day",
      description: "A React application that displays a new planet every day from NASA's API, showcasing the beauty of our solar system through a modal info page. The app features a clean and responsive design, allowing users to explore, on different days, various planets with detailed information and images, randomly selected from Nasa's API.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/potd.png",
      ghLink: "https://github.com/T0mmy-Pearson/nasa-api",
      url: "https://planetoftheday.netlify.app/"
    },
    {
      title: "Nc News App",
      description: "A solo project from the Northcoder's bootcampA full-stack news application built with React and Node.js, featuring user authentication, article creation, and commenting. My first experience with a full-stack application using react, constructing APIs to a database hosted on Render, and deploying a React frontend to Netlify.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/nc-news.png",
      ghLink: "https://github.com/T0mmy-Pearson/nc-news-app",
      url: "https://ncnews-t0mmy-pearson.netlify.app/"
    },
    {
      title: "A Quick To-Do list",
      description: "React application that allows users to create, manage, and track their tasks. Quick and easy to use. A tutorial completed during the Northcoders bootcamp, this app features a simple and intuitive interface for task management, allowing users to add, edit, and delete tasks with ease. It includes basic functionality such as task completion tracking and local storage for persistence.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/Tdl.png",
      ghLink: "https://github.com/T0mmy-Pearson/your-to-do-list",
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
  isMobileSliding?: boolean
}

const FloatingProjectCards = ({ isTriggered = false, onTrigger, isMobileSliding = false }: FloatingProjectCardsProps) => {
  const [cards, setCards] = useState<FloatingCard[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isTriggered) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      const initialCards = projects.map((project, index) => {
        if (isMobileSliding) {
          // Mobile sliding: simple grid layout
          return {
            id: index,
            project,
            x: 0,
            y: 0,
            animationDelay: index * 0.2,
            floatDelay: 0
          }
        } else {
          // Desktop floating: positioned cards on left side
          const leftMargin = 50
          const topMargin = 20
          const cardWidth = 200
          const cardHeight = 180
          const spacing = 20
          
          const col = index % 2
          const row = Math.floor(index / 2)
          
          const x = leftMargin + (col * (cardWidth + spacing))
          const y = topMargin + (row * (cardHeight + spacing))
          
          return {
            id: index,
            project,
            x,
            y,
            animationDelay: index * 0.3,
            floatDelay: 0
          }
        }
      })
      setCards(initialCards)
    }, isMobileSliding ? 100 : 500)

    return () => clearTimeout(timer)
  }, [isTriggered, isMobileSliding])

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

  // Mobile sliding layout - full screen panel with grid
  if (isMobileSliding) {
    return (
      <>
        <div className="w-full h-full bg-[#f0edcf] px-8 py-16 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center libertinus-mono-regular text-gray-800">
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {cards.map((card) => {
                const splatShapes = [
                  '40% 60% 70% 30% / 60% 30% 70% 40%',
                  '60% 40% 30% 70% / 40% 70% 60% 30%',
                  '30% 70% 60% 40% / 70% 30% 40% 60%',
                  '70% 30% 40% 60% / 30% 60% 70% 40%',
                  '50% 30% 70% 40% / 60% 40% 30% 70%'
                ]
                
                const splatShape = splatShapes[card.id % splatShapes.length]
                const rotation = Math.random() * 20 - 10
                
                const paintColors = [
                  '#cb4242', '#3b82f6', '#eab308', '#22c55e', 
                  '#a855f7', '#f97316', '#ec4899'
                ]
                const paintColor = paintColors[card.id % paintColors.length]
                
                return (
                  <div
                    key={card.id}
                    className="cursor-pointer opacity-0 animate-fade-in-up w-full max-w-sm mx-auto"
                    style={{
                      animationDelay: `${card.animationDelay}s`,
                      animationFillMode: 'forwards'
                    }}
                    onClick={() => handleCardClick(card)}
                  >
                    <div 
                      className="relative p-4 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      style={{
                        borderRadius: splatShape,
                        transform: `rotate(${rotation}deg)`,
                        opacity: 0.9
                      }}
                    >
                      {/* Paint splat drops */}
                      <div 
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          top: '-8px',
                          left: '20%',
                          borderRadius: '50% 30%',
                          backgroundColor: paintColor,
                          opacity: 0.8
                        }}
                      ></div>
                      <div 
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          bottom: '-6px',
                          right: '15%',
                          backgroundColor: paintColor,
                          opacity: 0.7
                        }}
                      ></div>
                      <div 
                        className="absolute w-4 h-2"
                        style={{
                          top: '30%',
                          right: '-10px',
                          borderRadius: '60% 40%',
                          backgroundColor: paintColor,
                          opacity: 0.6
                        }}
                      ></div>
                      <div 
                        className="absolute w-2 h-3"
                        style={{
                          bottom: '20%',
                          left: '-8px',
                          borderRadius: '40% 60%',
                          backgroundColor: paintColor,
                          opacity: 0.5
                        }}
                      ></div>
                      <div className="w-full h-32 mb-3 overflow-hidden shadow-inner relative z-10" style={{borderRadius: '30% 70% 60% 40%'}}>
                        <img 
                          src={card.project.imageUrl} 
                          alt={card.project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          style={{borderRadius: '30% 70% 60% 40%'}}
                        />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 drop-shadow-sm relative z-10 libertinus-mono-bold">{card.project.title}</h3>
                      <p className="text-sm text-gray-700 line-clamp-3 drop-shadow-sm relative z-10 libertinus-mono-regular">{card.project.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modal for mobile */}
        {isModalOpen && selectedProject && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div 
              className="bg-white rounded-lg w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[90vh] sm:h-auto overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="black" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Project image */}
                <div className="w-full h-48 sm:h-64 overflow-hidden rounded-t-lg">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project content */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 libertinus-mono-bold">{selectedProject.title}</h2>
                    {selectedProject.ghLink && (
                      <button
                        onClick={() => window.open(selectedProject.ghLink, '_blank')}
                        className="flex-shrink-0 bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300"
                      >
                        <img 
                          src="https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/icons8-github-64.png" 
                          alt="GitHub" 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                        <span className="text-sm sm:text-base">GitHub</span>
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 leading-relaxed libertinus-mono-regular text-sm sm:text-base">{selectedProject.description}</p>
                    </div>

                    {selectedProject.description2 && (
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Technical Details</h3>
                        <p className="text-gray-600 leading-relaxed libertinus-mono-regular text-sm sm:text-base">{selectedProject.description2}</p>
                      </div>
                    )}

                    {selectedProject.videoUrl && (
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Demo Video</h3>
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
                  <div className="flex gap-3 sm:gap-4 mt-6">
                    {selectedProject.url && (
                      <button
                        onClick={handleVisitProject}
                        className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 libertinus-mono-regular text-sm sm:text-base"
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

  // Desktop floating layout - absolutely positioned floating cards
  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {cards.map((card) => {
          const splatShapes = [
            '40% 60% 70% 30% / 60% 30% 70% 40%',
            '60% 40% 30% 70% / 40% 70% 60% 30%',
            '30% 70% 60% 40% / 70% 30% 40% 60%',
            '70% 30% 40% 60% / 30% 60% 70% 40%',
            '50% 30% 70% 40% / 60% 40% 30% 70%'
          ]
          const splatShape = splatShapes[card.id % splatShapes.length]
          const rotation = Math.random() * 20 - 10
          
          const paintColors = [
            '#cb4242', '#3b82f6', '#eab308', '#22c55e', 
            '#a855f7', '#f97316', '#ec4899'
          ]
          const paintColor = paintColors[card.id % paintColors.length]
          
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
                className="relative p-3 hover:shadow-2xl transition-all duration-300 hover:scale-105 w-48"
                style={{
                  borderRadius: splatShape,
                  transform: `rotate(${rotation}deg)`,
                  opacity: 0.9
                }}
              >
                {/* Paint splat drops */}
                <div 
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    top: '-8px',
                    left: '20%',
                    borderRadius: '50% 30%',
                    backgroundColor: paintColor,
                    opacity: 0.8
                  }}
                ></div>
                <div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    bottom: '-6px',
                    right: '15%',
                    backgroundColor: paintColor,
                    opacity: 0.7
                  }}
                ></div>
                <div 
                  className="absolute w-4 h-2"
                  style={{
                    top: '30%',
                    right: '-10px',
                    borderRadius: '60% 40%',
                    backgroundColor: paintColor,
                    opacity: 0.6
                  }}
                ></div>
                <div 
                  className="absolute w-2 h-3"
                  style={{
                    bottom: '20%',
                    left: '-8px',
                    borderRadius: '40% 60%',
                    backgroundColor: paintColor,
                    opacity: 0.5
                  }}
                ></div>
                <div className="w-full h-24 mb-2 overflow-hidden shadow-inner relative z-10" style={{borderRadius: '30% 70% 60% 40%'}}>
                  <img 
                    src={card.project.imageUrl} 
                    alt={card.project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    style={{borderRadius: '30% 70% 60% 40%'}}
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 drop-shadow-sm relative z-10 libertinus-mono-bold">{card.project.title}</h3>
                <p className="text-xs text-gray-700 line-clamp-2 drop-shadow-sm relative z-10 libertinus-mono-regular">{card.project.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div 
            className="bg-white rounded-lg w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[90vh] sm:h-auto overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Project image */}
              <div className="w-full h-48 sm:h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project content */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 libertinus-mono-bold">{selectedProject.title}</h2>
                  {selectedProject.ghLink && (
                    <button
                      onClick={() => window.open(selectedProject.ghLink, '_blank')}
                      className="flex-shrink-0 bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300"
                    >
                      <img 
                        src="https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/icons8-github-64.png" 
                        alt="GitHub" 
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                      <span className="text-sm sm:text-base">GitHub</span>
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 leading-relaxed libertinus-mono-regular text-sm sm:text-base">{selectedProject.description}</p>
                  </div>

                  {selectedProject.description2 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Technical Details</h3>
                      <p className="text-gray-600 leading-relaxed libertinus-mono-regular text-sm sm:text-base">{selectedProject.description2}</p>
                    </div>
                  )}

                  {selectedProject.videoUrl && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 libertinus-mono-regular">Demo Video</h3>
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
                <div className="flex gap-3 sm:gap-4 mt-6">
                  {selectedProject.url && (
                    <button
                      onClick={handleVisitProject}
                      className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 libertinus-mono-regular text-sm sm:text-base"
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
