import React, { useState } from "react";

export default function ChatInput({ onSubmit }){
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSubmit(t);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Ask a question..." className="flex-1 p-2 border rounded"/>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
    </form>
  );
}