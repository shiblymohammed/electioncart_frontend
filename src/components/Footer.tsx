"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bounded } from "./Bounded";

const navigationItems = [
  { text: "Home", href: "/" },
  { text: "Packages", href: "/packages" },
  { text: "Campaigns", href: "/campaigns" },
  { text: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[30vh] flex items-center justify-center p-6 md:p-10">
        <Image 
          src="/Logo.svg" 
          alt="Lapo Election Cart Logo" 
          width={200} 
          height={200} 
          className="relative h-24 md:h-32 w-auto z-10" 
        />
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 text-lg md:text-xl">
          {navigationItems.map((item) => (
            <li key={item.text} className="hover:underline transition-all hover:text-brand-lime">
              <Link href={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lapo Election Cart. All rights reserved.</p>
        </div>
      </Bounded>
    </footer>
  );
}
