"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Package, Campaign } from "@/types/product";

export interface CartItem {
  id: string;
  type: "package" | "campaign";
  name: string;
  price: number;
  quantity: number;
  data: Package | Campaign;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Package | Campaign, type: "package" | "campaign") => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("lapoelectioncart_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lapoelectioncart_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Package | Campaign, type: "package" | "campaign") => {
    const itemId = `${type}-${item.id}`;
    
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      return [
        ...prevItems,
        {
          id: itemId,
          type,
          name: item.name,
          price: item.price,
          quantity: 1,
          data: item,
        },
      ];
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
