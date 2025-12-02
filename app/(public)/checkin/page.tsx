'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckCircle2 } from 'lucide-react'

export default function CheckInPage() {
    const [step, setStep] = useState(1)
    const [bookingCode, setBookingCode] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-[600px]">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8 text-center">Web Check-in</h1>

                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Identifícate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Código de Reserva</Label>
                                    <Input
                                        placeholder="Ej: X7Y8Z9"
                                        value={bookingCode}
                                        onChange={(e) => setBookingCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Apellido del Pasajero</Label>
                                    <Input
                                        placeholder="Como aparece en el boleto"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-[#1E3A8A] h-12 text-lg">
                                    Buscar Reserva
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <Card className="text-center py-12">
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <CheckCircle2 className="h-20 w-20 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">¡Check-in Realizado!</h2>
                            <p className="text-gray-600">
                                Tu pase de abordar ha sido enviado a tu correo electrónico.
                                <br />
                                Asiento asignado: <strong>12F</strong>
                            </p>
                            <Button onClick={() => setStep(1)} variant="outline">
                                Volver al inicio
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
