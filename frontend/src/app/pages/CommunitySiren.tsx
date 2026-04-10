import { useState, useEffect } from "react";

type Page = "feed" | "form";

interface ScamReport {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  severity: "High" | "Medium" | "Low";
  isNew?: boolean;
}

const CATEGORY_COLORS: Record<string, { border: string; badge: string; text: string }> = {
  "Phishing scams": { border: "#dc2626", badge: "#fee2e2", text: "#991b1b" },
  "Job scams": { border: "#1d4ed8", badge: "#dbeafe", text: "#1e40af" },
  "Investment scams": { border: "#d97706", badge: "#fef3c7", text: "#92400e" },
  "Account takeover": { border: "#7c3aed", badge: "#ede9fe", text: "#5b21b6" },
  "Payment redirection": { border: "#db2777", badge: "#fce7f3", text: "#9d174d" },
  "Buying/selling scams": { border: "#059669", badge: "#d1fae5", text: "#065f46" },
  "Donation scams": { border: "#0891b2", badge: "#cffafe", text: "#164e63" },
  "Money recovery scams": { border: "#dc2626", badge: "#fee2e2", text: "#991b1b" },
  "Relationship scams": { border: "#db2777", badge: "#fce7f3", text: "#9d174d" },
  "Threat scams": { border: "#b91c1c", badge: "#fee2e2", text: "#7f1d1d" },
  "Unexpected money scams": { border: "#d97706", badge: "#fef3c7", text: "#92400e" },
  "Other": { border: "#6b7280", badge: "#f3f4f6", text: "#374151" },
};

const INITIAL_REPORTS: ScamReport[] = [
  {
    id: "1",
    title: "Fake Income Tax Refund SMS",
    description: "Received a message claiming to be from the Income Tax Department offering a refund of ₹8,500. The link led to a fake government website asking for bank details.",
    date: "11 Apr 2025",
    category: "Phishing scams",
    severity: "High",
  },
  {
    id: "2",
    title: "WhatsApp Job Offer — Work From Home",
    description: "A stranger on WhatsApp offered a part-time data entry job promising ₹500 per hour. They asked for an upfront 'registration fee' of ₹2,000.",
    date: "10 Apr 2025",
    category: "Job scams",
    severity: "High",
  },
  {
    id: "3",
    title: "Fake Mutual Fund Investment Scheme",
    description: "Caller claiming to be from SEBI promised 40% monthly returns on a new scheme. Requested immediate transfer to a 'special account'.",
    date: "09 Apr 2025",
    category: "Investment scams",
    severity: "High",
  },
  {
    id: "4",
    title: "OLX Seller Overpayment Trick",
    description: "Buyer sent a fake higher-amount UPI payment screenshot and asked for change money back before the real transaction could be verified.",
    date: "08 Apr 2025",
    category: "Buying/selling scams",
    severity: "Medium",
  },
  {
    id: "5",
    title: "Charity Donation After Cyclone",
    description: "Received calls asking for donations for cyclone victims. The organization name and website looked official but were unregistered.",
    date: "07 Apr 2025",
    category: "Donation scams",
    severity: "Medium",
  },
];

const SCAM_CATEGORIES = [
  "Account takeover",
  "Payment redirection",
  "Buying/selling scams",
  "Donation scams",
  "Investment scams",
  "Job scams",
  "Money recovery scams",
  "Phishing scams",
  "Relationship scams",
  "Threat scams",
  "Unexpected money scams",
  "Other",
];

function getSeverityStyle(severity: string) {
  if (severity === "High") return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
  if (severity === "Medium") return { background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d" };
  return { background: "#d1fae5", color: "#065f46", border: "1px solid #6ee7b7" };
}

export default function CommunitySiren() {
  const [page, setPage] = useState<Page>("feed");
  const [reports, setReports] = useState<ScamReport[]>(INITIAL_REPORTS);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  // Form state
  const [formDate, setFormDate] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Scam of the Day popup
  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setPopupVisible(true), 50);
    }, 2000);
    return () => clearTimeout(t1);
  }, []);

  function dismissPopup() {
    setPopupVisible(false);
    setTimeout(() => setShowPopup(false), 400);
  }

  function handleSubmit() {
    if (!formCategory || !formDescription || !formDate) return;
    setSubmitting(true);
    setTimeout(() => {
      const cat = formCategory;
      const newReport: ScamReport = {
        id: Date.now().toString(),
        title: cat + " — User Report",
        description: formDescription,
        date: formDate,
        category: cat,
        severity: "High",
        isNew: true,
      };
      setReports((prev) => [newReport, ...prev]);
      setFormDate("");
      setFormCategory("");
      setFormDescription("");
      setSubmitting(false);
      setPage("feed");
    }, 1200);
  }

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#f9fafb", display: "flex" }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 18px 4px rgba(239,68,68,0.45), 0 8px 32px rgba(0,0,0,0.18); }
          50% { box-shadow: 0 0 36px 12px rgba(239,68,68,0.7), 0 8px 32px rgba(0,0,0,0.22); }
        }
        @keyframes slideDown {
          from { transform: translateY(-80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-60px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .feed-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
          transition: all 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.05); }
        .cta-btn:active { transform: scale(0.95); }
        .cat-card:hover { transform: scale(1.03); cursor: pointer; }
        .submit-btn:hover { background: "#1e3a8a" !important; }
        input:focus, textarea:focus {
          outline: none;
          border: 2.5px solid #1e3a8a !important;
          box-shadow: 0 0 0 3px rgba(30,58,138,0.12);
        }
      `}</style>

      {/* SCAM OF THE DAY POPUP */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "min(420px, 92vw)",
            background: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
            border: "2.5px solid rgba(255,255,255,0.55)",
            borderRadius: 18,
            padding: "18px 22px",
            color: "#fff",
            animation: popupVisible
              ? "slideDown 0.45s cubic-bezier(.22,1,.36,1) forwards, pulse-glow 2s ease-in-out 0.45s infinite"
              : "fadeOut 0.38s ease forwards",
            cursor: "pointer",
          }}
          onClick={dismissPopup}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>🚨</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.5, opacity: 0.85, marginBottom: 4, fontFamily: "Georgia, serif" }}>
                SCAM OF THE DAY
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4, fontFamily: "Georgia, serif" }}>
                Fake DigiLocker SMS asking for OTP.
              </div>
              <div style={{ fontSize: 13, marginTop: 8, opacity: 0.8 }}>
                Never share your OTP with anyone. Tap to dismiss.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT PANEL */}
      <div style={{
        width: "25%",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 60,          // ← ADD THIS
  height: "auto",  
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
      }}>
        {/* Bouncing Arrow */}
        <div
          style={{
            animation: "bounce 1.2s ease-in-out infinite",
            fontSize: 32,
            marginBottom: 20,
          }}
        >
          👇
        </div>

        {/* CTA Button */}
        <button
          className="cta-btn"
          onClick={() => setPage("form")}
          style={{
            background: "#1e3a8a",
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            padding: "16px 32px",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            minHeight: 58,
            transition: "transform 0.15s ease, background 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "Georgia, serif",
            letterSpacing: 0.3,
            marginBottom: 20,
          }}
        >
          🚨 Report Scam
        </button>

        {/* Motivational Text */}
        <div
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "#374151",
            fontFamily: "Georgia, serif",
            lineHeight: 1.55,
          }}
        >
          Your report can help protect others from scams ❤️
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "75%", marginLeft: "25%" }}>
        {page === "feed" ? (
          <FeedPage
            reports={reports}
          />
        ) : (
          <FormPage
            formDate={formDate}
            setFormDate={setFormDate}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            onSubmit={handleSubmit}
            submitting={submitting}
            onBack={() => setPage("feed")}
          />
        )}
      </div>
    </div>
  );
}

// ─── FEED PAGE ───────────────────────────────────────────────────────────────

function FeedPage({
  reports,
}: {
  reports: ScamReport[];
}) {
  return (
    <div>
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 28 }}>🚨</span>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#111", fontFamily: "Georgia, serif" }}>
          Community Scam Alerts
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 16px 40px" }}>

        {/* Feed Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {reports.map((r) => {
            const catStyle = CATEGORY_COLORS[r.category] ?? CATEGORY_COLORS["Other"];
            const sevStyle = getSeverityStyle(r.severity);
            return (
              <div
                key={r.id}
                className="feed-card"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  borderLeft: `6px solid ${catStyle.border}`,
                  padding: "18px 20px",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  position: "relative",
                }}
              >
                {r.isNew && (
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      background: catStyle.badge,
                      color: catStyle.text,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                      border: `1px solid ${catStyle.border}`,
                      letterSpacing: 0.5,
                    }}
                  >
                    Just Added
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      ...sevStyle,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                      letterSpacing: 0.4,
                    }}
                  >
                    {r.severity} Risk
                  </span>
                  <span
                    style={{
                      background: catStyle.badge,
                      color: catStyle.text,
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                      border: `1px solid ${catStyle.border}`,
                    }}
                  >
                    {r.category}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111",
                    marginBottom: 6,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "#4b5563",
                    lineHeight: 1.55,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: 10,
                  }}
                >
                  {r.description}
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>{r.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FORM PAGE ────────────────────────────────────────────────────────────────

function FormPage({
  formDate,
  setFormDate,
  formCategory,
  setFormCategory,
  formDescription,
  setFormDescription,
  onSubmit,
  submitting,
  onBack,
}: {
  formDate: string;
  setFormDate: (v: string) => void;
  formCategory: string;
  setFormCategory: (v: string) => void;
  formDescription: string;
  setFormDescription: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  onBack: () => void;
}) {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "1.5px solid #d1d5db",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 16,
            cursor: "pointer",
            color: "#374151",
            fontFamily: "Georgia, serif",
          }}
        >
          ← Back
        </button>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#111", fontFamily: "Georgia, serif" }}>
          Report a Scam
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 16px 60px" }}>
        {/* Section 1 — Date */}
        <section style={{ marginBottom: 48 }}>
          <label
            style={{
              display: "block",
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              marginBottom: 8,
              fontFamily: "Georgia, serif",
            }}
          >
            📅 About the scam
          </label>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 12, marginTop: 0 }}>
            When did this scam happen?
          </p>
          <input
            type="date"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 18px",
              fontSize: 18,
              borderRadius: 12,
              border: "1.5px solid #d1d5db",
              background: "#fff",
              color: "#111",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
          />
        </section>

        {/* Section 2 — Category Grid */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              marginBottom: 8,
              fontFamily: "Georgia, serif",
            }}
          >
            🧠 Scam Category
          </div>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 16, marginTop: 0 }}>
            Select the type that best matches.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {SCAM_CATEGORIES.map((cat) => {
              const selected = formCategory === cat;
              const catStyle = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["Other"];
              return (
                <button
                  key={cat}
                  className="cat-card"
                  onClick={() => setFormCategory(cat)}
                  style={{
                    background: selected ? catStyle.badge : "#fff",
                    border: selected ? `2.5px solid #1e3a8a` : "1.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "16px 14px",
                    fontSize: 16,
                    fontWeight: selected ? 700 : 500,
                    color: selected ? catStyle.text : "#374151",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    transform: selected ? "scale(1.05)" : "scale(1)",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minHeight: 64,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {selected && (
                    <span style={{ fontSize: 18, flexShrink: 0 }}>✅</span>
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3 — Description */}
        <section style={{ marginBottom: 48 }}>
          <label
            style={{
              display: "block",
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              marginBottom: 8,
              fontFamily: "Georgia, serif",
            }}
          >
            📝 Tell us what happened
          </label>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 12, marginTop: 0 }}>
            The more detail you share, the better we can help others.
          </p>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Describe what happened in your own words…"
            rows={6}
            style={{
              width: "100%",
              padding: "16px 18px",
              fontSize: 17,
              borderRadius: 12,
              border: "1.5px solid #d1d5db",
              background: "#fff",
              color: "#111",
              boxSizing: "border-box",
              resize: "vertical",
              lineHeight: 1.6,
              fontFamily: "Georgia, serif",
              transition: "border 0.2s",
            }}
          />
        </section>

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={submitting || !formCategory || !formDescription || !formDate}
          style={{
            width: "100%",
            background:
              !formCategory || !formDescription || !formDate
                ? "#9ca3af"
                : "#1e3a8a",
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            padding: "18px",
            borderRadius: 14,
            border: "none",
            cursor: !formCategory || !formDescription || !formDate ? "not-allowed" : "pointer",
            minHeight: 58,
            transition: "background 0.2s, transform 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontFamily: "Georgia, serif",
          }}
        >
          {submitting ? (
            <>
              <span
                style={{
                  width: 22,
                  height: 22,
                  border: "3px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.75s linear infinite",
                }}
              />
              Submitting…
            </>
          ) : (
            "🚨 Report Scam"
          )}
        </button>

        {(!formCategory || !formDescription || !formDate) && (
          <p style={{ textAlign: "center", fontSize: 14, color: "#9ca3af", marginTop: 10 }}>
            Please fill all fields before submitting.
          </p>
        )}
      </div>
    </div>
  );
}