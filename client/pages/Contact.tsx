import { Link } from "react-router-dom";
import { Mail, Send, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Contact Content */}
      <section className="grid-container pt-24 pb-section">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl font-black leading-none tracking-tight text-foreground mb-6">
              Let's work together
            </h1>
            <p className="text-lg font-normal leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to collaborate on new projects and bring
              creative visions to life. Whether you have a specific brief or
              just want to explore possibilities, let's start a conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="glass rounded-lg p-8">
                <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-8 py-4 text-lg font-black hover:bg-primary/90 transition-all duration-200 focus-visible"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div
              className="space-y-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Direct Contact */}
              <div className="glass rounded-lg p-8">
                <h3 className="text-2xl font-black leading-snug tracking-tight text-foreground mb-4">
                  Direct Contact
                </h3>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-3 text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible"
                >
                  <Mail className="w-5 h-5" />
                  hello@charliestamp.com
                </a>
              </div>

              {/* Social Links */}
              <div className="glass rounded-lg p-8">
                <h3 className="text-2xl font-black leading-snug tracking-tight text-foreground mb-4">
                  Connect
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", url: "#", handle: "@charliestamp" },
                    { name: "Instagram", url: "#", handle: "@charliestamp" },
                    { name: "Dribbble", url: "#", handle: "@charliestamp" },
                    { name: "Behance", url: "#", handle: "@charliestamp" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="inline-flex items-center gap-3 text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{social.name}</span>
                      <span className="text-sm text-muted-foreground/70">
                        {social.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
