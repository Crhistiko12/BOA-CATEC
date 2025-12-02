'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash } from 'lucide-react'

// Datos simulados
const flights = [
    { id: '1', number: 'OB-760', route: 'LPB - VVI', time: '08:00', status: 'Programado', capacity: '120/150' },
    { id: '2', number: 'OB-761', route: 'VVI - LPB', time: '10:00', status: 'En Aire', capacity: '145/150' },
    { id: '3', number: 'OB-900', route: 'VVI - MIA', time: '22:00', status: 'Programado', capacity: '200/250' },
]

export default function AdminFlightManagementPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1E3A8A]">Gestión de Vuelos (Admin)</h1>
                <Button className="bg-[#1E3A8A]">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Vuelo
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Itinerario de Vuelos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="pb-3 font-semibold">Vuelo</th>
                                    <th className="pb-3 font-semibold">Ruta</th>
                                    <th className="pb-3 font-semibold">Hora</th>
                                    <th className="pb-3 font-semibold">Estado</th>
                                    <th className="pb-3 font-semibold">Ocupación</th>
                                    <th className="pb-3 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr key={flight.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-4 font-bold">{flight.number}</td>
                                        <td className="py-4">{flight.route}</td>
                                        <td className="py-4">{flight.time}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${flight.status === 'En Aire' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {flight.status}
                                            </span>
                                        </td>
                                        <td className="py-4">{flight.capacity}</td>
                                        <td className="py-4 text-right space-x-2">
                                            <Button size="sm" variant="outline">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
