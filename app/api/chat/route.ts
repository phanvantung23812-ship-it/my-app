import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("📨 收到请求，正在呼叫 DeepSeek...");

    // 👇 关键修改：这里必须加 await ！！！
    const result = await streamText({
      model: deepseek('deepseek-chat'), 
      messages,
    });

    // 现在 result 已经是准备好的结果了，可以转换成流了
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("❌ 报错:", error);
    return new Response("Server Error", { status: 500 });
  }
}