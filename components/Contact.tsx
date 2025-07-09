'use client'

import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

interface ContactProps {
  onClose: () => void
}

export default function Contact({ onClose }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS 
      const serviceId = 'service_t24irlj' 
      const templateId = 'template_4zngu1b' 
      const publicKey = '3-C4BaJMGBMJNwGGS' 

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'tundraperson@gmail.com',
        subject: formData.subject || 'Contact from Portfolio',
        message: formData.message,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#f0edcf] p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      > 
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-7 right-8  hover:bg-white text-black rounded-full p-2 transition-colors duration-200 z-10"
          aria-label="Close contact form"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 libertinus-mono-regular border-b border-[#cb4242] pb-2">
        Ask Me Anything
      </h2>
      
      <p className="text-sm text-gray-700 leading-relaxed libertinus-mono-regular">
        I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 libertinus-mono-regular">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#cb4242]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cb4242]/50 focus:border-[#cb4242] bg-white/80 libertinus-mono-regular"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 libertinus-mono-regular">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#cb4242]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cb4242]/50 focus:border-[#cb4242] bg-white/80 libertinus-mono-regular"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 libertinus-mono-regular">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#cb4242]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cb4242]/50 focus:border-[#cb4242] bg-white/80 libertinus-mono-regular"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 libertinus-mono-regular">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-[#cb4242]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cb4242]/50 focus:border-[#cb4242] bg-white/80 resize-vertical libertinus-mono-regular"
            placeholder="Tell me about your project or just say hello!"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#cb4242] hover:bg-[#cb4242]/80 disabled:bg-[#cb4242]/50 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 libertinus-mono-regular"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>

        {submitStatus === 'success' && (
          <p className="text-green-600 text-sm text-center libertinus-mono-regular">
            Message sent successfully! I'll get back to you soon.
          </p>
        )}

        {submitStatus === 'error' && (
          <p className="text-red-600 text-sm text-center libertinus-mono-regular">
            Failed to send message. Please try again or email me directly at tundraperson@gmail.com
          </p>
        )}
      </form>

        <div className="pt-4 border-t border-[#cb4242]/20">
          <p className="text-center text-gray-600 libertinus-mono-regular">
            Or email me directly at:{' '}
            <a 
              href="mailto:tundraperson@gmail.com" 
              className="text-[#cb4242] hover:underline font-medium"
            >
              tundraperson@gmail.com
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}