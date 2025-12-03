'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Plane, User, Luggage } from 'lucide-react'
import Link from 'next/link'

export default function CheckinPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        reservationCode: '',
        lastName: '',
        selectedSeat: ''
    })

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
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

            {/* Progress Steps */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            {[
                                { num: 1, title: 'Identificación', icon: User },
                                { num: 2, title: 'Selección de Asiento', icon: Plane },
                                { num: 3, title: 'Confirmación', icon: CheckCircle2 }
                            ].map((s, idx) => {
                                const Icon = s.icon
                                return (
                                    <div key={s.num} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center flex-1">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${step >= s.num
                                                    ? 'bg-[#0033A0] text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                {step > s.num ? (
                                                    <CheckCircle2 className="h-6 w-6" />
                                                ) : (
                                                    <Icon className="h-6 w-6" />
                                                )}
                                            </div>
                                            <p className={`text-sm font-medium text-center ${step >= s.num ? 'text-[#0033A0]' : 'text-gray-500'
                                                }`}>
                                                {s.title}
                                            </p>
                                        </div>
                                        {idx < 2 && (
                                            <div className={`h-1 flex-1 mx-4 transition-all ${step > s.num ? 'bg-[#0033A0]' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Step 1: Identification */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-[#0033A0]">Identifícate</CardTitle>
                                <p className="text-gray-600">Ingresa los datos de tu reserva</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Reserva
                                    </label>
                                    <Input
                                        placeholder="Ej: XYH2B"
                                        value={formData.reservationCode}
                                        onChange={(e) => setFormData({ ...formData, reservationCode: e.target.value.toUpperCase() })}
                                        className="text-lg"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Encontrarás tu código en el email de confirmación
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Apellido del Pasajero
                                    </label>
                                    <Input
                                        placeholder="Como aparece en tu boleto"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="text-lg"
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-[#0033A0] mb-2">💡 Consejos</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• El check-in online abre 24 horas antes del vuelo</li>
                                        <li>• Puedes seleccionar tu asiento preferido</li>
                                        <li>• Lleva tu pase de abordar digital o impreso</li>
                                    </ul>
                                </div>

                                <Button
                                    onClick={handleNext}
                                    disabled={!formData.reservationCode || !formData.lastName}
                                    className="w-full bg-[#0033A0] hover:bg-blue-800 text-lg py-6"
                                >
                                    Buscar Reserva
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Seat Selection */}
                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-[#0033A0]">Selecciona tu Asiento</CardTitle>
                                <p className="text-gray-600">Vuelo OB-760: Miami (MIA) → Santa Cruz (VVI)</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-gray-100 rounded-lg p-6">
                                    <div className="text-center mb-6">
                                        <Plane className="h-12 w-12 mx-auto text-[#0033A0] mb-2" />
                                        <p className="text-sm text-gray-600">Boeing 737-800 • 180 asientos</p>
                                    </div>

                                    {/* Seat Map Simulation */}
                                    <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
                                        {['A', 'B', 'C', '', 'D', 'E', 'F'].map((letter, idx) => (
                                            <div key={idx} className="text-center text-xs font-semibold text-gray-500">
                                                {letter}
                                            </div>
                                        ))}
                                        {Array.from({ length: 12 }).map((_, rowIdx) => (
                                            ['A', 'B', 'C', '', 'D', 'E', 'F'].map((letter, colIdx) => {
                                                if (letter === '') {
                                                    return <div key={`${rowIdx}-${colIdx}`} className="text-center text-xs text-gray-400">{rowIdx + 1}</div>
                                                }
                                                const seatId = `${rowIdx + 1}${letter}`
                                                const isOccupied = Math.random() > 0.6
                                                const isSelected = formData.selectedSeat === seatId

                                                return (
                                                    <button
                                                        key={seatId}
                                                        onClick={() => !isOccupied && setFormData({ ...formData, selectedSeat: seatId })}
                                                        disabled={isOccupied}
                                                        className={`h-8 rounded text-xs font-medium transition-all ${isSelected
                                                                ? 'bg-[#0033A0] text-white'
                                                                : isOccupied
                                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                    : 'bg-white border-2 border-gray-300 hover:border-[#0033A0] hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        {seatId}
                                                    </button>
                                                )
                                            })
                                        ))}
                                    </div>

                                    <div className="flex justify-center gap-6 mt-6 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
                                            <span>Disponible</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                            <span>Ocupado</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-[#0033A0] rounded"></div>
                                            <span>Seleccionado</span>
                                        </div>
                                    </div>
                                </div>

                                {formData.selectedSeat && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-green-800 font-medium">
                                            ✓ Asiento {formData.selectedSeat} seleccionado
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <Button
                                        onClick={handleBack}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Atrás
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        disabled={!formData.selectedSeat}
                                        className="flex-1 bg-[#0033A0] hover:bg-blue-800"
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
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
                                            <p className="text-xl font-bold">{formData.lastName.toUpperCase()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm opacity-90">Vuelo</p>
                                            <p className="text-xl font-bold">OB-760</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <p className="text-xs opacity-75">Origen</p>
                                            <p className="text-2xl font-bold">MIA</p>
                                            <p className="text-xs">Miami</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Plane className="h-6 w-6" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-75">Destino</p>
                                            <p className="text-2xl font-bold">VVI</p>
                                            <p className="text-xs">Santa Cruz</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 border-t border-white/20 pt-4">
                                        <div>
                                            <p className="text-xs opacity-75">Fecha</p>
                                            <p className="font-semibold">15 Dic</p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">Hora</p>
                                            <p className="font-semibold">22:00</p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">Puerta</p>
                                            <p className="font-semibold">4</p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-75">Asiento</p>
                                            <p className="font-semibold">{formData.selectedSeat}</p>
                                        </div>
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

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        📧 Enviar por Email
                                    </Button>
                                    <Button
                                        className="w-full bg-[#0033A0] hover:bg-blue-800"
                                    >
                                        📥 Descargar PDF
                                    </Button>
                                </div>

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
