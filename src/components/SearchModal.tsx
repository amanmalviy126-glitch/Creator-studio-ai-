import React, { useState } from "react";
import { Search, X, ChevronRight, Sparkles } from "lucide-react";
import { ToolItem, CategoryType } from "../types";
import { IconRenderer } from "./IconRenderer";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tools,
  onSelectTool,
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = ["All", "Writing", "Social Media", "YouTube", "Business", "Fun"];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === (selectedCategory as CategoryType);
    const matchesQuery =
      query.trim() === "" ||
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full mx-auto bg-[#1A1A1D] border border-white/10 rounded-3xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7C4DFF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 77+ AI tools..."
            className="flex-1 bg-transparent text-white placeholder-[#A0A0A0] text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#A0A0A0] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-[#A0A0A0] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 p-3 overflow-x-auto border-b border-white/5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#7C4DFF] text-white font-semibold"
                  : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-[#A0A0A0] flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-[#7C4DFF]/50 mb-2" />
              <p className="text-sm font-medium">No AI tools found</p>
              <p className="text-xs text-[#A0A0A0]/70 mt-1">
                Try searching for "Caption", "Script", "Email", or "Essay"
              </p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-2xl bg-[#0F0F10] hover:bg-[#7C4DFF]/10 border border-white/5 hover:border-[#7C4DFF]/30 transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7C4DFF]/15 text-[#A78BFA] flex items-center justify-center shrink-0 group-hover:bg-[#7C4DFF] group-hover:text-white transition-colors">
                  <IconRenderer name={tool.icon} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{tool.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#A0A0A0]">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#A0A0A0] truncate mt-0.5">{tool.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A0A0] group-hover:text-white shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
