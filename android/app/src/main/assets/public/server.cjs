var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
var getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in Settings > Secrets.");
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Creator Studio AI Backend" });
});
app.post("/api/generate", async (req, res) => {
  try {
    const { toolTitle, category, prompt, inputs, tone, length, language } = req.body;
    if (!prompt && !inputs) {
      return res.status(400).json({ error: "Please provide prompt input or details." });
    }
    const ai = getGeminiAI();
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
      userDetailsStr = Object.entries(inputs).filter(([_, v]) => v && String(v).trim().length > 0).map(([k, v]) => `- ${k}: ${v}`).join("\n");
    }
    const fullPrompt = `TOOL: ${toolTitle || "AI Content Generator"} (${category || "General"})
${userDetailsStr ? `
USER SPECIFICATIONS:
${userDetailsStr}` : ""}
${prompt ? `
MAIN INSTRUCTION/TOPIC:
${prompt}` : ""}

Please generate high quality, highly creative, actionable content for this request.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: tone === "Funny" || tone === "Casual" || category === "Fun" ? 0.9 : 0.7
      }
    });
    const resultText = response.text || "No content generated. Please try again.";
    res.json({
      success: true,
      result: resultText
    });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({
      error: error?.message || "An error occurred while generating content. Please try again."
    });
  }
});
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, message } = req.body;
    const ai = getGeminiAI();
    const systemInstruction = `You are Creator Studio AI, an expert AI assistant specialized in content creation, writing, marketing, social media strategy, video scripting, and productivity. 
Be helpful, creative, encouraging, and provide well-structured markdown answers. Provide quick templates, hooks, outline suggestions, or detailed content whenever asked.`;
    let contents = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
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
        temperature: 0.7
      }
    });
    const replyText = response.text || "I couldn't process that response. Please try again.";
    res.json({
      success: true,
      reply: replyText
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error?.message || "Failed to process chat message. Please verify API key settings."
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} Creator Studio AI Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
