import Image from "next/image";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-texture flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/Logo.svg"
          alt="Lapo Election Cart Logo"
          width={150}
          height={150}
          className="h-32 w-auto animate-pulse"
        />
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-brand-lime rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}
