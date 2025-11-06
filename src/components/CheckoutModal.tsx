"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRazorpay } from "@/hooks/useRazorpay";
import { X } from "lucide-react";
import orderService from "@/services/orderService";
import cartService from "@/services/cartService";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const isRazorpayLoaded = useRazorpay();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please login to continue with checkout");
      return;
    }

    if (!isRazorpayLoaded) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      // Sync cart with backend before creating order
      console.log("Syncing cart with backend...");
      
      // Clear backend cart first
      try {
        await cartService.clearCart();
      } catch (error) {
        // If cart doesn't exist, that's fine - we'll create it
        const err = error as { response?: { status?: number } };
        if (err.response?.status !== 404) {
          throw error;
        }
      }
      
      // Add all items to backend cart
      for (const item of items) {
        await cartService.addToCart({
          item_type: item.type,
          item_id: parseInt(item.id.split("-")[1]),
          quantity: item.quantity,
        });
      }
      
      console.log("Cart synced successfully");
      
      // Create order on backend (it will use items from the backend cart)
      const orderResponse = await orderService.createOrder();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderResponse.amount,
        currency: "INR",
        name: "Lapo Election Cart",
        description: "Order Payment",
        order_id: orderResponse.razorpay_order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Verify payment on backend
            const verificationResponse = await orderService.verifyPayment(
              orderResponse.order.id,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verificationResponse.success) {
              clearCart();
              onClose();
              // Redirect to resource upload page
              router.push(`/orders/${orderResponse.order.id}/upload`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.username || "",
          contact: user?.phone_number || "",
        },
        theme: {
          color: "#FF7A51",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      const err = error as { response?: { data?: { message?: string; error?: string } } };
      console.error("Error response:", err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to initiate payment. Please try again.";
      alert(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-texture bg-brand-gray rounded-2xl shadow-2xl border-4 border-black overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-brand-purple text-white px-6 py-4 flex justify-between items-center border-b-4 border-black">
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-laughter)" }}
          >
            CHECKOUT
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 border-4 border-black">
            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b border-gray-200"
                >
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {item.type} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-xl text-brand-orange">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-black">
              <span className="text-2xl font-bold">Total Amount:</span>
              <span
                className="text-4xl font-black text-brand-orange"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-6 bg-brand-lime/20 rounded-xl p-6 border-4 border-black">
            <p className="text-center text-lg font-bold">
              Click &quot;Proceed to Payment&quot; to complete your order
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t-4 border-black px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="button-cutout bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black py-3 text-xl disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Proceed to Payment - ₹${totalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
