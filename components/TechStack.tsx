import React, { useState } from 'react'

interface TechStackProps {
  onClose: () => void
}

const TechStack = ({ onClose }: TechStackProps) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const techStacks = {
    frontend: {
      name: 'Frontend',
      color: 'bg-[#cb4242]',
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '🔺' },
        { name: 'TypeScript', icon: '🔷' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Bootstrap', icon: '🟦' },
        { name: 'Styled Components', icon: '💅' },
        { name: 'Material UI', icon: '📦' },
        { name: 'Ant Design', icon: '🔗' },
        { name: 'HTML5', icon: '🌐' },

      ]
    },
    backend: {
      name: 'Backend',
      color: 'bg-slate-600',
      technologies: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'SQLAlchemy', icon: '🔗' },
        { name: 'Apollo Server', icon: '🌌' },
        { name: 'SQL', icon: '📊' },
        { name: 'Python', icon: '🐍' },
        { name: 'Django', icon: '🎯' },
        { name: 'Flask', icon: '⚡' },
        { name: 'MongoDB', icon: '🔗' },
        { name: 'REST APIs', icon: '📡' },

      ]
    },
    database: {
      name: 'Database',
      color: 'bg-slate-500',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'Redis', icon: '🔴' },
        { name: 'Supabase', icon: '🚀' },
        { name: 'Firebase', icon: '🔥' }
      ]
    },
    tools: {
      name: 'Tools & Services',
      color: 'bg-slate-400',
      technologies: [
        { name: 'Git', icon: '🌿' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Netlify', icon: '🌐' },
        { name: 'VS Code', icon: '💙' },
        { name: 'Figma', icon: '🎨' },
        { name: 'Postman', icon: '📮' }
      ]
    },
    mobile: {
      name: 'Mobile',
      color: 'bg-gray-600',
      technologies: [
        { name: 'React Native', icon: '📱' },
        { name: 'Expo', icon: '🚀' },
      ]
    }
  }

  const allTechnologies = Object.values(techStacks).flatMap(category => 
    category.technologies.map(tech => ({ ...tech, category: category.name }))
  )

  const filteredTechnologies = activeCategory === 'all' 
    ? allTechnologies 
    : techStacks[activeCategory as keyof typeof techStacks]?.technologies || []

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f0edcf] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="from-gray-800 to-gray-900 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2 libertinus-mono-bold">Tech Stack</h2>
              <p className="text-gray-300 libertinus-mono-regular">Technologies I work with</p>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-300 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-6 border-b border-[#cb4242]/20">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full transition-all duration-200 libertinus-mono-regular ${
                activeCategory === 'all' 
                  ? 'bg-[#cb4242] text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All ({allTechnologies.length})
            </button>
            {Object.entries(techStacks).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full transition-all duration-200 libertinus-mono-regular ${
                  activeCategory === key 
                    ? `${category.color} text-white shadow-lg` 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.technologies.length})
              </button>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeCategory === 'all' ? allTechnologies : filteredTechnologies).map((tech, index) => (
              <div 
                key={`${tech.name}-${index}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:border-[#cb4242]/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <h3 className="font-semibold text-gray-800 libertinus-mono-bold">{tech.name}</h3>
                  </div>
                  {activeCategory === 'all' && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded libertinus-mono-regular">
                      {('category' in tech ? tech.category : '') as string}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-[#cb4242]/20">
          <p className="text-sm text-gray-600 libertinus-mono-regular">
            Always learning and exploring new technologies 🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default TechStack
