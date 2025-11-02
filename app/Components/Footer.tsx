"use client";

import Image from "next/image";
import { Facebook, Instagram, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6 pl-4">
      {/* Top section */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 border-b border-gray-700 pb-8">
        {/* Logo */}
        <div className="flex flex-col gap-4">
          <Image
            src="/logo.svg"
            alt="Nike Logo"
            width={100}
            height={100}
            className=""
          />
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-3">Featured</h3>
            <ul className="space-y-2 text-gray-500">
              <li>Air Force 1</li>
              <li>Huarache</li>
              <li>Air Max 90</li>
              <li>Air Max 95</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Shoes</h3>
            <ul className="space-y-2  text-gray-500">
              <li>All Shoes</li>
              <li>Custom Shoes</li>
              <li>Jordan Shoes</li>
              <li>Running Shoes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 ">Clothing</h3>
            <ul className="space-y-2 text-gray-500">
              <li>All Clothing</li>
              <li>Modest Wear</li>
              <li>Hoodies & Pullovers</li>
              <li>Shirts & Tops</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Kids'</h3>
            <ul className="space-y-2 text-gray-500">
              <li>Infant & Toddler Shoes</li>
              <li>Kids' Shoes</li>
              <li>Kids' Jordan Shoes</li>
              <li>Kids' Basketball Shoes</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-start gap-4">
          <a
            href="#"
            className="bg-white  hover:bg-gray-300 p-2 rounded-full text-black"
          >
            <X size={18} />
          </a>
          <a
            href="#"
            className="bg-white  hover:bg-gray-300 p-2 rounded-full text-black"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            className="bg-white  hover:bg-gray-300 p-2 rounded-full text-black"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <div className="flex items-center gap-2">
          <span>📍 Croatia</span>
          <span>© 2025 Nike, Inc. All Rights Reserved</span>
        </div>

        <ul className="flex flex-wrap gap-6">
          <li>Guides</li>
          <li>Terms of Sale</li>
          <li>Terms of Use</li>
          <li>Nike Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
