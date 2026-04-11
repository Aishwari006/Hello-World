import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MessageScreenProps {
  title: string;
  imageSrc: string;
  textPoints: string[];
  finalLabel: string;
  finalType: 'scam' | 'legit';
  nextRoute?: string;
  prevRoute?: string;
  hint?: string;
}

export function MessageScreen({
  title,
  imageSrc,
  textPoints,
  finalLabel,
  finalType,
  nextRoute,
  prevRoute,
  hint
}: MessageScreenProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'initial' | 'image' | 'black' | 'blue' | 'final'>('initial');
  const [visiblePoints, setVisiblePoints] = useState<number>(0);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('image'), 300);
    const timer2 = setTimeout(() => setStage('black'), 1200);
    const timer3 = setTimeout(() => setStage('blue'), 3200);

    const pointTimers = textPoints.map((_, index) =>
      setTimeout(() => setVisiblePoints(index + 1), 3700 + (index * 800))
    );

    const finalTimer = setTimeout(() => {
      setStage('final');
    }, 3700 + (textPoints.length * 800) + 800);

    const labelTimer = setTimeout(() => {
      setShowFinalText(true);
    }, 3700 + (textPoints.length * 800) + 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      pointTimers.forEach(t => clearTimeout(t));
      clearTimeout(finalTimer);
      clearTimeout(labelTimer);
    };
  }, [textPoints.length]);

  const getBackgroundStyle = () => {
    switch (stage) {
      case 'black':
        return 'bg-black';
      case 'blue':
        return 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400';
      case 'final':
        return finalType === 'scam'
          ? 'bg-gradient-to-br from-red-500 via-red-400 to-pink-400'
          : 'bg-gradient-to-br from-green-600 via-green-500 to-emerald-400';
      default:
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
    }
  };

  return (
    // h-screen + overflow-hidden ensures no scrolling; relative enables absolute positioning of the arrow
    <div className={`h-screen overflow-hidden flex flex-col transition-all duration-1000 ${getBackgroundStyle()} relative`}>

      {/* Title Bar */}
      <div className="px-5 py-3 bg-black/20 backdrop-blur-md border-b border-white/10 flex justify-between items-center shrink-0">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <button
          onClick={() => navigate("/red-flag-detector/module2/quiz")}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-sm font-medium transition"
        >
          Skip to Quiz →
        </button>
      </div>

      {/* Main Content — flex-1 fills remaining height; overflow-hidden clips any overflow */}
      <div className="flex-1 overflow-hidden flex items-center justify-center px-4 py-4">
        <div className="max-w-xl w-full space-y-3">

          {/* Message Image */}
          <AnimatePresence>
            {stage !== 'initial' && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/20">
                  <img
                    src={imageSrc}
                    alt="Message Screenshot"
                    className="w-full rounded-xl shadow-lg max-h-48 object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Points */}
          <div className="space-y-2">
            {Array.from({ length: visiblePoints }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl border border-white/30"
              >
                <p className="text-base font-medium text-gray-800">
                  {textPoints[index]}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final Label */}
          <AnimatePresence>
            {showFinalText && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-center pt-1"
              >
                <div className="inline-block bg-white/95 backdrop-blur-md rounded-2xl px-8 py-4 shadow-2xl border-4 border-white/40">
                  <h2 className={`text-2xl md:text-3xl font-bold ${finalType === 'scam' ? 'text-red-600' : 'text-green-600'}`}>
                    {finalType === 'scam' ? '⚠️' : '✓'} {finalLabel}
                  </h2>
                </div>
                {hint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 text-sm text-white/80 italic"
                  >
                    {hint}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* NEXT Arrow — right-center, navy blue, large, stable (no bounce) */}
      {nextRoute && (
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(30,58,138,0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(nextRoute)}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-navy-700 text-white rounded-full p-5 shadow-2xl border-2 border-blue-900/40 transition-all"
          style={{ backgroundColor: '#1e3a8a' }}
        >
          <ArrowRight className="w-8 h-8" strokeWidth={2.5} />
        </motion.button>
      )}

      {/* Bottom Nav — Prev button only */}
      <div className="px-5 py-3 shrink-0 flex justify-between items-center">
        {prevRoute ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(prevRoute)}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 shadow-xl border border-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}