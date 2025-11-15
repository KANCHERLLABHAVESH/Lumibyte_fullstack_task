const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mock = require("./mockData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Create new session
app.post("/api/new-session", (req, res) => {
  const session = mock.createSession();
  res.json(session);
});

// Fetch sessions list
app.get("/api/sessions", (req, res) => {
  res.json(mock.listSessions());
});

// Fetch session history
app.get("/api/session/:id", (req, res) => {
  const session = mock.getSession(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

// Ask question in a session
app.post("/api/session/:id/ask", (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Missing question" });

  const session = mock.getSession(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  // Create a dummy response (tabular + description)
  const response = mock.generateAnswer(question);
  // Append to history
  session.history.push({ role: "user", text: question, ts: Date.now() });
  session.history.push({ role: "assistant", ...response, ts: Date.now() });

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});