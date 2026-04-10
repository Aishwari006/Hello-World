import { motion } from "motion/react";
import {
  Lock,
  AlertTriangle,
  MessageSquare,
  ScanFace,
  Award,
  Sparkles,
  ShieldCheck,
  Target,
  Zap,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function Home() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900">

      {/* Learning Modules Section */}
      {/* CHANGED: Reduced py-32 to pt-8 pb-20 to pull the content up */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10" /* CHANGED: Reduced mb-20 to mb-10 */
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm mb-4 border border-indigo-100">
              <Sparkles className="size-4" />
              Interactive Modules
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-slate-900 tracking-tight">
              Learn by Doing.
            </h2>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
              Practice real-world digital tasks in a completely safe, guided environment.
            </p>
          </motion.div>

          {/* Grid for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <ModuleCard
              to="/sandbox/module1"
              icon={Lock}
              title="Downloading Bank Statements"
              description="Learn how to safely view and save your bank account details right on your phone, just like checking your physical passbook, using this guided sandbox"
              color="blue"
              delay={0}
              isHovered={hoveredModule === "upi"}
              onHover={() => setHoveredModule("upi")}
              onLeave={() => setHoveredModule(null)}
              difficulty="Beginner"
            />
            <ModuleCard
              to="/sandbox/module2"
              icon={Lock}
              title="Set Up Your DigiLocker"
              description="Follow simple steps to securely store your important ID cards and government papers on your phone so they are never lost, using this guided sandbox"
              color="blue"
              delay={0.1}
              isHovered={hoveredModule === "digital-id"}
              onHover={() => setHoveredModule("digital-id")}
              onLeave={() => setHoveredModule(null)}
              difficulty="Intermediate"
            />
            <ModuleCard
              to="/red-flag-detector"
              icon={AlertTriangle}
              title="Spot Fake Messages"
              description="Learn the simple warning signs of a dangerous text message, email, or link so you can ignore scammers and keep your money safe, using the red flag detector"
              color="red"
              delay={0.2}
              isHovered={hoveredModule === "red-flag"}
              onHover={() => setHoveredModule("red-flag")}
              onLeave={() => setHoveredModule(null)}
              difficulty="Intermediate"
            />
            <ModuleCard
              to="/ai-scam-simulator"
              icon={MessageSquare}
              title="Practice Safe Chatting"
              description="Play a safe practice game with a pretend scammer! Earn points by catching their tricks and protecting your personal details, using the AI scam simulator"
              color="purple"
              delay={0.3}
              isHovered={hoveredModule === "ai-scam"}
              onHover={() => setHoveredModule("ai-scam")}
              onLeave={() => setHoveredModule(null)}
              difficulty="Advanced"
            />
            <ModuleCard
              to="/deepfake-lab"
              icon={ScanFace}
              title="Spot the Fake Photos"
              description="See how tricksters use computers to create fake photos and videos. Take a short, fun quiz to test your new detective skills, using the deepfake recognition lab"
              color="orange"
              delay={0.4}
              isHovered={hoveredModule === "deepfake"}
              onHover={() => setHoveredModule("deepfake")}
              onLeave={() => setHoveredModule(null)}
              difficulty="Advanced"
            />
            <ModuleCard
              to="/dashboard"
              icon={Award}
              title="Track Progress"
              description=" Look back at all the great things you have learned, see the rewards you have won, and revisit your past lessons at any time"
              color="slate"
              delay={0.5}
              isHovered={hoveredModule === "progress"}
              onHover={() => setHoveredModule("progress")}
              onLeave={() => setHoveredModule(null)}
              difficulty="All Levels"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 bg-slate-900 text-white overflow-hidden">
        {/* Dark Mode Background Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              Why Choose SafetyNet?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built specifically to empower and protect, removing the fear of technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={ShieldCheck}
              step="01"
              title="100% Safe Sandbox"
              description="Practice making mistakes where it doesn't cost a dime. No real bank accounts or private data are ever at stake."
              delay={0}
            />
            <FeatureCard
              icon={Target}
              step="02"
              title="Real-World Scenarios"
              description="Experience exact replicas of modern scams and authentic interfaces so you know exactly what to look out for."
              delay={0.1}
            />
            <FeatureCard
              icon={Zap}
              step="03"
              title="Instant Feedback"
              description="Get gentle, immediate guidance on every action. We explain the 'why' behind the security rules."
              delay={0.2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// ------------------------------------
// Sub-components used within Home.tsx
// ------------------------------------

function ModuleCard({
  to,
  icon: Icon,
  title,
  description,
  color,
  delay,
  isHovered,
  onHover,
  onLeave,
  difficulty,
}: {
  to: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  difficulty: string;
}) {
  const colorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
    blue: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50", border: "border-blue-100" },
    green: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-100" },
    red: { bg: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50", border: "border-rose-100" },
    purple: { bg: "bg-purple-500", text: "text-purple-600", light: "bg-purple-50", border: "border-purple-100" },
    orange: { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-50", border: "border-orange-100" },
    slate: { bg: "bg-slate-700", text: "text-slate-700", light: "bg-slate-100", border: "border-slate-200" },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <Link to={to} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 100, damping: 20 }}
        onHoverStart={onHover}
        onHoverEnd={onLeave}
        className="group relative h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-transparent transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        <div className="absolute inset-[2px] bg-white rounded-[calc(2rem-2px)] z-0" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-3 lg:p-4 rounded-2xl ${theme.light} ${theme.text} border ${theme.border} shadow-sm`}
            >
              <Icon className="size-6 lg:size-8" strokeWidth={2} />
            </motion.div>
            
            <span className="inline-flex px-3 py-1 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full">
              {difficulty}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm lg:text-base text-slate-500 mb-6 lg:mb-8 flex-grow leading-relaxed">
            {description}
          </p>

          <div className="flex items-center text-sm lg:text-base text-indigo-600 font-bold mt-auto group-hover:tracking-wide transition-all duration-300">
            Start Module
            <motion.div
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="size-4 lg:size-5 ml-1" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function FeatureCard({
  icon: Icon,
  step,
  title,
  description,
  delay,
}: {
  icon: any;
  step: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="relative bg-slate-800/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-700/50 hover:bg-slate-800 transition-colors overflow-hidden group"
    >
      <div className="absolute -top-6 -right-4 text-9xl font-black text-slate-700/20 select-none group-hover:text-indigo-500/10 transition-colors duration-500">
        {step}
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
          <Icon className="size-7" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}