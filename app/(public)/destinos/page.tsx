'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Plane, Sun, Mountain, Building2, Palmtree } from 'lucide-react'
import Link from 'next/link'

const destinations = [
    {
        id: 1,
        code: 'VVI',
        city: 'Santa Cruz',
        country: 'Bolivia',
        description: 'Ciudad tropical con rica cultura y gastronomía',
        image: '🌴',
        icon: Palmtree,
        flights: 15,
        price: 120
    },
    {
        id: 2,
        code: 'LPB',
        city: 'La Paz',
        country: 'Bolivia',
        description: 'La ciudad más alta del mundo',
        image: '⛰️',
        icon: Mountain,
        flights: 12,
        price: 150
    },
    {
        id: 3,
        code: 'MIA',
        city: 'Miami',
        country: 'Estados Unidos',
        description: 'Playas paradisíacas y vida nocturna',
        image: '🏖️',
        icon: Sun,
        flights: 8,
        price: 450
    },
    {
        id: 4,
        code: 'MAD',
        city: 'Madrid',
        country: 'España',
        description: 'Capital europea llena de historia',
        image: '🏛️',
        icon: Building2,
        flights: 5,
        price: 850
    },
    {
        id: 5,
        code: 'CBB',
        city: 'Cochabamba',
        country: 'Bolivia',
        description: 'La ciudad del eterno clima primaveral',
        image: '🌺',
        icon: Sun,
        flights: 18,
        price: 110
    },
    {
        id: 6,
        code: 'CUZ',
        city: 'Cusco',
        country: 'Perú',
        description: 'Puerta de entrada a Machu Picchu',
        image: '🏔️',
        icon: Mountain,
        flights: 6,
        price: 180
    }
]

export default function DestinosPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'nacional' | 'internacional'>('all')

    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.code.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'nacional' && dest.country === 'Bolivia') ||
            (selectedCategory === 'internacional' && dest.country !== 'Bolivia')

        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <MapPin className="h-16 w-16 mx-auto mb-4 text-[#FFC72C]" />
                        <h1 className="text-4xl font-bold mb-4">Nuestros Destinos</h1>
                        <p className="text-xl text-blue-100">
                            Descubre todos los lugares a los que puedes volar con BOA
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Search and Filters */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            placeholder="Buscar destino..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Category Filters */}
                                <div className="flex gap-2">
                                    <Button
                                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                        onClick={() => setSelectedCategory('all')}
                                        className={selectedCategory === 'all' ? 'bg-[#0033A0] hover:bg-blue-800' : ''}
                                    >
                                        Todos
                                    </Button>
                                    <Button
                                        variant={selectedCategory === 'nacional' ? 'default' : 'outline'}
                                        onClick={() => setSelectedCategory('nacional')}
                                        className={selectedCategory === 'nacional' ? 'bg-[#0033A0] hover:bg-blue-800' : ''}
                                    >
                                        Nacional
                                    </Button>
                                    <Button
                                        variant={selectedCategory === 'internacional' ? 'default' : 'outline'}
                                        onClick={() => setSelectedCategory('internacional')}
                                        className={selectedCategory === 'internacional' ? 'bg-[#0033A0] hover:bg-blue-800' : ''}
                                    >
                                        Internacional
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Count */}
                    <div className="text-sm text-gray-600">
                        Mostrando {filteredDestinations.length} de {destinations.length} destinos
                    </div>

                    {/* Destinations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDestinations.map((dest) => {
                            const Icon = dest.icon
                            return (
                                <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <div className="h-48 bg-gradient-to-br from-[#0033A0] to-blue-600 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                                        <div className="text-8xl z-10">{dest.image}</div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="font-bold text-[#0033A0]">{dest.code}</span>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{dest.city}</h3>
                                                <p className="text-sm text-gray-600">{dest.country}</p>
                                            </div>
                                            <Icon className="h-6 w-6 text-[#0033A0]" />
                                        </div>

                                        <p className="text-sm text-gray-700 mb-4">{dest.description}</p>

                                        <div className="flex items-center justify-between mb-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Plane className="h-4 w-4" />
                                                <span>{dest.flights} vuelos/semana</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Desde</p>
                                                <p className="text-2xl font-bold text-[#0033A0]">${dest.price}</p>
                                            </div>
                                        </div>

                                        <Link href={`/vuelos?destino=${dest.code}`}>
                                            <Button className="w-full bg-[#0033A0] hover:bg-blue-800">
                                                Ver Vuelos
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* No Results */}
                    {filteredDestinations.length === 0 && (
                        <Card className="p-12">
                            <div className="text-center">
                                <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No se encontraron destinos
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Intenta con otros términos de búsqueda
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedCategory('all')
                                    }}
                                    variant="outline"
                                >
                                    Limpiar filtros
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
