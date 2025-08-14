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
      <section className="grid-container py-20 -mt-[350px] relative z-40">
        <div className="max-w-6xl">
          <div className="animate-slide-up">
            <h1 className="text-7xl md:text-8xl font-title font-bold leading-none tracking-tight text-foreground mb-6">
              <span style={{ fontFamily: 'Moret, sans-serif' }}>CHARLIE STAMP</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-muted-foreground mb-8 leading-relaxed max-w-4xl">
              Creative Director & Visual Storyteller
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mb-12 leading-relaxed">
              Crafting compelling visual narratives through brand identity,
              video editing, and photography. Let's bring your creative vision
              to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 glass border border-foreground/20 rounded-full px-8 py-4 text-lg font-body font-semibold text-foreground hover:bg-foreground/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-body font-semibold text-foreground hover:bg-foreground/10 hover:shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
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
        <div className="max-w-6xl">
          <div
            className="mb-16 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-4xl font-title font-bold text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Specializing in three key areas of creative design and visual
              storytelling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Graphic Design */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.3s",
                boxShadow:
                  "0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="w-16 h-16 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src="/images/service-icon-graphic-design.svg"
                  alt="Graphic Design"
                  className="w-8 h-8 text-accent-foreground"
                  style={{ filter: "invert(1)" }}
                />
              </div>
              <h3 className="text-2xl font-title font-bold text-foreground mb-4">
                Graphic Design
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Brand identities, visual systems, and compelling designs that
                communicate your message with clarity and impact.
              </p>
            </div>

            {/* Video Editing */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.4s",
                boxShadow:
                  "0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="w-16 h-16 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src="/images/service-icon-video-editing.svg"
                  alt="Video Editing"
                  className="w-8 h-8 text-accent-foreground"
                  style={{ filter: "invert(1)" }}
                />
              </div>
              <h3 className="text-2xl font-title font-bold text-foreground mb-4">
                Video Editing
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dynamic video content, from commercials to music videos, crafted
                with precision and creative flair.
              </p>
            </div>

            {/* Photography */}
            <div
              className="glass rounded-lg p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{
                animationDelay: "0.5s",
                boxShadow:
                  "0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="w-16 h-16 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src="/images/service-icon-photography.svg"
                  alt="Photography"
                  className="w-8 h-8 text-accent-foreground"
                  style={{ filter: "invert(1)" }}
                />
              </div>
              <h3 className="text-2xl font-title font-bold text-foreground mb-4">
                Photography
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Capturing moments that tell stories, from portraits to
                landscapes, with artistic vision and technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="grid-container pb-20">
        <div className="max-w-6xl">
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div
              className="glass rounded-lg p-12"
              style={{
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <h2 className="text-4xl font-title font-bold text-foreground mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                Whether you need a complete brand identity, compelling video
                content, or stunning photography, I'm here to bring your vision
                to life with creativity and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 glass border border-foreground/20 rounded-full px-8 py-4 text-lg font-body font-semibold text-foreground hover:bg-foreground/10 transition-all duration-300 hover:scale-105"
                  style={{
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  Explore My Portfolio
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-body font-semibold text-foreground hover:bg-foreground/10 transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
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
