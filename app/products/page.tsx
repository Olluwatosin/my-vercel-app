'use client'
import { useMemo, useState, useEffect } from 'react'
import { useCatalog } from '../../components/useCatalog'

function parseNairaToNumber(s: string) {
  const n = (s || '').replace(/[^\d.]/g, '')
  return Number(n || 0)
}

export default function ProductsPage() {
  const { products } = useCatalog()
  const [q, setQ] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (products) {
      setLoading(false)
    }
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const nameHit = p.name.toLowerCase().includes(q.toLowerCase()) || (p.note||'').toLowerCase().includes(q.toLowerCase())
      if (!nameHit) return false
      if (onlyInStock && !p.inStock) return false
      const price = parseNairaToNumber(p.price)
      const minOk = min ? price >= Number(min) : true
      const maxOk = max ? price <= Number(max) : true
      return minOk && maxOk
    })
  }, [products, q, onlyInStock, min, max])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-purple-50 py-12">
      <div className="container space-y-8">
        <div className="text-center">
          <h1 className="section-title mb-4">Hair Products Store</h1>
          <p className="text-gray-600 text-lg">Premium shampoos, conditioners, treatments, tools & more for your hair care needs.</p>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Products</label>
              <input 
                className="input" 
                placeholder="e.g., shampoo, serum" 
                value={q} 
                onChange={e=>setQ(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Min Price (₦)</label>
              <input 
                className="input" 
                placeholder="0" 
                value={min} 
                onChange={e=>setMin(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Max Price (₦)</label>
              <input 
                className="input" 
                placeholder="50000" 
                value={max} 
                onChange={e=>setMax(e.target.value)} 
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={onlyInStock} 
                onChange={e=>setOnlyInStock(e.target.checked)}
                className="w-5 h-5 text-brand rounded focus:ring-brand"
              />
              <span className="font-medium">Only in stock</span>
            </label>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filtered.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <div
              key={index}
              className="card-product group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  💄
                </div>
                
                {/* Stock badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>

                {/* Hover overlay */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
                    <button className="btn-primary">
                      Quick View
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.note}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-brand">
                    {product.price}
                  </span>
                  <button 
                    className={`btn text-sm ${
                      product.inStock 
                        ? 'btn-primary' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!filtered.length && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
