export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center z-50 transition-colors duration-500">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-gray-100 dark:border-zinc-800 rounded-full transition-colors duration-500"></div>

        <div className="absolute inset-0 border-2 border-t-black dark:border-t-white rounded-full animate-spin transition-colors duration-500"></div>
      </div>

      <p className="mt-6 text-sm font-medium tracking-[0.2em] uppercase text-gray-400 dark:text-zinc-500 animate-pulse transition-colors duration-500">
        Loading
      </p>
    </div>
  );
}
