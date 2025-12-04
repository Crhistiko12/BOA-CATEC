'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Package, MessageSquare, RefreshCw, User } from 'lucide-react'

export default function DashboardPage() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Mi Cuenta BOA</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white border-4 border-blue-700 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Millas Acumuladas</CardTitle>
                        <Plane className="h-5 w-5 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">12,450</div>
                        <p className="text-xs text-white/90 mt-1">Categoría: Plata</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-4 border-blue-500 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Próximo Vuelo</CardTitle>
                        <Plane className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">MIA - VVI</div>
                        <p className="text-xs text-gray-500 mt-1">15 Dic, 2025 - 22:00</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-4 border-purple-500 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-700">Estado</CardTitle>
                        <User className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">Activo</div>
                        <p className="text-xs text-gray-500 mt-1">Perfil verificado</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mb-6 text-gray-900">Accesos Rápidos</h2>

            {/* Quick Access Cards with Floating Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Link href="/my-bookings" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                <Plane className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Mis Reservas</h3>
                            <p className="text-sm text-gray-600">Ver y gestionar vuelos</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/my-baggage" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-purple-500 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                <Package className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Equipaje y Mascotas</h3>
                            <p className="text-sm text-gray-600">Registrar pertenencias</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/refunds" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-cyan-500 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                <RefreshCw className="h-8 w-8 text-cyan-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Reembolsos</h3>
                            <p className="text-sm text-gray-600">Solicitar devoluciones</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/support" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-indigo-500 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Centro de Ayuda</h3>
                            <p className="text-sm text-gray-600">Tickets y soporte</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Bottom Section - WhatsApp & Tickets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* WhatsApp Section */}
                <div className="lg:col-span-1 group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-green-300 shadow-lg hover:shadow-xl transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900">
                                <MessageSquare className="h-5 w-5 text-green-600" />
                                Notificaciones WhatsApp
                            </CardTitle>
                            <CardDescription>Recibe tu pase de abordar y alertas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                                <div className="space-y-1">
                                    <p className="font-semibold text-green-900">Activar notificaciones</p>
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
                                <Button className="w-full mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-md hover:shadow-lg transition-all">
                                    Vincular Número
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Support Tickets Section */}
                <div className="lg:col-span-2 group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                    <Card className="relative bg-white border-4 border-blue-500 shadow-lg hover:shadow-xl transition-all">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-gray-900">Mis Tickets de Soporte</CardTitle>
                                <CardDescription>Historial de consultas y reclamos</CardDescription>
                            </div>
                            <Link href="/create-ticket">
                                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold">
                                    Nuevo Ticket
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { id: 'TKT-001', subject: 'Equipaje demorado', status: 'En Proceso', date: '01 Dic, 2025', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                                    { id: 'TKT-002', subject: 'Cambio de fecha', status: 'Resuelto', date: '28 Nov, 2025', color: 'bg-green-100 text-green-800 border-green-200' },
                                ].map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm border-2 border-blue-200">
                                                {ticket.id.split('-')[1]}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{ticket.subject}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{ticket.date}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold border ${ticket.color}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}