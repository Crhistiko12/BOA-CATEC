'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MessageCircle, ArrowLeft, Check } from 'lucide-react'

export default function VincularWhatsAppPage() {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLinked, setIsLinked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleLink = async () => {
        if (!phoneNumber || phoneNumber.length < 8) {
            alert('Por favor ingresa un número válido')
            return
        }

        setIsLoading(true)

        try {
            // Llamar a la API de WhatsApp
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    type: 'link',
                    message: `¡Hola! Tu número +591 ${phoneNumber} ha sido vinculado exitosamente a BOA. Responde "SÍ" para activar las notificaciones de vuelo. 🛫`
                })
            })

            const data = await response.json()

            if (data.success) {
                setIsLinked(true)

                // Redirigir al dashboard después de 3 segundos
                setTimeout(() => {
                    router.push('/dashboard')
                }, 3000)
            } else {
                alert('Error al vincular número. Por favor intenta de nuevo.')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error de conexión. Por favor intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>

                    {!isLinked ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <MessageCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Vincular WhatsApp Oficial</CardTitle>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Recibe tu pase de abordar y alertas en tiempo real
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Benefits */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-3">Beneficios:</h3>
                                    <ul className="space-y-2 text-sm text-blue-800">
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <span>Recibe tu pase de abordar directamente en WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <span>Alertas de cambios de puerta y horarios</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <span>Notificaciones de check-in disponible</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                            <span>Soporte prioritario 24/7</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Número de WhatsApp</Label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-lg">
                                            <span className="text-gray-700 font-medium">+591</span>
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="70000000"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                            maxLength={8}
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Ingresa tu número sin el código de país
                                    </p>
                                </div>

                                {/* Activation Note */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Activación del servicio:</h4>
                                    <p className="text-sm text-gray-600">
                                        Recibirás un mensaje de confirmación en WhatsApp. Responde "SÍ" para activar las notificaciones.
                                    </p>
                                </div>

                                {/* Action Button */}
                                <Button
                                    onClick={handleLink}
                                    disabled={isLoading || phoneNumber.length < 8}
                                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Vinculando...
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle className="h-5 w-5 mr-2" />
                                            Vincular Número Ahora
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="text-center">
                            <CardContent className="py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                    <Check className="h-10 w-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    ¡Número Vinculado Exitosamente!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Hemos enviado un mensaje de confirmación a<br />
                                    <span className="font-semibold">+591 {phoneNumber}</span>
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                                    <p className="text-sm text-blue-900">
                                        Responde "SÍ" al mensaje para activar las notificaciones
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 mt-6">
                                    Redirigiendo al dashboard...
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
