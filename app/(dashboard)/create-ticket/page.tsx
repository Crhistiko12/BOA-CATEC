'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, ArrowLeft, Check, AlertCircle } from 'lucide-react'

const TICKET_CATEGORIES = [
    { value: 'equipaje', label: 'Equipaje', icon: '📦' },
    { value: 'vuelo', label: 'Cambio de Vuelo', icon: '✈️' },
    { value: 'reembolso', label: 'Reembolso', icon: '💰' },
    { value: 'millas', label: 'Millas', icon: '⭐' },
    { value: 'otro', label: 'Otro', icon: '❓' }
]

export default function CreateTicketPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [ticketNumber, setTicketNumber] = useState('')

    const [formData, setFormData] = useState({
        category: '',
        subject: '',
        description: '',
        priority: 'normal',
        flightNumber: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category || !formData.subject || !formData.description) {
            alert('Por favor completa todos los campos obligatorios')
            return
        }

        setIsSubmitting(true)

        // Simular creación de ticket
        setTimeout(() => {
            const newTicketNumber = `TKT-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`
            setTicketNumber(newTicketNumber)
            setIsSuccess(true)
            setIsSubmitting(false)

            // Redirigir después de 3 segundos
            setTimeout(() => {
                router.push('/support')
            }, 3000)
        }, 1500)
    }

    if (isSuccess) {
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
                                    ¡Ticket Creado y Aceptado!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Tu ticket ha sido registrado y aceptado con el número<br />
                                    <span className="text-2xl font-bold text-[#0033A0]">{ticketNumber}</span>
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                                    <p className="text-sm text-blue-900">
                                        <strong>Estado: En Proceso</strong><br />
                                        Nuestro equipo de soporte ya está revisando tu caso y te contactará en un plazo máximo de 24 horas.
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Redirigiendo a tus tickets...
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <MessageSquare className="h-8 w-8 text-[#0033A0]" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Crear Nuevo Ticket</CardTitle>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Describe tu consulta o problema y te ayudaremos
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <Label>Categoría *</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {TICKET_CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, category: cat.value })}
                                                className={`p-4 border-2 rounded-lg text-left transition-all ${formData.category === cat.value
                                                    ? 'border-[#0033A0] bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-1">{cat.icon}</div>
                                                <div className="font-semibold text-sm">{cat.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Asunto *</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Ej: Equipaje demorado en vuelo OB-760"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Flight Number (Optional) */}
                                <div className="space-y-2">
                                    <Label htmlFor="flightNumber">Número de Vuelo (Opcional)</Label>
                                    <Input
                                        id="flightNumber"
                                        placeholder="Ej: OB-760"
                                        value={formData.flightNumber}
                                        onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                                    />
                                </div>

                                {/* Priority */}
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Prioridad</Label>
                                    <select
                                        id="priority"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                                    >
                                        <option value="low">Baja</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">Alta</option>
                                        <option value="urgent">Urgente</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={6}
                                        required
                                    />
                                    <p className="text-xs text-gray-500">
                                        Incluye toda la información relevante: fechas, números de reserva, etc.
                                    </p>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-900">
                                        <p className="font-semibold mb-1">Tiempo de respuesta:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Urgente: 2-4 horas</li>
                                            <li>Alta: 8-12 horas</li>
                                            <li>Normal: 24 horas</li>
                                            <li>Baja: 48 horas</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.back()}
                                        className="flex-1"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-[#0033A0] hover:bg-blue-800"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Creando...
                                            </>
                                        ) : (
                                            <>
                                                <MessageSquare className="h-5 w-5 mr-2" />
                                                Crear Ticket
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
