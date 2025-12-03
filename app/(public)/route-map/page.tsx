'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Plane, MapPin, TrendingUp, Calendar } from 'lucide-react'

export default function RouteMapPage() {
    const rutasNacionales = [
        { origen: 'La Paz', destino: 'Santa Cruz', frecuencia: '5 vuelos/día', duracion: '1h 15min' },
        { origen: 'La Paz', destino: 'Cochabamba', frecuencia: '4 vuelos/día', duracion: '45min' },
        { origen: 'Santa Cruz', destino: 'Cochabamba', frecuencia: '3 vuelos/día', duracion: '1h' },
        { origen: 'La Paz', destino: 'Tarija', frecuencia: '2 vuelos/día', duracion: '1h 30min' },
        { origen: 'Santa Cruz', destino: 'Tarija', frecuencia: '2 vuelos/día', duracion: '1h 20min' }
    ]

    const rutasInternacionales = [
        { origen: 'Santa Cruz', destino: 'Miami', frecuencia: '3 vuelos/semana', duracion: '6h 30min' },
        { origen: 'La Paz', destino: 'Buenos Aires', frecuencia: '4 vuelos/semana', duracion: '3h 45min' },
        { origen: 'Santa Cruz', destino: 'São Paulo', frecuencia: '2 vuelos/semana', duracion: '3h 30min' },
        { origen: 'Santa Cruz', destino: 'Madrid', frecuencia: '2 vuelos/semana', duracion: '12h' }
    ]

    const proximasRutas = [
        { destino: 'Ciudad de México', fecha: 'Q1 2026', estado: 'En Planificación' },
        { destino: 'Lima', fecha: 'Q2 2026', estado: 'Aprobación Pendiente' },
        { destino: 'Santiago', fecha: 'Q3 2026', estado: 'En Evaluación' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <MapPin className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Mapa de Rutas BOA</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Conectando Bolivia con el mundo
                        </p>
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Plane className="h-5 w-5" />
                                <span>9 rutas nacionales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                <span>4 rutas internacionales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <MapPin className="h-12 w-12 mx-auto text-[#0033A0] mb-4" />
                            <p className="text-4xl font-bold text-[#0033A0] mb-2">13</p>
                            <p className="text-gray-600">Destinos Totales</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Plane className="h-12 w-12 mx-auto text-green-600 mb-4" />
                            <p className="text-4xl font-bold text-green-600 mb-2">45+</p>
                            <p className="text-gray-600">Vuelos Diarios</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <TrendingUp className="h-12 w-12 mx-auto text-[#FFC72C] mb-4" />
                            <p className="text-4xl font-bold text-[#FFC72C] mb-2">3</p>
                            <p className="text-gray-600">Nuevas Rutas 2026</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <Calendar className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                            <p className="text-4xl font-bold text-purple-600 mb-2">24/7</p>
                            <p className="text-gray-600">Operaciones</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Rutas Nacionales */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Rutas Nacionales</h2>
                    <p className="text-gray-600 mb-6">Conectando las principales ciudades de Bolivia</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rutasNacionales.map((ruta, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all border-t-4 border-t-[#0033A0]">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                                <Plane className="h-6 w-6 text-[#0033A0]" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{ruta.origen}</CardTitle>
                                            </div>
                                        </div>
                                        <div className="text-2xl text-gray-400">→</div>
                                        <div>
                                            <CardTitle className="text-lg text-right">{ruta.destino}</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Frecuencia:</span>
                                            <span className="font-semibold text-gray-900">{ruta.frecuencia}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Duración:</span>
                                            <span className="font-semibold text-gray-900">{ruta.duracion}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = `/vuelos?origen=${ruta.origen}&destino=${ruta.destino}`}
                                        className="w-full mt-4 bg-[#0033A0] text-white py-2 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                                    >
                                        Ver Vuelos
                                    </button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Rutas Internacionales */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Rutas Internacionales</h2>
                    <p className="text-gray-600 mb-6">Conectando Bolivia con el mundo</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rutasInternacionales.map((ruta, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all border-t-4 border-t-[#FFC72C]">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-yellow-100 rounded-full">
                                                <Plane className="h-6 w-6 text-[#FFC72C]" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">{ruta.origen}</CardTitle>
                                            </div>
                                        </div>
                                        <div className="text-3xl text-gray-400">✈</div>
                                        <div>
                                            <CardTitle className="text-xl text-right">{ruta.destino}</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Frecuencia:</span>
                                            <span className="font-semibold text-gray-900">{ruta.frecuencia}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Duración:</span>
                                            <span className="font-semibold text-gray-900">{ruta.duracion}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = `/vuelos?origen=${ruta.origen}&destino=${ruta.destino}`}
                                        className="w-full mt-4 bg-[#FFC72C] text-[#0033A0] py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
                                    >
                                        Ver Vuelos
                                    </button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Próximas Rutas */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500 rounded-full">
                                <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl text-gray-900">Próximas Rutas 2026</CardTitle>
                                <CardDescription className="text-lg">Expansión internacional en camino</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {proximasRutas.map((ruta, index) => (
                                <Card key={index} className="bg-white">
                                    <CardContent className="pt-6 pb-6">
                                        <div className="text-center">
                                            <MapPin className="h-12 w-12 mx-auto text-green-600 mb-4" />
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {ruta.destino}
                                            </h3>
                                            <p className="text-gray-600 mb-2">{ruta.fecha}</p>
                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                                {ruta.estado}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-700 text-lg mb-4">
                                ¿Te gustaría que volemos a tu ciudad favorita?
                            </p>
                            <button
                                onClick={() => window.location.href = '/support'}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                            >
                                Sugerir Nueva Ruta
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
