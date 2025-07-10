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
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Next.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'CSS3', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
        { name: 'Styled Components', icon: 'https://cdn.simpleicons.org/styledcomponents/DB7093' },
        { name: 'Material UI', icon: 'https://cdn.simpleicons.org/mui/007FFF' },
        { name: 'Ant Design', icon: 'https://cdn.simpleicons.org/antdesign/0170FE' },
        { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      ]
    },
    backend: {
      name: 'Backend',
      color: 'bg-slate-600',
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
        { name: 'Express.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg' },
        { name: 'SQLAlchemy', icon: 'https://cdn.simpleicons.org/sqlalchemy/D71F00' },
        { name: 'Apollo Server', icon: 'https://cdn.simpleicons.org/apollographql/311C87' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
        { name: 'Flask', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      ]
    },
    database: {
      name: 'Database',
      color: 'bg-slate-500',
      technologies: [
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
        { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' }
      ]
    },
    tools: {
      name: 'Tools & Services',
      color: 'bg-slate-400',
      technologies: [
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
        { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
        { name: 'Netlify', icon: 'https://cdn.simpleicons.org/netlify/00C7B7' },
        { name: 'Visual Studio Code', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' }
      ]
    },
    mobile: {
      name: 'Mobile',
      color: 'bg-gray-600',
      technologies: [
        { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Expo', icon: 'https://cdn.simpleicons.org/expo/000020' },
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
        <div className="border border-[#cb4242]/20 from-gray-800 to-gray-900 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2 libertinus-mono-bold">Tech Stack</h2>
              <p className="text-gray-300 libertinus-mono-regular">Technologies I work with</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors duration-200"
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
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img 
                        src={tech.icon} 
                        alt={tech.name}
                        width={24}
                        height={24}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-6 h-6 bg-[#cb4242] rounded text-white text-xs flex items-center justify-center font-bold"
                        style={{ display: 'none' }}
                      >
                        {tech.name.charAt(0)}
                      </div>
                    </div>
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
