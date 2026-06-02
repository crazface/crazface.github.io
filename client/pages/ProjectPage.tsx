import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProjectById, Project } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [debug, setDebug] = useState(false);
  const [topSpacingMobile, setTopSpacingMobile] = useState(70);
  const [topSpacingDesktop, setTopSpacingDesktop] = useState(130);

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
      <div className="min-h-screen bg-[#f1e4d6] flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[#9d0003]/10 rounded w-48"></div>
          <div className="h-4 bg-[#9d0003]/10 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f1e4d6] text-[#9d0003] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">
            Project Not Found
          </h1>
          <p className="text-[#9d0003]/70 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#9d0003] font-bold uppercase tracking-wider hover:underline"
          >
            <ArrowLeft size={18} />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }} className="min-h-screen bg-[#f1e4d6] text-[#9d0003] font-sans selection:bg-[#9d0003] selection:text-[#f1e4d6]">
      {/* Debug Panel (hidden) */}
      {false && debug && (
        <div style={{ position:'fixed', top:10, left:10, zIndex:100000, fontFamily:'monospace', fontSize:12, color:'#fff', background:'rgba(0,0,0,0.92)', borderRadius:8, padding:12, width:300, maxHeight:'90vh', overflowY:'auto' }}>
          <label style={{ display:'block', marginBottom:8 }}>
            <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} /> Debug Mode
          </label>
          <label style={{ display:'block', marginBottom:4 }}>Title Top (Mobile): {topSpacingMobile}px</label>
          <input type="range" min={0} max={400} step={10} value={topSpacingMobile} onChange={e => setTopSpacingMobile(+e.target.value)} style={{ width:'100%', marginBottom:12 }} />
          <label style={{ display:'block', marginBottom:4 }}>Title Top (Desktop): {topSpacingDesktop}px</label>
          <input type="range" min={0} max={400} step={10} value={topSpacingDesktop} onChange={e => setTopSpacingDesktop(+e.target.value)} style={{ width:'100%', marginBottom:12 }} />
          <button onClick={() => setDebug(false)} style={{ width:'100%', padding:'6px', background:'#555', color:'#fff', border:'none', borderRadius:4, cursor:'pointer' }}>Close</button>
        </div>
      )}
      {!debug && (
        <button onClick={() => setDebug(true)} style={{ position:'fixed', top:10, left:10, zIndex:99999, padding:'6px 12px', background:'rgba(0,0,0,0.7)', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', fontSize:11 }}>Debug</button>
      )}

      {/* Navigation (matches home page) */}
      <ProjectHeader />

      {/* Project Info */}
      <section style={{ paddingTop: `${window.innerWidth >= 768 ? topSpacingDesktop : topSpacingMobile}px` }} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-lg text-[#9d0003]/60 font-bold uppercase tracking-widest mb-6">
            {project.year}
          </p>
          {project.id === "starlight-beer" && (
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center border border-[#9d0003] text-[#9d0003] font-bold uppercase tracking-widest text-xs px-4 py-2">
                Shortlisted — Brandopus Hatch Competition
              </span>
            </div>
          )}
          {project.longDescription ? (
            <div
              className="text-lg text-[#9d0003]/70 font-light leading-relaxed space-y-4 [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
          ) : (
            <p className="text-lg text-[#9d0003]/70 font-light leading-relaxed">
              {project.description}
            </p>
          )}
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
              <PdfSection title={project.id === "starlight-beer" ? "Design Outcome" : "Final Design Outcome"} url={project.finalPdf} />
            )}
          </div>
        </section>
      )}

      {/* Gallery - full screen-wide scroll */}
      <section className="w-full pb-20">
        <ProjectGallery project={project} />
      </section>

      {/* Special sections */}
      {project.id === "huel-rebrand" && <HuelExtras />}
      {project.id === "regenb" && <RegenBVideo />}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="border border-[#9d0003]/20 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Interested in working together?
          </h2>
          <p className="text-[#9d0003]/70 font-light mb-8 max-w-lg mx-auto">
            I'm always excited to collaborate on new projects and bring creative
            visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#bottom-actions"
              className="inline-flex items-center justify-center space-x-2 bg-[#9d0003] text-[#f1e4d6] font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#7a0002] transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={18} />
            </a>
            <a
              href="/#work"
              className="inline-flex items-center justify-center space-x-2 border border-[#9d0003]/30 text-[#9d0003] font-bold uppercase tracking-widest px-8 py-4 hover:border-[#9d0003] hover:text-[#9d0003] transition-colors"
            >
              <span>View More Work</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e7d4c0] py-8 border-t border-[#9d0003]/20 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-[#9d0003]/60 font-mono">
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

function ProjectHeader() {
  const navigate = useNavigate();
  const stickyRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const hiddenRef = useRef(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    function applyTransform() {
      if (stickyRef.current) {
        const offset = hiddenRef.current ? -160 : 0;
        stickyRef.current.style.transform = `translateY(${offset}px) scale(${scaleRef.current})`;
      }
    }
    function resize() {
      scaleRef.current = window.innerWidth / 1440;
      applyTransform();
    }
    function onScroll() {
      const y = window.scrollY;
      // Only start hiding after scrolling past the title/intro area
      const shouldHide = y > 300 && y > lastYRef.current;
      if (shouldHide !== hiddenRef.current) {
        hiddenRef.current = shouldHide;
        if (stickyRef.current) stickyRef.current.style.transition = "transform 0.3s ease";
        applyTransform();
      }
      lastYRef.current = y;
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navImg =
    "https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Ff13df9c3652c4cc8b4ee870c5b3fd59a";

  return (
    <div
      ref={stickyRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "1440px",
        zIndex: 10000,
        transformOrigin: "top left",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "absolute", top: "-12.0317px", left: "1px", width: "1438.55px", zIndex: 129 }}>
        <img src={navImg} alt="Navigation" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "33px",
          left: 0,
          width: "1440px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 160px",
          boxSizing: "border-box",
          zIndex: 10001,
          pointerEvents: "auto",
        }}
      >
        <p
          onClick={() => navigate("/")}
          style={{ color: "#9d0003", fontFamily: "Arial,sans-serif", fontWeight: "bold", fontSize: "24px", margin: 0, cursor: "pointer" }}
        >
          Charlie Stamp
        </p>
        <div style={{ display: "flex", gap: "40px" }}>
          {["home", "work", "contact"].map((label) => (
            <button
              key={label}
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", color: "#9d0003", fontFamily: "Arial,sans-serif", fontWeight: "bold", fontSize: "20px", cursor: "pointer", padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PdfSection({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#9d0003]/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#9d0003]/5 transition-colors"
      >
        <span className="text-lg font-bold uppercase tracking-wide">
          {title}
        </span>
        <span className="text-[#9d0003]/60 text-2xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="p-6 pt-0">
          <div className="w-full h-[420px] md:h-[560px] overflow-hidden border border-[#9d0003]/20">
            <iframe src={url} title={title} className="w-full h-full" />
          </div>
          <div className="mt-4 text-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[#9d0003] font-bold uppercase tracking-wider text-sm hover:underline"
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

  // Full-width media you scroll through
  const renderItem = (src: string, idx: number) => {
    const isYoutube = /youtu(?:\.be|be\.com)/.test(src);
    const isHostedVideo =
      /\.(mp4|webm|mov)(\?|$)/i.test(src) || /o\/assets|compressed\?/.test(src);

    if (isYoutube) {
      const idMatch = src.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
      const videoId = idMatch ? idMatch[1] : src;
      const embedSrc =
        videoId && !videoId.startsWith("http")
          ? `https://www.youtube.com/embed/${videoId}`
          : src;
      return (
        <div key={idx} className="w-full" style={{ aspectRatio: "16/9" }}>
          <iframe src={embedSrc} title={`${project.title} ${idx + 1}`} className="w-full h-full" allowFullScreen style={{ border: 0 }} />
        </div>
      );
    }

    if (isHostedVideo) {
      return <video key={idx} src={src} className="w-full block" controls playsInline />;
    }

    return (
      <div key={idx} className="w-full flex justify-center">
        <img
          src={src}
          alt={`${project.title} ${idx + 1}`}
          className="h-[clamp(280px,56vw,920px)] w-auto max-w-full object-contain block cursor-zoom-in"
          onClick={() => setSelectedImage(src)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[1700px] mx-auto px-4 md:px-8">
        {gallery.map((src, idx) => renderItem(src, idx))}
      </div>
      <GalleryLightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}

// Reusable Lightbox Component
function GalleryLightbox({ selectedImage, onClose }: { selectedImage: string | null; onClose: () => void }) {
  return selectedImage ? (
    <div
      className="fixed inset-0 z-[10050] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="fixed top-8 right-8 text-[#f1e4d6] hover:text-white transition-colors text-5xl font-bold z-[10060] bg-[#9d0003]/80 rounded-full w-16 h-16 flex items-center justify-center"
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
      <h3 className="text-2xl font-bold uppercase tracking-wide mb-8 text-[#9d0003]">
        3D Work
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="overflow-hidden border border-[#9d0003]/20" style={{ aspectRatio: "9/16" }}>
          <video
            src="https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fcc4f69106a73411a91fd622d24ecd6fc%2Fcompressed?apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6&token=cc4f69106a73411a91fd622d24ecd6fc&alt=media&optimized=true"
            className="w-full h-full object-cover"
            controls playsInline loop muted
          />
        </div>
        <div className="overflow-hidden border border-[#9d0003]/20" style={{ aspectRatio: "9/16" }}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F393015e356dd489180b5cff54f869fa1"
            alt="Huel 3D work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden border border-[#9d0003]/20" style={{ aspectRatio: "9/16" }}>
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
      <div className="overflow-hidden border border-[#9d0003]/20">
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
