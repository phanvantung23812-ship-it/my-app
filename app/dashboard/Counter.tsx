'use client'; // <--- 关键！这行字告诉 Next.js：这个组件要发给浏览器，允许有交互

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button 
      className="px-4 py-2 bg-green-500 text-white rounded mb-4 mr-4"
      onClick={() => setCount(count + 1)}
    >
      当前计数: {count}
    </button>
  );
}