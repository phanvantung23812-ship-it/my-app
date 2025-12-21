// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. 创建第一条数据
  const todo1 = await prisma.todo.create({
    data: {
      content: '我是通过代码创建的任务 1',
    },
  });
  console.log('✅ 成功创建:', todo1);

  // 2. 创建第二条数据
  const todo2 = await prisma.todo.create({
    data: {
      content: '学习 Next.js 真的很酷',
      completed: true, // 这一条设为已完成
    },
  });
  console.log('✅ 成功创建:', todo2);
}

main()
  .catch((e) => {
    console.error('❌ 报错了:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });