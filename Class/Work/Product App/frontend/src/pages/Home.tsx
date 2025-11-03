import ProductCard from "@/components/custom/ProductCard"

export default function Home() {
  const products = [
    {
      name: "Wireless Headphones",
      price: 1999,
      description: "Noise cancelling, 20hr battery",
      image:
        "https://images.unsplash.com/photo-1580894894513-541e068a9b7e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Smart Watch",
      price: 2999,
      description: "Fitness tracking, waterproof",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7d3b2e2c8?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Bluetooth Speaker",
      price: 1499,
      description: "Compact design, powerful bass",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155223e9a8?auto=format&fit=crop&w=400&q=80",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
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
