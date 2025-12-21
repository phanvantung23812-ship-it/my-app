export default function DashboardLayout({children}: {children: React.ReactNode;}) 
{
  return (
    <section className="flex min-h-screen">
      {/* 左侧侧边栏 - 固定不动 */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="font-bold text-xl mb-6">管理后台</h2>
        <ul className="space-y-2">
          <li className="text-gray-700 font-medium">📊 数据概览</li>
          <li className="text-gray-500">⚙️ 设置</li>
          <li className="text-gray-500">👤 个人中心</li>
        </ul>
      </aside>
      
      {/* 右侧内容区 - 显示 page.tsx 的内容 */}
      <main className="flex-1 bg-white">
        {children}
      </main>
    </section>
  );
}