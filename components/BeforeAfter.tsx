'use client'
import { useState } from 'react'

const transformations = [
  {
    id: 1,
    title: "Hair Installation Transformation",
    service: "Premium Hair Install",
    before: "🧑🏾‍🦲", // Placeholder - replace with actual images
    after: "👩🏾‍🦱",
    description: "Complete hair transformation with premium human hair installation"
  },
  {
    id: 2,
    title: "Wig Revamping Magic",
    service: "Wig Restoration",
    before: "😔",
    after: "😍",
    description: "Old wig brought back to life with professional revamping"
  },
  {
    id: 3,
    title: "Braids & Style",
    service: "Protective Styling",
    before: "👩🏿",
    after: "👸🏿",
    description: "Beautiful protective braiding with elegant styling"
  },
  {
    id: 4,
    title: "Complete Makeover",
    service: "Full Beauty Package",
    before: "🙂",
    after: "✨",
    description: "Hair, nails, and beauty treatment complete transformation"
  }
]

export default function BeforeAfter() {
  const [selectedTransformation, setSelectedTransformation] = useState(0)

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Amazing Transformations
          </h2>
          <p className="text-gray-300 text-lg">See the magic we create for our clients</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main showcase */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before/After Images */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-white font-semibold mb-3">BEFORE</p>
                    <div className="bg-gray-800 rounded-2xl p-8 text-6xl">
                      {transformations[selectedTransformation].before}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold mb-3">AFTER</p>
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-6xl animate-pulse-slow">
                      {transformations[selectedTransformation].after}
                    </div>
                  </div>
                </div>
                
                {/* Transformation arrow */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gold rounded-full text-2xl animate-bounce-slow">
                    ✨
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="text-white space-y-4">
                <div className="inline-block px-4 py-2 bg-brand rounded-full text-sm font-semibold">
                  {transformations[selectedTransformation].service}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {transformations[selectedTransformation].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {transformations[selectedTransformation].description}
                </p>
                <div className="pt-4">
                  <button className="btn-secondary">
                    Book Your Transformation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transformations.map((transformation, index) => (
              <button
                key={transformation.id}
                className={`p-4 rounded-xl transition-all ${
                  selectedTransformation === index
                    ? 'bg-brand text-white scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                onClick={() => setSelectedTransformation(index)}
              >
                <div className="text-3xl mb-2">
                  {transformation.before} → {transformation.after}
                </div>
                <p className="text-sm font-medium">{transformation.service}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}