import React from "react";
import { useUser } from "@/context/UserContext";
import ProductCard from "@/components/custom/ProductCard";

export default function Home() {
  const { products, fetchProducts } = useUser()!;

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Featured Products
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  )
}
