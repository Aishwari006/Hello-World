// src/app/pages/SandboxDigitalId/components/QuizQuestion.tsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizScenario } from "../data/quizData";
import QuizFeedback from "./QuizFeedback";

interface QuizQuestionProps {
  scenario: QuizScenario;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  scenario,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  isLast,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    onAnswer(scenario.options[index].isCorrect);
  };

  const getButtonStyle = (index: number) => {
    if (!answered) {
      return "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-white";
    }
    if (scenario.options[index].isCorrect) {
      return "bg-green-500/80 border-green-400 text-white shadow-green-500/30 shadow-lg";
    }
    if (index === selectedIndex && !scenario.options[index].isCorrect) {
      return "bg-red-500/80 border-red-400 text-white shadow-red-500/30 shadow-lg";
    }
    return "bg-white/5 border-white/10 text-white/40";
  };

  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full max-w-lg mx-auto flex flex-col gap-5"
    >
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60 text-base font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-white/60 text-base font-medium">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Scenario Image */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.1 }}
        className="
          w-full rounded-3xl overflow-hidden
          border border-white/20 shadow-2xl shadow-black/40
          bg-white/5 backdrop-blur-sm
        "
        style={{ minHeight: 200 }}
      >
        <img
          src={scenario.image}
          alt={`Scenario ${scenario.id}`}
          className="w-full object-cover max-h-64"
          onError={(e) => {
            // Fallback placeholder if image not found
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback image placeholder */}
        <div className="hidden w-full h-48 items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
          <span className="text-6xl">📱</span>
        </div>
      </motion.div>

      {/* Question Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/15"
      >
        <p className="text-white text-xl font-semibold leading-relaxed">
          {scenario.question}
        </p>
      </motion.div>

      {/* Answer Options */}
      <div className="flex flex-col gap-3">
        {scenario.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={answered}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 + index * 0.08 }}
            whileHover={!answered ? { scale: 1.02 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            className={`
              w-full text-left px-6 py-4 rounded-2xl border-2
              text-lg font-medium transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-blue-400/40
              cursor-pointer disabled:cursor-default
              ${getButtonStyle(index)}
            `}
            style={{ minHeight: 64 }}
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">
                {answered
                  ? scenario.options[index].isCorrect
                    ? "✅"
                    : index === selectedIndex
                    ? "❌"
                    : "○"
                  : "○"}
              </span>
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <QuizFeedback
            isCorrect={
              selectedIndex !== null
                ? scenario.options[selectedIndex].isCorrect
                : false
            }
            explanation={scenario.explanation}
            onNext={onNext}
            isLast={isLast}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizQuestion;
