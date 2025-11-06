"use client";

import { X } from "lucide-react";

interface ResourceUploadWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function ResourceUploadWarningModal({
  isOpen,
  onClose,
  onProceed,
}: ResourceUploadWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-texture bg-white rounded-2xl shadow-2xl border-4 border-black overflow-hidden">
        {/* Header */}
        <div className="bg-brand-orange text-white px-6 py-4 flex justify-between items-center border-b-4 border-black">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-laughter)" }}
          >
            RESOURCES PENDING!
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Resource Upload Required
                </h3>
                <p className="text-gray-700">
                  You haven&apos;t uploaded the required resources for your order yet. 
                  Please submit all necessary files to proceed with your campaign.
                </p>
              </div>
            </div>

            <div className="bg-brand-lime/20 rounded-lg p-4 border-2 border-brand-lime">
              <p className="text-sm font-medium text-gray-800">
                💡 Your order won&apos;t be processed until all resources are uploaded.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="button-cutout bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 transition-colors"
            >
              Later
            </button>
            <button
              onClick={onProceed}
              className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black py-3"
            >
              Upload Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
