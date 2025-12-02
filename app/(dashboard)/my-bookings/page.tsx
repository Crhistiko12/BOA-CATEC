'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Calendar, Clock } from 'lucide-react'

export default function MyBookingsPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Mis Reservas</h1>

            <div className="space-y-6">
                {/* Reserva Activa */}
                <Card className="border-l-4 border-l-[#1E3A8A]">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Próximo Vuelo: MIA - VVI</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Confirmado</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4" /> 15 Dic, 2025
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4" /> 22:00
                                </div>
                                <div className="font-bold text-lg">BOA-900</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center">
                                <div className="flex items-center gap-4 w-full justify-center">
                                    <span className="font-bold text-xl">MIA</span>
                                    <Plane className="h-6 w-6 text-[#1E3A8A] rotate-90" />
                                    <span className="font-bold text-xl">VVI</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Directo • 7h 00m</p>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline">Ver Detalles</Button>
                                <Button className="bg-[#1E3A8A]">Check-in</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Historial */}
                <h2 className="text-xl font-bold mt-8 mb-4">Historial de Viajes</h2>
                <Card className="opacity-75">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">LPB - VVI</h3>
                                <p className="text-sm text-gray-500">10 Nov, 2025</p>
                            </div>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Completado</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
