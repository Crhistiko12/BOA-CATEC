'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquare, Calendar, Tag, AlertCircle, Plane } from 'lucide-react'
import { ticketStorage, getStatusColor, formatTicketDate, type Ticket } from '@/lib/ticketStorage'

export default function TicketDetailsPage() {
    const router = useRouter()
    const params = useParams()
    const [ticket, setTicket] = useState<Ticket | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const ticketId = params.id as string
        const loadedTicket = ticketStorage.getById(ticketId)
        setTicket(loadedTicket)
        setIsLoading(false)
    }, [params.id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">Cargando...</div>
                </div>
            </div>
        )
    }

    if (!ticket) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <AlertCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket no encontrado</h2>
                        <p className="text-gray-600 mb-6">El ticket que buscas no existe o fue eliminado.</p>
                        <Button onClick={() => router.push('/support')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver a Mis Tickets
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const categoryIcons: Record<string, string> = {
        equipaje: '📦',
        vuelo: '✈️',
        reembolso: '💰',
        millas: '⭐',
        otro: '❓'
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>

                    {/* Ticket Header */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <MessageSquare className="h-8 w-8 text-[#0033A0]" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl mb-1">{ticket.subject}</CardTitle>
                                        <p className="text-sm text-gray-600">Ticket {ticket.number}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Ticket Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <Tag className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Categoría</p>
                                        <p className="font-semibold flex items-center gap-2">
                                            <span>{categoryIcons[ticket.category]}</span>
                                            {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Fecha de creación</p>
                                        <p className="font-semibold">{formatTicketDate(ticket.createdAt)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Prioridad</p>
                                        <p className="font-semibold capitalize">{ticket.priority}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Flight Number (if exists) */}
                    {ticket.flightNumber && (
                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <Plane className="h-5 w-5 text-[#0033A0]" />
                                    <div>
                                        <p className="text-sm text-gray-600">Número de Vuelo</p>
                                        <p className="font-semibold text-lg">{ticket.flightNumber}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Descripción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="mt-6 flex gap-4">
                        <Button
                            onClick={() => router.push('/support')}
                            variant="outline"
                            className="flex-1"
                        >
                            Ver Todos los Tickets
                        </Button>
                        <Button
                            onClick={() => router.push('/create-ticket')}
                            className="flex-1 bg-[#0033A0]"
                        >
                            Crear Nuevo Ticket
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
