import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-0">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
        {/* Left Side - Image */}
        {/* <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="relative">
            <div className="w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F9A8D4] to-[#DB2777] rounded-full opacity-10 blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?auto=format&fit=crop&w=800&q=80"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A8D4] to-[#DB2777] flex items-center justify-center text-white">
                  💻
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">
                    Currently working on
                  </p>
                  <p className="text-sm text-[#6B7280]">E-commerce platform</p>
                </div>
              </div>
            </div> 
          </div>
        </motion.div> 

          */}

        {/* Right Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-lg text-[#6B7280] mb-4">HELLO, MY NAME IS</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1F2937] mb-6">
              <span className="bg-gradient-to-r from-[#F9A8D4] to-[#DB2777] bg-clip-text text-transparent">
                Nikheel Kumar
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-[#6B7280] mb-8">
              <span className="font-semibold text-[#1F2937]">ReactJs</span> &{" "}
              <span className="font-semibold text-[#1F2937]">
                Java Developer
              </span>
            </div>
            <p className="text-[#6B7280] text-lg max-w-lg mx-auto lg:mx-0">
              Answer always lies in architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16"
          >
            <div
              className="animate-bounce cursor-pointer inline-flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("dashboard")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <p className="text-sm text-[#6B7280] mb-2">Scroll to explore</p>
              <svg
                className="w-8 h-8 text-[#F9A8D4]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
