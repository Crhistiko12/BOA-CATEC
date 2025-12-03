'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MessageSquare, Plus } from 'lucide-react'
import { ticketStorage, getStatusColor, formatTicketDate, type Ticket } from '@/lib/ticketStorage'

export default function SupportPage() {
    const router = useRouter()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Load tickets from localStorage
        const loadTickets = async () => {
            const { seedDemoTickets } = await import('@/lib/seedDemoTickets')

            // Seed demo tickets for demo user
            seedDemoTickets('diego.test@boa.bo')

            const loadedTickets = ticketStorage.getAll()
            setTickets(loadedTickets)
            setIsLoading(false)
        }
        loadTickets()
    }, [])

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="text-center">Cargando tickets...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1E3A8A]">Mis Tickets</h1>
                <Link href="/create-ticket">
                    <Button className="bg-[#1E3A8A] hover:bg-blue-800">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Ticket
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de consultas y reclamos</CardTitle>
                            <CardDescription>
                                {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} en total
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {tickets.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        No tienes tickets aún
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Crea tu primer ticket para obtener ayuda
                                    </p>
                                    <Link href="/create-ticket">
                                        <Button className="bg-[#0033A0]">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Crear Ticket
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tickets.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            onClick={() => router.push(`/ticket-details/${ticket.id}`)}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 rounded-full bg-blue-100">
                                                    <MessageSquare className="h-5 w-5 text-[#0033A0]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {ticket.number} • {formatTicketDate(ticket.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
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
