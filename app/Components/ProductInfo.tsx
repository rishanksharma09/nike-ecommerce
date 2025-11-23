"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import ColorFromHexcode from "./colorFromHexcode";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  description: string;
  variants: {
    variantId: string;
    color: { id: string; name: string };
    size: { id: string; name: string };
    images: { id: string; url: string }[];
    variantPrice: number;
    stock: number;
  }[];
  colorOptions: { id: string; name: string }[];
  sizeOptions: { id: string; name: string }[];
};

export default function ProductInfo({
  product,
  color,
  size,
}: {
  product: Product;
  color: string|null;
  size: string|null;
}) {
  const router = useRouter();


  const colorId = product.colorOptions.find(
  (c) => c.name.toLowerCase() === color?.toLowerCase()
)?.id;

const sizeId = product.sizeOptions.find(
  (s) => s.name.toLowerCase() === size?.toLowerCase()
)?.id;


  // Load the variant from URL
  const initialVariant =
    product.variants.find(
      (v) => v.color.id === colorId && v.size.id === sizeId
    ) ?? product.variants[0];

  const [selectedColor, setSelectedColor] = useState(initialVariant.color.id);
  const [selectedSize, setSelectedSize] = useState(initialVariant.size.id);

  // Find matching variant
  const matchedVariant = useMemo(() => {
    return product.variants.find(
      (v) =>
        v.color.id === selectedColor && v.size.id === selectedSize
    );
  }, [selectedColor, selectedSize, product.variants]);

  // Select variant
  const [variant, setVariant] = useState(initialVariant);
  const [selectedImage, setSelectedImage] = useState(
    initialVariant.images[0].url
  );

  // Sync UI when match changes
  useEffect(() => {
    if (matchedVariant) {
      setVariant(matchedVariant);
      setSelectedImage(matchedVariant.images[0].url);
    }
  }, [matchedVariant]);

  // ⭐ Update URL dynamically when user selects color/size
  useEffect(() => {
    router.replace(
  `/product/${product.id}/${variant.color.name.toLowerCase()}/${variant.size.name.toLowerCase()}`
);
  }, [selectedColor, selectedSize]);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — Images */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 h-[500px]">
            {variant.images.map((img) => (
              <div
                key={img.id}
                className="relative w-20 h-20 border rounded-md cursor-pointer"
                onClick={() => setSelectedImage(img.url)}
              >
                <Image
                  src={img.url}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <p className="text-2xl font-semibold">₹{variant.variantPrice}</p>

          {/* COLORS */}
          <div>
            <h4 className="text-sm font-medium mb-2">Available Colors</h4>
            <div className="flex gap-2">
              {product.colorOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`w-12 h-12 rounded-md border 
                    ${selectedColor === c.id ? "ring-2 ring-black" : ""}`}
                >
                  <ColorFromHexcode color={c.name} />
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h4 className="text-sm font-medium mb-2">Select Size</h4>

            <div className="grid grid-cols-6 gap-2">
              {product.sizeOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.id)}
                  className={`border rounded-md py-2 text-sm font-medium
                    ${selectedSize === s.id ? "bg-black text-white" : ""}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <Button className="bg-black text-white w-full py-3 rounded-full">
            Add to Bag
          </Button>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-2">Product Details</h3>
            <p className="text-sm text-neutral-600">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
