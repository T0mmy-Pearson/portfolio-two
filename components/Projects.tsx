const projects = [
  {
    title: "Project One",
    description: "A modern website built with Next.js and Tailwind CSS.",
    link: "#",
    image: "https://via.placeholder.com/600x400"
  },
  {
    title: "Project Two",
    description: "An interactive UI project showcasing creative design.",
    link: "#",
    image: "https://via.placeholder.com/600x400"
  },
]

const Projects = () => (
  <section className="py-24 bg-[#0a192f]" id="projects">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12 text-cyan-400">Projects</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((p, i) => (
          <div key={i} className="bg-[#112240] rounded-xl overflow-hidden shadow-lg">
            <img src={p.image} alt={p.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-white">{p.title}</h3>
              <p className="text-gray-300 mb-4">{p.description}</p>
              <a href={p.link} className="text-cyan-400 font-semibold hover:underline">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
export default Projects