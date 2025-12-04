'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plane, Plus, Edit, Trash2 } from 'lucide-react'
import { getAllFlights, createFlight, deleteFlight } from '@/lib/admin-actions'
import { format } from 'date-fns'

export default function AdminFlightsPage() {
    const [flights, setFlights] = useState<any[]>([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        capacity: '',
        availableSeats: ''
    })

    useEffect(() => {
        loadFlights()
    }, [])

    const loadFlights = async () => {
        try {
            const data = await getAllFlights()
            setFlights(data)
        } catch (error) {
            console.error('Error loading flights:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await createFlight({
                flightNumber: formData.flightNumber,
                origin: formData.origin.toUpperCase(),
                destination: formData.destination.toUpperCase(),
                departureTime: new Date(formData.departureTime),
                arrivalTime: new Date(formData.arrivalTime),
                price: parseFloat(formData.price),
                capacity: parseInt(formData.capacity),
                availableSeats: parseInt(formData.availableSeats)
            })

            setShowForm(false)
            setFormData({
                flightNumber: '',
                origin: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                price: '',
                capacity: '',
                availableSeats: ''
            })
            loadFlights()
        } catch (error) {
            console.error('Error creating flight:', error)
            alert('Error al crear el vuelo')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este vuelo?')) return

        try {
            await deleteFlight(id)
            loadFlights()
        } catch (error) {
            console.error('Error deleting flight:', error)
            alert('Error al eliminar el vuelo')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Gestión de Vuelos</h1>
                            <p className="text-blue-100">Administra todos los vuelos disponibles</p>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-white text-[#0033A0] hover:bg-blue-50"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Vuelo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 space-y-6">
                {/* Create Form */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Crear Nuevo Vuelo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Número de Vuelo</Label>
                                        <Input
                                            value={formData.flightNumber}
                                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                                            placeholder="OB-123"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Precio (USD)</Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Origen (Código)</Label>
                                        <Input
                                            value={formData.origin}
                                            onChange={(e) => setFormData({ ...formData, origin: e.target.value.toUpperCase() })}
                                            placeholder="LPB"
                                            maxLength={3}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Destino (Código)</Label>
                                        <Input
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value.toUpperCase() })}
                                            placeholder="VVI"
                                            maxLength={3}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Fecha/Hora Salida</Label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.departureTime}
                                            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Fecha/Hora Llegada</Label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.arrivalTime}
                                            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Capacidad Total</Label>
                                        <Input
                                            type="number"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Asientos Disponibles</Label>
                                        <Input
                                            type="number"
                                            value={formData.availableSeats}
                                            onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={loading} className="bg-[#0033A0]">
                                        {loading ? 'Creando...' : 'Crear Vuelo'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Flights List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Vuelos Registrados ({flights.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {flights.map((flight) => (
                                <div key={flight.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-blue-100 text-[#0033A0] rounded-full text-sm font-bold">
                                                    {flight.flightNumber}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {flight.origin} → {flight.destination}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Salida</p>
                                                    <p className="font-semibold">
                                                        {format(new Date(flight.departureTime), 'dd/MM/yyyy HH:mm')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Llegada</p>
                                                    <p className="font-semibold">
                                                        {format(new Date(flight.arrivalTime), 'dd/MM/yyyy HH:mm')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Precio</p>
                                                    <p className="font-semibold">${flight.price}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Disponibles</p>
                                                    <p className="font-semibold">{flight.availableSeats}/{flight.capacity}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(flight.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
