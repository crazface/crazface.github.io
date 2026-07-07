import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cdn = (id: string) =>
  `https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F${id}`;

type Kind = 'plain' | 'shadow' | 'popout' | 'text' | 'actions';

export interface Item {
  key: string;
  kind: Kind;
  top: number;
  left: number;
  width?: number;
  height?: number;
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

export const ITEMS: Item[] = [
  { key: 'top-bg',       kind: 'plain',  top: 0,         left: -3.675,   width: 1440,     z: 1,   src: cdn('1530d8222ea34ff39c230b8bbbd4ade7'), alt: '' },
  { key: 'hero-title',   kind: 'plain',  top: 161.362,   left: 24.63,    width: 1390.74,  z: 133, src: cdn('22c4b55d9b29465ba37f08f5b89c9baa'),  alt: 'Stamp Creative' },
  { key: 'tea-spill',    kind: 'plain',  top: 2705.808,  left: 985.779,  width: 452.824,  z: 283, opacity: 0.85, src: cdn('c4013e36f48c4682831a3a0ba7931d5f'), alt: 'Tea Spill' },
  { key: 'bottom-bg',    kind: 'plain',  top: 3182.817,  left: -1.587,   width: 1453.03,  z: 293, src: cdn('3eb12f515b2f418ba6d144fe0c93b11e'), alt: '' },
  { key: 'starlight-img',kind: 'shadow', top: 920.011,   left: 321.246,  width: 812.241,  z: 0,   rotate: 0.05,  src: cdn('5e8276c7560844a7bb23960025d476dc'), alt: 'Starlight Image', link: '/project/starlight-beer' },
  { key: 'brandopus',    kind: 'shadow', top: 887.566,   left: 800.395,  width: 367.45,   z: 166, rotate: -0.73, src: cdn('47d3bee759ef4c9682aea6efa4a20ccf'), alt: 'BrandOpus', link: '/project/starlight-beer' },
  { key: 'inside-img',   kind: 'shadow', top: 1484.641,  left: 269.866,  width: 881.455,  z: 203, rotate: -0.18, src: cdn('e05478abd26e40589a95040ef320e3cf'), alt: 'Inside Stories Image', link: '/project/inside-stories' },
  { key: 'aya-img',      kind: 'shadow', top: 1904.921,  left: 314.966,  width: 854.976,  z: 193, rotate: -1.24, src: cdn('b49bbe412e7146c5b3f9cb83f65a1a55'), alt: 'Aya Image', link: '/project/aya' },
  { key: 'phone',        kind: 'shadow', top: 2614.847,  left: -631.292, width: 1063.011, z: 289, rotate: -34.63, src: cdn('0f86a5bd31274b77ad1265f28fedc7f1'), alt: 'Phone', flipH: true },
  { key: 'regenb-img',   kind: 'shadow', top: 2401.396,  left: 267.008,  width: 898.267,  z: 287, rotate: 0.17,  src: cdn('ddf5aeafe88f4461b4bdcf7178899e70'), alt: 'RegenB Image', link: '/project/regenb' },
  { key: 'flow-img',     kind: 'shadow', top: 2830.506,  left: 286.446,  width: 699.794,  z: 284, rotate: 2,     src: cdn('8869078d3da3415ab58d8338f1812359'), alt: 'Flow Image', link: '/project/flow' },
  { key: 'starlight-logo',kind: 'popout',top: 1222.736,  left: 279.487,  width: 345.057,  z: 205, rotate: -0.91, src: cdn('437cd92f7a8143268a3bf09e074fd796'), alt: 'Starlight Logo',       link: '/project/starlight-beer' },
  { key: 'inside-logo',  kind: 'popout', top: 1780.32,   left: 743.578,  width: 241.936,  z: 204, rotate: -0.05, src: cdn('8f7a3735549d489a91d2536c4c59f821'), alt: 'Inside Stories Logo',  link: '/project/inside-stories' },
  { key: 'aya-logo',     kind: 'popout', top: 2242.68,   left: 939.13,   width: 350.823,  z: 288, rotate: -0.71, src: cdn('30ed9c00fb28428cbefc39036d534225'), alt: 'AYA Logo', link: '/project/aya' },
  { key: 'regenb-logo',  kind: 'popout', top: 2712.191,  left: 581.722,  width: 373.238,  z: 290, rotate: 4.75,  src: cdn('08b6e5c4bdbe44489df684a204ea604c'), alt: 'RegenB Logo',          link: '/project/regenb' },
  { key: 'flow-logo',    kind: 'popout', top: 3189.946,  left: 821.392,  width: 356.857,  z: 291, rotate: 1.87,  src: cdn('3fb99cbbc54243ab9be8466e97e7023a'), alt: 'Flow Logo',            link: '/project/flow' },
  { key: 'cta-img',      kind: 'plain',  top: 3561.948,  left: 259.274,  width: 921.451,  z: 294, src: cdn('072cd11f594b47afbb3cecd540201d87'), alt: "Let's Create Something" },
  { key: 'intro-text-left',  kind: 'text',    top: 763.204,    left: 57.896,    width: 490,     scale: 0.8391,  z: 150 },
  { key: 'intro-text-right', kind: 'text',    top: 764.758,    left: 1053.615,  scale: 0.8786,  z: 150 },
  { key: 'bottom-actions',   kind: 'actions', top: 3931.009,   left: 258.346,   scale: 1.7189,  z: 300 },
  { key: 'email-text',       kind: 'text',    top: 4047.944,   left: 269.051,   scale: 1.2118,  z: 300 },
];

export type Category = { label: string; keys: string[] };

const CATEGORIES: Category[] = [
  { label: 'Backgrounds', keys: ['top-bg', 'hero-title', 'tea-spill', 'bottom-bg', 'phone', 'cta-img'] },
  { label: 'Brand Images', keys: ['starlight-img', 'brandopus', 'inside-img', 'aya-img', 'regenb-img', 'flow-img'] },
  { label: 'Logos', keys: ['starlight-logo', 'inside-logo', 'aya-logo', 'regenb-logo', 'flow-logo'] },
  { label: 'Text / UI', keys: ['intro-text-left', 'intro-text-right', 'bottom-actions', 'email-text'] },
];

const SHADOW       = 'drop-shadow(8px 12px 15px rgba(0,0,0,0.55))';
const SHADOW_HOVER = 'drop-shadow(12px 18px 20px rgba(0,0,0,0.7))';
const textStyle: React.CSSProperties = { color:'#9d0003', fontFamily:'Brawler,serif', fontWeight:'bold', fontSize:'24px', lineHeight:1.3 };

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

const DEFAULT_INTRO_LEFT = "Hello,\nI'm Charlie, a graphic designer focused on branding and identity. I create thoughtful, memorable visual systems that give brands a clearer voice and a stronger connection with their audience.";
const DEFAULT_INTRO_RIGHT = "BA (HONS)\nGraphic Branding & Identity\nUAL";

export default function Home({ initialItems = ITEMS, enableDebug = false, extraCategories = [], initialCanvasHeight = 4140, introTextLeft = DEFAULT_INTRO_LEFT, introTextRight = DEFAULT_INTRO_RIGHT, workSectionId = 'starlight-img' }: { initialItems?: Item[], enableDebug?: boolean, extraCategories?: Category[], initialCanvasHeight?: number, introTextLeft?: string, introTextRight?: string, workSectionId?: string } = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [copyText, setCopyText] = useState('Copy Email');
  const navigate = useNavigate();

  const [debug, setDebug] = useState(enableDebug); // Debug mode disabled after finalization
  const [panelVisible, setPanelVisible] = useState(true);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selected, setSelected] = useState<string|null>(null);
  const [grouped, setGrouped] = useState<Set<string>>(new Set());
  const [moveMode, setMoveMode] = useState<MoveMode>('both');
  const [mockupUrl, setMockupUrl] = useState('');
  const [mockupOpacity, setMockupOpacity] = useState(0.3);
  const [outputCopied, setOutputCopied] = useState(false);
  const [headerText, setHeaderText] = useState('Charlie Stamp');
  const [headerTop, setHeaderTop] = useState(33);
  const [headerLeft, setHeaderLeft] = useState(-7.83);
  const [canvasHeight, setCanvasHeight] = useState(initialCanvasHeight);
  const [introLeftText, setIntroLeftText] = useState(typeof introTextLeft === 'string' ? introTextLeft : DEFAULT_INTRO_LEFT);
  const [introRightText, setIntroRightText] = useState(typeof introTextRight === 'string' ? introTextRight : DEFAULT_INTRO_RIGHT);
  const [panelPos, setPanelPos] = useState({ top: 10, left: 10 });
  const panelDrag = useRef<{ startX: number; startY: number; startTop: number; startLeft: number } | null>(null);
  const drag = useRef<DragState|null>(null);
  const moveModeRef = useRef<MoveMode>('both');
  moveModeRef.current = moveMode;

  // Undo/redo history for item transforms
  const itemsRef = useRef<Item[]>(initialItems);
  useEffect(() => { itemsRef.current = items; }, [items]);
  const historyRef = useRef<Item[][]>([initialItems]);
  const historyIndexRef = useRef(0);
  const [historyVersion, setHistoryVersion] = useState(0);

  function pushHistory(next: Item[]) {
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    historyRef.current.push(next);
    historyIndexRef.current = historyRef.current.length - 1;
    setHistoryVersion(v => v + 1);
  }

  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    setItems(historyRef.current[historyIndexRef.current]);
    setHistoryVersion(v => v + 1);
  }

  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    setItems(historyRef.current[historyIndexRef.current]);
    setHistoryVersion(v => v + 1);
  }

  // historyVersion forces a re-render whenever the history stack changes
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;
  void historyVersion;

  useEffect(() => {
    document.body.setAttribute('data-skip-theme', 'true');
    return () => document.body.removeAttribute('data-skip-theme');
  }, []);

  // Scroll to hash target (e.g. /#bottom-actions from project pages)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    // Wait for layout/scaling to settle before scrolling
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 150;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function resizeLayout() {
      const wrapper = wrapperRef.current;
      const canvas  = canvasRef.current;
      if (!wrapper || !canvas) return;
      const scale = window.innerWidth / 1440;
      canvas.style.transform = `scale(${scale})`;
      if (stickyRef.current) stickyRef.current.style.transform = `scale(${scale})`;
      wrapper.style.height = `${canvasHeight * scale}px`;
    }
    resizeLayout();
    window.addEventListener('resize', resizeLayout);
    return () => window.removeEventListener('resize', resizeLayout);
  }, [canvasHeight]);

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

    function onUp() {
      if (drag.current) pushHistory(itemsRef.current);
      drag.current = null;
    }

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
    const next = items.map(it => keys.includes(it.key) ? { ...it, [prop]: !it[prop] } : it);
    setItems(next);
    pushHistory(next);
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
    const email = 'CharlieStampCreative@gmail.com';
    const done = () => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Email'), 2000);
    };
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '0';
      ta.style.opacity = '0';
      ta.style.pointerEvents = 'none';
      document.body.appendChild(ta);
      ta.focus({ preventScroll: true });
      ta.select();
      try { document.execCommand('copy'); done(); } catch { /* noop */ }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(fallback);
    } else {
      fallback();
    }
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
      return <img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block', pointerEvents:'none' }} />;
    }
    if (item.kind === 'shadow') {
      return <div style={{ filter: SHADOW }}><img src={item.src} alt={item.alt} style={{ width:'100%', height:'auto', display:'block' }} /></div>;
    }
    if (item.kind === 'popout') {
      return <PopInner src={item.src!} alt={item.alt!} disabled={debug} />;
    }
    if (item.kind === 'actions') {
      return <BottomActions copyText={copyText} copyEmail={copyEmail} disabled={false} />;
    }
    if (item.key === 'intro-text-left') {
      return <div style={textStyle}>{introLeftText.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br/>}{line}</React.Fragment>)}</div>;
    }
    if (item.key === 'intro-text-right') {
      return <div style={textStyle}>{introRightText.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br/>}{line}</React.Fragment>)}</div>;
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
      <div style={{ display: enableDebug ? 'block' : 'none', position:'fixed', top:panelPos.top, left:panelPos.left, zIndex:100000, fontFamily:'monospace', fontSize:12, color:'#fff' }}>
        <div
          onPointerDown={e => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            panelDrag.current = { startX: e.clientX, startY: e.clientY, startTop: panelPos.top, startLeft: panelPos.left };
          }}
          onPointerMove={e => {
            if (!panelDrag.current) return;
            const dx = e.clientX - panelDrag.current.startX;
            const dy = e.clientY - panelDrag.current.startY;
            setPanelPos({ top: panelDrag.current.startTop + dy, left: panelDrag.current.startLeft + dx });
          }}
          onPointerUp={() => { panelDrag.current = null; }}
          style={{ background:'rgba(0,0,0,0.6)', padding:'3px 12px', borderRadius:'6px 6px 0 0', fontSize:10, color:'#999', cursor:'grab', userSelect:'none', textAlign:'center' }}
        >
          ⠿⠿⠿ drag to move panel ⠿⠿⠿
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,0,0,0.82)', padding:'6px 12px', borderRadius:'0 0 6px 6px' }}>
          <label style={{ display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer' }}>
            <input type="checkbox" checked={debug} onChange={e => setDebug(e.target.checked)} />
            Debug Mode
          </label>
          {debug && (
            <button onClick={() => setPanelVisible(v => !v)} style={{ background:'#444', color:'#fff', border:'none', borderRadius:4, padding:'3px 8px', cursor:'pointer', fontSize:11 }}>
              {panelVisible ? 'Hide Panel' : 'Show Panel'}
            </button>
          )}
        </div>

        {debug && panelVisible && (
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

            {/* Center Horizontally */}
            <p style={{ margin:'0 0 4px', fontSize:11 }}>
              <strong>Alignment:</strong>
            </p>
            <div style={{ display:'flex', gap:6, marginBottom:10 }}>
              <button disabled={!selected} style={{ ...btn(false), flex: 1, opacity: selected ? 1 : 0.4 }} onClick={() => {
                if (!selected) return;
                const keys = affectedFor(selected);
                const next = items.map(it => {
                  if (!keys.includes(it.key)) return it;
                  const w = it.width ?? 200;
                  const newLeft = (1440 - w) / 2;
                  return { ...it, left: +newLeft.toFixed(3) };
                });
                setItems(next);
                pushHistory(next);
              }}>Center Horizontally</button>
            </div>

            {/* Grouping */}
            <div style={{ marginBottom:10, padding:8, background:'rgba(255,255,255,0.08)', borderRadius:4, maxHeight:240, overflowY:'auto' }}>
              <div style={{ display:'flex', gap:6, marginBottom:6 }}>
                <button style={{ ...btn(false), background:'#333' }} onClick={() => setGrouped(new Set(items.map(i => i.key)))}>Select All</button>
                <button style={{ ...btn(false), background:'#333' }} onClick={() => setGrouped(new Set())}>Clear</button>
              </div>
              {[...CATEGORIES, ...extraCategories].map(cat => {
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

            <label style={{ display:'block', marginBottom:4 }}>Header Text:</label>
            <input type="text" value={headerText} onChange={e => setHeaderText(e.target.value)} style={{ width:'100%', boxSizing:'border-box', marginBottom:8, padding:4, fontFamily:'monospace', fontSize:11 }} />

            <label style={{ display:'block', marginBottom:4 }}>Header Top: {headerTop.toFixed(2)}px</label>
            <input type="range" min={-50} max={150} step={0.1} value={headerTop} onChange={e => setHeaderTop(+e.target.value)} style={{ width:'100%', marginBottom:10 }} />

            <label style={{ display:'block', marginBottom:4 }}>Header Left: {headerLeft.toFixed(2)}px</label>
            <input type="range" min={-200} max={200} step={0.1} value={headerLeft} onChange={e => setHeaderLeft(+e.target.value)} style={{ width:'100%', marginBottom:10 }} />

            <label style={{ display:'block', marginBottom:4 }}>Canvas Height: {canvasHeight}px</label>
            <input type="range" min={2000} max={6000} step={10} value={canvasHeight} onChange={e => setCanvasHeight(+e.target.value)} style={{ width:'100%', marginBottom:10 }} />

            {(selected === 'intro-text-left' || selected === 'intro-text-right') && (
              <>
                <p style={{ margin:'8px 0 4px', fontSize:11, color:'#ccc', fontWeight:'bold' }}>Edit Text ("{selected}"):</p>
                <textarea
                  value={selected === 'intro-text-left' ? introLeftText : introRightText}
                  onChange={e => {
                    if (selected === 'intro-text-left') setIntroLeftText(e.target.value);
                    else setIntroRightText(e.target.value);
                  }}
                  rows={5}
                  style={{ width:'100%', boxSizing:'border-box', marginBottom:10, padding:6, fontFamily:'monospace', fontSize:11, resize:'vertical' }}
                  placeholder="Use new lines for line breaks"
                />
              </>
            )}

            {selected && items.find(it => it.key === selected)?.kind === 'text' && (
              <>
                <p style={{ margin:'8px 0 4px', fontSize:11, color:'#ccc', fontWeight:'bold' }}>Text Boundary Box:</p>
                <label style={{ display:'block', marginBottom:4 }}>Width: {(items.find(it => it.key === selected)?.width || 'auto')}</label>
                <input type="range" min={100} max={1200} step={10} value={items.find(it => it.key === selected)?.width || 500} onChange={e => {
                  const idx = items.findIndex(it => it.key === selected);
                  if (idx >= 0) setItems([...items.slice(0, idx), {...items[idx], width: +e.target.value}, ...items.slice(idx+1)]);
                }} onPointerUp={() => pushHistory(itemsRef.current)} style={{ width:'100%', marginBottom:8 }} />

                <label style={{ display:'block', marginBottom:4 }}>Height: {(items.find(it => it.key === selected)?.height || 'auto')}</label>
                <input type="range" min={20} max={400} step={5} value={items.find(it => it.key === selected)?.height || 100} onChange={e => {
                  const idx = items.findIndex(it => it.key === selected);
                  if (idx >= 0) setItems([...items.slice(0, idx), {...items[idx], height: +e.target.value}, ...items.slice(idx+1)]);
                }} onPointerUp={() => pushHistory(itemsRef.current)} style={{ width:'100%', marginBottom:10 }} />
              </>
            )}

            <label style={{ display:'block', marginBottom:4 }}>Mockup URL:</label>
            <input type="text" value={mockupUrl} onChange={e => setMockupUrl(e.target.value)} placeholder="https://..." style={{ width:'100%', boxSizing:'border-box', marginBottom:8, padding:4, fontFamily:'monospace', fontSize:11 }} />

            <label style={{ display:'block', marginBottom:4 }}>Opacity: {mockupOpacity.toFixed(2)}</label>
            <input type="range" min={0} max={1} step={0.05} value={mockupOpacity} onChange={e => setMockupOpacity(+e.target.value)} style={{ width:'100%', marginBottom:10 }} />

            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <button onClick={undo} disabled={!canUndo} style={{ flex:1, padding:'6px 0', cursor: canUndo ? 'pointer' : 'not-allowed', background:'#444', color:'#fff', border:'none', borderRadius:4, fontSize:11, opacity: canUndo ? 1 : 0.4 }}>
                ↺ Undo
              </button>
              <button onClick={redo} disabled={!canRedo} style={{ flex:1, padding:'6px 0', cursor: canRedo ? 'pointer' : 'not-allowed', background:'#444', color:'#fff', border:'none', borderRadius:4, fontSize:11, opacity: canRedo ? 1 : 0.4 }}>
                ↻ Redo
              </button>
            </div>

            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <button onClick={copyOutput} style={{ flex:1, padding:'6px 0', cursor:'pointer', background:'#00aaff', color:'#fff', border:'none', borderRadius:4, fontWeight:'bold', fontSize:11 }}>
                {outputCopied ? 'Copied ✓' : 'Copy Output'}
              </button>
              <button onClick={() => {
                setItems(initialItems);
                setSelected(null);
                setGrouped(new Set());
                historyRef.current = [initialItems];
                historyIndexRef.current = 0;
                setHistoryVersion(v => v + 1);
              }} style={{ padding:'6px 10px', cursor:'pointer', background:'#555', color:'#fff', border:'none', borderRadius:4, fontSize:11 }}>
                Reset
              </button>
            </div>

            <textarea readOnly value={output} style={{ width:'100%', height:220, boxSizing:'border-box', fontFamily:'monospace', fontSize:10, lineHeight:1.4, resize:'vertical' }} />
          </div>
        )}
      </div>

      {/* Sticky header */}
      <div ref={stickyRef}
        onPointerDown={e => {
          if (!debug) return;
          e.preventDefault();
          const startX = e.clientX;
          const startLeft = headerLeft;
          const handleMove = (me: PointerEvent) => {
            const dx = me.clientX - startX;
            setHeaderLeft(startLeft + dx);
          };
          const handleEnd = () => {
            document.removeEventListener('pointermove', handleMove);
            document.removeEventListener('pointerup', handleEnd);
          };
          document.addEventListener('pointermove', handleMove);
          document.addEventListener('pointerup', handleEnd);
          e.currentTarget?.setPointerCapture(e.pointerId);
        }}
        style={{ position:'fixed', top:0, left:`${headerLeft}px`, width:'1440px', zIndex:10000, transformOrigin:'top left', pointerEvents: debug ? 'auto' : 'none', cursor: debug ? 'move' : 'default' }}>
        <div style={{ position:'absolute', top:'-12.0317px', left:'1px', width:'1438.55px', zIndex:129 }}>
          <img src={cdn('f13df9c3652c4cc8b4ee870c5b3fd59a')} alt="Navigation" style={{ width:'100%', height:'auto', display:'block' }} />
        </div>
        <div style={{ position:'absolute', top:`${headerTop}px`, left:0, width:'1440px', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 160px', boxSizing:'border-box', zIndex:10001, pointerEvents:'auto' }}>
          <p style={{ color:'#9d0003', fontFamily:'Brawler,serif', fontWeight: 900, fontSize:'24px', margin:0 }}>{headerText}</p>
          <div style={{ display:'flex', gap:'40px' }}>
            {[{ label:'home', id:'hero-title' }, { label:'work', id:workSectionId }, { label:'contact', id:'bottom-actions' }].map(({ label, id }) => (
              <button key={id} onClick={() => scrollToSection(id)} style={{ background:'none', border:'none', color:'#9d0003', fontFamily:'Brawler,serif', fontWeight:'bold', fontSize:'20px', cursor:'pointer', padding:0 }} onMouseEnter={e => (e.currentTarget.style.opacity='0.7')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>{label}</button>
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
            const interactive = item.kind === 'popout' || item.kind === 'actions' || !!item.link;
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
                  width: isImg || item.width ? `${item.width}px` : undefined,
                  height: item.height ? `${item.height}px` : undefined,
                  zIndex: item.z,
                  transform: itemTransform(item),
                  transformOrigin: 'top left',
                  opacity: item.opacity ?? 1,
                  cursor: debug ? 'move' : item.link ? 'pointer' : 'default',
                  outline: isSel ? '2px solid #00aaff' : isGrouped && debug ? '2px dashed #00ff00' : 'none',
                  touchAction: debug ? 'none' : 'auto',
                  pointerEvents: debug ? 'auto' : interactive ? 'auto' : 'none',
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
      <button onClick={e => { if (disabled) return; copyEmail(); }} style={{ backgroundColor:'transparent', color:'#9d0003', padding:'8px 16px', borderRadius:'50px', fontFamily:'Arial,sans-serif', fontWeight:'bold', fontSize:'16px', cursor:'pointer', border:'2px solid #9d0003', display:'flex', alignItems:'center', gap:'8px', minWidth:'155px', justifyContent:'center' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px', flexShrink:0 }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none"/></svg>
        <span>{copyText}</span>
      </button>
      <a href="https://www.instagram.com/charliestampcreative/" target="_blank" rel="noreferrer" onClick={s} style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:'20px', height:'20px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/charlie-stamp/" target="_blank" rel="noreferrer" onClick={s} style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #9d0003', display:'flex', alignItems:'center', justifyContent:'center', color:'#9d0003', textDecoration:'none' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width:'20px', height:'20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
    </div>
  );
}
