# velum

velum is a real-time collaborative text editor built for shared writing. Multiple users can open the same document, type at the same time, see each other's presence, and keep working without overwriting each other.

 **Real-time Collaborative Text Editor** 

## live demo

- Live URL: [here!](https://velum-zeta.vercel.app/)
- GitHub: `https://github.com/ziennaa/velum`

## what the project does

Velum focuses on one thing: making a shared document actually feel live.

Users can:
- create and open documents
- edit the same document from multiple browser windows
- see presence indicators
- see coloured collaborator cursors
- use basic rich-text formatting
- rely on document persistence
- browse revision history

This is a **shared workspace demo build**. Anyone with the document link can open it and collaborate. That choice was intentional for the hackathon build so the focus stayed on real-time editing, conflict-free sync, and product flow rather than authentication.

## requirement mapping

This project was built to match the required problem statement:

### Required features
- Real-time synchronisation of text changes across multiple users
- User presence indicators
- Cursor position tracking per user
- Conflict resolution when multiple users edit the same section
- Basic text formatting: bold, italic, underline
- Document persistence and revision history

### Technical requirements
- WebSocket-based real-time communication
- CRDT-based collaborative editing
- Node.js backend
- React frontend
- MongoDB document storage

## Tech stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Tiptap

### Backend
- Node.js
- Express
- TypeScript
- Hocuspocus
- Yjs
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Railway

## Architecture overview

The project has two main parts:

### 1. Client
The client is a React app that renders the landing page, dashboard, and editor UI.

The editor uses **Tiptap** for rich-text editing and connects to the collaboration backend through a **Yjs/Hocuspocus** provider. Presence, cursors, and syncing are all driven from that collaboration connection.

### 2. Server
The server exposes:
- REST endpoints for document and revision management
- a Hocuspocus WebSocket server for collaborative editing
- MongoDB persistence for documents and revision snapshots

### Collaboration flow
1. A user opens a document
2. The client connects to the Hocuspocus WebSocket server
3. Yjs manages shared document state as a CRDT
4. Remote edits merge without manual conflict handling
5. The server stores document state and revision history in MongoDB

## Project structure

```text
velum/
├── client/    # React + Vite frontend
└── server/    # Node.js + Hocuspocus + MongoDB backend
```

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  React + Tiptap + Yjs + HocuspocusProvider                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP (REST API) + WebSocket
┌─────────────────────────▼───────────────────────────────────┐
│                    Node.js Server (PORT 3001)               │
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

## How it works
The HTTP server and WebSocket server share one port. When a client connects via `ws://`, the Node.js `upgrade` event hands the socket to Hocuspocus. Regular HTTP requests go to Express as normal.

Yjs encodes document state as a binary CRDT. Hocuspocus loads it from MongoDB when the first user opens a document, and saves it back every 2 seconds of inactivity. Revision snapshots are written separately on a 30-second throttle.

---

### Why CRDTs

This project uses **Yjs**, a CRDT library, instead of writing custom merge logic.
Collaborative editing becomes complex quickly when multiple users edit the same content simultaneously. A CRDT-based model ensures a consistent shared state without forcing users to manually resolve conflicts.

---

###  Repository Links

- Main repo: https://github.com/ziennaa/velum  

## Stack

| Layer | Technology |
|---|---|
| Editor | Tiptap v2 |
| CRDT | Yjs |
| WebSocket | Hocuspocus |
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |

---

## Local setup

#### Prerequisites
- Node.js 20+
- npm
- MongoDB Atlas connection string

## Run it locally

You need Node.js 18+ and a MongoDB connection string (local or Atlas free tier).
```bash
git clone https://github.com/ziennaa/velum.git
cd velum

cd server && npm install
cd ../client && npm install
```

Create `server/.env`:

```
PORT=3001
MONGODB_URI=<your_mongodb_connection_string>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the backend:
```
npm install
npm build dev
npm run dev
```
#### Setup the frontend

Open another terminal:

```
cd client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

Run the frontend:
```
npm run dev
```
The frontend should run on `http://localhost:5173`.

## Deploy

### Backend — Railway

1. New project → deploy from GitHub → set root directory to `server`
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add environment variables: `MONGODB_URI`, `CLIENT_URL`, `NODE_ENV=production`
5. Railway sets `PORT` automatically

### Frontend — Vercel

1. Import repo → set root directory to `client`
2. Framework preset: Vite
3. Add environment variables:
   - `VITE_API_URL` = your Railway URL
   - `VITE_WS_URL` = your Railway URL with `wss://` prefix

---

## Shared workspace model

Every document is accessible to anyone with its URL. There are no accounts, no access control, and no ownership. This is intentional — the project is about real-time collaboration, not authentication. Anyone who has the link can open the document and start editing immediately.

---

## Known limitations

- No authentication. Any URL is publicly editable.
- Revision restore requires a page reload to reflect the restored state.
- The free Railway tier sleeps after inactivity. The first request after sleep takes ~5 seconds.
- Mobile layout works but the editor toolbar is compact on small screens.

---

## AI tools used
- ChatGPT  
- Claude  
- Railway Agent 
#### Claude (Anthropic) was used for architectural guidance, debugging. All integration decisions, design choices, and final implementation were verified and adjusted manually.

---

## Scoring rubric alignment

| Criterion | Implementation |
|---|---|
| Real-time sync | Yjs + Hocuspocus WebSocket, character-by-character |
| Conflict resolution | Yjs CRDT — deterministic merge, no overwrite |
| Presence indicators | Awareness protocol, coloured cursors, name labels |
| Cursor tracking | CollaborationCursor extension, per-user colour |
| Formatting | Bold, italic, underline, headings, lists, code |
| Persistence | MongoDB, yjsState binary field |
| Revision history | 30-second snapshots, panel UI, one-click restore |
| WebSocket | Single-port HTTP upgrade, Hocuspocus protocol |


## License

Released under the **MIT License**. See [LICENSE](./LICENSE).
