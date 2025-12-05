'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AlertTriangle, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { createRefundRequest } from '@/lib/refund-actions'

const refundSchema = z.object({
    bookingId: z.string().min(1, 'Código de reserva requerido'),
    reason: z.string().min(10, 'Por favor detalla el motivo (mínimo 10 caracteres)'),
})

export default function RefundsPage() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [refundAmount, setRefundAmount] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(refundSchema)
    })

    const onSubmit = async (data: any) => {
        setLoading(true)
        setError('')

        try {
            const result = await createRefundRequest({
                bookingCode: data.bookingId,
                reason: data.reason
            })

            if (!result.success) {
                setError(result.error || 'Error al crear solicitud de reembolso')
                setLoading(false)
                return
            }

            setRefundAmount(result.refundAmount || 0)
            setSubmitted(true)
            setLoading(false)
        } catch (err: any) {
            setError(err.message || 'Error al procesar solicitud')
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="max-w-md mx-auto bg-green-50 p-8 rounded-xl border border-green-200">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Solicitud Recibida</h2>
                    <p className="text-green-700 mb-4">
                        Hemos recibido tu solicitud de reembolso. Nuestro equipo la revisará y te notificaremos por email y WhatsApp en las próximas 48 horas.
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Monto estimado de reembolso:</p>
                        <p className="text-3xl font-bold text-green-600">Bs {refundAmount.toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-6">
                        El monto final puede variar según las políticas de tarifa y el tiempo de cancelación.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="mt-6 bg-green-600 hover:bg-green-700 text-white">
                        Volver
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Solicitud de Reembolsos</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulario de Solicitud</CardTitle>
                            <CardDescription>
                                Ingresa los datos de tu reserva para iniciar el proceso.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bookingId">Código de Reserva</Label>
                                    <Input
                                        id="bookingId"
                                        {...register('bookingId')}
                                        placeholder="Ej: BOA-123456 o código completo"
                                        disabled={loading}
                                    />
                                    {errors.bookingId && (
                                        <p className="text-red-500 text-sm">{errors.bookingId.message as string}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Motivo de la solicitud</Label>
                                    <textarea
                                        id="reason"
                                        {...register('reason')}
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Describe por qué solicitas el reembolso..."
                                        disabled={loading}
                                    />
                                    {errors.reason && (
                                        <p className="text-red-500 text-sm">{errors.reason.message as string}</p>
                                    )}
                                </div>

                                {error && (
                                    <div className="bg-red-50 p-4 rounded-md flex gap-3 items-start border border-red-200">
                                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-800">{error}</p>
                                    </div>
                                )}

                                <div className="bg-yellow-50 p-4 rounded-md flex gap-3 items-start border border-yellow-200">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-800">
                                        Al enviar esta solicitud, aceptas que el boleto asociado será cancelado y no podrá ser utilizado para viajar mientras la solicitud esté en proceso.
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                                    <p className="text-sm text-blue-800 font-medium mb-2">Cálculo automático de reembolso:</p>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• Más de 48h antes: 90% de reembolso</li>
                                        <li>• Más de 24h antes: 50% de reembolso</li>
                                        <li>• Menos de 24h: 25% de reembolso</li>
                                    </ul>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#1E3A8A] hover:bg-blue-800"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Procesando...
                                        </>
                                    ) : (
                                        'Enviar Solicitud'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-lg">Política de Reembolsos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-600">
                            <p>
                                <strong>24 Horas:</strong> Reembolso completo si cancelas dentro de las 24 horas posteriores a la compra, siempre que falten al menos 7 días para el vuelo.
                            </p>
                            <p>
                                <strong>Tarifas Flexibles:</strong> Permiten reembolso con una penalidad reducida.
                            </p>
                            <p>
                                <strong>Tarifas Promo:</strong> Generalmente no son reembolsables, solo permiten cambios con penalidad.
                            </p>
                            <p>
                                <strong>Enfermedad:</strong> Requiere certificado médico oficial para evaluación de excepción.
                            </p>
                            <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
                                El monto final del reembolso se calcula automáticamente según el tiempo restante hasta el vuelo y las políticas aplicables.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
