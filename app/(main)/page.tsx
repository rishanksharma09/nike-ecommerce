import ProductCard from "../Components/ProductCard";

export default function Home() {
  const products = [
    {
      title: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      colors: 6,
      price: 98.3,
      imageUrl: "/shoes/shoe-1.jpg",
      badge: "Best Seller",
      badgeColor: "red",
    },
    {
      title: "Nike Court Vision Low Next Nature",
      category: "Men's Shoes",
      colors: 4,
      price: 98.3,
      imageUrl: "/shoes/shoe-2.webp",
      badge: "Extra 20% off",
      badgeColor: "green",
    },
    {
      title: "Nike Dunk Low Retro",
      category: "Men's Shoes",
      colors: 6,
      price: 98.3,
      imageUrl: "/shoes/shoe-3.webp",
      badge: "Extra 10% off",
      badgeColor: "green",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black px-10 py-16">
      {/* Section Title */}
      <h1 className="text-2xl font-bold mb-10">Best of Air Max</h1>

      {/* Product Grid */}
      <div >

      <div className="flex justify-center items-center gap-10">
        {products.map((product, index) => (
          <ProductCard
          key={index}
          title={product.title}
          category={product.category}
          colors={product.colors}
          price={product.price}
          imageUrl={product.imageUrl}
          badge={product.badge}
          />
        ))}
      </div>
        </div>
    </main>
  );
}
