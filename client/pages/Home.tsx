import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [copyText, setCopyText] = useState('Copy Email');
  const navigate = useNavigate();

  useEffect(() => {
    function resizeLayout() {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;

      const scale = window.innerWidth / 1440;
      canvas.style.transform = `scale(${scale})`;
      wrapper.style.height = `${5959 * scale}px`;
    }

    resizeLayout();
    window.addEventListener('resize', resizeLayout);
    return () => window.removeEventListener('resize', resizeLayout);
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -150;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText('CharlieStampCreative@gmail.com').then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Email'), 2000);
    }).catch(() => {
      // fallback
      const input = document.getElementById('hidden-email') as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy Email'), 2000);
      }
    });
  }

  return (
    <div style={{ backgroundColor: '#f1e4d6', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>

      {/* Scrollable Canvas Wrapper */}
      <div ref={wrapperRef} id="scroll-wrapper" style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <div
          ref={canvasRef}
          id="main-canvas"
          style={{
            width: '1440px',
            height: '5959px',
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: 'top left',
          }}
        >

          {/* ── Header (scrolls with page) ── */}
          <Item style={{ top: '-12.0317px', left: '1px', width: '1438.55px', zIndex: 129 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F61d9e021682643278772567710b1035e" alt="Navigation" />
          </Item>
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

          {/* ── Background Elements ── */}
          <Item style={{ top: 0, left: 0, width: '1440px', zIndex: 1 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F1530d8222ea34ff39c230b8bbbd4ade7" alt="" />
          </Item>

          <Item id="hero-title" style={{ top: '207.902px', left: '14.1656px', width: '1390.74px', zIndex: 133 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F22c4b55d9b29465ba37f08f5b89c9baa" alt="Stamp Creative" />
          </Item>

          <Item style={{ top: '4035.58px', left: '1103.83px', width: '338.656px', zIndex: 283, opacity: 0.85 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F2625da861d76461a9e04a77d76f24720" alt="Tea Spill" />
          </Item>

          <Item style={{ top: '4730.6px', left: '-9.7947px', width: '1453.03px', zIndex: 293 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3eb12f515b2f418ba6d144fe0c93b11e" alt="" />
          </Item>

          {/* ── Brand Assets (Shadows, no pop-out) ── */}
          <ShadowItem id="starlight-img" style={{ top: '962.722px', left: '80.9073px', width: '1283.72px', zIndex: 0, transform: 'rotate(0.05deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F5e8276c7560844a7bb23960025d476dc" alt="Starlight Image" />
          </ShadowItem>

          <ShadowItem style={{ top: '911.444px', left: '838.185px', width: '580.742px', zIndex: 166, transform: 'rotate(-0.73deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F47d3bee759ef4c9682aea6efa4a20ccf" alt="BrandOpus" />
          </ShadowItem>

          <ShadowItem style={{ top: '1855.1px', left: '-0.298013px', width: '1393.11px', zIndex: 203, transform: 'rotate(-0.18deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fe05478abd26e40589a95040ef320e3cf" alt="Inside Stories Image" />
          </ShadowItem>

          <ShadowItem style={{ top: '2519.34px', left: '70.9801px', width: '1351.26px', zIndex: 193, transform: 'rotate(-1.24deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fb49bbe412e7146c5b3f9cb83f65a1a55" alt="Aya Image" />
          </ShadowItem>

          <ShadowItem style={{ top: '2790.28px', left: '1046.54px', width: '404.166px', zIndex: 289, transform: 'rotate(0.25deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3d73a7328e1a4a77983bd66913be6b02" alt="Phone" />
          </ShadowItem>

          <ShadowItem style={{ top: '3304px', left: '-4.81457px', width: '1419.68px', zIndex: 287, transform: 'rotate(0.17deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2Fddf5aeafe88f4461b4bdcf7178899e70" alt="RegenB Image" />
          </ShadowItem>

          <ShadowItem style={{ top: '3926.81px', left: '25.9073px', width: '1106px', zIndex: 284, transform: 'rotate(2deg)' }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F8869078d3da3415ab58d8338f1812359" alt="Flow Image" />
          </ShadowItem>

          {/* ── Logos (Shadows + Pop-out hover) ── */}
          <PopOutItem
            style={{ top: '1441.17px', left: '14.9073px', width: '545.351px', zIndex: 205, transform: 'rotate(-0.91deg)' }}
            onClick={() => navigate('/project/starlight-beer')}
          >
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F437cd92f7a8143268a3bf09e074fd796" alt="Starlight Logo" />
          </PopOutItem>

          <PopOutItem
            style={{ top: '2325.44px', left: '758.815px', width: '382.371px', zIndex: 204, transform: 'rotate(-0.05deg)' }}
            onClick={() => navigate('/project/inside-stories')}
          >
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F8f7a3735549d489a91d2536c4c59f821" alt="Inside Stories Logo" />
          </PopOutItem>

          {/* Aya — no project page yet, hover only */}
          <PopOutItem
            style={{ top: '3087.63px', left: '12.6291px', width: '554.464px', zIndex: 288, transform: 'rotate(0.01deg)' }}
          >
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F30ed9c00fb28428cbefc39036d534225" alt="AYA Logo" />
          </PopOutItem>

          <PopOutItem
            style={{ top: '3817.7px', left: '465.834px', width: '589.89px', zIndex: 290, transform: 'rotate(0.57deg)' }}
            onClick={() => navigate('/project/regenb')}
          >
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F08b6e5c4bdbe44489df684a204ea604c" alt="RegenB Logo" />
          </PopOutItem>

          <PopOutItem
            style={{ top: '4487.3px', left: '871.371px', width: '564px', zIndex: 291, transform: 'rotate(1.87deg)' }}
            onClick={() => navigate('/project/flow')}
          >
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F3fb99cbbc54243ab9be8466e97e7023a" alt="Flow Logo" />
          </PopOutItem>

          {/* ── CTA image ── */}
          <Item style={{ top: '5125px', left: '64.2781px', width: '1328.33px', zIndex: 294 }}>
            <Img src="https://cdn.builder.io/api/v1/image/assets%2F1a7d8b4d8c7d4879aa4c7843b68daea6%2F072cd11f594b47afbb3cecd540201d87" alt="Let's Create Something" />
          </Item>

          {/* ── Typography ── */}
          <div
            id="intro-text-left"
            style={{
              position: 'absolute',
              top: '764px',
              left: '65px',
              transform: 'scale(1.01471)',
              transformOrigin: 'top left',
              zIndex: 150,
              color: '#9d0003',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '24px',
              lineHeight: 1.3,
            }}
          >
            Hello,<br />
            I'm Charlie, a graphic designer<br />
            and recent UAL graduate. I love<br />
            turning fun, creative ideas<br />
            into bold visual identities.
          </div>

          <div
            style={{
              position: 'absolute',
              top: '764.758px',
              left: '1040px',
              transformOrigin: 'top left',
              zIndex: 150,
              color: '#9d0003',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '24px',
              lineHeight: 1.3,
            }}
          >
            BA (HONS)<br />
            Graphic Branding &amp; Identity
          </div>

          {/* ── Bottom Actions ── */}
          <div
            id="bottom-actions"
            style={{
              position: 'absolute',
              top: '5664.47px',
              left: '62px',
              transform: 'scale(1.79411)',
              transformOrigin: 'top left',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <a
              href="mailto:CharlieStampCreative@gmail.com"
              style={{
                backgroundColor: '#9d0003',
                color: '#f1e4d6',
                padding: '8px 24px',
                borderRadius: '50px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                textDecoration: 'none',
                border: '2px solid #9d0003',
                transition: 'all 0.2s ease',
                display: 'inline-block',
              }}
            >
              Send Email
            </a>

            <button
              onClick={copyEmail}
              style={{
                backgroundColor: 'transparent',
                color: '#9d0003',
                padding: '8px 16px',
                borderRadius: '50px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '16px',
                textDecoration: 'none',
                cursor: 'pointer',
                border: '2px solid #9d0003',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" />
              </svg>
              <span>{copyText}</span>
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #9d0003',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9d0003',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #9d0003',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9d0003',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ width: '20px', height: '20px' }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* Email display text */}
          <div
            style={{
              position: 'absolute',
              top: '5827.29px',
              left: '75px',
              transform: 'scale(1.96471)',
              transformOrigin: 'top left',
              zIndex: 300,
              color: '#9d0003',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '24px',
              lineHeight: 1.3,
            }}
          >
            CharlieStampCreative@gmail.com
          </div>

          {/* Hidden input for clipboard fallback */}
          <input
            type="text"
            id="hidden-email"
            defaultValue="CharlieStampCreative@gmail.com"
            style={{ position: 'absolute', left: '-9999px' }}
            readOnly
          />

        </div>
      </div>
    </div>
  );
}

// ── Helper sub-components ──

function Item({ id, style, children }: { id?: string; style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div id={id} style={{ position: 'absolute', display: 'block', ...style }}>
      {children}
    </div>
  );
}

function ShadowItem({ id, style, children }: { id?: string; style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div
      id={id}
      style={{ position: 'absolute', display: 'block', ...style }}
    >
      <div style={{ filter: 'drop-shadow(8px 12px 15px rgba(80, 10, 5, 0.45))' }}>
        {children}
      </div>
    </div>
  );
}

function PopOutItem({
  id,
  style,
  children,
  onClick,
}: {
  id?: string;
  style: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        display: 'block',
        cursor: onClick ? 'pointer' : 'default',
        zIndex: hovered ? 9999 : style.zIndex,
        ...style,
      }}
    >
      <div
        style={{
          filter: hovered
            ? 'drop-shadow(12px 18px 20px rgba(80, 10, 5, 0.6))'
            : 'drop-shadow(8px 12px 15px rgba(80, 10, 5, 0.45))',
          transform: hovered ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />;
}
