'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'
import { getAllSupportTickets, updateSupportTicket } from '@/lib/admin-actions'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState<any[]>([])

    useEffect(() => {
        loadTickets()
    }, [])

    const loadTickets = async () => {
        try {
            const data = await getAllSupportTickets()
            setTickets(data)
        } catch (error) {
            console.error('Error loading tickets:', error)
        }
    }

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateSupportTicket(id, { status })
            loadTickets()
        } catch (error) {
            console.error('Error updating ticket:', error)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-red-100 text-red-600'
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-600'
            case 'RESOLVED': return 'bg-green-100 text-green-600'
            case 'CLOSED': return 'bg-gray-100 text-gray-600'
            default: return 'bg-gray-100 text-gray-600'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Tickets de Soporte</h1>
                    <p className="text-purple-100">Gestiona las consultas de los usuarios</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Todos los Tickets ({tickets.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg">{ticket.subject}</h3>
                                                <p className="text-sm text-gray-600">
                                                    De: {ticket.user.name} ({ticket.user.email})
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {format(new Date(ticket.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-4">{ticket.message}</p>
                                        <div className="flex gap-2">
                                            {ticket.status !== 'IN_PROGRESS' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleStatusChange(ticket.id, 'IN_PROGRESS')}
                                                    className="bg-yellow-500 hover:bg-yellow-600"
                                                >
                                                    En Proceso
                                                </Button>
                                            )}
                                            {ticket.status !== 'RESOLVED' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleStatusChange(ticket.id, 'RESOLVED')}
                                                    className="bg-green-500 hover:bg-green-600"
                                                >
                                                    Resolver
                                                </Button>
                                            )}
                                            {ticket.status !== 'CLOSED' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleStatusChange(ticket.id, 'CLOSED')}
                                                >
                                                    Cerrar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                    <p>No hay tickets de soporte</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
