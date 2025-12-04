'use client'

import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plane, Search, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { searchFlights } from '@/lib/db-actions'
import { format } from 'date-fns'

function VuelosSearch() {
    const searchParams = useSearchParams()

    const [origin, setOrigin] = useState(searchParams.get('origin') || '')
    const [destination, setDestination] = useState(searchParams.get('destino') || '')
    const [date, setDate] = useState('')
    const [passengers, setPassengers] = useState('1')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [hasSearched, setHasSearched] = useState(false)
    const [loading, setLoading] = useState(false)

    // Auto-search if params exist
    useEffect(() => {
        if (searchParams.get('destino')) {
            handleSearch()
        }
    }, [searchParams])

    const handleSearch = async () => {
        setLoading(true)
        try {
            const results = await searchFlights(origin, destination, date)
            setSearchResults(results)
            setHasSearched(true)
        } catch (error) {
            console.error("Search failed", error)
        } finally {
            setLoading(false)
        }
    }

    const calculateDuration = (start: Date, end: Date) => {
        const diff = new Date(end).getTime() - new Date(start).getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Search Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-[#0033A0]">Busca tu Vuelo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Origen
                            </label>
                            <Input
                                placeholder="Ej: MIA, LPB, VVI"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Destino
                            </label>
                            <Input
                                placeholder="Ej: MIA, LPB, VVI"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha
                            </label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pasajeros
                            </label>
                            <Input
                                type="number"
                                min="1"
                                max="9"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full bg-[#0033A0] hover:bg-blue-800 text-lg py-6"
                    >
                        {loading ? 'Buscando...' : (
                            <>
                                <Search className="h-5 w-5 mr-2" />
                                Buscar Vuelos
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Results */}
            {hasSearched && (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Vuelos Disponibles
                        </h2>
                        <p className="text-sm text-gray-600">
                            {searchResults.length} vuelo{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {searchResults.length > 0 ? (
                        <div className="space-y-4">
                            {searchResults.map((flight) => (
                                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            {/* Flight Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="px-3 py-1 bg-blue-100 text-[#0033A0] rounded-full text-sm font-semibold">
                                                        {flight.flightNumber}
                                                    </span>
                                                    <span className="text-sm text-gray-600">Económica</span>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="text-center">
                                                        <div className="text-3xl font-bold text-gray-900">{flight.origin}</div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            {format(new Date(flight.departureTime), 'HH:mm')}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {format(new Date(flight.departureTime), 'dd/MM/yyyy')}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 flex flex-col items-center">
                                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span className="text-sm">
                                                                {calculateDuration(flight.departureTime, flight.arrivalTime)}
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-1 bg-gradient-to-r from-[#0033A0] to-blue-400 rounded relative">
                                                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-[#0033A0] rotate-90 bg-white" />
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <div className="text-3xl font-bold text-gray-900">{flight.destination}</div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            {format(new Date(flight.arrivalTime), 'HH:mm')}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 text-sm text-gray-600">
                                                    {flight.availableSeats} asientos disponibles
                                                </div>
                                            </div>

                                            {/* Price and Action */}
                                            <div className="flex flex-col items-end gap-3">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Desde</p>
                                                    <p className="text-4xl font-bold text-[#0033A0]">${flight.price}</p>
                                                    <p className="text-xs text-gray-500">por persona</p>
                                                </div>
                                                {/* Redirect to checkout flow instead of details for now, or details then checkout */}
                                                <Link href={`/checkout?flightId=${flight.id}&passengers=${passengers}`}>
                                                    <Button className="bg-[#0033A0] hover:bg-blue-800">
                                                        Comprar Ahora
                                                        <ArrowRight className="h-4 w-4 ml-2" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-12">
                            <div className="text-center">
                                <Plane className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No se encontraron vuelos
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Intenta con otras fechas u origen/destino
                                </p>
                                <Button
                                    onClick={() => {
                                        setOrigin('')
                                        setDestination('')
                                        setDate('')
                                        setHasSearched(false)
                                    }}
                                    variant="outline"
                                >
                                    Nueva Búsqueda
                                </Button>
                            </div>
                        </Card>
                    )}
                </>
            )}

            {/* Popular Routes */}
            {!hasSearched && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-[#0033A0]">Rutas Populares</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { from: 'MIA', to: 'VVI', price: 450 },
                                { from: 'LPB', to: 'VVI', price: 120 },
                                { from: 'VVI', to: 'LPB', price: 120 }
                            ].map((route, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setOrigin(route.from)
                                        setDestination(route.to)
                                    }}
                                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#0033A0] hover:bg-blue-50 transition-all text-left"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-lg">{route.from} → {route.to}</span>
                                        <ArrowRight className="h-5 w-5 text-[#0033A0]" />
                                    </div>
                                    <p className="text-sm text-gray-600">Desde ${route.price}</p>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default function VuelosPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Plane className="h-16 w-16 mx-auto mb-4 text-[#FFC72C]" />
                        <h1 className="text-4xl font-bold mb-4">Buscar Vuelos</h1>
                        <p className="text-xl text-blue-100">
                            Encuentra el vuelo perfecto para tu próximo viaje
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <Suspense fallback={<div>Cargando buscador...</div>}>
                    <VuelosSearch />
                </Suspense>
            </div>
        </div>
    )
}
