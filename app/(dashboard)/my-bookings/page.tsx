'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function MyBookingsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-[#0033A0] text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
                    <p className="text-blue-200">Gestiona tus próximos viajes y revisa tu historial</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 space-y-8">
                {/* Reserva Activa */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 ml-1">Próximo Vuelo</h2>
                    <Card className="border-none shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                        <div className="bg-gradient-to-r from-[#0033A0] to-[#0055D4] p-1"></div>
                        <CardHeader className="bg-white border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="bg-blue-100 text-[#0033A0] px-3 py-1 rounded-full text-sm font-bold">Confirmado</span>
                                    <span className="text-gray-500 text-sm">Reserva: <span className="font-mono text-gray-900">BOA-900</span></span>
                                </div>
                                <Link href="/booking-details/boa-900">
                                    <Button variant="ghost" className="text-[#0033A0] hover:bg-blue-50">
                                        Ver detalles completos <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 bg-white">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-900">MIA</div>
                                            <div className="text-sm text-gray-500">Miami</div>
                                        </div>
                                        <div className="flex flex-col items-center px-4">
                                            <Plane className="h-8 w-8 text-[#0033A0] rotate-90 mb-2" />
                                            <div className="h-0.5 w-24 bg-gray-200 relative">
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">7h 00m</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-900">VVI</div>
                                            <div className="text-sm text-gray-500">Santa Cruz</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="h-5 w-5 text-[#0033A0]" />
                                        <div>
                                            <div className="text-xs text-gray-500">Fecha</div>
                                            <div className="font-semibold">15 Dic, 2025</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Clock className="h-5 w-5 text-[#0033A0]" />
                                        <div>
                                            <div className="text-xs text-gray-500">Hora</div>
                                            <div className="font-semibold">22:00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-full md:w-auto">
                                    <Link href="/checkin">
                                        <Button className="bg-[#0033A0] hover:bg-blue-800 w-full md:w-auto shadow-lg">
                                            Check-in Online
                                        </Button>
                                    </Link>
                                    <Link href="/manage-booking/boa-900">
                                        <Button variant="outline" className="w-full md:w-auto border-[#0033A0] text-[#0033A0] hover:bg-blue-50">
                                            Gestionar Reserva
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Historial */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 ml-1">Historial de Viajes</h2>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                        <Plane className="h-6 w-6 text-gray-400 group-hover:text-[#0033A0] transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">La Paz (LPB) - Santa Cruz (VVI)</h3>
                                        <p className="text-sm text-gray-500">10 Nov, 2025 • Vuelo OB-654</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">Completado</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
