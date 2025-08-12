import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="grid-container py-6 border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-small font-medium text-text-primary hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </Link>
      </nav>

      {/* Contact Content */}
      <section className="grid-container pt-12 pb-section">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-display text-text-primary mb-6">
              Let's work together
            </h1>
            <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
              I'm always excited to collaborate on new projects and bring
              creative visions to life. Whether you have a specific brief or
              just want to explore possibilities, let's start a conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="glass rounded-lg p-8">
                <h2 className="text-heading-2 text-text-primary mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-small font-medium text-text-secondary mb-2"
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
                      className="w-full glass rounded-lg px-4 py-3 text-body text-text-primary placeholder-text-secondary/60 border-0 focus:ring-2 focus:ring-text-primary focus:outline-none transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-small font-medium text-text-secondary mb-2"
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
                      className="w-full glass rounded-lg px-4 py-3 text-body text-text-primary placeholder-text-secondary/60 border-0 focus:ring-2 focus:ring-text-primary focus:outline-none transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-small font-medium text-text-secondary mb-2"
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
                      className="w-full glass rounded-lg px-4 py-3 text-body text-text-primary placeholder-text-secondary/60 border-0 focus:ring-2 focus:ring-text-primary focus:outline-none transition-all duration-200 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-text-primary text-white rounded-lg px-8 py-4 text-body font-medium hover:bg-text-primary/90 transition-all duration-200 focus-visible"
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
                <h3 className="text-heading-3 text-text-primary mb-4">
                  Direct Contact
                </h3>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-3 text-body text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible"
                >
                  <Mail className="w-5 h-5" />
                  hello@example.com
                </a>
              </div>

              {/* Response Time */}
              <div className="glass rounded-lg p-8">
                <h3 className="text-heading-3 text-text-primary mb-4">
                  Response Time
                </h3>
                <p className="text-body text-text-secondary leading-relaxed">
                  I typically respond to all inquiries within 24-48 hours. For
                  urgent projects, feel free to mention it in your message.
                </p>
              </div>

              {/* Social Links */}
              <div className="glass rounded-lg p-8">
                <h3 className="text-heading-3 text-text-primary mb-4">
                  Connect
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", url: "#", handle: "@yourhandle" },
                    { name: "Instagram", url: "#", handle: "@yourhandle" },
                    { name: "Dribbble", url: "#", handle: "@yourhandle" },
                    { name: "Behance", url: "#", handle: "@yourhandle" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="inline-flex items-center gap-3 text-body text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{social.name}</span>
                      <span className="text-small text-text-secondary/70">
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
