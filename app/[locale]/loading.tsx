export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-t-black rounded-full animate-spin"></div>
      </div>

      <p className="mt-6 text-sm font-medium tracking-[0.2em] uppercase text-gray-400 animate-pulse">
        Loading
      </p>
    </div>
  );
}
