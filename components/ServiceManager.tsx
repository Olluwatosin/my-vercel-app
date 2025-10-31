'use client'
import { useState, useEffect } from 'react'
import { IService } from '@/models/Service'

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
    image: ''
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
      image: service.image || ''
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
    setFormData({ name: '', description: '', price: 0, duration: '', category: '', image: '' })
    setEditingService(null)
    setShowForm(false)
  }

  if (isLoading) return <div className="text-center py-8">Loading services...</div>

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
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="border rounded-lg px-3 py-2 col-span-2"
            />
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

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">{service.category}</span>
                  <span className="font-semibold text-green-600">₦{service.price.toLocaleString()}</span>
                  <span>{service.duration}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}