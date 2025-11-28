# ShortsHub

AI-powered video platform for creating, managing, and distributing short-form content across multiple social media platforms.

## Features

### ✨ Core Features
- **AI Video Generation** - Create videos using multiple AI models (Veo 2, Runway Gen-3, Kling, Luma)
- **Prompt Optimization** - AI-enhanced prompts for better video generation
- **Multi-Platform Publishing** - Connect and post to YouTube, TikTok, Instagram, X, Facebook, LinkedIn, Snapchat, Pinterest
- **Smart Scheduling** - Calendar-based post scheduling with timezone support
- **Cross-Platform Analytics** - Unified dashboard for performance metrics
- **Video Upload & Library** - Secure cloud storage with GCS integration

### 🎯 Platform Management
- OAuth integration for 8 major platforms
- Bulk posting across multiple platforms
- Per-platform caption customization
- Auto-crosspost functionality
- Real-time connection status

### 🤖 AI Video Generation
- Model selection (4 major AI video providers)
- Duration control (2-10 seconds)
- Aspect ratio options (16:9, 9:16, 1:1)
- Style presets (Cinematic, Anime, Realistic, etc.)
- Camera movement controls
- Generation queue with progress tracking

## Tech Stack

### Backend
- **Node.js** + Express
- **MongoDB** (Mongoose)
- **Google Cloud Storage** - Video file storage
- **JWT** - Authentication
- **YAML-based** feature definitions

### Frontend
- **React** + TypeScript
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **JSON-driven** UI layouts

### Architecture
**Hybrid System**: Backend routes generated from YAML feature definitions, frontend UI rendered from JSON layouts.

## Setup

### Prerequisites
- Node.js 16+
- MongoDB
- Google Cloud Storage account
- Platform API credentials (YouTube, TikTok, etc.)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/Maqsood32595/shortshubAntigravity.git
   cd shortshubAntigravity
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/shortshub
   JWT_SECRET=your_secret_key
   
   # Google Cloud Storage
   GOOGLE_CLOUD_KEY_FILE=./path/to/service-account.json
   GOOGLE_CLOUD_PROJECT_ID=your_project_id
   GOOGLE_CLOUD_BUCKET_NAME=your_bucket_name
   
   # AI Video APIs (optional)
   VEO2_API_KEY=your_key
   RUNWAY_API_KEY=your_key
   GEMINI_API_KEY=your_key
   
   # Platform OAuth (optional)
   GOOGLE_CLIENT_ID=your_id
   TIKTOK_CLIENT_KEY=your_key
   META_APP_ID=your_id
   TWITTER_API_KEY=your_key
   ```

4. **Build hybrid routes**
   ```bash
   npm run build:hybrid
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```
   
   - Backend: http://localhost:5002
   - Frontend: http://localhost:3002

## Project Structure

```
shortshub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── registry/      # UI components
│   │   ├── layout/        # Layout system
│   │   └── core/          # State & logic
│   └── public/layouts/    # JSON UI definitions
├── server/
│   ├── custom/            # Route handlers
│   ├── utils/             # Utilities (DB, storage, auth)
│   └── index.js           # Express server
├── features/              # YAML feature definitions
├── schema/                # Routes & theme configs
└── scripts/               # Build scripts
```

## Usage

### Upload Videos
1. Navigate to `/upload`
2. Drag & drop video files
3. Videos stored in GCS under `{email}/uploaded/`

### Generate AI Videos
1. Go to `/ai-generation`
2. Select AI model
3. Enter prompt (or use prompt optimizer)
4. Configure options (duration, style, etc.)
5. Generate and track progress

### Manage Platforms
1. Visit `/platforms`
2. **Connections Tab**: Connect social media accounts
3. **Schedule Tab**: Calendar-based post scheduling
4. **Analytics Tab**: Cross-platform metrics

### View Library
- `/library` - All uploaded and AI-generated videos
- Organized by type (My Uploads, History, Liked)
- Secure playback with signed URLs

## Development

### Add New Feature
1. Create YAML in `features/`
2. Create handlers in `server/custom/`
3. Run `npm run build:hybrid`
4. Create JSON layout in `client/public/layouts/`
5. Add route in `schema/routes.ts`

### Add UI Component
1. Create component in `client/src/registry/ui-kit/`
2. Register in `client/src/registry/index.tsx`
3. Use in JSON layouts via `"type": "ComponentName"`

## License

MIT

## Author

Mohammed Maqsood L
