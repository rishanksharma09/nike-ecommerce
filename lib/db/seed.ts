import { db } from "./db";
import {
  brands,
  genders,
  colors,
  sizes,
  categories,
  products,
  productVariants,
  productImages,
} from "./schema";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("🌱 Starting product seeding...");

  // 1️⃣ Base Data
  const brandIds = await db
    .insert(brands)
    .values([
      { id: uuidv4(), name: "Nike", slug: "nike" },
      { id: uuidv4(), name: "Adidas", slug: "adidas" },
      { id: uuidv4(), name: "Puma", slug: "puma" },
    ])
    .returning({ id: brands.id, name: brands.name });

  const genderIds = await db
    .insert(genders)
    .values([
      { id: uuidv4(), label: "male", slug: "male" },
      { id: uuidv4(), label: "female", slug: "female" },
      { id: uuidv4(), label: "unisex", slug: "unisex" },
    ])
    .returning({ id: genders.id, label: genders.label });

  const colorIds = await db
    .insert(colors)
    .values([
      { id: uuidv4(), name: "Black", slug: "black", hexCode: "#000000" },
      { id: uuidv4(), name: "White", slug: "white", hexCode: "#FFFFFF" },
      { id: uuidv4(), name: "Red", slug: "red", hexCode: "#FF0000" },
      { id: uuidv4(), name: "Blue", slug: "blue", hexCode: "#0000FF" },
      { id: uuidv4(), name: "Grey", slug: "grey", hexCode: "#808080" },
    ])
    .returning({ id: colors.id, name: colors.name });

  const sizeIds = await db
    .insert(sizes)
    .values([
      { id: uuidv4(), name: "UK-6", slug: "UK-6", sort_order: 1 },
      { id: uuidv4(), name: "UK-7", slug: "UK-7", sort_order: 2 },
      { id: uuidv4(), name: "UK-8", slug: "UK-8", sort_order: 3 },
      { id: uuidv4(), name: "UK-9", slug: "UK-9", sort_order: 4 },
      { id: uuidv4(), name: "UK-10", slug: "UK-10", sort_order: 5 },
    ])
    .returning({ id: sizes.id, name: sizes.name });

  const categoryIds = await db
    .insert(categories)
    .values([
      { id: uuidv4(), name: "Men", slug: "men" },
      { id: uuidv4(), name: "Women", slug: "women" },
      { id: uuidv4(), name: "Shoes", slug: "shoes" },
    ])
    .returning({ id: categories.id, name: categories.name });

  // 2️⃣ Generate multiple products
  const productList = [
    {
      name: "Nike Air Zoom Pegasus 40",
      description: "Lightweight running shoes designed for speed and comfort.",
      brand: "Nike",
      gender: "male",
      category: "Shoes",
      price: 11999,
      images: ["/shoes/shoe-1.webp", "/shoes/shoe-2.webp"],
    },
    {
      name: "Adidas Ultraboost 23",
      description: "Energy-returning cushioning for all-day wear.",
      brand: "Adidas",
      gender: "unisex",
      category: "Shoes",
      price: 13999,
      images: ["/shoes/shoe-3.webp", "/shoes/shoe-4.webp"],
    },
    {
      name: "Puma Velocity Nitro 2",
      description: "Performance running shoe with superior cushioning.",
      brand: "Puma",
      gender: "female",
      category: "Shoes",
      price: 9999,
      images: ["/shoes/shoe-5.avif", "/shoes/shoe-6.avif"],
    },
    {
      name: "Nike Air Max 270",
      description: "Signature Air unit for next-level comfort.",
      brand: "Nike",
      gender: "male",
      category: "Shoes",
      price: 12999,
      images: ["/shoes/shoe-7.avif"],
    },
    {
      name: "Adidas NMD_R1",
      description: "Modern streetwear sneaker with Boost midsole.",
      brand: "Adidas",
      gender: "unisex",
      category: "Shoes",
      price: 11499,
      images: ["/shoes/shoe-8.avif"],
    },
    {
      name: "Puma RS-X Reinvention",
      description: "Bold retro-futuristic style with chunky sole.",
      brand: "Puma",
      gender: "male",
      category: "Shoes",
      price: 8999,
      images: ["/shoes/shoe-9.avif"],
    },
    {
      name: "Nike Revolution 6",
      description: "Simple and comfortable everyday running shoe.",
      brand: "Nike",
      gender: "female",
      category: "Shoes",
      price: 7499,
      images: ["/shoes/shoe-10.avif"],
    },
  ];

  const createdProducts = [];
  for (const product of productList) {
    const brand = brandIds.find((b) => b.name === product.brand)!;
    const gender = genderIds.find((g) => g.label === product.gender)!;
    const category = categoryIds.find((c) => c.name === product.category)!;

    const [createdProduct] = await db
      .insert(products)
      .values({
        id: uuidv4(),
        name: product.name,
        description: product.description,
        categoryid: category.id,
        genderid: gender.id,
        brandid: brand.id,
        is_published: true,
      })
      .returning({ id: products.id });

    createdProducts.push(createdProduct);

    // Add Images
    await db.insert(productImages).values(
      product.images.map((url) => ({
        id: uuidv4(),
        productId: createdProduct.id,
        url,
      }))
    );

    // Add Variants
    const colorSubset = colorIds.slice(0, 3);
    const sizeSubset = sizeIds.slice(0, 3);

    const variantValues = [];
    for (const color of colorSubset) {
      for (const size of sizeSubset) {
        variantValues.push({
          id: uuidv4(),
          productId: createdProduct.id,
          sku: `${product.brand.toUpperCase()}-${product.name
            .split(" ")
            .join("-")
            .toUpperCase()}-${color.name.toUpperCase()}-${size.name}`,
          price: product.price,
          salePrice: product.price - 1000,
          colorId: color.id,
          sizeId: size.id,
          stockQuantity: Math.floor(Math.random() * 50) + 10,
        });
      }
    }

    await db.insert(productVariants).values(variantValues);
  }

  console.log(`✅ Seeded ${createdProducts.length} products successfully!`);
}

seed()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  })
  .finally(() => {
    process.exit(0);
  });
