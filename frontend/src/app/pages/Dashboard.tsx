import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Lock,
  IdCard,
  AlertTriangle,
  MessageSquare,
  ScanFace,
  TrendingUp,
  Star,
  Shield,
  Trophy,
  CheckCircle,
  Flame,
  Zap,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useBadges } from "../components/ui/Usebadges";

/* ─────────────────────── BADGE DEFINITIONS ─────────────────────── */

const BADGE_DEFS = [
  {
    id: "password-master" as const, // Maps to Module 1: Bank Statements
    title: "Statement Pro",
    description: "Mastered Downloading Bank Statements",
    icon: Lock,
    bg: "from-violet-500 to-purple-600",
    softBg: "bg-violet-50",
    border: "border-violet-200",
    glow: "shadow-violet-200",
    particle: "📄",
    ringColor: "#8b5cf6",
  },
  {
    id: "id-expert" as const, // Maps to Module 2: DigiLocker
    title: "DigiLocker Expert",
    description: "Mastered secure DigiLocker setup",
    icon: IdCard,
    bg: "from-emerald-500 to-teal-600",
    softBg: "bg-emerald-50",
    border: "border-emerald-200",
    glow: "shadow-emerald-200",
    particle: "🪪",
    ringColor: "#10b981",
  },
  {
    id: "phishing-detector" as const, // Maps to Module 3: Fake Messages
    title: "Message Detective",
    description: "Learned to spot fake messages & links",
    icon: AlertTriangle,
    bg: "from-rose-500 to-red-600",
    softBg: "bg-rose-50",
    border: "border-rose-200",
    glow: "shadow-rose-200",
    particle: "🎯",
    ringColor: "#f43f5e",
  },
  {
    id: "scam-aware" as const, // Maps to Module 4: Safe Chatting
    title: "Safe Chatter",
    description: "Beat the AI Scam Simulator",
    icon: MessageSquare,
    bg: "from-blue-500 to-sky-600",
    softBg: "bg-blue-50",
    border: "border-blue-200",
    glow: "shadow-blue-200",
    particle: "🛡️",
    ringColor: "#3b82f6",
  },
  {
    id: "deepfake-spotter" as const, // Maps to Module 5: Fake Photos
    title: "Photo Detective",
    description: "Passed Deepfake Recognition Lab",
    icon: ScanFace,
    bg: "from-amber-500 to-orange-500",
    softBg: "bg-amber-50",
    border: "border-amber-200",
    glow: "shadow-amber-200",
    particle: "👁️",
    ringColor: "#f59e0b",
  },
  {
    id: "guardian" as const,
    title: "Digital Guardian",
    description: "Completed All 5 Modules",
    icon: Trophy,
    bg: "from-yellow-400 to-amber-500",
    softBg: "bg-yellow-50",
    border: "border-yellow-200",
    glow: "shadow-yellow-200",
    particle: "🏆",
    ringColor: "#fbbf24",
  },
];

const SKILL_DEFS = [
  { badgeId: "password-master" as const, name: "Bank Statements",   color: "#8b5cf6", trackColor: "#ede9fe", icon: Lock },
  { badgeId: "id-expert"       as const, name: "DigiLocker Setup",  color: "#059669", trackColor: "#d1fae5", icon: IdCard },
  { badgeId: "phishing-detector" as const, name: "Spot Fake Messages",color: "#e11d48", trackColor: "#ffe4e6", icon: AlertTriangle },
  { badgeId: "scam-aware"      as const, name: "Safe Chatting",     color: "#3b82f6", trackColor: "#dbeafe", icon: MessageSquare },
  { badgeId: "deepfake-spotter" as const, name: "Fake Photos",      color: "#d97706", trackColor: "#fef3c7", icon: ScanFace },
];

/* ─────────────────────── HELPERS ─────────────────────── */

function useCountUp(target: number, duration = 1.4, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration * 60);
      const iv = setInterval(() => {
        start += step;
        if (start >= target) { setValue(target); clearInterval(iv); }
        else setValue(Math.floor(start));
      }, 1000 / 60);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}

function Sparkles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible rounded-2xl">
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: color, left: "50%", top: "50%" }}
          animate={{
            x: [0, Math.cos((i / 6) * Math.PI * 2) * 62],
            y: [0, Math.sin((i / 6) * Math.PI * 2) * 62],
            opacity: [0, 0.7, 0],
            scale: [0, 1.6, 0],
          }}
          transition={{ duration: 2.8, delay: i * 0.2, repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────── SKILL BAR ─────────────────────── */

function SkillBar({
  skill,
  index,
  earned,
}: {
  skill: typeof SKILL_DEFS[0];
  index: number;
  earned: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  const progress = earned ? 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 180 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: skill.trackColor }}
        >
          <Icon className="w-5 h-5" style={{ color: skill.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800 text-sm truncate">{skill.name}</span>
            <motion.span
              animate={hovered ? { scale: 1.2 } : { scale: 1 }}
              className="text-base font-black ml-2 shrink-0"
              style={{ color: skill.color }}
            >
              {progress}%
            </motion.span>
          </div>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: skill.trackColor }}>
        <motion.div
          key={`${skill.badgeId}-${progress}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.4, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: skill.color }}
        >
          {progress > 0 && (
            <motion.div
              className="absolute inset-0"
              animate={{ x: ["-100%", "150%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", width: "50%" }}
            />
          )}
        </motion.div>
      </div>
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1.5 mt-2"
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-600">Mastered!</span>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────── BADGE CARD ─────────────────────── */

function BadgeCard({
  badge,
  index,
  earned,
}: {
  badge: typeof BADGE_DEFS[0];
  index: number;
  earned: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const Icon = badge.icon;

  useEffect(() => {
    if (!earned) setFlipped(false);
  }, [earned]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 170 }}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => earned && setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 130 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
        className="w-full"
      >
        {/* FRONT */}
        <div
          className={`rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden border-2 transition-all
            ${earned
              ? `${badge.softBg} ${badge.border} shadow-xl ${badge.glow}`
              : "bg-gray-50 border-dashed border-gray-200 opacity-60"
            }`}
          style={{ backfaceVisibility: "hidden", minHeight: "268px" }}
        >
          {earned && (
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${badge.bg} rounded-t-2xl`} />
          )}
          {earned && <Sparkles color={badge.ringColor} />}

          <motion.div
            animate={earned ? {
              y: [0, -5, 0],
              filter: [
                `drop-shadow(0 6px 14px ${badge.ringColor}44)`,
                `drop-shadow(0 14px 28px ${badge.ringColor}77)`,
                `drop-shadow(0 6px 14px ${badge.ringColor}44)`,
              ],
            } : {}}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-4 mt-3
              ${earned ? `bg-gradient-to-br ${badge.bg} shadow-lg` : "bg-gray-200"}`}
          >
            <Icon className={`w-9 h-9 ${earned ? "text-white" : "text-gray-400"}`} />
            {earned && (
              <motion.div
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </motion.div>
            )}
          </motion.div>

          <h3 className={`text-base font-black mb-1 leading-snug ${earned ? "text-gray-900" : "text-gray-400"}`}>
            {badge.title}
          </h3>
          <p className={`text-xs leading-snug mb-4 ${earned ? "text-gray-600" : "text-gray-400"}`}>
            {badge.description}
          </p>

          {earned ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-200 shadow-sm">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                <span className="text-xs font-bold text-emerald-700">Earned!</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1">Tap to flip 👆</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
              <Lock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400 font-semibold">Locked</span>
            </div>
          )}
        </div>

        {/* BACK */}
        {earned && (
          <div
            className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br ${badge.bg} shadow-2xl`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-white/10" />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl mb-3 relative z-10"
            >
              {badge.particle}
            </motion.div>
            <h3 className="text-xl font-black text-white mb-2 relative z-10">{badge.title}</h3>
            <p className="text-sm text-white/85 mb-4 relative z-10 leading-snug">{badge.description}</p>
            <div className="bg-white/25 backdrop-blur-sm rounded-xl px-4 py-2 relative z-10">
              <p className="text-xs text-white font-bold">Badge Unlocked ✓</p>
            </div>
            <span className="text-[10px] text-white/50 mt-4 relative z-10">Tap to flip back</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── MAIN DASHBOARD ─────────────────────── */

export function Dashboard() {
  const { isEarned } = useBadges();

  const earnedCount = BADGE_DEFS.filter((b) => isEarned(b.id)).length;
  const totalBadges = BADGE_DEFS.length;
  const overallPct = Math.round((earnedCount / totalBadges) * 100);
  const animatedPct = useCountUp(overallPct, 1.3, 0.5);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 3800);
    return () => clearTimeout(t);
  }, []);

  const confettiColors = ["#4f46e5", "#10b981", "#f43f5e", "#fbbf24", "#8b5cf6", "#3b82f6", "#f97316"];
  const confettiPieces = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div
      className="min-h-screen py-10 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #fef9f0 40%, #f0fdf4 80%, #fdf4ff 100%)",
      }}
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #c7d2fe, transparent 70%)" }} />
        <div className="absolute top-[30%] right-[-60px] w-[350px] h-[350px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #a7f3d0, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[20%] w-[450px] h-[450px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #fde68a, transparent 70%)" }} />
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confettiPieces.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm z-50"
            style={{
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              background: confettiColors[i % confettiColors.length],
              left: `${5 + (i / confettiPieces.length) * 90}%`,
              top: "-16px",
            }}
            initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: "110vh",
              x: (Math.random() - 0.5) * 130,
              rotate: Math.random() * 800,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 + Math.random() * 1.8, delay: Math.random() * 0.7, ease: "easeIn" }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 shadow-xl"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tight leading-none">
            Your Journey
          </h1>
          <p className="text-lg text-gray-500 font-semibold">
            You're on your way to becoming a Digital Guardian 🛡️
          </p>
        </motion.div>

        {/* HERO PROGRESS CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="relative rounded-3xl p-8 mb-10 overflow-hidden"
          style={{
            background: "white",
            border: "2px solid #e0e7ff",
            boxShadow: "0 4px 32px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa, #34d399)" }} />

          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center sm:text-left shrink-0">
              <div className="text-8xl sm:text-9xl font-black leading-none" style={{ color: "#4f46e5" }}>
                {animatedPct}%
              </div>
              <div className="text-gray-400 font-bold text-lg mt-1">Complete</div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-orange-700">{earnedCount} Badges Earned</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-2.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-700">{totalBadges - earnedCount} to Unlock</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
                  <Crown className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-bold text-indigo-700">
                    {earnedCount >= 5 ? "Digital Guardian 🏆" : `Level ${Math.max(1, earnedCount)} Explorer`}
                  </span>
                </div>
              </div>

              <div className="h-5 rounded-full overflow-hidden bg-indigo-50">
                <motion.div
                  key={overallPct}
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ["-100%", "150%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)", width: "50%" }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400 font-semibold">Beginner</span>
                <span className="text-xs text-gray-400 font-semibold">Digital Guardian 🏆</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm bg-indigo-100">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Skill Mastery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_DEFS.map((skill, i) => (
              <SkillBar
                key={skill.badgeId}
                skill={skill}
                index={i}
                earned={isEarned(skill.badgeId)}
              />
            ))}
          </div>
        </motion.div>

        {/* BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm bg-yellow-100">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Achievement Badges</h2>
            </div>
            <motion.div
              animate={{ rotate: [0, 18, -18, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-3xl"
            >
              🏅
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 px-5 py-3.5 rounded-2xl flex items-center gap-3 bg-emerald-50 border border-emerald-200 shadow-sm"
          >
            <span className="text-2xl">✨</span>
            <p className="text-sm text-emerald-800 font-semibold leading-snug">
              You've earned <span className="font-black">{earnedCount}</span> of{" "}
              <span className="font-black">{totalBadges}</span> badges.{" "}
              <span className="text-gray-600 font-medium">Visit a module to unlock its badge. Tap earned badges to flip them!</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {BADGE_DEFS.map((badge, i) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                index={i}
                earned={isEarned(badge.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm font-medium">
            Complete all 5 modules to become a{" "}
            <span className="text-amber-600 font-black">Digital Guardian</span> 🏆
          </p>
        </motion.div>

      </div>
    </div>
  );
}