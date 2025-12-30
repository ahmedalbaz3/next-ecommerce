import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <h1 className="text-6xl font-black text-black dark:text-white transition-colors">
        404
      </h1>
      <h2 className="text-xl font-semibold text-black dark:text-white transition-colors">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-zinc-400 transition-colors">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full mt-4 font-bold transition-all duration-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
