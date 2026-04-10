import { Link } from "react-router";
import { motion } from "motion/react";
import { Shield, Sparkles, ChevronRight } from "lucide-react";

export function Main() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* PREMIUM AURORA & GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-fuchsia-400/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-amber-400/20 blur-[120px]" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto pt-20">
        
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <Shield className="size-32 text-blue-600" strokeWidth={1.5} />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="size-32 text-purple-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent pb-4 leading-normal"
        >
          SafetyNet
        </motion.h1>

        {/* Subtitles */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl text-slate-700 mb-6 font-medium tracking-tight max-w-3xl mx-auto"
        >
          Master digital skills. Spot threats. Stay safe.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          A stress-free, zero-risk sandbox designed to help you confidently navigate the digital world, identify scams, and protect your identity.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/home">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl text-lg font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all flex items-center gap-3 overflow-hidden mx-auto"
            >
              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}