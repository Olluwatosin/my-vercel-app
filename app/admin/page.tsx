import AdminPanel from '../../components/AdminPanel'
import ProductManager from '../../components/ProductManager'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand/10 py-12">
      <div className="container space-y-12">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <ProductManager />
        </div>
        <AdminPanel />
      </div>
    </div>
  )
}