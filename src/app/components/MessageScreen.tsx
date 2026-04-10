import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    // Animation sequence
    const timer1 = setTimeout(() => setStage('image'), 300);
    const timer2 = setTimeout(() => setStage('black'), 1200);
    const timer3 = setTimeout(() => setStage('blue'), 3200);
    
    // Show text points one by one
    const pointTimers = textPoints.map((_, index) => 
      setTimeout(() => setVisiblePoints(index + 1), 3700 + (index * 800))
    );
    
    // Change to final color and show label
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
    <div className={`min-h-screen flex flex-col transition-all duration-1000 ${getBackgroundStyle()}`}>
      {/* Title Bar */}
      <div className="px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold text-white text-center">{title}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          {/* Message Image */}
          <AnimatePresence>
            {stage !== 'initial' && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20
                }}
                className="mb-8"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20">
                  <img 
                    src={imageSrc} 
                    alt="Message Screenshot" 
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Points */}
          <div className="space-y-4 mb-8">
            {Array.from({ length: visiblePoints }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15
                }}
                className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/30"
              >
                <p className="text-lg font-medium text-gray-800">
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
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15
                }}
                className="text-center"
              >
                <div className="inline-block bg-white/95 backdrop-blur-md rounded-3xl px-10 py-6 shadow-2xl border-4 border-white/40">
                  <h2 className={`text-3xl md:text-4xl font-bold ${
                    finalType === 'scam' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {finalType === 'scam' ? '⚠️' : '✓'} {finalLabel}
                  </h2>
                </div>
                {hint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm text-white/80 italic"
                  >
                    {hint}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-6 flex justify-between items-center">
        {prevRoute ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(prevRoute)}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-4 shadow-xl border border-white/30 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
        ) : (
          <div />
        )}

        {nextRoute && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(nextRoute)}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-4 shadow-xl border border-white/30 transition-all"
          >
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
