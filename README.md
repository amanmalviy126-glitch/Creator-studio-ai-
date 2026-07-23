# Creator Studio AI 🚀

An all-in-one AI content generation suite built for creators, marketers, YouTubers, and professionals. Powered by Google Gemini 3.6 Flash, React, Express, and Capacitor for cross-platform Web & Android deployment.

![Creator Studio AI Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- ⚡ **77+ Specialized AI Tools**: High-converting social posts, YouTube scripts, blogs, email copy, hashtags, product descriptions, and business proposals.
- 💬 **Interactive AI Chat Assistant**: Instant context-aware conversation powered by Google Gemini.
- 🎨 **Material Design 3 & Material Dark Theme**: Custom dark canvas (`#0F0F10`), high contrast, smooth Motion animations.
- 📱 **Cross-Platform Ready (Web & Android)**: Shared UI and business logic with Capacitor integration for native APK/AAB builds.
- 📂 **Local History & Favorites**: Save, search, copy, and export generated outputs.
- 👑 **Creator Studio Pro Suite**: Unlimited generations, ad-free experience, and early access to Studio Lab multimodal tools.
- 🧪 **Studio Lab (Upcoming Multimodal Tools)**: AI Image Generator, Logo Maker, Voiceover, Presentation Generator & PDF OCR.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Motion, Tailwind CSS
- **Backend**: Express.js (Bundled CommonJS via `esbuild`)
- **AI Core**: `@google/genai` (Google Gemini 3.6 Flash)
- **Native Mobile**: Capacitor Core & Android Platform
- **Iconography**: Lucide React
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## 📁 Directory Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI workflow
├── public/
│   └── manifest.json         # Web App & PWA Manifest
├── src/
│   ├── components/           # React UI Screens & Modals
│   ├── data/                 # Tools Metadata & Prompts (77+ Tools)
│   ├── types.ts              # TypeScript Type Definitions
│   ├── App.tsx               # Primary React Application Entry
│   └── main.tsx              # React DOM Root
├── capacitor.config.json     # Capacitor Android Configuration
├── server.ts                 # Express Backend Server & API Proxy
├── vite.config.ts            # Vite Configuration
├── .env.example              # Environment Variable Template
├── LICENSE                   # MIT License
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Android Studio** (for Android APK/AAB compilation)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/creator-studio-ai.git
   cd creator-studio-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and add your Google Gemini API Key:
   ```bash
   cp .env.example .env
   ```

   In `.env`:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   PORT=3000
   NODE_ENV=development
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Building for Production

To create a single, bundled production build:

```bash
npm run build
```

This compiles:
1. Static web frontend into `dist/`
2. Backend Express server into `dist/server.cjs`

To test the production build locally:
```bash
npm start
```

---

## 📱 Android Build Instructions (Capacitor)

Creator Studio AI is configured for native Android compilation using Capacitor.

1. **Build web assets:**
   ```bash
   npm run build
   ```

2. **Add Android platform (first time only):**
   ```bash
   npx cap add android
   ```

3. **Sync web build to native Android project:**
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

5. **Generate APK / AAB in Android Studio:**
   - In Android Studio, select **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - To prepare for Google Play Store release, select **Build > Generate Signed Bundle / APK**

---

## ☁️ Deployment Guide (Render)

Creator Studio AI can be easily hosted on **Render** as a Web Service:

1. Connect your GitHub repository to **Render**.
2. Create a new **Web Service**.
3. Set the following build and runtime settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variable under **Environment Variables**:
   - `GEMINI_API_KEY`: *(Your Google Gemini API key)*
   - `NODE_ENV`: `production`

---

## 🧪 GitHub Actions CI/CD

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Triggers on `push` or `pull_request` to `main`
- Installs dependencies with `npm ci`
- Runs TypeScript linter (`npm run lint`)
- Validates production bundle creation (`npm run build`)
- Uploads build artifacts (`dist/`)

---

## 🔑 Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Required Google Gemini API Key | *None* |
| `PORT` | Server Port | `3000` |
| `NODE_ENV` | Environment mode (`development` / `production`) | `production` |
| `APP_URL` | Base host URL | `http://localhost:3000` |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
