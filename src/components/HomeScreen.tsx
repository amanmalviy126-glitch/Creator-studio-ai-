import React, { useState } from "react";
import { Search, Sparkles, TrendingUp, Flame, ChevronRight, Wand2 } from "lucide-react";
import { ToolItem, CategoryType } from "../types";
import { IconRenderer } from "./IconRenderer";

interface HomeScreenProps {
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
  onOpenSearch: () => void;
  onOpenStudioLab: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tools,
  onSelectTool,
  onOpenSearch,
  onOpenStudioLab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const popularTools = tools.filter((t) => t.popular);

  const categoriesList: { name: string; type: CategoryType | "All"; icon: string; count: number }[] = [
    { name: "All Tools", type: "All", icon: "Grid", count: tools.length },
    { name: "Writing", type: "Writing", icon: "PenTool", count: tools.filter((t) => t.category === "Writing").length },
    { name: "Social Media", type: "Social Media", icon: "Instagram", count: tools.filter((t) => t.category === "Social Media").length },
    { name: "YouTube", type: "YouTube", icon: "Youtube", count: tools.filter((t) => t.category === "YouTube").length },
    { name: "Business", type: "Business", icon: "Briefcase", count: tools.filter((t) => t.category === "Business").length },
    { name: "Fun", type: "Fun", icon: "Smile", count: tools.filter((t) => t.category === "Fun").length },
  ];

  const displayedTools = tools.filter((t) => {
    if (selectedCategory === "All") return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="p-4 pb-24 space-y-6 max-w-md mx-auto">
      {/* Top Greeting */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Creator Studio <span className="bg-gradient-to-r from-[#A78BFA] to-[#7C4DFF] bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="text-sm font-medium text-[#A0A0A0]">
              What would you like to create today?
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#1A1A1D] border border-white/10 flex items-center justify-center text-[#7C4DFF] shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Search Bar Trigger */}
      <button
        onClick={onOpenSearch}
        className="w-full p-3.5 rounded-2xl bg-[#1A1A1D] border border-white/10 flex items-center gap-3 text-[#A0A0A0] hover:text-white hover:border-[#7C4DFF]/40 transition-all shadow-md group"
      >
        <Search className="w-5 h-5 text-[#7C4DFF] group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-[#A0A0A0]">Search 77+ AI creation tools...</span>
      </button>

      {/* Popular Tools Horizontal Scroll */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Popular Tools</h2>
          </div>
          <span className="text-xs text-[#A0A0A0] font-medium">Top Picks</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {popularTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="shrink-0 w-36 p-3.5 rounded-2xl bg-gradient-to-b from-[#1A1A1D] to-[#141416] border border-white/5 hover:border-[#7C4DFF]/50 transition-all flex flex-col justify-between text-left group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-[#7C4DFF]/15 text-[#A78BFA] flex items-center justify-center mb-3 group-hover:bg-[#7C4DFF] group-hover:text-white transition-colors">
                <IconRenderer name={tool.icon} className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#A78BFA] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[10px] text-[#A0A0A0] line-clamp-1 mt-0.5">{tool.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Categories</h2>
          <span className="text-xs text-[#A78BFA] font-medium">
            {displayedTools.length} Tools
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.type;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.type)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[#7C4DFF] text-white border-[#7C4DFF] shadow-lg shadow-[#7C4DFF]/25 scale-105"
                    : "bg-[#1A1A1D] text-[#A0A0A0] border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                <IconRenderer name={cat.icon} className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white/5 text-[#A0A0A0]"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Catalog Grid */}
      <div className="grid grid-cols-2 gap-3">
        {displayedTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="p-3.5 rounded-2xl bg-[#1A1A1D] hover:bg-[#7C4DFF]/10 border border-white/5 hover:border-[#7C4DFF]/40 transition-all text-left flex flex-col justify-between group h-28 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#7C4DFF]/15 text-[#A78BFA] flex items-center justify-center group-hover:bg-[#7C4DFF] group-hover:text-white transition-colors">
                <IconRenderer name={tool.icon} className="w-4 h-4" />
              </div>
              {tool.popular && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Popular
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#A78BFA] transition-colors">
                {tool.title}
              </h3>
              <p className="text-[10px] text-[#A0A0A0] line-clamp-1 mt-0.5">
                {tool.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Studio Lab / Future Features Banner */}
      <div
        onClick={onOpenStudioLab}
        className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-[#7C4DFF]/20 via-purple-900/30 to-[#A78BFA]/20 border border-[#7C4DFF]/40 flex items-center justify-between hover:border-[#7C4DFF] transition-all group shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#7C4DFF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#7C4DFF]/30">
            <Wand2 className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black text-white">Studio Lab</h3>
              <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded-md bg-white/20 text-white">
                Next-Gen
              </span>
            </div>
            <p className="text-xs text-[#A0A0A0] mt-0.5">
              AI Image Generator, Logo Maker, Voice & Presentations
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
