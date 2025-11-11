'use client'
import { useState, useEffect } from 'react'
import { IService } from '../models/Service'
import ServiceSeeder from './ServiceSeeder'
import MediaUpload from './MediaUpload'

export default function ServiceManager() {
  const [services, setServices] = useState<IService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingService, setEditingService] = useState<IService | null>(null)
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    image: '',
    video: '',
    mediaType: 'image' as 'image' | 'video',
    thumbnail: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.success) {
        setServices(data.services)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = '/api/services'
      const method = editingService ? 'PUT' : 'POST'
      const body = editingService ? { ...formData, _id: editingService._id } : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        fetchServices()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleEdit = (service: IService) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      image: service.image || '',
      video: service.video || '',
      mediaType: service.mediaType || 'image',
      thumbnail: service.thumbnail || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
          fetchServices()
        }
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0, duration: '', category: '', image: '', video: '', mediaType: 'image', thumbnail: '' })
    setEditingService(null)
    setShowForm(false)
  }

  const handleMediaUpload = (url: string, type: 'image' | 'video', thumbnail?: string) => {
    if (type === 'video') {
      setFormData({...formData, video: url, image: '', mediaType: 'video', thumbnail: thumbnail || ''})
    } else {
      setFormData({...formData, image: url, video: '', mediaType: 'image', thumbnail: ''})
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p>Loading services...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Add New Service
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border rounded-lg px-3 py-2"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Hair">Hair Services</option>
              <option value="Nails">Nail Services</option>
              <option value="Beauty">Beauty Services</option>
              <option value="Training">Training</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="border rounded-lg px-3 py-2 col-span-2"
              rows={3}
              required
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              className="border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2 hours)"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="border rounded-lg px-3 py-2"
              required
            />
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image or Video
              </label>
              <MediaUpload
                onUpload={handleMediaUpload}
                currentMedia={formData.mediaType === 'video' ? formData.video : formData.image}
                mediaType={formData.mediaType}
              />
            </div>
            <div className="col-span-2 flex space-x-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                {editingService ? 'Update' : 'Add'} Service
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {services.length === 0 && <ServiceSeeder onServicesAdded={fetchServices} />}
      
      <div className="grid gap-4">
        {services.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">💇♀️</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No services yet</h3>
            <p className="text-gray-500 mb-4">Add your first service manually or use the quick setup above</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Add First Service
            </button>
          </div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="font-bold text-green-600 text-lg">₦{service.price.toLocaleString()}</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <span>⏱️</span> {service.duration}
                    </span>
                  </div>
                  {(service.image || service.video) && (
                    <div className="mb-3">
                      {service.mediaType === 'video' && service.video ? (
                        <video 
                          src={service.video} 
                          className="w-full h-32 object-cover rounded-lg"
                          controls
                          muted
                        />
                      ) : service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-32 object-cover rounded-lg" 
                        />
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id!)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}