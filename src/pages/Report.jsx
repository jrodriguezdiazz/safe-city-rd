export default function Report() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Map Placeholder */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-blue-600 bg-opacity-70 rounded-full border-2 border-white animate-pulse" />
        </div>
      </div>
    </div>
  );
}
