'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, ArrowLeft, Check, AlertCircle, Sparkles, Loader2 } from 'lucide-react'
import { createSupportTicket } from '@/lib/support-ticket-actions'

const TICKET_CATEGORIES = [
    { value: 'equipaje', label: 'Equipaje', icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { value: 'cambio_vuelo', label: 'Cambio de Vuelo', icon: '✈️', color: 'from-purple-500 to-pink-500' },
    { value: 'reembolso', label: 'Reembolso', icon: '💰', color: 'from-red-500 to-orange-500' },
    { value: 'millas', label: 'Millas', icon: '⭐', color: 'from-yellow-500 to-amber-500' },
    { value: 'otro', label: 'Otro', icon: '❓', color: 'from-green-500 to-emerald-500' }
]

export default function CreateTicketPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [ticketNumber, setTicketNumber] = useState('')
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        category: '',
        subject: '',
        description: '',
        priority: 'MEDIUM',
        flightNumber: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category || !formData.subject || !formData.description) {
            setError('Por favor completa todos los campos obligatorios')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const result = await createSupportTicket({
                category: formData.category as any,
                subject: formData.subject,
                flightNumber: formData.flightNumber,
                priority: formData.priority as any,
                description: formData.description
            })

            if (!result.success) {
                setError(result.error || 'Error al crear ticket')
                setIsSubmitting(false)
                return
            }

            setTicketNumber(result.ticketId?.slice(0, 8).toUpperCase() || 'TKT-XXX')
            setIsSuccess(true)
            setIsSubmitting(false)

            setTimeout(() => {
                router.push('/support')
            }, 3000)
        } catch (err: any) {
            setError(err.message || 'Error al crear ticket')
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-[#0a0e27] flex items-center justify-center py-20 px-4">
                <div className="group relative max-w-md mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-green-500/30 text-center">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                            <Check className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">¡Ticket Creado!</h2>
                        <p className="text-white/70 mb-6">
                            Tu ticket ha sido registrado y aceptado con el número<br />
                            <span className="text-3xl font-black text-green-300">{ticketNumber}</span>
                        </p>
                        <div className="bg-green-500/20 border-2 border-green-500/30 rounded-xl p-4 max-w-md mx-auto mb-6">
                            <p className="text-sm text-green-200">
                                <strong>Estado: En Proceso</strong><br />
                                Nuestro equipo de soporte ya está revisando tu caso y te contactará en un plazo máximo de 24 horas.
                            </p>
                        </div>
                        <p className="text-sm text-white/50">
                            Redirigiendo a tus tickets...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const selectedCategory = TICKET_CATEGORIES.find(cat => cat.value === formData.category)

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-[#0a0e27] py-12 pt-40">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD600]/10 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 7s ease-in-out infinite 4s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
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
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>

                        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-500">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10 p-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50">
                                        <MessageSquare className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Crear Nuevo Ticket</h2>
                                        <p className="text-sm text-white/70 mt-1">
                                            Describe tu consulta o problema y te ayudaremos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Category Selection */}
                                    <div className="space-y-3">
                                        <Label className="text-white/80 font-semibold">Categoría *</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {TICKET_CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, category: cat.value })}
                                                    className={`p-4 border-2 rounded-2xl text-left transition-all duration-300 group/cat ${formData.category === cat.value
                                                        ? `border-${cat.color.split(' ')[0].slice(5)}-400 bg-white/20`
                                                        : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-2 transform group-hover/cat:scale-125 transition-transform duration-300">{cat.icon}</div>
                                                    <div className="font-semibold text-sm text-white/80 group-hover/cat:text-white transition-colors">{cat.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-white/80 font-semibold">Asunto *</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Ej: Equipaje demorado en vuelo OB-760"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="h-12 bg-white/10 border-2 border-white/20 focus:border-blue-400 text-white placeholder:text-white/40 rounded-xl transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    {/* Flight Number (Optional) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="flightNumber" className="text-white/80 font-semibold">Número de Vuelo (Opcional)</Label>
                                        <Input
                                            id="flightNumber"
                                            placeholder="Ej: OB-760"
                                            value={formData.flightNumber}
                                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                                            className="h-12 bg-white/10 border-2 border-white/20 focus:border-blue-400 text-white placeholder:text-white/40 rounded-xl transition-all duration-300"
                                        />
                                    </div>

                                    {/* Priority */}
                                    <div className="space-y-2">
                                        <Label htmlFor="priority" className="text-white/80 font-semibold">Prioridad</Label>
                                        <select
                                            id="priority"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full h-12 px-4 bg-white/10 border-2 border-white/20 focus:border-blue-400 rounded-xl text-white font-medium transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="LOW" className="bg-gray-900 text-white">Baja</option>
                                            <option value="MEDIUM" className="bg-gray-900 text-white">Normal</option>
                                            <option value="HIGH" className="bg-gray-900 text-white">Alta</option>
                                            <option value="URGENT" className="bg-gray-900 text-white">Urgente</option>
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-white/80 font-semibold">Descripción *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={6}
                                            className="bg-white/10 border-2 border-white/20 focus:border-blue-400 rounded-xl px-4 py-3 text-white placeholder:text-white/40 transition-all focus:outline-none resize-none font-medium"
                                            required
                                        />
                                        <p className="text-xs text-white/50">
                                            Incluye toda la información relevante: fechas, números de reserva, etc.
                                        </p>
                                    </div>

                                    {/* Error Box */}
                                    {error && (
                                        <div className="bg-red-500/20 border-2 border-red-500/30 rounded-xl p-4 flex gap-3">
                                            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-red-200">
                                                    <strong>Error:</strong> {error}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Info Box */}
                                    <div className="bg-blue-500/20 border-2 border-blue-500/30 rounded-xl p-4 flex gap-3">
                                        <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-blue-200">
                                                <strong>Tiempo de respuesta:</strong> Nuestro equipo responde en un máximo de 24 horas hábiles. Para temas urgentes, usa el chat en vivo.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !formData.category}
                                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold h-14 rounded-xl shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/70 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                Creando Ticket...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-6 w-6 mr-2" />
                                                Crear Ticket de Soporte
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    )
}
