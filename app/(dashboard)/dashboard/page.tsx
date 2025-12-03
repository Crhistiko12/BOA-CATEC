'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Package, MessageSquare, RefreshCw, User, LogOut, Settings, Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [recentTickets, setRecentTickets] = useState<any[]>([])

    useEffect(() => {
        // Load recent tickets from localStorage
        const loadTickets = async () => {
            try {
                const { seedDemoTickets } = await import('@/lib/seedDemoTickets')
                const { ticketStorage, getStatusColor, formatTicketDate } = await import('@/lib/ticketStorage')

                // Seed demo tickets for demo user
                seedDemoTickets('diego.test@boa.bo')

                const tickets = ticketStorage.getRecent(3)
                setRecentTickets(tickets.map(t => ({
                    ...t,
                    color: getStatusColor(t.status),
                    formattedDate: formatTicketDate(t.createdAt)
                })))
            } catch (error) {
                console.error('Error loading tickets:', error)
            }
        }
        loadTickets()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-[#0033A0] text-white pb-32 pt-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Hola, {session?.user?.name?.split(' ')[0] || 'Viajero'}</h1>
                            <p className="text-blue-200">Bienvenido a tu panel de control BOA</p>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                <Settings className="h-4 w-4 mr-2" />
                                Configuración
                            </Button>
                            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                <Bell className="h-4 w-4 mr-2" />
                                Notificaciones
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-white/10 border-none backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-800">Millas Acumuladas</CardTitle>
                                <Plane className="h-4 w-4 text-gray-700" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">12,450</div>
                                <p className="text-xs text-gray-600 mt-1">Categoría: Plata</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-none backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-800">Próximo Vuelo</CardTitle>
                                <Plane className="h-4 w-4 text-gray-700" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">MIA - VVI</div>
                                <p className="text-xs text-gray-600 mt-1">15 Dic, 2025 - 22:00</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-none backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-800">Estado de Cuenta</CardTitle>
                                <User className="h-4 w-4 text-gray-700" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">Activo</div>
                                <p className="text-xs text-gray-600 mt-1">Perfil verificado</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Accesos Rápidos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link href="/my-bookings">
                                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-[#0033A0] group">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-full group-hover:bg-[#0033A0] transition-colors duration-300">
                                            <Plane className="h-8 w-8 text-[#0033A0] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">Mis Reservas</h3>
                                            <p className="text-sm text-gray-500 mt-1">Ver y gestionar tus vuelos</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/my-baggage">
                                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-[#FFC72C] group">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-yellow-50 rounded-full group-hover:bg-[#FFC72C] transition-colors duration-300">
                                            <Package className="h-8 w-8 text-[#FFC72C] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">Equipaje</h3>
                                            <p className="text-sm text-gray-500 mt-1">Rastrear y registrar</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/refunds">
                                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-green-500 group">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-500 transition-colors duration-300">
                                            <RefreshCw className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">Reembolsos</h3>
                                            <p className="text-sm text-gray-500 mt-1">Solicitar devoluciones</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/support">
                                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-purple-500 group">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-purple-50 rounded-full group-hover:bg-purple-500 transition-colors duration-300">
                                            <MessageSquare className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">Centro de Ayuda</h3>
                                            <p className="text-sm text-gray-500 mt-1">Tickets y soporte 24/7</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </div>

                    {/* WhatsApp Notification Section */}
                    <div className="lg:col-span-1">
                        <Card className="h-full border-green-500 border-2 shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <MessageSquare className="h-32 w-32 text-green-600" />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <MessageSquare className="h-6 w-6" />
                                    WhatsApp Oficial
                                </CardTitle>
                                <CardDescription>Recibe tu pase de abordar y alertas en tiempo real.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="space-y-1">
                                        <p className="font-bold text-green-900">Activar notificaciones</p>
                                        <p className="text-xs text-green-700">Vuelo OB-760</p>
                                    </div>
                                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            name="toggle"
                                            id="toggle"
                                            checked={notificationsEnabled}
                                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"
                                        />
                                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                                <Link href="/vincular-whatsapp">
                                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 shadow-lg hover:shadow-xl transition-all">
                                        Vincular Número Ahora
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Support Tickets Section */}
                    <div className="lg:col-span-2">
                        <Card className="h-full shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                                <div>
                                    <CardTitle className="text-[#0033A0]">Mis Tickets de Soporte</CardTitle>
                                    <CardDescription>Historial de consultas y reclamos</CardDescription>
                                </div>
                                <Link href="/create-ticket">
                                    <Button className="bg-[#0033A0] hover:bg-blue-800">Nuevo Ticket</Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {recentTickets.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>No tienes tickets aún</p>
                                        <Link href="/create-ticket">
                                            <Button className="mt-4 bg-[#0033A0]">Crear Ticket</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentTickets.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                onClick={() => router.push(`/ticket-details/${ticket.id}`)}
                                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-[#0033A0] font-bold text-xs group-hover:bg-[#0033A0] group-hover:text-white transition-colors">
                                                        {ticket.number.split('-')[1]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800 group-hover:text-[#0033A0] transition-colors">{ticket.subject}</p>
                                                        <p className="text-sm text-gray-500">{ticket.formattedDate}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${ticket.color}`}>
                                                    {ticket.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
