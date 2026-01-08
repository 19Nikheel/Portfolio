import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load PDF viewer component
const PDFViewer = lazy(() => import("./PDFViewer"));

// Default technologies (fallback)
const defaultTechnologies = [
  {
    id: 1,
    name: "Frontend",
    icon: "⚛️",
    description: "React, TypeScript, Tailwind CSS",
    pdfUrl: "/docs/frontend.pdf",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Backend",
    icon: "⚙️",
    description: "Node.js, Express, REST APIs",
    pdfUrl: "/docs/backend.pdf",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    name: "Database",
    icon: "🗄️",
    description: "MongoDB, PostgreSQL, Redis",
    pdfUrl: "/docs/database.pdf",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 4,
    name: "Authentication",
    icon: "🔐",
    description: "JWT, OAuth, Session Management",
    pdfUrl: "/docs/auth.pdf",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 5,
    name: "DevOps",
    icon: "🚀",
    description: "Docker, AWS, CI/CD",
    pdfUrl: "/docs/devops.pdf",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 6,
    name: "Machine Learning",
    icon: "🤖",
    description: "TensorFlow, Scikit-learn, PyTorch",
    pdfUrl: "/docs/ml.pdf",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 7,
    name: "Testing",
    icon: "🧪",
    description: "Jest, Cypress, Unit Testing",
    pdfUrl: "/docs/testing.pdf",
    color: "from-teal-500 to-green-500",
  },
  {
    id: 8,
    name: "Mobile",
    icon: "📱",
    description: "React Native, Flutter",
    pdfUrl: "/docs/mobile.pdf",
    color: "from-yellow-500 to-orange-500",
  },
];

const TechnologyTimeline = ({
  technologies = defaultTechnologies,
  projectName = "Project",
}) => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openPDF = (tech) => {
    setSelectedTech(tech);
    setIsViewerOpen(true);
  };

  const closePDF = () => {
    setIsViewerOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  };

  return (
    <>
      <div className="py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {projectName}
            </span>{" "}
            Tech Stack
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on any technology to view detailed documentation and
            implementation guides
          </p>
        </div>

        {/* Horizontal Timeline Line */}
        <div className="relative mb-12">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2"></div>

          {/* Start and End Points */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <div className="w-6 h-6 rounded-full bg-pink-600 border-4 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              {/* Connection Line to Timeline */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>

              {/* Technology Card */}
              <button
                onClick={() => openPDF(tech)}
                className="w-full flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                {/* Icon with Gradient Background */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}
                >
                  {tech.icon}
                </div>

                {/* Tech Name */}
                <h3 className="font-bold text-gray-900 text-center mb-1 text-sm">
                  {tech.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 text-center mb-2 line-clamp-2">
                  {tech.description}
                </p>

                {/* Click Hint */}
                <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                  <span>View Docs</span>
                  <svg
                    className="w-3 h-3"
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
                </div>
              </button>

              {/* Hover Tooltip */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap">
                  <p className="text-sm font-medium">
                    Click to view {tech.name} documentation
                  </p>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-medium text-gray-900">Note:</span> Each card
            opens project-specific documentation
          </p>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedTech && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePDF}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-[101]"
            >
              <div className="w-full h-full bg-white rounded-3xl shadow-2xl flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTech.color} flex items-center justify-center text-xl`}
                    >
                      {selectedTech.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedTech.name} - {projectName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {selectedTech.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closePDF}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Close PDF viewer"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
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
                  </button>
                </div>

                {/* PDF Viewer Content */}
                <div className="flex-1 overflow-hidden p-4">
                  <Suspense
                    fallback={
                      <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">
                          Loading {selectedTech.name} documentation...
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          This may take a few moments
                        </p>
                      </div>
                    }
                  >
                    <PDFViewer pdfUrl={selectedTech.pdfUrl} />
                  </Suspense>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Project:</span> {projectName}{" "}
                    •<span className="font-medium ml-2">Component:</span>{" "}
                    {selectedTech.name}
                  </div>
                  <a
                    href={selectedTech.pdfUrl}
                    download
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TechnologyTimeline;
