"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import orderService from "@/services/orderService";

export function PendingResourcesModal() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for pending resources when user is authenticated
  // This runs on every mount, refresh, and login
  useEffect(() => {
    if (!isMounted || authLoading || !isAuthenticated) {
      return;
    }

    const checkPendingResources = async () => {
      try {
        setIsChecking(true);

        // Fetch user's orders
        const orders = await orderService.getMyOrders();

        // Find orders with pending resources (must be in pending_resources status)
        const pendingOrder = orders.find((order) =>
          order.status === 'pending_resources' &&
          order.items.some((item) => !item.resources_uploaded)
        );

        if (pendingOrder) {
          setPendingOrderId(pendingOrder.id);
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error checking pending resources:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkPendingResources();
  }, [isAuthenticated, authLoading, isMounted]);

  const handleHide = () => {
    setIsOpen(false);
  };

  const handleProceed = () => {
    if (pendingOrderId) {
      router.push(`/orders/${pendingOrderId}/upload`);
    }
    setIsOpen(false);
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted || !isOpen || isChecking) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-texture bg-white rounded-2xl shadow-2xl border-4 border-black overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-brand-orange text-white px-6 py-4 flex justify-between items-center border-b-4 border-black">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-laughter)" }}
          >
            RESOURCES PENDING!
          </h2>
          <button
            onClick={handleHide}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Resource Upload Required
                </h3>
                <p className="text-gray-700">
                  You haven&apos;t uploaded the required resources for your
                  order yet. Please submit all necessary files to proceed with
                  your campaign.
                </p>
              </div>
            </div>

            <div className="bg-brand-lime/20 rounded-lg p-4 border-2 border-brand-lime">
              <p className="text-sm font-medium text-gray-800">
                💡 Your order won&apos;t be processed until all resources are
                uploaded.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleHide}
              className="button-cutout bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 transition-colors"
            >
              Hide
            </button>
            <button
              onClick={handleProceed}
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
