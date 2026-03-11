import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Play, Camera, PenTool, Layout, ChevronRight, Quote, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { projects as allProjects } from '@/lib/projects';

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
  const [showVideoPhotography, setShowVideoPhotography] = useState(false);

  // Disable global theme styles that break fixed positioning (transform on body)
  useEffect(() => {
    document.documentElement.setAttribute('data-skip-theme', 'true');
    document.body.setAttribute('data-skip-theme', 'true');
    return () => {
      document.documentElement.removeAttribute('data-skip-theme');
      document.body.removeAttribute('data-skip-theme');
    };
  }, []);

  // Curated hero showcase images
  const heroProjects = [
    {
      title: "Fuzed",
      category: "Graphic Design",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F611420260031498eac697521502f1e03",
    },
    {
      title: "Starlight Beer",
      category: "Graphic Design",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fec0ff16c552a42298ff2ffdf9873ba23",
    },
    {
      title: "ReGenB",
      category: "Graphic Design",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F6a2e42c5f2f24a21b57c67da2d56e76c",
    },
    {
      title: "Flow",
      category: "Graphic Design",
      img: "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb2cbdca2ddd949cea2195e0fdfd0349b",
    },
  ];

  // Selected graphic design projects sorted chronologically (newest first)
  const graphicDesignProjects = allProjects
    .filter(p =>
      p.type === "Graphic Design" &&
      ["fuzed", "starlight-beer", "regenb", "flow", "published-book-cover", "posters-2022", "schtuff-ad-campaign-2022", "old-west-starter-kit"].includes(p.id)
    )
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Video & Photography projects sorted chronologically
  const videoPhotographyProjects = allProjects
    .filter(p => {
      const isVideoPhotoType = p.type === "Video Editing" || p.type === "Photography";
      const hasCdnImage = p.image.startsWith('https://cdn.builder.io');
      const isSelectedVideo = ["leavers-video", "super-friends-intro", "french-toast-tutorial"].includes(p.id);
      return isVideoPhotoType && (hasCdnImage || isSelectedVideo);
    })
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

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
      setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, heroProjects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#FFD700] selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-xl shadow-black/20' : 'bg-transparent py-6'}`}>
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

      {/* 1. HERO - AVEC-STYLE BILLBOARD */}
      <section className="relative h-screen bg-[#0a0a0a] overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Main Billboard Image */}
          <div
            className="relative flex-1 lg:w-[65%] overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={nextSlide}
          >
            {/* Cycling Images */}
            {heroProjects.map((project, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Brand text overlaid bottom-left */}
            <div className="absolute bottom-20 left-8 md:left-12 z-30">
              <Reveal delay={100}>
                <p className="text-[#FFD700] font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4">
                  London, UK
                </p>
              </Reveal>
              <Reveal delay={300}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-2">
                  STAMP
                </h1>
              </Reveal>
              <Reveal delay={450}>
                <svg
                  viewBox="0 0 580 90"
                  className="w-[280px] md:w-[450px] lg:w-[580px] h-auto block"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="78"
                    fill="none"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                    style={{
                      fontSize: '96px',
                      fontWeight: 900,
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Creative
                  </text>
                </svg>
              </Reveal>
            </div>

            {/* Scroll indicator bottom-left */}
            <div className="absolute bottom-6 left-8 md:left-12 z-30 flex items-center space-x-2 text-neutral-400 text-xs uppercase tracking-[0.2em]">
              <span>Scroll to discover</span>
            </div>

            {/* Current project label */}
            <div className="absolute top-24 left-8 md:left-12 z-30">
              <p className="text-[#FFD700] font-mono text-xs uppercase tracking-[0.3em]">
                {heroProjects[currentSlide]?.category}
              </p>
            </div>
          </div>

          {/* Right Sidebar - Project Cards */}
          <div className="hidden lg:flex lg:w-[35%] flex-col border-l border-neutral-800 h-screen min-h-0">
            {heroProjects.map((project, index) => (
              <div
                key={index}
                className={`group cursor-pointer border-b border-neutral-800 transition-all duration-300 flex-1 flex flex-col min-h-0 ${
                  index === currentSlide ? 'bg-neutral-900' : 'bg-[#0a0a0a] hover:bg-neutral-900/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="relative overflow-hidden flex-1 min-h-0">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide
                      ? 'bg-black/10'
                      : 'bg-black/40 group-hover:bg-black/20'
                  }`} />
                  {/* Active indicator bar */}
                  <div className={`absolute left-0 top-0 w-1 h-full bg-[#FFD700] transition-opacity duration-300 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
                <div className="px-5 py-2 shrink-0">
                  <h4 className={`text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
                    index === currentSlide ? 'text-[#FFD700]' : 'text-white group-hover:text-[#FFD700]'
                  }`}>
                    {project.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile sidebar - horizontal scroll */}
          <div className="flex lg:hidden overflow-x-auto gap-4 px-6 py-6 bg-[#0a0a0a] border-t border-neutral-800">
            {heroProjects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 cursor-pointer group"
                onClick={() => setCurrentSlide(index)}
              >
                <div className={`relative overflow-hidden h-32 rounded-sm transition-all duration-300 ${
                  index === currentSlide ? 'ring-2 ring-[#FFD700]' : ''
                }`}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className={`text-xs font-bold uppercase tracking-wide mt-2 transition-colors ${
                  index === currentSlide ? 'text-[#FFD700]' : 'text-white'
                }`}>
                  {project.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <Reveal delay={0} className="md:col-span-5 h-full">
            <div className="relative overflow-hidden rounded-sm aspect-square">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe81b7ac7dfb94ba7b069bb4b5a5528dd"
                alt="Portrait"
                className="w-full h-full object-contain grayscale"
              />
            </div>
          </Reveal>
          
          <div className="md:col-span-7 flex flex-col justify-center">
            <Reveal delay={200}>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
                Building ideas<br/>into <span className="text-[#FFD700]">bold</span><br/>brand identities.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-xl text-neutral-400 font-light leading-relaxed mb-6">
                I'm Charlie Stamp, a graphic designer specialising in branding and identity, recently graduating from the Graphic Branding & Identity course at the University of the Arts London. I'm passionate about creating visual identities that help brands communicate clearly and connect with people.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                I enjoy the process of developing ideas, experimenting with typography and layout, and shaping concepts into strong visual systems. Alongside graphic design, I also explore photography, video editing, and 3D work, which keeps my thinking flexible and helps me approach projects from different creative angles.
              </p>
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

          <div className="mb-12">
            <Reveal delay={100}>
              <div className="flex items-end space-x-16">
                <div className="flex flex-col">
                  <span className="text-5xl font-bold text-white mb-2">5+</span>
                  <span className="text-sm text-neutral-500 uppercase tracking-wider">Years Exp.</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-bold text-white leading-tight">BA (HONS)</span>
                  <span className="text-lg text-neutral-400 uppercase tracking-wider">Graphic Branding & Identity</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool size={40} strokeWidth={1.5} />,
                title: "Brand Identity",
                desc: "Branding is where my passion for design is strongest. I enjoy shaping ideas into distinctive visual identities through typography, layout, and concept-driven thinking, creating brands that feel clear, intentional, and memorable."
              },
              {
                icon: <Play size={40} strokeWidth={1.5} />,
                title: "Video Editing",
                desc: "Video editing is another creative outlet where I enjoy shaping rhythm, pacing, and atmosphere. I love the process of turning raw footage into something engaging and cinematic."
              },
              {
                icon: <Camera size={40} strokeWidth={1.5} />,
                title: "Photography",
                desc: "Photography is a space where I explore creativity more freely, capturing light, composition, and moments that inspire my visual thinking and often influence my design work."
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

        {/* Graphic Design Section */}
        <div className="mb-20">
          <Reveal>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-8 h-[2px] bg-[#FFD700]"></div>
              <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-400">Graphic Design</h3>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16">
            {graphicDesignProjects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index % 2 === 0 ? 0 : 200}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-5 bg-neutral-900">
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center space-x-3 text-[#FFD700] font-bold uppercase tracking-widest text-sm">
                      <span>View Project</span>
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover transition-transform duration-[2s] group-hover:scale-105 h-[400px]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">{project.year}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Video & Photography Dropdown Section */}
        <div className="pt-16 border-t border-neutral-800">
          <Reveal>
            <button
              onClick={() => setShowVideoPhotography(!showVideoPhotography)}
              className="flex items-center space-x-4 mb-12 group"
            >
              <div className="w-8 h-[2px] bg-[#FFD700]"></div>
              <span className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-[#FFD700] transition-colors">Video & Photography</span>
              <ChevronRight size={18} className={`text-neutral-500 transition-transform duration-300 ${showVideoPhotography ? 'rotate-90' : ''}`} />
            </button>
          </Reveal>

          {showVideoPhotography && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16">
              {videoPhotographyProjects.map((project, index) => (
                <Reveal
                  key={project.id}
                  delay={index % 2 === 0 ? 0 : 200}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden mb-5 bg-neutral-900">
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                      <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center space-x-3 text-[#FFD700] font-bold uppercase tracking-widest text-sm">
                        <span>View Project</span>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover transition-transform duration-[2s] group-hover:scale-105 h-[400px]"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">{project.year}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
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
