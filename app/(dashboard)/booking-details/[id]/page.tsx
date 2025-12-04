'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Calendar, Clock, User, Luggage, MapPin, Download, Share2, Printer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
    // En producción, esto vendría de la base de datos
    const booking = {
        id: params.id,
        reservationCode: 'BOA-900',
        status: 'Confirmado',
        flight: {
            number: 'OB-760',
            from: { code: 'MIA', city: 'Miami', country: 'Estados Unidos' },
            to: { code: 'VVI', city: 'Santa Cruz', country: 'Bolivia' },
            date: '15 Dic, 2025',
            time: '22:00',
            duration: '7h 00m',
            aircraft: 'Boeing 737-800',
            gate: '4',
            terminal: 'Terminal 3'
        },
        passenger: {
            name: 'Diego Test',
            email: 'diego.test@boa.bo',
            phone: '+591 70000000',
            document: 'CI 1234567',
            seat: '12F',
            class: 'Económica'
        },
        baggage: {
            cabin: '10 kg',
            checked: '23 kg',
            pieces: 1
        },
        price: {
            base: 450,
            taxes: 85,
            total: 535,
            currency: 'USD'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-[#0033A0] text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <Link href="/my-bookings" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Mis Reservas
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Detalles de Reserva</h1>
                    <p className="text-blue-200">Código: {booking.reservationCode}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Flight Info */}
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl text-[#0033A0]">Información del Vuelo</CardTitle>
                                        <p className="text-gray-600 mt-1">Vuelo {booking.flight.number}</p>
                                    </div>
                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                        {booking.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Route */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="text-4xl font-bold text-gray-900">{booking.flight.from.code}</div>
                                        <div className="text-sm text-gray-600">{booking.flight.from.city}</div>
                                        <div className="text-xs text-gray-500">{booking.flight.from.country}</div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center px-4">
                                        <Plane className="h-8 w-8 text-[#0033A0] mb-2" />
                                        <div className="w-full h-1 bg-gradient-to-r from-[#0033A0] to-blue-400 rounded"></div>
                                        <div className="text-xs text-gray-500 mt-2">{booking.flight.duration}</div>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <div className="text-4xl font-bold text-gray-900">{booking.flight.to.code}</div>
                                        <div className="text-sm text-gray-600">{booking.flight.to.city}</div>
                                        <div className="text-xs text-gray-500">{booking.flight.to.country}</div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">Fecha</span>
                                        </div>
                                        <div className="font-semibold text-gray-900">{booking.flight.date}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">Hora</span>
                                        </div>
                                        <div className="font-semibold text-gray-900">{booking.flight.time}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">Puerta</span>
                                        </div>
                                        <div className="font-semibold text-gray-900">{booking.flight.gate}</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Plane className="h-4 w-4" />
                                            <span className="text-sm">Aeronave</span>
                                        </div>
                                        <div className="font-semibold text-gray-900 text-sm">{booking.flight.aircraft}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Passenger Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#0033A0]">Información del Pasajero</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm">Nombre Completo</span>
                                        </div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Documento</div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.document}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Email</div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Teléfono</div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.phone}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Asiento</div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.seat}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Clase</div>
                                        <div className="font-semibold text-gray-900">{booking.passenger.class}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Baggage Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#0033A0]">Equipaje Incluido</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Luggage className="h-6 w-6 text-[#0033A0]" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Equipaje de Mano</div>
                                            <div className="font-semibold text-gray-900">{booking.baggage.cabin}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Luggage className="h-6 w-6 text-[#0033A0]" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Equipaje Facturado</div>
                                            <div className="font-semibold text-gray-900">{booking.baggage.checked}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Luggage className="h-6 w-6 text-[#0033A0]" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Piezas</div>
                                            <div className="font-semibold text-gray-900">{booking.baggage.pieces}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Price Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#0033A0]">Resumen de Precio</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tarifa base</span>
                                    <span className="font-semibold">${booking.price.base}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Impuestos y tasas</span>
                                    <span className="font-semibold">${booking.price.taxes}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg text-[#0033A0]">
                                        ${booking.price.total} {booking.price.currency}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#0033A0]">Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/checkin">
                                    <Button className="w-full bg-[#0033A0] hover:bg-blue-800">
                                        <Plane className="h-4 w-4 mr-2" />
                                        Check-in Online
                                    </Button>
                                </Link>
                                <Link href={`/manage-booking/${booking.id}`}>
                                    <Button variant="outline" className="w-full">
                                        Gestionar Reserva
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar PDF
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Imprimir
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Compartir
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Important Info */}
                        <Card className="bg-yellow-50 border-yellow-200">
                            <CardHeader>
                                <CardTitle className="text-lg text-yellow-800">⚠️ Importante</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-yellow-700">
                                <p>• Llega 2 horas antes del vuelo internacional</p>
                                <p>• Presenta tu documento de identidad</p>
                                <p>• El embarque cierra 30 min antes</p>
                                <p>• Verifica los requisitos de entrada al destino</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
