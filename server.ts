import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client lazily or gracefully with environment key
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Creator Studio AI Backend" });
});

// Tool Generation API
app.post("/api/generate", async (req, res) => {
  try {
    const { toolTitle, category, prompt, inputs, tone, length, language } = req.body;

    if (!prompt && !inputs) {
      return res.status(400).json({ error: "Please provide prompt input or details." });
    }

    const ai = getGeminiAI();

    // Construct high quality system instruction and user prompt based on parameters
    const systemInstruction = `You are Creator Studio AI, an elite AI content generator designed for content creators, marketers, YouTubers, copywriters, and professionals.
Your goal is to output exceptionally polished, high-engaging, and ready-to-use content for the user.

Output guidelines:
- Follow the requested tone: ${tone || "Professional"}.
- Follow the requested output length: ${length || "Medium"}.
- Write strictly in the target language: ${language || "English"}.
- Use clean Markdown formatting with bold headings, clean bullet points, and appropriate emojis where natural.
- Do NOT include meta-commentary like "Here is your script:" or "Sure! Here you go:". Start directly with the created content or title unless helpful context is strictly required.`;

    let userDetailsStr = "";
    if (inputs && typeof inputs === "object") {
      userDetailsStr = Object.entries(inputs)
        .filter(([_, v]) => v && String(v).trim().length > 0)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n");
    }

    const fullPrompt = `TOOL: ${toolTitle || "AI Content Generator"} (${category || "General"})
${userDetailsStr ? `\nUSER SPECIFICATIONS:\n${userDetailsStr}` : ""}
${prompt ? `\nMAIN INSTRUCTION/TOPIC:\n${prompt}` : ""}

Please generate high quality, highly creative, actionable content for this request.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: tone === "Funny" || tone === "Casual" || category === "Fun" ? 0.9 : 0.7,
      },
    });

    const resultText = response.text || "No content generated. Please try again.";

    res.json({
      success: true,
      result: resultText,
    });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({
      error: error?.message || "An error occurred while generating content. Please try again.",
    });
  }
});

// AI Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, message } = req.body;
    const ai = getGeminiAI();

    const systemInstruction = `You are Creator Studio AI, an expert AI assistant specialized in content creation, writing, marketing, social media strategy, video scripting, and productivity. 
Be helpful, creative, encouraging, and provide well-structured markdown answers. Provide quick templates, hooks, outline suggestions, or detailed content whenever asked.`;

    // Map message history into Gemini chat contents format or prompt
    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));
      if (message) {
        contents.push({ role: "user", parts: [{ text: message }] });
      }
    } else {
      contents = [message || "Hello!"];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I couldn't process that response. Please try again.";

    res.json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error?.message || "Failed to process chat message. Please verify API key settings.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Creator Studio AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
