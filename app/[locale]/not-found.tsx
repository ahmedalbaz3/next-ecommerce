import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-6xl font-black">404</h1>
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-6 py-2 rounded-full mt-4"
      >
        Back to Home
      </Link>
    </div>
  );
}
