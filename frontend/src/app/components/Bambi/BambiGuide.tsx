import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BambiSVG } from "../Bambi/BambiSVG";
import { useBambiVoice, speak } from "../Bambi/useBambiVoice";
import { useNavigate, useLocation } from "react-router";
import type { Registry } from "./types";
import { RegistryItem } from "./types";
type BambiGuideProps = {
  registry: Registry;
};

// ─── CONSTANT ─────────────────────────────────────────────────────────────

const GREETING = "";
const HOME_INTRO =
  "Hey there! I'm Bambi, your enthusiastic guide on SafetyNet — I can help you explore the site, spot scams, choose the best options, and keep you safe online!";

// ─── COMPONENT ────────────────────────────────────────────────────────────

export function BambiGuide({ registry }: BambiGuideProps): JSX.Element {
  // 🔥 Initialized navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  const [bambiPos, setBambiPos] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const [bubbleText, setBubbleText] = useState<string>(GREETING);
  const [bubbleVisible, setBubbleVisible] = useState<boolean>(true);
  const [isHopping, setIsHopping] = useState<boolean>(false);
  const [highlightedEl, setHighlightedEl] = useState<HTMLElement | null>(null);
  const [isIntroMode, setIsIntroMode] = useState<boolean>(location.pathname === "/");
  const introShownRef = useRef(false);

  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Greeting bubble ────────────────────────────────────────────────────

  useEffect(() => {
    if (location.pathname === "/") {
      if (!introShownRef.current) {
        introShownRef.current = true;
        setIsIntroMode(true);
        showBubble(HOME_INTRO, 8000);
        speak(HOME_INTRO);
      }
    } else {
      setIsIntroMode(false);
      showBubble(GREETING, 6000);
    }

    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [location.pathname]);

  function showBubble(text: string, duration = 6000) {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);

    setBubbleText(text);
    setBubbleVisible(true);

    bubbleTimerRef.current = setTimeout(() => {
      setBubbleVisible(false);
    }, duration);
  }

  // ─── Highlight logic ────────────────────────────────────────────────────

  function highlightCard(el: HTMLElement | null) {
    if (highlightedEl) {
      highlightedEl.style.outline = "";
      highlightedEl.style.outlineOffset = "";
      highlightedEl.style.transform = "";
      highlightedEl.style.boxShadow = "";
    }

    if (el) {
      el.style.outline = "3px solid #e8a830";
      el.style.outlineOffset = "3px";
      el.style.boxShadow = "0 0 0 6px rgba(232,168,48,0.25)";
    }

    setHighlightedEl(el);
  }

  // ─── Match handler ──────────────────────────────────────────────────────

  // 🔥 MODIFIED onMatch LOGIC
  function onMatch(label: string, entry: RegistryItem) {
    const el = entry.ref?.current;

    // 🟢 CASE 1: Different page → navigate
    if (!el && entry.route) {
      showBubble(entry.speech);
      speak(entry.speech);

      sessionStorage.setItem("bambiTarget", label);

      navigate(entry.route);
      return;
    }

    // 🟡 CASE 2: Same page → move
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      const rect = el.getBoundingClientRect();

      setBambiPos({
        x: rect.left + rect.width / 2 - 36,
        y: window.scrollY + rect.top - 90,
      });

      setIsHopping(true);
      setTimeout(() => setIsHopping(false), 600);

      highlightCard(el);

      showBubble(entry.speech);
      speak(entry.speech);
    }, 400);
  }

  // 🔥 ADDED: NAVIGATION HANDLER
  useEffect(() => {
    const saved = sessionStorage.getItem("bambiTarget");
    if (!saved) return;

    const entry = registry[saved];
    const el = entry?.ref?.current;

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        const rect = el.getBoundingClientRect();

        setBambiPos({
          x: rect.left + rect.width / 2 - 36,
          y: window.scrollY + rect.top - 90,
        });

        showBubble(entry.speech);
        speak(entry.speech);
        highlightCard(el);

        // Clear the storage so it doesn't loop
        sessionStorage.removeItem("bambiTarget");
      }, 400);
    }
  }, [location.pathname, registry]); // Trigger on route change

  function onNoMatch(transcript: string) {
    const cleaned = transcript.toLowerCase().trim();

    if (cleaned.includes("what do i do") || cleaned.includes("what should i do on this page") || cleaned.includes("what to do") || cleaned.includes("what can i do") || cleaned.includes("how to do") || cleaned.includes("how should i do")  || cleaned.includes("what should i do")) {
      const msg = "Either choose an option of your choice or Enter details";
      showBubble(msg, 5000);
      speak(msg);
      return;
    }

    const msg = `I couldn't find "${transcript}". Try saying "phishing detection" or "my badges"!`;

    showBubble(msg, 5000);
    speak("I couldn't find that. Try saying phishing detection or my badges!");
  }

  // ─── Voice hook ─────────────────────────────────────────────────────────

  const { isListening, status, supported, toggle } = useBambiVoice(
    registry,
    onMatch,
    onNoMatch
  );

  useEffect(() => {
    if (isListening) {
      showBubble("🎙️ I'm listening…", 10000);
    }
  }, [isListening]);

  const isFixed = bambiPos.x === null;

  // ─── Animations ─────────────────────────────────────────────────────────

const bambiVariants = {
  idle: {
    y: [0, -8, 0],
    scale: [1, 1.06, 1], // small normal breathing effect after intro
    transition: {
      y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
    },
  },
  hop: {
    y: [0, -30, -15, -5, 0],
    rotate: [0, -8, 5, 0],
    scale: [1, 1.1, 1.05, 1.02, 1],
    transition: { duration: 0.55, ease: "easeOut" },
  },
  intro: {
    scale: [1, 10, 1], // enlarge, stay large, then shrink back smoothly
    transition: {
      duration: 8,
      times: [0, 0.18, 1],
      ease: "easeInOut",
    },
  },
};

  // ─── UI ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Bambi */}
      <motion.div
      onAnimationComplete={() => {
        if (isIntroMode) {
          setIsIntroMode(false);
        }
      }}
        style={{
          position: "fixed",
          zIndex: 1000,
          pointerEvents: "none",
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
          ...(isIntroMode
            ? { top: '40%', right: '20%' }
            : isFixed
            ? { bottom: 90, right: 24 }
            : { left: bambiPos.x! + 10, top: bambiPos.y! }),
        }}
        animate={isIntroMode ? "intro" : isHopping ? "hop" : "idle"}
        variants={bambiVariants}
        layout
        transition={
          isFixed ? undefined : { type: "spring", stiffness: 200, damping: 22 }
        }
      >
        <BambiSVG />
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              zIndex: 1001,
              background: "white",
              borderRadius: "18px 18px 4px 18px",
              padding: "12px 16px",
              maxWidth: 220,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#1a3a2a",
              pointerEvents: "none",
              ...(isIntroMode
                ? { top: '12%', right: '2%' }
                : isFixed
                ? { bottom: 170, right: 30 }
                : {
                    left: Math.max(10, (bambiPos.x || 0) - 74),
                    top: (bambiPos.y || 0) - 80,
                  }),
            }}
          >
            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Button */}
      <motion.button
        onClick={toggle}
        disabled={!supported}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { scale: [1, 1.06, 1] } : {}}
        transition={isListening ? { repeat: Infinity, duration: 1.2 } : {}}
        style={{
          position: "fixed",
          bottom: 28,
          right: 30,
          zIndex: 1002,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: isListening
            ? "linear-gradient(135deg, #e85050, #c03030)"
            : "linear-gradient(135deg, #e8a830, #f0a820)",
          color: "white",
          fontSize: "1.6rem",
          cursor: supported ? "pointer" : "not-allowed",
        }}
      >
        {isListening ? "⏹️" : "🎙️"}
      </motion.button>

      {/* Status */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1002,
        }}
      >
        {status}
      </div>
    </>
  );
}