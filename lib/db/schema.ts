
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer,jsonb,pgEnum } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core/columns/uuid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});



export const carts = pgTable(
  "carts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);


export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull().unique(),
    price: integer("price").notNull(),
    salePrice: integer("sale_price"),
    colorId: uuid("color_id").notNull().references(() => colors.id, { onDelete: "cascade" }),
    sizeId: uuid("size_id").notNull().references(() => sizes.id, { onDelete: "cascade" }),
    stockQuantity: integer("stock_quantity").notNull(),
    weight: integer("weight"),
    dimensions: jsonb("dimensions"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);



export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cartId: uuid("cart_id").notNull().references(() => carts.id, { onDelete: "cascade" }),
    productVariantId: uuid("product_variant_id").notNull().references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    line1: text("line1").notNull(),
    line2: text("line2").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    zip: text("zip").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);


 export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categoryid: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    genderid: uuid("gender_id").notNull().references(() => genders.id, { onDelete: "cascade" }),
    brandid: uuid("brand_id").notNull().references(() => brands.id, { onDelete: "cascade" }),
    is_published: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);

export const genderEnum = pgEnum("gender_enum", ["male", "female", "unisex"]);

export const genders = pgTable(
  "genders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    label: genderEnum("label").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);
export const colors = pgTable(
  "colors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    hexCode: text("hex_code").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);

export const sizes = pgTable(
  "sizes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    sort_order: integer("sort_order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    parentCategoryId: uuid("parent_category_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);




export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);



// Relations

export const cartRelations = relations(carts, ({ one,many }) => ({
  user: one(user, {
    fields: [carts.userId],
    references: [user.id],
  }),
  cartItems: many(cartItems, {
    relationName: "cart_cartItems",
  }),
}));

export const userRelations = relations(user, ({ one,many }) => ({
  cart: one(carts, {
    fields: [user.id],
    references: [carts.userId],
  }),
  addresses: many(addresses, {
    relationName: "user_addresses",
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));


const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  productVariant: one(productVariants, {
  fields: [cartItems.productVariantId],
  references: [productVariants.id],
}),

}));


export const productVariantsRelations = relations(productVariants, ({ one,many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  colors: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
  sizes: one(sizes, {
    fields: [productVariants.sizeId],
    references: [sizes.id],
  }),
  productImages: many(productImages, {
    relationName: "productVariant_productImages",
  }),
  cartItems:many(cartItems, {
    relationName: "cartItem_productVariants", 
  }),
}));


export const colorsRelations = relations(colors, ({ many }) => ({
  productVariants: many(productVariants, {
    relationName: "color_productVariants",
  }),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  productVariants: many(productVariants, {
    relationName: "size_productVariants",
  }),
}));


export const productRelations = relations(products, ({ one,many }) => ({
  brand: one(brands, {
    fields: [products.brandid],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryid],
    references: [categories.id],
  }),
  gender: one(genders, {
    fields: [products.genderid],
    references: [genders.id],
  }),
  productVariants: many(productVariants),
  productImages: many(productImages)
}));


export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products, {
    relationName: "brand_products",
  }),
}));

export const gendersRelations = relations(genders, ({ many }) => ({
  products: many(products, {
    relationName: "gender_products",
  }),
}));

export const categoriesRelations2 = relations(categories, ({ many }) => ({
  products: many(products, {
    relationName: "category_products",
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  productVariant: one(productVariants, {
    fields: [productImages.variantId],
    references: [productVariants.id],
  }),
}));

export const categoriesrelations = relations(categories, ({one, many }) => ({
  parentCategory: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.id],
    relationName: "parentCategory",
  }),
  subCategories: many(categories, {
    relationName: "parentCategory",
  }),
}));