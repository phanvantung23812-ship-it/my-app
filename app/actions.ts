// app/actions.ts
'use server'; // 👈 这一行非常重要！标记这个文件里的函数都是在服务器运行的

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. 添加任务的动作
export async function addTodo(formData: FormData) {
  // 从表单数据里拿到输入框的值
  const content = formData.get("content") as string;

  if (!content) return;

  // 直接操作数据库
  await prisma.todo.create({
    data: {
      content: content,
    },
  });

  // 关键一步：告诉 Next.js "数据变了，请刷新 dashboard 页面"
  revalidatePath("/dashboard");
}

// 2. 删除任务的动作
export async function deleteTodo(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.todo.delete({
    where: {
      id: parseInt(id), // 把字符串转成数字
    },
  });

  revalidatePath("/dashboard");
}

// 3. 切换完成状态的动作
export async function toggleTodo(formData: FormData) {
  const id = formData.get("id") as string;
  const completed = formData.get("completed") === "true"; // 现在的状态

  await prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      completed: !completed, // 取反：如果是真变假，假变真
    },
  });

  revalidatePath("/dashboard");
}