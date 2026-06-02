import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cdn = (id: string) =>
  `https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F${id}`;

type Kind = 'plain' | 'shadow' | 'popout' | 'text' | 'actions';

interface Item {
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

const ITEMS: Item[] = [
  // Backgrounds
  { key: 'top-bg',       kind: 'plain',  top: 0,        left: 0,         width: 1440,     z: 1,   src: cdn('1530d8222ea34ff39c230b8bbbd4ade7'), alt: '' },
  { key: 'hero-title',   kind: 'plain',  top: 207.902,  left: 14.166,    width: 1390.74,  z: 133, src: cdn('22c4b55d9b29465ba37f08f5b89c9baa'),  alt: 'Stamp Creative' },
  { key: 'tea-spill',    kind: 'plain',  top: 3364.092, left: 1066.924,  width: 362.858,  z: 283, opacity: 0.85, src: cdn('2625da861d76461a9e04a77d76f24720'), alt: 'Tea Spill' },
  { key: 'bottom-bg',    kind: 'plain',  top: 4729.804, left: -9.672,    width: 1453.03,  z: 293, src: cdn('3eb12f515b2f418ba6d144fe0c93b11e'), alt: '' },
  // Brand assets
  { key: 'starlight-img',kind: 'shadow', top: 961.546,  left: 194.538,   width: 1027.765, z: 0,   rotate: 0.05,  src: cdn('5e8276c7560844a7bb23960025d476dc'), alt: 'Starlight Image' },
  { key: 'brandopus',    kind: 'shadow', top: 920.492,  left: 800.826,   width: 464.951,  z: 166, rotate: -0.73, src: cdn('47d3bee759ef4c9682aea6efa4a20ccf'), alt: 'BrandOpus' },
  { key: 'inside-img',   kind: 'shadow', top: 1675.997, left: 129.524,   width: 1115.344, z: 203, rotate: -0.18, src: cdn('e05478abd26e40589a95040ef320e3cf'), alt: 'Inside Stories Image' },
  { key: 'aya-img',      kind: 'shadow', top: 2207.797, left: 186.591,   width: 1081.839, z: 193, rotate: -1.24, src: cdn('b49bbe412e7146c5b3f9cb83f65a1a55'), alt: 'Aya Image' },
  { key: 'phone',        kind: 'shadow', top: 2385.26,  left: 1013.308,  width: 411.13,   z: 289, rotate: 0.25,  src: cdn('3d73a7328e1a4a77983bd66913be6b02'), alt: 'Phone' },
  { key: 'regenb-img',   kind: 'shadow', top: 2836.008, left: 125.908,   width: 1136.617, z: 287, rotate: 0.17,  src: cdn('ddf5aeafe88f4461b4bdcf7178899e70'), alt: 'RegenB Image' },
  { key: 'flow-img',     kind: 'shadow', top: 3334.638, left: 150.504,   width: 885.48,   z: 284, rotate: 2,     src: cdn('8869078d3da3415ab58d8338f1812359'), alt: 'Flow Image' },
  // Logos
  { key: 'starlight-logo',kind: 'popout',top: 1344.598, left: 141.698,   width: 436.616,  z: 205, rotate: -0.91, src: cdn('437cd92f7a8143268a3bf09e074fd796'), alt: 'Starlight Logo',       link: '/project/starlight-beer' },
  { key: 'inside-logo',  kind: 'popout', top: 2052.558, left: 737.281,   width: 306.132,  z: 204, rotate: -0.05, src: cdn('8f7a3735549d489a91d2536c4c59f821'), alt: 'Inside Stories Logo',  link: '/project/inside-stories' },
  { key: 'aya-logo',     kind: 'popout', top: 2662.779, left: 139.874,   width: 443.912,  z: 288, rotate: 0.01,  src: cdn('30ed9c00fb28428cbefc39036d534225'), alt: 'AYA Logo' },
  { key: 'regenb-logo',  kind: 'popout', top: 3247.283, left: 502.717,   width: 472.275,  z: 290, rotate: 0.57,  src: cdn('08b6e5c4bdbe44489df684a204ea604c'), alt: 'RegenB Logo',          link: '/project/regenb' },
  { key: 'flow-logo',    kind: 'popout', top: 3783.375, left: 827.395,   width: 451.547,  z: 291, rotate: 1.87,  src: cdn('3fb99cbbc54243ab9be8466e97e7023a'), alt: 'Flow Logo',            link: '/project/flow' },
  // CTA
  { key: 'cta-img',      kind: 'plain',  top: 5125,     left: 64.278,    width: 1328.33,  z: 294, src: cdn('072cd11f594b47afbb3cecd540201d87'), alt: "Let's Create Something" },
  // Text / UI
  { key: 'intro-text-left',  kind: 'text',    top: 764,        left: 65,        scale: 1.01471, z: 150 },
  { key: 'intro-text-right', kind: 'text',    top: 764.758,    left: 1040,      scale: 1,       z: 150 },
  { key: 'bottom-actions',   kind: 'actions', top: 5657.838,   left: 62.245,    scale: 2.4779,  z: 300 },
  { key: 'email-text',       kind: 'text',    top: 5825.934,   left: 77.922,    scale: 1.7469,  z: 300 },
];

const SHADOW       = 'drop-shadow(8px 12px 15px rgba(80,10,5,0.45))';
const SHADOW_HOVER = 'drop-shadow(12px 18px 20px rgba(80,10,5,0.6))';
const textStyle: React.CSSProperties = { color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'24px', lineHeight:1.3 };

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [copyText, setCopyText] = useState('Copy Email');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-skip-theme', 'true');
    return () => document.body.removeAttribute('data-skip-theme');
  }, []);

  useEffect(() => {
    function resizeLayout() {
      const wrapper = wrapperRef.current;
      const canvas  = canvasRef.current;
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

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 150;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText('CharlieStampCreative@gmail.com').then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Email'), 2000);
    });
  }

  function renderContent(item: Item) {
    if (item.kind === 'plain') {
      return <img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block' }} />;
    }
    if (item.kind === 'shadow') {
      return (
        <div style={{ filter: SHADOW }}>
          <img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block' }} />
        </div>
      );
    }
    if (item.kind === 'popout') {
      return <PopInner src={item.src!} alt={item.alt!} />;
    }
    if (item.kind === 'actions') {
      return <BottomActions copyText={copyText} copyEmail={copyEmail} />;
    }
    if (item.key === 'intro-text-left') {
      return <div style={textStyle}>Hello,<br/>I'm Charlie, a graphic designer<br/>and recent UAL graduate. I love<br/>turning fun, creative ideas<br/>into bold visual identities.</div>;
    }
    if (item.key === 'intro-text-right') {
      return <div style={textStyle}>BA (HONS)<br/>Graphic Branding &amp; Identity</div>;
    }
    return <div style={textStyle}>CharlieStampCreative@gmail.com</div>;
  }

  return (
    <div style={{ backgroundColor:'#f1e4d6', fontFamily:'Arial,sans-serif', overflowX:'hidden' }}>

      {/* Fixed sticky header */}
      <div ref={stickyRef} style={{ position:'fixed', top:0, left:0, width:'1440px', zIndex:10000, transformOrigin:'top left', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-12.0317px', left:'1px', width:'1438.55px', zIndex:129 }}>
          <img src={cdn('61d9e021682643278772567710b1035e')} alt="Navigation" style={{ width:'100%', height:'auto', display:'block' }} />
        </div>
        <div style={{ position:'absolute', top:'57.5294px', left:0, width:'1440px', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 160px', boxSizing:'border-box', zIndex:10001, pointerEvents:'auto' }}>
          <p style={{ color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'24px', margin:0 }}>Charlie Stamp</p>
          <div style={{ display:'flex', gap:'40px' }}>
            {[{ label:'home', id:'hero-title' }, { label:'work', id:'starlight-img' }, { label:'contact', id:'bottom-actions' }].map(({ label, id }) => (
              <button key={id} onClick={() => scrollToSection(id)}
                style={{ background:'none', border:'none', color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'20px', cursor:'pointer', padding:0 }}
                onMouseEnter={e => (e.currentTarget.style.opacity='0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity='1')}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={wrapperRef} id="scroll-wrapper" style={{ width:'100%', position:'relative', overflow:'hidden' }}>
        <div ref={canvasRef} id="main-canvas" style={{ width:'1440px', height:'5959px', position:'absolute', top:0, left:0, transformOrigin:'top left' }}>
          {ITEMS.map(item => {
            const isImg = item.kind !== 'text' && item.kind !== 'actions';
            return (
              <div
                key={item.key}
                id={item.key}
                onClick={() => { if (item.link) navigate(item.link); }}
                style={{
                  position: 'absolute',
                  top: `${item.top}px`,
                  left: `${item.left}px`,
                  width: isImg ? `${item.width}px` : undefined,
                  zIndex: item.z,
                  transform: `rotate(${item.rotate||0}deg) scale(${item.scale||1})`,
                  transformOrigin: 'top left',
                  opacity: item.opacity ?? 1,
                  cursor: item.link ? 'pointer' : 'default',
                }}
              >
                {renderContent(item)}
              </div>
            );
          })}
          <input type="text" id="hidden-email" defaultValue="CharlieStampCreative@gmail.com" style={{ position:'absolute', left:'-9999px' }} readOnly />
        </div>
      </div>
    </div>
  );
}

function PopInner({ src, alt }: { src:string; alt:string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ filter: hovered ? SHADOW_HOVER : SHADOW, transform: hovered ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)', transition: 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), filter 0.3s ease' }}>
      <img src={src} alt={alt} style={{ width:'100%', height:'auto', display:'block' }} draggable={false} />
    </div>
  );
}

function BottomActions({ copyText, copyEmail }: { copyText:string; copyEmail:()=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
      <a href="mailto:CharlieStampCreative@gmail.com" style={{ backgroundColor:'#9d0003', color:'#f1e4d6', padding:'8px 24px', borderRadius:'50px', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'16px', textDecoration:'none', border:'2px solid #9d0003', display:'inline-block' }}>Send Email</a>
      <button onClick={copyEmail} style={{ backgroundColor:'transparent', color:'#9d0003', padding:'8px 16px', borderRadius:'50px', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'16px', cursor:'pointer', border:'2px solid #9d0003', display:'flex', alignItems:'center', gap:'8px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px' }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none"/></svg>
        <span>{copyText}</span>
      </button>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width:'20px', height:'20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    </div>
  );
}
