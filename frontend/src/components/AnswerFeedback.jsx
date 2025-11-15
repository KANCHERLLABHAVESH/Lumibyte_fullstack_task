import React, { useState } from "react";

export default function AnswerFeedback(){
  const [state, setState] = useState(null); // 'like' | 'dislike'

  return (
    <div className="mt-3 flex items-center gap-3">
      <button onClick={() => setState('like')} className={`px-2 py-1 rounded ${state==='like' ? 'bg-green-100' : 'bg-gray-100 dark:bg-gray-700'}`}>👍 Like</button>
      <button onClick={() => setState('dislike')} className={`px-2 py-1 rounded ${state==='dislike' ? 'bg-red-100' : 'bg-gray-100 dark:bg-gray-700'}`}>👎 Dislike</button>
      {state && <div className="text-sm text-gray-500">Thanks for your feedback!</div>}
    </div>
  );
}