import React from "react"

interface ProductCardProps {
  name: string
  price: number
  description?: string
  image?: string
}

export default function ProductCard({
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  return (
    <div className="rounded-2xl shadow-md border p-4 w-64 bg-card text-card-foreground hover:shadow-lg transition-all duration-300">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-primary">₹{price}</span>
        <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
