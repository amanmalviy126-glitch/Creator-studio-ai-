import React, { useState } from "react";
import {
  Search,
  Trash2,
  Heart,
  Copy,
  Check,
  Share2,
  Sparkles,
  Calendar,
  ChevronRight,
  Filter,
} from "lucide-react";
import { GenerationHistoryItem, CategoryType } from "../types";

interface HistoryScreenProps {
  historyItems: GenerationHistoryItem[];
  onDeleteHistoryItem: (id: string) => void;
  onClearAllHistory: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectHistoryItem: (item: GenerationHistoryItem) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  historyItems,
  onDeleteHistoryItem,
  onClearAllHistory,
  onToggleFavorite,
  onSelectHistoryItem,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Writing", "Social Media", "YouTube", "Business", "Fun"];

  const filteredHistory = historyItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === (selectedCategory as CategoryType);
    const matchesFavorites = !onlyFavorites || item.isFavorite;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.toolTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.output.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesFavorites && matchesQuery;
  });

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Generation History</h1>
          <p className="text-xs text-[#A0A0A0]">Saved & recent AI generations</p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={onClearAllHistory}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-[#A0A0A0] hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Search & Favorites Toggle */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#A0A0A0] absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history outputs..."
            className="w-full p-2.5 pl-9 rounded-2xl bg-[#1A1A1D] border border-white/10 text-white text-xs placeholder-[#A0A0A0] focus:outline-none focus:border-[#7C4DFF]"
          />
        </div>

        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
            onlyFavorites
              ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
              : "bg-[#1A1A1D] border-white/10 text-[#A0A0A0] hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${onlyFavorites ? "fill-rose-400 text-rose-400" : ""}`} />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#7C4DFF] text-white font-semibold"
                : "bg-[#1A1A1D] text-[#A0A0A0] hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* History Feed */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center text-[#A0A0A0] bg-[#1A1A1D] rounded-3xl border border-white/5 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#7C4DFF]/50 mb-2" />
            <p className="text-sm font-bold text-white">No history items found</p>
            <p className="text-xs text-[#A0A0A0] mt-1">
              Your generated AI content will automatically appear here.
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem(item)}
              className="cursor-pointer p-4 rounded-3xl bg-[#1A1A1D] border border-white/5 hover:border-[#7C4DFF]/40 transition-all space-y-2.5 group hover:shadow-xl"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                    {item.toolTitle}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#A0A0A0]">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="p-1.5 text-[#A0A0A0] hover:text-rose-400"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        item.isFavorite ? "fill-rose-400 text-rose-400" : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistoryItem(item.id);
                    }}
                    className="p-1.5 text-[#A0A0A0] hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Output Content Preview */}
              <p className="text-xs text-[#A0A0A0] line-clamp-3 leading-relaxed font-normal bg-[#0F0F10] p-3 rounded-2xl border border-white/5">
                {item.output}
              </p>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-[#A0A0A0]">
                <div className="flex items-center gap-2">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.tone}</span>
                  <span>•</span>
                  <span>{item.language}</span>
                </div>

                <button
                  onClick={(e) => handleCopy(e, item.id, item.output)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#A78BFA]" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
