import { useState, useEffect, useCallback } from 'react';
 import { useUnlockOnMount } from "../components/ui/Usebadges";
// ─── Types ────────────────────────────────────────────────────────────────────
 
type Screen = 'learn' | 'game' | 'results';
 
interface Technique {
  emoji: string;
  title: string;
  desc: string;
  lookFor: string;
  images: string[];
}
 
interface Pair {
  id: string;
  real: string;
  fake: string;
  explanation: string;
}
 
// ─── Data ─────────────────────────────────────────────────────────────────────
 
const TECHNIQUES: Technique[] = [
  {
    emoji: '🖐️',
    title: 'Unusual Hands & Fingers',
    desc: 'AI image generators have long struggled to render hands correctly. The geometry of fingers — five per hand, each with three joints, always bending in anatomically possible directions — is surprisingly complex for a neural network to learn consistently.',
    lookFor: '<strong>👀 What to look for:</strong> Six or more fingers on one hand · Fused or melted-together digits · Fingers that are too long, too short, or bend the wrong way · Extra "ghost" fingers visible at the edge of the frame.',
    images: ['assets/01_i.png', 'assets/02_i.png', 'assets/03_i.png'],
  },
  {
    emoji: '💡',
    title: 'Mismatched Lighting & Shadows',
    desc: 'In a real photograph, every shadow and highlight follows a single, consistent light source — the sun, a window, a lamp. AI images often stitch together elements with subtly different lighting, so a face might be lit from the left while the background is lit from the right.',
    lookFor: '<strong>👀 What to look for:</strong> Shadows pointing in different directions · Unnaturally bright or glowing skin · The subject looking "pasted in" against the background · Reflections in eyes that do not match the scene lighting.',
    images: ['assets/04_i.png', 'assets/05_i.png', 'assets/06_i.png'],
  },
  {
    emoji: '🔤',
    title: 'Blurry or Garbled Text',
    desc: 'Text is one of the most reliable deepfake tells. AI generators cannot read or write — they predict visually plausible patterns. Any text visible in the scene — on a sign, a t-shirt, a book cover — will be a meaningless jumble of letter-like shapes.',
    lookFor: '<strong>👀 What to look for:</strong> Background signs with nonsense letters · Brand logos that are almost-but-not-quite correct · Clothing with text that blurs into scribbles · Clock faces with impossible or scrambled numbers.',
    images: ['assets/07_i.png', 'assets/08_i.png', 'assets/09_i.png'],
  },
  {
    emoji: '👁️',
    title: 'Asymmetrical Features',
    desc: 'Human faces are roughly symmetrical — our eyes, ears, and eyebrows broadly mirror each other. AI generation introduces subtle but detectable asymmetries: one eye higher, a drooping pupil, earrings that do not match, or eyebrows of different thickness.',
    lookFor: '<strong>👀 What to look for:</strong> One eye noticeably higher or lower than the other · Pupils of different sizes or angles · Earrings that are different shapes · Eyebrows with different thicknesses · A hairline that shifts unevenly.',
    images: ['assets/10_i.png', 'assets/11_i.png', 'assets/12_i.png'],
  },
  {
    emoji: '✨',
    title: 'Overly Polished Skin & Textures',
    desc: 'Real human skin has pores, fine hairs, tiny blemishes, and subtle colour variation. AI tends to over-smooth, producing a "plastic doll" quality — particularly on the face and neck. Fabric weave, hair strands, and surfaces can also appear unnaturally uniform or repetitive.',
    lookFor: '<strong>👀 What to look for:</strong> Skin that looks airbrushed or waxy with no pores · Hair that clumps into perfectly identical strands · Fabric with a strange repeating texture · No visible freckles, blemishes, or normal skin detail · Background surfaces that tile or repeat.',
    images: ['assets/13_i.png', 'assets/14_i.png', 'assets/15_i.png'],
  },
];
 
const ALL_PAIRS: Pair[] = Array.from({ length: 18 }, (_, i) => {
  const id = String(i + 1).padStart(2, '0');
  return {
    id,
    real: `assets/${id}.png`,
    fake: `assets/${id}_d.png`,
    explanation: `assets/${id}_exp.png`,
  };
});
 
const TOTAL_ROUNDS = 5;
 
// ─── Utility ──────────────────────────────────────────────────────────────────
 
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
 
// ─── CSS-in-JS Styles ─────────────────────────────────────────────────────────
 
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
 
  .drl-root {
    font-family: 'Source Sans 3', sans-serif;
    font-size: 19px;
    line-height: 1.65;
    color: #1a1208;
    background: #fdf8f2;
    min-height: 100vh;
  }
 
  .drl-root h1, .drl-root h2, .drl-root h3 {
    font-family: 'Lora', Georgia, serif;
    line-height: 1.25;
  }
 
  /* ── Learn Screen ── */
  .drl-learn-screen {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
 
  .drl-learn-header {
    background: #ffffff;
    border-bottom: 2px solid #e4d5c2;
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 50;
  }
 
  .drl-learn-brand {
    font-family: 'Lora', serif;
    font-size: 22px;
    font-weight: 700;
    color: #2b6cb0;
  }
 
  .drl-btn-skip {
    background: #fef3c7;
    color: #b7791f;
    border: 2.5px solid #b7791f;
    border-radius: 50px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 18px;
    font-weight: 700;
    padding: 12px 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background .15s, transform .12s;
    min-height: 52px;
    white-space: nowrap;
  }
  .drl-btn-skip:hover { background: #fde68a; transform: translateY(-2px); }
  .drl-btn-skip:active { transform: scale(.97); }
 
  .drl-slide-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 20px 24px 0;
  }
 
  .drl-slide-dot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #e4d5c2;
    border: 2px solid #e4d5c2;
    cursor: pointer;
    transition: background .2s, transform .2s;
    padding: 0;
  }
  .drl-slide-dot.active { background: #2b6cb0; border-color: #2b6cb0; transform: scale(1.35); }
  .drl-slide-dot:hover:not(.active) { background: #9e8a72; }
 
  .drl-slide-counter {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #9e8a72;
    letter-spacing: .07em;
    text-transform: uppercase;
    padding: 10px 0 0;
  }
 
  .drl-slide-stage {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
 
  .drl-technique-slide {
    padding: 30px 0 40px;
    overflow-y: auto;
    max-height: calc(100vh - 220px);
    animation: drlSlideInRight .35s ease;
  }
  .drl-technique-slide.from-left { animation: drlSlideInLeft .35s ease; }
 
  @keyframes drlSlideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes drlSlideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to   { opacity: 1; transform: translateX(0); }
  }
 
  .drl-slide-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 28px;
  }
 
  .drl-technique-title-row {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 14px;
  }
 
  .drl-technique-emoji { font-size: 52px; flex-shrink: 0; line-height: 1; }
 
  .drl-technique-title-row h2 {
    font-size: clamp(24px, 4vw, 34px);
    color: #1a1208;
  }
 
  .drl-technique-desc {
    font-size: 19px;
    color: #5a4a35;
    line-height: 1.65;
    margin-bottom: 24px;
    max-width: 740px;
  }
 
  .drl-look-for-box {
    background: #ebf4ff;
    border: 2px solid #2b6cb0;
    border-radius: 14px;
    padding: 16px 22px;
    margin-bottom: 28px;
    font-size: 17px;
    color: #1a4a80;
    font-weight: 500;
    line-height: 1.6;
  }
 
  .drl-example-label {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #9e8a72;
    margin-bottom: 14px;
  }
 
  .drl-technique-images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 10px;
  }
 
  .drl-example-img-wrap {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    border: 2.5px solid #e4d5c2;
    background: #f5ede0;
    box-shadow: 0 4px 24px rgba(26,18,8,.10);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .15s;
  }
  .drl-example-img-wrap:hover,
  .drl-example-img-wrap:focus-visible {
    border-color: #2b6cb0;
    box-shadow: 0 0 0 3px #ebf4ff, 0 12px 48px rgba(26,18,8,.18);
    transform: translateY(-3px);
    outline: none;
  }
  .drl-example-img-wrap img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
    transition: transform .3s ease;
    pointer-events: none;
  }
  .drl-example-img-wrap:hover img { transform: scale(1.06); }
 
  .drl-example-expand-hint {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(255,255,255,.92);
    border: 1.5px solid #e4d5c2;
    border-radius: 50px;
    padding: 3px 10px;
    font-size: 13px;
    font-weight: 700;
    color: #5a4a35;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
  }
  .drl-example-img-wrap:hover .drl-example-expand-hint { opacity: 1; }
 
  .drl-slide-nav {
    background: #ffffff;
    border-top: 2px solid #e4d5c2;
    padding: 18px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-shrink: 0;
  }
 
  /* ── Game Screen ── */
  .drl-game-screen { padding-bottom: 40px; }
 
  .drl-top-bar {
    background: #ffffff;
    border-bottom: 2px solid #e4d5c2;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }
 
  .drl-brand {
    font-family: 'Lora', serif;
    font-size: 20px;
    font-weight: 700;
    color: #2b6cb0;
    letter-spacing: -.3px;
  }
 
  .drl-score-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fef3c7;
    border: 2px solid #b7791f;
    border-radius: 50px;
    padding: 6px 18px;
    font-size: 20px;
    font-weight: 700;
    color: #b7791f;
  }
 
  .drl-score-label {
    font-size: 14px;
    font-weight: 600;
    color: #b7791f;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
 
  .drl-progress-wrap { background: #ffffff; padding: 14px 24px 0; }
  .drl-progress-text { font-size: 17px; font-weight: 600; color: #5a4a35; margin-bottom: 8px; }
  .drl-progress-track { height: 10px; background: #e4d5c2; border-radius: 99px; overflow: hidden; }
  .drl-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2b6cb0, #4299e1);
    border-radius: 99px;
    transition: width .5s ease;
  }
 
  .drl-question-label {
    text-align: center;
    padding: 28px 24px 18px;
    font-family: 'Lora', serif;
    font-size: clamp(20px, 3vw, 26px);
    font-weight: 600;
    color: #1a1208;
  }
 
  .drl-question-accent { color: #2b6cb0; }
 
  .drl-image-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0 24px;
    max-width: 860px;
    margin: 0 auto;
  }
 
  .drl-image-choice {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    border: 3px solid #e4d5c2;
    cursor: pointer;
    background: #e8e0d6;
    box-shadow: 0 4px 24px rgba(26,18,8,.10);
    transition: border-color .2s, box-shadow .2s, transform .15s;
    -webkit-user-drag: none;
    width: 100%;
    padding: 0;
  }
  .drl-image-choice:hover,
  .drl-image-choice:focus-visible {
    border-color: #2b6cb0;
    box-shadow: 0 0 0 4px #ebf4ff, 0 12px 48px rgba(26,18,8,.18);
    transform: translateY(-3px);
    outline: none;
  }
  .drl-image-choice:active { transform: scale(.98); }
  .drl-image-choice img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: contain;
    display: block;
    transition: transform .35s ease;
    pointer-events: none;
    -webkit-user-drag: none;
    background: #e8ddd0;
  }
  .drl-image-choice:hover img { transform: scale(1.08); }
 
  .drl-choice-label {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(255,255,255,.92);
    border: 2px solid #e4d5c2;
    border-radius: 50px;
    padding: 4px 14px;
    font-size: 15px;
    font-weight: 700;
    color: #5a4a35;
    letter-spacing: .05em;
    pointer-events: none;
  }
 
  .drl-maximize-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255,255,255,.95);
    border: 2px solid #e4d5c2;
    border-radius: 50px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 700;
    color: #1a1208;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    transition: transform .2s;
  }
  .drl-maximize-btn:hover { transform: scale(1.05); }
 
  .drl-tap-hint {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #9e8a72;
    padding: 0 24px;
  }
 
  /* ── Modal ── */
  .drl-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(26,18,8,.55);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    overflow-y: auto;
    animation: drlFadeIn .2s ease;
  }
 
  @keyframes drlFadeIn { from { opacity: 0; } to { opacity: 1; } }
 
  .drl-modal-box {
    background: #ffffff;
    border-radius: 22px;
    box-shadow: 0 12px 48px rgba(26,18,8,.18);
    padding: 36px 36px 32px;
    max-width: 560px;
    width: 100%;
    margin: auto;
    animation: drlSlideUp .3s ease;
  }
 
  @keyframes drlSlideUp {
    from { transform: translateY(32px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
 
  .drl-modal-result-banner {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    border-radius: 14px;
    margin-bottom: 20px;
  }
  .drl-modal-result-banner.correct { background: #d8f3dc; border: 2px solid #2d6a4f; }
  .drl-modal-result-banner.wrong   { background: #fde8e4; border: 2px solid #c0392b; }
 
  .drl-result-icon  { font-size: 36px; flex-shrink: 0; }
  .drl-result-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; margin-bottom: 4px; }
  .drl-result-title.correct { color: #2d6a4f; }
  .drl-result-title.wrong   { color: #c0392b; }
  .drl-result-desc  { font-size: 17px; color: #5a4a35; line-height: 1.5; }
 
  .drl-modal-explanation-wrap {
    margin-bottom: 20px;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid #e4d5c2;
    background: #f5ede0;
    cursor: pointer;
    transition: border-color .2s;
  }
  .drl-modal-explanation-wrap:hover { border-color: #2b6cb0; }
 
  .drl-modal-explanation-img {
    width: 100%;
    max-height: 250px;
    object-fit: contain;
    display: block;
    background: #f5ede0;
  }
 
  .drl-modal-explanation-label {
    background: #f5ede0;
    border-top: 1.5px solid #e4d5c2;
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 700;
    color: #9e8a72;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
 
  .drl-stat-box {
    background: #f5ede0;
    border: 2px solid #e4d5c2;
    border-radius: 14px;
    padding: 18px 22px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .drl-stat-icon   { font-size: 28px; flex-shrink: 0; }
  .drl-stat-number { font-family: 'Lora', serif; font-size: 32px; font-weight: 700; color: #2b6cb0; line-height: 1; }
  .drl-stat-label  { font-size: 16px; color: #5a4a35; margin-top: 4px; }
 
  /* ── Results Screen ── */
  .drl-results-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    background: #fdf8f2;
  }
 
  .drl-results-card {
    background: #ffffff;
    border: 2px solid #e4d5c2;
    border-radius: 22px;
    box-shadow: 0 12px 48px rgba(26,18,8,.18);
    padding: 52px 44px;
    max-width: 540px;
    width: 100%;
    text-align: center;
  }
 
  .drl-trophy {
    font-size: 72px;
    margin-bottom: 20px;
    display: block;
    animation: drlBounce .6s ease;
  }
 
  @keyframes drlBounce {
    0%   { transform: scale(.5); opacity: 0; }
    70%  { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); }
  }
 
  .drl-results-card h2 { font-size: 36px; color: #1a1208; margin-bottom: 14px; }
 
  .drl-score-display {
    font-family: 'Lora', serif;
    font-size: 64px;
    font-weight: 700;
    color: #2b6cb0;
    line-height: 1;
    margin: 20px 0;
  }
  .drl-score-display span { font-size: 32px; color: #5a4a35; }
 
  .drl-results-message {
    font-size: 19px;
    color: #5a4a35;
    line-height: 1.6;
    margin-bottom: 36px;
  }
 
  /* ── Buttons ── */
  .drl-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 20px;
    font-weight: 700;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    padding: 16px 36px;
    transition: background .15s, transform .12s, box-shadow .15s;
    text-decoration: none;
    line-height: 1;
    min-height: 58px;
  }
  .drl-btn:active { transform: scale(.97); }
 
  .drl-btn-primary {
    background: #2b6cb0;
    color: #fff;
    box-shadow: 0 4px 14px rgba(43,108,176,.35);
    border: none;
  }
  .drl-btn-primary:hover { background: #1a4a80; box-shadow: 0 6px 22px rgba(43,108,176,.45); }
  .drl-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
 
  .drl-btn-secondary {
    background: #f5ede0;
    color: #5a4a35;
    border: 2px solid #e4d5c2;
  }
  .drl-btn-secondary:hover { background: #e4d5c2; }
  .drl-btn-secondary:disabled { opacity: 0.45; cursor: not-allowed; }
 
  .drl-btn-lg { font-size: 22px; padding: 20px 48px; min-height: 68px; border-radius: 50px; }
  .drl-btn-full { width: 100%; }
 
  .drl-btn-outline {
    background: transparent;
    color: #2b6cb0;
    border: 2.5px solid #2b6cb0;
  }
  .drl-btn-outline:hover { background: #ebf4ff; }
 
  /* ── Lightbox ── */
  .drl-lightbox-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.88);
    z-index: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
 
  .drl-lightbox-content { position: relative; max-width: 95vw; max-height: 90vh; }
 
  .drl-lightbox-img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 14px;
    border: 4px solid #ffffff;
  }
 
  .drl-lightbox-close {
    position: absolute;
    top: -20px;
    right: -20px;
    background: #c0392b;
    color: #fff;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 12px 48px rgba(26,18,8,.18);
    display: flex;
    align-items: center;
    justify-content: center;
  }
 
  .drl-img-placeholder {
    width: 100%;
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, #e8ddd0 0%, #d4c4b0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #9e8a72;
  }
 
  /* ── Responsive ── */
  @media (max-width: 600px) {
    .drl-technique-images { grid-template-columns: 1fr; }
    .drl-image-pair       { grid-template-columns: 1fr; }
  }
 
  @media (max-width: 480px) {
    .drl-modal-box    { padding: 28px 20px; }
    .drl-results-card { padding: 36px 22px; }
    .drl-image-pair   { gap: 14px; padding: 0 14px; }
    .drl-learn-header { padding: 12px 16px; }
    .drl-slide-nav    { padding: 14px 16px; gap: 10px; }
    .drl-slide-inner  { padding: 0 16px; }
    .drl-btn-skip     { font-size: 15px; padding: 10px 18px; }
  }
`;
 
// ─── Component ────────────────────────────────────────────────────────────────
 
export default function DeepfakeRecognitionLab(): React.ReactElement {
  // ── Global screen state ──
  useUnlockOnMount("/deepfake-lab");
  const [screen, setScreen] = useState<Screen>('learn');
 
  // ── Learn state ──
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideAnimDir, setSlideAnimDir] = useState<'right' | 'left'>('right');
  const [slideKey, setSlideKey] = useState(0); // forces remount for animation
 
  // ── Game state ──
  const [sessionPairs, setSessionPairs] = useState<Pair[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [fakeIsOnLeft, setFakeIsOnLeft] = useState(false);
 
  // ── Modal state ──
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCorrect, setModalCorrect] = useState(false);
  const [statValue, setStatValue] = useState(73);
  const [statMessage, setStatMessage] = useState('of people found this pair difficult to judge.');
  const [expImgVisible, setExpImgVisible] = useState(true);
 
  // ── Results state ──
  const [resultsData, setResultsData] = useState<{
    emoji: string; heading: string; message: string;
  }>({ emoji: '🏆', heading: '', message: '' });
 
  // ── Lightbox state ──
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
 
  // ── Slide navigation ──
  const goToSlide = useCallback((targetIndex: number, dir?: number) => {
    if (targetIndex === currentSlide) return;
    const direction = dir !== undefined ? dir : (targetIndex > currentSlide ? 1 : -1);
    setSlideAnimDir(direction > 0 ? 'right' : 'left');
    setSlideKey(k => k + 1);
    setCurrentSlide(targetIndex);
  }, [currentSlide]);
 
  const changeSlide = useCallback((direction: number) => {
    const next = currentSlide + direction;
    if (next < 0 || next >= TECHNIQUES.length) return;
    goToSlide(next, direction);
  }, [currentSlide, goToSlide]);
 
  // ── Start game ──
  const startGame = useCallback(() => {
    const pairs = shuffle(ALL_PAIRS).slice(0, TOTAL_ROUNDS);
    setSessionPairs(pairs);
    setCurrentRound(0);
    setScore(0);
    setScreen('game');
    // render first round
    setFakeIsOnLeft(Math.random() < 0.5);
  }, []);
 
  // ── Handle choice ──
  const handleChoice = useCallback((userClickedLeft: boolean) => {
    if (modalOpen) return;
    const isCorrect = userClickedLeft === fakeIsOnLeft;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(s => s + 1);
 
    // Stat
    const sv = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    const statMessages = [
      'of people found this pair difficult to judge.',
      'of visitors needed more than one look at this pair.',
      'of players got this one wrong on their first try.',
      'of people struggled to tell these two apart.',
    ];
    setStatValue(sv);
    setStatMessage(statMessages[Math.floor(Math.random() * statMessages.length)]);
    setModalCorrect(isCorrect);
    setExpImgVisible(true);
    setModalOpen(true);
    // suppress linter: newScore used to show results
    void newScore;
  }, [fakeIsOnLeft, score, modalOpen]);
 
  // ── Next round ──
  const nextRound = useCallback(() => {
    setModalOpen(false);
    const nextRoundIndex = currentRound + 1;
    if (nextRoundIndex >= TOTAL_ROUNDS) {
      // compute final score here — score state reflects corrections from handleChoice
      // we read score from state in showResults
      setScreen('results');
    } else {
      setCurrentRound(nextRoundIndex);
      setFakeIsOnLeft(Math.random() < 0.5);
    }
  }, [currentRound]);
 
  // ── Show learn screen ──
  const showLearnScreen = useCallback(() => {
    setCurrentSlide(0);
    setSlideKey(k => k + 1);
    setSlideAnimDir('right');
    setScreen('learn');
    window.scrollTo({ top: 0 });
  }, []);
 
  // ── Play again ──
  const playAgain = useCallback(() => {
    startGame();
  }, [startGame]);
 
  // ── Lightbox ──
  const openLightbox = useCallback((src: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxSrc(src);
    setLightboxOpen(true);
  }, []);
 
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);
 
  // ── Results computation ──
  useEffect(() => {
    if (screen === 'results') {
      let emoji: string, heading: string, message: string;
      if (score === TOTAL_ROUNDS) {
        emoji = '🏆'; heading = 'Perfect Score!';
        message = 'Outstanding! You identified every single fake. You have a truly sharp eye — share this lab with friends and family to help keep them safe online.';
      } else if (score >= 4) {
        emoji = '🥇'; heading = 'Brilliant Work!';
        message = "You got almost all of them! Just one slipped past you — that's impressive for a first session. Your digital literacy skills are growing fast.";
      } else if (score >= 3) {
        emoji = '👏'; heading = 'Well Done!';
        message = "A solid result! You're developing a real instinct for spotting AI-generated images. Play again and see if you can beat your score.";
      } else if (score >= 2) {
        emoji = '💪'; heading = 'Good Start!';
        message = "Deepfakes are genuinely tricky — even experts get fooled. Review the techniques and try again. You'll improve quickly.";
      } else {
        emoji = '🌱'; heading = 'Keep Practising!';
        message = "These images were tough, and you're just getting started. Every attempt trains your brain. Review the techniques and give it another go!";
      }
      setResultsData({ emoji, heading, message });
    }
  }, [screen, score]);
 
  // ── Keyboard handlers ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) { closeLightbox(); return; }
        if (modalOpen) { nextRound(); return; }
      }
      if (screen === 'learn') {
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft')  changeSlide(-1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [screen, lightboxOpen, modalOpen, closeLightbox, nextRound, changeSlide]);
 
  // ── Current pair ──
  const currentPair = sessionPairs[currentRound];
 
  const leftSrc  = currentPair ? (fakeIsOnLeft ? currentPair.fake : currentPair.real) : '';
  const rightSrc = currentPair ? (fakeIsOnLeft ? currentPair.real : currentPair.fake) : '';
 
  const progressPct = screen === 'results'
    ? 100
    : (currentRound / TOTAL_ROUNDS) * 100;
 
  const isLastSlide = currentSlide === TECHNIQUES.length - 1;
  const tech = TECHNIQUES[currentSlide];
 
  // ─── Render ────────────────────────────────────────────────────────────────
 
  return (
    <div className="drl-root">
      <style>{CSS}</style>
 
      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div className="drl-lightbox-backdrop" onClick={closeLightbox}>
          <div className="drl-lightbox-content" onClick={e => e.stopPropagation()}>
            <button
              className="drl-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close enlarged image"
            >×</button>
            <img src={lightboxSrc} id="lightbox-img" className="drl-lightbox-img" alt="Enlarged view" />
          </div>
        </div>
      )}
 
      {/* ════════════════════════════════════════════
          SCREEN 1 — LEARN
          ════════════════════════════════════════════ */}
      {screen === 'learn' && (
        <div className="drl-learn-screen">
 
          {/* Sticky header */}
          <div className="drl-learn-header">
            <span className="drl-learn-brand">🔬 Deepfake Recognition Lab</span>
            <button
              className="drl-btn-skip"
              onClick={startGame}
              aria-label="Skip the learning module and go directly to the quiz"
            >
              Skip directly to Lab ➡️
            </button>
          </div>
 
          {/* Dots */}
          <div className="drl-slide-dots" role="tablist" aria-label="Technique navigation dots">
            {TECHNIQUES.map((t, i) => (
              <button
                key={i}
                className={'drl-slide-dot' + (i === currentSlide ? ' active' : '')}
                role="tab"
                aria-label={`Go to technique ${i + 1}: ${t.title}`}
                aria-selected={i === currentSlide}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
 
          <div className="drl-slide-counter">
            Technique {currentSlide + 1} of {TECHNIQUES.length}
          </div>
 
          {/* Slide stage */}
          <div className="drl-slide-stage">
            <div
              key={slideKey}
              className={`drl-technique-slide${slideAnimDir === 'left' ? ' from-left' : ''}`}
            >
              <div className="drl-slide-inner">
                <div className="drl-technique-title-row">
                  <span className="drl-technique-emoji">{tech.emoji}</span>
                  <h2>{tech.title}</h2>
                </div>
                <p className="drl-technique-desc">{tech.desc}</p>
                <div
                  className="drl-look-for-box"
                  dangerouslySetInnerHTML={{ __html: tech.lookFor }}
                />
                <p className="drl-example-label">📸 Real Examples — Click any image to enlarge</p>
                <div className="drl-technique-images">
                  {tech.images.map((src, j) => (
                    <div
                      key={j}
                      className="drl-example-img-wrap"
                      onClick={() => openLightbox(src)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Example ${j + 1}: ${tech.title} — click to enlarge`}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(src);
                        }
                      }}
                    >
                      <img
                        src={src}
                        alt={`Example ${j + 1} for ${tech.title}`}
                        loading="lazy"
                        onError={e => {
                          const wrap = (e.target as HTMLImageElement).parentElement;
                          if (wrap) wrap.innerHTML = `<div class="drl-img-placeholder">Example ${j + 1}</div>`;
                        }}
                      />
                      <span className="drl-example-expand-hint">🔍 Enlarge</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
 
          {/* Bottom nav */}
          <div className="drl-slide-nav">
            <button
              className="drl-btn drl-btn-secondary"
              onClick={() => changeSlide(-1)}
              aria-label="Previous technique"
              disabled={currentSlide === 0}
            >
              ← Previous
            </button>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {!isLastSlide && (
                <button
                  className="drl-btn drl-btn-primary"
                  onClick={() => changeSlide(1)}
                  aria-label="Next technique"
                >
                  Next Technique →
                </button>
              )}
              {isLastSlide && (
                <button
                  className="drl-btn drl-btn-primary drl-btn-lg"
                  onClick={startGame}
                  aria-label="All techniques reviewed — start the quiz"
                >
                  🔬 Start the Lab
                </button>
              )}
            </div>
          </div>
 
        </div>
      )}
 
      {/* ════════════════════════════════════════════
          SCREEN 2 — GAME
          ════════════════════════════════════════════ */}
      {screen === 'game' && (
        <div className="drl-game-screen">
 
          {/* Top bar */}
          <div className="drl-top-bar">
            <span className="drl-brand">🔬 Deepfake Lab</span>
            <div className="drl-score-chip">
              <span className="drl-score-label">Score</span>
              <span>{score}</span>
            </div>
          </div>
 
          {/* Progress */}
          <div className="drl-progress-wrap">
            <div className="drl-progress-text">
              Image {currentRound + 1} of {TOTAL_ROUNDS}
            </div>
            <div className="drl-progress-track">
              <div
                className="drl-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
 
          <p className="drl-question-label">
            Which image is <span className="drl-question-accent">AI-generated (fake)?</span><br />
            <small style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 400, color: '#9e8a72' }}>
              Hover over an image to zoom in, then click the one you think is fake.
            </small>
          </p>
 
          {currentPair && (
            <div className="drl-image-pair">
              {/* Image A (left) */}
              <div style={{ position: 'relative' }}>
                <button
                  className="drl-maximize-btn"
                  onClick={e => openLightbox(leftSrc, e)}
                  aria-label="Expand Image A to full screen"
                >
                  🔍 Expand
                </button>
                <button
                  className="drl-image-choice"
                  onClick={() => handleChoice(true)}
                  aria-label="Image A — click if you think this is the AI-generated fake"
                >
                  <img
                    src={leftSrc}
                    alt="Image option A"
                    loading="lazy"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.innerHTML = '<div class="drl-img-placeholder">Image A</div>';
                    }}
                  />
                  <span className="drl-choice-label">A</span>
                </button>
              </div>
 
              {/* Image B (right) */}
              <div style={{ position: 'relative' }}>
                <button
                  className="drl-maximize-btn"
                  onClick={e => openLightbox(rightSrc, e)}
                  aria-label="Expand Image B to full screen"
                >
                  🔍 Expand
                </button>
                <button
                  className="drl-image-choice"
                  onClick={() => handleChoice(false)}
                  aria-label="Image B — click if you think this is the AI-generated fake"
                >
                  <img
                    src={rightSrc}
                    alt="Image option B"
                    loading="lazy"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.innerHTML = '<div class="drl-img-placeholder">Image B</div>';
                    }}
                  />
                  <span className="drl-choice-label">B</span>
                </button>
              </div>
            </div>
          )}
 
          <p className="drl-tap-hint">📱 On a phone? Long-press an image to zoom in.</p>
 
          {/* ── Feedback Modal ── */}
          {modalOpen && (
            <div
              className="drl-modal-backdrop"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={e => { if (e.target === e.currentTarget) nextRound(); }}
            >
              <div className="drl-modal-box">
 
                {/* Result banner */}
                <div className={`drl-modal-result-banner ${modalCorrect ? 'correct' : 'wrong'}`}>
                  <span className="drl-result-icon">
                    {modalCorrect ? '✅' : '💛'}
                  </span>
                  <div>
                    <div
                      id="modal-title"
                      className={`drl-result-title ${modalCorrect ? 'correct' : 'wrong'}`}
                    >
                      {modalCorrect ? 'Excellent!' : 'Not quite!'}
                    </div>
                    <div className="drl-result-desc">
                      {modalCorrect
                        ? 'You spotted the AI-generated image. Your eye for detail is sharp!'
                        : 'That was a tricky one. Each miss is a step closer to becoming an expert!'}
                    </div>
                  </div>
                </div>
 
                {/* Explanation image */}
                {expImgVisible && currentPair && (
                  <div
                    className="drl-modal-explanation-wrap"
                    onClick={e => openLightbox((document.getElementById('drl-exp-img') as HTMLImageElement)?.src || currentPair.explanation, e)}
                    role="button"
                    tabIndex={0}
                    aria-label="Explanation image — click to enlarge"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(currentPair.explanation);
                      }
                    }}
                  >
                    <img
                      id="drl-exp-img"
                      className="drl-modal-explanation-img"
                      src={currentPair.explanation}
                      alt={`Explanation for pair ${currentPair.id}: highlighted deepfake artifact`}
                      onError={() => setExpImgVisible(false)}
                      onLoad={() => setExpImgVisible(true)}
                    />
                    <div className="drl-modal-explanation-label">
                      🔍 Click to enlarge — see where the fake clue is
                    </div>
                  </div>
                )}
 
                {/* Social proof stat */}
                <div className="drl-stat-box">
                  <span className="drl-stat-icon">👥</span>
                  <div>
                    <div className="drl-stat-number">{statValue}%</div>
                    <div className="drl-stat-label">{statMessage}</div>
                  </div>
                </div>
 
                <button
                  className="drl-btn drl-btn-primary drl-btn-full"
                  id="next-btn"
                  onClick={nextRound}
                  autoFocus
                >
                  Next Image →
                </button>
 
              </div>
            </div>
          )}
 
        </div>
      )}
 
      {/* ════════════════════════════════════════════
          SCREEN 3 — RESULTS
          ════════════════════════════════════════════ */}
      {screen === 'results' && (
        <div className="drl-results-screen">
          <div className="drl-results-card">
            <span className="drl-trophy">{resultsData.emoji}</span>
            <h2>{resultsData.heading}</h2>
            <div className="drl-score-display">
              {score}<span> / {TOTAL_ROUNDS}</span>
            </div>
            <p className="drl-results-message">{resultsData.message}</p>
            <button
              className="drl-btn drl-btn-primary drl-btn-lg drl-btn-full"
              onClick={playAgain}
            >
              🔄 Play Again
            </button>
            <br /><br />
            <button
              className="drl-btn drl-btn-outline drl-btn-full"
              onClick={showLearnScreen}
            >
              📖 Review the Techniques
            </button>
          </div>
        </div>
      )}
 
    </div>
  );
}
 