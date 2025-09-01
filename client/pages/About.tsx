import { Link } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import { Header } from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* About Content */}
      <section className="grid-container pt-32 pb-section">
        <div className="animate-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Column */}
            <div className="relative">
              <div className="glass rounded-lg overflow-hidden aspect-[3/4] shadow-glass-lg">
                <img
                  src="/placeholder.svg"
                  alt="About photo"
                  className="w-full h-full object-cover"
                />
                {/* Subtle grain overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5" />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-center space-y-8">
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h1 className="text-5xl font-black leading-none tracking-tight text-foreground mb-4">
                  Creative Director
                </h1>
                <p className="text-lg font-normal leading-relaxed text-muted-foreground mb-6">
                  I'm a multidisciplinary creative director with over 8 years of
                  experience crafting compelling visual narratives. My work
                  spans brand identity, motion graphics, and photography, always
                  with a focus on authentic storytelling.
                </p>
                <p className="text-lg font-normal leading-relaxed text-muted-foreground mb-6">
                  I believe great design happens at the intersection of
                  strategic thinking and creative intuition. Whether working
                  with startups or established brands, I bring the same passion
                  for excellence and attention to detail.
                </p>
                <p className="text-lg font-normal leading-relaxed text-muted-foreground">
                  When I'm not designing, you'll find me exploring new cities
                  with my camera, experimenting in the kitchen, or getting lost
                  in a good book.
                </p>
              </div>

              {/* Specialties */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <h3 className="text-2xl font-black leading-snug tracking-tight text-foreground mb-4">
                  Specialties
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Brand Identity",
                    "Art Direction",
                    "Video Editing",
                    "Photography",
                    "Creative Strategy",
                    "Digital Design",
                  ].map((specialty) => (
                    <div key={specialty} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                      <span className="text-lg font-normal leading-relaxed text-muted-foreground">
                        {specialty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <h3 className="text-2xl font-black leading-snug tracking-tight text-foreground mb-4">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Adobe Creative Suite",
                    "Figma",
                    "After Effects",
                    "Premiere Pro",
                    "Final Cut Pro",
                    "Lightroom",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="glass rounded-full px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="animate-slide-up flex flex-col sm:flex-row gap-4"
                style={{ animationDelay: "0.4s" }}
              >
                <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-lg font-bold hover:bg-primary/90 transition-all duration-200 focus-visible">
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-bold text-foreground hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
