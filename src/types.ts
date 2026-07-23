export type CategoryType = "Writing" | "Social Media" | "YouTube" | "Business" | "Fun";

export type ToneType =
  | "Professional"
  | "Funny"
  | "Luxury"
  | "Emotional"
  | "Friendly"
  | "Casual"
  | "Motivational"
  | "Confident"
  | "Persuasive";

export type LengthType = "Short" | "Medium" | "Long";

export type LanguageType =
  | "English"
  | "Hindi"
  | "Hinglish"
  | "Spanish"
  | "French"
  | "German"
  | "Japanese"
  | "Portuguese";

export interface ExtraField {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
}

export interface ToolItem {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  icon: string;
  popular?: boolean;
  placeholder: string;
  extraFields?: ExtraField[];
}

export interface GenerationHistoryItem {
  id: string;
  toolId: string;
  toolTitle: string;
  category: CategoryType;
  prompt: string;
  output: string;
  tone: ToneType;
  length: LengthType;
  language: LanguageType;
  timestamp: number;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

export type TabType = "home" | "chat" | "history" | "settings";
