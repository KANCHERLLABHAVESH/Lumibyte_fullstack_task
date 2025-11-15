import React, { useEffect, useState } from "react";

export default function ThemeToggle(){
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button onClick={() => setDark(d => !d)} className="px-3 py-1 border rounded">
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}