'use client'

import React, { useState } from "react";
import Image from "next/image";
 
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button";

import ColorFromHexcode from "@/app/Components/colorFromHexcode";
import { getProductFromID } from "@/app/actions/product-page";
import ProductInfo from "@/app/Components/productInfo";
 
export default async function products() {
  const params = useParams<{ slug: string }>()
  const product = {
  name: "Nike Air Max 90 SE",
  category: "Women's Shoes",
  price: 140,
  discountText: "Extra 20% off w/ code SPORT",
  description:
    "The Air Max 90 stays true to its running roots with the iconic Waffle sole. Plus, stitched overlays and textured accents create the ’90s look you love. Complete with romantic hues, its visible Air cushioning adds comfort to your journey.",
  images: [
    "/shoes photos/color1.png",
    "/shoes photos/color1.png",
    "/shoes photos/color1.png",
    "/shoes photos/color1.png",
    "/shoes photos/color1.png",
    "/shoes photos/color1.png",
  ],
colorOptions: ["#0000FF", "#808080", "#000000", "#FF0000", "##FFFFFF"],
sizes: ["6", "7", "8", "9", "10"],
};

  const productInfo = await getProductFromID(params.slug)
    

 
    return productInfo
}