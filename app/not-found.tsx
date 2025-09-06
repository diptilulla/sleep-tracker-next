import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <h1
        className="text-6xl font-bold text-gray-800"
      >
        404
      </h1>
      <p
        className="mt-4 text-lg text-gray-600"
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <div
        className="mt-6"
      >
        <Link
          href="/"
          className='inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-md font-medium shadow-md transition'
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
