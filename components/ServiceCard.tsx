type Service = {
  name: string
  duration: string
  price: string
  description?: string
}
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{service.name}</p>
          {service.description && <p className="text-sm text-gray-600 mt-1">{service.description}</p>}
          <p className="mt-2 text-xs text-gray-500">Approx. {service.duration}</p>
        </div>
        <p className="font-semibold">{service.price}</p>
      </div>
    </div>
  )
}
