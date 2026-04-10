// src/app/pages/SandboxDigitalId/components/QuizFeedback.tsx

import React from "react";
import { motion } from "framer-motion";

interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

const QuizFeedback: React.FC<QuizFeedbackProps> = ({
  isCorrect,
  explanation,
  onNext,
  isLast,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full mt-6"
    >
      {/* Feedback Card */}
      <div
        className={`
          rounded-3xl p-6 border-2 shadow-2xl
          ${
            isCorrect
              ? "bg-green-900/60 border-green-400/60 backdrop-blur-md"
              : "bg-white/10 border-white/20 backdrop-blur-md"
          }
        `}
      >
        {/* Icon + Headline */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 16, delay: 0.1 }}
            className="text-5xl"
          >
            {isCorrect ? "🎉" : "😊"}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white leading-tight"
          >
            {isCorrect
              ? "Great job! You stayed safe!"
              : "Not quite — let's understand together"}
          </motion.p>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 rounded-2xl p-4 mb-5"
        >
          <p className="text-white/90 text-lg leading-relaxed">
            💡 {explanation}
          </p>
        </motion.div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="
            w-full py-5 rounded-2xl text-xl font-bold text-white
            bg-gradient-to-r from-blue-500 to-indigo-500
            shadow-lg shadow-blue-500/30
            hover:from-blue-400 hover:to-indigo-400
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-400/50
          "
          style={{ minHeight: 64 }}
        >
          {isLast ? "See My Results 🏁" : "Next Question →"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizFeedback;
