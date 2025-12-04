'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AdminDashboardPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel de Control - Calidad de Servicio</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tiempo Promedio Respuesta</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.5 min</div>
                        <p className="text-xs text-green-600">↓ 12% vs mes anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resolución Primer Contacto</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-green-600">↑ 5% meta alcanzada</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Satisfacción Cliente (CSAT)</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8/5</div>
                        <p className="text-xs text-muted-foreground">Basado en 1,200 encuestas</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-yellow-600">3 urgentes</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Rendimiento por Canal</CardTitle>
                        <CardDescription>Volumen de atención últimas 24h</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">WhatsApp Bot</span>
                                <span className="text-sm text-gray-500">1,540 chats</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Web Chat</span>
                                <span className="text-sm text-gray-500">850 chats</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Call Center</span>
                                <span className="text-sm text-gray-500">320 llamadas</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Motivos de Contacto</CardTitle>
                        <CardDescription>Top 5 temas frecuentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { topic: 'Estado de Vuelo', count: '35%', color: 'bg-blue-100 text-blue-800' },
                                { topic: 'Cambio de Fecha', count: '25%', color: 'bg-orange-100 text-orange-800' },
                                { topic: 'Equipaje', count: '20%', color: 'bg-purple-100 text-purple-800' },
                                { topic: 'Check-in', count: '15%', color: 'bg-green-100 text-green-800' },
                                { topic: 'Reembolsos', count: '5%', color: 'bg-red-100 text-red-800' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                                    <span className="text-sm font-medium">{item.topic}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.color}`}>
                                        {item.count}
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
