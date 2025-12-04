'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Calendar, RefreshCw, CreditCard, XCircle, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ManageBookingPage({ params }: { params: { id: string } }) {
    const [selectedAction, setSelectedAction] = useState<string | null>(null)

    const booking = {
        id: params.id,
        reservationCode: 'BOA-900',
        flight: {
            number: 'OB-760',
            from: 'MIA',
            to: 'VVI',
            date: '15 Dic, 2025',
            time: '22:00'
        }
    }

    const actions = [
        {
            id: 'change-date',
            icon: Calendar,
            title: 'Cambiar Fecha',
            description: 'Modifica la fecha de tu vuelo',
            color: 'blue'
        },
        {
            id: 'change-seat',
            icon: Plane,
            title: 'Cambiar Asiento',
            description: 'Selecciona un nuevo asiento',
            color: 'green'
        },
        {
            id: 'add-services',
            icon: CreditCard,
            title: 'Servicios Adicionales',
            description: 'Equipaje extra, comidas, etc.',
            color: 'purple'
        },
        {
            id: 'request-refund',
            icon: RefreshCw,
            title: 'Solicitar Reembolso',
            description: 'Cancela y solicita devolución',
            color: 'orange'
        },
        {
            id: 'cancel',
            icon: XCircle,
            title: 'Cancelar Vuelo',
            description: 'Cancela tu reserva',
            color: 'red'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-[#0033A0] text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <Link href="/my-bookings" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Mis Reservas
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Gestionar Reserva</h1>
                    <p className="text-blue-200">
                        Vuelo {booking.flight.number}: {booking.flight.from} → {booking.flight.to}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {!selectedAction ? (
                    /* Action Selection */
                    <div className="max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-[#0033A0]">¿Qué deseas hacer?</CardTitle>
                                <p className="text-gray-600">Selecciona una opción para gestionar tu reserva</p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {actions.map((action) => {
                                        const Icon = action.icon
                                        const colorClasses = {
                                            blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700',
                                            green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700',
                                            purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
                                            orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
                                            red: 'bg-red-50 border-red-200 hover:bg-red-100 text-red-700'
                                        }

                                        return (
                                            <button
                                                key={action.id}
                                                onClick={() => setSelectedAction(action.id)}
                                                className={`p-6 border-2 rounded-lg text-left transition-all ${colorClasses[action.color as keyof typeof colorClasses]}`}
                                            >
                                                <Icon className="h-8 w-8 mb-3" />
                                                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                                                <p className="text-sm opacity-80">{action.description}</p>
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info Card */}
                        <Card className="mt-6 bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-blue-900 mb-2">Información Importante</h4>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• Los cambios pueden estar sujetos a diferencia tarifaria</li>
                                            <li>• Las cancelaciones deben hacerse al menos 24h antes del vuelo</li>
                                            <li>• Los reembolsos se procesan en 7-15 días hábiles</li>
                                            <li>• Algunos servicios adicionales no son reembolsables</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    /* Action Details */
                    <div className="max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedAction(null)}
                                    className="mb-4"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver
                                </Button>
                                <CardTitle className="text-2xl text-[#0033A0]">
                                    {actions.find(a => a.id === selectedAction)?.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedAction === 'change-date' && (
                                    <div className="space-y-6">
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p className="text-yellow-800 text-sm">
                                                ⚠️ Cambiar la fecha puede generar una diferencia tarifaria. Te mostraremos el costo antes de confirmar.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-4">Vuelo Actual</h4>
                                            <div className="bg-gray-100 rounded-lg p-4">
                                                <p className="text-sm text-gray-600">Fecha actual</p>
                                                <p className="font-bold text-lg">{booking.flight.date} - {booking.flight.time}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-4">Fechas Disponibles</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {['14 Dic, 2025 - 18:00', '15 Dic, 2025 - 14:00', '16 Dic, 2025 - 10:00', '17 Dic, 2025 - 22:00'].map((date, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#0033A0] hover:bg-blue-50 transition-all text-left"
                                                    >
                                                        <p className="font-semibold">{date}</p>
                                                        <p className="text-sm text-green-600">Disponible • +$50 USD</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <Button className="w-full bg-[#0033A0] hover:bg-blue-800">
                                            Continuar con el Cambio
                                        </Button>
                                    </div>
                                )}

                                {selectedAction === 'change-seat' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-600">
                                            Selecciona un nuevo asiento para tu vuelo. Los asientos con espacio extra tienen un costo adicional.
                                        </p>

                                        <div className="bg-gray-100 rounded-lg p-6">
                                            <p className="text-center text-gray-600 mb-4">Asiento Actual: <span className="font-bold text-[#0033A0]">12F</span></p>
                                            <div className="text-center">
                                                <Plane className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Mapa de asientos disponible en el siguiente paso</p>
                                            </div>
                                        </div>

                                        <Link href="/checkin">
                                            <Button className="w-full bg-[#0033A0] hover:bg-blue-800">
                                                Ver Mapa de Asientos
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {selectedAction === 'add-services' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-600">
                                            Agrega servicios adicionales para mejorar tu experiencia de viaje.
                                        </p>

                                        <div className="space-y-4">
                                            {[
                                                { name: 'Equipaje Extra (23kg)', price: 35 },
                                                { name: 'Comida a Bordo', price: 15 },
                                                { name: 'Asiento Premium', price: 25 },
                                                { name: 'Acceso a Sala VIP', price: 45 }
                                            ].map((service, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:border-[#0033A0] transition-all">
                                                    <div>
                                                        <p className="font-semibold">{service.name}</p>
                                                        <p className="text-sm text-gray-600">${service.price} USD</p>
                                                    </div>
                                                    <Button variant="outline">Agregar</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedAction === 'request-refund' && (
                                    <div className="space-y-6">
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <p className="text-orange-800 text-sm">
                                                ⚠️ Al solicitar un reembolso, tu reserva será cancelada. El proceso toma entre 7-15 días hábiles.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-4">Detalles del Reembolso</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between p-3 bg-gray-50 rounded">
                                                    <span>Tarifa base</span>
                                                    <span className="font-semibold">$450 USD</span>
                                                </div>
                                                <div className="flex justify-between p-3 bg-gray-50 rounded">
                                                    <span>Impuestos reembolsables</span>
                                                    <span className="font-semibold">$65 USD</span>
                                                </div>
                                                <div className="flex justify-between p-3 bg-red-50 rounded">
                                                    <span>Cargo por cancelación</span>
                                                    <span className="font-semibold text-red-600">-$100 USD</span>
                                                </div>
                                                <div className="flex justify-between p-3 bg-green-50 rounded border-2 border-green-200">
                                                    <span className="font-bold">Total a reembolsar</span>
                                                    <span className="font-bold text-green-600">$415 USD</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Link href="/refunds">
                                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                                Continuar con Reembolso
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {selectedAction === 'cancel' && (
                                    <div className="space-y-6">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-red-800 font-semibold mb-2">⚠️ Acción Irreversible</p>
                                            <p className="text-red-700 text-sm">
                                                Esta acción cancelará permanentemente tu reserva. Si deseas un reembolso, usa la opción "Solicitar Reembolso" en su lugar.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-4">Información de Cancelación</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• La cancelación es inmediata y no reversible</li>
                                                <li>• No se realizará ningún reembolso automático</li>
                                                <li>• Deberás solicitar el reembolso por separado</li>
                                                <li>• Se aplicarán cargos según la tarifa contratada</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-4">
                                            <label className="flex items-center gap-3">
                                                <input type="checkbox" className="w-5 h-5" />
                                                <span className="text-sm">Entiendo que esta acción es irreversible</span>
                                            </label>
                                        </div>

                                        <Button variant="destructive" className="w-full">
                                            Cancelar Reserva
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
