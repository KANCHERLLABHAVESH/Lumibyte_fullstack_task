import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import ChatInput from "./components/ChatInput";
import TableResponse from "./components/TableResponse";
import AnswerFeedback from "./components/AnswerFeedback";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ChatPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedResp, setSelectedResp] = useState(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`${API}/api/session/${sessionId}`)
      .then(r => r.json())
      .then(data => {
        setSession(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [sessionId]);

  const handleAsk = async (question) => {
    if (!sessionId) return;
    const res = await fetch(`${API}/api/session/${sessionId}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    // reload session
    const s = await (await fetch(`${API}/api/session/${sessionId}`)).json();
    setSession(s);
    setSelectedResp(data);
  };

  return (
    <div className="flex-1 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{session ? session.title : "New Chat"}</h2>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {session && session.history.length === 0 && (
              <div className="text-muted">No messages yet — ask something below.</div>
            )}
            {session && session.history.map((item, idx) => {
              if (item.table) {
                return (
                  <div key={idx} className="p-4 border rounded bg-white dark:bg-gray-800">
                    <div className="mb-2">{item.description}</div>
                    <TableResponse columns={item.table.columns} rows={item.table.rows} />
                    <AnswerFeedback />
                  </div>
                );
              }
              return (
                <div key={idx} className={`p-3 rounded ${item.role==="user" ? "bg-blue-50 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}>
                  <div className="text-sm">{item.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4">
        <ChatInput onSubmit={handleAsk} />
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/sessions`).then(r=>r.json()).then(setSessions);
  }, []);

  const createNew = async () => {
    const res = await fetch(`${API}/api/new-session`, { method: "POST" });
    const s = await res.json();
    navigate(`/chat/${s.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to ChatApp</h1>
      <button onClick={createNew} className="px-4 py-2 bg-blue-600 text-white rounded">New Chat</button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Recent Sessions</h3>
        <ul className="space-y-2">
          {sessions.map(s => (
            <li key={s.id} className="p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => navigate(`/chat/${s.id}`)}>
              <div className="text-sm font-medium">{s.title}</div>
              <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:sessionId" element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  );
}