# 📱 SuiEarnLish – Frontend

This is the **frontend** app of the `SuiEarnLish` project – a learn-to-earn English platform built on the **SUI Blockchain**.  
It provides users with interactive lessons to practice **listening and speaking**, and earn rewards based on their performance.

---

## 🧱 Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Radix-ui** for UI components
- **@mysten/dapp-kit** for SUI wallet integration
- **Custom Fetcher** service for API interaction

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm dev
```

Make sure the backend is running at `http://localhost:9898` or adjust `Fetcher`'s `baseUrl`.

---

## 📁 Project Structure

```
apps/
  web/
    app/              # App router pages (Next.js 15)
    components/       # UI components
    context/          # React contexts (e.g. LessonContext)
    services/         # VoiceRecorderService, LessonService, etc.
    hooks/            # Custom React hooks
    utils/            # Utility functions (e.g. localStorage helpers)
    styles/           # Global styles and Tailwind config
```

---

## 🔐 Authentication Flow

- Users connect their **SUI wallet** via `@mysten/dapp-kit`
- Signature is stored in `localStorage` as `{ address: signature }`
- All authenticated requests auto-attach the correct signature via `Fetcher`

---

## 🧠 Core Features

- 🔊 **Listen & Speak** to earn scores
- 🎙️ Record and upload speech via `VoiceRecorderService`
- 🧠 Get real-time feedback from backend (OpenAI Whisper)
- 📈 View leaderboard & personal performance
- 🔐 Connect wallet & authenticate securely

---

## 📦 Environment Variables

Create a `.env` file in `apps/web/`:

```env
NEXT_PUBLIC_MESSAGE="Sign to login to SuiEarnLish"
NEXT_PUBLIC_API="http://localhost:9898"
```

---

## ✨ Dev Tips

- Use `Fetcher` for all API interactions
- Store per-user auth in localStorage `{ address: signature }`
- Use `@/` alias to import from shared packages