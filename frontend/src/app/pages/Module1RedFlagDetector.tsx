import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SlideInteractiveData {
  emoji?: string;
  mascot?: string;
  brand?: string;
  warning?: string;
  legit?: string;
  fake?: string;
  highlight?: string;
  examples?: string[];
  visibleText?: string;
  actualUrl?: string;
}

interface Slide {
  id: string;
  orderIndex: number;
  title: string;
  body: string;
  slideType: "INFO" | "COMPARE_DOMAINS" | "SPOT_THE_RED_FLAG" | "CLICK_HOTSPOT";
  interactiveData: SlideInteractiveData;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

interface Question {
  id: string;
  orderIndex: number;
  prompt: string;
  explanation: string;
  concepts: string[];
  options: Option[];
}

interface ModuleData {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  slides: Slide[];
  questions: Question[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MODULE_DATA: ModuleData = {
  id: "mod_phishing_emails_001",
  slug: "phishing-emails",
  title: "Phishing Emails",
  description:
    "Learn how to spot fake emails, spoofed domains, scam links, urgency tricks, and fake bank messages.",
  difficulty: "Beginner",
  xpReward: 50,
  slides: [
    {
      id: "slide_1",
      orderIndex: 1,
      title: "What is a phishing email?",
      body: "A phishing email pretends to be from a trusted company, bank, or employer to steal passwords, OTPs, money, or personal information.",
      slideType: "INFO",
      interactiveData: { emoji: "🛡️", mascot: "Shield Buddy" },
    },
    {
      id: "slide_2",
      orderIndex: 2,
      title: "Check the sender domain carefully",
      body: "Scammers often use tiny spelling tricks. Example: wipro.com is real, but vvipro.com is suspicious because it adds an extra 'v'.",
      slideType: "COMPARE_DOMAINS",
      interactiveData: {
        legit: "wipro.com",
        fake: "vvipro.com",
        highlight: "Extra 'v' added",
      },
    },
    {
      id: "slide_3",
      orderIndex: 3,
      title: "Urgency is a huge red flag",
      body: "Scammers want you to panic. Words like 'Immediate action', 'Verify now', 'Suspended in 5 minutes' are meant to stop you from thinking.",
      slideType: "SPOT_THE_RED_FLAG",
      interactiveData: {
        examples: [
          "Act now or your account will be suspended!",
          "Verify within 5 minutes!",
          "Immediate action required!",
        ],
      },
    },
    {
      id: "slide_4",
      orderIndex: 4,
      title: "Logos can be copied",
      body: "A real-looking HDFC or SBI logo does NOT prove the email is genuine. Always verify the sender email address and the actual destination link.",
      slideType: "INFO",
      interactiveData: { brand: "HDFC Bank" },
    },
    {
      id: "slide_5",
      orderIndex: 5,
      title: "Hover before you click",
      body: "A button may look safe, but the hidden URL can still be malicious. Always inspect the actual destination.",
      slideType: "CLICK_HOTSPOT",
      interactiveData: {
        visibleText: "Secure HDFC Login",
        actualUrl: "https://hdfc-secure-verify-login.net",
      },
    },
    {
      id: "slide_6",
      orderIndex: 6,
      title: "Never share OTP, PIN, or password",
      body: "Banks and trusted companies do not ask for OTP, password, PIN, or CVV over email. If they do, assume it is suspicious and verify through the official app or website.",
      slideType: "INFO",
      interactiveData: { warning: "Never share OTP" },
    },
  ],
  questions: [
    {
      id: "q1",
      orderIndex: 1,
      prompt: "Which sender email is the most suspicious?",
      explanation:
        "Phishing emails often use domains that look almost correct but contain tiny spelling changes.",
      concepts: ["domain_spoofing"],
      options: [
        { id: "q1o1", text: "alerts@wipro.com", isCorrect: false, rationale: "This uses the correct domain." },
        { id: "q1o2", text: "alerts@vvipro.com", isCorrect: true, rationale: "Correct. The extra 'v' is a classic spoofing trick." },
        { id: "q1o3", text: "jobs@wipro.com", isCorrect: false, rationale: "This still uses the correct domain." },
        { id: "q1o4", text: "hello@wipro.com", isCorrect: false, rationale: "Still a valid-looking domain." },
      ],
    },
    {
      id: "q2",
      orderIndex: 2,
      prompt: "Which line is most likely using urgency manipulation?",
      explanation:
        "Urgency is used to make people act emotionally instead of carefully checking the email.",
      concepts: ["urgency_language"],
      options: [
        { id: "q2o1", text: "Your monthly statement is available", isCorrect: false, rationale: "This sounds normal and not panic-inducing." },
        { id: "q2o2", text: "Act now or your account will be blocked in 5 minutes!", isCorrect: true, rationale: "Correct. This is pressure language designed to panic you." },
        { id: "q2o3", text: "Thank you for using our service", isCorrect: false, rationale: "This is neutral language." },
        { id: "q2o4", text: "Your request has been received", isCorrect: false, rationale: "This is informational, not urgent." },
      ],
    },
    {
      id: "q3",
      orderIndex: 3,
      prompt: "What should you verify first in a suspicious bank email?",
      explanation:
        "The sender address and actual link destination are stronger signals than visuals like logos.",
      concepts: ["fake_branding", "domain_spoofing"],
      options: [
        { id: "q3o1", text: "The logo quality", isCorrect: false, rationale: "Scammers can copy logos easily." },
        { id: "q3o2", text: "The sender email and actual link URL", isCorrect: true, rationale: "Correct. These are the most important technical clues." },
        { id: "q3o3", text: "The colour theme of the email", isCorrect: false, rationale: "Colours are easy to imitate." },
        { id: "q3o4", text: "The greeting style", isCorrect: false, rationale: "This may help, but it should not be your first check." },
      ],
    },
    {
      id: "q4",
      orderIndex: 4,
      prompt: "An email asks for your OTP to verify your bank account. What should you do?",
      explanation: "Trusted banks do not ask for OTP, PIN, CVV, or password over email.",
      concepts: ["credential_theft"],
      options: [
        { id: "q4o1", text: "Reply quickly with OTP", isCorrect: false, rationale: "Never share OTP by email." },
        { id: "q4o2", text: "Ignore it, report it, and verify through the official app/site", isCorrect: true, rationale: "Correct. Always use official channels." },
        { id: "q4o3", text: "Click the link first and check later", isCorrect: false, rationale: "That exposes you to risk." },
        { id: "q4o4", text: "Forward it to a friend for confirmation", isCorrect: false, rationale: "That does not safely verify the source." },
      ],
    },
    {
      id: "q5",
      orderIndex: 5,
      prompt: "Which URL is most suspicious if a button says 'Login to HDFC'?",
      explanation: "The visible button text can lie. The real URL matters more.",
      concepts: ["fake_branding", "domain_spoofing"],
      options: [
        { id: "q5o1", text: "https://netbanking.hdfcbank.com", isCorrect: false, rationale: "This looks like a legitimate banking subdomain." },
        { id: "q5o2", text: "https://hdfc-secure-verify-login.net", isCorrect: true, rationale: "Correct. It uses suspicious words and a non-official-looking domain." },
        { id: "q5o3", text: "https://www.hdfcbank.com", isCorrect: false, rationale: "This is the expected official format." },
        { id: "q5o4", text: "https://myaccounts.hdfcbank.com", isCorrect: false, rationale: "This still follows a plausible official structure." },
      ],
    },
    {
      id: "q6",
      orderIndex: 6,
      prompt: "Why is a copied bank logo NOT enough to trust an email?",
      explanation:
        "Visual branding can be copied easily, but technical indicators are harder to fake perfectly.",
      concepts: ["fake_branding"],
      options: [
        { id: "q6o1", text: "Because logos are always low quality in scams", isCorrect: false, rationale: "Not always. Many scam emails use high-quality logos." },
        { id: "q6o2", text: "Because scammers can copy logos, colours, and layouts", isCorrect: true, rationale: "Correct. Branding alone is not trustworthy." },
        { id: "q6o3", text: "Because logos only work on mobile", isCorrect: false, rationale: "That is unrelated." },
        { id: "q6o4", text: "Because all fake emails use plain text", isCorrect: false, rationale: "That is false." },
      ],
    },
    {
      id: "q7",
      orderIndex: 7,
      prompt: "Which is the safest response to a suspicious email asking you to 'verify your account now'?",
      explanation:
        "Never trust the email directly. Open the official app or type the real website manually.",
      concepts: ["urgency_language", "credential_theft"],
      options: [
        { id: "q7o1", text: "Click the link quickly so your account stays active", isCorrect: false, rationale: "That is exactly what the scammer wants." },
        { id: "q7o2", text: "Reply asking if the email is genuine", isCorrect: false, rationale: "Replying to scammers is unsafe." },
        { id: "q7o3", text: "Open the official app or manually type the official website instead", isCorrect: true, rationale: "Correct. Use trusted channels only." },
        { id: "q7o4", text: "Share the email in a group and ask others to try it", isCorrect: false, rationale: "That increases exposure and risk." },
      ],
    },
    {
      id: "q8",
      orderIndex: 8,
      prompt: "Which combination best signals a phishing email?",
      explanation:
        "Phishing often combines urgency, suspicious domains, and requests for sensitive information.",
      concepts: ["domain_spoofing", "urgency_language", "credential_theft", "fake_branding"],
      options: [
        { id: "q8o1", text: "Correct logo + urgent deadline + asks for OTP + strange domain", isCorrect: true, rationale: "Correct. This is a strong phishing pattern." },
        { id: "q8o2", text: "Monthly statement + official app notification", isCorrect: false, rationale: "This is a normal scenario." },
        { id: "q8o3", text: "Password reset initiated by you from official site", isCorrect: false, rationale: "This can be legitimate if you triggered it." },
        { id: "q8o4", text: "A normal newsletter from a subscribed brand", isCorrect: false, rationale: "Not enough phishing indicators here." },
      ],
    },
  ],
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 15, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <span style={{ fontSize: 15, color: "#f59e0b", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
          {current} / {total}
        </span>
      </div>
      <div style={{ height: 10, borderRadius: 99, background: "#1e293b", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── SlideRenderer ────────────────────────────────────────────────────────────

function SlideInfo({ slide }: { slide: Slide }) {
  const icons: Record<string, string> = {
    "Never share OTP": "🚫",
    "HDFC Bank": "🏦",
  };
  const emoji =
    slide.interactiveData.emoji ||
    (slide.interactiveData.brand ? icons[slide.interactiveData.brand] || "🏦" : null) ||
    (slide.interactiveData.warning ? "🚫" : "💡");

  return (
    <div style={cardStyle}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          marginBottom: 28,
          border: "2px solid #334155",
          boxShadow: "0 0 32px #f59e0b22",
        }}
      >
        {emoji}
      </div>
      <h2 style={slideTitleStyle}>{slide.title}</h2>
      <p style={slideBodyStyle}>{slide.body}</p>
      {slide.interactiveData.mascot && (
        <div
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: 12,
            background: "#0f2744",
            border: "1px solid #1e40af",
            color: "#93c5fd",
            fontSize: 15,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          👋 Hi! I'm <strong>{slide.interactiveData.mascot}</strong>. I'll guide you through staying safe online.
        </div>
      )}
    </div>
  );
}

function SlideCompareDomains({ slide }: { slide: Slide }) {
  const { legit, fake, highlight } = slide.interactiveData;
  return (
    <div style={cardStyle}>
      <h2 style={slideTitleStyle}>{slide.title}</h2>
      <p style={{ ...slideBodyStyle, marginBottom: 28 }}>{slide.body}</p>
      <div style={{ display: "flex", gap: 16, width: "100%", flexWrap: "wrap" }}>
        {/* Legit */}
        <div
          style={{
            flex: "1 1 140px",
            padding: "20px 16px",
            borderRadius: 16,
            background: "#052e16",
            border: "2px solid #16a34a",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, marginBottom: 8, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>
            ✅ REAL
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#4ade80", fontFamily: "'DM Mono', monospace" }}>
            {legit}
          </div>
        </div>
        {/* Fake */}
        <div
          style={{
            flex: "1 1 140px",
            padding: "20px 16px",
            borderRadius: 16,
            background: "#3b0000",
            border: "2px solid #dc2626",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, color: "#f87171", fontWeight: 700, marginBottom: 8, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>
            ❌ FAKE
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f87171", fontFamily: "'DM Mono', monospace" }}>
            {/* Highlight the "vv" */}
            {fake?.startsWith("vv") ? (
              <>
                <span style={{ background: "#7f1d1d", borderRadius: 4, padding: "0 2px" }}>vv</span>
                {fake.slice(2)}
              </>
            ) : (
              fake
            )}
          </div>
          {highlight && (
            <div
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#fca5a5",
                fontFamily: "'DM Sans', sans-serif",
                background: "#450a0a",
                borderRadius: 8,
                padding: "6px 10px",
              }}
            >
              ⚠️ {highlight}
            </div>
          )}
        </div>
      </div>
      <p
        style={{
          marginTop: 20,
          fontSize: 15,
          color: "#94a3b8",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Always read the domain character by character before trusting an email.
      </p>
    </div>
  );
}

function SlideSpotRedFlag({ slide }: { slide: Slide }) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const examples = slide.interactiveData.examples || [];

  const toggle = (i: number) => {
    setRevealed((prev) => (prev.includes(i) ? prev : [...prev, i]));
  };

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚨</div>
      <h2 style={slideTitleStyle}>{slide.title}</h2>
      <p style={{ ...slideBodyStyle, marginBottom: 24 }}>{slide.body}</p>
      <p style={{ fontSize: 15, color: "#f59e0b", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
        👇 Tap each phrase to reveal why it's a red flag:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              background: revealed.includes(i) ? "#450a0a" : "#1e293b",
              border: `2px solid ${revealed.includes(i) ? "#dc2626" : "#334155"}`,
              borderRadius: 14,
              padding: "16px 20px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.25s",
              minHeight: 64,
            }}
          >
            <div style={{ fontSize: 17, color: revealed.includes(i) ? "#fca5a5" : "#e2e8f0", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              {revealed.includes(i) ? "🚩 " : "🔍 "}
              {ex}
            </div>
            {revealed.includes(i) && (
              <div style={{ marginTop: 8, fontSize: 14, color: "#f87171", fontFamily: "'DM Sans', sans-serif" }}>
                This uses <strong>urgency language</strong> to make you act without thinking.
              </div>
            )}
          </button>
        ))}
      </div>
      {revealed.length === examples.length && (
        <div
          style={{
            marginTop: 20,
            padding: "12px 20px",
            background: "#052e16",
            border: "2px solid #16a34a",
            borderRadius: 14,
            color: "#4ade80",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
          }}
        >
          ✅ Great job! You spotted all the red flags.
        </div>
      )}
    </div>
  );
}

function SlideClickHotspot({ slide }: { slide: Slide }) {
  const [clicked, setClicked] = useState(false);
  const { visibleText, actualUrl } = slide.interactiveData;

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🖱️</div>
      <h2 style={slideTitleStyle}>{slide.title}</h2>
      <p style={{ ...slideBodyStyle, marginBottom: 28 }}>{slide.body}</p>

      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
        This is what you see in the email:
      </p>

      <button
        onClick={() => setClicked(true)}
        style={{
          background: "linear-gradient(135deg, #1e40af, #2563eb)",
          border: "none",
          borderRadius: 14,
          padding: "18px 36px",
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 20px #3b82f622",
          minHeight: 64,
          marginBottom: 20,
          transition: "transform 0.1s",
        }}
      >
        🔒 {visibleText}
      </button>

      {!clicked && (
        <p style={{ fontSize: 14, color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>
          👆 Tap the button to reveal where it actually goes
        </p>
      )}

      {clicked && (
        <div
          style={{
            width: "100%",
            padding: "18px 20px",
            background: "#3b0000",
            border: "2px solid #dc2626",
            borderRadius: 14,
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 14, color: "#f87171", fontWeight: 700, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            ⚠️ ACTUAL LINK DESTINATION:
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#fca5a5",
              fontFamily: "'DM Mono', monospace",
              wordBreak: "break-all",
              background: "#450a0a",
              padding: "10px 14px",
              borderRadius: 8,
            }}
          >
            {actualUrl}
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "#f87171", fontFamily: "'DM Sans', sans-serif" }}>
            This is NOT an official bank domain. The button label was <strong>lying</strong> to you!
          </div>
        </div>
      )}
    </div>
  );
}

function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.slideType) {
    case "COMPARE_DOMAINS":
      return <SlideCompareDomains slide={slide} />;
    case "SPOT_THE_RED_FLAG":
      return <SlideSpotRedFlag slide={slide} />;
    case "CLICK_HOTSPOT":
      return <SlideClickHotspot slide={slide} />;
    default:
      return <SlideInfo slide={slide} />;
  }
}

// ─── OptionButton ────────────────────────────────────────────────────────────

function OptionButton({
  option,
  selected,
  locked,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  locked: boolean;
  onSelect: () => void;
}) {
  let bg = "#1e293b";
  let border = "#334155";
  let color = "#e2e8f0";

  if (locked && selected && option.isCorrect) {
    bg = "#052e16"; border = "#16a34a"; color = "#4ade80";
  } else if (locked && selected && !option.isCorrect) {
    bg = "#3b0000"; border = "#dc2626"; color = "#fca5a5";
  } else if (locked && !selected && option.isCorrect) {
    bg = "#052e16"; border = "#16a34a"; color = "#86efac";
  } else if (!locked && selected) {
    bg = "#1e3a5f"; border = "#3b82f6"; color = "#93c5fd";
  }

  const icon = locked
    ? selected && option.isCorrect ? "✅" : selected && !option.isCorrect ? "❌" : !selected && option.isCorrect ? "✅" : "○"
    : selected ? "●" : "○";

  return (
    <button
      onClick={!locked ? onSelect : undefined}
      disabled={locked && !selected && !option.isCorrect}
      style={{
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 14,
        padding: "16px 20px",
        cursor: locked ? "default" : "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.2s",
        minHeight: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
        <div>
          <div style={{ fontSize: 17, color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, lineHeight: 1.4 }}>
            {option.text}
          </div>
          {locked && (selected || option.isCorrect) && (
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: option.isCorrect ? "#86efac" : "#fca5a5",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.5,
              }}
            >
              {option.rationale}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── QuizRenderer ─────────────────────────────────────────────────────────────

function QuizRenderer({
  question,
  qIndex,
  totalQ,
  onAnswer,
  answeredId,
}: {
  question: Question;
  qIndex: number;
  totalQ: number;
  onAnswer: (optionId: string, isCorrect: boolean) => void;
  answeredId: string | null;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const locked = !!answeredId;
  const correct = question.options.find((o) => o.isCorrect);

  const handleSelect = (id: string) => {
    if (locked) return;
    setSelected(id);
    const opt = question.options.find((o) => o.id === id)!;
    onAnswer(id, opt.isCorrect);
  };

  const effectiveSelected = answeredId || selected;

  return (
    <div
      style={{
        maxWidth: 560,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Question badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            borderRadius: 10,
            padding: "4px 14px",
            fontSize: 14,
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          Q{qIndex + 1} of {totalQ}
        </div>
        {locked && (
          <div
            style={{
              borderRadius: 10,
              padding: "4px 14px",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              background: correct && effectiveSelected === correct.id ? "#052e16" : "#3b0000",
              color: correct && effectiveSelected === correct.id ? "#4ade80" : "#f87171",
              border: `1px solid ${correct && effectiveSelected === correct.id ? "#16a34a" : "#dc2626"}`,
            }}
          >
            {correct && effectiveSelected === correct.id ? "✅ Correct!" : "❌ Incorrect"}
          </div>
        )}
      </div>

      {/* Prompt */}
      <div
        style={{
          background: "#0f172a",
          border: "2px solid #1e3a5f",
          borderRadius: 16,
          padding: "20px 22px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#f1f5f9",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {question.prompt}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {question.options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            selected={effectiveSelected === opt.id}
            locked={locked}
            onSelect={() => handleSelect(opt.id)}
          />
        ))}
      </div>

      {/* Explanation */}
      {locked && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 18px",
            background: "#0f2744",
            border: "1px solid #1e40af",
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 700, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            💡 EXPLANATION
          </div>
          <p style={{ margin: 0, fontSize: 15, color: "#93c5fd", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── ResultsScreen ────────────────────────────────────────────────────────────

function ResultsScreen({
  score,
  total,
  xpReward,
  onRestart,
}: {
  score: number;
  total: number;
  xpReward: number;
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const xpEarned = Math.round((score / total) * xpReward);

  const grade =
    pct >= 88 ? { label: "Expert", emoji: "🏆", color: "#fbbf24" } :
    pct >= 63 ? { label: "Good", emoji: "⭐", color: "#34d399" } :
    { label: "Keep Learning", emoji: "📚", color: "#60a5fa" };

  return (
    <div
      style={{
        maxWidth: 500,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        paddingBottom: 40,
      }}
    >
      {/* Trophy */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 32,
          background: "linear-gradient(135deg, #1c1400, #3b2200)",
          border: "3px solid #f59e0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          marginBottom: 24,
          boxShadow: "0 0 60px #f59e0b44",
        }}
      >
        {grade.emoji}
      </div>

      <h2
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: "#f1f5f9",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        Module Complete!
      </h2>
      <p style={{ fontSize: 17, color: "#94a3b8", marginBottom: 28, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
        Phishing Emails · Beginner
      </p>

      {/* Score Card */}
      <div
        style={{
          width: "100%",
          background: "#0f172a",
          border: "2px solid #1e293b",
          borderRadius: 20,
          padding: "24px 20px",
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>Score</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif" }}>
            {score} / {total}
          </span>
        </div>
        <div style={{ height: 2, background: "#1e293b" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>Accuracy</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: grade.color, fontFamily: "'DM Sans', sans-serif" }}>
            {pct}%
          </span>
        </div>
        <div style={{ height: 2, background: "#1e293b" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>Rank</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: grade.color, fontFamily: "'DM Sans', sans-serif" }}>
            {grade.label}
          </span>
        </div>
      </div>

      {/* XP Badge */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #1c1400, #3b2200)",
          border: "2px solid #f59e0b",
          borderRadius: 20,
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 28,
          boxShadow: "0 0 30px #f59e0b22",
        }}
      >
        <span style={{ fontSize: 36 }}>⚡</span>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24", fontFamily: "'DM Sans', sans-serif" }}>
            +{xpEarned} XP
          </div>
          <div style={{ fontSize: 14, color: "#92400e", fontFamily: "'DM Sans', sans-serif" }}>
            out of {xpReward} max XP
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        style={{
          background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
          border: "none",
          borderRadius: 16,
          padding: "18px 48px",
          fontSize: 18,
          fontWeight: 800,
          color: "#0f172a",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          width: "100%",
          minHeight: 64,
          letterSpacing: 0.3,
        }}
      >
        🔄 Try Again
      </button>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  maxWidth: 560,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  paddingBottom: 12,
};

const slideTitleStyle: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 900,
  color: "#f1f5f9",
  fontFamily: "'DM Sans', sans-serif",
  textAlign: "center",
  lineHeight: 1.3,
  marginBottom: 16,
};

const slideBodyStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#cbd5e1",
  fontFamily: "'DM Sans', sans-serif",
  textAlign: "center",
  lineHeight: 1.7,
  maxWidth: 480,
};

// ─── NavButton ────────────────────────────────────────────────────────────────

function NavButton({
  onClick,
  disabled,
  variant,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}) {
  const styles: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    color: "#0f172a",
    border: "none",
    boxShadow: "0 6px 20px rgba(245, 158, 11, 0.35)",
  },
  secondary: {
    background: "#1e293b",
    color: "#e2e8f0",
    border: "1px solid #475569",
  },
  ghost: {
    background: "transparent",
    color: "#94a3b8",
    border: "1px solid #334155",
  },
};
  return (
    <button
      onClick={onClick}
      disabled={disabled}
     style={{
  ...styles[variant],
  borderRadius: 16,
  padding: "16px 22px",
  fontSize: 16,
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  fontFamily: "'DM Sans', sans-serif",
  minHeight: 56,
  opacity: disabled ? 0.5 : 1,
  transition: "all 0.25s ease",
  whiteSpace: "nowrap",
  flex: 1, // 👈 THIS fixes layout balance
}}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "slides" | "quiz" | "results";

export default function RedFlagDetector() {
  const { slides, questions, xpReward } = MODULE_DATA;

  const [phase, setPhase] = useState<Phase>("slides");
  const [slideIndex, setSlideIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { optionId: string; isCorrect: boolean }>>({});
  const [pendingNext, setPendingNext] = useState(false);

  const score = Object.values(answers).filter((a) => a.isCorrect).length;

  const handleAnswer = (qId: string, optionId: string, isCorrect: boolean) => {
    setAnswers((prev) => ({ ...prev, [qId]: { optionId, isCorrect } }));
  };

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((i) => i + 1);
    } else {
      setPhase("quiz");
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) setSlideIndex((i) => i - 1);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setPhase("results");
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) setQuestionIndex((i) => i - 1);
  };

  const handleRestart = () => {
    setPhase("slides");
    setSlideIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setPendingNext(false);
  };

  const currentQuestion = questions[questionIndex];
  const currentAnswerForQ = answers[currentQuestion?.id];

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0b1220; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
background: "linear-gradient(160deg, #0b1220 0%, #0f1b2e 60%, #0b1220 100%)",          color: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* Subtle grid bg */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "linear-gradient(#1e293b22 1px, transparent 1px), linear-gradient(90deg, #1e293b22 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Header ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            width: "100%",
            backdropFilter: "blur(12px)",
            background: "rgba(15, 23, 42, 0.85)",
borderTop: "1px solid #334155",
padding: "16px 20px",
boxShadow: "0 -8px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                🛡️
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2 }}>
                  {MODULE_DATA.title}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {MODULE_DATA.difficulty} · ⚡ {xpReward} XP
                </div>
              </div>
            </div>

            {/* Skip to Quiz button (only during slides) */}
            {phase === "slides" && (
              <button
                onClick={() => setPhase("quiz")}
                style={{
                  background: "transparent",
                  border: "1px solid #334155",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 13,
                  color: "#64748b",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                  minHeight: 48,
                }}
              >
                Skip → Quiz
              </button>
            )}
          </div>

          {/* Progress */}
          <div style={{ maxWidth: 600, margin: "10px auto 0" }}>
            {phase === "slides" && (
              <ProgressBar
                current={slideIndex + 1}
                total={slides.length}
                label="Lesson"
              />
            )}
            {phase === "quiz" && (
              <ProgressBar
                current={questionIndex + 1}
                total={questions.length}
                label="Quiz"
              />
            )}
            {phase === "results" && (
              <ProgressBar current={questions.length} total={questions.length} label="Quiz" />
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 600,
            padding: "24px 16px 120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {phase === "slides" && (
            <SlideRenderer key={slides[slideIndex].id} slide={slides[slideIndex]} />
          )}

          {phase === "quiz" && (
            <QuizRenderer
              key={currentQuestion.id}
              question={currentQuestion}
              qIndex={questionIndex}
              totalQ={questions.length}
              onAnswer={(optId, isCorrect) =>
                handleAnswer(currentQuestion.id, optId, isCorrect)
              }
              answeredId={currentAnswerForQ?.optionId ?? null}
            />
          )}

          {phase === "results" && (
            <ResultsScreen
              score={score}
              total={questions.length}
              xpReward={xpReward}
              onRestart={handleRestart}
            />
          )}
        </div>

        {/* ── Bottom Nav ── */}
        {phase !== "results" && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              background: "rgba(6,13,26,0.95)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid #1e293b",
              padding: "14px 20px",
            }}
          >
            <div
              style={{
                maxWidth: 600,
                margin: "0 auto",
                display: "flex",
gap: 12,
alignItems: "center",
justifyContent: "space-between",
              }}
            >
              {phase === "slides" && (
                <>
                  <NavButton
                    onClick={handlePrevSlide}
                    disabled={slideIndex === 0}
                    variant="secondary"
                  >
                    ← Back
                  </NavButton>
                  <NavButton onClick={handleNextSlide} variant="primary">
                    {slideIndex < slides.length - 1 ? "Next →" : "Start Quiz →"}
                  </NavButton>
                </>
              )}

              {phase === "quiz" && (
                <>
                  <NavButton
                    onClick={handlePrevQuestion}
                    disabled={questionIndex === 0}
                    variant="secondary"
                  >
                    ← Back
                  </NavButton>
                  <NavButton
                    onClick={handleNextQuestion}
                    disabled={!currentAnswerForQ}
                    variant="primary"
                  >
                    {questionIndex < questions.length - 1 ? "Next →" : "See Results →"}
                  </NavButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
