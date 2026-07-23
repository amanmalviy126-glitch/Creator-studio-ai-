import React, { useState } from "react";
import {
  Globe,
  Moon,
  ShieldCheck,
  FileText,
  Info,
  Star,
  Share2,
  RotateCcw,
  Trash2,
  Crown,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Heart,
} from "lucide-react";
import { LanguageType } from "../types";

interface SettingsScreenProps {
  isPro: boolean;
  onOpenProModal: () => void;
  language: LanguageType;
  onChangeLanguage: (lang: LanguageType) => void;
  onClearHistory: () => void;
  onOpenStudioLab: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isPro,
  onOpenProModal,
  language,
  onChangeLanguage,
  onClearHistory,
  onOpenStudioLab,
}) => {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "about" | "rate" | null>(
    null
  );
  const [rateStars, setRateStars] = useState(5);
  const [rated, setRated] = useState(false);

  const LANGUAGES: LanguageType[] = [
    "English",
    "Hindi",
    "Hinglish",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Portuguese",
  ];

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: "Creator Studio AI",
        text: "Check out Creator Studio AI — The ultimate AI content creation platform!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("App link copied to clipboard!");
    }
  };

  return (
    <div className="p-4 pb-28 max-w-md mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Settings Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">Settings & Account</h1>
        <p className="text-xs text-[#A0A0A0]">Preferences, membership & legal information</p>
      </div>

      {/* Pro Plan Banner */}
      <div
        onClick={onOpenProModal}
        className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-600/20 to-amber-500/20 border border-amber-500/40 hover:border-amber-400 transition-all shadow-xl flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-black shadow-lg">
            <Crown className="w-6 h-6 fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">
                {isPro ? "Creator Studio Pro Active" : "Upgrade to Pro"}
              </h3>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-md bg-amber-400 text-black">
                {isPro ? "VIP" : "Unlock All"}
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              {isPro
                ? "Unlimited AI generations, priority speed & PDF exports"
                : "Get unlimited generations, ad-free & high speed"}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Preferences Section */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider px-1">
          Preferences
        </h2>

        <div className="rounded-3xl bg-[#1A1A1D] border border-white/5 divide-y divide-white/5 overflow-hidden">
          {/* Dark Mode */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-[#A78BFA] flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">App Theme</p>
                <p className="text-[10px] text-[#A0A0A0]">Material Dark (#0F0F10)</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7C4DFF] px-2.5 py-1 rounded-lg bg-[#7C4DFF]/10">
              Active
            </span>
          </div>

          {/* Default Language */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-[#A78BFA] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Default Generation Language</p>
                <p className="text-[10px] text-[#A0A0A0]">Preferred AI response language</p>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageType)}
              className="p-1.5 rounded-xl bg-[#0F0F10] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-[#7C4DFF]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-[#1A1A1D] text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* App Features & Studio Lab */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider px-1">
          Features & Lab
        </h2>

        <div className="rounded-3xl bg-[#1A1A1D] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <button
            onClick={onOpenStudioLab}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-[#A78BFA] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Studio Lab (Future Tools)</p>
                <p className="text-[10px] text-[#A0A0A0]">AI Image, Logo, Voice & Presentation</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => setActiveModal("rate")}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Rate Creator Studio AI</p>
                <p className="text-[10px] text-[#A0A0A0]">Love the app? Rate us 5 stars!</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>

          <button
            onClick={handleShareApp}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Share App with Friends</p>
                <p className="text-[10px] text-[#A0A0A0]">Spread the word to fellow creators</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>
        </div>
      </div>

      {/* Storage & Data Section */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider px-1">
          Data & Management
        </h2>

        <div className="rounded-3xl bg-[#1A1A1D] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <button
            onClick={onOpenProModal}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Restore Purchases</p>
                <p className="text-[10px] text-[#A0A0A0]">Sync Pro status across devices</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear history and local cache?")) {
                onClearHistory();
                alert("Cache & history cleared successfully!");
              }
            }}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-400">Delete History & Clear Cache</p>
                <p className="text-[10px] text-rose-300/70">Wipe locally saved generations</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>

      {/* Legal & About */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider px-1">
          About & Legal
        </h2>

        <div className="rounded-3xl bg-[#1A1A1D] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <button
            onClick={() => setActiveModal("privacy")}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 text-[#A0A0A0] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white">Privacy Policy</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => setActiveModal("terms")}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 text-[#A0A0A0] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white">Terms of Service</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>

          <button
            onClick={() => setActiveModal("about")}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 text-[#A0A0A0] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">About Creator Studio AI</p>
                <p className="text-[10px] text-[#A0A0A0]">Version 1.0.0 (Build 2026)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </button>
        </div>
      </div>

      {/* App Version Stamp */}
      <div className="text-center py-4 space-y-1">
        <p className="text-xs font-bold text-[#A0A0A0]">Creator Studio AI v1.0.0 Pro</p>
        <p className="text-[10px] text-[#666668]">Crafted for Creators worldwide • Google Play Store Ready</p>
      </div>

      {/* Modals */}
      {activeModal === "privacy" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1A1A1D] border border-white/10 rounded-3xl p-5 max-w-md w-full space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#7C4DFF]" /> Privacy Policy
            </h3>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              Creator Studio AI values your privacy. Your inputs and generated text are processed securely using Google Gemini API. We do not sell your personal data or store sensitive text on external public servers.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-2xl bg-[#7C4DFF] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {activeModal === "terms" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1A1A1D] border border-white/10 rounded-3xl p-5 max-w-md w-full space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7C4DFF]" /> Terms of Service
            </h3>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              By using Creator Studio AI, you agree that generated content is for creative and educational purposes. You maintain rights over your generated outputs while adhering to Google AI usage policies.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-2xl bg-[#7C4DFF] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {activeModal === "about" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1A1A1D] border border-white/10 rounded-3xl p-5 max-w-md w-full space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-[#7C4DFF] to-[#A78BFA] flex items-center justify-center text-white shadow-xl">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-white">Creator Studio AI</h3>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              An all-in-one content creation suite helping creators, marketers, students, and professionals generate world-class social posts, scripts, emails, and business documents in seconds.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-2xl bg-[#7C4DFF] text-white text-xs font-bold"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {activeModal === "rate" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1A1A1D] border border-white/10 rounded-3xl p-5 max-w-md w-full space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <h3 className="text-base font-extrabold text-white">Rate Creator Studio AI</h3>
            <p className="text-xs text-[#A0A0A0]">
              {rated ? "Thank you for your 5-star rating!" : "Enjoying the app? Rate us on Google Play Store!"}
            </p>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setRateStars(star);
                    setRated(true);
                  }}
                  className="p-1 text-amber-400 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rateStars ? "fill-amber-400" : "text-[#A0A0A0]"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-2xl bg-[#7C4DFF] text-white text-xs font-bold"
            >
              {rated ? "Done" : "Submit Rating"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
