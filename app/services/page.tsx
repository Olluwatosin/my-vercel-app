import ServiceCard from '../../components/ServiceCard'
import services from '../../data/services.json'

export default function ServicesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Salon Services</h1>
      <p className="text-gray-600">Browse our full menu. Prices may vary based on hair length/volume.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => <ServiceCard key={i} service={s} />)}
      </div>
    </div>
  )
}
