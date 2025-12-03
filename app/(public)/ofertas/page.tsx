'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plane, TrendingDown, Bell, Calendar, Tag, Clock } from 'lucide-react'

export default function OfertasPage() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        setSubscribed(true)
        setTimeout(() => setSubscribed(false), 3000)
    }

    const ofertas = [
        {
            origen: 'La Paz',
            destino: 'Santa Cruz',
            precio: 450,
            precioOriginal: 650,
            descuento: 31,
            validoHasta: '15 Dic 2025',
            plazas: 12
        },
        {
            origen: 'Cochabamba',
            destino: 'La Paz',
            precio: 320,
            precioOriginal: 480,
            descuento: 33,
            validoHasta: '20 Dic 2025',
            plazas: 8
        },
        {
            origen: 'Santa Cruz',
            destino: 'Miami',
            precio: 3200,
            precioOriginal: 4500,
            descuento: 29,
            validoHasta: '31 Dic 2025',
            plazas: 5
        },
        {
            origen: 'La Paz',
            destino: 'Buenos Aires',
            precio: 2800,
            precioOriginal: 3800,
            descuento: 26,
            validoHasta: '25 Dic 2025',
            plazas: 15
        },
        {
            origen: 'Cochabamba',
            destino: 'Santa Cruz',
            precio: 380,
            precioOriginal: 550,
            descuento: 31,
            validoHasta: '18 Dic 2025',
            plazas: 20
        },
        {
            origen: 'Santa Cruz',
            destino: 'São Paulo',
            precio: 3500,
            precioOriginal: 4800,
            descuento: 27,
            validoHasta: '30 Dic 2025',
            plazas: 10
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Tag className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Ofertas Especiales BOA</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Los mejores precios para volar por Bolivia y el mundo
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="h-5 w-5" />
                                <span>Hasta 33% de descuento</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>Ofertas limitadas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Price Alert Subscription */}
                <Card className="mb-12 border-2 border-[#FFC72C] shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#FFC72C] rounded-full">
                                <Bell className="h-8 w-8 text-[#0033A0]" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-[#0033A0]">
                                    Alertas de Precio
                                </CardTitle>
                                <CardDescription className="text-base">
                                    Recibe notificaciones de las mejores ofertas directamente en tu email
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {subscribed ? (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <Bell className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    ¡Suscripción Exitosa!
                                </h3>
                                <p className="text-gray-600">
                                    Te notificaremos cuando haya nuevas ofertas
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-12 text-lg"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="bg-[#0033A0] hover:bg-blue-800 h-12 px-8 text-lg"
                                    >
                                        Suscribirme
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    Sin spam. Solo las mejores ofertas. Cancela cuando quieras.
                                </p>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Ofertas Grid */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Ofertas Disponibles
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {ofertas.length} ofertas activas • Actualizado hoy
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ofertas.map((oferta, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-[#0033A0] group cursor-pointer"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-full group-hover:bg-[#0033A0] transition-colors">
                                            <Plane className="h-6 w-6 text-[#0033A0] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">
                                                {oferta.origen}
                                            </h3>
                                            <p className="text-sm text-gray-600">a {oferta.destino}</p>
                                        </div>
                                    </div>
                                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{oferta.descuento}%
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#0033A0]">
                                        Bs. {oferta.precio}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                        Bs. {oferta.precioOriginal}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>Válido hasta {oferta.validoHasta}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        {oferta.plazas} plazas disponibles
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${oferta.plazas < 10
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {oferta.plazas < 10 ? '¡Últimas plazas!' : 'Disponible'}
                                    </span>
                                </div>

                                <Button
                                    className="w-full bg-[#0033A0] hover:bg-blue-800 mt-4"
                                    onClick={() => window.location.href = `/vuelos?origen=${oferta.origen}&destino=${oferta.destino}`}
                                >
                                    Reservar Ahora
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Beneficios Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <TrendingDown className="h-8 w-8 text-[#0033A0]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Mejor Precio Garantizado
                            </h3>
                            <p className="text-gray-600">
                                Encontramos el mejor precio para tu ruta
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                                <Bell className="h-8 w-8 text-[#FFC72C]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Alertas Personalizadas
                            </h3>
                            <p className="text-gray-600">
                                Recibe notificaciones de ofertas en tus rutas favoritas
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <Calendar className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Ofertas Diarias
                            </h3>
                            <p className="text-gray-600">
                                Nuevas promociones todos los días
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
