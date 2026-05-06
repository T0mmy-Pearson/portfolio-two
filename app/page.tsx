'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import About from '../components/About'
import TechStack from '../components/TechStack'

export type ActivePanel =
  | 'about'
  | 'contact'
  | 'techStack'
  | 'projects'
  | 'writer'
  | 'paint'
  | null

export default function Home() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const closePanel = () => setActivePanel(null)

  return (
    <div className="relative bg-white">
      <Hero activePanel={activePanel} onActivate={setActivePanel} />

      {activePanel === 'contact' && <Contact onClose={closePanel} />}
      {activePanel === 'about' && <About onClose={closePanel} />}
      {activePanel === 'techStack' && <TechStack onClose={closePanel} />}
    </div>
  )
}
