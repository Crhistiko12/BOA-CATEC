'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Package, MessageSquare, RefreshCw, User } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Mi Cuenta BOA</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#1E3A8A] text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Millas Acumuladas</CardTitle>
                        <Plane className="h-4 w-4 text-blue-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,450</div>
                        <p className="text-xs text-blue-200">Categoría: Plata</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Próximo Vuelo</CardTitle>
                        <Plane className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">MIA - VVI</div>
                        <p className="text-xs text-muted-foreground">15 Dic, 2025 - 22:00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estado</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Activo</div>
                        <p className="text-xs text-muted-foreground">Perfil verificado</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Accesos Rápidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/my-bookings">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Plane className="h-6 w-6 text-[#1E3A8A]" />
                            </div>
                            <h3 className="font-semibold">Mis Reservas</h3>
                            <p className="text-sm text-gray-500">Ver y gestionar vuelos</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/my-baggage">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Package className="h-6 w-6 text-[#1E3A8A]" />
                            </div>
                            <h3 className="font-semibold">Equipaje y Mascotas</h3>
                            <p className="text-sm text-gray-500">Registrar pertenencias</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/refunds">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <RefreshCw className="h-6 w-6 text-[#1E3A8A]" />
                            </div>
                            <h3 className="font-semibold">Reembolsos</h3>
                            <p className="text-sm text-gray-500">Solicitar devoluciones</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/support">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <MessageSquare className="h-6 w-6 text-[#1E3A8A]" />
                            </div>
                            <h3 className="font-semibold">Centro de Ayuda</h3>
                            <p className="text-sm text-gray-500">Tickets y soporte</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Sección de WhatsApp y Notificaciones */}
                <Card className="lg:col-span-1 border-green-500 border-t-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-green-600" />
                            Notificaciones WhatsApp
                        </CardTitle>
                        <CardDescription>Recibe tu pase de abordar y alertas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium text-green-900">Activar notificaciones</p>
                                <p className="text-xs text-green-700">Vuelo OB-760</p>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500" />
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                        <Button className="w-full mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white">
                            Vincular Número
                        </Button>
                    </CardContent>
                </Card>

                {/* Sección de Tickets / Reclamos */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Mis Tickets de Soporte</CardTitle>
                            <CardDescription>Historial de consultas y reclamos</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Nuevo Ticket</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: 'TKT-001', subject: 'Equipaje demorado', status: 'En Proceso', date: '01 Dic, 2025', color: 'bg-yellow-100 text-yellow-800' },
                                { id: 'TKT-002', subject: 'Cambio de fecha', status: 'Resuelto', date: '28 Nov, 2025', color: 'bg-green-100 text-green-800' },
                            ].map((ticket) => (
                                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {ticket.id}
                                        </div>
                                        <div>
                                            <p className="font-medium">{ticket.subject}</p>
                                            <p className="text-sm text-gray-500">{ticket.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.color}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
