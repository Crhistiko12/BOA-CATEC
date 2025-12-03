'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, MessageSquare, Globe } from 'lucide-react'

export default function ContactPage() {
    const contactChannels = [
        {
            icon: <Phone className="h-8 w-8" />,
            titulo: 'Call Center',
            descripcion: 'Atención telefónica 24/7',
            detalles: [
                { label: 'Bolivia', valor: '901 105 105' },
                { label: 'Internacional', valor: '+591 3 3636000' },
                { label: 'WhatsApp', valor: '+591 70000000' }
            ],
            color: 'blue'
        },
        {
            icon: <Mail className="h-8 w-8" />,
            titulo: 'Email',
            descripcion: 'Respuesta en 24 horas',
            detalles: [
                { label: 'Información general', valor: 'info@boa.bo' },
                { label: 'Reservas', valor: 'reservas@boa.bo' },
                { label: 'Compensaciones', valor: 'compensaciones@boa.bo' },
                { label: 'Equipaje', valor: 'equipaje@boa.bo' }
            ],
            color: 'green'
        },
        {
            icon: <MessageSquare className="h-8 w-8" />,
            titulo: 'Redes Sociales',
            descripcion: 'Síguenos y contáctanos',
            detalles: [
                { label: 'Facebook', valor: '@BOABolivia' },
                { label: 'Twitter', valor: '@BOA_Oficial' },
                { label: 'Instagram', valor: '@boa_bolivia' }
            ],
            color: 'purple'
        }
    ]

    const oficinas = [
        {
            ciudad: 'La Paz',
            direccion: 'Av. Camacho #1402, Edificio Mariscal Ballivián',
            telefono: '(2) 2116000',
            horario: 'Lun-Vie: 8:00-19:00 | Sáb: 9:00-13:00'
        },
        {
            ciudad: 'Santa Cruz',
            direccion: 'Av. Cristóbal de Mendoza #280',
            telefono: '(3) 3636000',
            horario: 'Lun-Vie: 8:00-19:00 | Sáb: 9:00-13:00'
        },
        {
            ciudad: 'Cochabamba',
            direccion: 'Av. Ballivián #501, entre España y 25 de Mayo',
            telefono: '(4) 4258000',
            horario: 'Lun-Vie: 8:00-19:00 | Sáb: 9:00-13:00'
        },
        {
            ciudad: 'Tarija',
            direccion: 'Calle La Madrid #447',
            telefono: '(4) 6644000',
            horario: 'Lun-Vie: 8:00-18:00 | Sáb: 9:00-12:00'
        }
    ]

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600 border-blue-200',
            green: 'bg-green-100 text-green-600 border-green-200',
            purple: 'bg-purple-100 text-purple-600 border-purple-200',
            yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200'
        }
        return colors[color as keyof typeof colors] || colors.blue
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Phone className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
                        <p className="text-xl text-blue-100">
                            Estamos aquí para ayudarte 24 horas al día, 7 días a la semana
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Contact Channels */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Canales de Atención
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactChannels.map((channel, index) => (
                            <Card key={index} className={`border-t-4 ${getColorClasses(channel.color)} hover:shadow-xl transition-all`}>
                                <CardHeader>
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getColorClasses(channel.color)}`}>
                                        {channel.icon}
                                    </div>
                                    <CardTitle className="text-2xl text-gray-900">
                                        {channel.titulo}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {channel.descripcion}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {channel.detalles.map((detalle, idx) => (
                                            <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
                                                <p className="text-sm text-gray-600">{detalle.label}</p>
                                                <p className="font-semibold text-gray-900">{detalle.valor}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Horarios */}
                <Card className="mb-16 bg-gradient-to-r from-blue-50 to-white border-2 border-[#0033A0]">
                    <CardContent className="pt-8 pb-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-start gap-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0033A0] rounded-full flex-shrink-0">
                                    <Clock className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Horarios de Atención
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Call Center</h4>
                                            <p className="text-gray-700">24 horas, 7 días a la semana</p>
                                            <p className="text-sm text-gray-600 mt-1">Incluyendo feriados</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Oficinas</h4>
                                            <p className="text-gray-700">Lunes a Viernes: 8:00 - 19:00</p>
                                            <p className="text-gray-700">Sábados: 9:00 - 13:00</p>
                                            <p className="text-sm text-gray-600 mt-1">Cerrado domingos y feriados</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                                            <p className="text-gray-700">Respuesta en 24 horas hábiles</p>
                                            <p className="text-sm text-gray-600 mt-1">De lunes a viernes</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Redes Sociales</h4>
                                            <p className="text-gray-700">Lunes a Viernes: 8:00 - 20:00</p>
                                            <p className="text-sm text-gray-600 mt-1">Respuesta en 2-4 horas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Oficinas */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Nuestras Oficinas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {oficinas.map((oficina, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0033A0] rounded-full flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl text-[#0033A0]">
                                                {oficina.ciudad}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Dirección</p>
                                            <p className="text-gray-900 font-medium">{oficina.direccion}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                                            <p className="text-gray-900 font-medium">{oficina.telefono}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Horario</p>
                                            <p className="text-gray-900 font-medium">{oficina.horario}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white">
                    <CardContent className="pt-12 pb-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">
                                ¿Necesitas Ayuda Inmediata?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Elige la opción que mejor se adapte a tu necesidad
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button
                                    onClick={() => window.location.href = '/support'}
                                    className="bg-white text-[#0033A0] px-8 py-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg"
                                >
                                    <MessageSquare className="h-8 w-8 mx-auto mb-3" />
                                    Crear Ticket
                                </button>

                                <button
                                    onClick={() => window.open('https://wa.me/59170000000', '_blank')}
                                    className="bg-[#25D366] text-white px-8 py-6 rounded-lg hover:bg-[#128C7E] transition-colors font-semibold text-lg shadow-lg"
                                >
                                    <MessageSquare className="h-8 w-8 mx-auto mb-3" />
                                    WhatsApp
                                </button>

                                <button
                                    onClick={() => window.location.href = 'tel:901105105'}
                                    className="bg-[#FFC72C] text-[#0033A0] px-8 py-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-lg shadow-lg"
                                >
                                    <Phone className="h-8 w-8 mx-auto mb-3" />
                                    Llamar Ahora
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
