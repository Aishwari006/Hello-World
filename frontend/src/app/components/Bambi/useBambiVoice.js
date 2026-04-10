// useBambiVoice.js — Voice recognition + speech synthesis hook
import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Fuzzy match a query against a list of keys.
 * Returns the best matching key or null.
 */
function fuzzyMatch(query, keys) {
  const q = query.toLowerCase().trim();

  let best = null;
  let bestScore = Infinity;

  for (const key of keys) {
    // Direct contains check
    if (key.includes(q) || q.includes(key)) {
      const score = Math.abs(key.length - q.length);
      if (score < bestScore) {
        bestScore = score;
        best = key;
      }
      continue;
    }

    // Word-level overlap
    const qWords = q.split(" ").filter(Boolean);
    const kWords = key.split(" ").filter(Boolean);
    const overlap = qWords.filter((w) =>
      kWords.some((k) => k.startsWith(w) || w.startsWith(k))
    ).length;

    if (overlap > 0) {
      const score = qWords.length + kWords.length - 2 * overlap;
      if (score < bestScore) {
        bestScore = score;
        best = key;
      }
    }
  }

  return bestScore <= 4 ? best : null;
}

/**
 * Speak text aloud using the Web Speech API.
 */
export function speak(text, rate = 0.88, pitch = 1.1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = rate;
  utt.pitch = pitch;
  utt.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
    voices.find((v) => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

/**
 * useBambiVoice
 *
 * @param {Object} registry - { [label]: { ref: React.RefObject, speech: string } }
 * @param {Function} onMatch - called with (label, entry) when voice matches a component
 * @param {Function} onNoMatch - called with (transcript) when nothing matches
 */
export function useBambiVoice(registry, onMatch, onNoMatch) {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      setStatus("⚠️ Voice not supported in this browser");
      return;
    }

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";

    rec.onstart = () => {
      setIsListening(true);
      setStatus("🎙️ Listening…");
    };

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setStatus(``);
      
      const cleaned = transcript
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, "");

      const keys = Object.keys(registry);

      // 🧠 STEP 1: Strong fuzzy match first
      let match = fuzzyMatch(cleaned, keys);

      // 🟢 STEP 2: If fuzzy match exists → USE IT (DO NOT OVERRIDE)
      if (match && registry[match]) {
        onMatch(match, registry[match]);
        return;
      }

      // 🟡 STEP 3: Only if NO match → fallback
      if (cleaned.includes("home") || cleaned.includes("main")) {
        onMatch("home", registry["home"]);
        return;
      }

      if (cleaned.includes("dashboard")) {
        onMatch("dashboard", registry["dashboard"]);
        return;
      }

      if (cleaned.includes("bank") || cleaned.includes("statements")) {
        onMatch("bank statements", registry["bank statements"]);
        return;
      }

      if (cleaned.includes("digilocker") || cleaned.includes("locker")) {
        onMatch("digilocker", registry["digilocker"]);
        return;
      }

      if (cleaned.includes("red flag") || cleaned.includes("messages") || cleaned.includes("message") || cleaned.includes("email") || cleaned.includes("emails")) {
        onMatch("fake messages", registry["fake messages"]);
        return;
      }

      if (cleaned.includes("simulator") || cleaned.includes("scam") || cleaned.includes("safe") || cleaned.includes("chatting")) {
        onMatch("simulator", registry["simulator"]);
        return;
      }

      if (cleaned.includes("photo") || cleaned.includes("deepfake") || cleaned.includes("photos") || cleaned.includes("pictures")) {
        onMatch("fake photos", registry["fake photos"]);
        return;
      }      

      if (cleaned.includes("track") || cleaned.includes("progress")) {
        onMatch("track progress", registry["track progress"]);
        return;
      }       

      // 🔴 STEP 4: final fallback
      onNoMatch?.(transcript);
    };

    rec.onerror = () => {
      setStatus("⚠️ Could not hear you — try again");
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [registry]); // eslint-disable-line react-hooks/exhaustive-deps

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      window.speechSynthesis?.cancel();
      recognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const toggle = useCallback(() => {
    isListening ? stopListening() : startListening();
  }, [isListening, startListening, stopListening]);

  return { isListening, status, supported, toggle };
}