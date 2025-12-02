'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Clock, ArrowRight } from 'lucide-react'

interface Flight {
    id: string
    flightNumber: string
    origin: string
    destination: string
    departureTime: string
    arrivalTime: string
    price: number
}

export default function FlightsPage() {
    const searchParams = useSearchParams()
    const [flights, setFlights] = useState<Flight[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true)
            try {
                const query = searchParams.toString()
                const res = await fetch(`/api/flights?${query}`)
                if (res.ok) {
                    const data = await res.json()
                    setFlights(data)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchFlights()
    }, [searchParams])

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-[#1E3A8A]">Resultados de Búsqueda</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filtros (Placeholder) */}
                <div className="hidden lg:block space-y-6">
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="font-bold mb-4">Filtros</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-[#1E3A8A]" />
                                    <span>Directo</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-[#1E3A8A]" />
                                    <span>1 Escala</span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resultados */}
                <div className="lg:col-span-3 space-y-4">
                    {loading ? (
                        <p>Cargando vuelos...</p>
                    ) : flights.length > 0 ? (
                        flights.map((flight) => (
                            <Card key={flight.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-lg">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <div className="flex-1 mx-4 flex flex-col items-center">
                                                    <span className="text-xs text-gray-500">Directo</span>
                                                    <div className="w-full h-px bg-gray-300 relative">
                                                        <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-[#1E3A8A] rotate-90" />
                                                    </div>
                                                </div>
                                                <span className="font-bold text-lg">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>{flight.origin}</span>
                                                <span>{flight.destination}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2 min-w-[150px]">
                                            <span className="text-2xl font-bold text-[#1E3A8A]">${flight.price}</span>
                                            <Button
                                                className="w-full bg-[#1E3A8A]"
                                                onClick={() => window.location.href = `/book/${flight.id}`}
                                            >
                                                Seleccionar
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No se encontraron vuelos</h3>
                            <p className="text-gray-500">Intenta cambiar los filtros o las fechas de búsqueda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
