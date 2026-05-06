'use client'

import { useEffect, useState, useRef } from 'react'

const projects = [
  {
      title: "Floating Futures",
      description: "An interactive offshore wind learning platform built over six months for Flotation Energy, aimed at UK secondary-school learners (14–19), classroom facilitators, and career changers exploring the sector. The platform pairs a real-time 3D game — a free-flying Wind Farm Explorer with structured lessons on wind & pressure, turbine anatomy, environmental impact assessments, the turbine-to-grid journey, and a careers tour — with a Skills Portal covering 200+ offshore wind roles, career pathways, critical occupations, and an interactive D3-driven training map of UK & Ireland providers. Lessons share a unified DiscoveryPanel chrome and reset cleanly between modes via a radial Mission Hub.",
      description2: "Built with Next.js 14, React 18, and TypeScript. The 3D scene uses React Three Fiber, drei, and Three.js, with @react-three/rapier installed for upcoming physics work; users can swap turbine substructures (Semi-Sub, Spar, Tri-Floater) at runtime and the fleet dissolves and re-mounts. The training map is built on D3 v7 (geo, zoom, scale) with marker clustering and a live wind-vector overlay backed by WeatherLayers. UI uses Framer Motion and Tailwind CSS. I also handled the 3D design and modelling work in Blender for the turbines, substations, vessels, and wildlife survey assets. All free-text content is normalised to British English at render.",
      imageUrl: "https://raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/windfarm.png",
      ghLink: "",
      url: "",
    },
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
      {isModalOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 w-full md:w-1/2 bg-white border-l border-black z-[9999] flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black bg-white">
            <div className="flex items-baseline gap-4">
              <h2 className="text-2xl font-bold libertinus-mono-bold">Projects</h2>
              <div className="text-sm text-gray-600 libertinus-mono-regular">
                {currentIndex + 1} / {projects.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                disabled={currentIndex === 0}
                aria-label="Previous project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextProject}
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                disabled={currentIndex === projects.length - 1}
                aria-label="Next project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={closeModal}
                className="ml-2 p-2 border border-black hover:bg-black hover:text-white transition-colors duration-150"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slides container */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="flex-shrink-0 w-full overflow-y-auto flex flex-col">
                  {/* Image */}
                  <div className="w-full h-64 border-b border-black overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={`w-full h-full ${
                        project.title.includes('projectpartnership')
                          ? 'object-contain'
                          : 'object-cover'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-black">
                      <h3 className="text-2xl font-bold libertinus-mono-bold leading-tight">
                        {project.title}
                      </h3>
                      {project.ghLink && (
                        <button
                          onClick={() => window.open(project.ghLink, '_blank')}
                          className="flex-shrink-0 bg-white hover:bg-black hover:text-white text-black border border-black py-2 px-4 transition-colors duration-150 flex items-center justify-center gap-2 libertinus-mono-regular text-sm"
                        >
                          <span>View Code</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <p className="text-sm leading-7 libertinus-mono-regular text-black">
                      {project.description}
                    </p>

                    {project.description2 && (
                      <div className="space-y-2 pt-2 border-t border-black">
                        <h4 className="text-xs uppercase tracking-wider libertinus-mono-bold text-black">
                          Technical Details
                        </h4>
                        <p className="text-sm leading-7 libertinus-mono-regular text-black">
                          {project.description2}
                        </p>
                      </div>
                    )}

                    {project.videoUrl && (
                      <div className="space-y-2 pt-2 border-t border-black">
                        <h4 className="text-xs uppercase tracking-wider libertinus-mono-bold text-black">
                          Demo Video
                        </h4>
                        <video
                          controls
                          className="w-full border border-black"
                          poster={project.imageUrl}
                        >
                          <source src={project.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {project.url && (
                      <div className="pt-3">
                        <button
                          onClick={() => window.open(project.url, '_blank')}
                          className="w-full bg-black hover:bg-white hover:text-black text-white border border-black py-3 px-6 transition-colors duration-150 libertinus-mono-bold"
                        >
                          Visit Live Project →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 p-4 border-t border-black bg-white">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`w-2.5 h-2.5 border border-black transition-colors duration-150 ${
                  index === currentIndex ? 'bg-black' : 'bg-white hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCarousel