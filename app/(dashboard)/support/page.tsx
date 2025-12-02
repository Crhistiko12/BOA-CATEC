'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MessageSquare, Plus } from 'lucide-react'

export default function SupportPage() {
    const [tickets, setTickets] = useState([
        { id: 'TCK-001', subject: 'Cambio de fecha', status: 'Cerrado', date: '2025-11-15' },
        { id: 'TCK-002', subject: 'Consulta equipaje especial', status: 'Abierto', date: '2025-12-01' },
    ])

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1E3A8A]">Centro de Soporte</h1>
                <Button className="bg-[#1E3A8A]">
                    <Plus className="mr-2 h-4 w-4" /> Crear Ticket
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mis Tickets</CardTitle>
                            <CardDescription>Historial de consultas y reclamos</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${ticket.status === 'Abierto' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                                <MessageSquare className={`h-5 w-5 ${ticket.status === 'Abierto' ? 'text-green-600' : 'text-gray-500'}`} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{ticket.subject}</h4>
                                                <p className="text-sm text-gray-500">ID: {ticket.id} • {ticket.date}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${ticket.status === 'Abierto' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-[#1E3A8A]">¿Necesitas ayuda urgente?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-blue-800">
                                Nuestro chatbot está disponible 24/7 para resolver dudas frecuentes sobre equipaje, check-in y estado de vuelos.
                            </p>
                            <p className="text-sm text-blue-800">
                                Para emergencias, contáctanos por WhatsApp al +591 70000000.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
