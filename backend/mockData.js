// Simple in-memory mock data manager
let sessions = [];
let nextId = 1;

function createSession() {
  const id = String(nextId++);
  const session = {
    id,
    title: `Chat ${id}`,
    createdAt: Date.now(),
    history: [],
  };
  sessions.unshift(session);
  return session;
}

function listSessions() {
  return sessions.map(s => ({ id: s.id, title: s.title, createdAt: s.createdAt }));
}

function getSession(id) {
  return sessions.find(s => s.id === String(id));
}

function generateAnswer(question) {
  // For demonstration we return a simple table + description.
  // In a real app, you'd call an AI backend here.
  const columns = ["Metric", "Value", "Notes"];
  const rows = [
    ["Question length", String(question.length), "Number of characters in your question"],
    ["Has question mark", question.includes("?") ? "Yes" : "No", "Checks punctuation"],
    ["Words count", String(question.split(/\s+/).filter(Boolean).length), "Space-separated tokens"],
  ];
  const description = `This is a mock response for: "${question}". Below is a structured table derived from the query.`;
  return { table: { columns, rows }, description, id: `resp_${Date.now()}` };
}

module.exports = {
  createSession,
  listSessions,
  getSession,
  generateAnswer
};