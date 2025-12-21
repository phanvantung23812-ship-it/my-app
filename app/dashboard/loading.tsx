export default function Loading() {
  // 这是一个简单的骨架屏效果
  return (
    <div className="p-10">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg h-32 bg-gray-100 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}