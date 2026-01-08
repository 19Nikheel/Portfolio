import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const tools = [
  { name: "Intellij", icon: "💻", color: "bg-blue-100 text-blue-700" },
  { name: "Git & GitHub", icon: "📚", color: "bg-gray-100 text-gray-700" },
  { name: "VS Code", icon: "💻", color: "bg-blue-100 text-blue-700" },
  { name: "Docker", icon: "🐳", color: "bg-cyan-100 text-cyan-700" },
  { name: "Postman", icon: "📮", color: "bg-orange-100 text-orange-700" },
  { name: "Jira", icon: "📋", color: "bg-blue-100 text-blue-700" },
  { name: "AWS", icon: "📚", color: "bg-gray-100 text-gray-700" },
  { name: "Ollama", icon: "📚", color: "bg-gray-100 text-gray-700" },
  {
    name: "Vercel/Render",
    icon: "☁️",
    color: "bg-indigo-100 text-indigo-700",
  },
];

const Tools = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Development <span className="text-blue-600">Tools</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The tools and technologies I use daily to build, test, and deploy
          applications
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="tool-rectangle flex flex-col items-center text-center p-6"
          >
            <div
              className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center text-2xl mb-4`}
            >
              {tool.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600">
                {getToolDescription(tool.name)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 pt-8 border-t border-gray-200"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Productivity Stack
            </h4>
            <p className="text-gray-600">
              Optimized workflow combining the best tools for maximum efficiency
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["🚀", "⚡", "🎯", "✨"].map((emoji, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function for tool descriptions
const getToolDescription = (toolName) => {
  const descriptions = {
    "VS Code": "Code Editor",
    Intellij: "Code Editor",
    "Git & GitHub": "Version Control",
    Docker: "Containerization",
    Postman: "API Testing",
    Jira: "Project Management",
    "Vercel/Render": "Deployment",
    Ollama: "LLM Model",
    AWS: "Cloud",
  };
  return descriptions[toolName] || "Development Tool";
};

export default Tools;
