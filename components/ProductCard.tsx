type Product = {
  name: string
  price: string
  inStock: boolean
  note?: string
  image?: string
}
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card overflow-hidden">
      {product.image && (
        <div className="mb-3 -mx-4 -mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{product.name}</p>
          {product.note && <p className="text-sm text-gray-600 mt-1">{product.note}</p>}
          <p className="mt-2 text-xs">
            {product.inStock ? <span className="badge">In Stock</span> : <span className="badge">Out of Stock</span>}
          </p>
        </div>
        <p className="font-semibold">{product.price}</p>
      </div>
    </div>
  )
}
