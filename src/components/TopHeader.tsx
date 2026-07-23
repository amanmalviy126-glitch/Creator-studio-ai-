import React from "react";
import { Sparkles, Crown, Search, Zap } from "lucide-react";

interface TopHeaderProps {
  usageCount: number;
  maxUsage: number;
  isPro: boolean;
  onOpenProModal: () => void;
  onOpenSearch: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  usageCount,
  maxUsage,
  isPro,
  onOpenProModal,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F0F10]/90 backdrop-blur-md border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#7C4DFF] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-[#7C4DFF]/25">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-white">
              Creator Studio
            </span>
            <span className="text-xs font-black px-1.5 py-0.5 rounded-md bg-[#7C4DFF]/20 text-[#A78BFA] border border-[#7C4DFF]/30">
              AI
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-xl bg-[#1A1A1D] hover:bg-white/10 text-[#A0A0A0] hover:text-white transition-colors border border-white/5 active:scale-95"
          title="Search tools"
          aria-label="Search tools"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Daily credit indicator / Pro badge */}
        {isPro ? (
          <button
            onClick={onOpenProModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs shadow-sm hover:brightness-110 transition-all active:scale-95"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>PRO</span>
          </button>
        ) : (
          <button
            onClick={onOpenProModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#1A1A1D] border border-white/10 hover:border-[#7C4DFF]/50 text-xs font-medium text-white transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-[#7C4DFF]" />
            <span className="text-[#A0A0A0]">
              <strong className="text-white">{maxUsage - usageCount}</strong>/{maxUsage} Left
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
