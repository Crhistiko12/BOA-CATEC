'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MessageSquare, Clock, MapPin, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpCenterPage() {
    const contactChannels = [
        {
            title: "Reservas y Ventas",
            description: "Compra de pasajes, tarifas y promociones.",
            phone: "901-10-50-10",
            email: "ventas@boa.bo",
            hours: "24/7",
            icon: Phone,
            color: "bg-blue-100 text-blue-700"
        },
        {
            title: "Cambios y Reprogramaciones",
            description: "Modificación de fechas, rutas y nombres.",
            phone: "901-10-50-20",
            email: "cambios@boa.bo",
            hours: "08:00 - 22:00",
            icon: RefreshCw,
            color: "bg-orange-100 text-orange-700"
        },
        {
            title: "Equipaje y Objetos Perdidos",
            description: "Rastreo de maletas y reclamos de equipaje.",
            phone: "901-10-50-30",
            email: "equipaje@boa.bo",
            hours: "24/7",
            icon: Package,
            color: "bg-purple-100 text-purple-700"
        },
        {
            title: "Soporte Web y App",
            description: "Problemas técnicos con la página o aplicación.",
            phone: "901-10-50-40",
            email: "soporte@boa.bo",
            hours: "09:00 - 18:00",
            icon: Laptop,
            color: "bg-green-100 text-green-700"
        }
    ]

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-bold text-[#1E3A8A] mb-4">Centro de Ayuda BOA</h1>
                <p className="text-xl text-gray-600">
                    Estamos aquí para ayudarte. Selecciona el canal adecuado para recibir atención especializada y reducir tu tiempo de espera.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {contactChannels.map((channel, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-l-4" style={{ borderLeftColor: channel.color.includes('blue') ? '#1E3A8A' : undefined }}>
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className={`p-3 rounded-full ${channel.color}`}>
                                <channel.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{channel.title}</CardTitle>
                                <CardDescription className="mt-1">{channel.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="font-semibold">{channel.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-blue-600 hover:underline cursor-pointer">{channel.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span>{channel.hours}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button variant="outline" className="w-full">Contactar Ahora</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Prefieres WhatsApp?</h2>
                <p className="text-gray-600 mb-6">
                    Recibe notificaciones de tu vuelo, tarjeta de embarque y resuelve dudas al instante.
                </p>
                <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 mx-auto">
                    <MessageSquare className="h-6 w-6" />
                    Chatear por WhatsApp
                </Button>
            </div>
        </div>
    )
}

import { RefreshCw, Package, Laptop } from 'lucide-react'
