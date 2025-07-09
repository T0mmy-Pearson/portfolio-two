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

  // Handle mouse down/up events
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!isActive) return
    setIsMouseDown(true)
  }, [isActive])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!isActive) return
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
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M3 21L12 12L21 3L18 0L9 9L0 18L3 21Z\' fill=\'%23333\'/%3E%3C/svg%3E") 12 12, auto'
      
      // Disable text selection during paint mode
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      // Use type assertion for vendor-specific properties
      ;(document.body.style as any).mozUserSelect = 'none'
      ;(document.body.style as any).msUserSelect = 'none'
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mouseup', handleMouseUp)
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
  }, [isActive, handleMouseMove, handleMouseDown, handleMouseUp, handleKeyDown])

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
      <div className="fixed top-4 left-4 z-50 text-black px-4 py-2 rounded-lg flex items-center gap-3">
        <div className="text-sm libertinus-mono-regular">
          <p>ESC = Stop Painting!</p>
          <p className="text-xs opacity-75">Hold mouse = Permanent paint</p>
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => onDeactivate?.()}
          className="md:hidden bg-black/70 hover:bg-black text-white rounded-full p-1 transition-colors duration-200"
          aria-label="Stop painting mode"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default PaintTrailEffect
