import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillsData = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: "Intermediate", icon: "⚛️" },
      { name: "JavaScript", level: "Intermediate", icon: "📜" },
      { name: "HTML/CSS", level: "Intermediate", icon: "🎨" },
      { name: "Tailwind", level: "Intermediate", icon: "🌊" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Spring Boot", level: "Intermediate", icon: "🟢" },
      { name: "Java", level: "Intermediate", icon: "🚀" },
      { name: "Microservice", level: "Intermediate", icon: "🚀" },
      { name: "Spring Security", level: "Intermediate", icon: "🍃" },
      { name: "PostgreSQL", level: "Intermediate", icon: "🐘" },
      { name: "Spring Cloud", level: "Intermediate", icon: "🟢" },
      { name: "Python", level: "Basic", icon: "🐍" },
      { name: "Spring AI", level: "Basic", icon: "🍃" },
    ],
  },
  {
    category: "DevOps",
    icon: "🔍",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "Git/Github", level: "Basic", icon: "🧪" },
      { name: "Docker", level: "Basic", icon: "🤖" },
      { name: "Linux", level: "Basic", icon: "🌲" },
      { name: "AWS", level: "Basic", icon: "✨" },
      { name: "Jenkins", level: "Basic", icon: "⚡" },
      { name: "Nginx", level: "Basic", icon: "🌲" },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const activeSkills =
    skillsData.find((cat) => cat.category === activeCategory)?.skills || [];
  const activeCategoryData = skillsData.find(
    (cat) => cat.category === activeCategory
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <p className="text-gray-600">
            Expertise across the development stack
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skillsData.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 border ${
                activeCategory === category.category
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activeCategoryData?.color} flex items-center justify-center text-white text-xl`}
          >
            {activeCategoryData?.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {activeCategoryData?.category} Skills
            </h3>
            <p className="text-gray-600">
              Proficiency levels based on experience
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {activeSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center group"
          >
            <div className="relative mb-6">
              <div
                className="skill-circle-blue"
                style={{ "--value": getSkillValue(skill.level) }}
              >
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-2">{skill.icon}</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {skill.level}
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-900 font-semibold text-lg">
                {skill.name}
              </span>
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(getStarCount(skill.level))].map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Helper functions
const getSkillValue = (level) => {
  switch (level) {
    case "Expert":
      return "90%";
    case "Advanced":
      return "75%";
    case "Intermediate":
      return "60%";
    default:
      return "50%";
  }
};

const getStarCount = (level) => {
  switch (level) {
    case "Expert":
      return 5;
    case "Advanced":
      return 4;
    case "Intermediate":
      return 3;
    default:
      return 2;
  }
};

export default Skills;
