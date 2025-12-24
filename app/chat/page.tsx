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
    // 1. 全局深色背景 (Gemini 的标志性黑灰)
    <div className="flex flex-col h-screen w-full bg-[#131314] text-gray-100">
      
      {/* 2. 中间内容区 */}
      <div className="flex-1 overflow-y-auto">
        
        {/* === 核心逻辑：判断有没有消息 === */}
        {messages.length === 0 ? (
          // A. 如果没消息：显示“欢迎屏幕” (模仿 Gemini 的 Start Screen)
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-5xl font-semibold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
              Hello, Human
            </h1>
            <p className="text-gray-500 text-lg">How can I help you today?</p>
          </div>
        ) : (
          // B. 如果有消息：显示“聊天记录”
          <div className="w-full max-w-3xl mx-auto p-4 space-y-6 pt-10 pb-24">
            {messages.map(m => (
              <div key={m.id} className="flex flex-col gap-2">
                {/* 名字 */}
                <div className={`font-semibold text-sm ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.role === 'user' ? 'You' : 'Gemini'}
                </div>
                
                {/* 气泡/内容 */}
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                      m.role === 'user' 
                        ? 'bg-[#282A2C] text-white rounded-br-none' // 用户：深灰气泡
                        : 'bg-transparent text-gray-100 pl-0'       // AI：透明背景，纯文字
                    }`}
                  >
                     <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                     </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 3. 底部输入框 (Gemini 的悬浮胶囊风格) */}
      <div className="p-4 bg-[#131314]">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto relative">
          {/* 输入框本体：深灰背景 + 极大圆角 (rounded-full) */}
          <input
            className="w-full bg-[#1E1F20] text-gray-100 rounded-full py-4 px-6 pr-14 border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-0 shadow-lg transition-colors"
            value={input}
            placeholder="Ask Gemini..."
            onChange={handleInputChange}
          />
          {/* 发送按钮图标 */}
          <button 
            type="submit" 
            disabled={!input}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </form>
        <div className="text-center text-xs text-gray-500 mt-2">
           Gemini may display inaccurate info, including about people, so double-check its responses.
        </div>
      </div>
      
    </div>
  );
}