import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { useTheme } from "@/hooks/use-theme";

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<null | { type: 'success' | 'error'; message: string }>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const json = await res.json();
      setStatus({ type: 'success', message: json.message || 'Message sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
      // eslint-disable-next-line no-console
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Header */}
      <Header />

      {/* Contact Content */}
      <section className="grid-container pt-32 pb-section">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl font-black leading-none tracking-tight text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg font-normal leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's collaborate and create something
              amazing together.
            </p>
          </div>

          {/* Contact Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <div
              className="glass rounded-lg p-8 text-center animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">
                Email
              </h3>
              <a
                href="mailto:charlie@charliestamp.com"
                className="text-lg text-foreground hover:text-primary transition-colors"
              >
                charlie@charliestamp.com
              </a>
            </div>

            {/* Social Links Card */}
            <div
              className="glass rounded-lg p-8 text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-2xl font-black text-foreground mb-6">
                Connect with me
              </h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/charlie-stamp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Twitter coming soon"
                  className="w-12 h-12 opacity-60 cursor-not-allowed rounded-2xl flex items-center justify-center text-primary-foreground bg-primary/40"
                  aria-label="Twitter (coming soon)"
                >
                  {theme === "light" ? (
                    // Twitter bird icon for light mode
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  ) : (
                    // X logo for dark mode
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </a>
                <a
                  href="https://www.instagram.com/the.stamp.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Status message for form submissions */}
          {status ? (
            <div
              className={`mt-6 mb-6 p-4 rounded-lg text-center ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
              role="status"
            >
              {status.message}
            </div>
          ) : null}

          {/* Contact Form */}
          <div
            className="glass rounded-lg p-8 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground mb-6 text-center">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200"
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
                    className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
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
                  className="w-full glass rounded-lg px-4 py-3 text-lg text-foreground placeholder-muted-foreground/60 border-0 focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 glass border border-foreground/20 rounded-lg px-8 py-4 text-lg font-black text-foreground hover:bg-foreground/10 transition-all duration-200 focus-visible ${
                  isSubmitting ? 'opacity-60 cursor-wait' : ''
                }`}
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
