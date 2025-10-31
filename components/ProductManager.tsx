'use client'
import { useState, useEffect } from 'react'

interface Product {
  _id: string
  name: string
  price: string
  note: string
  inStock: boolean
  category: string
  image?: string
  type: string
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load products from database
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const addProduct = async (product: Omit<Product, '_id'>) => {
    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      if (response.ok) {
        await fetchProducts()
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Failed to add product:', error)
    }
    setLoading(false)
  }

  const updateProduct = async (updatedProduct: Product) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      })
      if (response.ok) {
        await fetchProducts()
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Failed to update product:', error)
    }
    setLoading(false)
  }

  const deleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setLoading(true)
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          await fetchProducts()
        }
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
      setLoading(false)
    }
  }

  const toggleStock = async (product: Product) => {
    await updateProduct({ ...product, inStock: !product.inStock })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products ({products.length})</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? updateProduct : addProduct}
          onCancel={() => {
            setShowAddForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products && products.length > 0 ? products.map(product => (
          <div key={product._id} className="card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold">{product.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-600 hover:text-blue-800"
                  disabled={loading}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={loading}
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{product.note}</p>
            <p className="text-brand font-bold mb-2">{product.price}</p>
            <div className="flex justify-between items-center">
              <span className="badge">{product.category}</span>
              <button
                onClick={() => toggleStock(product)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
                disabled={loading}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-4">Add your first product to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Add First Product
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductForm({ 
  product, 
  onSave, 
  onCancel 
}: { 
  product: Product | null
  onSave: (product: Omit<Product, '_id'>) => void
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    note: product?.note || '',
    category: product?.category || 'Treatment',
    inStock: product?.inStock ?? true,
    type: product?.type || 'product'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(product ? { ...product, ...form } : form)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border">
      <h3 className="text-xl font-bold mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Price (e.g., ₦15,000)"
          className="input"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          required
        />
        
        <textarea
          placeholder="Product description"
          className="input h-20 resize-none"
          value={form.note}
          onChange={(e) => setForm({...form, note: e.target.value})}
          required
        />
        
        <select
          className="input"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
        >
          <option value="Shampoo">Shampoo</option>
          <option value="Conditioner">Conditioner</option>
          <option value="Treatment">Treatment</option>
          <option value="Styling">Styling</option>
        </select>
        
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => setForm({...form, inStock: e.target.checked})}
            className="w-5 h-5"
          />
          <span>In Stock</span>
        </label>
        
        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1">
            {product ? 'Update' : 'Add'} Product
          </button>
          <button type="button" onClick={onCancel} className="btn bg-gray-300 text-gray-700 flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}