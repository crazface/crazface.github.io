import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cdn = (id: string) =>
  `https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F${id}`;

type Kind = 'plain' | 'shadow' | 'popout' | 'text' | 'actions';

interface LItem {
  key: string;
  kind: Kind;
  top: number;
  left: number;
  width?: number;
  z: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
  src?: string;
  alt?: string;
  link?: string;
}

const INITIAL_ITEMS: LItem[] = [
  // ── Backgrounds ──
  { key: 'top-bg', kind: 'plain', top: 0, left: 0, width: 1440, z: 1, src: cdn('1530d8222ea34ff39c230b8bbbd4ade7'), alt: '' },
  { key: 'hero-title', kind: 'plain', top: 207.902, left: 14.1656, width: 1390.74, z: 133, src: cdn('22c4b55d9b29465ba37f08f5b89c9baa'), alt: 'Stamp Creative' },
  { key: 'tea-spill', kind: 'plain', top: 4035.58, left: 1103.83, width: 338.656, z: 283, opacity: 0.85, src: cdn('2625da861d76461a9e04a77d76f24720'), alt: 'Tea Spill' },
  { key: 'bottom-bg', kind: 'plain', top: 4730.6, left: -9.7947, width: 1453.03, z: 293, src: cdn('3eb12f515b2f418ba6d144fe0c93b11e'), alt: '' },

  // ── Brand assets (shadow) ──
  { key: 'starlight-img', kind: 'shadow', top: 962.722, left: 80.9073, width: 1283.72, z: 0, rotate: 0.05, src: cdn('5e8276c7560844a7bb23960025d476dc'), alt: 'Starlight Image' },
  { key: 'brandopus', kind: 'shadow', top: 911.444, left: 838.185, width: 580.742, z: 166, rotate: -0.73, src: cdn('47d3bee759ef4c9682aea6efa4a20ccf'), alt: 'BrandOpus' },
  { key: 'inside-img', kind: 'shadow', top: 1855.1, left: -0.298013, width: 1393.11, z: 203, rotate: -0.18, src: cdn('e05478abd26e40589a95040ef320e3cf'), alt: 'Inside Stories Image' },
  { key: 'aya-img', kind: 'shadow', top: 2519.34, left: 70.9801, width: 1351.26, z: 193, rotate: -1.24, src: cdn('b49bbe412e7146c5b3f9cb83f65a1a55'), alt: 'Aya Image' },
  { key: 'phone', kind: 'shadow', top: 2790.28, left: 1046.54, width: 404.166, z: 289, rotate: 0.25, src: cdn('3d73a7328e1a4a77983bd66913be6b02'), alt: 'Phone' },
  { key: 'regenb-img', kind: 'shadow', top: 3304, left: -4.81457, width: 1419.68, z: 287, rotate: 0.17, src: cdn('ddf5aeafe88f4461b4bdcf7178899e70'), alt: 'RegenB Image' },
  { key: 'flow-img', kind: 'shadow', top: 3926.81, left: 25.9073, width: 1106, z: 284, rotate: 2, src: cdn('8869078d3da3415ab58d8338f1812359'), alt: 'Flow Image' },

  // ── Logos (popout + link) ──
  { key: 'starlight-logo', kind: 'popout', top: 1441.17, left: 14.9073, width: 545.351, z: 205, rotate: -0.91, src: cdn('437cd92f7a8143268a3bf09e074fd796'), alt: 'Starlight Logo', link: '/project/starlight-beer' },
  { key: 'inside-logo', kind: 'popout', top: 2325.44, left: 758.815, width: 382.371, z: 204, rotate: -0.05, src: cdn('8f7a3735549d489a91d2536c4c59f821'), alt: 'Inside Stories Logo', link: '/project/inside-stories' },
  { key: 'aya-logo', kind: 'popout', top: 3087.63, left: 12.6291, width: 554.464, z: 288, rotate: 0.01, src: cdn('30ed9c00fb28428cbefc39036d534225'), alt: 'AYA Logo' },
  { key: 'regenb-logo', kind: 'popout', top: 3817.7, left: 465.834, width: 589.89, z: 290, rotate: 0.57, src: cdn('08b6e5c4bdbe44489df684a204ea604c'), alt: 'RegenB Logo', link: '/project/regenb' },
  { key: 'flow-logo', kind: 'popout', top: 4487.3, left: 871.371, width: 564, z: 291, rotate: 1.87, src: cdn('3fb99cbbc54243ab9be8466e97e7023a'), alt: 'Flow Logo', link: '/project/flow' },

  // ── CTA ──
  { key: 'cta-img', kind: 'plain', top: 5125, left: 64.2781, width: 1328.33, z: 294, src: cdn('072cd11f594b47afbb3cecd540201d87'), alt: "Let's Create Something" },

  // ── Typography / actions ──
  { key: 'intro-text-left', kind: 'text', top: 764, left: 65, scale: 1.01471, z: 150 },
  { key: 'intro-text-right', kind: 'text', top: 764.758, left: 1040, scale: 1, z: 150 },
  { key: 'bottom-actions', kind: 'actions', top: 5664.47, left: 62, scale: 1.79411, z: 300 },
  { key: 'email-text', kind: 'text', top: 5827.29, left: 75, scale: 1.96471, z: 300 },
];

const SHADOW = 'drop-shadow(8px 12px 15px rgba(80, 10, 5, 0.45))';
const SHADOW_HOVER = 'drop-shadow(12px 18px 20px rgba(80, 10, 5, 0.6))';
const textStyle: React.CSSProperties = {
  color: '#9d0003',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: 1.3,
};

const r = (n: number) => Math.round(n * 1000) / 1000;

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [copyText, setCopyText] = useState('Copy Email');
  const navigate = useNavigate();

  // Debug / configurator state
  const [debug, setDebug] = useState(false);
  const [items, setItems] = useState<LItem[]>(INITIAL_ITEMS);
  const [selected, setSelected] = useState<string | null>(null);
  const [mockupUrl, setMockupUrl] = useState('');
  const [mockupOpacity, setMockupOpacity] = useState(0.3);
  const [outputCopied, setOutputCopied] = useState(false);
  const drag = useRef<any>(null);

  useEffect(() => {
    // Global theme applies a transform to <body> which breaks position:fixed; disable on this page.
    document.body.setAttribute('data-skip-theme', 'true');
    return () => document.body.removeAttribute('data-skip-theme');
  }, []);

  useEffect(() => {
    function resizeLayout() {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;
      const scale = window.innerWidth / 1440;
      canvas.style.transform = `scale(${scale})`;
      if (stickyRef.current) stickyRef.current.style.transform = `scale(${scale})`;
      wrapper.style.height = `${5959 * scale}px`;
    }
    resizeLayout();
    window.addEventListener('resize', resizeLayout);
    return () => window.removeEventListener('resize', resizeLayout);
  }, []);

  // Drag listeners (only active in debug mode)
  useEffect(() => {
    if (!debug) return;

    function onMove(e: MouseEvent) {
      const d = drag.current;
      if (!d) return;
      const scale = window.innerWidth / 1440;
      const dx = (e.clientX - d.startX) / scale;
      const dy = (e.clientY - d.startY) / scale;
      setItems(prev =>
        prev.map(it => {
          if (it.key !== d.key) return it;
          if (d.mode === 'move') return { ...it, top: d.start.top + dy, left: d.start.left + dx };
          if (d.mode === 'resize') {
            if (it.kind === 'text' || it.kind === 'actions') {
              return { ...it, scale: Math.max(0.1, +(d.start.scale + dx / 200).toFixed(4)) };
            }
            return { ...it, width: Math.max(20, d.start.width + dx) };
          }
          if (d.mode === 'rotate') {
            const angle = (Math.atan2(e.clientY - d.cy, e.clientX - d.cx) * 180) / Math.PI;
            return { ...it, rotate: +(d.start.rotate + (angle - d.startAngle)).toFixed(2) };
          }
          return it;
        }),
      );
    }
    function onUp() {
      drag.current = null;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [debug]);

  function onItemDown(e: React.MouseEvent, it: LItem) {
    if (!debug) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected(it.key);
    drag.current = {
      key: it.key,
      mode: 'move',
      startX: e.clientX,
      startY: e.clientY,
      start: { top: it.top, left: it.left, width: it.width ?? 0, scale: it.scale ?? 1, rotate: it.rotate ?? 0 },
    };
  }

  function onHandleDown(e: React.MouseEvent, it: LItem, mode: 'resize' | 'rotate') {
    e.preventDefault();
    e.stopPropagation();
    setSelected(it.key);
    const wrap = (e.target as HTMLElement).closest('[data-item]') as HTMLElement;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    drag.current = {
      key: it.key,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      cx,
      cy,
      startAngle,
      start: { top: it.top, left: it.left, width: it.width ?? 0, scale: it.scale ?? 1, rotate: it.rotate ?? 0 },
    };
  }

  function scrollToSection(id: string) {
    if (debug) return;
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -150;
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText('CharlieStampCreative@gmail.com').then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Email'), 2000);
    });
  }

  const output = items
    .map(it => {
      const parts = [`top: ${r(it.top)}px`, `left: ${r(it.left)}px`];
      if (it.width != null) parts.push(`width: ${r(it.width)}px`);
      if (it.kind === 'text' || it.kind === 'actions') parts.push(`scale: ${it.scale}`);
      if (it.rotate) parts.push(`rotate: ${it.rotate}deg`);
      parts.push(`z: ${it.z}`);
      return `[${it.key}] ${parts.join('; ')}`;
    })
    .join('\n');

  function copyOutput() {
    navigator.clipboard.writeText(output).then(() => {
      setOutputCopied(true);
      setTimeout(() => setOutputCopied(false), 2000);
    });
  }

  function renderContent(it: LItem) {
    if (it.kind === 'plain') {
      return <img src={it.src} alt={it.alt} style={{ width: '100%', height: 'auto', display: 'block' }} draggable={false} />;
    }
    if (it.kind === 'shadow') {
      return (
        <div style={{ filter: SHADOW }}>
          <img src={it.src} alt={it.alt} style={{ width: '100%', height: 'auto', display: 'block' }} draggable={false} />
        </div>
      );
    }
    if (it.kind === 'popout') {
      return <PopInner src={it.src!} alt={it.alt!} disabled={debug} />;
    }
    if (it.kind === 'actions') {
      return <BottomActions copyText={copyText} copyEmail={copyEmail} disabled={debug} />;
    }
    // text
    if (it.key === 'intro-text-left') {
      return (
        <div style={textStyle}>
          Hello,<br />
          I'm Charlie, a graphic designer<br />
          and recent UAL graduate. I love<br />
          turning fun, creative ideas<br />
          into bold visual identities.
        </div>
      );
    }
    if (it.key === 'intro-text-right') {
      return (
        <div style={textStyle}>
          BA (HONS)<br />
          Graphic Branding &amp; Identity
        </div>
      );
    }
    return <div style={textStyle}>CharlieStampCreative@gmail.com</div>;
  }

  return (
    <div style={{ backgroundColor: '#f1e4d6', fontFamily: 'Arial, sans-serif', overflowX: 'hidden', userSelect: debug ? 'none' : 'auto' }}>

      {/* ── Debug control panel (outside canvas, not scaled) ── */}
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 100000,
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#fff',
        }}
      >
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(0,0,0,0.8)',
            padding: '6px 10px',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} />
          Debug Mode
        </label>

        {debug && (
          <div
            style={{
              marginTop: 8,
              width: 320,
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'rgba(0,0,0,0.88)',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div style={{ marginBottom: 8, lineHeight: 1.5 }}>
              Drag any element to move it. Select one to get the{' '}
              <span style={{ color: '#00aaff' }}>blue</span> resize handle and{' '}
              <span style={{ color: '#00cc66' }}>green</span> rotate handle. Copy the output below and paste it back to me.
            </div>

            <label style={{ display: 'block', marginBottom: 4 }}>Mockup image URL (tracing paper):</label>
            <input
              type="text"
              value={mockupUrl}
              onChange={e => setMockupUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: 8, padding: 4, fontFamily: 'monospace', fontSize: 11 }}
            />

            <label style={{ display: 'block', marginBottom: 4 }}>
              Mockup opacity: {mockupOpacity.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={mockupOpacity}
              onChange={e => setMockupOpacity(parseFloat(e.target.value))}
              style={{ width: '100%', marginBottom: 10 }}
            />

            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button
                onClick={copyOutput}
                style={{ flex: 1, padding: '6px 0', cursor: 'pointer', background: '#00aaff', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold' }}
              >
                {outputCopied ? 'Copied!' : 'Copy Output'}
              </button>
              <button
                onClick={() => { setItems(INITIAL_ITEMS); setSelected(null); }}
                style={{ padding: '6px 10px', cursor: 'pointer', background: '#555', color: '#fff', border: 'none', borderRadius: 4 }}
              >
                Reset
              </button>
            </div>

            <textarea
              readOnly
              value={output}
              style={{ width: '100%', height: 200, boxSizing: 'border-box', fontFamily: 'monospace', fontSize: 10, lineHeight: 1.4 }}
            />
          </div>
        )}
      </div>

      {/* Fixed sticky header — outside the canvas so position:fixed works */}
      <div
        ref={stickyRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '1440px', zIndex: 10000, transformOrigin: 'top left', pointerEvents: 'none' }}
      >
        <div style={{ position: 'absolute', top: '-12.0317px', left: '1px', width: '1438.55px', zIndex: 129 }}>
          <img src={cdn('61d9e021682643278772567710b1035e')} alt="Navigation" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '57.5294px',
            left: 0,
            width: '1440px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 160px',
            boxSizing: 'border-box',
            zIndex: 10001,
            pointerEvents: 'auto',
          }}
        >
          <p style={{ color: '#9d0003', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
            Charlie Stamp
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { label: 'home', id: 'hero-title' },
              { label: 'work', id: 'starlight-img' },
              { label: 'contact', id: 'bottom-actions' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9d0003',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Canvas Wrapper */}
      <div ref={wrapperRef} id="scroll-wrapper" style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <div
          ref={canvasRef}
          id="main-canvas"
          style={{ width: '1440px', height: '5959px', position: 'absolute', top: 0, left: 0, transformOrigin: 'top left' }}
        >
          {/* Tracing-paper mockup overlay (aligns 1:1 with canvas coordinates) */}
          {debug && mockupUrl && (
            <img
              src={mockupUrl}
              alt="mockup overlay"
              style={{ position: 'absolute', top: 0, left: 0, width: '1440px', height: 'auto', opacity: mockupOpacity, pointerEvents: 'none', zIndex: 99998 }}
            />
          )}

          {items.map(it => {
            const isImg = it.kind !== 'text' && it.kind !== 'actions';
            const isSel = debug && selected === it.key;
            return (
              <div
                key={it.key}
                id={it.key}
                data-item={it.key}
                onMouseDown={e => onItemDown(e, it)}
                onClick={() => { if (!debug && it.link) navigate(it.link); }}
                style={{
                  position: 'absolute',
                  top: `${it.top}px`,
                  left: `${it.left}px`,
                  width: isImg ? `${it.width}px` : undefined,
                  zIndex: it.z,
                  transform: `rotate(${it.rotate || 0}deg) scale(${it.scale || 1})`,
                  transformOrigin: 'top left',
                  opacity: it.opacity ?? 1,
                  cursor: debug ? 'move' : it.link ? 'pointer' : 'default',
                  outline: isSel ? '2px solid #00aaff' : 'none',
                }}
              >
                {renderContent(it)}

                {isSel && (
                  <>
                    <div
                      onMouseDown={e => onHandleDown(e, it, 'resize')}
                      style={{ position: 'absolute', right: -8, bottom: -8, width: 16, height: 16, background: '#00aaff', borderRadius: '50%', cursor: 'nwse-resize', zIndex: 99999, border: '2px solid #fff' }}
                    />
                    <div
                      onMouseDown={e => onHandleDown(e, it, 'rotate')}
                      style={{ position: 'absolute', left: '50%', top: -34, marginLeft: -8, width: 16, height: 16, background: '#00cc66', borderRadius: '50%', cursor: 'grab', zIndex: 99999, border: '2px solid #fff' }}
                    />
                  </>
                )}
              </div>
            );
          })}

          {/* Hidden input for clipboard fallback */}
          <input type="text" id="hidden-email" defaultValue="CharlieStampCreative@gmail.com" style={{ position: 'absolute', left: '-9999px' }} readOnly />
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function PopInner({ src, alt, disabled }: { src: string; alt: string; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !disabled;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        filter: active ? SHADOW_HOVER : SHADOW,
        transform: active ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
      }}
    >
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} draggable={false} />
    </div>
  );
}

function BottomActions({ copyText, copyEmail, disabled }: { copyText: string; copyEmail: () => void; disabled: boolean }) {
  const stop = (e: React.MouseEvent) => { if (disabled) e.preventDefault(); };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <a
        href="mailto:CharlieStampCreative@gmail.com"
        onClick={stop}
        style={{ backgroundColor: '#9d0003', color: '#f1e4d6', padding: '8px 24px', borderRadius: '50px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none', border: '2px solid #9d0003', display: 'inline-block' }}
      >
        Send Email
      </a>
      <button
        onClick={e => { if (disabled) { e.preventDefault(); return; } copyEmail(); }}
        style={{ backgroundColor: 'transparent', color: '#9d0003', padding: '8px 16px', borderRadius: '50px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: '2px solid #9d0003', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" />
        </svg>
        <span>{copyText}</span>
      </button>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" onClick={stop} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #9d0003', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d0003', textDecoration: 'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" onClick={stop} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #9d0003', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d0003', textDecoration: 'none' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '20px', height: '20px' }}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
    </div>
  );
}
