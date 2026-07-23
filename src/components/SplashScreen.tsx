import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F10] text-white p-6 select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Logo Container */}
        <motion.div
          className="relative w-24 h-24 mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-tr from-[#7C4DFF] via-[#9162FF] to-[#A78BFA] shadow-[0_10px_30px_rgba(124,77,255,0.4)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 180 }}
        >
          <Sparkles className="w-12 h-12 text-white animate-pulse" />
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#7C4DFF] to-[#A78BFA] opacity-30 blur-lg -z-10" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-black tracking-tight text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Creator Studio <span className="bg-gradient-to-r from-[#A78BFA] to-[#7C4DFF] bg-clip-text text-transparent">AI</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-sm font-medium text-[#A0A0A0] tracking-wide mb-8"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Create Smarter. Write Better.
        </motion.p>

        {/* Progress Loading Bar */}
        <motion.div
          className="w-48 h-1.5 bg-[#1A1A1D] rounded-full overflow-hidden p-0.5 border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#A78BFA] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
        </motion.div>
      </div>

      <div className="absolute bottom-6 text-xs text-[#666668] tracking-widest uppercase font-semibold">
        Powered by Gemini AI
      </div>
    </motion.div>
  );
};
