'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Lock } from 'lucide-react'

interface PaymentFormProps {
    amount: number
    onPaymentComplete: () => void
}

export default function PaymentForm({ amount, onPaymentComplete }: PaymentFormProps) {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulación de proceso de pago con Stripe
        setTimeout(() => {
            setLoading(false)
            onPaymentComplete()
        }, 2000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-[#1E3A8A]" />
                    Pago Seguro
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg mb-4 flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Total a Pagar:</span>
                        <span className="text-2xl font-bold text-[#1E3A8A]">${amount.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                        <Label>Titular de la Tarjeta</Label>
                        <Input placeholder="Como aparece en la tarjeta" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Número de Tarjeta</Label>
                        <div className="relative">
                            <Input placeholder="0000 0000 0000 0000" required />
                            <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Fecha de Exp.</Label>
                            <Input placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                            <Label>CVC</Label>
                            <Input placeholder="123" required maxLength={3} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-800" disabled={loading}>
                        {loading ? 'Procesando Pago...' : `Pagar $${amount.toFixed(2)}`}
                    </Button>

                    <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3" /> Pagos procesados de forma segura por Stripe
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
