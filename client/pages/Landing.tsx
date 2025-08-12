import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { ArrowRight, Sparkles, Palette, Camera, Video } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Banner - Full width at top */}
      <div className="pt-20">
        <HeroBanner />
      </div>

      {/* Intro Section */}
      <section className="grid-container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight text-foreground mb-6">
              Charlie Stamp
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-muted-foreground mb-8 leading-relaxed">
              Creative Director & Visual Storyteller
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting compelling visual narratives through brand identity, video editing, and photography.
              Let's bring your creative vision to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-lg font-black hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl"
                style={{
                  boxShadow: '0 8px 24px rgba(245, 230, 211, 0.3), 0 4px 12px rgba(0,0,0,0.2)',
                  filter: 'drop-shadow(0 0 12px rgba(245, 230, 211, 0.4))'
                }}
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-black text-foreground hover:bg-foreground/10 hover:shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              >
                Get in Touch
                <Sparkles className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid-container pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-4xl font-black text-foreground mb-4 text-shadow-strong">What I Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-shadow-medium">
              Specializing in three key areas of creative design and visual storytelling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Graphic Design */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.6s",
                boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: '0 8px 24px rgba(245, 230, 211, 0.4)' }}
              >
                <Palette className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 text-shadow-medium">Graphic Design</h3>
              <p className="text-muted-foreground leading-relaxed text-shadow-soft">
                Brand identities, visual systems, and compelling designs that communicate your message with clarity and impact.
              </p>
            </div>

            {/* Video Editing */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.7s",
                boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: '0 8px 24px rgba(245, 230, 211, 0.4)' }}
              >
                <Video className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 text-shadow-medium">Video Editing</h3>
              <p className="text-muted-foreground leading-relaxed text-shadow-soft">
                Dynamic video content, from commercials to music videos, crafted with precision and creative flair.
              </p>
            </div>

            {/* Photography */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.8s",
                boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: '0 8px 24px rgba(245, 230, 211, 0.4)' }}
              >
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 text-shadow-medium">Photography</h3>
              <p className="text-muted-foreground leading-relaxed text-shadow-soft">
                Capturing moments that tell stories, from portraits to landscapes, with artistic vision and technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="grid-container pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up" style={{ animationDelay: "0.9s" }}>
            <div
              className="glass rounded-lg p-12"
              style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)' }}
            >
              <h2 className="text-4xl font-black text-foreground mb-6 text-shadow-strong">Ready to Create Something Amazing?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-shadow-medium">
                Whether you need a complete brand identity, compelling video content, or stunning photography,
                I'm here to bring your vision to life with creativity and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-black text-foreground hover:bg-foreground/10 transition-all duration-300 hover:scale-105 text-shadow-medium"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  Explore My Portfolio
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-black text-foreground hover:bg-foreground/10 transition-all duration-300 hover:scale-105 text-shadow-medium"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  Learn More About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
