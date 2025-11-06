'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center px-4">
        <h2 className="text-4xl font-bold mb-4 text-white">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">We apologize for the inconvenience.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
