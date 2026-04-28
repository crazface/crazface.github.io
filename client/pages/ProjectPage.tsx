import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, Project } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const foundProject = getProjectById(id);
      setProject(foundProject || null);
      setIsLoaded(true);
    }
  }, [id]);

  // Skip theme transforms
  useEffect(() => {
    document.documentElement.setAttribute("data-skip-theme", "true");
    document.body.setAttribute("data-skip-theme", "true");
    return () => {
      document.documentElement.removeAttribute("data-skip-theme");
      document.body.removeAttribute("data-skip-theme");
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-neutral-800 rounded w-48"></div>
          <div className="h-4 bg-neutral-800 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">
            Project Not Found
          </h1>
          <p className="text-neutral-400 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#FFD700] font-bold uppercase tracking-wider hover:underline"
          >
            <ArrowLeft size={18} />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FFD700] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold tracking-tighter uppercase cursor-pointer"
          >
            STAMP <span className="text-[#FFD700]">.</span>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm font-medium uppercase tracking-widest hover:text-[#FFD700] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="pt-20">
        <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
      </section>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Title + Description */}
          <div className="lg:col-span-2">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
              {project.title}
            </h1>
            {project.id === "starlight-beer" && (
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center bg-[#FFD700] text-black font-bold uppercase tracking-widest text-xs px-4 py-2">
                  Work in Progress
                </span>
                <span className="inline-flex items-center border border-[#FFD700] text-[#FFD700] font-bold uppercase tracking-widest text-xs px-4 py-2">
                  Shortlisted — Brandopus Hatch Competition
                </span>
              </div>
            )}
            {project.longDescription ? (
              <div
                className="text-lg text-neutral-400 font-light leading-relaxed space-y-4 [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            ) : (
              <p className="text-lg text-neutral-400 font-light leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Right: Details */}
          <aside className="lg:col-span-1">
            <div className="border border-neutral-800 p-8 space-y-6">
              <DetailItem label="Role" value={project.role || "Designer"} />
              <DetailItem label="Year" value={project.year} />
              <DetailItem label="Type" value={project.type} />
              {project.tools && (
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-xs border border-neutral-700 text-neutral-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* PDFs */}
      {(project.processPdf || project.finalPdf) && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <div className="space-y-8">
            {project.processPdf && (
              <PdfSection title="Process" url={project.processPdf} />
            )}
            {project.finalPdf && (
              <PdfSection title={project.id === "starlight-beer" ? "Design Outcome v1" : "Final Design Outcome"} url={project.finalPdf} />
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <h3 className="text-2xl font-bold uppercase tracking-wide mb-8 text-white">
          {project.type === "Video Editing" ? "Video" : "Gallery"}
        </h3>
        <ProjectGallery project={project} />
      </section>

      {/* Special sections */}
      {project.id === "huel-rebrand" && <HuelExtras />}
      {project.id === "regenb" && <RegenBVideo />}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="border border-neutral-800 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Interested in working together?
          </h2>
          <p className="text-neutral-400 font-light mb-8 max-w-lg mx-auto">
            I'm always excited to collaborate on new projects and bring creative
            visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center space-x-2 bg-[#FFD700] text-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={18} />
            </a>
            <a
              href="/#work"
              className="inline-flex items-center justify-center space-x-2 border border-neutral-700 text-white font-bold uppercase tracking-widest px-8 py-4 hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              <span>View More Work</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-neutral-900 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} STAMP Creative. All rights
            reserved.
          </p>
          <p className="mt-4 md:mt-0">Designed in London, UK.</p>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-lg text-white">{value}</div>
    </div>
  );
}

function PdfSection({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-neutral-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-900/50 transition-colors"
      >
        <span className="text-lg font-bold uppercase tracking-wide">
          {title}
        </span>
        <span className="text-neutral-500 text-2xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="p-6 pt-0">
          <div className="w-full h-[420px] md:h-[560px] overflow-hidden border border-neutral-800">
            <iframe src={url} title={title} className="w-full h-full" />
          </div>
          <div className="mt-4 text-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[#FFD700] font-bold uppercase tracking-wider text-sm hover:underline"
            >
              <span>Open {title} PDF</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  // Video projects
  if (project.type === "Video Editing") {
    const src = gallery[0];
    const isYoutube = /youtu(?:\.be|be\.com)/.test(src);
    const isHostedVideo =
      /\.(mp4|webm|mov)(\?|$)/i.test(src) || /o\/assets|compressed\?/.test(src);

    if (isYoutube) {
      const idMatch = src.match(
        /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/
      );
      const videoId = idMatch ? idMatch[1] : src;
      const embedSrc = videoId && !videoId.startsWith("http")
        ? `https://www.youtube.com/embed/${videoId}`
        : src;
      return (
        <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "16/9" }}>
          <iframe src={embedSrc} title={project.title} className="w-full h-full" allowFullScreen style={{ border: 0 }} />
        </div>
      );
    }

    if (isHostedVideo) {
      return (
        <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "16/9" }}>
          <video src={src} className="w-full h-full object-cover" controls playsInline />
        </div>
      );
    }

    return (
      <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "16/9" }}>
        <img src={src} alt={project.title} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Schtuff - 3x3 square grid
  if (project.id === "schtuff-ad-campaign-2022") {
    const items = gallery.slice(0, 9);
    while (items.length < 9) items.push(project.image);
    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          {items.map((src, idx) => (
            <button key={idx} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(src)}>
              <img src={src} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          ))}
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Cacophony - single centered square
  if (project.id === "cacophony-album-cover") {
    return (
      <>
        <div className="flex justify-center">
          <button className="overflow-hidden border border-neutral-800 max-w-[720px] w-full cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[0])}>
            <img src={gallery[0] || project.image} alt={project.title} className="w-full h-full object-cover" />
          </button>
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Published Book Cover - two images side by side
  if (project.id === "published-book-cover") {
    return (
      <>
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <button className="overflow-hidden border border-neutral-800 flex-1 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "3/4" }} onClick={() => setSelectedImage(gallery[0])}>
            <img src={gallery[0] || project.image} alt={project.title} className="w-full h-full object-cover" />
          </button>
          <button className="overflow-hidden border border-neutral-800 flex-1 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[1])}>
            <img src={gallery[1] || project.image} alt={`${project.title} secondary`} className="w-full h-full object-cover" />
          </button>
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Posters - 3:4 tiles
  if (project.id === "posters-2022") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, idx) => (
            <button key={idx} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "3/4" }} onClick={() => setSelectedImage(src)}>
              <img src={src} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          ))}
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Old West - 3:2 landscape
  if (project.id === "old-west-starter-kit") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gallery.map((src, idx) => (
            <button key={idx} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "3/2" }} onClick={() => setSelectedImage(src)}>
              <img src={src} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          ))}
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Pisk Kitchen - large left + 3 stacked right
  if (project.id === "pisk-kitchen") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="md:col-span-3 overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[0])}>
            <img src={gallery[0] || project.image} alt={project.title} className="w-full h-full object-cover" />
          </button>
          <div className="md:col-span-1 grid grid-rows-3 gap-4">
            {[1, 2, 3].map((i) => (
              <button key={i} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[i])}>
                <img src={gallery[i] || project.image} alt={`${project.title} ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Inside Stories - alternating 1:1 and 2:1 layout
  if (project.id === "inside-stories") {
    return (
      <>
        <div className="space-y-4">
          {/* Row 1: 1:1 left, 2:1 right - fixed row height so both align */}
          <div className="hidden md:grid md:grid-cols-3 gap-4" style={{ height: "440px" }}>
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setSelectedImage(gallery[0])}>
              <img src={gallery[0] || project.image} alt={`${project.title} 1`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
            <button className="md:col-span-2 overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setSelectedImage(gallery[1])}>
              <img src={gallery[1] || project.image} alt={`${project.title} 2`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          </div>
          {/* Mobile stack */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[0])}>
              <img src={gallery[0] || project.image} alt={`${project.title} 1`} className="w-full h-full object-cover" />
            </button>
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "2/1" }} onClick={() => setSelectedImage(gallery[1])}>
              <img src={gallery[1] || project.image} alt={`${project.title} 2`} className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Row 2: 2:1 left, 1:1 right - fixed row height so both align */}
          <div className="hidden md:grid md:grid-cols-3 gap-4" style={{ height: "440px" }}>
            <button className="md:col-span-2 overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setSelectedImage(gallery[2])}>
              <img src={gallery[2] || project.image} alt={`${project.title} 3`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setSelectedImage(gallery[3])}>
              <img src={gallery[3] || project.image} alt={`${project.title} 4`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          </div>
          {/* Mobile stack */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "2/1" }} onClick={() => setSelectedImage(gallery[2])}>
              <img src={gallery[2] || project.image} alt={`${project.title} 3`} className="w-full h-full object-cover" />
            </button>
            <button className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "1/1" }} onClick={() => setSelectedImage(gallery[3])}>
              <img src={gallery[3] || project.image} alt={`${project.title} 4`} className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Row 3: 3 A4s in a row - native ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[4, 5, 6].map((idx) => (
              <button key={idx} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setSelectedImage(gallery[idx])}>
                <img src={gallery[idx] || project.image} alt={`${project.title} ${idx + 1}`} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>

          {/* Video Section */}
          {gallery[7] && (
            <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "16/9" }}>
              {/youtu(?:\.be|be\.com)/.test(gallery[7]) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${gallery[7].match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/)?.[1] || gallery[7]}`}
                  title={`${project.title} Video`}
                  className="w-full h-full"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              ) : (
                <video src={gallery[7]} className="w-full h-full object-cover" controls playsInline />
              )}
            </div>
          )}
        </div>

        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Photography - 2:3 portrait tiles
  if (project.type === "Photography") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, idx) => (
            <button key={idx} className="overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity" style={{ aspectRatio: "2/3" }} onClick={() => setSelectedImage(src)}>
              <img src={src} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          ))}
        </div>
        <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }

  // Default gallery - masonry-like grid
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: "220px" }}>
        {gallery.map((src, idx) => {
          const isTall = idx === 2 || idx === 3;
          return (
            <button key={idx} className={`overflow-hidden border border-neutral-800 cursor-pointer hover:opacity-75 transition-opacity ${isTall ? "md:row-span-2" : ""}`} onClick={() => setSelectedImage(src)}>
              <img
                src={src}
                alt={`${project.title} ${idx + 1}`}
                className={`w-full ${isTall ? "h-full" : "h-56"} object-cover hover:scale-105 transition-transform duration-500`}
              />
            </button>
          );
        })}
      </div>
      <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}

// Reusable Lightbox Component
function GalleryLightbox({ selectedImage, onClose }: { selectedImage: string | null; onClose: () => void }) {
  return selectedImage ? (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="fixed top-8 right-8 text-[#FFD700] hover:text-white transition-colors text-5xl font-bold z-[10000] bg-black/50 rounded-full w-16 h-16 flex items-center justify-center"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <img
        src={selectedImage}
        alt="Enlarged view"
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  ) : null;
}

function HuelExtras() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
      <h3 className="text-2xl font-bold uppercase tracking-wide mb-8 text-white">
        3D Work
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "9/16" }}>
          <video
            src="https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fcc4f69106a73411a91fd622d24ecd6fc%2Fcompressed?apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6&token=cc4f69106a73411a91fd622d24ecd6fc&alt=media&optimized=true"
            className="w-full h-full object-cover"
            controls playsInline loop muted
          />
        </div>
        <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "9/16" }}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F393015e356dd489180b5cff54f869fa1"
            alt="Huel 3D work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden border border-neutral-800" style={{ aspectRatio: "9/16" }}>
          <img
            src="https://cdn.builder.io/api/v1/file/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1299210b49484dbaafd86fbe503b4cac"
            alt="Huel 3D work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function RegenBVideo() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
      <div className="overflow-hidden border border-neutral-800">
        <video
          src="https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3393eaf8aa304deb92496da795b354f3%2Fcompressed?apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6&token=3393eaf8aa304deb92496da795b354f3&alt=media&optimized=true"
          className="w-full object-cover"
          style={{ aspectRatio: "16/9" }}
          controls playsInline loop muted
        />
      </div>
    </section>
  );
}
