"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import clsx from "clsx";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { totalItems, openCart } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navigationItems = [
    { text: "Home", href: "/" },
    { text: "Packages", href: "/packages" },
    { text: "Campaigns", href: "/campaigns" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="header absolute left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group">
            <Image 
              src="/Logo.svg" 
              alt="Lapo Election Cart Logo" 
              width={120} 
              height={120} 
              className="h-12 sm:h-14 lg:h-16 w-auto transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                className="px-4 py-2 rounded-lg font-bold text-sm xl:text-base transition-all duration-200 text-white hover:bg-white/20"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Cart Button - Always visible */}
            <button
              onClick={openCart}
              className="button-cutout group relative inline-flex items-center justify-center bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-black hover:text-black w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Login/Profile Button - Hidden on mobile */}
            <div className="hidden lg:block">
              {isAuthenticated && user ? (
                <Link href="/profile">
                  <button className="button-cutout group inline-flex items-center bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white hover:text-black gap-2 px-4 py-2 text-sm rounded-lg">
                    <span>👤</span>
                    <span className="hidden xl:block">{user.username}</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="button-cutout group inline-flex items-center bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white hover:text-black gap-2 px-4 py-2 text-sm rounded-lg"
                >
                  <span>🔐</span>
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden button-cutout group relative inline-flex items-center justify-center bg-gradient-to-b from-brand-blue to-brand-purple from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white hover:text-black w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
                <span className={clsx(
                  "block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                )} />
                <span className={clsx(
                  "block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                )} />
                <span className={clsx(
                  "block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          {
            "opacity-100 pointer-events-auto": isMobileMenuOpen,
            "opacity-0 pointer-events-none": !isMobileMenuOpen,
          }
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white bg-texture shadow-2xl transition-transform duration-300 ease-out",
            {
              "transform translate-x-0": isMobileMenuOpen,
              "transform translate-x-full": !isMobileMenuOpen,
            }
          )}
        >
          <div className="flex flex-col h-full">
            
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-brand-purple">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-brand-purple hover:bg-brand-purple/10 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg font-bold transition-all duration-200 text-lg text-brand-purple hover:bg-brand-purple/10 hover:text-brand-navy"
                >
                  {item.text}
                </Link>
              ))}
            </nav>

            {/* Mobile Action Buttons */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              {isAuthenticated && user ? (
                <Link href="/profile" className="block">
                  <button className="w-full button-cutout group inline-flex items-center justify-center bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white hover:text-black gap-3 px-6 py-3 text-lg rounded-lg">
                    <span>👤</span>
                    <span>{user.username}</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full button-cutout group inline-flex items-center justify-center bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-all duration-300 hover:bg-bottom text-white hover:text-black gap-3 px-6 py-3 text-lg rounded-lg"
                >
                  <span>🔐</span>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
