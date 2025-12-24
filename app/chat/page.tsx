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
    // 1. 全局极致深黑背景
    <div className="flex flex-col h-screen w-full bg-[#0a0a0a] text-gray-100 font-sans">
      
      {/* 2. 聊天区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] opacity-50">
               <div className="text-2xl font-medium">How can I help you today?</div>
            </div>
          )}

          {messages.map(m => (
            <div key={m.id} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* === 用户样式 (极简灰气泡) === */}
              {m.role === 'user' ? (
                <div className="max-w-[85%] bg-[#2f2f2f] text-white px-5 py-3 rounded-3xl rounded-tr-sm text-[15px] leading-relaxed">
                  {m.content}
                </div>
              ) : (
                
              /* === AI 样式 (图标 + 纯文字) === */
                <div className="flex gap-4 max-w-full md:max-w-[90%]">
                  {/* AI 的图标 (蓝色闪烁星星) */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-start pt-1">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#blue-gradient)" className="w-6 h-6 animate-pulse">
                        <defs>
                          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4b90ff" />
                            <stop offset="100%" stopColor="#4b90ff" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2C12 2 12.8 9.6 15.2 12C12.8 14.4 12 22 12 22C12 22 11.2 14.4 8.8 12C11.2 9.6 12 2 12 2Z" />
                        <path d="M18 14C18 14 18.4 16.4 19.2 17.2C18.4 18 18 20.4 18 20.4C18 20.4 17.6 18 16.8 17.2C17.6 16.4 18 14 18 14Z" opacity="0.6"/>
                     </svg>
                  </div>
                  
                  {/* AI 的文字 (无气泡，纯净 Markdown) */}
                  <div className="prose prose-invert prose-neutral max-w-none text-gray-200 leading-7">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. 输入框区域 (悬浮胶囊) */}
      <div className="p-4 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="w-full bg-[#1e1e1e] text-gray-100 rounded-full py-3.5 px-6 pr-12 border border-transparent focus:border-gray-600 focus:bg-[#2a2a2a] focus:outline-none transition-all placeholder-gray-500"
              value={input}
              placeholder="Message Gemini..."
              onChange={handleInputChange}
            />
            <button 
              type="submit" 
              disabled={!input}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-0 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-gray-600">
            Gemini can make mistakes, so double-check it.
          </div>
        </div>
      </div>
    </div>
  );
}