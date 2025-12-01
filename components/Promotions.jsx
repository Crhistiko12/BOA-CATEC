'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Promotions() {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 12,
        minutes: 30,
        seconds: 45
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const promotions = [
        {
            title: 'Oferta Especial: La Paz - Santa Cruz',
            discount: '30% OFF',
            description: 'Viaja ida y vuelta por solo $350',
            validUntil: 'Válido hasta fin de mes',
            color: 'from-blue-600 to-blue-800',
        },
        {
            title: 'Promoción Cochabamba',
            discount: '25% OFF',
            description: 'Descuento en vuelos nacionales',
            validUntil: 'Cupos limitados',
            color: 'from-yellow-500 to-orange-600',
        },
        {
            title: 'Vuelos Internacionales',
            discount: '20% OFF',
            description: 'Buenos Aires, Lima, São Paulo',
            validUntil: 'Reserva antes del domingo',
            color: 'from-purple-600 to-indigo-700',
        },
    ]

    return (
        <section id="promociones" className="section-container bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-boa-dark mb-4">
                    Promociones <span className="text-gradient-boa">Imperdibles</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Aprovecha nuestras ofertas exclusivas por tiempo limitado
                </p>

                {/* Countdown Timer */}
                <div className="inline-flex items-center gap-6 bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-boa-blue">{timeLeft.days}</div>
                        <div className="text-sm text-gray-600">Días</div>
                    </div>
                    <div className="text-2xl text-gray-400">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-boa-blue">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">Horas</div>
                    </div>
                    <div className="text-2xl text-gray-400">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-boa-blue">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">Min</div>
                    </div>
                    <div className="text-2xl text-gray-400">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-boa-blue">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">Seg</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((promo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                    >
                        <div className="card overflow-hidden h-full">
                            <div className={`bg-gradient-to-r ${promo.color} p-6 text-white`}>
                                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4">
                                    {promo.discount}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                                <p className="text-lg text-white/90">{promo.description}</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{promo.validUntil}</span>
                                </div>
                                <button className="w-full btn-primary">
                                    Reservar ahora
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
