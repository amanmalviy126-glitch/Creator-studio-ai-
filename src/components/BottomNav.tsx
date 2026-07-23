import React from "react";
import { Home, MessageSquare, History, Settings } from "lucide-react";
import { TabType } from "../types";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "chat", label: "AI Chat", icon: MessageSquare },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F10]/95 backdrop-blur-lg border-t border-white/5 px-2 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 py-1.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive ? "text-[#A78BFA]" : "text-[#A0A0A0] hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-[#7C4DFF] rounded-full shadow-[0_2px_8px_rgba(124,77,255,0.8)]" />
              )}
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? "bg-[#7C4DFF]/15 text-[#A78BFA]" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold mt-0.5 ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
