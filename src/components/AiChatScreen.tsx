import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2, Copy, Check, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface AiChatScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onClearChat: () => void;
  isLoading: boolean;
}

const SUGGESTED_CHIPS = [
  "Write an email to a client",
  "Create an Instagram caption",
  "Improve my resume bullets",
  "Draft a YouTube video script",
  "Write a travel itinerary for Japan",
  "Generate a SaaS business idea",
];

export const AiChatScreen: React.FC<AiChatScreenProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  isLoading,
}) => {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const textToSend = input.trim();
    setInput("");
    onSendMessage(textToSend);
  };

  const handleChipClick = (chipText: string) => {
    if (isLoading) return;
    onSendMessage(chipText);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-md mx-auto p-4 pb-24">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C4DFF] to-[#A78BFA] flex items-center justify-center text-white shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">AI Chat Assistant</h2>
            <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Gemini 3.6 Flash Active
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-[#A0A0A0] hover:text-rose-400 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length === 0 && (
        <div className="my-auto py-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-[#7C4DFF]/15 border border-[#7C4DFF]/30 flex items-center justify-center text-[#A78BFA] shadow-xl">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Ask Creator Studio AI Anything</h3>
            <p className="text-xs text-[#A0A0A0] max-w-xs mx-auto">
              Get instant ideas, scripts, rewrites, strategies, or answers powered by Gemini AI.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {SUGGESTED_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1.5 rounded-xl bg-[#1A1A1D] border border-white/10 hover:border-[#7C4DFF]/50 text-xs text-[#A0A0A0] hover:text-white transition-all active:scale-95"
              >
                ✨ {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-3.5 py-3 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-white/10 text-white"
                    : "bg-[#7C4DFF] text-white shadow-md shadow-[#7C4DFF]/20"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`group relative max-w-[82%] space-y-1`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed font-normal whitespace-pre-wrap select-text ${
                    isUser
                      ? "bg-[#7C4DFF] text-white rounded-tr-none shadow-md"
                      : "bg-[#1A1A1D] text-white border border-white/10 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-[#A0A0A0] hover:text-white flex items-center gap-1 mt-1"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5 items-center">
            <div className="w-7 h-7 rounded-xl bg-[#7C4DFF] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-[#1A1A1D] border border-white/10 flex items-center gap-1.5 text-xs text-[#A0A0A0]">
              <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Chat anything..."
          className="w-full p-3.5 pr-12 rounded-2xl bg-[#1A1A1D] border border-white/10 text-white text-xs placeholder-[#A0A0A0] focus:outline-none focus:border-[#7C4DFF] shadow-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-2 p-2 rounded-xl bg-[#7C4DFF] hover:bg-[#8C62FF] text-white disabled:opacity-40 transition-all active:scale-95 shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
