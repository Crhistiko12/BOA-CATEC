'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, QrCode, CheckCircle } from 'lucide-react'
import { createBooking } from '@/lib/booking-actions' // We need to create this

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const flightId = searchParams.get('flightId')
    const passengersCount = parseInt(searchParams.get('passengers') || '1')

    const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false)
    const [passengers, setPassengers] = useState(Array(passengersCount).fill({ firstName: '', lastName: '', type: 'ADULT' }))
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card')

    // Redirect if no flightId is provided
    useEffect(() => {
        if (!flightId) {
            router.push('/')
        }
    }, [flightId, router])

    const handlePassengerChange = (index: number, field: string, value: string) => {
        const newPassengers = [...passengers]
        newPassengers[index] = { ...newPassengers[index], [field]: value }
        setPassengers(newPassengers)
    }

    const handlePayment = async () => {
        if (!flightId) return // Guard clause for safety

        setLoading(true)
        try {
            // Simulate API call to create booking and process payment
            const result = await createBooking({
                flightId,
                passengers,
                paymentMethod
            })

            if (result.success) {
                setStep(3)
                // Simulate email sending here or in server action
            }
        } catch (error) {
            console.error('Payment failed', error)
        } finally {
            setLoading(false)
        }
    }

    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-8">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="h-20 w-20 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0033A0] mb-4">¡Compra Exitosa!</h1>
                    <p className="text-gray-600 mb-8">
                        Tu compra ha sido confirmada. Hemos enviado los detalles a tu correo electrónico.
                    </p>
                    <div className="space-y-4">
                        <Button
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-[#0033A0] hover:bg-blue-800"
                        >
                            Ir al Dashboard
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/my-bookings')}
                            className="w-full"
                        >
                            Ver mi Boleto
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-3xl font-bold text-[#0033A0] mb-8">Finalizar Compra</h1>

                <div className="grid gap-8">
                    {/* Passenger Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos de Pasajeros</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {passengers.map((p, i) => (
                                <div key={i} className="p-4 border rounded-lg bg-gray-50">
                                    <h3 className="font-bold mb-4">Pasajero {i + 1}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Nombre</Label>
                                            <Input
                                                value={p.firstName}
                                                onChange={(e) => handlePassengerChange(i, 'firstName', e.target.value)}
                                                placeholder="Como figura en el documento"
                                            />
                                        </div>
                                        <div>
                                            <Label>Apellido</Label>
                                            <Input
                                                value={p.lastName}
                                                onChange={(e) => handlePassengerChange(i, 'lastName', e.target.value)}
                                                placeholder="Como figura en el documento"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Método de Pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div
                                    className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-[#0033A0] bg-blue-50' : 'border-gray-200'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <CreditCard className={`h-8 w-8 ${paymentMethod === 'card' ? 'text-[#0033A0]' : 'text-gray-400'}`} />
                                    <span className="font-bold">Tarjeta</span>
                                </div>
                                <div
                                    className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'qr' ? 'border-[#0033A0] bg-blue-50' : 'border-gray-200'}`}
                                    onClick={() => setPaymentMethod('qr')}
                                >
                                    <QrCode className={`h-8 w-8 ${paymentMethod === 'qr' ? 'text-[#0033A0]' : 'text-gray-400'}`} />
                                    <span className="font-bold">Pago QR</span>
                                </div>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <Input placeholder="Número de Tarjeta (Demo: 4242...)" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="MM/YY" />
                                        <Input placeholder="CVC" />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'qr' && (
                                <div className="text-center p-8 bg-gray-100 rounded-lg">
                                    <QrCode className="h-32 w-32 mx-auto text-gray-800 mb-4" />
                                    <p className="text-sm text-gray-600">Escanea este código para pagar con tu app de banco favorita</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-[#0033A0] hover:bg-blue-800 text-xl py-8"
                    >
                        {loading ? 'Procesando...' : 'Confirmar y Pagar'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
