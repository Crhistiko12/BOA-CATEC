'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Destinations() {
    const destinations = [
        {
            city: 'La Paz',
            slug: 'la-paz',
            description: 'Ciudad sede de gobierno, el Illimani y teleféricos',
            image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
            highlight: 'Desde $450',
        },
        {
            city: 'Santa Cruz',
            slug: 'santa-cruz',
            description: 'Capital económica y centro de negocios',
            image: 'https://images.unsplash.com/photo-1596422846543-75c6fc1c2f86?w=800&q=80',
            highlight: 'Desde $520',
        },
        {
            city: 'Cochabamba',
            slug: 'cochabamba',
            description: 'La ciudad del eterno clima primaveral',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
            highlight: 'Desde $380',
        },
        {
            city: 'Sucre',
            slug: 'sucre',
            description: 'Capital constitucional y patrimonio de la humanidad',
            image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
            highlight: 'Desde $420',
        },
        {
            city: 'Tarija',
            slug: 'tarija',
            description: 'Valle de vinos y tradición',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            highlight: 'Desde $490',
        },
        {
            city: 'Trinidad',
            slug: 'trinidad',
            description: 'Puerta del Beni y la Amazonía boliviana',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
            highlight: 'Desde $550',
        },
    ]

    return (
        <section className="section-container bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-boa-dark mb-4">
                    Nuestros <span className="text-gradient-boa">Destinos</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Vuela a los principales destinos de Bolivia con BOA
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {destinations.map((destination, index) => (
                    <motion.div
                        key={destination.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href={`/destinos/${destination.slug}`}>
                            <div className="card group cursor-pointer">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={destination.image}
                                        alt={`Vista de ${destination.city}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 bg-boa-yellow text-boa-dark font-bold px-4 py-2 rounded-full shadow-lg">
                                        {destination.highlight}
                                    </div>

                                    {/* City Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">{destination.city}</h3>
                                        <p className="text-sm text-gray-200">{destination.description}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <button className="w-full btn-outline group-hover:bg-boa-blue group-hover:text-white">
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
