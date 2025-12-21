import Link from 'next/link';
import Counter from './Counter'; // 引入组件
import { prisma } from '@/lib/prisma'; // 👈 引入刚才创建的客户端
import { addTodo, deleteTodo, toggleTodo } from '@/app/actions'; // 引入刚才写的动作



// 1. 模拟一个获取数据的函数 (模拟 API 请求)
// 在真实项目中，这里会替换成数据库查询 (prisma.user.findMany)
async function getUsers() {
  // 人为制造 2 秒延迟，为了让你看清加载效果
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 请求一个公共的测试 API
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  console.log('111',res)
  if (!res.ok) {
    // 这里的错误会激活 error.tsx (如果我们创建了的话)
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}
// 2. 组件变成 async function
export default async function DashboardPage() {
  // 3. 直接在组件里 await 数据！
  // 在数据回来之前，服务器不会给浏览器发送这个页面的 HTML
  // const users = await getUsers();
  // console.log('222',users)
  // const res = await fetch('https://jsonplaceholder.typicode.com/users')
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  // const center = await res.json()


  // 👇 见证奇迹的时刻：
  // 不需要 fetch，不需要 URL，像调用函数一样直接读数据库！
  // SQL: SELECT * FROM Todo ORDER BY createdAt DESC;
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc', // 按创建时间倒序
    },
  });
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">我的任务清单 ✅</h1>
      {/* 🟢 1. 添加任务区域 */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        {/* action={addTodo}：表单提交时，直接调用服务端的 addTodo 函数 */}
        <form action={addTodo} className="flex gap-2">
          <input
            name="content" // 这个名字必须和 actions.ts 里的 formData.get('content') 一样
            type="text"
            placeholder="输入新任务..."
            className="flex-1 p-2 border rounded border-gray-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            添加
          </button>
        </form>
      </div>

      {/* 📋 2. 任务列表区域 */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 border rounded shadow-sm flex justify-between items-center bg-white transition-all ${
              todo.completed ? "bg-gray-50 opacity-75" : ""
            }`}
          >
            {/* 左侧：复选框 + 文字 */}
            <form action={toggleTodo} className="flex items-center gap-3">
              {/* 隐藏的 input，用来传参数给后端 */}
              <input type="hidden" name="id" value={todo.id} />
              <input type="hidden" name="completed" value={String(todo.completed)} />
              
              <button 
                type="submit" 
                className={`w-6 h-6 border rounded-full flex items-center justify-center cursor-pointer ${todo.completed ? "bg-green-500 border-green-500" : "border-gray-400"}`}
              >
                {todo.completed && <span className="text-white text-xs">✓</span>}
              </button>
              
              <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>
                {todo.content}
              </span>
            </form>

            {/* 右侧：删除按钮 */}
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 text-sm px-3 py-1 bg-red-50 hover:bg-red-100 rounded"
              >
                删除
              </button>
            </form>
          </div>
        ))}
        
        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-10">还没有任务，快添加一个吧！🚀</p>
        )}
      </div>


      
      {/* <h1 className="text-3xl font-bold mb-4">我的仪表盘 (Dashboard)</h1>
      <p className="mb-4">恭喜！你已经成功创建了第一个服务端渲染页面。</p> */}

      {/* 服务器组件不能写交互 */}
      {/* <button onClick={() => alert('你好')}>点我</button> */}

      {/* 这是一个客户端组件（有交互） */}
      {/* <Counter /> */}

      {/* Link 组件用于无刷新跳转 */}
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        &larr; 返回首页
      </Link>
    </div>
  );
}






// export default async function DashboardPage() {
//   const todos = await prisma.todo.findMany({
//     orderBy: { createdAt: 'desc' },
//   });

//   return (
//     <div className="p-10 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">我的任务清单 ✅</h1>

//       {/* 🟢 1. 添加任务区域 */}
//       <div className="mb-8 p-4 bg-gray-100 rounded-lg">
//         {/* action={addTodo}：表单提交时，直接调用服务端的 addTodo 函数 */}
//         <form action={addTodo} className="flex gap-2">
//           <input
//             name="content" // 这个名字必须和 actions.ts 里的 formData.get('content') 一样
//             type="text"
//             placeholder="输入新任务..."
//             className="flex-1 p-2 border rounded border-gray-300"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             添加
//           </button>
//         </form>
//       </div>

//       {/* 📋 2. 任务列表区域 */}
//       <div className="space-y-3">
//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className={`p-4 border rounded shadow-sm flex justify-between items-center bg-white transition-all ${
//               todo.completed ? "bg-gray-50 opacity-75" : ""
//             }`}
//           >
//             {/* 左侧：复选框 + 文字 */}
//             <form action={toggleTodo} className="flex items-center gap-3">
//               {/* 隐藏的 input，用来传参数给后端 */}
//               <input type="hidden" name="id" value={todo.id} />
//               <input type="hidden" name="completed" value={String(todo.completed)} />
              
//               <button 
//                 type="submit" 
//                 className={`w-6 h-6 border rounded-full flex items-center justify-center cursor-pointer ${todo.completed ? "bg-green-500 border-green-500" : "border-gray-400"}`}
//               >
//                 {todo.completed && <span className="text-white text-xs">✓</span>}
//               </button>
              
//               <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>
//                 {todo.content}
//               </span>
//             </form>

//             {/* 右侧：删除按钮 */}
//             <form action={deleteTodo}>
//               <input type="hidden" name="id" value={todo.id} />
//               <button
//                 type="submit"
//                 className="text-red-500 hover:text-red-700 text-sm px-3 py-1 bg-red-50 hover:bg-red-100 rounded"
//               >
//                 删除
//               </button>
//             </form>
//           </div>
//         ))}
        
//         {todos.length === 0 && (
//             <p className="text-center text-gray-500 mt-10">还没有任务，快添加一个吧！🚀</p>
//         )}
//       </div>

//       <div className="mt-8 text-center">
//         <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
//           &larr; 返回首页
//         </Link>
//       </div>
//     </div>
//   );
// }