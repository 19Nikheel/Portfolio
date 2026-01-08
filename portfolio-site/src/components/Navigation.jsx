import { motion } from "framer-motion";

const Navigation = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: "home", label: "HOME" },
    { id: "summary", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "tools", label: "TOOLS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Navigation Items */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>

                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Resume Button */}
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1g2LiEkS8WudDnLlYoGPNErZFzd9Pe9Mf/view?usp=drivesdk",
                "_blank"
              )
            }
            className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold"
          >
            Download Resume
          </button>
        </div>
      </div>

      {/* Mobile Menu Button (Optional) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Contact me"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
