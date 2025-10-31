'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Product {
  name: string
  price: string
  note: string
  inStock: boolean
  image?: string
  category?: string
}

interface ProductGalleryProps {
  products: Product[]
  title: string
  viewAllLink: string
  showFilters?: boolean
}

export default function ProductGallery({ products, title, viewAllLink, showFilters = false }: ProductGalleryProps) {
  const [filter, setFilter] = useState('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">{title}</h2>
            <p className="text-gray-600">Premium quality products for your beauty needs</p>
          </div>
          <Link href={viewAllLink} className="btn-primary">
            View All
          </Link>
        </div>

        {/* Filters */}
        {showFilters && categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-brand text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'All Products' : category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <div
              key={index}
              className="card-product group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    💄
                  </div>
                )}
                
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

        {/* Load More */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <Link href={viewAllLink} className="btn-secondary">
              View All {filteredProducts.length} Products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}