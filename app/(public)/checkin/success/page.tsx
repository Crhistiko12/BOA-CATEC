'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Plane, Download, Mail, Smartphone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckinSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <CheckCircle2 className="h-20 w-20 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">¡Check-in Completado!</h1>
                    <p className="text-xl text-green-100">
                        Tu pase de abordar está listo para usar
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 pb-20">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Boarding Pass */}
                    <Card className="overflow-hidden">
                        <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-sm opacity-90 mb-1">Pasajero</p>
                                    <p className="text-2xl font-bold">DIEGO TEST</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm opacity-90 mb-1">Vuelo</p>
                                    <p className="text-2xl font-bold">OB-760</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Origen</p>
                                    <p className="text-3xl font-bold">MIA</p>
                                    <p className="text-sm">Miami</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Plane className="h-8 w-8" />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs opacity-75 mb-1">Destino</p>
                                    <p className="text-3xl font-bold">VVI</p>
                                    <p className="text-sm">Santa Cruz</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 border-t border-white/20 pt-6">
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Fecha</p>
                                    <p className="font-semibold">15 Dic</p>
                                    <p className="text-xs opacity-75">2025</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Hora</p>
                                    <p className="font-semibold">22:00</p>
                                    <p className="text-xs opacity-75">Salida</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Puerta</p>
                                    <p className="font-semibold text-2xl">4</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-75 mb-1">Asiento</p>
                                    <p className="font-semibold text-2xl">12F</p>
                                </div>
                            </div>
                        </div>

                        {/* Barcode Simulation */}
                        <div className="bg-white p-6">
                            <div className="flex justify-center mb-4">
                                <div className="space-y-1">
                                    {Array.from({ length: 50 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-2 bg-gray-900"
                                            style={{ width: Math.random() > 0.5 ? '2px' : '4px' }}
                                        />
                                    )).reduce((acc, curr, i) => {
                                        if (i % 10 === 0) acc.push(<div key={`row-${i}`} className="flex gap-1">{[curr]}</div>)
                                        else acc[acc.length - 1].props.children.push(curr)
                                        return acc
                                    }, [] as JSX.Element[])}
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-600 font-mono">
                                BOA900-VVI-20251215-12F
                            </p>
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="bg-[#0033A0] hover:bg-blue-800 h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <Download className="h-6 w-6" />
                                <span>Descargar PDF</span>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <Mail className="h-6 w-6" />
                                <span>Enviar por Email</span>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-auto py-4">
                            <div className="flex flex-col items-center gap-2">
                                <Smartphone className="h-6 w-6" />
                                <span>Agregar a Wallet</span>
                            </div>
                        </Button>
                    </div>

                    {/* Important Information */}
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-yellow-900 mb-4 text-lg">⚠️ Información Importante</h3>
                            <div className="space-y-3 text-yellow-800">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-sm font-bold">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-semibold">Llega con anticipación</p>
                                        <p className="text-sm">Vuelos internacionales: 2 horas antes</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-sm font-bold">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-semibold">Documentos necesarios</p>
                                        <p className="text-sm">Pasaporte vigente y pase de abordar (digital o impreso)</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-sm font-bold">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-semibold">Embarque</p>
                                        <p className="text-sm">El embarque cierra 30 minutos antes de la salida</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-sm font-bold">
                                        4
                                    </div>
                                    <div>
                                        <p className="font-semibold">Equipaje</p>
                                        <p className="text-sm">Factura tu equipaje en el mostrador de BOA</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">✈️ Próximos Pasos</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Check-in completado</p>
                                        <p className="text-sm text-gray-600">Tu pase de abordar está listo</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Facturar equipaje</p>
                                        <p className="text-sm text-gray-600">En el mostrador de BOA en el aeropuerto</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Control de seguridad</p>
                                        <p className="text-sm text-gray-600">Presenta tu pase de abordar y pasaporte</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Embarque</p>
                                        <p className="text-sm text-gray-600">Dirígete a la puerta 4 a las 21:30</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        <Link href="/dashboard" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver al Dashboard
                            </Button>
                        </Link>
                        <Link href="/my-bookings" className="flex-1">
                            <Button variant="outline" className="w-full">
                                Ver Mis Reservas
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
