'use client'
import ProductCard from '../../components/ProductCard'
import { useCatalog } from '../../components/useCatalog'

export default function ProductsPage() {
  const { products } = useCatalog()
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Hair Products Store</h1>
      <p className="text-gray-600">Shampoos, conditioners, treatments, tools & more.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => <ProductCard key={i} product={p as any} />)}
      </div>
    </div>
  )
}
