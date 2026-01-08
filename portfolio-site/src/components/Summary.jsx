import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Summary = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    "Specialized in React & Spring Boot",
    "Strong focus on code quality",
    "Passionate about System design",
    "Experienced in agile teams",
    "Continuous learner",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-[#FCE7F3]"
    >
      <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
        About <span className="text-[#DB2777]">Me</span>
      </h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-4 h-4 rounded-full bg-[#F9A8D4] mt-2"></div>
          <p className="text-[#6B7280] text-lg">
            I am a developer who started with Java fundamentals and grew into
            building secure, production-ready microservices using Spring Boot,
            OAuth2, JWT, and API Gateway patterns. I actively work with Docker,
            Kafka, OCR pipelines, and React to create complete end-to-end
            systems. I am deeply interested in system design, security, and AI
            integration, and I enjoy understanding things at a low level rather
            than just using frameworks.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-4 h-4 rounded-full bg-[#F9A8D4] mt-2"></div>
          <p className="text-[#6B7280] text-lg">
            I believe in writing clean, maintainable code and ensuring the
            highest quality through rigorous testing. Whether it's frontend
            development or backend architecture, I approach each project with
            enthusiasm and dedication.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-[#FDF2F8] rounded-xl"
            >
              <div className="w-2 h-2 rounded-full bg-[#DB2777]"></div>
              <span className="text-[#1F2937]">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Summary;
