'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, Plane } from 'lucide-react'

export default function FlightStatusPage() {
    const [flightNumber, setFlightNumber] = useState('')
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulación de búsqueda
        setTimeout(() => {
            setStatus({
                number: flightNumber.toUpperCase(),
                route: 'VVI - MIA',
                status: 'A TIEMPO',
                departure: '10:00 AM',
                arrival: '04:00 PM',
                gate: 'A4'
            })
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-[600px]">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#1E3A8A]">Estado de Vuelo</h1>
                    <p className="text-gray-600">
                        Consulta el estado actual de cualquier vuelo de BOA en tiempo real.
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Número de vuelo (ej: OB-760)"
                                    value={flightNumber}
                                    onChange={(e) => setFlightNumber(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <Button type="submit" className="h-12 px-8 bg-[#1E3A8A]" disabled={loading}>
                                {loading ? 'Buscando...' : <Search className="h-5 w-5" />}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {status && (
                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl">Vuelo {status.number}</CardTitle>
                                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-bold">
                                    {status.status}
                                </span>
                            </div>
                            <CardDescription className="text-lg">{status.route}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm text-gray-500">Salida</p>
                                    <p className="text-xl font-bold">{status.departure}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Llegada</p>
                                    <p className="text-xl font-bold">{status.arrival}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Puerta</p>
                                    <p className="text-xl font-bold">{status.gate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
