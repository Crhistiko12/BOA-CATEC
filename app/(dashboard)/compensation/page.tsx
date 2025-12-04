'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Check, Clock, DollarSign } from 'lucide-react'

export default function CompensationPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        flightNumber: '',
        date: '',
        delayHours: '',
        bookingReference: '',
        email: '',
        phone: '',
        reason: '',
        bankAccount: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <Card className="text-center">
                            <CardContent className="py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                    <Check className="h-10 w-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    ¡Solicitud Enviada!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Tu solicitud de compensación ha sido registrada con éxito.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                                    <p className="text-sm text-blue-900">
                                        <strong>Tiempo de respuesta:</strong> 5-7 días hábiles<br />
                                        Recibirás un email con el estado de tu solicitud.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="bg-[#0033A0]"
                                >
                                    Volver al Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <DollarSign className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Solicitud de Compensación</h1>
                        <p className="text-xl text-blue-100">
                            Si tu vuelo tuvo un retraso significativo, puedes solicitar una compensación
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6 text-center">
                            <Clock className="h-12 w-12 mx-auto text-[#0033A0] mb-4" />
                            <h3 className="font-bold text-lg mb-2">Retraso de 2-4 horas</h3>
                            <p className="text-3xl font-bold text-[#0033A0] mb-2">Bs. 500</p>
                            <p className="text-sm text-gray-600">Compensación base</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="pt-6 text-center">
                            <Clock className="h-12 w-12 mx-auto text-[#FFC72C] mb-4" />
                            <h3 className="font-bold text-lg mb-2">Retraso de 4-6 horas</h3>
                            <p className="text-3xl font-bold text-[#FFC72C] mb-2">Bs. 1,000</p>
                            <p className="text-sm text-gray-600">Compensación media</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-50 border-red-200">
                        <CardContent className="pt-6 text-center">
                            <Clock className="h-12 w-12 mx-auto text-red-600 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Retraso +6 horas</h3>
                            <p className="text-3xl font-bold text-red-600 mb-2">Bs. 2,000</p>
                            <p className="text-sm text-gray-600">Compensación máxima</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Form */}
                <Card className="max-w-3xl mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[#0033A0]">
                            Formulario de Compensación
                        </CardTitle>
                        <CardDescription>
                            Completa todos los campos para procesar tu solicitud
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="flightNumber">Número de Vuelo *</Label>
                                    <Input
                                        id="flightNumber"
                                        placeholder="Ej: OB-760"
                                        value={formData.flightNumber}
                                        onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="date">Fecha del Vuelo *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="delayHours">Horas de Retraso *</Label>
                                    <Input
                                        id="delayHours"
                                        type="number"
                                        placeholder="Ej: 4"
                                        value={formData.delayHours}
                                        onChange={(e) => setFormData({ ...formData, delayHours: e.target.value })}
                                        required
                                        min="2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bookingReference">Código de Reserva *</Label>
                                    <Input
                                        id="bookingReference"
                                        placeholder="Ej: BOA123456"
                                        value={formData.bookingReference}
                                        onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Teléfono *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="70000000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="bankAccount">Número de Cuenta Bancaria *</Label>
                                <Input
                                    id="bankAccount"
                                    placeholder="Para transferencia de compensación"
                                    value={formData.bankAccount}
                                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    La compensación será depositada en esta cuenta
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="reason">Descripción del Retraso *</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Describe las circunstancias del retraso..."
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>

                            <Card className="bg-yellow-50 border-yellow-200">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                                        <div className="text-sm text-yellow-900">
                                            <p className="font-semibold mb-2">Documentación Requerida:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Pase de abordar original</li>
                                                <li>Comprobante de retraso (proporcionado por BOA)</li>
                                                <li>Identificación oficial</li>
                                            </ul>
                                            <p className="mt-2">
                                                Envía estos documentos a: compensaciones@boa.bo
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-[#0033A0] hover:bg-blue-800"
                                >
                                    Enviar Solicitud
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
