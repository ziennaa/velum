# Velum — Real-Time Collaborative Text Editor

> Write together, effortlessly. A lightweight collaborative editor for teams and students.

![Velum Screenshot](https://via.placeholder.com/1200x630/111117/6366F1?text=Velum+Collaborative+Editor)

## Live Demo
- **Frontend:** https://velum.vercel.app
- **Backend:** https://velum-server.railway.app
- **Video demo:** [Link to demo]

## Features
- ⚡ **Real-time sync** — Changes appear instantly via WebSocket
- 👥 **Live presence** — See who's editing with colored cursors and name labels
- 🔀 **Conflict-free** — Yjs CRDT handles concurrent edits mathematically
- 📝 **Rich formatting** — Bold, italic, underline, headings, lists, code
- 🕐 **Revision history** — Auto-saved snapshots, restorable
- 💾 **Persistent storage** — MongoDB-backed document persistence

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Editor | Tiptap v2 |
| CRDT | Yjs |
| WebSocket | Hocuspocus (y-websocket protocol) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone and install
```bash
git clone https://github.com/yourusername/velum.git
cd velum

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Configure environment

**Server** (`server/.env`):
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/velum
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Client** (`client/.env`):
```
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

### 3. Run

Open two terminal windows:
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open http://localhost:5173

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  React + Tiptap + Yjs + HocuspocusProvider                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP (REST API) + WebSocket
┌─────────────────────────▼───────────────────────────────────┐
│                    Node.js Server (PORT 3001)                │
│                                                             │
│  HTTP  →  Express (REST API: documents, revisions)          │
│  WS    →  Hocuspocus (Yjs sync + presence awareness)        │
└─────────────────────────┬───────────────────────────────────┘
                          │ Mongoose
┌─────────────────────────▼───────────────────────────────────┐
│                        MongoDB                              │
│  documents: { title, yjsState (Binary), timestamps }        │
│  revisions: { documentId, yjsState, contentPreview }        │
└─────────────────────────────────────────────────────────────┘
```

## Deployment

### Backend (Railway)
1. Create account at railway.app
2. New project → Deploy from GitHub
3. Add environment variables: `MONGODB_URI`, `CLIENT_URL`, `NODE_ENV=production`
4. Railway sets `PORT` automatically

### Frontend (Vercel)
1. Create account at vercel.com
2. Import GitHub repo, select `client/` as root directory
3. Add env vars: `VITE_API_URL`, `VITE_WS_URL` (your Railway URL)

## License
MIT