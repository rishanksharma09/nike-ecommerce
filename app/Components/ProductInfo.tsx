"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import ColorFromHexcode from './colorFromHexcode';
import { Button } from '@/components/ui/button';

type Product = {
  name: string;
  price: number;
  description: string;
  images: string[];
  colorOptions: string[];
  sizes: string[];
};

const ProductInfo = ({product}:{product:Product}) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SECTION — IMAGE GALLERY */}
        <div className="flex gap-6 ">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 h-[500px]">
            {product.images.map((img) => (
              <div
                key={img}
                className={`relative w-20 h-20 border rounded-md cursor-pointer `}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
            />
          </div>
        </div>

        {/* RIGHT SECTION — DETAILS */}
        <div className="flex flex-col justify-start space-y-6">
          {/* Header */}
          {/* <div>
            <span className="inline-block bg-neutral-100 text-neutral-700 text-xs px-3 py-1 rounded-full mb-2">
              Highly Rated
            </span>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-neutral-500">{product.category}</p>
          </div> */}

          {/* Price */}
          <div>
            <p className="text-2xl font-semibold">${product.price}</p>
            {/* <p className="text-green-600 text-sm">{product.discountText}</p> */}
          </div>

          {/* Color Options */}
          <div>
            <h4 className="text-sm font-medium mb-2">Available Colors</h4>
            <div className="flex gap-2">
              {product.colorOptions.map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 rounded-md border border-neutral-300 cursor-pointer overflow-hidden"
                >
                  <ColorFromHexcode color={color} />
                  {/* <Image
                    src={color}
                    alt="color option"
                    width={48}
                    height={48}
                    className="object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h4 className="text-sm font-medium mb-2">Select Size</h4>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">
              Size Guide
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Button className="w-full bg-black text-white py-3 rounded-full hover:bg-neutral-800">
              Add to Bag
            </Button>
            <Button
              variant="outline"
              className="w-full border border-neutral-400 py-3 rounded-full"
            >
              Favorite ♥
            </Button>
          </div>

          {/* Product Details */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-sm font-medium mb-2">Product Details</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            <ul className="list-disc list-inside text-sm mt-3 text-neutral-600">
              <li>Padded collar</li>
              <li>Foam midsole</li>
              <li>
                Shown: Dark Team Red / Platinum Tint / Pure Platinum / White
              </li>
              <li>Style: HM8451-600</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
  
}

export default ProductInfo
