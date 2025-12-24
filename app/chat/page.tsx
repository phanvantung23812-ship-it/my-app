'use client'; 
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
// 👇 1. 引入这两个 Hook
import { useEffect, useRef } from 'react';
export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // 👇 2. 创建一个“锚点”引用
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 👇 3. 监听 messages 变化：只要消息变了，就滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-24 stretch">
      <h1 className="text-2xl font-bold text-center mb-8">AI 助手</h1>

      <div className="space-y-4 mb-24">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div className={`font-bold ${m.role === 'user' ? 'text-blue-500' : 'text-green-600'}`}>
              {m.role === 'user' ? '我: ' : 'AI: '}
            </div>

            {/* // ❌ 原来的写法（可能长这样）：
            // <div className="whitespace-pre-wrap">{m.content}</div>

            // ✅ 改成这样（加上样式）： */}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      
      {/* 👇 4. 在列表最后面加一个看不见的 div 作为锚点 */}
      <div ref={messagesEndRef} />

      <form 
        onSubmit={(e) => {
           console.log("👉 用户点击了发送！正在呼叫后端..."); 
           handleSubmit(e);
        }} 
        className="fixed bottom-0 w-full max-w-md p-2 mb-8 bg-white border border-gray-300 rounded shadow-xl"
      >
        <input
          className="w-full p-2"
          value={input}
          placeholder="说点什么..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}