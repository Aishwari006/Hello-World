// src/app/pages/SandboxDigitalId/components/Quiz.tsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizScenarios } from "../data/quizData";
import QuizQuestion from "./QuizQuestion";

type Phase = "intro" | "quiz" | "results";

const getBgClass = (score: number, total: number) => {
  if (score === total)
    return "from-green-700 via-green-600 to-emerald-500";
  if (score >= total / 2)
    return "from-blue-700 via-blue-600 to-indigo-500";
  return "from-gray-900 via-gray-800 to-gray-700";
};

const getResultMessage = (score: number, total: number) => {
  if (score === total)
    return {
      emoji: "🏆",
      headline: "You're a Scam Detective!",
      sub: "You got every question right. You're well-equipped to spot online scams and stay safe.",
    };
  if (score >= total / 2)
    return {
      emoji: "💪",
      headline: "You're getting better at spotting scams!",
      sub: "Good effort! Review the explanations and you'll be even safer next time.",
    };
  return {
    emoji: "🌱",
    headline: "Every expert starts somewhere.",
    sub: "Don't worry — learning about scams takes time. You're already on the right path!",
  };
};

const Quiz: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerResults, setAnswerResults] = useState<boolean[]>([]);

  const total = quizScenarios.length;
  const currentScenario = quizScenarios[currentIndex];
  const isLast = currentIndex === total - 1;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);
    setAnswerResults((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (isLast) {
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentIndex(0);
    setScore(0);
    setAnswerResults([]);
  };

  const result = getResultMessage(score, total);

  return (
    <AnimatePresence mode="wait">
      {/* ───────────── INTRO SCREEN ───────────── */}
      {phase === "intro" && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-6 py-10"
        >
          <div className="w-full max-w-lg text-center flex flex-col items-center gap-8">
            {/* Shield Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="text-8xl"
            >
              🛡️
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
                Scam Safety Training
              </h1>
              <p className="text-white/70 text-xl leading-relaxed">
                A friendly, step-by-step journey to help you recognise online scams — before they can harm you.
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full grid grid-cols-3 gap-3"
            >
              {[
                { icon: "📋", label: `${total} Scenarios` },
                { icon: "🤝", label: "No Pressure" },
                { icon: "💡", label: "Clear Explanations" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">{icon}</span>
                  <span className="text-white text-sm font-medium text-center leading-snug">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("quiz")}
              className="
                w-full py-5 rounded-2xl text-2xl font-bold text-white
                bg-gradient-to-r from-blue-500 to-indigo-500
                shadow-xl shadow-blue-500/30
                focus:outline-none focus:ring-4 focus:ring-blue-400/50
              "
              style={{ minHeight: 70 }}
            >
              Start Training 🚀
            </motion.button>

            <p className="text-white/40 text-base">Take your time — there's no rush.</p>
          </div>
        </motion.div>
      )}

      {/* ───────────── QUIZ SCREEN ───────────── */}
      {phase === "quiz" && (
        <motion.div
          key={`quiz-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col"
        >
          {/* Header */}
          <header className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/60 border-b border-white/10">
            <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-white font-bold text-lg">Scam Safety</span>
              </div>
              <div className="bg-white/10 rounded-full px-4 py-1.5">
                <span className="text-white/70 text-base font-medium">
                  Score: <span className="text-white font-bold">{score}</span>
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-5 py-6 overflow-y-auto">
            <div className="max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                <QuizQuestion
                  key={currentIndex}
                  scenario={currentScenario}
                  questionNumber={currentIndex + 1}
                  totalQuestions={total}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isLast={isLast}
                />
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      )}

      {/* ───────────── RESULTS SCREEN ───────────── */}
      {phase === "results" && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen bg-gradient-to-br ${getBgClass(score, total)} flex flex-col items-center justify-center px-6 py-10`}
        >
          <div className="w-full max-w-lg flex flex-col items-center gap-7">
            {/* Big Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="text-9xl"
            >
              {result.emoji}
            </motion.div>

            {/* Score Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 18 }}
              className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="text-5xl font-extrabold text-white">{score}/{total}</span>
              <span className="text-white/70 text-base font-medium mt-1">correct</span>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-center"
            >
              <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
                {result.headline}
              </h2>
              <p className="text-white/80 text-xl leading-relaxed">{result.sub}</p>
            </motion.div>

            {/* Per-question results */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/15"
            >
              <p className="text-white/60 text-base font-medium mb-4 text-center uppercase tracking-widest">
                Your Answers
              </p>
              <div className="flex flex-col gap-3">
                {quizScenarios.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="text-2xl">
                      {answerResults[i] ? "✅" : "❌"}
                    </span>
                    <p className="text-white/80 text-base leading-snug flex-1">
                      Scenario {s.id}
                    </p>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        answerResults[i]
                          ? "bg-green-500/30 text-green-300"
                          : "bg-red-500/30 text-red-300"
                      }`}
                    >
                      {answerResults[i] ? "Correct" : "Missed"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Retry Button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRestart}
              className="
                w-full py-5 rounded-2xl text-xl font-bold text-white
                bg-white/20 border-2 border-white/30 backdrop-blur-sm
                hover:bg-white/30 transition-all duration-200
                focus:outline-none focus:ring-4 focus:ring-white/30
              "
              style={{ minHeight: 64 }}
            >
              🔁 Try Again
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Quiz;
