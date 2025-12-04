'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MessageSquare, Plus, Phone, AlertCircle } from 'lucide-react'
import { ticketStorage, getStatusColor, formatTicketDate, type Ticket } from '@/lib/ticketStorage'

export default function SupportPage() {
    const router = useRouter()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadTickets = async () => {
            const { seedDemoTickets } = await import('@/lib/seedDemoTickets')
            seedDemoTickets('diego.test@boa.bo')
            const loadedTickets = ticketStorage.getAll()
            setTickets(loadedTickets)
            setIsLoading(false)
        }
        loadTickets()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#0052A5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando tickets...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#0052A5] via-[#0052A5] to-[#003D7A] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="relative container mx-auto px-6 py-12">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <MessageSquare className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Centro de Soporte</h1>
                            <p className="text-white/80 text-lg mt-1">Gestiona tus consultas y reclamos • Atención 24/7</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <Link href="/create-ticket" className="flex-1">
                                <Button className="w-full bg-gradient-to-r from-[#0052A5] to-[#003D7A] hover:from-[#003D7A] hover:to-[#002855] text-white font-bold h-12 rounded-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Nuevo Ticket
                                </Button>
                            </Link>
                            <a href="https://wa.me/59170000000" target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button className="w-full border-2 border-green-500 text-green-600 bg-green-50 hover:bg-green-100 font-bold h-12 rounded-lg transition-all flex items-center justify-center">
                                    <Phone className="mr-2 h-5 w-5" />
                                    WhatsApp
                                </Button>
                            </a>
                        </div>

                        {/* Tickets List */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-[#0052A5] mb-2">Mis Tickets</h2>
                            <p className="text-gray-600 mb-6">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} en total</p>

                            {tickets.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes tickets aún</h3>
                                    <p className="text-gray-600 mb-6">Crea tu primer ticket para obtener ayuda de nuestro equipo</p>
                                    <Link href="/create-ticket">
                                        <Button className="bg-gradient-to-r from-[#0052A5] to-[#003D7A] text-white font-bold px-6 h-11 rounded-lg shadow-lg">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Crear Ticket
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {tickets.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            onClick={() => router.push(`/ticket-details/${ticket.id}`)}
                                            className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-[#0052A5] hover:bg-blue-50 cursor-pointer transition-all group"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-[#0052A5]/10 transition-colors">
                                                    <MessageSquare className="h-5 w-5 text-[#0052A5]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900">{ticket.subject}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {ticket.number} • {formatTicketDate(ticket.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Help Section */}
                        <div className="bg-gradient-to-br from-[#0052A5] to-[#003D7A] text-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-bold mb-3">¿Necesitas ayuda urgente?</h3>
                            <p className="text-white/90 text-sm mb-6">
                                Nuestro chatbot está disponible 24/7 para resolver dudas sobre equipaje, check-in y estado de vuelos.
                            </p>
                            <a href="https://wa.me/59170000000" target="_blank" rel="noopener noreferrer">
                                <Button className="w-full bg-[#FFD600] hover:bg-[#E6C300] text-[#0052A5] font-bold h-10 rounded-lg transition-all shadow-lg">
                                    Contactar por WhatsApp
                                </Button>
                            </a>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6">
                            <h3 className="font-bold text-[#0052A5] mb-4">Enlaces Rápidos</h3>
                            <div className="space-y-2">
                                <a href="#" className="block p-3 rounded-lg hover:bg-white transition-colors text-sm text-gray-700 hover:text-[#0052A5] font-medium">
                                    📋 Ver Política de Equipaje
                                </a>
                                <a href="#" className="block p-3 rounded-lg hover:bg-white transition-colors text-sm text-gray-700 hover:text-[#0052A5] font-medium">
                                    ✈️ Estado de Vuelos
                                </a>
                                <a href="#" className="block p-3 rounded-lg hover:bg-white transition-colors text-sm text-gray-700 hover:text-[#0052A5] font-medium">
                                    🆘 Preguntas Frecuentes
                                </a>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-6">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-yellow-900 mb-2">Tiempo de Respuesta</p>
                                    <p className="text-sm text-yellow-800">
                                        Respondemos tickets en menos de 2 horas durante horario comercial.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
