import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, Project } from "@/lib/projects";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProject = getProjectById(id);
      setProject(foundProject || null);
      setIsLoaded(true);
    }
  }, [id]);

  // Set project-branded class and data attribute after project loads
  useEffect(() => {
    const body = document.body;

    // add a project-type body class so styles can be scoped per project type
    if (project) {
      const typeSlug = `project-type-${String(
        project.type || project.id || "project",
      )
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      body.classList.add(typeSlug);
      // store the slug on body for cleanup
      (body as any)._projectTypeSlug = typeSlug;
    }

    if (project?.brandTheme) {
      body.classList.add("project-branded");
      body.setAttribute("data-skip-theme", "true");
    } else {
      body.classList.remove("project-branded");
      body.removeAttribute("data-skip-theme");
    }

    return () => {
      // cleanup project-type class
      try {
        const slug = (body as any)._projectTypeSlug;
        if (slug) body.classList.remove(slug);
        delete (body as any)._projectTypeSlug;
      } catch {}
    };
  }, [project]);

  // Cleanup on unmount so other pages get the global theme again
  useEffect(() => {
    return () => {
      if (project?.brandTheme) {
        const b = document.body;
        b.classList.remove("project-branded");
        b.removeAttribute("data-skip-theme");
        // Clear inline theme locks
        const root = document.documentElement;
        [
          "--project-bg",
          "--project-fg",
          "--project-primary",
          "--project-secondary",
          "--background",
          "--foreground",
          "--primary",
          "--secondary",
        ].forEach((k) => {
          root.style.removeProperty(k);
          document.body.style.removeProperty(k);
        });
      }
    };
  }, [project]);

  // ThemeLock effect - sets variables with !important and guards against late rewrites
  useEffect(() => {
    if (!project?.brandTheme) return;

    console.log(
      "Applying theme for project:",
      project.title,
      project.brandTheme,
    );

    const root = document.documentElement;
    const body = document.body;

    const COLORS = {
      bg: project.brandTheme.background,
      fg: project.brandTheme.text,
      primary: project.brandTheme.highlight,
      secondary: project.brandTheme.text,
    };

    // Set CSS variables with priority so later styles cannot override them
    const setVars = () => {
      // Set project-specific variables
      root.style.setProperty("--project-bg", COLORS.bg, "important");
      root.style.setProperty("--project-fg", COLORS.fg, "important");
      root.style.setProperty("--project-primary", COLORS.primary, "important");
      root.style.setProperty(
        "--project-secondary",
        COLORS.secondary,
        "important",
      );

      // Set direct color values to global tokens (not CSS variables)
      body.style.setProperty("--background", COLORS.bg, "important");
      body.style.setProperty("--foreground", COLORS.fg, "important");
      body.style.setProperty("--primary", COLORS.primary, "important");
      body.style.setProperty("--secondary", COLORS.secondary, "important");

      // Also set direct styles on body using setProperty so priority can be applied correctly
      body.style.setProperty("background-color", COLORS.bg, "important");
      body.style.setProperty("color", COLORS.fg, "important");
    };

    // Remove any global theme classes that could trigger css
    document.documentElement.classList.remove("dark", "light");

    setVars();

    // Guard for late scripts for 3 seconds
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setVars();
      if (t >= 10) clearInterval(id);
    }, 300);

    return () => clearInterval(id);
  }, [project?.brandTheme]);

  // Photo focus overlay script (runs in React so it executes properly)
  useEffect(() => {
    // Create overlay and image
    const overlay = document.createElement("div");
    overlay.className = "photo-focus-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photo preview");
    (overlay as any).tabIndex = -1;

    const img = document.createElement("img");
    img.className = "photo-focus-img";
    overlay.appendChild(img);

    // Close button for accessibility and clarity
    const closeBtn = document.createElement("button");
    closeBtn.className = "photo-focus-close";
    closeBtn.setAttribute("aria-label", "Close preview");
    closeBtn.innerHTML = "&times;"; // simple 'x'
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeOverlay();
    });
    overlay.appendChild(closeBtn);

    // Append to root html so positioning is measured from the document, not from any transformed ancestor
    document.documentElement.appendChild(overlay);

    let opener: HTMLElement | null = null;

    function lockScroll() {
      const y = window.scrollY || 0;
      document.body.dataset.lockY = String(y);
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + y + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    }

    function unlockScroll() {
      const y = parseInt(document.body.dataset.lockY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      delete (document.body as any).dataset.lockY;
      window.scrollTo(0, y);
    }

    // Ensure the overlay covers the user's viewport position (not the document top)
    function positionOverlayAtViewport() {
      // Put overlay in document coordinates at the current scroll position and size of viewport
      overlay.style.position = "absolute";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.top = String(window.scrollY || 0) + "px";
      overlay.style.height = String(window.innerHeight || 0) + "px";
    }

    function clearOverlayPositioning() {
      overlay.style.position = "";
      overlay.style.left = "";
      overlay.style.width = "";
      overlay.style.top = "";
      overlay.style.height = "";
    }

    function openOverlay(
      src: string,
      alt: string,
      triggerEl: HTMLElement | null,
    ) {
      opener = triggerEl;
      img.src = src;
      img.alt = alt || "";
      // position overlay at current viewport first so centering is correct
      positionOverlayAtViewport();
      // If viewport changes (resize), update overlay sizing
      window.addEventListener("resize", positionOverlayAtViewport);
      lockScroll();
      overlay.classList.add("open");
      requestAnimationFrame(() => {
        try {
          (overlay as any).focus({ preventScroll: true });
        } catch {
          (overlay as any).focus();
        }
      });
    }

    function closeOverlay() {
      overlay.classList.remove("open");
      img.removeAttribute("src");
      window.removeEventListener("resize", positionOverlayAtViewport);
      clearOverlayPositioning();
      unlockScroll();
      if (opener && (opener as any).focus) (opener as any).focus();
    }

    function onDocClick(e: MouseEvent) {
      const target =
        (e.target as Element) &&
        (e.target as Element).closest &&
        ((e.target as Element).closest(
          'img[data-focusable="true"], img[data-photo="true"], img.photo-thumb',
        ) as HTMLImageElement | null);
      if (!target) return;
      e.preventDefault();
      const src =
        target.getAttribute("data-full") ||
        (target as any).currentSrc ||
        target.src;
      const alt = target.alt || "Photo";
      openOverlay(src, alt, target as HTMLElement);
    }

    function onOverlayClick(e: MouseEvent) {
      if (e.target === overlay) closeOverlay();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && overlay.classList.contains("open"))
        closeOverlay();
    }

    document.addEventListener("click", onDocClick);
    overlay.addEventListener("click", onOverlayClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", () => {
      try {
        overlay.remove();
      } catch {}
    });

    return () => {
      document.removeEventListener("click", onDocClick);
      overlay.removeEventListener("click", onOverlayClick);
      document.removeEventListener("keydown", onKey);
      try {
        overlay.remove();
      } catch {}
      // ensure scroll unlocked if left locked
      if ((document.body as any).dataset.lockY) {
        const y = parseInt((document.body as any).dataset.lockY || "0", 10);
        window.scrollTo(0, y);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.paddingRight = "";
        delete (document.body as any).dataset.lockY;
      }
    };
  }, []);

  // Hide theme toggle for project pages with brandTheme
  useEffect(() => {
    if (!project?.brandTheme) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-toggle-display", "none");

    return () => {
      root.style.removeProperty("--theme-toggle-display");
    };
  }, [project]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass rounded-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="grid-container pt-32 flex items-center justify-center">
          <div className="glass rounded-lg p-8 text-center max-w-md">
            <h1 className="text-3xl font-black text-foreground mb-4">
              Project Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-lg font-bold text-foreground hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible"
            >
              Back to Work
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Flicker prevention script */}
      {project?.brandTheme && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var b = document.body;
    b.classList.add("project-branded");
    b.setAttribute("data-skip-theme","true");
    var root = document.documentElement;
    if (!root.style.getPropertyValue("--project-bg")) {
      root.style.setProperty("--project-bg", "${project.brandTheme.background}");
      root.style.setProperty("--project-fg", "${project.brandTheme.text}");
      root.style.setProperty("--project-primary", "${project.brandTheme.highlight}");
      root.style.setProperty("--project-secondary", "${project.brandTheme.text}");
    }
  } catch(e){}
})();
            `,
          }}
        />
      )}
      {/* Header */}
      <Header />
      <div
        dangerouslySetInnerHTML={{
          __html: `
<style>
  /* Keep the site header above the overlay only for project pages so global header styles are unaffected */
  body[class*="project-type-"] #siteHeader,
  body[class*="project-type-"] #site-header,
  body[class*="project-type-"] .site-header {
    position: relative;          /* or sticky or fixed if you already use that */
    z-index: 2147483647;         /* higher than overlay */
  }

  /* Fullscreen dimmer that centers content in the viewport */
  .photo-focus-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.72);
    display: grid;
    place-items: center;
    padding: 24px;
    z-index: 2147483646;         /* just under the header */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease;
    outline: none;
  }
  .photo-focus-overlay.open { opacity: 1; pointer-events: auto; }

  /* Close button for overlay */
  .photo-focus-close {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    z-index: 2147483650;
  }
  .photo-focus-close:focus { outline: 2px solid rgba(255,255,255,0.9); }

  /* Focused photo styles */
  .photo-focus-img {
    max-width: min(90vw, 1400px);
    max-height: 90vh;
    display: block;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    transform: scale(0.96);
    transition: transform 0.18s ease;
  }
  .photo-focus-overlay.open .photo-focus-img { transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .photo-focus-overlay, .photo-focus-img { transition: none; }
  }
</style>

`,
        }}
      />

      {/* Gallery / Project content - render Graphic Design layout separately */}
      {project.type === "Graphic Design" ? (
        <main>
          {/* Hero */}
          <section className="grid-container pt-12 pb-8">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="glass rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </section>

          {/* Title + Details two column */}
          <section className="grid-container pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div
                className="lg:col-span-2 animate-slide-up"
                style={{ animationDelay: "0.25s" }}
              >
                <h1 className="text-4xl font-black text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {project.longDescription || project.description}
                </p>
              </div>

              <aside
                className="animate-slide-up lg:col-span-1"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Project Details
                  </h3>
                  <div className="text-sm text-muted-foreground mb-2">Role</div>
                  <div className="text-lg text-foreground mb-3">
                    {project.role || "Creative Director"}
                  </div>

                  <div className="text-sm text-muted-foreground mb-2">Year</div>
                  <div className="text-lg text-foreground mb-3">
                    {project.year}
                  </div>

                  <div className="text-sm text-muted-foreground mb-2">Type</div>
                  <div className="text-lg text-foreground mb-3">
                    {project.type}
                  </div>

                  {project.tools && (
                    <>
                      <div className="text-sm text-muted-foreground mb-2">
                        Tools
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 rounded-full text-xs bg-white/50 text-foreground border border-white/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </aside>
            </div>
          </section>

          {/* Gallery */}
          {/* Process & Final Design PDFs (accordion) */}
          {(project.processPdf || project.finalPdf) && (
            <section className="grid-container pb-10">
              <div
                className="glass rounded-lg p-8 animate-slide-up"
                style={{ animationDelay: "0.38s" }}
              >
                <Accordion type="single" collapsible>
                  {project.processPdf && (
                    <AccordionItem value="process">
                      <AccordionTrigger className="text-lg">
                        Process
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full h-[420px] md:h-[560px] rounded-lg overflow-hidden border border-white/10">
                          <iframe
                            src={project.processPdf}
                            title="Process document"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <a
                            href={project.processPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-primary project-cta-button font-bold"
                          >
                            Open Process PDF
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {project.finalPdf && (
                    <AccordionItem value="final">
                      <AccordionTrigger className="text-lg">
                        Final Design Outcome
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="w-full h-[420px] md:h-[560px] rounded-lg overflow-hidden border border-white/10">
                          <iframe
                            src={project.finalPdf}
                            title="Final design outcome"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <a
                            href={project.finalPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-primary project-cta-button font-bold"
                          >
                            Open Final PDF
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </section>
          )}

          <section className="grid-container pb-20">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.35s" }}
            >
              {project.id !== "cacophony-album-cover" && (
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Gallery
                </h3>
              )}
              {project.id === "schtuff-ad-campaign-2022" ? (
                // 3x3 square gallery for Schtuff ad campaign
                <div className="grid grid-cols-3 gap-6">
                  {(() => {
                    const gallery =
                      project.gallery && project.gallery.length > 0
                        ? project.gallery
                        : [];
                    const items = gallery.slice(0, 9);
                    if (items.length < 9)
                      items.push(
                        ...new Array(9 - items.length).fill(project.image),
                      );
                    return items.map((src, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-sm"
                      >
                        <img
                          src={src}
                          alt={`${project.title} gallery item ${idx + 1}`}
                          data-focusable="true"
                          className="w-full h-full object-cover transition-transform duration-500"
                          style={{ aspectRatio: "1 / 1" }}
                        />
                      </div>
                    ));
                  })()}
                </div>
              ) : project.id === "cacophony-album-cover" ? (
                // Single centered 1:1 image for Cacophony
                <div className="flex justify-center">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-sm max-w-[720px] w-full">
                    <img
                      src={project.gallery && project.gallery[0] ? project.gallery[0] : project.image}
                      alt={`${project.title} gallery`}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "1 / 1" }}
                      data-focusable="true"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  style={{ gridAutoRows: "220px" }}
                >
                  {(project.gallery && project.gallery.length > 0
                    ? project.gallery
                    : new Array(6).fill(project.image)
                  ).map((src, idx) => {
                    // Make items 3 and 4 (0-based idx 2 and 3) tall
                    const isTallRight = idx === 2; // third item -> tall on right column
                    const isTallLeft = idx === 3; // fourth item -> tall starting left column (second row)

                    let itemClass =
                      "rounded-2xl overflow-hidden border border-white/10 shadow-sm";
                    if (isTallRight)
                      itemClass += " md:col-start-3 md:row-span-2";
                    if (isTallLeft)
                      itemClass += " md:col-start-1 md:row-span-2";

                    return (
                      <div key={idx} className={itemClass}>
                        <img
                          src={src}
                          alt={`${project.title} gallery item ${idx + 1}`}
                          data-focusable="true"
                          className={`w-full ${isTallRight || isTallLeft ? "h-full" : "h-56"} object-cover hover:scale-105 transition-transform duration-500`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {project.id === "huel-rebrand" && (
            <section className="grid-container pb-10">
              <div className="animate-slide-up" style={{ animationDelay: "0.38s" }}>
                <h3 className="text-2xl font-bold text-foreground mb-6">3D Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-sm">
                    <video
                      src="https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fcc4f69106a73411a91fd622d24ecd6fc%2Fcompressed?apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6&token=cc4f69106a73411a91fd622d24ecd6fc&alt=media&optimized=true"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: "9 / 16" }}
                      controls
                      playsInline
                      loop
                      muted
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F393015e356dd489180b5cff54f869fa1"
                      alt="Huel 3D work 2"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: "9 / 16" }}
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/file/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1299210b49484dbaafd86fbe503b4cac"
                      alt="Huel 3D work 3"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: "9 / 16" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {project.id === "regenb" && (
            <section className="grid-container pb-20">
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-sm">
                  <video
                    src="https://cdn.builder.io/o/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3393eaf8aa304deb92496da795b354f3%2Fcompressed?apiKey=1a7d8b4d8c7d4879aa4c7843b68daea6&token=3393eaf8aa304deb92496da795b354f3&alt=media&optimized=true"
                    className="w-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                    controls
                    playsInline
                    loop
                    muted
                  />
                </div>
              </div>
            </section>
          )}
        </main>
      ) : (
        // Default layout (used for Photography, Video, 3D, etc.) - unchanged
        <section
          className="grid-container pb-20"
          style={{ margin: "30px auto 0", padding: "0 24px 80px" }}
        >
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Use project.gallery if available, otherwise fall back to repeated project.image */}
              {(project.gallery && project.gallery.length > 0
                ? project.gallery
                : new Array(6).fill(project.image)
              ).map((src, idx) => {
                // Replace the third gallery item (index 2) with the Project Details box
                if (idx === 2) {
                  return (
                    <div
                      key="project-details"
                      className="glass rounded-lg p-6 h-full flex flex-col"
                      style={{ marginBottom: "-2px" }}
                    >
                      <div className="text-2xl font-black text-foreground mb-2">
                        {project.title}
                      </div>

                      {/* Middle area stretches and spaces items vertically */}
                      <div className="flex-1 flex flex-col justify-between mt-2">
                        <div>
                          <div
                            className="text-sm font-bold text-muted-foreground mb-1"
                            style={{
                              color: "rgb(103,94,76)",
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "20px",
                              marginBottom: "4px",
                            }}
                          >
                            Description
                          </div>
                          <div
                            className="text-base font-thin text-foreground"
                            style={{
                              fontSize: "18px",
                              fontWeight: 400,
                              lineHeight: "28px",
                            }}
                          >
                            {project.description}
                          </div>
                        </div>

                        <div>
                          <div>
                            <div
                              className="text-sm font-bold text-muted-foreground mb-1"
                              style={{
                                color: "rgb(103,94,76)",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "20px",
                                marginBottom: "4px",
                              }}
                            >
                              Role
                            </div>
                            <div className="text-lg text-foreground">
                              {project.role || "Creative Director"}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div
                              className="text-sm font-bold text-muted-foreground mb-1"
                              style={{
                                color: "rgb(103,94,76)",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "20px",
                                marginBottom: "4px",
                              }}
                            >
                              Year
                            </div>
                            <div className="text-lg text-foreground">
                              {project.year}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div
                              className="text-sm font-bold text-muted-foreground mb-1"
                              style={{
                                color: "rgb(103,94,76)",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "20px",
                                marginBottom: "4px",
                              }}
                            >
                              Type
                            </div>
                            <div className="text-lg text-foreground capitalize">
                              {project.id === "portrait-series"
                                ? "wedding photography"
                                : project.type}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tools at bottom */}
                      {project.tools && (
                        <div className="mt-4">
                          <div className="text-sm font-bold text-muted-foreground mb-2">
                            Tools
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1 rounded-full text-xs bg-white/50 text-foreground border border-white/20"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="glass rounded-lg overflow-hidden hover:shadow-glass-lg transition-all duration-300"
                    style={
                      project.type === "Photography"
                        ? { aspectRatio: "2 / 3" }
                        : undefined
                    }
                  >
                    <img
                      src={src}
                      alt={`${project.title} gallery item ${idx + 1}`}
                      data-focusable="true"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="grid-container pb-section">
        <div
          className="glass rounded-lg p-12 text-center animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-3xl font-black text-foreground mb-4">
            Interested in working together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always excited to collaborate on new projects and bring creative
            visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-black transition-all duration-200 focus-visible project-cta-button"
              style={{
                backgroundColor: project?.brandTheme
                  ? project.brandTheme.background
                  : "hsl(var(--primary))",
                color: project?.brandTheme
                  ? project.brandTheme.highlight
                  : "white",
              }}
            >
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 glass rounded-full px-8 py-4 text-lg font-black text-foreground hover:bg-white/80 hover:shadow-glass transition-all duration-200 focus-visible"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
