import React from "react";
import {
  X,
  Wand2,
  Image,
  Mic,
  Presentation,
  FileSearch,
  Globe,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

interface StudioLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPro: () => void;
}

export const StudioLabModal: React.FC<StudioLabModalProps> = ({
  isOpen,
  onClose,
  onOpenPro,
}) => {
  if (!isOpen) return null;

  const labTools = [
    {
      title: "AI Image Generator",
      desc: "Transform text prompts into stunning 4K images & graphics.",
      icon: Image,
      badge: "Beta",
    },
    {
      title: "AI Logo Maker",
      desc: "Generate vector minimalist logos for brands & channels.",
      icon: Sparkles,
      badge: "Coming Soon",
    },
    {
      title: "AI Voice & Speech Generator",
      desc: "Realistic multi-speaker studio voiceovers with emotions.",
      icon: Mic,
      badge: "Beta",
    },
    {
      title: "AI Presentation Generator",
      desc: "Instant pitch decks and PowerPoint slides outlines.",
      icon: Presentation,
      badge: "Coming Soon",
    },
    {
      title: "AI PDF Chat & OCR",
      desc: "Upload PDFs, documents & images to summarize and chat.",
      icon: FileSearch,
      badge: "Coming Soon",
    },
    {
      title: "AI Website Builder",
      desc: "Generate complete landing page layouts & HTML code.",
      icon: Globe,
      badge: "In Dev",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-[#1A1A1D] border border-[#7C4DFF]/30 rounded-3xl p-6 space-y-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#7C4DFF] text-white flex items-center justify-center shadow-lg shadow-[#7C4DFF]/30">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Studio Lab</h2>
              <p className="text-[10px] text-[#A0A0A0]">Next-Gen Multimodal AI Suite</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#A0A0A0] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <p className="text-xs text-[#A0A0A0] leading-relaxed">
          Preview our upcoming multimodal tools currently being powered by Gemini 3 series models. Pro members receive instant early access as features rollout!
        </p>

        {/* Lab Tools Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {labTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0F0F10] border border-white/5 hover:border-[#7C4DFF]/30 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7C4DFF]/15 text-[#A78BFA] flex items-center justify-center shrink-0 group-hover:bg-[#7C4DFF] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{tool.title}</h4>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-purple-500/20 text-[#A78BFA]">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A0A0A0] mt-0.5 line-clamp-1">{tool.desc}</p>
                  </div>
                </div>

                <Lock className="w-4 h-4 text-[#666668] shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Pro Early Access CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenPro();
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#A78BFA] text-white font-extrabold text-xs shadow-xl shadow-[#7C4DFF]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>Get Early Lab Access with PRO</span>
        </button>
      </div>
    </div>
  );
};
