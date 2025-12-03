'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Plane, Users, Wifi, Coffee, Monitor, Star } from 'lucide-react'
import Image from 'next/image'

export default function FleetPage() {
    const fleet = [
        {
            modelo: 'Boeing 767-300ER',
            cantidad: 3,
            capacidad: 269,
            año: '2018-2020',
            rutas: 'Internacionales de larga distancia',
            servicios: ['WiFi', 'Entretenimiento', 'Comidas gourmet', 'Asientos reclinables'],
            clases: 'Ejecutiva y Económica'
        },
        {
            modelo: 'Boeing 737-700',
            cantidad: 5,
            capacidad: 148,
            año: '2019-2021',
            rutas: 'Nacionales e internacionales regionales',
            servicios: ['WiFi', 'Snacks', 'Bebidas', 'Entretenimiento'],
            clases: 'Económica'
        },
        {
            modelo: 'Airbus A330-200',
            cantidad: 2,
            capacidad: 293,
            año: '2020-2022',
            rutas: 'Internacionales de larga distancia',
            servicios: ['WiFi', 'Entretenimiento premium', 'Comidas gourmet', 'Asientos premium'],
            clases: 'Ejecutiva y Económica'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Plane className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Nuestra Flota Moderna</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Aviones de última generación para tu comodidad y seguridad
                        </p>
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-[#FFC72C]" />
                                <span>Flota renovada 2018-2022</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wifi className="h-5 w-5" />
                                <span>WiFi en todos los vuelos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Fleet Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Plane className="h-12 w-12 mx-auto text-[#0033A0] mb-4" />
                            <p className="text-4xl font-bold text-[#0033A0] mb-2">10</p>
                            <p className="text-gray-600">Aviones en Flota</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Star className="h-12 w-12 mx-auto text-[#FFC72C] mb-4" />
                            <p className="text-4xl font-bold text-[#FFC72C] mb-2">4.2</p>
                            <p className="text-gray-600">Años Promedio</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
                            <p className="text-4xl font-bold text-green-600 mb-2">2,100</p>
                            <p className="text-gray-600">Pasajeros/día</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Monitor className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                            <p className="text-4xl font-bold text-purple-600 mb-2">100%</p>
                            <p className="text-gray-600">Con WiFi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Fleet Cards */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Modelos de Nuestra Flota
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Conoce los aviones que te llevarán a tu destino
                    </p>
                </div>

                <div className="space-y-8">
                    {fleet.map((avion, index) => (
                        <Card key={index} className="overflow-hidden border-t-4 border-t-[#0033A0] shadow-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {/* Image Section */}
                                <div className="lg:col-span-1 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <Plane className="h-32 w-32 mx-auto text-[#0033A0] mb-4" />
                                        <p className="text-sm text-gray-600">Imagen ilustrativa</p>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:col-span-2">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-2xl text-[#0033A0] mb-2">
                                                    {avion.modelo}
                                                </CardTitle>
                                                <CardDescription className="text-base">
                                                    {avion.rutas}
                                                </CardDescription>
                                            </div>
                                            <div className="bg-blue-100 px-4 py-2 rounded-full">
                                                <p className="text-sm text-gray-600">Cantidad</p>
                                                <p className="text-2xl font-bold text-[#0033A0]">{avion.cantidad}</p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div>
                                                <p className="text-sm text-gray-600">Capacidad</p>
                                                <p className="text-xl font-bold text-gray-900">{avion.capacidad}</p>
                                                <p className="text-xs text-gray-500">pasajeros</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Año</p>
                                                <p className="text-xl font-bold text-gray-900">{avion.año}</p>
                                                <p className="text-xs text-gray-500">fabricación</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Clases</p>
                                                <p className="text-xl font-bold text-gray-900">{avion.clases.split(' ')[0]}</p>
                                                <p className="text-xs text-gray-500">{avion.clases.includes('y') ? '+ Económica' : ''}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Estado</p>
                                                <p className="text-xl font-bold text-green-600">Activo</p>
                                                <p className="text-xs text-gray-500">operativo</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-700 mb-3">Servicios a Bordo:</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {avion.servicios.map((servicio, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        {servicio.includes('WiFi') && <Wifi className="h-4 w-4 text-[#0033A0]" />}
                                                        {servicio.includes('Comida') && <Coffee className="h-4 w-4 text-[#0033A0]" />}
                                                        {servicio.includes('Entretenimiento') && <Monitor className="h-4 w-4 text-[#0033A0]" />}
                                                        {!servicio.includes('WiFi') && !servicio.includes('Comida') && !servicio.includes('Entretenimiento') &&
                                                            <Star className="h-4 w-4 text-[#FFC72C]" />
                                                        }
                                                        <span className="text-sm text-gray-700">{servicio}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Commitment Section */}
                <Card className="mt-12 bg-gradient-to-r from-blue-50 to-white border-2 border-[#0033A0]">
                    <CardContent className="pt-8 pb-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-[#0033A0] mb-4">
                                Nuestro Compromiso con la Calidad
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                En BOA renovamos constantemente nuestra flota para ofrecerte la mejor experiencia de vuelo.
                                Todos nuestros aviones cumplen con los más altos estándares de seguridad y comodidad.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0033A0] rounded-full mb-3">
                                        <Star className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Mantenimiento Riguroso</h3>
                                    <p className="text-sm text-gray-600">Inspecciones cada 500 horas de vuelo</p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0033A0] rounded-full mb-3">
                                        <Wifi className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Tecnología Moderna</h3>
                                    <p className="text-sm text-gray-600">WiFi y entretenimiento en todos los vuelos</p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0033A0] rounded-full mb-3">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Tripulación Capacitada</h3>
                                    <p className="text-sm text-gray-600">Personal certificado internacionalmente</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
