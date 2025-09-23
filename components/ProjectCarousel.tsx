'use client'

import { useEffect, useState, useRef } from 'react'

const projects = [
  {
      title:"WIP - Artist's Website",
      description: "Built with Next.js, featuring a 3D interactive globe, in Three.js, modular navigation, poetry and visual art galleries, and journalism and sound links that open in scrollable modal popups. Responsive, modern, and designed for immersive multimedia storytelling and portfolio presentation.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/tpers0n.png",
      ghLink: "https://github.com/T0mmy-Pearson/artist-website",
      url: "https://tpers0n.com",
    },
 {
      title:"WIP - projectpartnership",
      description: "Bold, statement driven static site design for an energy cooperative based in Aberdeen. Built in React with CSS and Javascript. From development through research, branding and planning, all the way to final code and deployment. Currently working on integrating user feedback and optimising performance.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/pp.png",
      ghLink: "https://github.com/T0mmy-Pearson/projectpartnership-final",
      url: "https://projectpartnership.netlify.app/",
    },
{
      title: "Your Job Journal",
      description: "JJ: Job Application Journal is a modern web application designed to help users efficiently track, organize, and reflect on their job search journey. The app allows users to add, update, and manage job applications, visually separate active and rejected applications, and maintain a calendar with notes for important dates. A unique affirmations banner provides motivational support, while a feedback form enables users to share suggestions directly with the developer. The project is built with React for a responsive, component-driven UI and leverages Firebase for authentication and real-time data storage, ensuring user data is secure and accessible across devices. Vite is used as the build tool for fast development and hot module reloading. The app uses EmailJS to handle feedback submissions without a backend server. Styling is managed with custom CSS, supporting multiple color themes for personalization. SVG assets provide a clean, branded look, and the codebase is modular for easy maintenance and future expansion.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/logo-jj.svg",
      ghLink: "https://github.com/T0mmy-Pearson/reactjs-job-application-journal",
      url: "https://jobjournal.netlify.app/"
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
      description: "All logic in JS and CSS, no backend. A  poetry fruit machine that produces unique alignments and word patterns from my 3000 line poem \Duologue\. Using react and pure CSS to create a simple slot machine experience and random phrase generator, based on lines from the poem. I wrote parsing logic to break the poem into an array of lines, and then randomly select lines to create unique combinations. The app features a bold casino interface, allowing users to spin the machine and generate new poetic phrases with each click. A fun exercise in creative coding and random text generation.",
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
    }
]

interface ProjectCarouselProps {
  isTriggered?: boolean
  onTrigger?: () => void
  isMobileSliding?: boolean
}

const ProjectCarousel = ({ isTriggered = false, onTrigger, isMobileSliding = false }: ProjectCarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Trigger modal when component is triggered
  useEffect(() => {
    if (isTriggered) {
      setIsModalOpen(true)
    }
  }, [isTriggered])

  const openModal = () => {
    setIsModalOpen(true)
    setCurrentIndex(0)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentIndex(0)
    if (onTrigger) onTrigger()
  }

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextProject()
    }
    if (isRightSwipe) {
      prevProject()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        prevProject()
      } else if (e.key === 'ArrowRight') {
        nextProject()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const currentProject = projects[currentIndex]

  if (!isTriggered && !isModalOpen) return null

  return (
    <>
      {/* Modal Backdrop */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-[#f0edcf]/90 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div 
            className="bg-[#f0edcf] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[#cb4242]/50"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
          >
            {/* Header with close button and navigation */}
            <div className="flex items-center justify-between p-6 border-b border-[#cb4242]/30 bg-gradient-to-r from-[#f0edcf] to-[#ede8c3]">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#2d3748] libertinus-mono-bold">
                  Projects
                </h2>
                <div className="text-sm text-[#4a5568] libertinus-mono-regular bg-[#cb4242]/10 px-3 py-1 rounded-full">
                  {currentIndex + 1} of {projects.length}
                </div>
              </div>
              
              {/* Navigation controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevProject}
                  className="p-3 hover:bg-[#cb4242]/20 rounded-xl transition-all duration-200 text-[#2d3748] hover:text-[#cb4242] border border-[#cb4242]/20 hover:border-[#cb4242]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextProject}
                  className="p-3 hover:bg-[#cb4242]/20 rounded-xl transition-all duration-200 text-[#2d3748] hover:text-[#cb4242] border border-[#cb4242]/20 hover:border-[#cb4242]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentIndex === projects.length - 1}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 text-[#2d3748] hover:text-red-600 border border-red-500/20 hover:border-red-500/40 ml-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Project carousel content */}
            <div className="flex overflow-hidden h-[calc(90vh-10rem)] bg-gradient-to-br from-[#f0edcf] to-[#ede8c3]">
              {/* Project slides */}
              <div 
                className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="flex-shrink-0 w-full flex flex-col lg:flex-row">
                    {/* Project image */}
                    <div className="lg:w-1/2 h-64 lg:h-full relative overflow-hidden bg-white/40">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#cb4242]/20 to-transparent z-10"></div>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className={`w-full h-full transition-transform duration-700 hover:scale-105 ${
                          project.title.includes('projectpartnership') 
                            ? 'object-contain' 
                            : 'object-cover'
                        }`}
                      />
                    </div>
                    
                    {/* Project content */}
                    <div className="lg:w-1/2 p-8 overflow-y-auto bg-gradient-to-br from-[#f0edcf] to-[#ede8c3]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#2d3748] libertinus-mono-bold leading-tight">
                          {project.title}
                        </h3>
                        {project.ghLink && (
                          <button
                            onClick={() => window.open(project.ghLink, '_blank')}
                            className="flex-shrink-0 bg-[#cb4242]/10 hover:bg-[#cb4242]/20 text-[#cb4242] hover:text-[#a53333] font-semibold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 border border-[#cb4242]/30 hover:border-[#cb4242]/50 hover:shadow-lg hover:shadow-[#cb4242]/10"
                          >
                            <img 
                              src="https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/icons8-github-64.png" 
                              alt="GitHub" 
                              className="w-5 h-5 opacity-80"
                            />
                            <span className="text-sm font-medium">View Code</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-white/60 p-5 rounded-xl border border-[#cb4242]/20 shadow-sm">
                          <p className="text-[#2d3748] leading-relaxed libertinus-mono-regular text-sm leading-7">
                            {project.description}
                          </p>
                        </div>

                        {project.description2 && (
                          <div className="bg-white/60 p-5 rounded-xl border border-[#cb4242]/20 shadow-sm">
                            <h4 className="text-lg font-semibold text-[#cb4242] mb-3 libertinus-mono-bold flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              Technical Details
                            </h4>
                            <p className="text-[#2d3748] leading-relaxed libertinus-mono-regular text-sm leading-7">
                              {project.description2}
                            </p>
                          </div>
                        )}

                        {project.videoUrl && (
                          <div className="bg-white/60 p-5 rounded-xl border border-[#cb4242]/20 shadow-sm">
                            <h4 className="text-lg font-semibold text-[#cb4242] mb-3 libertinus-mono-bold flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
                              </svg>
                              Demo Video
                            </h4>
                            <video 
                              controls 
                              className="w-full rounded-lg shadow-lg border border-[#cb4242]/20"
                              poster={project.imageUrl}
                            >
                              <source src={project.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 mt-8">
                        {project.url && (
                          <button
                            onClick={() => window.open(project.url, '_blank')}
                            className="flex-1 bg-gradient-to-r from-[#cb4242] to-[#a53333] hover:from-[#a53333] hover:to-[#7d2525] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 libertinus-mono-bold shadow-lg hover:shadow-xl hover:shadow-[#cb4242]/20 transform hover:-translate-y-0.5"
                          >
                            Visit Live Project →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-3 p-6 border-t border-[#cb4242]/30 bg-gradient-to-r from-[#f0edcf] to-[#ede8c3]">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    index === currentIndex 
                      ? 'bg-[#cb4242] shadow-lg shadow-[#cb4242]/50' 
                      : 'bg-[#d1d5db] hover:bg-[#9ca3af] border border-[#cb4242]/20'
                  }`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-[#cb4242] rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCarousel