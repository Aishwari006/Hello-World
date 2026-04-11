import { Link } from "react-router";
import { motion } from "motion/react";
import { AlertTriangle, Mail, ChevronRight } from "lucide-react";
 import { useUnlockOnMount } from "../components/ui/Usebadges";

export default function Modules() {
  useUnlockOnMount("/red-flag-detector");
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-16">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          🧠 Learn to Spot Scams
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Choose a module and start learning in a safe, guided environment.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <ModuleCard
          to="/red-flag-detector/module1"
          icon={Mail}
          title="Learn About Phishing Emails"
          description="Understand fake emails, spoofed domains, and scam tricks."
          color="blue"
          
        />

        {/* Card 2 */}
        <ModuleCard
          to="/red-flag-detector/module2"
          icon={AlertTriangle}
          title="Identify Message Scams"
          description="Learn how to detect suspicious SMS, WhatsApp, and fake alerts."
          color="red"
        />

      </div>
    </div>
  );
}

function ModuleCard({
  to,
  icon: Icon,
  title,
  description,
  color
}: {
  to: string;
  icon: any;
  title: string;
  description: string;
  color: "red" | "blue";
}) {
  const theme = {
    red: {
      bg: "bg-rose-50",
      border: "border-rose-100",
      icon: "text-rose-600",
      hover: "group-hover:text-rose-600"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: "text-blue-600",
      hover: "group-hover:text-blue-600"
    }
  }[color];

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white rounded-3xl p-8 shadow-md border hover:shadow-xl transition-all"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition" />

        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${theme.bg} ${theme.border} border`}>
            <Icon className={`size-7 ${theme.icon}`} />
          </div>

          {/* Title */}
          <h2 className={`text-2xl font-bold mb-3 text-slate-900 ${theme.hover}`}>
            {title}
          </h2>

          {/* Description */}
          <p className="text-slate-500 mb-6 leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center text-indigo-600 font-semibold">
            Start Learning
            <ChevronRight className="size-5 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}