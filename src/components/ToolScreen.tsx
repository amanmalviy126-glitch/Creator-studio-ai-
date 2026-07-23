import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Sparkles,
  Copy,
  RotateCw,
  Share2,
  Bookmark,
  Check,
  Edit3,
  Globe,
  Sliders,
  AlertCircle,
  Clock,
} from "lucide-react";
import { ToolItem, ToneType, LengthType, LanguageType } from "../types";
import { IconRenderer } from "./IconRenderer";

interface ToolScreenProps {
  tool: ToolItem;
  onBack: () => void;
  onSaveHistory: (
    toolTitle: string,
    category: any,
    prompt: string,
    output: string,
    tone: ToneType,
    length: LengthType,
    language: LanguageType
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  userLanguage: LanguageType;
}

const TONES: ToneType[] = [
  "Professional",
  "Funny",
  "Luxury",
  "Emotional",
  "Friendly",
  "Casual",
  "Motivational",
  "Confident",
  "Persuasive",
];

const LENGTHS: LengthType[] = ["Short", "Medium", "Long"];

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

export const ToolScreen: React.FC<ToolScreenProps> = ({
  tool,
  onBack,
  onSaveHistory,
  isFavorite,
  onToggleFavorite,
  userLanguage,
}) => {
  const [prompt, setPrompt] = useState("");
  const [extraInputs, setExtraInputs] = useState<Record<string, string>>({});
  const [selectedTone, setSelectedTone] = useState<ToneType>("Professional");
  const [selectedLength, setSelectedLength] = useState<LengthType>("Medium");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(userLanguage || "English");

  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() && Object.values(extraInputs).every((val) => !String(val || "").trim())) {
      setErrorMsg("Please enter details or prompt to generate content.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setOutput(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          toolTitle: tool.title,
          category: tool.category,
          prompt,
          inputs: extraInputs,
          tone: selectedTone,
          length: selectedLength,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      setOutput(data.result);
      onSaveHistory(
        tool.title,
        tool.category,
        prompt || JSON.stringify(extraInputs),
        data.result,
        selectedTone,
        selectedLength,
        selectedLanguage
      );
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!output) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Creator Studio AI - ${tool.title}`,
          text: output,
        });
      } catch (e) {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleManualSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-[#1A1A1D] border border-white/5 hover:bg-white/10 text-white transition-colors active:scale-95 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7C4DFF]/15 text-[#A78BFA] flex items-center justify-center">
            <IconRenderer name={tool.icon} className="w-4 h-4" />
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">{tool.title}</h1>
        </div>

        <button
          onClick={() => onToggleFavorite(tool.id)}
          className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
            isFavorite
              ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
              : "bg-[#1A1A1D] border-white/5 text-[#A0A0A0] hover:text-white"
          }`}
          aria-label="Favorite"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-400 text-rose-400" : ""}`} />
        </button>
      </div>

      {/* Input Section */}
      <div className="p-4 rounded-3xl bg-[#1A1A1D] border border-white/5 space-y-4 shadow-xl">
        {/* Optional Extra Fields */}
        {tool.extraFields?.map((field) => (
          <div key={field.id} className="space-y-1.5">
            <label className="text-xs font-semibold text-[#A0A0A0] flex items-center gap-1">
              <span>{field.label}</span>
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              value={extraInputs[field.id] || ""}
              onChange={(e) =>
                setExtraInputs((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="w-full p-3 rounded-2xl bg-[#0F0F10] border border-white/10 text-white text-xs placeholder-[#A0A0A0] focus:outline-none focus:border-[#7C4DFF]"
            />
          </div>
        ))}

        {/* Main Prompt Multiline Text Area */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#A0A0A0]">Describe your request</label>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={tool.placeholder}
            className="w-full p-3.5 rounded-2xl bg-[#0F0F10] border border-white/10 text-white text-xs placeholder-[#A0A0A0] focus:outline-none focus:border-[#7C4DFF] resize-none leading-relaxed"
          />
        </div>

        {/* Tone Selector Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#7C4DFF]" />
            Tone
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {TONES.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedTone === tone
                    ? "bg-[#7C4DFF] text-white border-[#7C4DFF] shadow-md shadow-[#7C4DFF]/20"
                    : "bg-[#0F0F10] text-[#A0A0A0] border-white/5 hover:text-white"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Length & Language Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Length */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#7C4DFF]" />
              Length
            </label>
            <div className="flex gap-1 bg-[#0F0F10] p-1 rounded-xl border border-white/5">
              {LENGTHS.map((len) => (
                <button
                  key={len}
                  onClick={() => setSelectedLength(len)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    selectedLength === len
                      ? "bg-[#7C4DFF] text-white shadow-sm"
                      : "text-[#A0A0A0] hover:text-white"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#7C4DFF]" />
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageType)}
              className="w-full p-2.5 rounded-xl bg-[#0F0F10] border border-white/10 text-white text-xs focus:outline-none focus:border-[#7C4DFF]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-[#1A1A1D] text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C4DFF] via-[#8C62FF] to-[#A78BFA] text-white font-extrabold text-sm shadow-xl shadow-[#7C4DFF]/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating with Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-white" />
              <span>Generate Content</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message Display */}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <p className="flex-1">{errorMsg}</p>
        </div>
      )}

      {/* Output Section */}
      {output && (
        <div className="p-4 rounded-3xl bg-[#1A1A1D] border border-[#7C4DFF]/30 space-y-4 shadow-2xl animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Generated Output
            </span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-[#A0A0A0] hover:text-white flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "View Text" : "Edit Inline"}</span>
            </button>
          </div>

          {/* Text Container */}
          {isEditing ? (
            <textarea
              rows={8}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#0F0F10] border border-[#7C4DFF]/40 text-white text-xs focus:outline-none resize-none leading-relaxed"
            />
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#0F0F10] border border-white/5 text-xs text-white leading-relaxed font-normal whitespace-pre-wrap select-text max-h-96 overflow-y-auto">
              {output}
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#A78BFA]" />}
              <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handleGenerate}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              <RotateCw className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-[10px]">Retry</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              <Share2 className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-[10px]">Share</span>
            </button>

            <button
              onClick={handleManualSave}
              className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex flex-col items-center gap-1 transition-colors active:scale-95"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-[#A78BFA]" />}
              <span className="text-[10px]">{savedSuccess ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
