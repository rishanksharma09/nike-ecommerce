// scripts/seed.ts
import { db } from "./db"; // your drizzle db instance
import {
  user,
  brands,
  genders,
  colors,
  sizes,
  categories,
  products,
  productVariants,
  productImages,
  carts,
  cartItems,
  addresses,
} from "./schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("🌱 Starting database seed...");

  // Base tables
  const brandIds = await db
    .insert(brands)
    .values([
      { id: uuidv4(), name: "Nike", slug: "nike" },
      { id: uuidv4(), name: "Adidas", slug: "adidas" },
      { id: uuidv4(), name: "Puma", slug: "puma" },
    ])
    .returning({ id: brands.id });

  const genderIds = await db
    .insert(genders)
    .values([
      { id: uuidv4(), label: "male", slug: "male" },
      { id: uuidv4(), label: "female", slug: "female" },
      { id: uuidv4(), label: "unisex", slug: "unisex" },
    ])
    .returning({ id: genders.id });

  const colorIds = await db
    .insert(colors)
    .values([
      { id: uuidv4(), name: "Black", slug: "black", hexCode: "#000000" },
      { id: uuidv4(), name: "White", slug: "white", hexCode: "#FFFFFF" },
      { id: uuidv4(), name: "Red", slug: "red", hexCode: "#FF0000" },
    ])
    .returning({ id: colors.id });

  const sizeIds = await db
    .insert(sizes)
    .values([
      { id: uuidv4(), name: "UK-7", slug: "UK-7", sort_order: 1 },
      { id: uuidv4(), name: "UK-8", slug: "UK-8", sort_order: 2 },
      { id: uuidv4(), name: "UK-9", slug: "UK-9", sort_order: 3 },
    ])
    .returning({ id: sizes.id });

  const categoryIds = await db
    .insert(categories)
    .values([
      { id: uuidv4(), name: "Men", slug: "men" },
      { id: uuidv4(), name: "Women", slug: "women" },
      { id: uuidv4(), name: "Shoes", slug: "shoes" },
    ])
    .returning({ id: categories.id });

//   // 2️⃣ One test user
//   const [newUser] = await db
//     .insert(user)
//     .values({
//       id: uuidv4(),
//       name: "Rishank",
//       email: "rishank@example.com",
//       emailVerified: true,
//     })
//     .returning({ id: user.id });

  // 3️⃣ Example products
  const [nikeProduct] = await db
    .insert(products)
    .values({
      id: uuidv4(),
      name: "Nike Air Zoom",
      description: "High performance running shoes",
      categoryid: categoryIds[2].id, // Shoes
      genderid: genderIds[0].id, // Male
      brandid: brandIds[0].id, // Nike
      is_published: true,
    })
    .returning({ id: products.id });

  const [adidasProduct] = await db
    .insert(products)
    .values({
      id: uuidv4(),
      name: "Adidas Ultraboost",
      description: "Comfort and style for everyday wear",
      categoryid: categoryIds[2].id,
      genderid: genderIds[2].id,
      brandid: brandIds[1].id,
      is_published: true,
    })
    .returning({ id: products.id });

  // 4️⃣ Product Variants
  const nikeVariants = await db
    .insert(productVariants)
    .values([
      {
        id: uuidv4(),
        productId: nikeProduct.id,
        sku: "NIKE-AIR-BLACK-UK8",
        price: 12000,
        salePrice: 9999,
        colorId: colorIds[0].id,
        sizeId: sizeIds[1].id,
        stockQuantity: 50,
      },
      {
        id: uuidv4(),
        productId: nikeProduct.id,
        sku: "NIKE-AIR-RED-UK7",
        price: 12000,
        colorId: colorIds[2].id,
        sizeId: sizeIds[0].id,
        stockQuantity: 30,
      },
    ])
    .returning({ id: productVariants.id });

  // 5️⃣ Product Images
  await db.insert(productImages).values([
    {
      id: uuidv4(),
      productId: nikeProduct.id,
      variantId: nikeVariants[0].id,
      url: "public/shoes/shoe-4.webp",
    },
    {
      id: uuidv4(),
      productId: adidasProduct.id,
      url: "public/shoes/shoe-3.webp",
    },
  ]);

  // 6️⃣ Create cart for user
//   const [cart] = await db
//     .insert(carts)
//     .values({ id: uuidv4(), userId: newUser.id })
//     .returning({ id: carts.id });

//   // 7️⃣ Add item to cart
//   await db.insert(cartItems).values({
//     id: uuidv4(),
//     cartId: cart.id,
//     productVariantId: nikeVariants[0].id,
//     quantity: 2,
//   });

//   // 8️⃣ Add address
//   await db.insert(addresses).values({
//     id: uuidv4(),
//     userId: newUser.id,
//     line1: "123 Main St",
//     line2: "Near Mall Road",
//     city: "Amritsar",
//     state: "Punjab",
//     country: "India",
//     zip: "143001",
//     isDefault: true,
//   });

  console.log("✅ Database seeding completed successfully!");
}

seed()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  })
  .finally(() => {
    process.exit(0);
  });
