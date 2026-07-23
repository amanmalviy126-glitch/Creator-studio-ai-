import React from "react";
import { X, Crown, CheckCircle2, Zap, Sparkles, ShieldCheck } from "lucide-react";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro: boolean;
  onUpgradePro: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  isPro,
  onUpgradePro,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-[#1A1A1D] border border-amber-500/30 rounded-3xl p-6 space-y-6 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#7C4DFF]/20 rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#A0A0A0] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 flex items-center justify-center text-black font-black shadow-xl shadow-amber-500/20">
            <Crown className="w-9 h-9 fill-black" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Creator Studio <span className="text-amber-400">PRO</span>
          </h2>
          <p className="text-xs text-[#A0A0A0]">
            Unleash the full power of Gemini AI content creation.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5">
          {[
            "Unlimited AI Generations (No Daily Limits)",
            "100% Ad-Free Premium Experience",
            "Priority Fast-Track Gemini AI Model Speed",
            "77+ Full Specialized Creator Tools Unlocked",
            "PDF, Markdown & Rich Text Exporting",
            "Studio Lab Early Access (Image & Voice Generators)",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Plan Pricing Simulation */}
        {!isPro ? (
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
                  PRO YEARLY (SAVE 60%)
                </span>
                <p className="text-[10px] text-amber-200/70">7-Day Free Trial • Cancel Anytime</p>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-white">$2.99</span>
                <span className="text-[10px] text-[#A0A0A0]">/mo</span>
              </div>
            </div>

            <button
              onClick={() => {
                onUpgradePro();
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black text-sm shadow-xl shadow-amber-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-black" />
              <span>Start 7-Day Free Trial</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <p className="text-xs font-bold text-emerald-400">You are a Creator Studio PRO Member!</p>
            <p className="text-[10px] text-[#A0A0A0]">Enjoy unlimited AI generations and priority access.</p>
          </div>
        )}

        <div className="text-center text-[10px] text-[#666668] flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secured Google Play Billing • Instant Activation</span>
        </div>
      </div>
    </div>
  );
};
