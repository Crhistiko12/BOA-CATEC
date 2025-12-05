'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Plane, User, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { performCheckIn } from '@/lib/booking-actions'
import { sendCheckInEmail, sendCheckInWhatsApp } from '@/lib/notifications'

export default function CheckinPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [bookingCode, setBookingCode] = useState('')
    const [bookingData, setBookingData] = useState<any>(null)

    const handleCheckIn = async () => {
        if (!bookingCode.trim()) {
            setError('Por favor ingresa tu código de reserva')
            return
        }

        setLoading(true)
        setError('')

        try {
            const result = await performCheckIn(bookingCode)

            if (!result.success) {
                setError(result.error || 'Error al realizar check-in')
                setLoading(false)
                return
            }

            setBookingData(result.booking)

            // Enviar notificaciones (opcional, no bloquea el flujo)
            if (result.booking?.user?.email) {
                sendCheckInEmail({
                    email: result.booking.user.email,
                    name: result.booking.user.name || 'Pasajero',
                    bookingCode: bookingCode,
                    flightNumber: result.booking.flight.flightNumber,
                    origin: result.booking.flight.origin,
                    destination: result.booking.flight.destination,
                    departureTime: result.booking.flight.departureTime,
                    seatNumber: result.booking.tickets[0]?.seatNumber || 'N/A'
                }).catch(err => console.error('Error sending email:', err))
            }

            setStep(2)
            setLoading(false)
        } catch (err: any) {
            setError(err.message || 'Error al procesar check-in')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-[#0033A0] text-white py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Plane className="h-16 w-16 mx-auto mb-4 text-[#FFC72C]" />
                        <h1 className="text-4xl font-bold mb-4">Web Check-in</h1>
                        <p className="text-xl text-blue-100">
                            Realiza tu check-in online y ahorra tiempo en el aeropuerto
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Step 1: Enter Booking Code */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-[#0033A0]">Identifícate</CardTitle>
                                <p className="text-gray-600">Ingresa tu código de reserva</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Reserva
                                    </label>
                                    <Input
                                        placeholder="Ej: BOA-ABC123 o código completo"
                                        value={bookingCode}
                                        onChange={(e) => {
                                            setBookingCode(e.target.value.toUpperCase())
                                            setError('')
                                        }}
                                        className="text-lg"
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Encontrarás tu código en el email de confirmación
                                    </p>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-800 text-sm">{error}</p>
                                    </div>
                                )}

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-[#0033A0] mb-2">💡 Consejos</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• El check-in online abre 24 horas antes del vuelo</li>
                                        <li>• Asegúrate de tener tu código de reserva a mano</li>
                                        <li>• Lleva tu pase de abordar digital o impreso</li>
                                    </ul>
                                </div>

                                <Button
                                    onClick={handleCheckIn}
                                    disabled={!bookingCode || loading}
                                    className="w-full bg-[#0033A0] hover:bg-blue-800 text-lg py-6"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                            Procesando...
                                        </>
                                    ) : (
                                        'Realizar Check-in'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Confirmation */}
                    {step === 2 && bookingData && (
                        <Card>
                            <CardHeader>
                                <div className="text-center">
                                    <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
                                    <CardTitle className="text-3xl text-[#0033A0]">¡Check-in Completado!</CardTitle>
                                    <p className="text-gray-600 mt-2">Tu pase de abordar está listo</p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Boarding Pass Preview */}
                                <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-sm opacity-90">Pasajero</p>
                                            <p className="text-xl font-bold">
                                                {bookingData.passengers[0]?.firstName} {bookingData.passengers[0]?.lastName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm opacity-90">Vuelo</p>
                                            <p className="text-xl font-bold">{bookingData.flight.flightNumber}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <p className="text-xs opacity-75">Origen</p>
                                            <p className="text-2xl font-bold">{bookingData.flight.origin}</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Plane className="h-6 w-6" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-75">Destino</p>
                                            <p className="text-2xl font-bold">{bookingData.flight.destination}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
                                        <div>
                                            <p className="text-xs opacity-75">Fecha</p>
                                            <p className="font-semibold">
                                                {new Date(bookingData.flight.departureTime).toLocaleDateString('es-BO', {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">Hora</p>
                                            <p className="font-semibold">
                                                {new Date(bookingData.flight.departureTime).toLocaleTimeString('es-BO', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">Asiento</p>
                                            <p className="font-semibold">{bookingData.tickets[0]?.seatNumber || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <p className="text-xs opacity-75">Código de Reserva</p>
                                        <p className="font-mono font-bold text-lg">{bookingCode}</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante</h4>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• Llega al aeropuerto 2 horas antes del vuelo</li>
                                        <li>• Presenta tu pase de abordar y documento de identidad</li>
                                        <li>• El embarque cierra 30 minutos antes de la salida</li>
                                    </ul>
                                </div>

                                {bookingData.user?.email && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-green-800 text-sm">
                                            ✓ Se ha enviado una confirmación a {bookingData.user.email}
                                        </p>
                                    </div>
                                )}

                                <Link href="/dashboard">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Volver al Dashboard
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
