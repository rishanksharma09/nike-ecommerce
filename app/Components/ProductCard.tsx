"use client";

import Image from "next/image";
import React from "react";

interface ProductCardProps {
  title: string;
  category: string;
  colors: number;
  price: number;
  imageUrl: string;
  badge?: string; // Optional label like "Best Seller"
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  colors,
  price,
  imageUrl,
  badge,
}) => {
  return (
    <div className="max-w-xs w-2xs h-[50vh] rounded-md bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300  relative cursor-pointer ">
      {/* Badge */}
      {badge && (
        <span className="absolute z-40 bg-red-100   text-red-600 font-semibold text-xs px-3 py-1 rounded-full top-3 left-3">
          {badge}
        </span>
      )}

      {/* Product Image */}
      <div className="overflow-hidden ">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-64 hover:scale-105 transition-scale duration-300 "
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-1 z-50  ">
        <div className="flex justify-between items-start">
          <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
          <p className="text-gray-900 font-semibold">₹{price.toFixed(2)}</p>
        </div>

        <p className="text-gray-500 text-sm">{category}</p>
        <p className="text-gray-500 text-sm">{colors} Colour</p>
      </div>
    </div>
  );
};

export default ProductCard;
