type data={
    productInfo: {
        id: string;
        name: string;
        description: string;
        categoryid: string;
        genderid: string;
        brandid: string;
        is_published: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    productVariants: {
        id: string;
        price: number;
        stockQuantity: number;
        colorId: string;
        sizeId: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        salePrice: number | null;
        weight: number | null;
        dimensions: unknown;
        colors: {
            id: string;
            name: string;
        };
        sizes: {
            id: string;
            name: string;
        };
        productImages: {
            id: string;
            url: string;
        }[];
    }[];
} | null



export function normalizeProduct(data:data) {
    if(!data){
        throw new Error("No product found")
    }
  const { productInfo, productVariants } = data;

   if (!productVariants || productVariants.length === 0) {
    throw new Error("This product has no variants");
  }

  // Extract all images for default (first) variant
  const defaultVariant = productVariants[0];

  return {
    id: productInfo.id,
    name: productInfo.name,
    description: productInfo.description,
    price: defaultVariant.price,

    variants: productVariants.map(v => ({
      variantId: v.id,
      color: { id: v.colors.id, name: v.colors.name },
      size: { id: v.sizes.id, name: v.sizes.name },
      variantPrice: v.price,
      images: v.productImages.map(img => ({id: img.id, url: img.url})),
      stock: v.stockQuantity
    })),

    // Unique colors for UI
    colorOptions: Array.from(
      new Map(
        productVariants.map(v => [v.colorId, v.colors])
      ).values()
    ),

    // Unique sizes for UI
    sizeOptions: Array.from(
      new Map(
        productVariants.map(v => [v.sizeId, v.sizes])
      ).values()
    ),

    // Default variant
    defaultVariantId: defaultVariant.id,
  };
}
