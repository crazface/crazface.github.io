import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Play, Camera, PenTool, Layout, ChevronRight, Quote, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

// --- Custom Hook & Component for Scroll Reveal Animations ---
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseClasses = "transition-all duration-[1200ms] cubic-bezier-[0.16,1,0.3,1]";
  
  let hiddenClasses = "opacity-0";
  if (direction === "up") hiddenClasses += " translate-y-16";
  if (direction === "left") hiddenClasses += " translate-x-16";
  if (direction === "right") hiddenClasses += " -translate-x-16";

  const visibleClasses = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Main Application ---
export default function Stamp() {
  const accentColor = "#FFD700"; // Signature yellow
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const projects = [
    {
      title: "Neon Nights",
      category: "Video Editing / Color Grading",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Aura Skincare",
      category: "Brand Identity",
      img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Monolith Architecture",
      category: "Photography",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Velocity Motor Co.",
      category: "Creative Direction",
      img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-xl shadow-black/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            STAMP <span className="text-[#FFD700]">.</span>
          </div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium uppercase tracking-widest hover:text-[#FFD700] transition-colors relative group"
          >
            Let's Talk
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </nav>

      {/* 1. HERO CAROUSEL SECTION */}
      <section className="relative pt-20 md:pt-24 pb-20 px-6 md:px-12 bg-[#0a0a0a] min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 items-stretch">
            {/* Main Carousel */}
            <div
              className="lg:col-span-2 relative overflow-hidden rounded-sm group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-neutral-900 overflow-hidden">
                {/* Carousel Images */}
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                >
                  <ArrowDown size={24} className="rotate-90" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                >
                  <ArrowDown size={24} className="-rotate-90" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-[#FFD700] w-8' : 'bg-neutral-600 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Info Below Carousel */}
              <div className="bg-neutral-900 p-6 md:p-8 border-t border-neutral-800">
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
                  {projects[currentSlide].title}
                </h3>
                <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">
                  {projects[currentSlide].category}
                </p>
              </div>
            </div>

            {/* Sidebar - Project Thumbnails */}
            <div className="lg:col-span-1 flex flex-col space-y-4">
              {projects.map((project, index) => (
                <Reveal
                  key={index}
                  delay={index * 100}
                  className="group cursor-pointer"
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className={`relative overflow-hidden rounded-sm transition-all duration-300 ${
                    index === currentSlide
                      ? 'ring-2 ring-[#FFD700] scale-105'
                      : 'hover:ring-2 hover:ring-[#FFD700]/50'
                  }`}>
                    <div className="relative h-[150px] md:h-[180px] bg-neutral-900 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 ${
                        index === currentSlide ? 'bg-black/20' : ''
                      }`}></div>
                    </div>
                  </div>
                  <h4 className={`text-sm md:text-base font-bold uppercase tracking-wide mt-2 transition-colors duration-300 ${
                    index === currentSlide ? 'text-[#FFD700]' : 'text-white group-hover:text-[#FFD700]'
                  }`}>
                    {project.title}
                  </h4>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <Reveal delay={0} className="md:col-span-5 h-full">
            <div className="relative group overflow-hidden rounded-sm h-[500px] md:h-[700px]">
              <div className="absolute inset-0 bg-[#FFD700] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          </Reveal>
          
          <div className="md:col-span-7 flex flex-col justify-center">
            <Reveal delay={200}>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
                Turning concepts into <span className="text-[#FFD700]">cinematic</span> realities.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-xl text-neutral-400 font-light leading-relaxed mb-6">
                I believe that every brand has a pulse. My role as a Creative Director is to find that heartbeat and amplify it through striking visuals, cohesive identity, and compelling narrative.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                Based in Birmingham, I bridge the gap between strategy and aesthetics, ensuring that what looks beautiful also performs brilliantly. Let's make noise, visually.
              </p>
            </Reveal>
            
            <Reveal delay={500} className="mt-12 flex space-x-8">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">10+</span>
                <span className="text-sm text-neutral-500 uppercase tracking-wider">Years Exp.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-2">150+</span>
                <span className="text-sm text-neutral-500 uppercase tracking-wider">Projects</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-20">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Expertise</h2>
              <p className="hidden md:block text-neutral-400 font-mono uppercase tracking-widest text-sm">Capabilities</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool size={40} strokeWidth={1.5} />,
                title: "Brand Identity",
                desc: "Crafting distinct visual languages, logos, and style guides that ensure your brand stands out in a crowded market."
              },
              {
                icon: <Play size={40} strokeWidth={1.5} />,
                title: "Video Editing",
                desc: "Cinematic post-production, color grading, and dynamic cutting to tell stories that capture and hold attention."
              },
              {
                icon: <Camera size={40} strokeWidth={1.5} />,
                title: "Photography",
                desc: "High-end commercial, architectural, and lifestyle photography that perfectly aligns with your brand's aesthetic."
              }
            ].map((service, index) => (
              <Reveal key={index} delay={index * 150} className="group cursor-pointer">
                <div className="bg-neutral-950 p-10 h-full border border-neutral-800 hover:border-[#FFD700] transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD700] scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500"></div>
                  <div className="text-neutral-500 group-hover:text-[#FFD700] transition-colors duration-500 mb-8">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">{service.title}</h3>
                  <p className="text-neutral-400 leading-relaxed font-light">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK */}
      <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Selected<br/><span className="text-[#FFD700]">Works</span></h2>
            <p className="mt-6 md:mt-0 text-neutral-400 max-w-sm">A curated selection of recent projects spanning branding, direction, and visual production.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              title: "Neon Nights",
              category: "Video Editing / Color Grading",
              img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
              tall: false
            },
            {
              title: "Aura Skincare",
              category: "Brand Identity",
              img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1200",
              tall: true
            },
            {
              title: "Monolith Architecture",
              category: "Photography",
              img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
              tall: true
            },
            {
              title: "Velocity Motor Co.",
              category: "Creative Direction",
              img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
              tall: false
            }
          ].map((project, index) => (
            <Reveal 
              key={index} 
              delay={index % 2 === 0 ? 0 : 200} 
              className={`group cursor-pointer ${project.tall ? 'md:-mt-20' : ''}`}
            >
              <div className="relative overflow-hidden mb-6 bg-neutral-900">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center space-x-3 text-[#FFD700] font-bold uppercase tracking-widest text-sm">
                    <span>View Project</span>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className={`w-full object-cover transition-transform duration-[2s] group-hover:scale-105 ${project.tall ? 'h-[600px]' : 'h-[400px]'}`}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-1 group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
                <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">{project.category}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. CREATIVE PROCESS */}
      <section className="py-32 bg-neutral-950 border-y border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-8">The<br/>Process</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-md mb-12">
                Great work isn't an accident. It's the result of a rigorous, collaborative process designed to unearth the truth of a brand and express it beautifully.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white border border-neutral-700 hover:border-[#FFD700] hover:text-[#FFD700] px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
              >
                Start a Project
              </button>
            </Reveal>
          </div>

          <div className="relative border-l border-neutral-800 pl-8 md:pl-16 space-y-20 py-10">
            {/* Animated glowing line overlay */}
            <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-gradient-to-b from-[#FFD700] via-transparent to-transparent origin-top"></div>

            {[
              { num: "01", title: "Discovery", desc: "We dig deep. Understanding your goals, audience, and the unique landscape of your industry." },
              { num: "02", title: "Concept", desc: "Developing the creative strategy and visual direction. Moodboards, storyboarding, and wireframing." },
              { num: "03", title: "Production", desc: "Execution. Shooting, designing, and editing to bring the approved concepts into vibrant reality." },
              { num: "04", title: "Delivery", desc: "Refinement and final handover of polished, premium assets ready for the world." }
            ].map((step, index) => (
              <Reveal key={index} delay={index * 150} direction="left" className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-[#0a0a0a] border-2 border-[#FFD700] rounded-full z-10 shadow-[0_0_15px_rgba(255,215,0,0.5)]"></div>
                
                <h3 className="text-3xl font-bold uppercase tracking-wide mb-3 flex items-center text-white">
                  <span className="text-[#FFD700] font-mono text-sm mr-4">{step.num}</span>
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <Reveal>
          <Quote size={60} className="mx-auto text-[#FFD700] opacity-50 mb-12" />
        </Reveal>
        <Reveal delay={200}>
          <h3 className="text-3xl md:text-5xl font-light leading-tight mb-12">
            "STAMP didn't just redesign our identity; they reimagined how we communicate with our audience. The cinematic quality of their video work elevated our brand overnight."
          </h3>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-white font-bold uppercase tracking-widest">Sarah Jenkins</p>
          <p className="text-neutral-500 text-sm mt-2">Marketing Director, Aura Skincare</p>
        </Reveal>
      </section>

      {/* 7. CONTACT / CTA */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#FFD700] text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <Reveal>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Let's<br/>Create<br/>Something.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl font-medium max-w-md mb-12 opacity-80">
                Available for freelance opportunities and creative collaborations worldwide.
              </p>
            </Reveal>
            
            <Reveal delay={300} className="flex space-x-6">
              <a href="#" className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#FFD700] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#FFD700] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#FFD700] transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={400} className="bg-black text-white p-10 md:p-16 rounded-sm">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-neutral-700 py-3 text-white focus:ring-0 focus:border-[#FFD700] transition-colors peer"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-3 text-neutral-500 uppercase tracking-wider text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#FFD700] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500"
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-neutral-700 py-3 text-white focus:ring-0 focus:border-[#FFD700] transition-colors peer"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-3 text-neutral-500 uppercase tracking-wider text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#FFD700] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <textarea 
                  id="message"
                  rows="4"
                  placeholder=" "
                  className="block w-full bg-transparent border-0 border-b border-neutral-700 py-3 text-white focus:ring-0 focus:border-[#FFD700] transition-colors resize-none peer"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-3 text-neutral-500 uppercase tracking-wider text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#FFD700] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500"
                >
                  Project Details
                </label>
              </div>

              <button className="w-full bg-[#FFD700] text-black font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <ChevronRight size={20} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-neutral-900 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} STAMP Creative. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed in Birmingham, UK.</p>
        </div>
      </footer>

    </div>
  );
}
