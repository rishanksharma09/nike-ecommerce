"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [cartCount] = useState(2);

  const navLinks = [
    { name: "Men", href: "#" },
    { name: "Women", href: "#" },
    { name: "Kids", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm pl-15">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Image
          src="/nikeLogo.png"
          alt="Nike Logo"
          width={40}
          height={40}
          className="cursor-pointer"
        />
      </div>

      {/* Center: Nav Links */}
      <ul className="hidden md:flex gap-8 text-base-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="hover:text-gray-500 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right: Search + Cart */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-500 transition-colors">
          <Search className="w-4 h-4" /> 
          Search
        </button>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-500 transition-colors">
          <ShoppingBag className="w-4 h-4" />
          My Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
