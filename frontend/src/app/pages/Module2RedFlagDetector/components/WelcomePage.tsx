import { motion } from 'motion/react';
import { MessageSquare, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Messages App Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl px-6 py-4 flex items-center gap-3 border-b border-white/10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2
          }}
        >
          <div className="bg-green-500 rounded-full p-2">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
        </motion.div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Main Question Text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 0.6,
            duration: 0.8,
            ease: "easeOut"
          }}
          className="text-center mb-16 max-w-3xl"
        >
          <p className="text-3xl md:text-4xl font-bold italic text-white leading-relaxed drop-shadow-2xl">
            Let's dive in to classify a message as <span className="text-green-400">Legit</span> or <span className="text-red-400">Scam</span>
          </p>
        </motion.div>

        {/* Legit and Scam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-16">
          {/* Legit Card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 1.2,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border-2 border-green-400/30 relative overflow-hidden hover:scale-105 transition-transform duration-300">
              {/* Animated Glow */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-green-400/20 rounded-3xl blur-xl"
              />
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <CheckCircle className="w-20 h-20 text-green-400" strokeWidth={2.5} />
                <h2 className="text-4xl font-bold text-green-300">Legit</h2>
              </div>
            </div>
          </motion.div>

          {/* Scam Card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 1.6,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border-2 border-red-400/30 relative overflow-hidden hover:scale-105 transition-transform duration-300">
              {/* Animated Glow */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 bg-red-400/20 rounded-3xl blur-xl"
              />
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <XCircle className="w-20 h-20 text-red-400" strokeWidth={2.5} />
                <h2 className="text-4xl font-bold text-red-300">Scam</h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Arrow Button to Continue */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 2.2,
            type: "spring",
            stiffness: 150
          }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/red-flag-detector/module2/screen1')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full p-6 shadow-2xl transition-all group border-2 border-blue-400/50"
          >
            <ArrowRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="mt-4 text-white/70 text-base font-medium"
          >
            Click to begin your journey
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}