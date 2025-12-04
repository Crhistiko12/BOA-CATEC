'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MessageCircle, ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react'

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

    if (isLinked) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-[#0a0e27] flex items-center justify-center py-20 px-4">
                <div className="group relative max-w-md mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-green-500/30 text-center">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                            <Check className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">¡Número Vinculado!</h2>
                        <p className="text-white/70 text-center mb-6">
                            Hemos enviado un mensaje de confirmación a<br />
                            <span className="font-semibold text-green-300">+591 {phoneNumber}</span>
                        </p>
                        <div className="bg-green-500/20 border-2 border-green-500/30 rounded-xl p-4 max-w-md mx-auto mb-6">
                            <p className="text-sm text-green-200">
                                Responde "SÍ" al mensaje para activar las notificaciones
                            </p>
                        </div>
                        <p className="text-sm text-white/50">
                            Redirigiendo al dashboard...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-[#0a0e27] py-12 pt-40">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -right-40 w-80 h-80 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD600]/10 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 7s ease-in-out infinite 4s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>

                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                        
                        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-500">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 border-b border-green-500/30 p-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/50">
                                        <MessageCircle className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Vincular WhatsApp Oficial</h2>
                                        <p className="text-sm text-white/70 mt-1">
                                            Recibe tu pase de abordar y alertas en tiempo real
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Benefits */}
                                <div className="bg-green-500/15 border-2 border-green-500/30 rounded-2xl p-6">
                                    <h3 className="font-bold text-green-300 mb-4 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        Beneficios Exclusivos:
                                    </h3>
                                    <ul className="space-y-3 text-sm text-white/80">
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                                            <span>Recibe tu pase de abordar directamente en WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                                            <span>Alertas de cambios de puerta y horarios en tiempo real</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                                            <span>Notificaciones cuando se abre el check-in</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                                            <span>Soporte prioritario 24/7 por WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Check className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                                            <span>Actualizaciones de promociones y ofertas exclusivas</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="text-white/80 font-semibold">Número de WhatsApp</Label>
                                    <div className="flex gap-3">
                                        <div className="flex items-center px-4 bg-white/10 border-2 border-white/20 rounded-xl">
                                            <span className="text-white/80 font-bold">+591</span>
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="70000000"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                            maxLength={8}
                                            className="flex-1 h-12 bg-white/10 border-2 border-white/20 focus:border-green-400 text-white placeholder:text-white/40 rounded-xl transition-all duration-300"
                                        />
                                    </div>
                                    <p className="text-xs text-white/50">
                                        Ingresa tu número sin el código de país
                                    </p>
                                </div>

                                {/* Activation Note */}
                                <div className="bg-white/5 border-2 border-white/10 rounded-xl p-4 flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Activación del servicio:</h4>
                                        <p className="text-sm text-white/70">
                                            Recibirás un mensaje de confirmación en WhatsApp. Responde "SÍ" para activar las notificaciones automáticas.
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    onClick={handleLink}
                                    disabled={isLoading || phoneNumber.length < 8}
                                    className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold h-14 rounded-xl shadow-lg shadow-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/70 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Vinculando...
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle className="h-6 w-6 mr-2" />
                                            Vincular Número Ahora
                                        </>
                                    )}
                                </Button>

                                {/* Info */}
                                <div className="bg-amber-500/15 border-2 border-amber-500/30 rounded-xl p-4 flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-200">
                                        <strong>Privacidad:</strong> Tu número solo se usará para comunicaciones de BOA. Nunca se compartirá con terceros.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    )
}
