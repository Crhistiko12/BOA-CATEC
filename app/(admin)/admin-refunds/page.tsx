'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Eye } from 'lucide-react'

// Datos simulados
const initialRefunds = [
    { id: '1', bookingId: 'BOA-8821', user: 'Maria Lopez', amount: 150.00, reason: 'Enfermedad (con certificado)', status: 'PENDING', date: '2025-12-01' },
    { id: '2', bookingId: 'BOA-9932', user: 'Carlos Ruiz', amount: 450.00, reason: 'Cancelación de vuelo', status: 'PENDING', date: '2025-12-01' },
    { id: '3', bookingId: 'BOA-1122', user: 'Ana Silva', amount: 80.00, reason: 'Cambio de planes personal', status: 'PENDING', date: '2025-11-30' },
]

export default function AdminRefundsPage() {
    const [refunds, setRefunds] = useState(initialRefunds)

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        // Aquí iría la llamada a la API
        console.log(`${action} refund ${id}`)
        setRefunds(refunds.filter(r => r.id !== id))
        alert(`Solicitud ${action === 'approve' ? 'aprobada' : 'rechazada'} correctamente`)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Gestión de Reembolsos</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Solicitudes Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="pb-3 font-semibold">Reserva</th>
                                    <th className="pb-3 font-semibold">Usuario</th>
                                    <th className="pb-3 font-semibold">Monto</th>
                                    <th className="pb-3 font-semibold">Motivo</th>
                                    <th className="pb-3 font-semibold">Fecha</th>
                                    <th className="pb-3 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {refunds.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-500">
                                            No hay solicitudes pendientes.
                                        </td>
                                    </tr>
                                ) : (
                                    refunds.map((refund) => (
                                        <tr key={refund.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-4">{refund.bookingId}</td>
                                            <td className="py-4">{refund.user}</td>
                                            <td className="py-4 font-bold">${refund.amount.toFixed(2)}</td>
                                            <td className="py-4 max-w-xs truncate" title={refund.reason}>{refund.reason}</td>
                                            <td className="py-4">{refund.date}</td>
                                            <td className="py-4 text-right space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => alert('Ver detalles completos')}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(refund.id, 'approve')}>
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleAction(refund.id, 'reject')}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
