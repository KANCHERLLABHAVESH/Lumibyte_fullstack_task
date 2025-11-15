
# Chat App Project (Mock ChatGPT-style)

This repo contains a minimal **frontend (React + Vite + TailwindCSS)** and **backend (Node.js + Express)** with mock JSON data.

## Run backend
```bash
cd backend
npm install
npm run start
# or for development with nodemon:
# npm run dev
```

Backend runs on http://localhost:5000

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 (Vite default). Open the URL in your browser.

## Notes
- The backend stores mock sessions in memory. Restarting the server clears sessions.
- The frontend expects the backend at http://localhost:5000. You can change by setting environment variable `VITE_API_URL`.
