'use client'

import { useEffect, useState, useCallback } from 'react'

interface PaintTrail {
  id: number
  x: number
  y: number
  color: string
  size: number
  opacity: number
  timestamp: number
  isPermanent?: boolean
}

interface PaintTrailEffectProps {
  isActive: boolean
  onDeactivate?: () => void
}

const PaintTrailEffect = ({ isActive, onDeactivate }: PaintTrailEffectProps) => {
  const [paintTrails, setPaintTrails] = useState<PaintTrail[]>([])
  const [currentColor, setCurrentColor] = useState('#ff6b35')
  const [isMouseDown, setIsMouseDown] = useState(false)
  const trailIdRef = useState(() => ({ current: 0 }))[0]

  const paintColors = ['#ff6b35', '#f7931e', '#ffd23f', '#06ffa5', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444']

  // Handle mouse movement for paint trails
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isActive) return

    const x = e.clientX
    const y = e.clientY

    // Create new paint trail dot
    const newTrail: PaintTrail = {
      id: trailIdRef.current++,
      x,
      y,
      color: currentColor,
      size: Math.random() * 8 + 4, // Random size between 4-12px
      opacity: 1,
      timestamp: Date.now(),
      isPermanent: isMouseDown // Make trail permanent if mouse is down
    }

    setPaintTrails(prev => [...prev.slice(-200), newTrail]) // Keep more trails when some are permanent

    // Change color occasionally
    if (Math.random() < 0.05) {
      setCurrentColor(paintColors[Math.floor(Math.random() * paintColors.length)])
    }
  }, [isActive, currentColor, paintColors, trailIdRef, isMouseDown])

  // Handle touch movement for paint trails (mobile)
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isActive) return
    
    // Don't prevent default if touching a button or interactive element
    const target = e.target as Element
    if (target && (target.tagName === 'BUTTON' || target.closest('button'))) {
      return
    }
    
    e.preventDefault() // Prevent scrolling while painting

    const touch = e.touches[0]
    if (!touch) return

    const x = touch.clientX
    const y = touch.clientY

    // Create new paint trail dot
    const newTrail: PaintTrail = {
      id: trailIdRef.current++,
      x,
      y,
      color: currentColor,
      size: Math.random() * 12 + 6, // Slightly larger for touch (6-18px)
      opacity: 1,
      timestamp: Date.now(),
      isPermanent: isMouseDown // Make trail permanent if touch is held
    }

    setPaintTrails(prev => [...prev.slice(-200), newTrail])

    // Change color occasionally
    if (Math.random() < 0.05) {
      setCurrentColor(paintColors[Math.floor(Math.random() * paintColors.length)])
    }
  }, [isActive, currentColor, paintColors, trailIdRef, isMouseDown])

  // Handle mouse down/up events
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!isActive) return
    setIsMouseDown(true)
  }, [isActive])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!isActive) return
    setIsMouseDown(false)
  }, [isActive])

  // Handle touch start/end events (mobile)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isActive) return
    
    // Don't prevent default if touching a button or interactive element
    const target = e.target as Element
    if (target && (target.tagName === 'BUTTON' || target.closest('button'))) {
      return
    }
    
    e.preventDefault()
    setIsMouseDown(true)
  }, [isActive])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isActive) return
    
    // Don't prevent default if touching a button or interactive element
    const target = e.target as Element
    if (target && (target.tagName === 'BUTTON' || target.closest('button'))) {
      return
    }
    
    e.preventDefault()
    setIsMouseDown(false)
  }, [isActive])

  // Handle escape key to exit paint mode
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isActive) {
      onDeactivate?.()
    }
  }, [isActive, onDeactivate])

  // Clean up old trails
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setPaintTrails(prev => {
        const now = Date.now()
        return prev
          .map(trail => ({
            ...trail,
            // Only fade temporary trails, keep permanent ones at full opacity
            opacity: trail.isPermanent 
              ? 1 
              : Math.max(0, 1 - (now - trail.timestamp) / 10000) // Fade out over 10 seconds
          }))
          .filter(trail => trail.isPermanent || trail.opacity > 0.11) // Keep permanent trails regardless of opacity
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  // Add mouse move listener and cursor style
  useEffect(() => {
    if (isActive) {
      // Mouse events (desktop)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
      
      // Touch events (mobile)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchstart', handleTouchStart, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
      
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M3 21L12 12L21 3L18 0L9 9L0 18L3 21Z\' fill=\'%23333\'/%3E%3C/svg%3E") 12 12, auto'
      
      // Disable text selection during paint mode
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      // Use type assertion for vendor-specific properties
      ;(document.body.style as any).mozUserSelect = 'none'
      ;(document.body.style as any).msUserSelect = 'none'
      
      return () => {
        // Remove mouse events
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mouseup', handleMouseUp)
        
        // Remove touch events
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchend', handleTouchEnd)
        
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.cursor = 'auto'
        
        // Re-enable text selection
        document.body.style.userSelect = 'auto'
        document.body.style.webkitUserSelect = 'auto'
        ;(document.body.style as any).mozUserSelect = 'auto'
        ;(document.body.style as any).msUserSelect = 'auto'
        
        setIsMouseDown(false) // Reset mouse down state when cleaning up
      }
    }
  }, [isActive, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchMove, handleTouchStart, handleTouchEnd, handleKeyDown])

  // Clear trails when deactivated
  useEffect(() => {
    if (!isActive) {
      setPaintTrails([])
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <>
      {/* Paint trails */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {paintTrails.map(trail => (
          <div
            key={trail.id}
            className="absolute rounded-full"
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
      </div>
      
      {/* Exit instruction */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-black px-6 py-4 rounded-lg flex flex-col gap-3">
        <div className="text-center libertinus-mono-regular">
          {/* Desktop instructions */}
          <div className="hidden md:block">
            <p className="text-sm">ESC = Stop Painting!</p>
            <p className="text-xs opacity-75">Paint with the Mouse!</p>
          </div>
          {/* Mobile instructions */}
          <div className="block md:hidden">
            <p className="text-xs opacity-75">Paint with your finger!</p>
            <p className="text-xs opacity-75">Tap close button to exit</p>
          </div>
        </div>
        {/* Desktop close button (smaller, less prominent) */}
        <button
          onClick={() => onDeactivate?.()}
          className="hidden md:block hover:scale-105 text-black rounded-full p-1 transition-all duration-200 self-center opacity-60 hover:opacity-100"
          aria-label="Stop painting mode"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile close button - positioned in top right */}
      <button
        onClick={() => onDeactivate?.()}
        className="fixed top-4 right-4 z-50 hover:scale-105 bg-black/70 hover:bg-black text-white rounded-full p-3 transition-all duration-200 md:hidden"
        aria-label="Stop painting mode"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  )
}

export default PaintTrailEffect
