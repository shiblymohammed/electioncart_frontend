"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { CheckoutModal } from "./CheckoutModal";

export function CartModal() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    closeCart,
  } = useCart();

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-texture bg-brand-gray rounded-2xl shadow-2xl border-4 border-black overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-brand-orange text-white px-6 py-4 flex justify-between items-center border-b-4 border-black">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-laughter)" }}>
            YOUR CART
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl font-bold text-gray-600">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add some packages or campaigns to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 border-4 border-black flex items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                    <p className="text-lg font-bold text-brand-orange mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-purple transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-purple transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-white border-t-4 border-black px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Total:</span>
              <span
                className="text-4xl font-black text-brand-orange"
                style={{ fontFamily: "var(--font-laughter)" }}
              >
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={clearCart}
                className="button-cutout bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  setIsCheckoutOpen(true);
                  closeCart();
                }}
                className="button-cutout bg-gradient-to-b from-brand-lime to-brand-orange from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black py-3"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

        </div>
      )}

      {/* Checkout Modal - Outside cart modal so it persists */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
