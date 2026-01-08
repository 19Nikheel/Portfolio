import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import projectsData from "../data/projectsData";

// Lazy load TechnologyTimeline
const TechnologyTimeline = lazy(() => import("./TechnologyTimeline"));

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "exp", label: "Expence sharing platform" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "tools", label: "Developer Tools" },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTechStack, setShowTechStack] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  const openTechStack = (project) => {
    setSelectedProject(project);
    setShowTechStack(true);
    // Scroll to tech stack section
    setTimeout(() => {
      document.getElementById("project-tech-stack")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const closeTechStack = () => {
    setShowTechStack(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on "View Tech Stack" to see the specific technologies used in
            each project
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="project-card group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Tech Stack
                    </span>
                    <span className="text-xs text-blue-600">
                      {project.technologies.length} technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openTechStack(project)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <span>🔧</span>
                    View Tech Stack
                  </button>
                  <div className="flex gap-2">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>🌐</span>
                      Live
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>💻</span>
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <button className="cta-button inline-flex items-center gap-3">
            <span>View All Projects</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Project-specific Technology Timeline */}
      {showTechStack && selectedProject && (
        <div id="project-tech-stack" className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-200">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedProject.title} - Technology Stack
                  </h3>
                  <p className="text-gray-600">
                    Detailed breakdown of technologies used in this project
                  </p>
                </div>
                <button
                  onClick={closeTechStack}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2 self-start"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close Tech Stack
                </button>
              </div>

              {/* Project Info */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {selectedProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lazy Loaded Technology Timeline */}
              <Suspense
                fallback={
                  <div className="h-64 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Loading technology stack...</p>
                  </div>
                }
              >
                <TechnologyTimeline
                  technologies={selectedProject.techStack}
                  projectName={selectedProject.title}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
