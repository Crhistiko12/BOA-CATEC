'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, LineChart, PieChart } from 'lucide-react'

export default function AnalyticsPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Analíticas y Reportes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5" /> Ingresos Mensuales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Gráfico de Ingresos (Simulado)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="h-5 w-5" /> Pasajeros por Ruta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Gráfico de Pasajeros (Simulado)</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" /> Tipos de Equipaje
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Distribución (Simulado)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" /> Satisfacción
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">NPS Score (Simulado)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" /> Canales de Venta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Web vs App vs Counter</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
