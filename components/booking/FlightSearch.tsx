'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function FlightSearch() {
    const router = useRouter()
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [passengers, setPassengers] = useState(1)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams({
            origin,
            destination,
            date,
            passengers: passengers.toString(),
        })
        router.push(`/flights?${params.toString()}`)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="origin" className="text-gray-700 font-semibold">Origen</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="origin"
                                placeholder="¿Desde dónde?"
                                className="pl-9"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="destination" className="text-gray-700 font-semibold">Destino</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="destination"
                                placeholder="¿A dónde vas?"
                                className="pl-9"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-gray-700 font-semibold">Fecha</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="date"
                                type="date"
                                className="pl-9"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold h-10">
                        Buscar Vuelos
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
