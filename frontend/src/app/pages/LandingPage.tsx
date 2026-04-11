import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── BAMBI SVG ───────────────────────────────────────────────────────────────
function BambiSVG({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="#c8906a" />
      <circle cx="50" cy="36" r="16" fill="#c8906a" />
      <ellipse cx="50" cy="31" rx="7" ry="5" fill="#e8c4a0" />
      <ellipse cx="34" cy="26" rx="7" ry="10" fill="#c8906a" transform="rotate(-15 34 26)" />
      <ellipse cx="36" cy="26" rx="4" ry="7" fill="#e8a090" transform="rotate(-15 36 26)" />
      <ellipse cx="66" cy="26" rx="7" ry="10" fill="#c8906a" transform="rotate(15 66 26)" />
      <ellipse cx="64" cy="26" rx="4" ry="7" fill="#e8a090" transform="rotate(15 64 26)" />
      <circle cx="43" cy="36" r="5" fill="#2a1a0a" />
      <circle cx="57" cy="36" r="5" fill="#2a1a0a" />
      <circle cx="44.5" cy="34.5" r="1.5" fill="white" />
      <circle cx="58.5" cy="34.5" r="1.5" fill="white" />
      <ellipse cx="50" cy="44" rx="5" ry="3.5" fill="#1a0a05" />
      <ellipse cx="48.5" cy="43" rx="1.5" ry="1" fill="rgba(255,255,255,0.4)" />
      <path d="M 46 47 Q 50 51 54 47" stroke="#1a0a05" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="58" r="3.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="52" cy="65" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="60" cy="56" r="2.5" fill="rgba(255,255,255,0.3)" />
      <rect x="38" y="77" width="7" height="14" rx="3" fill="#b07850" />
      <rect x="48" y="77" width="7" height="14" rx="3" fill="#b07850" />
      <rect x="56" y="77" width="7" height="12" rx="3" fill="#b07850" />
      <circle cx="72" cy="60" r="5" fill="white" />
      <line x1="38" y1="22" x2="30" y2="10" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="10" x2="24" y2="5" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="10" x2="28" y2="4" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="22" x2="70" y2="10" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="10" x2="76" y2="5" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="10" x2="72" y2="4" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── THUMPER SVG (stylised bunny companion) ───────────────────────────────────
function ThumperSVG({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <ellipse cx="50" cy="72" rx="20" ry="17" fill="#d4c4b0" />
      <circle cx="50" cy="44" r="18" fill="#d4c4b0" />
      <ellipse cx="38" cy="16" rx="6" ry="18" fill="#d4c4b0" />
      <ellipse cx="38" cy="16" rx="3.5" ry="14" fill="#e8a0a0" />
      <ellipse cx="62" cy="16" rx="6" ry="18" fill="#d4c4b0" />
      <ellipse cx="62" cy="16" rx="3.5" ry="14" fill="#e8a0a0" />
      <circle cx="43" cy="44" r="4.5" fill="#2a1a0a" />
      <circle cx="57" cy="44" r="4.5" fill="#2a1a0a" />
      <circle cx="44.5" cy="42.5" r="1.5" fill="white" />
      <circle cx="58.5" cy="42.5" r="1.5" fill="white" />
      <ellipse cx="50" cy="53" rx="5" ry="3" fill="#e8a0a0" />
      <path d="M 46 57 Q 50 61 54 57" stroke="#2a1a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="38" y="85" width="7" height="13" rx="4" fill="#b8a890" />
      <rect x="55" y="85" width="7" height="13" rx="4" fill="#b8a890" />
      <ellipse cx="40" cy="96" rx="9" ry="5" fill="#c8b8a0" />
      <ellipse cx="62" cy="96" rx="9" ry="5" fill="#c8b8a0" />
    </svg>
  );
}

// ─── OWL SVG companion ────────────────────────────────────────────────────────
function OwlSVG({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <ellipse cx="50" cy="70" rx="22" ry="26" fill="#8B6914" />
      <circle cx="50" cy="40" r="20" fill="#A07820" />
      <ellipse cx="38" cy="24" rx="8" ry="12" fill="#8B6914" transform="rotate(-10 38 24)" />
      <ellipse cx="62" cy="24" rx="8" ry="12" fill="#8B6914" transform="rotate(10 62 24)" />
      <circle cx="42" cy="40" r="8" fill="white" />
      <circle cx="58" cy="40" r="8" fill="white" />
      <circle cx="42" cy="40" r="5" fill="#1a1a2e" />
      <circle cx="58" cy="40" r="5" fill="#1a1a2e" />
      <circle cx="43.5" cy="38.5" r="1.5" fill="white" />
      <circle cx="59.5" cy="38.5" r="1.5" fill="white" />
      <polygon points="50,49 46,55 54,55" fill="#D4861A" />
      <ellipse cx="30" cy="70" rx="8" ry="20" fill="#A07820" />
      <ellipse cx="70" cy="70" rx="8" ry="20" fill="#A07820" />
    </svg>
  );
}

// ─── SQUIRREL SVG companion ───────────────────────────────────────────────────
function SquirrelSVG({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path d="M 70 30 Q 90 10 85 50 Q 80 70 70 65 Z" fill="#8B4513" />
      <ellipse cx="45" cy="68" rx="20" ry="18" fill="#c8722a" />
      <circle cx="45" cy="40" r="18" fill="#c8722a" />
      <ellipse cx="33" cy="22" rx="6" ry="9" fill="#c8722a" transform="rotate(-10 33 22)" />
      <ellipse cx="57" cy="22" rx="6" ry="9" fill="#c8722a" transform="rotate(10 57 22)" />
      <circle cx="39" cy="40" r="4.5" fill="#1a0a05" />
      <circle cx="51" cy="40" r="4.5" fill="#1a0a05" />
      <circle cx="40" cy="38.5" r="1.5" fill="white" />
      <circle cx="52" cy="38.5" r="1.5" fill="white" />
      <ellipse cx="45" cy="50" rx="5" ry="3" fill="#a05520" />
      <rect x="35" y="82" width="7" height="14" rx="3" fill="#a05520" />
      <rect x="48" y="82" width="7" height="14" rx="3" fill="#a05520" />
    </svg>
  );
}

// ─── BUTTERFLY SVG ────────────────────────────────────────────────────────────
function ButterflySVG({ color = "#F59E0B", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <ellipse cx="10" cy="12" rx="9" ry="6" fill={color} opacity="0.8" transform="rotate(-20 10 12)" />
      <ellipse cx="30" cy="12" rx="9" ry="6" fill={color} opacity="0.8" transform="rotate(20 30 12)" />
      <ellipse cx="10" cy="20" rx="7" ry="5" fill={color} opacity="0.6" transform="rotate(10 10 20)" />
      <ellipse cx="30" cy="20" rx="7" ry="5" fill={color} opacity="0.6" transform="rotate(-10 30 20)" />
      <line x1="20" y1="5" x2="20" y2="26" stroke="#3D2B1F" strokeWidth="1.5" />
      <path d="M20 5 Q17 2 15 4" stroke="#3D2B1F" strokeWidth="1" fill="none" />
      <path d="M20 5 Q23 2 25 4" stroke="#3D2B1F" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ─── BEE SVG ─────────────────────────────────────────────────────────────────
function BeeSVG({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <ellipse cx="22" cy="16" rx="12" ry="8" fill="#F59E0B" />
      <ellipse cx="24" cy="14" rx="5" ry="7" fill="rgba(100,200,255,0.5)" transform="rotate(-30 24 14)" />
      <ellipse cx="28" cy="18" rx="5" ry="7" fill="rgba(100,200,255,0.5)" transform="rotate(20 28 18)" />
      <line x1="16" y1="13" x2="28" y2="13" stroke="#1a0a05" strokeWidth="1.5" />
      <line x1="14" y1="17" x2="30" y2="17" stroke="#1a0a05" strokeWidth="1.5" />
      <circle cx="32" cy="16" r="4" fill="#1a0a05" />
      <circle cx="33" cy="15" r="1" fill="white" />
    </svg>
  );
}

// ─── SHIELD ICON ─────────────────────────────────────────────────────────────
function ShieldIcon({ color = "#0EA5E9", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path d="M12 2L3 6V12C3 16.418 7.03 20.5 12 22C16.97 20.5 21 16.418 21 12V6L12 2Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── WARNING ICON ─────────────────────────────────────────────────────────────
function WarnIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="12" y1="9" x2="12" y2="13" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="#D97706" />
    </svg>
  );
}

// ─── FEATURE DATA ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    icon: "🏦",
    title: "Guided Sandbox Modules",
    desc: "Practice real digital tasks in a safe, familiar environment using an SBI-inspired banking interface.",
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.08)",
    badge: "INTERACTIVE",
  },
  {
    id: 2,
    icon: "🚩",
    title: "Red Flag Detector",
    desc: "Train your instincts by spotting phishing clues, suspicious links, and fake urgency before scammers trick you.",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    badge: "QUIZ",
  },
  {
    id: 3,
    icon: "♿",
    title: "Ultra-Accessible Design",
    desc: "Built for clarity, comfort, and confidence — especially for first-time digital users with large tap targets.",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    badge: "ACCESSIBLE",
  },
  {
    id: 4,
    icon: "🌐",
    title: "Multilingual Support",
    desc: "Switch the entire experience into a familiar local language for easier, more inclusive learning.",
    color: "#10B981",
    bg: "rgba(16,185,129,0.08)",
    badge: "INCLUSIVE",
  },
  {
    id: 5,
    icon: "🏅",
    title: "Progress Tracking & Badges",
    desc: "Celebrate every small win as users build digital confidence step by step with visible achievements.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    badge: "GAMIFIED",
  },
  {
    id: 6,
    icon: "🔊",
    title: "Voice-Over Guidance",
    desc: "Listen to clear spoken instructions for a more accessible, audio-first learning experience.",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.08)",
    badge: "AUDIO",
  },
  {
    id: 7,
    icon: "🤖",
    title: "AI Scam Simulator",
    desc: "Practice spotting manipulation in a safe LLM-powered chat simulation before it happens in real life.",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.08)",
    badge: "AI-POWERED",
  },
  {
    id: 8,
    icon: "🎭",
    title: "Deepfake Recognition Lab",
    desc: "Learn to identify AI-generated photos, voices, and deceptive media with side-by-side comparisons.",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.08)",
    badge: "LAB",
  },
  {
    id: 9,
    icon: "📢",
    title: "Community Siren",
    desc: "Stay updated with scam alerts reported by real users. Generate 'Warning of the Day' from your community.",
    color: "#F97316",
    bg: "rgba(249,115,22,0.08)",
    badge: "COMMUNITY",
  },
];

// ─── FLOATING PARTICLE ────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  type: "leaf" | "sparkle";
  color: string;
  delay: number;
  duration: number;
  size: number;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function SafetyNetLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: (["leaf", "sparkle"] as const)[i % 2],
      color: ["#F59E0B", "#10B981", "#0EA5E9", "#EC4899", "#8B5CF6"][i % 5],
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 8,
      size: 14 + Math.random() * 16,
    }))
  );
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 2800);
  };

  const handleScroll = useCallback(() => {
    const sy = window.scrollY;
    setScrollY(sy);
    setIsNavScrolled(sy > 60);

    if (journeyRef.current) {
      const rect = journeyRef.current.getBoundingClientRect();
      const sectionHeight = journeyRef.current.offsetHeight;
      const raw = (-rect.top) / (sectionHeight - window.innerHeight);
      setJourneyProgress(Math.min(1, Math.max(0, raw)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Intersection Observer for section reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setVisibleSections((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const bambiX = journeyProgress * 82; // 0% → 82% of path width

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Nunito', sans-serif;
          background: #FFF8F0;
          color: #3D2B1F;
          overflow-x: hidden;
        }

        .display-font { font-family: 'Playfair Display', serif; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FFF8F0; }
        ::-webkit-scrollbar-thumb { background: #c8906a; border-radius: 4px; }

        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        @keyframes floatSide {
          0% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(12px) translateY(-8px); }
          66% { transform: translateX(-8px) translateY(5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(245,158,11,0); }
        }
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,165,233,0.4); }
          50% { box-shadow: 0 0 0 14px rgba(14,165,233,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bambiWalk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes leafFloat {
          0% { transform: translateY(0) rotate(0deg) translateX(0); }
          25% { transform: translateY(-20px) rotate(15deg) translateX(8px); }
          75% { transform: translateY(-12px) rotate(-10deg) translateX(-6px); }
          100% { transform: translateY(0) rotate(0deg) translateX(0); }
        }
        @keyframes forestGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(16,185,129,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(16,185,129,0.8)); }
        }
        @keyframes treeSway {
          0%, 100% { transform: rotate(0deg); transform-origin: bottom center; }
          50% { transform: rotate(2deg); transform-origin: bottom center; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px) scale(1.02);
        }

        .login-btn {
          animation: pulse-blue 2.5s ease-in-out infinite;
        }
        .cta-primary {
          animation: pulse-glow 2s ease-in-out infinite;
          background-size: 200% auto;
          background-image: linear-gradient(135deg, #F59E0B 0%, #E8923A 40%, #F59E0B 100%);
          transition: background-position 0.4s ease, transform 0.2s ease;
        }
        .cta-primary:hover {
          background-position: right center;
          transform: scale(1.04);
        }

        .nav-link {
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #F59E0B;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #F59E0B; }

        .companion-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .companion-card:hover {
          transform: translateY(-8px) rotate(-1deg);
        }

        .tree { animation: treeSway 3s ease-in-out infinite; }
        .tree:nth-child(2) { animation-delay: 0.5s; animation-duration: 4s; }
        .tree:nth-child(3) { animation-delay: 1s; animation-duration: 3.5s; }

        .safe-forest { animation: forestGlow 3s ease-in-out infinite; }

        .badge-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      <div style={{ position: "relative", minHeight: "100vh" }}>

        {/* ── LOGIN PROMPT TOAST ── */}
        {showLoginPrompt && (
          <div
            style={{
              position: "fixed",
              top: "88px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
              background: "white",
              borderRadius: "16px",
              padding: "14px 24px",
              boxShadow: "0 8px 40px rgba(61,43,31,0.18)",
              border: "1.5px solid rgba(14,165,233,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              animation: "heroReveal 0.3s ease both",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>🔐</span>
            <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0284C7" }}>
              Login to proceed
            </span>
            <a
              href="/login"
              style={{
                padding: "6px 16px",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.82rem",
                textDecoration: "none",
                marginLeft: "4px",
              }}
            >
              Login →
            </a>
          </div>
        )}

        {/* ── FLOATING BACKGROUND PARTICLES ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                animation: `leafFloat ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                opacity: 0.45,
              }}
            >
              {p.type === "leaf" && (
                <span style={{ fontSize: p.size * 0.8, display: "block" }}>🍃</span>
              )}
              {p.type === "sparkle" && (
                <div
                  style={{
                    width: p.size / 2,
                    height: p.size / 2,
                    borderRadius: "50%",
                    background: p.color,
                    animation: `sparkle ${p.duration}s ease-in-out infinite`,
                    animationDelay: `${p.delay}s`,
                    boxShadow: `0 0 8px ${p.color}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────────────────
            NAVBAR
        ──────────────────────────────────────────────────────────────────── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0 2rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: isNavScrolled
              ? "rgba(255,248,240,0.92)"
              : "rgba(255,248,240,0.4)",
            backdropFilter: "blur(12px)",
            borderBottom: isNavScrolled ? "1px solid rgba(200,144,106,0.2)" : "none",
            transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
            boxShadow: isNavScrolled ? "0 2px 20px rgba(61,43,31,0.08)" : "none",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(45,106,79,0.3)",
              }}
            >
              <ShieldIcon color="white" size={20} />
            </div>
            <span
              className="display-font"
              style={{ fontSize: "1.4rem", fontWeight: 800, color: "#2D6A4F", letterSpacing: "-0.5px" }}
            >
              Safety<span style={{ color: "#F59E0B" }}>Net</span>
            </span>
          </div>

          {/* Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#5C4033",
            }}
          >
            <a href="#features" onClick={handleNavClick} className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Features</a>
            <a href="#journey" onClick={handleNavClick} className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Our Story</a>
            <a href="#community" onClick={handleNavClick} className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Community</a>
            <a href="#about" onClick={handleNavClick} className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>About</a>
          </div>

          {/* Auth Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="/login"
              className="login-btn"
              style={{
                padding: "10px 22px",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              🔐 Login
            </a>
            <a
              href="#features"
              style={{
                padding: "10px 22px",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Start Learning
            </a>
          </div>
        </nav>

        {/* ────────────────────────────────────────────────────────────────────
            HERO SECTION
        ──────────────────────────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "100px 2rem 60px",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #FFF8F0 0%, #FEF3C7 35%, #DCFCE7 75%, #E0F2FE 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 12s ease infinite",
          }}
        >
          {/* Background Forest Silhouette */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ display: "block" }}>
              <path d="M0 200 L0 140 L60 100 L100 130 L140 80 L180 110 L220 60 L260 90 L300 50 L340 80 L380 40 L420 70 L460 30 L500 60 L540 20 L580 50 L620 10 L660 45 L700 15 L740 50 L780 20 L820 55 L860 25 L900 60 L940 30 L980 65 L1020 35 L1060 70 L1100 40 L1140 75 L1180 45 L1220 80 L1260 55 L1300 90 L1340 65 L1380 100 L1440 80 L1440 200 Z" fill="#2D6A4F" opacity="0.12" />
              <path d="M0 200 L0 160 L80 130 L130 155 L180 120 L230 145 L280 110 L330 135 L380 105 L430 130 L480 100 L530 125 L580 95 L630 120 L680 90 L730 115 L780 85 L830 110 L880 80 L930 105 L980 75 L1030 100 L1080 70 L1130 95 L1180 65 L1230 90 L1280 115 L1330 140 L1380 160 L1440 145 L1440 200 Z" fill="#40916C" opacity="0.10" />
            </svg>
          </div>

          {/* Decorative security badge top-right */}
          <div
            style={{
              position: "absolute",
              top: "110px",
              right: "5%",
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.3)",
              borderRadius: "16px",
              padding: "12px 18px",
              backdropFilter: "blur(8px)",
              animation: "floatUpDown 4s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#0284C7", fontWeight: 700 }}>
              <ShieldIcon size={18} color="#0EA5E9" />
              SECURED LEARNING
            </div>
          </div>

          {/* Decorative warning card top-left */}
          <div
            style={{
              position: "absolute",
              top: "140px",
              left: "4%",
              background: "rgba(254,243,199,0.9)",
              border: "1px solid rgba(245,158,11,0.4)",
              borderRadius: "14px",
              padding: "10px 14px",
              backdropFilter: "blur(8px)",
              animation: "floatUpDown 5s ease-in-out infinite",
              animationDelay: "0.5s",
              maxWidth: "180px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#D97706", fontWeight: 700 }}>
              <WarnIcon size={16} />
              <span>Scam Alert! 🚨<br/><span style={{ fontWeight: 500, color: "#92400E" }}>Fake bank SMS detected</span></span>
            </div>
          </div>

          {/* Hero Content */}
          <div style={{ maxWidth: "1100px", width: "100%", display: "flex", alignItems: "center", gap: "5rem", flexWrap: "wrap", justifyContent: "center" }}>

            {/* Text Side */}
            <div style={{ flex: "1 1 420px", maxWidth: "560px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(45,106,79,0.1)",
                  border: "1px solid rgba(45,106,79,0.25)",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  marginBottom: "1.5rem",
                  animation: "heroReveal 0.6s ease both",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2D6A4F", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🌿 Your Digital Safety Companion
                </span>
              </div>

              <h1
                className="display-font"
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  fontWeight: 900,
                  color: "#2D2B1F",
                  marginBottom: "1.25rem",
                  animation: "heroReveal 0.7s 0.1s ease both",
                }}
              >
                Stay Safe.
                <br />
                <span style={{ color: "#2D6A4F" }}>Stay Confident.</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #F59E0B, #E8923A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Stay Connected.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.75,
                  color: "#6B4226",
                  marginBottom: "2rem",
                  fontWeight: 500,
                  animation: "heroReveal 0.7s 0.2s ease both",
                }}
              >
                SafetyNet guides elders and first-time internet users through digital safety —
                spotting scams, building confidence, and navigating the internet worry-free.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  animation: "heroReveal 0.7s 0.3s ease both",
                }}
              >
                <a
                  href="/login"
                  className="login-btn"
                  style={{
                    padding: "16px 32px",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 20px rgba(14,165,233,0.35)",
                    letterSpacing: "0.3px",
                  }}
                >
                  🔐 Login to SafetyNet
                </a>
                <a
                  href="#features"
                  className="cta-primary"
                  style={{
                    padding: "16px 32px",
                    borderRadius: "50px",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
                    letterSpacing: "0.3px",
                  }}
                >
                  🌿 Explore Features
                </a>
              </div>

              {/* Trust badges */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "2rem",
                  flexWrap: "wrap",
                  animation: "heroReveal 0.7s 0.4s ease both",
                }}
              >
                {[
                  { icon: "🛡️", label: "Scam-Proof" },
                  { icon: "♿", label: "Accessible" },
                  { icon: "🌐", label: "Multilingual" },
                  { icon: "🆓", label: "Free to Use" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#5C4033",
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(200,144,106,0.25)",
                      borderRadius: "50px",
                      padding: "6px 14px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span>{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Bambi Hero Visual */}
            <div
              style={{
                flex: "1 1 300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Glowing circle background */}
              <div
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(45,106,79,0.12) 60%, transparent 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  animation: "floatUpDown 4s ease-in-out infinite",
                }}
              >
                {/* Decorative rings */}
                <div
                  style={{
                    position: "absolute",
                    width: 290,
                    height: 290,
                    borderRadius: "50%",
                    border: "2px dashed rgba(245,158,11,0.25)",
                    animation: "floatUpDown 6s ease-in-out infinite reverse",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    border: "1px solid rgba(45,106,79,0.2)",
                  }}
                />

                {/* Bambi big */}
                <div style={{ animation: "bambiWalk 2s ease-in-out infinite" }}>
                  <BambiSVG size={200} />
                </div>

                {/* Shield badge floating near Bambi */}
                <div
                  style={{
                    position: "absolute",
                    top: "15%",
                    right: "-5%",
                    background: "white",
                    borderRadius: "14px",
                    padding: "10px 14px",
                    boxShadow: "0 8px 24px rgba(14,165,233,0.2)",
                    animation: "floatUpDown 3s ease-in-out infinite",
                    animationDelay: "1.5s",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0284C7", display: "flex", alignItems: "center", gap: "5px" }}>
                    <ShieldIcon size={16} color="#0EA5E9" />
                    100% Safe
                  </div>
                </div>

                {/* Bambi speech bubble */}
                <div
                  style={{
                    position: "absolute",
                    top: "8%",
                    left: "-10%",
                    background: "white",
                    borderRadius: "16px",
                    padding: "10px 16px",
                    boxShadow: "0 8px 24px rgba(61,43,31,0.12)",
                    maxWidth: "150px",
                    animation: "floatUpDown 5s ease-in-out infinite",
                    animationDelay: "0.8s",
                  }}
                >
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3D2B1F", lineHeight: 1.4 }}>
                    Hi! I'm Bambi 🦌<br/>
                    <span style={{ color: "#2D6A4F", fontWeight: 600 }}>I'll guide you safely!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SCROLL JOURNEY SECTION
        ──────────────────────────────────────────────────────────────────── */}
        <section
          id="journey"
          ref={journeyRef}
          style={{
            position: "relative",
            height: "150vh", // sticky scroll height
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "linear-gradient(180deg, #FFF8F0 0%, #E8F5E9 60%, #C8E6C9 100%)",
            }}
          >
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
              <h2
                className="display-font"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#2D2B1F", marginBottom: "0.75rem" }}
              >
                Bambi's Journey to
                <span style={{ color: "#2D6A4F" }}> Digital Safety</span>
              </h2>
              <p style={{ fontSize: "1rem", color: "#6B4226", fontWeight: 500, maxWidth: "500px", margin: "0 auto" }}>
                Scroll to walk with Bambi from confusion to confidence — every step teaches you something new.
              </p>
            </div>

            {/* Journey Track */}
            <div
              style={{
                width: "90%",
                maxWidth: "900px",
                position: "relative",
                padding: "0 1rem",
              }}
            >
              {/* Path / Track */}
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "rgba(45,106,79,0.15)",
                  borderRadius: "8px",
                  position: "relative",
                  marginBottom: "2rem",
                }}
              >
                {/* Progress fill */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${bambiX + 5}%`,
                    background: "linear-gradient(90deg, #40916C, #52B788)",
                    borderRadius: "8px",
                    transition: "width 0.1s linear",
                    boxShadow: "0 0 12px rgba(64,145,108,0.5)",
                  }}
                />

                {/* Milestone dots */}
                {[0, 25, 50, 75, 100].map((pct, i) => {
                  const labels = ["Start", "Awareness", "Practice", "Confidence", "Safe! 🌲"];
                  const isReached = bambiX >= pct - 2;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${pct}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isReached ? 18 : 14,
                        height: isReached ? 18 : 14,
                        borderRadius: "50%",
                        background: isReached ? "#2D6A4F" : "#FFFFFF",
                        border: `2px solid ${isReached ? "#40916C" : "rgba(45,106,79,0.3)"}`,
                        boxShadow: isReached ? "0 0 10px rgba(45,106,79,0.5)" : "none",
                        transition: "all 0.3s ease",
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          color: isReached ? "#2D6A4F" : "#9CA3AF",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                          transition: "color 0.3s",
                        }}
                      >
                        {labels[i]}
                      </div>
                    </div>
                  );
                })}

                {/* BAMBI walking on the path */}
                <div
                  style={{
                    position: "absolute",
                    left: `${bambiX}%`,
                    top: "50%",
                    transform: "translate(-50%, -100%)",
                    transition: "left 0.15s linear",
                    zIndex: 10,
                    animation: "bambiWalk 0.6s ease-in-out infinite",
                    filter: "drop-shadow(0 4px 8px rgba(61,43,31,0.2))",
                  }}
                >
                  <BambiSVG size={70} />
                </div>
              </div>

              {/* Journey stage label */}
              <div style={{ textAlign: "center", marginTop: "4rem" }}>
                {journeyProgress < 0.2 && (
                  <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B4226" }}>🌅 Starting the journey... <span style={{ color: "#2D6A4F" }}>Welcome, friend!</span></p>
                  </div>
                )}
                {journeyProgress >= 0.2 && journeyProgress < 0.45 && (
                  <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B4226" }}>🔍 Learning to <span style={{ color: "#EF4444" }}>spot red flags</span> in emails and messages...</p>
                  </div>
                )}
                {journeyProgress >= 0.45 && journeyProgress < 0.7 && (
                  <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B4226" }}>💪 <span style={{ color: "#0EA5E9" }}>Practicing safely</span> in the sandbox — no risk, all learning!</p>
                  </div>
                )}
                {journeyProgress >= 0.7 && journeyProgress < 0.9 && (
                  <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B4226" }}>🏅 Earning badges, <span style={{ color: "#F59E0B" }}>building confidence</span> every day!</p>
                  </div>
                )}
                {journeyProgress >= 0.9 && (
                  <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2D6A4F" }}>🌲✨ Bambi reached the Safe Forest! <span style={{ color: "#F59E0B" }}>You did it!</span></p>
                  </div>
                )}
              </div>

              {/* Forest at the end */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: "-20px",
                  opacity: Math.min(1, journeyProgress * 2.5),
                  transition: "opacity 0.3s",
                  pointerEvents: "none",
                }}
                className="safe-forest"
              >
                <svg viewBox="0 0 120 100" width="120" height="100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="60,10 35,55 85,55" fill="#2D6A4F" className="tree" />
                  <rect x="54" y="55" width="12" height="18" fill="#8B6914" />
                  <polygon points="40,20 15,60 65,60" fill="#40916C" className="tree" />
                  <rect x="34" y="60" width="10" height="15" fill="#8B6914" />
                  <polygon points="85,15 60,60 110,60" fill="#52B788" className="tree" />
                  <rect x="79" y="60" width="11" height="16" fill="#8B6914" />
                  <circle cx="60" cy="45" r="8" fill="rgba(255,215,0,0.8)" />
                </svg>
              </div>
            </div>

            {/* Scroll hint */}
            {journeyProgress < 0.05 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  animation: "floatUpDown 1.5s ease-in-out infinite",
                  color: "#9CA3AF",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                <span>Scroll to walk with Bambi</span>
                <span style={{ fontSize: "1.2rem" }}>↓</span>
              </div>
            )}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            WHY SAFETYNET
        ──────────────────────────────────────────────────────────────────── */}
        <section
          id="about"
          data-reveal
          style={{
            padding: "100px 2rem",
            background: "linear-gradient(180deg, #C8E6C9 0%, #FFF8F0 100%)",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "50px",
                padding: "6px 18px",
                marginBottom: "1.5rem",
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#D97706",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
              }}
            >
              🦌 Why SafetyNet?
            </div>

            <h2
              className="display-font"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#2D2B1F",
                marginBottom: "1.25rem",
                lineHeight: 1.15,
              }}
            >
              The internet can feel{" "}
              <span style={{ color: "#EF4444" }}>overwhelming</span>
              <br />
              — but it doesn't have to be.
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#6B4226",
                lineHeight: 1.8,
                maxWidth: "680px",
                margin: "0 auto 3.5rem",
                fontWeight: 500,
              }}
            >
              Millions of elders and first-time digital users fall victim to scams every year —
              not because they're careless, but because no one ever taught them how. SafetyNet
              changes that with warmth, not fear.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  icon: "📱",
                  stat: "4.9B+",
                  label: "Internet users globally",
                  sub: "Many still need digital safety education",
                  color: "#0EA5E9",
                },
                {
                  icon: "⚠️",
                  stat: "₹1,750Cr",
                  label: "Lost to cyber fraud in India",
                  sub: "Elders are disproportionately targeted",
                  color: "#EF4444",
                },
                {
                  icon: "🛡️",
                  stat: "92%",
                  label: "Scams preventable with awareness",
                  sub: "Basic training makes all the difference",
                  color: "#2D6A4F",
                },
                {
                  icon: "🌟",
                  stat: "Free",
                  label: "Always accessible for everyone",
                  sub: "No barriers — SafetyNet is for all",
                  color: "#F59E0B",
                },
              ].map((s) => (
                <div
                  key={s.stat}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "2rem 1.5rem",
                    boxShadow: "0 4px 24px rgba(61,43,31,0.08)",
                    border: `1px solid rgba(0,0,0,0.06)`,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <div
                    className="display-font"
                    style={{ fontSize: "2.5rem", fontWeight: 900, color: s.color, marginBottom: "0.25rem" }}
                  >
                    {s.stat}
                  </div>
                  <div style={{ fontWeight: 700, color: "#3D2B1F", marginBottom: "0.35rem" }}>{s.label}</div>
                  <div style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: 1.5 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            FEATURES GRID
        ──────────────────────────────────────────────────────────────────── */}
        <section
          id="features"
          style={{
            padding: "100px 2rem",
            background: "#FFF8F0",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(45,106,79,0.1)",
                  border: "1px solid rgba(45,106,79,0.25)",
                  borderRadius: "50px",
                  padding: "6px 18px",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#2D6A4F",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                ✨ All Features
              </div>
              <h2
                className="display-font"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#2D2B1F", marginBottom: "1rem" }}
              >
                Everything You Need to
                <span style={{ color: "#2D6A4F" }}> Stay Safe Online</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#6B4226", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75 }}>
                Nine powerful tools designed to make digital safety simple, engaging, and effective — for everyone.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {FEATURES.map((f, i) => (
                <div
                  key={f.id}
                  className="feature-card"
                  onMouseEnter={() => setHoveredFeature(f.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    background: hoveredFeature === f.id ? "white" : f.bg,
                    border: `1.5px solid ${hoveredFeature === f.id ? f.color : "transparent"}`,
                    borderRadius: "20px",
                    padding: "1.75rem",
                    boxShadow: hoveredFeature === f.id
                      ? `0 12px 40px ${f.color}30`
                      : "0 2px 12px rgba(61,43,31,0.06)",
                    animation: `fadeSlideUp 0.5s ${i * 0.07}s ease both`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Shimmer stripe on hover */}
                  {hoveredFeature === f.id && (
                    <div
                      className="badge-shimmer"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: f.color,
                        borderRadius: "20px 20px 0 0",
                      }}
                    />
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        background: f.bg,
                        border: `1px solid ${f.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.6rem",
                        boxShadow: `0 4px 12px ${f.color}20`,
                      }}
                    >
                      {f.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "0.64rem",
                        fontWeight: 800,
                        color: f.color,
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}30`,
                        borderRadius: "50px",
                        padding: "3px 10px",
                        letterSpacing: "0.8px",
                      }}
                    >
                      {f.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2D2B1F", marginBottom: "0.6rem" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#6B4226", lineHeight: 1.65, fontWeight: 500 }}>
                    {f.desc}
                  </p>

                  {hoveredFeature === f.id && (
                    <div
                      style={{
                        marginTop: "1.2rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: f.color,
                        cursor: "pointer",
                      }}
                    >
                      Learn more →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            LEARN WITH BAMBI & FRIENDS
        ──────────────────────────────────────────────────────────────────── */}
        <section
          id="community"
          style={{
            padding: "100px 2rem",
            background: "linear-gradient(180deg, #FFF8F0 0%, #E8F5E9 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large soft background circle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: "50px",
                  padding: "6px 18px",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#D97706",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                🌲 Bambi's Forest Friends
              </div>
              <h2
                className="display-font"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#2D2B1F", marginBottom: "1rem" }}
              >
                Learn Digital Safety{" "}
                <span style={{ color: "#F59E0B" }}>Together</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#6B4226", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75 }}>
                Bambi and friends make digital learning a community adventure. No one navigates the internet alone.
              </p>
            </div>

            {/* Companions */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "2.5rem",
                flexWrap: "wrap",
                marginBottom: "4rem",
              }}
            >
              {[
                {
                  svg: <BambiSVG size={110} />,
                  name: "Bambi",
                  role: "Your Guide",
                  desc: "Leads you through every safety lesson with warmth and care.",
                  color: "#c8906a",
                  bg: "rgba(200,144,106,0.1)",
                },
                {
                  svg: <ThumperSVG size={90} />,
                  name: "Thumper",
                  role: "The Questioner",
                  desc: "Always asks 'is this a scam?' — and teaches you to do the same!",
                  color: "#d4c4b0",
                  bg: "rgba(212,196,176,0.15)",
                },
                {
                  svg: <OwlSVG size={90} />,
                  name: "Ollie Owl",
                  role: "The Knowledge Keeper",
                  desc: "Explains deepfakes, phishing, and digital concepts in simple words.",
                  color: "#A07820",
                  bg: "rgba(160,120,32,0.1)",
                },
                {
                  svg: <SquirrelSVG size={90} />,
                  name: "Scout",
                  role: "The Alert Sender",
                  desc: "Runs the Community Siren — always first to spot and share new scam warnings.",
                  color: "#c8722a",
                  bg: "rgba(200,114,42,0.1)",
                },
              ].map((c) => (
                <div
                  key={c.name}
                  className="companion-card"
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "2rem 1.5rem 1.5rem",
                    textAlign: "center",
                    boxShadow: "0 8px 32px rgba(61,43,31,0.10)",
                    width: "220px",
                    border: `1px solid ${c.color}30`,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      animation: "floatUpDown 4s ease-in-out infinite",
                    }}
                  >
                    {c.svg}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: `${c.color}20`,
                      borderRadius: "50px",
                      padding: "3px 10px",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      color: c.color === "#d4c4b0" ? "#8B7355" : c.color,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {c.role}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#2D2B1F", marginBottom: "0.5rem" }}>
                    {c.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#6B4226", lineHeight: 1.6, fontWeight: 500 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Scam alert preview card */}
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                background: "white",
                borderRadius: "24px",
                padding: "2rem",
                boxShadow: "0 8px 40px rgba(239,68,68,0.12)",
                border: "1.5px solid rgba(239,68,68,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <WarnIcon size={28} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#DC2626" }}>Community Siren Alert 🚨</div>
                  <div style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>Reported 2 minutes ago · 47 people confirmed</div>
                </div>
              </div>
              <div
                style={{
                  background: "#FEF2F2",
                  borderRadius: "14px",
                  padding: "1rem 1.25rem",
                  marginBottom: "1rem",
                  border: "1px dashed rgba(239,68,68,0.3)",
                }}
              >
                <p style={{ fontSize: "0.88rem", color: "#3D2B1F", fontWeight: 500, lineHeight: 1.6 }}>
                  <strong>⚠️ FAKE SMS:</strong> "Dear customer, your SBI account will be blocked. Click here to verify: bit.ly/sbi-upd8"
                  <br />
                  <span style={{ color: "#DC2626", fontWeight: 700 }}>🚩 Red Flags: Urgency + suspicious link + grammar errors</span>
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #EF4444, #DC2626)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🚩 Report Similar Scam
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "50px",
                    background: "rgba(45,106,79,0.1)",
                    color: "#2D6A4F",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    border: "1px solid rgba(45,106,79,0.25)",
                    cursor: "pointer",
                  }}
                >
                  ✅ I Already Knew This!
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            ACCESSIBILITY & TRUST
        ──────────────────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "100px 2rem",
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F3460 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow blobs */}
          <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(14,165,233,0.08)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(245,158,11,0.06)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  borderRadius: "50px",
                  padding: "6px 18px",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#38BDF8",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                🛡️ Designed for Trust
              </div>
              <h2
                className="display-font"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "white", marginBottom: "1rem" }}
              >
                Built for Every{" "}
                <span style={{ color: "#38BDF8" }}>Human,</span>
                <br />
                Not Just Tech Experts
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#94A3B8", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75 }}>
                We designed SafetyNet so that anyone — regardless of age, literacy, or language — can feel safe and confident online.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              {[
                { icon: "🔤", title: "Large, Clear Text", desc: "Readable fonts and generous sizing for all vision levels", color: "#38BDF8" },
                { icon: "🎨", title: "High Contrast UI", desc: "Optimised color palettes that meet WCAG accessibility standards", color: "#A78BFA" },
                { icon: "👆", title: "Big Tap Targets", desc: "Oversized buttons and inputs for users with motor difficulties", color: "#34D399" },
                { icon: "🔊", title: "Voice Read-Aloud", desc: "Every instruction can be spoken aloud in your preferred language", color: "#FBBF24" },
                { icon: "🌐", title: "Local Languages", desc: "Switch the entire interface to Hindi, Marathi, Tamil, and more", color: "#F472B6" },
                { icon: "📶", title: "Low Bandwidth Ready", desc: "Works smoothly even on 2G connections and older devices", color: "#FB923C" },
              ].map((a) => (
                <div
                  key={a.title}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "18px",
                    padding: "1.5rem",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.3s, border 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${a.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{a.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: a.color, marginBottom: "0.5rem" }}>{a.title}</h3>
                  <p style={{ fontSize: "0.83rem", color: "#94A3B8", lineHeight: 1.6 }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SAFE vs UNSAFE VISUAL
        ──────────────────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "100px 2rem",
            background: "#FFF8F0",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                className="display-font"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#2D2B1F", marginBottom: "1rem" }}
              >
                Spot the{" "}
                <span style={{ color: "#EF4444" }}>Scam</span> Before It Spots You
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#6B4226", maxWidth: "500px", margin: "0 auto" }}>
                Our Red Flag Detector trains your instincts with real examples.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {/* Scam SMS */}
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1.5px solid rgba(239,68,68,0.3)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>📱</span>
                  <span style={{ fontWeight: 800, color: "#DC2626", fontSize: "0.9rem" }}>⚠️ DANGER: Scam SMS</span>
                </div>
                <div style={{ background: "white", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <p style={{ fontSize: "0.85rem", color: "#3D2B1F", lineHeight: 1.65 }}>
                    "Dear Costumer! Your bank acccount is SUSPENDED!! Click this link NOW to avoid penalty:
                    <span style={{ color: "#DC2626", fontWeight: 700 }}> http://bit.ly/bank-urgnt</span>"
                  </p>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {["🚩 Spelling errors: 'Costumer', 'acccount'", "🚩 Fake urgency and fear tactics", "🚩 Suspicious shortened link", "🚩 Unusual sender number"].map((f) => (
                    <div key={f} style={{ fontSize: "0.78rem", color: "#DC2626", fontWeight: 700 }}>{f}</div>
                  ))}
                </div>
              </div>

              {/* Safe SMS */}
              <div
                style={{
                  background: "#F0FDF4",
                  border: "1.5px solid rgba(34,197,94,0.3)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>📱</span>
                  <span style={{ fontWeight: 800, color: "#16A34A", fontSize: "0.9rem" }}>✅ SAFE: Genuine Message</span>
                </div>
                <div style={{ background: "white", borderRadius: "12px", padding: "1rem", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <p style={{ fontSize: "0.85rem", color: "#3D2B1F", lineHeight: 1.65 }}>
                    "SBI: Your account ending 4321 has received ₹5,000. Your updated balance is ₹12,450. For queries call 1800-11-2211 (Toll Free). -SBI"
                  </p>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {["✅ Correct spelling and grammar", "✅ Shows partial account number", "✅ Official toll-free number", "✅ Sent from SBI official sender ID"].map((f) => (
                    <div key={f} style={{ fontSize: "0.78rem", color: "#16A34A", fontWeight: 700 }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            CTA SECTION
        ──────────────────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "120px 2rem",
            background: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 40%, #0D2818 100%)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Stars / sparkles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.6)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `sparkle ${2 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Forest trees in background */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ display: "block" }}>
              <polygon points="100,200 100,80 160,20 220,80 220,200" fill="rgba(64,145,108,0.3)" className="tree" />
              <polygon points="280,200 280,90 360,25 440,90 440,200" fill="rgba(64,145,108,0.25)" className="tree" />
              <polygon points="1000,200 1000,85 1070,20 1140,85 1140,200" fill="rgba(64,145,108,0.3)" className="tree" />
              <polygon points="1220,200 1220,90 1300,25 1380,90 1380,200" fill="rgba(64,145,108,0.25)" className="tree" />
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "1.5rem", animation: "floatUpDown 3s ease-in-out infinite" }}>
              <BambiSVG size={100} />
            </div>

            <div
              style={{
                display: "inline-block",
                background: "rgba(245,158,11,0.2)",
                border: "1px solid rgba(245,158,11,0.4)",
                borderRadius: "50px",
                padding: "6px 18px",
                marginBottom: "1.25rem",
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#FBBF24",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              🌲 Bambi Reached the Safe Forest — Now It's Your Turn!
            </div>

            <h2
              className="display-font"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                color: "white",
                marginBottom: "1.25rem",
                lineHeight: 1.1,
              }}
            >
              Start Your Safe
              <br />
              <span style={{ color: "#FBBF24" }}>Digital Journey</span> Today
            </h2>

            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
              Join thousands of Indians building digital confidence with SafetyNet.
              It's free, friendly, and designed just for you.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/login"
                className="login-btn"
                style={{
                  padding: "18px 40px",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 6px 30px rgba(14,165,233,0.4)",
                  letterSpacing: "0.3px",
                }}
              >
                🔐 Login to SafetyNet
              </a>
              <a
                href="#features"
                style={{
                  padding: "18px 40px",
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)")}
              >
                🌿 Explore Features
              </a>
            </div>

            {/* Stat strip */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
                marginTop: "4rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "10K+", label: "Learners Protected" },
                { num: "9", label: "Powerful Features" },
                { num: "100%", label: "Free Forever" },
                { num: "5★", label: "User Happiness" },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: "center" }}>
                  <div
                    className="display-font"
                    style={{ fontSize: "2rem", fontWeight: 900, color: "#FBBF24" }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            FOOTER
        ──────────────────────────────────────────────────────────────────── */}
        <footer
          style={{
            background: "#0F172A",
            padding: "60px 2rem 30px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>

              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ShieldIcon color="white" size={20} />
                  </div>
                  <span className="display-font" style={{ fontSize: "1.3rem", fontWeight: 800, color: "white" }}>
                    Safety<span style={{ color: "#F59E0B" }}>Net</span>
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.75, maxWidth: "200px" }}>
                  Your friendly guide to digital safety. Built with love for elders and first-time internet users.
                </p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
                  <BambiSVG size={40} />
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 style={{ color: "white", fontWeight: 800, marginBottom: "1rem", fontSize: "0.95rem" }}>Features</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                  {["Sandbox Modules", "Red Flag Detector", "AI Scam Simulator", "Deepfake Lab", "Community Siren"].map((l) => (
                    <a key={l} href="#features" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#F59E0B")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 style={{ color: "white", fontWeight: 800, marginBottom: "1rem", fontSize: "0.95rem" }}>Support</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                  {["Help Centre", "Voice Guide", "Language Settings", "Accessibility", "Contact Us"].map((l) => (
                    <a key={l} href="#" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#38BDF8")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA mini */}
              <div>
                <h4 style={{ color: "white", fontWeight: 800, marginBottom: "1rem", fontSize: "0.95rem" }}>Get Started</h4>
                <p style={{ fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                  Ready to learn digital safety with Bambi?
                </p>
                <a
                  href="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 22px",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  🔐 Login Now
                </a>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "0.8rem",
              }}
            >
              <span>© 2025 SafetyNet. Protecting every digital citizen — with warmth.</span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                {["Privacy", "Terms", "Accessibility"].map((l) => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
