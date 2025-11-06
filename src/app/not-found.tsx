import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
