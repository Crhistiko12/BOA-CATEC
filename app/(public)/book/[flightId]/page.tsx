'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SeatSelector from '@/components/booking/SeatSelector'
import PaymentForm from '@/components/booking/PaymentForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, User } from 'lucide-react'

export default function BookingPage() {
    const params = useParams()
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [selectedSeats, setSelectedSeats] = useState<any[]>([])
    const [passengers, setPassengers] = useState<any[]>([])

    const handleSeatSelect = (seats: any[]) => {
        setSelectedSeats(seats)
        // Inicializar formulario de pasajeros
        const newPassengers = seats.map((seat, index) => ({
            seatId: seat.id,
            seatNumber: seat.number,
            firstName: '',
            lastName: '',
            passport: ''
        }))
        setPassengers(newPassengers)
    }

    const handlePassengerChange = (index: number, field: string, value: string) => {
        const newPassengers = [...passengers]
        newPassengers[index] = { ...newPassengers[index], [field]: value }
        setPassengers(newPassengers)
    }

    const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0) + 150 // Base price placeholder

    if (step === 4) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="max-w-md mx-auto bg-green-50 p-8 rounded-xl border border-green-200">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-800 mb-2">¡Reserva Confirmada!</h2>
                    <p className="text-green-700 mb-6">
                        Tu vuelo ha sido reservado exitosamente. Hemos enviado los boletos a tu correo electrónico y WhatsApp.
                    </p>
                    <Button onClick={() => router.push('/dashboard')} className="bg-green-600 hover:bg-green-700 text-white">
                        Ir a Mis Viajes
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-center mb-8">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#1E3A8A] text-white' : 'bg-gray-200'}`}>1</div>
                    <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#1E3A8A]' : 'bg-gray-200'}`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#1E3A8A] text-white' : 'bg-gray-200'}`}>2</div>
                    <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#1E3A8A]' : 'bg-gray-200'}`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#1E3A8A] text-white' : 'bg-gray-200'}`}>3</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Selecciona tus Asientos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SeatSelector onSeatSelect={handleSeatSelect} maxSeats={5} />
                                <div className="mt-8 flex justify-end">
                                    <Button
                                        onClick={() => setStep(2)}
                                        disabled={selectedSeats.length === 0}
                                        className="bg-[#1E3A8A]"
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Datos de Pasajeros</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {passengers.map((passenger, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg space-y-4">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <User className="h-4 w-4" /> Pasajero {idx + 1} (Asiento {passenger.seatNumber})
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nombre</Label>
                                                <Input
                                                    value={passenger.firstName}
                                                    onChange={(e) => handlePassengerChange(idx, 'firstName', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Apellido</Label>
                                                <Input
                                                    value={passenger.lastName}
                                                    onChange={(e) => handlePassengerChange(idx, 'lastName', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Pasaporte / CI</Label>
                                                <Input
                                                    value={passenger.passport}
                                                    onChange={(e) => handlePassengerChange(idx, 'passport', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => setStep(1)}>Atrás</Button>
                                    <Button onClick={() => setStep(3)} className="bg-[#1E3A8A]">Ir a Pagar</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {step === 3 && (
                        <PaymentForm amount={totalAmount} onPaymentComplete={() => setStep(4)} />
                    )}
                </div>

                <div>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Resumen de Compra</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Vuelo</span>
                                <span className="font-bold">OB-760</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Ruta</span>
                                <span className="font-bold">LPB - VVI</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Tarifa Base</span>
                                    <span>$150.00</span>
                                </div>
                                {selectedSeats.map((seat) => (
                                    <div key={seat.id} className="flex justify-between text-sm text-gray-600">
                                        <span>Asiento {seat.number}</span>
                                        <span>${seat.price.toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4 text-[#1E3A8A]">
                                    <span>Total</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
