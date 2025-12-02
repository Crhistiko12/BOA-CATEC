'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Plane, CreditCard, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Panel de Administración</h1>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% mes anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pasajeros Activos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180 última hora</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vuelos Hoy</CardTitle>
                        <Plane className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">4 en aire, 8 programados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reembolsos Pendientes</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">7</div>
                        <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium">Reserva #BOA-{1000 + i}</p>
                                        <p className="text-sm text-gray-500">Juan Pérez - LPB a VVI</p>
                                    </div>
                                    <span className="text-sm text-gray-500">Hace {i * 5} min</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estado del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>API de Vuelos</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">OPERATIVO</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Pasarela de Pagos (Stripe)</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">OPERATIVO</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Chatbot (Dialogflow)</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">OPERATIVO</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Base de Datos</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">OPERATIVO</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
