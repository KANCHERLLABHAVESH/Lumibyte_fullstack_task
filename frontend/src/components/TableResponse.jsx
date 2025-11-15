import React from "react";

export default function TableResponse({ columns = [], rows = [] }){
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((c,i)=> <th key={i} className="text-left px-3 py-2 border-b">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,ri)=>(
            <tr key={ri} className={ri%2===0 ? "bg-gray-50 dark:bg-gray-700" : ""}>
              {r.map((cell,ci)=> <td key={ci} className="px-3 py-2 border-b">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}