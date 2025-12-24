'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
// 👇 1. 引入这两个 Hook
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // 👇 2. 创建一个“锚点”引用
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 👇 3. 监听 messages 变化：只要消息变了，就滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // 1. 最外层容器：占满屏幕高度 (h-screen)，限制最大宽度
    <div className="flex flex-col h-screen w-full md:max-w-3xl lg:max-w-4xl mx-auto border-x border-gray-100 bg-white">
      
      {/* 2. 聊天记录区域：flex-1 让它占据剩余所有空间，overflow-y-auto 允许内部滚动 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-lg p-3 ${
                m.role === 'user' 
                  ? 'bg-blue-500 text-white'  // 用户气泡颜色
                  : 'bg-gray-100 text-black'  // AI 气泡颜色
              }`}
            >
              {/* 如果是 AI，渲染 Markdown；如果是用户，直接显示文本 */}
              {m.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </div>
          </div>
        ))}
        {/* 锚点：用于自动滚动 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. 底部输入框区域：不再是 fixed，而是自然跟在聊天记录下面 */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="relative">
          <input
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          {/* 发送按钮图标（可选） */}
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500">
            Send
          </button>
        </form>
      </div>
      
    </div>
  );
}