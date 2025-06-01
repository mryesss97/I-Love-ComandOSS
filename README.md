# 🎓 SuiEarnLish — Learn English, Earn Rewards

**SuiEarnLish** is a Web3-powered English learning app where users practice English speaking and listening, earn points, and receive rewards via the SUI blockchain.

## 🚀 Features

- 🎧 **Listen-to-Earn**: Listen to dialogues and fill in missing words. Earn points for each correct answer. (coming soon)
- 🗣️ **Speak-to-Earn**: Read out sample sentences. The AI will evaluate pronunciation and give feedback and scores.
- 🏆 **Leaderboard**: Compete with other learners weekly and monthly based on total score.
- 🏱 **Rewards**: Top learners receive token rewards or NFTs as certificates of learning. (coming soon)
- 🔐 **Wallet Auth**: Authenticate using your SUI wallet with message signature.
- 📊 **Progress Tracking**: Monitor your lesson progress and pronunciation improvement.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, TypeScript, Radix UI
- **Backend**: Node.js + Express, Prisma ORM, SQLite
- **Web3**: SUI Wallet (via `@mysten/dapp-kit`), Wallet signature-based authentication
- **Voice API**: OpenAI Whisper API (for speech-to-text transcription)
- **CI/CD**: Vercel / Render for deployment

## 🛆 Monorepo Structure

```
apps/
  web/        # Frontend app
  api/        # Backend server
  contracts/  # Contract app
packages/
  fetcher/    # Shared fetch service (with auth headers)
  sui-earnlish-service # Shared service relate to learn
  sui-service # Shared service relate to web3 and blockchain
  ui          # Shared component common to re-use 
  utils       # Shared some common function & utils 
```

## 📝 How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/mryesss97/I-Love-ComandOSS.git
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup `.env` Files

#### For `apps/api/.env`:
```
PORT=9898
OPENAI_API_KEY=your_openai_api_key
```

#### For `apps/web/.env`:
```
NEXT_PUBLIC_API_URL=https://suiearnlish.onrender.com
NEXT_PUBLIC_MESSAGE=Sign to login to SuiEarnLish
```

### 4. Start Development

In one terminal to run server:
```bash
pnpm dev:server
```

In another terminal to run web app:
```bash
pnpm web:dev
```

## 🕉️ Authentication

Users sign a message with their SUI wallet. The backend verifies the signature and uses the wallet address as a user identifier.

## 📚 Lessons

- Lessons include multiple sample sentences.
- Scores are recorded for each sentence.
- Voice is transcribed via Whisper and compared to the original text.

## 📊 Scoring and Leaderboard

- Each correct listening answer and speaking attempt earns points.
- The total score is calculated per user.
- Leaderboard is ranked based on accumulated points.

## 💡 Future Improvements

- Multi-language support
- Gamified learning experience
- NFT certificates with unique artwork
- Social features for learner collaboration

## 🧑‍💻 Authors

- @mryesss - Frontend & Backend (fresher) developer
- OpenAI Whisper API for transcription
- SUI dApp Kit for wallet integration

---

Feel free to contribute or fork this project. Let’s build a better way to learn and earn together! 🌍🎧
