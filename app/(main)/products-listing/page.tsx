// app/page.tsx
import React from "react";
import ProductCard  from "../../Components/ProductCard";
import { db } from "../../../lib/db/db";
import {
  products as productsTable,
  productVariants as productVariantsTable,
  productImages as productImagesTable,
} from "../../../lib/db/schema";
import { getProductListingData } from "@/app/actions/product-listing-data";

export default async function Page() {
//   // Fetch some published products (server component)
//   const productRows = await db.query.products.findMany({
//     where: (p, { eq }) => eq(p.is_published, true),
//     limit: 12,
//   });

//   // For each product, fetch first variant and first image (N small queries).
//   // This is simple and fine for a small page seed; later you can batch join.
//   const enriched = await Promise.all(
//     productRows.map(async (p) => {
//       const variant = await db.query.productVariants.findFirst({
//         where: (v, { eq }) => eq(v.productId, p.id),
//       });

//       const image = await db.query.productImages.findFirst({
//         where: (img, { eq }) => eq(img.productId, p.id),
//       });

//       return {
//         id: p.id,
//         title: p.name,
//         subtitle: p.description ?? "",
//         price: variant?.price ?? null,
//         imageUrl: image?.url ?? "/placeholder-shoe.png", // fallback
//         badge: Math.random() > 0.8 ? "Best Seller" : Math.random() > 0.85 ? "Extra 20% off" : null, // demo badges
//         colorCount: Math.floor(Math.random() * 6) + 1,
//       };
//     })
//   );


    const productRows = await getProductListingData();
    

  return (
    <main className="min-h-screen flex bg-white text-neutral-900">
      {/* Left sidebar - static UI */}
      <aside className="hidden lg:block w-72 border-r border-neutral-200 px-6 py-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-4">New (500)</h3>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Low Top</label>
              <label className="flex items-center gap-3"><input type="checkbox" />High Top</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Skateboarding</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Nike By You</label>
            </div>
          </div>

          <hr />

          <div>
            <h4 className="text-xs font-medium text-neutral-600 mb-3">Gender</h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Men</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Women</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Unisex</label>
            </div>
          </div>

          <hr />

          <div>
            <h4 className="text-xs font-medium text-neutral-600 mb-3">Kids</h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Boys</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Girls</label>
            </div>
          </div>

          <hr />

          <div>
            <h4 className="text-xs font-medium text-neutral-600 mb-3">Shop By Price</h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />$25 - $50</label>
              <label className="flex items-center gap-3"><input type="checkbox" />$50 - $100</label>
              <label className="flex items-center gap-3"><input type="checkbox" />$100 - $150</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Over $150</label>
            </div>
          </div>

          <hr />

          <div>
            <h4 className="text-xs font-medium text-neutral-600 mb-3">Sports</h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Lifestyle</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Skateboarding</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Dance</label>
            </div>
          </div>
        </div>
      </aside>

      {/* Right side - products */}
      <section className="flex-1 px-6 py-8">
        {/* topbar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold">New ({productRows.length})</h1>
          </div>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <button className="hover:text-neutral-700">Hide Filters</button>
            <button className="hover:text-neutral-700">Sort By ▾</button>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productRows.map((p) => (
            <div key={p.id} className="bg-white shadow-sm rounded-sm">
              <ProductCard
                title={p.name}
                category={p.description ?? ""}
                colors={Math.floor(Math.random() * 6) + 1}
                price={Math.floor(Math.random() * 150) + 50}
                imageUrl={"/placeholder-shoe.png"}
                badge={Math.random() > 0.8 ? "Best Seller" : Math.random() > 0.85 ? "Extra 20% off" : undefined}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
