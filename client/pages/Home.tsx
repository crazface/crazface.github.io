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
  flipH?: boolean;
  flipV?: boolean;
  src?: string;
  alt?: string;
  link?: string;
}

const ITEMS: Item[] = [
  { key: 'top-bg',       kind: 'plain',  top: 0,         left: 0,        width: 1440,     z: 1,   src: cdn('1530d8222ea34ff39c230b8bbbd4ade7'), alt: '' },
  { key: 'hero-title',   kind: 'plain',  top: 207.902,   left: 14.166,   width: 1390.74,  z: 133, src: cdn('22c4b55d9b29465ba37f08f5b89c9baa'),  alt: 'Stamp Creative' },
  { key: 'tea-spill',    kind: 'plain',  top: 2705.808,  left: 985.779,  width: 452.824,  z: 283, opacity: 0.85, src: cdn('2625da861d76461a9e04a77d76f24720'), alt: 'Tea Spill' },
  { key: 'bottom-bg',    kind: 'plain',  top: 3182.817,  left: -1.71,    width: 1453.03,  z: 293, src: cdn('3eb12f515b2f418ba6d144fe0c93b11e'), alt: '' },
  { key: 'starlight-img',kind: 'shadow', top: 920.011,   left: 321.246,  width: 812.241,  z: 0,   rotate: 0.05,  src: cdn('5e8276c7560844a7bb23960025d476dc'), alt: 'Starlight Image' },
  { key: 'brandopus',    kind: 'shadow', top: 887.566,   left: 800.395,  width: 367.45,   z: 166, rotate: -0.73, src: cdn('47d3bee759ef4c9682aea6efa4a20ccf'), alt: 'BrandOpus' },
  { key: 'inside-img',   kind: 'shadow', top: 1484.641,  left: 269.866,  width: 881.455,  z: 203, rotate: -0.18, src: cdn('e05478abd26e40589a95040ef320e3cf'), alt: 'Inside Stories Image' },
  { key: 'aya-img',      kind: 'shadow', top: 1904.921,  left: 314.966,  width: 854.976,  z: 193, rotate: -1.24, src: cdn('b49bbe412e7146c5b3f9cb83f65a1a55'), alt: 'Aya Image' },
  { key: 'phone',        kind: 'shadow', top: 1931.783,  left: -8.129,   width: 535.816,  z: 289, rotate: 0.25,  src: cdn('3d73a7328e1a4a77983bd66913be6b02'), alt: 'Phone', flipH: true },
  { key: 'regenb-img',   kind: 'shadow', top: 2401.396,  left: 267.008,  width: 898.267,  z: 287, rotate: 0.17,  src: cdn('ddf5aeafe88f4461b4bdcf7178899e70'), alt: 'RegenB Image' },
  { key: 'flow-img',     kind: 'shadow', top: 2830.506,  left: 286.446,  width: 699.794,  z: 284, rotate: 2,     src: cdn('8869078d3da3415ab58d8338f1812359'), alt: 'Flow Image' },
  { key: 'starlight-logo',kind: 'popout',top: 1222.736,  left: 279.487,  width: 345.057,  z: 205, rotate: -0.91, src: cdn('437cd92f7a8143268a3bf09e074fd796'), alt: 'Starlight Logo',       link: '/project/starlight-beer' },
  { key: 'inside-logo',  kind: 'popout', top: 1782.236,  left: 750.175,  width: 241.936,  z: 204, rotate: -0.05, src: cdn('8f7a3735549d489a91d2536c4c59f821'), alt: 'Inside Stories Logo',  link: '/project/inside-stories' },
  { key: 'aya-logo',     kind: 'popout', top: 2281.704,  left: 823.842,  width: 350.823,  z: 288, rotate: -16.99, src: cdn('30ed9c00fb28428cbefc39036d534225'), alt: 'AYA Logo' },
  { key: 'regenb-logo',  kind: 'popout', top: 2712.191,  left: 581.722,  width: 373.238,  z: 290, rotate: 4.75,  src: cdn('08b6e5c4bdbe44489df684a204ea604c'), alt: 'RegenB Logo',          link: '/project/regenb' },
  { key: 'flow-logo',    kind: 'popout', top: 3189.946,  left: 821.392,  width: 356.857,  z: 291, rotate: 1.87,  src: cdn('3fb99cbbc54243ab9be8466e97e7023a'), alt: 'Flow Logo',            link: '/project/flow' },
  { key: 'cta-img',      kind: 'plain',  top: 3560.181,  left: 190.317,  width: 1085.744, z: 294, src: cdn('072cd11f594b47afbb3cecd540201d87'), alt: "Let's Create Something" },
  { key: 'intro-text-left',  kind: 'text',    top: 764,        left: 65,        scale: 1.01471, z: 150 },
  { key: 'intro-text-right', kind: 'text',    top: 764.758,    left: 1040,      scale: 1,       z: 150 },
  { key: 'bottom-actions',   kind: 'actions', top: 3995.323,   left: 188.855,   scale: 2.0254,  z: 300 },
  { key: 'email-text',       kind: 'text',    top: 4133.107,   left: 201.469,   scale: 1.4279,  z: 300 },
];

const CATEGORIES: { label: string; keys: string[] }[] = [
  { label: 'Backgrounds', keys: ['top-bg', 'hero-title', 'tea-spill', 'bottom-bg', 'cta-img'] },
  { label: 'Brand Images', keys: ['starlight-img', 'brandopus', 'inside-img', 'aya-img', 'phone', 'regenb-img', 'flow-img'] },
  { label: 'Logos', keys: ['starlight-logo', 'inside-logo', 'aya-logo', 'regenb-logo', 'flow-logo'] },
  { label: 'Text / UI', keys: ['intro-text-left', 'intro-text-right', 'bottom-actions', 'email-text'] },
];

const SHADOW       = 'drop-shadow(8px 12px 15px rgba(80,10,5,0.45))';
const SHADOW_HOVER = 'drop-shadow(12px 18px 20px rgba(80,10,5,0.6))';
const textStyle: React.CSSProperties = { color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'24px', lineHeight:1.3 };

type MoveMode = 'both' | 'horizontal' | 'vertical';

interface DragState {
  key: string; mode: 'move'|'resize'|'rotate';
  startX: number; startY: number;
  cx?: number; cy?: number; startAngle?: number;
  start: { [k: string]: { top:number; left:number; width:number; scale:number; rotate:number } };
}

function itemTransform(it: Item) {
  const s = it.scale ?? 1;
  const sx = s * (it.flipH ? -1 : 1);
  const sy = s * (it.flipV ? -1 : 1);
  const tx = it.flipH ? '100%' : '0';
  const ty = it.flipV ? '100%' : '0';
  return `rotate(${it.rotate || 0}deg) translate(${tx}, ${ty}) scale(${sx}, ${sy})`;
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [copyText, setCopyText] = useState('Copy Email');
  const navigate = useNavigate();

  const [debug, setDebug] = useState(false); // Debug mode disabled after finalization
  const [items, setItems] = useState<Item[]>(ITEMS);
  const [selected, setSelected] = useState<string|null>(null);
  const [grouped, setGrouped] = useState<Set<string>>(new Set());
  const [moveMode, setMoveMode] = useState<MoveMode>('both');
  const [mockupUrl, setMockupUrl] = useState('');
  const [mockupOpacity, setMockupOpacity] = useState(0.3);
  const [outputCopied, setOutputCopied] = useState(false);
  const drag = useRef<DragState|null>(null);
  const moveModeRef = useRef<MoveMode>('both');
  moveModeRef.current = moveMode;

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

  useEffect(() => {
    if (!debug) return;

    function onMove(e: PointerEvent) {
      const d = drag.current;
      if (!d) return;
      const scale = window.innerWidth / 1440;
      const dx = (e.clientX - d.startX) / scale;
      const dy = (e.clientY - d.startY) / scale;

      setItems(prev => {
        const affectedKeys = Object.keys(d.start);

        if (d.mode === 'move') {
          const mm = moveModeRef.current;
          const useDx = mm === 'vertical' ? 0 : dx;
          const useDy = mm === 'horizontal' ? 0 : dy;
          return prev.map(it => {
            const state = d.start[it.key];
            if (!state) return it;
            return { ...it, top: state.top + useDy, left: state.left + useDx };
          });
        }

        if (d.mode === 'resize') {
          let minLeft = Infinity, minTop = Infinity, maxRight = -Infinity;
          affectedKeys.forEach(key => {
            const state = d.start[key];
            if (!state) return;
            minLeft = Math.min(minLeft, state.left);
            minTop = Math.min(minTop, state.top);
            maxRight = Math.max(maxRight, state.left + (state.width || 200));
          });
          const originalWidth = Math.max(maxRight - minLeft, 1);
          const S = Math.max(0.1, 1 + dx / originalWidth);

          return prev.map(it => {
            const state = d.start[it.key];
            if (!state) return it;
            const newLeft = minLeft + (state.left - minLeft) * S;
            const newTop  = minTop  + (state.top  - minTop)  * S;
            if (it.kind === 'text' || it.kind === 'actions') {
              return { ...it, top: +newTop.toFixed(3), left: +newLeft.toFixed(3), scale: +(state.scale * S).toFixed(4) };
            }
            return { ...it, top: +newTop.toFixed(3), left: +newLeft.toFixed(3), width: +(state.width * S).toFixed(3) };
          });
        }

        if (d.mode === 'rotate') {
          const angle = Math.atan2(e.clientY - d.cy!, e.clientX - d.cx!) * 180 / Math.PI;
          return prev.map(it => {
            const state = d.start[it.key];
            if (!state) return it;
            return { ...it, rotate: +(state.rotate + (angle - d.startAngle!)).toFixed(2) };
          });
        }
        return prev;
      });
    }

    function onUp() { drag.current = null; }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   onUp);
    };
  }, [debug]);

  function affectedFor(key: string) {
    return grouped.has(key) ? Array.from(grouped) : [key];
  }

  function startItemDrag(e: React.PointerEvent, item: Item) {
    if (!debug) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const keys = affectedFor(item.key);
    setSelected(item.key);
    drag.current = {
      key: item.key, mode: 'move',
      startX: e.clientX, startY: e.clientY,
      start: Object.fromEntries(items.filter(it => keys.includes(it.key)).map(it => [it.key, { top: it.top, left: it.left, width: it.width ?? 0, scale: it.scale ?? 1, rotate: it.rotate ?? 0 }])),
    };
  }

  function startHandleDrag(e: React.PointerEvent, item: Item, mode: 'resize'|'rotate') {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const wrap = (e.currentTarget as HTMLElement).parentElement!;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
    const keys = affectedFor(item.key);
    setSelected(item.key);
    drag.current = {
      key: item.key, mode,
      startX: e.clientX, startY: e.clientY,
      cx, cy, startAngle,
      start: Object.fromEntries(items.filter(it => keys.includes(it.key)).map(it => [it.key, { top: it.top, left: it.left, width: it.width ?? 0, scale: it.scale ?? 1, rotate: it.rotate ?? 0 }])),
    };
  }

  function flipSelected(axis: 'h'|'v') {
    if (!selected) return;
    const keys = affectedFor(selected);
    const prop = axis === 'h' ? 'flipH' : 'flipV';
    setItems(prev => prev.map(it => keys.includes(it.key) ? { ...it, [prop]: !it[prop] } : it));
  }

  function toggleGroup(key: string, on: boolean) {
    const n = new Set(grouped);
    if (on) n.add(key); else n.delete(key);
    setGrouped(n);
  }

  function scrollToSection(id: string) {
    if (debug) return;
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

  const output = items.map(it => {
    const parts = [`top: ${Math.round(it.top*1000)/1000}px`, `left: ${Math.round(it.left*1000)/1000}px`];
    if (it.width != null) parts.push(`width: ${Math.round(it.width*1000)/1000}px`);
    if (it.kind === 'text' || it.kind === 'actions') parts.push(`scale: ${it.scale}`);
    if (it.rotate) parts.push(`rotate: ${it.rotate}deg`);
    if (it.flipH) parts.push('flipH');
    if (it.flipV) parts.push('flipV');
    parts.push(`z: ${it.z}`);
    return `[${it.key}] ${parts.join('; ')}`;
  }).join('\n');

  function copyOutput() {
    navigator.clipboard.writeText(output).then(() => {
      setOutputCopied(true);
      setTimeout(() => setOutputCopied(false), 2000);
    });
  }

  function renderContent(item: Item) {
    if (item.kind === 'plain') {
      return <img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block' }} />;
    }
    if (item.kind === 'shadow') {
      return <div style={{ filter: SHADOW }}><img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block' }} /></div>;
    }
    if (item.kind === 'popout') {
      return <PopInner src={item.src!} alt={item.alt!} disabled={debug} />;
    }
    if (item.kind === 'actions') {
      return <BottomActions copyText={copyText} copyEmail={copyEmail} disabled={debug} />;
    }
    if (item.key === 'intro-text-left') {
      return <div style={textStyle}>Hello,<br/>I'm Charlie, a graphic designer<br/>and recent UAL graduate. I love<br/>turning fun, creative ideas<br/>into bold visual identities.</div>;
    }
    if (item.key === 'intro-text-right') {
      return <div style={textStyle}>BA (HONS)<br/>Graphic Branding &amp; Identity</div>;
    }
    return <div style={textStyle}>CharlieStampCreative@gmail.com</div>;
  }

  const btn = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '5px 0', cursor: 'pointer', fontSize: 11,
    background: active ? '#00aaff' : '#444', color: '#fff', border: 'none', borderRadius: 4,
  });

  return (
    <div style={{ backgroundColor:'#f1e4d6', fontFamily:'Arial,sans-serif', overflowX:'hidden', userSelect: debug ? 'none' : 'auto' }}>

      {/* Debug panel */}
      <div style={{ position:'fixed', top:10, left:10, zIndex:100000, fontFamily:'monospace', fontSize:12, color:'#fff' }}>
        <label style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(0,0,0,0.82)', padding:'6px 12px', borderRadius:6, cursor:'pointer' }}>
          <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} />
          Debug Mode
        </label>

        {debug && (
          <div style={{ marginTop:8, width:390, maxHeight:'88vh', overflowY:'auto', background:'rgba(0,0,0,0.92)', borderRadius:8, padding:12 }}>
            <p style={{ margin:'0 0 8px', lineHeight:1.5, color:'#ccc', fontSize:11 }}>
              Drag to move. Click to select, then use <span style={{color:'#00aaff'}}>● blue</span> to resize / <span style={{color:'#00cc66'}}>● green</span> to rotate. Group items to transform together.
            </p>

            {/* Movement mode */}
            <p style={{ margin:'0 0 4px', fontSize:11 }}><strong>Movement axis:</strong></p>
            <div style={{ display:'flex', gap:6, marginBottom:10 }}>
              <button style={btn(moveMode==='both')}       onClick={() => setMoveMode('both')}>Both</button>
              <button style={btn(moveMode==='horizontal')} onClick={() => setMoveMode('horizontal')}>Horizontal</button>
              <button style={btn(moveMode==='vertical')}   onClick={() => setMoveMode('vertical')}>Vertical</button>
            </div>

            {/* Flip */}
            <p style={{ margin:'0 0 4px', fontSize:11 }}>
              <strong>Flip {selected ? `"${selected}"` : '(select an item)'}:</strong>
            </p>
            <div style={{ display:'flex', gap:6, marginBottom:10 }}>
              <button disabled={!selected} style={{ ...btn(false), opacity: selected ? 1 : 0.4 }} onClick={() => flipSelected('h')}>Flip Horizontal ↔</button>
              <button disabled={!selected} style={{ ...btn(false), opacity: selected ? 1 : 0.4 }} onClick={() => flipSelected('v')}>Flip Vertical ↕</button>
            </div>

            {/* Grouping */}
            <div style={{ marginBottom:10, padding:8, background:'rgba(255,255,255,0.08)', borderRadius:4, maxHeight:240, overflowY:'auto' }}>
              <div style={{ display:'flex', gap:6, marginBottom:6 }}>
                <button style={{ ...btn(false), background:'#333' }} onClick={() => setGrouped(new Set(items.map(i => i.key)))}>Select All</button>
                <button style={{ ...btn(false), background:'#333' }} onClick={() => setGrouped(new Set())}>Clear</button>
              </div>
              {CATEGORIES.map(cat => {
                const allOn = cat.keys.every(k => grouped.has(k));
                return (
                  <div key={cat.label} style={{ marginBottom:6 }}>
                    <label style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:11, marginBottom:3 }}>
                      <input type="checkbox" checked={allOn} onChange={e => {
                        const n = new Set(grouped);
                        if (e.target.checked) cat.keys.forEach(k => n.add(k));
                        else cat.keys.forEach(k => n.delete(k));
                        setGrouped(n);
                      }} />
                      <strong>{cat.label}</strong>
                    </label>
                    {cat.keys.map(k => (
                      <label key={k} style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:10, marginBottom:2, paddingLeft:14, color: selected===k ? '#00aaff' : '#fff' }}>
                        <input type="checkbox" checked={grouped.has(k)} onChange={e => toggleGroup(k, e.target.checked)} />
                        {k}
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>

            <label style={{ display:'block', marginBottom:4 }}>Mockup URL:</label>
            <input type="text" value={mockupUrl} onChange={e => setMockupUrl(e.target.value)} placeholder="https://..." style={{ width:'100%', boxSizing:'border-box', marginBottom:8, padding:4, fontFamily:'monospace', fontSize:11 }} />

            <label style={{ display:'block', marginBottom:4 }}>Opacity: {mockupOpacity.toFixed(2)}</label>
            <input type="range" min={0} max={1} step={0.05} value={mockupOpacity} onChange={e => setMockupOpacity(+e.target.value)} style={{ width:'100%', marginBottom:10 }} />

            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <button onClick={copyOutput} style={{ flex:1, padding:'6px 0', cursor:'pointer', background:'#00aaff', color:'#fff', border:'none', borderRadius:4, fontWeight:'bold', fontSize:11 }}>
                {outputCopied ? 'Copied ✓' : 'Copy Output'}
              </button>
              <button onClick={() => { setItems(ITEMS); setSelected(null); setGrouped(new Set()); }} style={{ padding:'6px 10px', cursor:'pointer', background:'#555', color:'#fff', border:'none', borderRadius:4, fontSize:11 }}>
                Reset
              </button>
            </div>

            <textarea readOnly value={output} style={{ width:'100%', height:220, boxSizing:'border-box', fontFamily:'monospace', fontSize:10, lineHeight:1.4, resize:'vertical' }} />
          </div>
        )}
      </div>

      {/* Sticky header */}
      <div ref={stickyRef} style={{ position:'fixed', top:0, left:0, width:'1440px', zIndex:10000, transformOrigin:'top left', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-12.0317px', left:'1px', width:'1438.55px', zIndex:129 }}>
          <img src={cdn('61d9e021682643278772567710b1035e')} alt="Navigation" style={{ width:'100%', height:'auto', display:'block' }} />
        </div>
        <div style={{ position:'absolute', top:'57.5294px', left:0, width:'1440px', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 160px', boxSizing:'border-box', zIndex:10001, pointerEvents:'auto' }}>
          <p style={{ color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'24px', margin:0 }}>Charlie Stamp</p>
          <div style={{ display:'flex', gap:'40px' }}>
            {[{ label:'home', id:'hero-title' }, { label:'work', id:'starlight-img' }, { label:'contact', id:'bottom-actions' }].map(({ label, id }) => (
              <button key={id} onClick={() => scrollToSection(id)} style={{ background:'none', border:'none', color:'#9d0003', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'20px', cursor:'pointer', padding:0 }} onMouseEnter={e => (e.currentTarget.style.opacity='0.7')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={wrapperRef} id="scroll-wrapper" style={{ width:'100%', position:'relative', overflow:'hidden' }}>
        <div ref={canvasRef} id="main-canvas" style={{ width:'1440px', height:'5959px', position:'absolute', top:0, left:0, transformOrigin:'top left' }}>
          {debug && mockupUrl && (
            <img src={mockupUrl} alt="mockup" style={{ position:'absolute', top:0, left:0, width:'1440px', height:'auto', opacity:mockupOpacity, pointerEvents:'none', zIndex:99998 }} />
          )}

          {items.map(item => {
            const isImg = item.kind !== 'text' && item.kind !== 'actions';
            const isSel = debug && selected === item.key;
            const isGrouped = grouped.has(item.key);
            return (
              <div
                key={item.key}
                id={item.key}
                onPointerDown={e => startItemDrag(e, item)}
                onClick={() => { if (!debug && item.link) navigate(item.link); }}
                style={{
                  position: 'absolute',
                  top: `${item.top}px`,
                  left: `${item.left}px`,
                  width: isImg ? `${item.width}px` : undefined,
                  zIndex: item.z,
                  transform: itemTransform(item),
                  transformOrigin: 'top left',
                  opacity: item.opacity ?? 1,
                  cursor: debug ? 'move' : item.link ? 'pointer' : 'default',
                  outline: isSel ? '2px solid #00aaff' : isGrouped && debug ? '2px dashed #00ff00' : 'none',
                  touchAction: debug ? 'none' : 'auto',
                }}
              >
                {renderContent(item)}
                {isSel && (
                  <>
                    <div title="Resize" onPointerDown={e => startHandleDrag(e, item, 'resize')} style={{ position:'absolute', right:-10, bottom:-10, width:18, height:18, background:'#00aaff', borderRadius:'50%', cursor:'nwse-resize', zIndex:99999, border:'2px solid #fff', touchAction:'none' }} />
                    <div title="Rotate" onPointerDown={e => startHandleDrag(e, item, 'rotate')} style={{ position:'absolute', left:'50%', top:-36, marginLeft:-9, width:18, height:18, background:'#00cc66', borderRadius:'50%', cursor:'grab', zIndex:99999, border:'2px solid #fff', touchAction:'none' }} />
                  </>
                )}
              </div>
            );
          })}
          <input type="text" id="hidden-email" defaultValue="CharlieStampCreative@gmail.com" style={{ position:'absolute', left:'-9999px' }} readOnly />
        </div>
      </div>
    </div>
  );
}

function PopInner({ src, alt, disabled }: { src:string; alt:string; disabled:boolean }) {
  const [hovered, setHovered] = useState(false);
  const on = hovered && !disabled;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ filter: on ? SHADOW_HOVER : SHADOW, transform: on ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)', transition: 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), filter 0.3s ease' }}>
      <img src={src} alt={alt} style={{ width:'100%', height:'auto', display:'block' }} draggable={false} />
    </div>
  );
}

function BottomActions({ copyText, copyEmail, disabled }: { copyText:string; copyEmail:()=>void; disabled:boolean }) {
  const s = (e: React.MouseEvent) => { if (disabled) e.preventDefault(); };
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
      <a href="mailto:CharlieStampCreative@gmail.com" onClick={s} style={{ backgroundColor:'#9d0003', color:'#f1e4d6', padding:'8px 24px', borderRadius:'50px', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'16px', textDecoration:'none', border:'2px solid #9d0003', display:'inline-block' }}>Send Email</a>
      <button onClick={e => { if (disabled) return; copyEmail(); }} style={{ backgroundColor:'transparent', color:'#9d0003', padding:'8px 16px', borderRadius:'50px', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'16px', cursor:'pointer', border:'2px solid #9d0003', display:'flex', alignItems:'center', gap:'8px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px' }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none"/></svg>
        <span>{copyText}</span>
      </button>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" onClick={s} style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" onClick={s} style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width:'20px', height:'20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    </div>
  );
}
