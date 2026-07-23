import React, { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { TopHeader } from "./components/TopHeader";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { ToolScreen } from "./components/ToolScreen";
import { AiChatScreen } from "./components/AiChatScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { SearchModal } from "./components/SearchModal";
import { ProModal } from "./components/ProModal";
import { StudioLabModal } from "./components/StudioLabModal";

import { TOOLS_DATA } from "./data/toolsData";
import {
  ToolItem,
  TabType,
  GenerationHistoryItem,
  ChatMessage,
  ToneType,
  LengthType,
  LanguageType,
} from "./types";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  // User Pro & Usage Limits
  const [isPro, setIsPro] = useState<boolean>(() => {
    return localStorage.getItem("cs_is_pro") === "true";
  });
  const [usageCount, setUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem("cs_usage_count");
    return saved ? parseInt(saved, 10) : 2;
  });
  const maxUsage = 10;

  // App Language
  const [language, setLanguage] = useState<LanguageType>(() => {
    return (localStorage.getItem("cs_language") as LanguageType) || "English";
  });

  // Favorites (Array of Tool IDs)
  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("cs_favorite_tools");
    return saved ? JSON.parse(saved) : ["instagram-caption", "blog-writer", "video-script", "email-writer"];
  });

  // History Items
  const [historyItems, setHistoryItems] = useState<GenerationHistoryItem[]>(() => {
    const saved = localStorage.getItem("cs_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: "sample-1",
        toolId: "instagram-caption",
        toolTitle: "Instagram Caption",
        category: "Social Media",
        prompt: "Sunset coffee in Tokyo Japan",
        output: "✨ Golden hour, warm matcha & quiet Tokyo streets. 🍵 Japan hits different when the sun dips behind Shibuya. What’s your ultimate sunset spot? 👇\n\n#TokyoVibes #JapanTravel #CoffeeLover #ShibuyaNights #SunsetSerenade",
        tone: "Casual",
        length: "Short",
        language: "English",
        timestamp: Date.now() - 3600000,
        isFavorite: true,
      },
    ];
  });

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("cs_chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isStudioLabOpen, setIsStudioLabOpen] = useState(false);

  // Native & Web Back Button Navigation
  useEffect(() => {
    const handlePopState = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      } else if (isProModalOpen) {
        setIsProModalOpen(false);
      } else if (isStudioLabOpen) {
        setIsStudioLabOpen(false);
      } else if (selectedTool) {
        setSelectedTool(null);
      } else if (activeTab !== "home") {
        setActiveTab("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isSearchOpen, isProModalOpen, isStudioLabOpen, selectedTool, activeTab]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("cs_is_pro", String(isPro));
  }, [isPro]);

  useEffect(() => {
    localStorage.setItem("cs_usage_count", String(usageCount));
  }, [usageCount]);

  useEffect(() => {
    localStorage.setItem("cs_language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("cs_favorite_tools", JSON.stringify(favoriteToolIds));
  }, [favoriteToolIds]);

  useEffect(() => {
    localStorage.setItem("cs_history", JSON.stringify(historyItems));
  }, [historyItems]);

  useEffect(() => {
    localStorage.setItem("cs_chat_messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Handlers
  const handleToggleFavorite = (toolId: string) => {
    setFavoriteToolIds((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handleSaveHistoryItem = (
    toolTitle: string,
    category: any,
    prompt: string,
    output: string,
    tone: ToneType,
    length: LengthType,
    lang: LanguageType
  ) => {
    const newItem: GenerationHistoryItem = {
      id: "gen-" + Date.now(),
      toolId: selectedTool?.id || "gen",
      toolTitle,
      category,
      prompt,
      output,
      tone,
      length,
      language: lang,
      timestamp: Date.now(),
      isFavorite: false,
    };
    setHistoryItems((prev) => [newItem, ...prev]);
    if (!isPro) {
      setUsageCount((prev) => Math.min(prev + 1, maxUsage));
    }
  };

  const handleToggleHistoryFavorite = (historyId: string) => {
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.id === historyId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllHistory = () => {
    setHistoryItems([]);
  };

  const handleSendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map((m) => ({
            role: m.sender,
            content: m.text,
          })),
          message: text,
        }),
      });

      const data = await response.json();

      const aiReply: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.reply || "I am ready to help you create content!",
        timestamp: Date.now(),
      };

      setChatMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "I encountered a connection issue. Please verify your internet connection or API settings.",
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans antialiased selection:bg-[#7C4DFF] selection:text-white">
      {/* Top Header Bar */}
      <TopHeader
        usageCount={usageCount}
        maxUsage={maxUsage}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Screen Content View */}
      <main className="min-h-[calc(100vh-60px)]">
        {selectedTool ? (
          <ToolScreen
            tool={selectedTool}
            onBack={() => setSelectedTool(null)}
            onSaveHistory={handleSaveHistoryItem}
            isFavorite={favoriteToolIds.includes(selectedTool.id)}
            onToggleFavorite={handleToggleFavorite}
            userLanguage={language}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <HomeScreen
                tools={TOOLS_DATA}
                onSelectTool={(tool) => setSelectedTool(tool)}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenStudioLab={() => setIsStudioLabOpen(true)}
              />
            )}

            {activeTab === "chat" && (
              <AiChatScreen
                messages={chatMessages}
                onSendMessage={handleSendChatMessage}
                onClearChat={handleClearChat}
                isLoading={isChatLoading}
              />
            )}

            {activeTab === "history" && (
              <HistoryScreen
                historyItems={historyItems}
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onClearAllHistory={handleClearAllHistory}
                onToggleFavorite={handleToggleHistoryFavorite}
                onSelectHistoryItem={(item) => {
                  const match = TOOLS_DATA.find((t) => t.id === item.toolId);
                  if (match) setSelectedTool(match);
                }}
              />
            )}

            {activeTab === "settings" && (
              <SettingsScreen
                isPro={isPro}
                onOpenProModal={() => setIsProModalOpen(true)}
                language={language}
                onChangeLanguage={setLanguage}
                onClearHistory={handleClearAllHistory}
                onOpenStudioLab={() => setIsStudioLabOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Bottom Navigation (when no individual tool screen is active) */}
      {!selectedTool && (
        <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
      )}

      {/* Search Drawer Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS_DATA}
        onSelectTool={(tool) => setSelectedTool(tool)}
      />

      {/* Pro Upgrade Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isPro={isPro}
        onUpgradePro={() => {
          setIsPro(true);
          alert("🎉 Congratulations! Creator Studio PRO activated successfully!");
        }}
      />

      {/* Studio Lab Modal */}
      <StudioLabModal
        isOpen={isStudioLabOpen}
        onClose={() => setIsStudioLabOpen(false)}
        onOpenPro={() => setIsProModalOpen(true)}
      />
    </div>
  );
}
