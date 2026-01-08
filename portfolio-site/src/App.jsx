import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Projects from "./components/Projects";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "dashboard",
        "summary",
        "skills",
        "tools",
        "technology",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="pt-20">
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        {/* Summary with Image */}
        <section id="summary" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Summary />
              </div>

              {/* Image stays only with Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80"
                      alt="Flavia Medici - Web Developer"
                      className="w-full h-auto rounded-3xl object-cover"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 italic">
                      "Building digital experiences with passion and precision"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Full Width */}
        <section id="skills" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <Skills />
          </div>
        </section>

        {/* Projects Section - Full Width */}
        <section
          id="projects"
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <Projects />
          </div>
        </section>

        {/* Tools Section - Full Width */}
        <section id="tools" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <Tools />
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-br from-gray-900 to-blue-900"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get In <span className="text-blue-400">Touch</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Ready to start your next project? Let's connect and create
                something amazing together.
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/20 text-center">
                <p className="text-gray-300 mb-4">Or contact me directly:</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href="mailto:hello@example.com"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    ✉️ nikheelkumar1904@gmail.com
                  </a>
                  <a
                    href="tel:+91 8862824838"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    📞 +91 8862824838
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nikheel19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Flavia Medici. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, Tailwind CSS, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
