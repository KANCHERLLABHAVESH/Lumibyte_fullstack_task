import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Sidebar(){
  const [open, setOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    const iv = setInterval(fetchSessions, 3000);
    return () => clearInterval(iv);
  }, []);

  async function fetchSessions() {
    const res = await fetch(`${API}/api/sessions`);
    const data = await res.json();
    setSessions(data);
  }

  const createNew = async () => {
    const res = await fetch(`${API}/api/new-session`, { method: "POST" });
    const s = await res.json();
    navigate(`/chat/${s.id}`);
  };

  return (
    <aside className={`flex flex-col ${open ? "w-72" : "w-16"} bg-white dark:bg-gray-800 border-r transition-all`}>
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          {open && <div className="font-semibold">You</div>}
        </div>
        <button onClick={()=>setOpen(o=>!o)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">☰</button>
      </div>

      <div className="p-3">
        <button onClick={createNew} className="w-full py-2 bg-green-500 text-white rounded">{open ? "New Chat" : "+"}</button>
      </div>

      <div className="p-3 overflow-auto flex-1">
        <div className="text-xs uppercase text-gray-500 mb-2">{open ? "Sessions" : "S"}</div>
        <ul className="space-y-2">
          {sessions.map(s => (
            <li key={s.id} className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => navigate(`/chat/${s.id}`)}>
              {open ? (
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
                </div>
              ) : (
                <div className="text-center">{s.id}</div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 text-center text-xs text-gray-500">
        {open ? "Footer" : "F"}
      </div>
    </aside>
  );
}