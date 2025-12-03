'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plane, Search, Clock, MapPin, CheckCircle2, AlertCircle, Calendar } from 'lucide-react'

export default function FlightInfoPage() {
    const [searchType, setSearchType] = useState<'flight' | 'reservation'>('flight')
    const [flightNumber, setFlightNumber] = useState('')
    const [reservationCode, setReservationCode] = useState('')
    const [searchResult, setSearchResult] = useState<any>(null)
    const [isSearching, setIsSearching] = useState(false)
    const [lastSearch, setLastSearch] = useState<{ type: string, value: string } | null>(null)

    // Datos simulados de vuelos
    const flightData: any = {
        'OB-760': {
            number: 'OB-760',
            status: 'A TIEMPO',
            statusColor: 'green',
            from: { code: 'MIA', city: 'Miami', terminal: 'Terminal 3' },
            to: { code: 'VVI', city: 'Santa Cruz', terminal: 'Terminal 1' },
            departure: { scheduled: '22:00', estimated: '22:00', gate: '4' },
            arrival: { scheduled: '05:00', estimated: '05:00', gate: '12' },
            date: '15 Dic, 2025',
            aircraft: 'Boeing 737-800'
        },
        'OB-654': {
            number: 'OB-654',
            status: 'ATERRIZÓ',
            statusColor: 'blue',
            from: { code: 'LPB', city: 'La Paz', terminal: 'Terminal 1' },
            to: { code: 'VVI', city: 'Santa Cruz', terminal: 'Terminal 1' },
            departure: { scheduled: '14:00', estimated: '14:15', gate: '2' },
            arrival: { scheduled: '15:00', estimated: '15:20', gate: '8' },
            date: '10 Nov, 2025',
            aircraft: 'Airbus A320'
        },
        'OB-801': {
            number: 'OB-801',
            status: 'RETRASADO',
            statusColor: 'orange',
            from: { code: 'VVI', city: 'Santa Cruz', terminal: 'Terminal 1' },
            to: { code: 'LPB', city: 'La Paz', terminal: 'Terminal 1' },
            departure: { scheduled: '18:00', estimated: '19:30', gate: '5' },
            arrival: { scheduled: '19:00', estimated: '20:30', gate: '3' },
            date: 'Hoy',
            aircraft: 'Boeing 737-700'
        }
    }

    const reservationData: any = {
        'BOA-900': {
            code: 'BOA-900',
            passenger: 'Diego Test',
            flight: flightData['OB-760'],
            seat: '12F',
            class: 'Económica',
            status: 'Confirmado'
        }
    }

    const handleSearch = () => {
        const currentValue = searchType === 'flight' ? flightNumber.toUpperCase() : reservationCode.toUpperCase()

        // Check for duplicate search
        if (lastSearch && lastSearch.type === searchType && lastSearch.value === currentValue) {
            alert('⚠️ Ya has buscado esta información. Los resultados ya están mostrados abajo.')
            return
        }

        setIsSearching(true)

        setTimeout(() => {
            if (searchType === 'flight') {
                const result = flightData[flightNumber.toUpperCase()]
                setSearchResult(result || null)
                setLastSearch({ type: 'flight', value: flightNumber.toUpperCase() })
            } else {
                const result = reservationData[reservationCode.toUpperCase()]
                setSearchResult(result || null)
                setLastSearch({ type: 'reservation', value: reservationCode.toUpperCase() })
            }
            setIsSearching(false)
        }, 800)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'A TIEMPO': return 'bg-green-100 text-green-800 border-green-200'
            case 'RETRASADO': return 'bg-orange-100 text-orange-800 border-orange-200'
            case 'ATERRIZÓ': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'CANCELADO': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-[#0033A0] text-white py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Plane className="h-16 w-16 mx-auto mb-4 text-[#FFC72C]" />
                        <h1 className="text-4xl font-bold mb-4">Información de Vuelos</h1>
                        <p className="text-xl text-blue-100">
                            Consulta el estado de tu vuelo en tiempo real
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Search Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-[#0033A0]">Buscar Información</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Search Type Tabs */}
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setSearchType('flight')}
                                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${searchType === 'flight'
                                        ? 'bg-white text-[#0033A0] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Por Número de Vuelo
                                </button>
                                <button
                                    onClick={() => setSearchType('reservation')}
                                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${searchType === 'reservation'
                                        ? 'bg-white text-[#0033A0] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Por Código de Reserva
                                </button>
                            </div>

                            {/* Search Input */}
                            {searchType === 'flight' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Número de Vuelo
                                    </label>
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Ej: OB-760"
                                            value={flightNumber}
                                            onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                                            className="text-lg"
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <Button
                                            onClick={handleSearch}
                                            disabled={!flightNumber || isSearching}
                                            className="bg-[#0033A0] hover:bg-blue-800 px-8"
                                        >
                                            {isSearching ? (
                                                'Buscando...'
                                            ) : (
                                                <>
                                                    <Search className="h-4 w-4 mr-2" />
                                                    Buscar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Ejemplos: OB-760, OB-654, OB-801
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Reserva
                                    </label>
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Ej: BOA-900"
                                            value={reservationCode}
                                            onChange={(e) => setReservationCode(e.target.value.toUpperCase())}
                                            className="text-lg"
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <Button
                                            onClick={handleSearch}
                                            disabled={!reservationCode || isSearching}
                                            className="bg-[#0033A0] hover:bg-blue-800 px-8"
                                        >
                                            {isSearching ? (
                                                'Buscando...'
                                            ) : (
                                                <>
                                                    <Search className="h-4 w-4 mr-2" />
                                                    Buscar
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Encontrarás tu código en el email de confirmación
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results */}
                    {searchResult && searchType === 'flight' && (
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl text-[#0033A0]">
                                            Vuelo {searchResult.number}
                                        </CardTitle>
                                        <p className="text-gray-600 mt-1">{searchResult.date}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(searchResult.status)}`}>
                                        {searchResult.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Route */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="text-4xl font-bold text-gray-900">{searchResult.from.code}</div>
                                        <div className="text-sm text-gray-600">{searchResult.from.city}</div>
                                        <div className="text-xs text-gray-500">{searchResult.from.terminal}</div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center px-4">
                                        <Plane className="h-8 w-8 text-[#0033A0] mb-2 rotate-90" />
                                        <div className="w-full h-1 bg-gradient-to-r from-[#0033A0] to-blue-400 rounded"></div>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <div className="text-4xl font-bold text-gray-900">{searchResult.to.code}</div>
                                        <div className="text-sm text-gray-600">{searchResult.to.city}</div>
                                        <div className="text-xs text-gray-500">{searchResult.to.terminal}</div>
                                    </div>
                                </div>

                                {/* Times */}
                                <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Salida</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">Programada:</span>
                                                <span className="font-semibold">{searchResult.departure.scheduled}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-[#0033A0]" />
                                                <span className="text-sm text-gray-600">Estimada:</span>
                                                <span className="font-semibold text-[#0033A0]">{searchResult.departure.estimated}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">Puerta:</span>
                                                <span className="font-semibold">{searchResult.departure.gate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Llegada</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">Programada:</span>
                                                <span className="font-semibold">{searchResult.arrival.scheduled}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-[#0033A0]" />
                                                <span className="text-sm text-gray-600">Estimada:</span>
                                                <span className="font-semibold text-[#0033A0]">{searchResult.arrival.estimated}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">Puerta:</span>
                                                <span className="font-semibold">{searchResult.arrival.gate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Aircraft */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <Plane className="h-5 w-5 text-gray-600" />
                                        <span className="text-sm text-gray-600">Aeronave:</span>
                                        <span className="font-semibold">{searchResult.aircraft}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {searchResult && searchType === 'reservation' && (
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl text-[#0033A0]">
                                            Reserva {searchResult.code}
                                        </CardTitle>
                                        <p className="text-gray-600 mt-1">Pasajero: {searchResult.passenger}</p>
                                    </div>
                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold border-2 border-green-200">
                                        {searchResult.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-3">Información del Vuelo</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Vuelo:</span>
                                            <span className="font-semibold">{searchResult.flight?.number || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Ruta:</span>
                                            <span className="font-semibold">{searchResult.flight?.from?.code || ''} → {searchResult.flight?.to?.code || ''}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Fecha:</span>
                                            <span className="font-semibold">{searchResult.flight?.date || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Hora:</span>
                                            <span className="font-semibold">{searchResult.flight?.departure?.scheduled || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Asiento:</span>
                                            <span className="font-semibold">{searchResult.seat}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">Clase:</span>
                                            <span className="font-semibold">{searchResult.class}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button className="flex-1 bg-[#0033A0] hover:bg-blue-800">
                                        Ver Detalles Completos
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Check-in Online
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {searchResult === null && (flightNumber || reservationCode) && !isSearching && (
                        <Card className="bg-red-50 border-red-200">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-red-900 mb-1">No se encontraron resultados</h4>
                                        <p className="text-sm text-red-700">
                                            {searchType === 'flight'
                                                ? 'El número de vuelo ingresado no existe. Verifica que esté escrito correctamente.'
                                                : 'El código de reserva ingresado no existe. Verifica que esté escrito correctamente.'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
