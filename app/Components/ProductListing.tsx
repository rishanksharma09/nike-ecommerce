"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import ProductCard from './ProductCard';
const ProductListing = ({productRows}:{productRows:any[]}) => {
    const router=useRouter();
    
    const handleProductSelection=(id:string)=>{
        router.push(`/products/${id}/null/null`)
    }
  return (
    <main className="min-h-screen flex bg-white text-neutral-900">
      {/* Left sidebar - static UI */}
      <aside className="hidden lg:block w-72 border-r border-neutral-200 px-6 py-8">

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-4">Filters</h3>
        <hr />
            <h4 className="text-xs font-medium text-neutral-600 my-3">Brands </h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Adidas</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Puma</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Nike</label>
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
            <h4 className="text-xs font-medium text-neutral-600 mb-3">Shop By Price</h4>
            <div className="text-sm text-neutral-500 space-y-2">
              <label className="flex items-center gap-3"><input type="checkbox" />Less than 5000</label>
              <label className="flex items-center gap-3"><input type="checkbox" />5000 - 10000</label>
              <label className="flex items-center gap-3"><input type="checkbox" />10000 - 15000</label>
              <label className="flex items-center gap-3"><input type="checkbox" />Over 15000</label>
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
            <div key={p.id} className=" justify-center items-center" 
            onClick={()=>handleProductSelection(p.id)}>
              
              <ProductCard
                title={p.name}
                category={p.description ?? ""}
                colors={p.colors}
                price={p.productVariants?.[0]?.price || 0}
                imageUrl={p.productImages?.[0]?.url}
                badge={
                  Math.random() > 0.8
                    ? "Best Seller"
                    : Math.random() > 0.85
                      ? "Extra 20% off"
                      : undefined
                }
              />

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
 

export default ProductListing
