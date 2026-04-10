import { useState } from "react";
 import { useUnlockOnMount } from "../components/ui/Usebadges";
// ─── Types ───────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SubStep = "6a" | "6b" | "6c";

interface Document {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  details: Record<string, string>;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const MOCK_OTP = "123456";

const DOCUMENTS: Document[] = [
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    issuer: "UIDAI",
    date: "15 Jan 2020",
    icon: "🪪",
    details: { "Aadhaar No": "[Aadhaar Redacted]", Name: "Ha****** ***de", DOB: "01/01/1980", Address: "Maharashtra, India" },
  },
  {
    id: "pan",
    name: "PAN Card",
    issuer: "Income Tax Dept.",
    date: "10 Mar 2018",
    icon: "🗂️",
    details: { "PAN No": "ABCDE1234F", Name: "Ha****** ***de", DOB: "01/01/1980", "Father's Name": "R*** ***de" },
  },
  {
    id: "dl",
    name: "Driving Licence",
    issuer: "RTO Maharashtra",
    date: "22 Jun 2021",
    icon: "🚗",
    details: { "DL No": "MH-12-20210012345", Name: "Ha****** ***de", Valid: "22 Jun 2041", Class: "LMV" },
  },
  {
    id: "degree",
    name: "Degree Certificate",
    issuer: "Cummins College",
    date: "30 May 2025",
    icon: "🎓",
    details: { Programme: "B.E. E&TC", "Roll No": "CCOEC21XXX", Year: "2025", Result: "First Class" },
  },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const SafetyBanner = () => (
  <div style={styles.banner}>
    ⚠️ This is a practice simulation. Do NOT enter real details.
  </div>
);

const StepHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={styles.stepTitle}>{title}</h2>
    {subtitle && <p style={styles.stepSubtitle}>{subtitle}</p>}
  </div>
);

const PrimaryBtn = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) => (
  <button style={{ ...styles.btn, ...(disabled ? styles.btnDisabled : {}) }} onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

const TextInput = ({
  label, value, onChange, placeholder, type = "text", hint,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; hint?: string }) => (
  <div style={{ marginBottom: 24 }}>
    <label style={styles.label}>{label}</label>
    <input
      style={styles.input}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {hint && <p style={styles.hint}>{hint}</p>}
  </div>
);

const OTPDisplay = () => (
  <div style={styles.otpBox}>
    <p style={{ margin: "0 0 8px", fontSize: 15, color: "#555" }}>Simulated OTP (for practice only):</p>
    <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: 8, color: "#3730a3" }}>{MOCK_OTP}</span>
  </div>
);

const ErrorMsg = ({ msg }: { msg: string }) =>
  msg ? <p style={styles.error}>{msg}</p> : null;

const SuccessMsg = ({ msg }: { msg: string }) =>
  msg ? <p style={styles.success}>{msg}</p> : null;

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (!/^\d{10}$/.test(mobile)) return setErr("Please enter a valid 10-digit mobile number.");
    setErr("");
    onNext();
  };

  return (
    <>
      <StepHeader title="Step 1 — Enter Mobile Number" subtitle="Enter the mobile number linked to your DigiLocker account." />
      <TextInput label="Mobile Number" value={mobile} onChange={(v) => { setMobile(v); setErr(""); }} placeholder="e.g. 98XXXXXXXX" type="tel" />
      <ErrorMsg msg={err} />
      <PrimaryBtn label="Send OTP →" onClick={handle} />
    </>
  );
}

function Step2({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (otp !== MOCK_OTP) return setErr("Incorrect OTP. Use the simulated OTP shown above.");
    setErr("");
    onNext();
  };

  return (
    <>
      <StepHeader title="Step 2 — OTP Verification" subtitle="Enter the OTP sent to your mobile number." />
      <OTPDisplay />
      <div style={styles.warningBox}>🔒 Never share your OTP with anyone, not even DigiLocker support.</div>
      <TextInput label="Enter OTP" value={otp} onChange={(v) => { setOtp(v); setErr(""); }} placeholder="6-digit OTP" type="number" />
      <ErrorMsg msg={err} />
      <PrimaryBtn label="Verify OTP →" onClick={handle} />
    </>
  );
}

function Step3({ onNext }: { onNext: () => void }) {
  const [aadhaar, setAadhaar] = useState("");
  const [err, setErr] = useState("");

  const formatAadhaar = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handle = () => {
    const raw = aadhaar.replace(/\s/g, "");
    if (raw.length !== 12) return setErr("Please enter a valid 12-digit Aadhaar number.");
    setErr("");
    onNext();
  };

  return (
    <>
      <StepHeader title="Step 3 — Aadhaar Entry" subtitle="Link your Aadhaar to verify your identity." />
      <div style={styles.infoBox}>🛡️ Only enter Aadhaar on official government websites. This simulation does not store any data.</div>
      <TextInput
        label="Aadhaar Number"
        value={aadhaar}
        onChange={(v) => { setAadhaar(formatAadhaar(v)); setErr(""); }}
        placeholder="0000 0000 0000"
      />
      <ErrorMsg msg={err} />
      <PrimaryBtn label="Send Aadhaar OTP →" onClick={handle} />
    </>
  );
}

function Step4({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (otp !== MOCK_OTP) return setErr("Incorrect OTP. Use the simulated OTP shown above.");
    setErr("");
    onNext();
  };

  return (
    <>
      <StepHeader title="Step 4 — Aadhaar OTP Verification" subtitle="An OTP has been sent to your Aadhaar-linked mobile." />
      <OTPDisplay />
      <div style={styles.warningBox}>🔒 Never share your OTP. UIDAI never asks for OTP over calls.</div>
      <TextInput label="Enter Aadhaar OTP" value={otp} onChange={(v) => { setOtp(v); setErr(""); }} placeholder="6-digit OTP" type="number" />
      <ErrorMsg msg={err} />
      <PrimaryBtn label="Verify & Continue →" onClick={handle} />
    </>
  );
}

function Step5({ onNext, onForgot }: { onNext: () => void; onForgot: () => void }) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (!/^\d{6}$/.test(pin)) return setErr("PIN must be exactly 6 digits.");
    if (pin !== confirm) return setErr("PINs do not match. Please try again.");
    const weak = /^(.)\1{5}$/.test(pin) || ["123456", "654321", "012345"].includes(pin);
    if (weak) return setErr("This PIN is too simple. Avoid repeated or sequential digits.");
    setErr("");
    onNext();
  };

  return (
    <>
      <StepHeader title="Step 5 — Set Security PIN" subtitle="Choose a 6-digit PIN to protect your DigiLocker." />
      <div style={styles.warningBox}>🔐 Do NOT share your PIN with anyone.</div>
      <TextInput label="Enter 6-digit PIN" value={pin} onChange={(v) => { setPin(v.replace(/\D/g, "").slice(0, 6)); setErr(""); }} placeholder="••••••" type="password" />
      <TextInput label="Confirm PIN" value={confirm} onChange={(v) => { setConfirm(v.replace(/\D/g, "").slice(0, 6)); setErr(""); }} placeholder="••••••" type="password" />
      <ErrorMsg msg={err} />
      <PrimaryBtn label="Set PIN & Continue →" onClick={handle} />
      <button style={styles.link} onClick={onForgot}>Forgot / Reset PIN instead →</button>
    </>
  );
}

function Step6({ onDone }: { onDone: () => void }) {
  const [subStep, setSubStep] = useState<SubStep>("6a");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const clearErr = () => setErr("");

  const handle6a = () => {
    if (!dob) return setErr("Please enter your date of birth.");
    clearErr(); setSubStep("6b");
  };

  const handle6b = () => {
    if (otp !== MOCK_OTP) return setErr("Incorrect OTP. Use the simulated OTP shown above.");
    clearErr(); setSubStep("6c");
  };

  const handle6c = () => {
    if (!/^\d{6}$/.test(pin)) return setErr("PIN must be exactly 6 digits.");
    if (pin !== confirm) return setErr("PINs do not match.");
    clearErr();
  };

  const pinSet = !/^\d{6}$/.test(pin) === false && pin === confirm && pin.length === 6;

  return (
    <>
      <div style={styles.subStepBar}>
        {(["6a", "6b", "6c"] as SubStep[]).map((s, i) => (
          <div key={s} style={{ ...styles.subStepDot, background: subStep === s ? "#3730a3" : subStep > s ? "#6ee7b7" : "#e5e7eb" }}>
            {i + 1}
          </div>
        ))}
        <span style={{ fontSize: 16, color: "#6b7280", marginLeft: 12, fontWeight: 500 }}>
          {subStep === "6a" ? "Date of Birth" : subStep === "6b" ? "OTP Verification" : "New PIN"}
        </span>
      </div>

      {subStep === "6a" && (
        <>
          <StepHeader title="Step 6A — Date of Birth" subtitle="Enter your DOB to verify your identity for PIN recovery." />
          <TextInput label="Date of Birth" value={dob} onChange={(v) => { setDob(v); clearErr(); }} placeholder="" type="date" />
          <ErrorMsg msg={err} />
          <PrimaryBtn label="Next →" onClick={handle6a} />
        </>
      )}

      {subStep === "6b" && (
        <>
          <StepHeader title="Step 6B — OTP Verification" subtitle="Enter the OTP sent to your registered mobile." />
          <OTPDisplay />
          <div style={styles.warningBox}>🔒 Never share your OTP.</div>
          <TextInput label="Enter OTP" value={otp} onChange={(v) => { setOtp(v); clearErr(); }} placeholder="6-digit OTP" type="number" />
          <ErrorMsg msg={err} />
          <PrimaryBtn label="Verify →" onClick={handle6b} />
        </>
      )}

      {subStep === "6c" && (
        <>
          <StepHeader title="Step 6C — Set New PIN" subtitle="Choose a new 6-digit security PIN." />
          <TextInput label="New PIN" value={pin} onChange={(v) => { setPin(v.replace(/\D/g, "").slice(0, 6)); clearErr(); }} placeholder="••••••" type="password" />
          <TextInput label="Confirm New PIN" value={confirm} onChange={(v) => { setConfirm(v.replace(/\D/g, "").slice(0, 6)); clearErr(); }} placeholder="••••••" type="password" />
          <ErrorMsg msg={err} />
          <PrimaryBtn label={pinSet ? "Update PIN" : "Set New PIN"} onClick={handle6c} />
          {pinSet && (
            <>
              <SuccessMsg msg="✅ PIN reset successfully! Your account is now secured." />
              <PrimaryBtn label="Go to Dashboard →" onClick={onDone} />
            </>
          )}
        </>
      )}
    </>
  );
}

function Step7({ onIssuedDocs }: { onIssuedDocs: () => void }) {
  const [tab, setTab] = useState<"issued" | "drive">("issued");

  return (
    <>
      <StepHeader title="Step 7 — Dashboard" subtitle="Welcome to your DigiLocker! Access your documents below." />
      <div style={styles.tabBar}>
        <button style={{ ...styles.tab, ...(tab === "issued" ? styles.tabActive : {}) }} onClick={() => setTab("issued")}>
          📄 Issued Documents
        </button>
        <button style={{ ...styles.tab, ...(tab === "drive" ? styles.tabActive : {}) }} onClick={() => setTab("drive")}>
          📁 Drive
        </button>
      </div>

      {tab === "issued" && (
        <div>
          <p style={{ color: "#555", marginBottom: 24, fontSize: 16 }}>These documents are officially issued by government agencies.</p>
          {DOCUMENTS.map((doc) => (
            <div key={doc.id} style={styles.docRow} onClick={onIssuedDocs}>
              <span style={{ fontSize: 32, marginRight: 20 }}>{doc.icon}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 18, color: "#111827" }}>{doc.name}</p>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 15, marginTop: 4 }}>{doc.issuer} · {doc.date}</p>
              </div>
              <span style={{ marginLeft: "auto", color: "#3730a3", fontSize: 24 }}>›</span>
            </div>
          ))}
        </div>
      )}

      {tab === "drive" && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📂</div>
          <p style={{ fontSize: 20, color: "#4b5563" }}>Your Drive is empty.</p>
          <p style={{ fontSize: 16, marginTop: 8 }}>Upload documents manually using the DigiLocker mobile app.</p>
        </div>
      )}
    </>
  );
}

function Step8({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<Document | null>(null);

  if (selected) {
    return (
      <>
        <button style={styles.backBtn} onClick={() => setSelected(null)}>← Back to list</button>
        <div style={styles.docCard}>
          <div style={{ fontSize: 64, textAlign: "center", marginBottom: 16 }}>{selected.icon}</div>
          <h3 style={{ textAlign: "center", margin: "0 0 8px", fontSize: 24 }}>{selected.name}</h3>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: 16, margin: "0 0 32px" }}>Issued by {selected.issuer} on {selected.date}</p>
          <div style={styles.divider} />
          {Object.entries(selected.details).map(([k, v]) => (
            <div key={k} style={styles.detailRow}>
              <span style={{ color: "#6b7280", fontSize: 16 }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>{v}</span>
            </div>
          ))}
          <div style={{ ...styles.infoBox, marginTop: 24, fontSize: 15 }}>
            🔒 This is a simulated document for learning purposes only. No real data is shown.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button style={styles.backBtn} onClick={onBack}>← Back to Dashboard</button>
      <StepHeader title="Step 8 — Issued Documents" subtitle="Tap any document to view its details." />
      {DOCUMENTS.map((doc) => (
        <div key={doc.id} style={styles.docRow} onClick={() => setSelected(doc)}>
          <span style={{ fontSize: 32, marginRight: 20 }}>{doc.icon}</span>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 18, color: "#111827" }}>{doc.name}</p>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 15, marginTop: 4 }}>{doc.issuer} · {doc.date}</p>
          </div>
          <span style={{ marginLeft: "auto", color: "#3730a3", fontSize: 24 }}>›</span>
        </div>
      ))}
    </>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: Step }) {
  const total = 8;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 10, fontWeight: 500 }}>
        <span>Step {step} of {total}</span>
        <span>{Math.round((step / total) * 100)}% complete</span>
      </div>
      <div style={{ height: 8, background: "#e5e7eb", borderRadius: 99 }}>
        <div style={{ height: "100%", width: `${(step / total) * 100}%`, background: "#3730a3", borderRadius: 99, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function DigiLockerModule() {
  useUnlockOnMount("/sandbox/module2");

  const [step, setStep] = useState<Step>(1);
  const next = () => setStep((s) => Math.min(s + 1, 8) as Step);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🔒</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 20, color: "#1e1b4b" }}>DigiLocker</p>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280", marginTop: 2 }}>Learning Simulation</p>
            </div>
          </div>
          <span style={styles.govBadge}>🇮🇳 Govt. of India</span>
        </div>

        <SafetyBanner />
        
        <div style={styles.body}>
          <ProgressBar step={step} />
          {step === 1 && <Step1 onNext={next} />}
          {step === 2 && <Step2 onNext={next} />}
          {step === 3 && <Step3 onNext={next} />}
          {step === 4 && <Step4 onNext={next} />}
          {step === 5 && <Step5 onNext={next} onForgot={() => setStep(6)} />}
          {step === 6 && <Step6 onDone={() => setStep(7)} />}
          {step === 7 && <Step7 onIssuedDocs={() => setStep(8)} />}
          {step === 8 && <Step8 onBack={() => setStep(7)} />}
        </div>

        <div style={styles.footer}>
          <span>Powered by Digital India</span>
          <span>·</span>
          <span>For learning only</span>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f0f0f8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  card: { background: "#fff", borderRadius: 20, width: "100%", maxWidth: 800, boxShadow: "0 10px 40px rgba(0,0,0,0.12)", overflow: "hidden" },
  header: { background: "#eef2ff", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e0e7ff" },
  logo: { display: "flex", alignItems: "center", gap: 16 },
  logoIcon: { fontSize: 36 },
  govBadge: { fontSize: 14, color: "#4338ca", fontWeight: 600, background: "#e0e7ff", padding: "6px 12px", borderRadius: 20 },
  banner: { background: "#fef3c7", borderBottom: "1px solid #fcd34d", padding: "14px 40px", fontSize: 15, fontWeight: 500, color: "#92400e", textAlign: "center" },
  body: { padding: "40px 40px 20px" },
  footer: { padding: "20px 40px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 12, justifyContent: "center", fontSize: 14, color: "#9ca3af" },
  stepTitle: { fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 10px" },
  stepSubtitle: { fontSize: 16, color: "#6b7280", margin: 0, lineHeight: 1.6 },
  label: { display: "block", fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 8 },
  input: { width: "100%", padding: "16px 20px", fontSize: 18, border: "2px solid #e5e7eb", borderRadius: 12, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", color: "#111827" },
  hint: { margin: "6px 0 0", fontSize: 14, color: "#6b7280" },
  btn: { display: "block", width: "100%", padding: "16px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 12, fontSize: 18, fontWeight: 600, cursor: "pointer", marginBottom: 16, transition: "background 0.2s, transform 0.1s" },
  btnDisabled: { background: "#a5b4fc", cursor: "not-allowed" },
  link: { background: "none", border: "none", color: "#4f46e5", fontSize: 16, cursor: "pointer", padding: "6px 0", textDecoration: "underline", marginBottom: 16, fontWeight: 500 },
  backBtn: { background: "none", border: "none", color: "#4f46e5", fontSize: 16, cursor: "pointer", padding: "0 0 24px", textDecoration: "none", fontWeight: 600 },
  error: { color: "#b91c1c", fontSize: 15, margin: "0 0 20px", background: "#fef2f2", padding: "12px 16px", borderRadius: 8, borderLeft: "4px solid #f87171" },
  success: { color: "#065f46", fontSize: 16, margin: "0 0 20px", background: "#ecfdf5", padding: "14px 18px", borderRadius: 8, borderLeft: "4px solid #34d399", fontWeight: 500 },
  warningBox: { background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "16px 20px", fontSize: 15, color: "#9a3412", marginBottom: 24, lineHeight: 1.5 },
  infoBox: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "16px 20px", fontSize: 15, color: "#1e40af", marginBottom: 24, lineHeight: 1.5 },
  otpBox: { background: "#f5f3ff", border: "2px dashed #818cf8", borderRadius: 12, padding: "24px", textAlign: "center", marginBottom: 24 },
  tabBar: { display: "flex", gap: 8, marginBottom: 32, background: "#f3f4f6", padding: 6, borderRadius: 12 },
  tab: { flex: 1, padding: "14px", border: "none", background: "transparent", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer", color: "#6b7280", transition: "background 0.2s, color 0.2s" },
  tabActive: { background: "#fff", color: "#111827", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  docRow: { display: "flex", alignItems: "center", padding: "20px 24px", borderRadius: 12, border: "1px solid #e5e7eb", marginBottom: 16, cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.1s", background: "#fafafa" },
  docCard: { background: "#f9fafb", borderRadius: 16, border: "1px solid #e5e7eb", padding: "40px 32px" },
  detailRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f3f4f6" },
  divider: { height: 1, background: "#e5e7eb", margin: "16px 0 24px" },
  subStepBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32, padding: "16px 20px", background: "#f5f3ff", borderRadius: 12 },
  subStepDot: { width: 36, height: 36, borderRadius: "50%", color: "#fff", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" },
};