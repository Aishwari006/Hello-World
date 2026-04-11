import { useNavigate } from "react-router";
import { ShieldCheck, Lock } from "lucide-react";
import { motion } from "motion/react";

export const BeforeLoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.3 }}>
            <ShieldCheck className="size-20 text-blue-600" />
          </motion.div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          🛡️ Scam Guardian
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Protect yourself and others from digital scams. 
          Report incidents, learn detection, and stay safe in the digital world.
        </p>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-8 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200"
        >
          <Lock className="size-5" />
          Login to Continue
        </motion.button>
      </motion.div>
    </div>
  );
};