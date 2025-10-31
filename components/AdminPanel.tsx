'use client'
import { useState } from 'react'
import ServiceManager from './ServiceManager'

interface Product {
  name: string
  price: string
  note: string
  inStock: boolean
  category: string
  type: string
  image?: string
}

interface HairType {
  name: string
  price: string
  note: string
  category: string
  type: string
  image?: string
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'products' | 'hair' | 'services'>('products')
  const [isUploading, setIsUploading] = useState(false)
  
  const [productForm, setProductForm] = useState<Product>({
    name: '', price: '', note: '', inStock: true, category: '', type: 'product'
  })
  
  const [hairForm, setHairForm] = useState<HairType>({
    name: '', price: '', note: '', category: 'Human Hair', type: 'hair'
  })

  const handleImageUpload = async (file: File, type: 'product' | 'hair') => {
    setIsUploading(true)
    
    // Simulate image upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const imageUrl = URL.createObjectURL(file)
    
    if (type === 'product') {
      setProductForm({...productForm, image: imageUrl})
    } else {
      setHairForm({...hairForm, image: imageUrl})
    }
    
    setIsUploading(false)
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically save to your database
    console.log('New Product:', productForm)
    alert('Product added successfully!')
    
    setProductForm({ name: '', price: '', note: '', inStock: true, category: '', type: 'product' })
  }

  const handleHairSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically save to your database
    console.log('New Hair Type:', hairForm)
    alert('Hair type added successfully!')
    
    setHairForm({ name: '', price: '', note: '', category: 'Human Hair', type: 'hair' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand to-brand-dark p-6">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-brand-light mt-2">Manage your products and hair inventory</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Add Products
          </button>
          <button
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'hair'
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('hair')}
          >
            Add Hair Types
          </button>
          <button
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'services'
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('services')}
          >
            Manage Services
          </button>
        </div>

        <div className="p-6">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <form onSubmit={handleProductSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Price (e.g., ₦15,000)"
                    className="input"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    required
                  />
                  
                  <textarea
                    placeholder="Product description/notes"
                    className="input h-24 resize-none"
                    value={productForm.note}
                    onChange={(e) => setProductForm({...productForm, note: e.target.value})}
                    required
                  />
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({...productForm, inStock: e.target.checked})}
                      className="w-5 h-5 text-brand"
                    />
                    <span className="font-medium">In Stock</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {productForm.image ? (
                      <img src={productForm.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    ) : (
                      <div className="space-y-3">
                        <div className="text-4xl text-gray-400">📷</div>
                        <p className="text-gray-600">Upload product image</p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'product')}
                      className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-dark"
                      disabled={isUploading}
                    />
                    
                    {isUploading && <div className="mt-2 text-brand">Uploading...</div>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isUploading}
              >
                Add Product
              </button>
            </form>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <ServiceManager />
          )}

          {/* Hair Tab */}
          {activeTab === 'hair' && (
            <form onSubmit={handleHairSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Hair Type</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Hair Type Name"
                    className="input"
                    value={hairForm.name}
                    onChange={(e) => setHairForm({...hairForm, name: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Price (e.g., ₦25,000)"
                    className="input"
                    value={hairForm.price}
                    onChange={(e) => setHairForm({...hairForm, price: e.target.value})}
                    required
                  />
                  
                  <textarea
                    placeholder="Hair description/notes"
                    className="input h-24 resize-none"
                    value={hairForm.note}
                    onChange={(e) => setHairForm({...hairForm, note: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {hairForm.image ? (
                      <img src={hairForm.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    ) : (
                      <div className="space-y-3">
                        <div className="text-4xl text-gray-400">💇‍♀️</div>
                        <p className="text-gray-600">Upload hair image</p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hair')}
                      className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand file:text-white hover:file:bg-brand-dark"
                      disabled={isUploading}
                    />
                    
                    {isUploading && <div className="mt-2 text-brand">Uploading...</div>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isUploading}
              >
                Add Hair Type
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}