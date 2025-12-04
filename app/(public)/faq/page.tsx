'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            categoria: 'Reservas y Compras',
            preguntas: [
                {
                    pregunta: '¿Cómo puedo comprar un boleto?',
                    respuesta: 'Puedes comprar tu boleto en línea a través de nuestra página web, en nuestras oficinas o llamando a nuestro call center al 901 105 105.'
                },
                {
                    pregunta: '¿Puedo cambiar la fecha de mi vuelo?',
                    respuesta: 'Sí, puedes cambiar la fecha de tu vuelo hasta 24 horas antes de la salida. El cambio puede tener un costo adicional dependiendo de la tarifa adquirida.'
                },
                {
                    pregunta: '¿Cómo solicito un reembolso?',
                    respuesta: 'Para solicitar un reembolso, visita la sección de "Reembolsos" en tu dashboard o contacta a nuestro servicio al cliente. El proceso toma de 5 a 15 días hábiles.'
                }
            ]
        },
        {
            categoria: 'Check-in y Embarque',
            preguntas: [
                {
                    pregunta: '¿Cuándo puedo hacer check-in?',
                    respuesta: 'El check-in online está disponible desde 24 horas hasta 1 hora antes de la salida del vuelo. En el aeropuerto, puedes hacer check-in desde 3 horas antes.'
                },
                {
                    pregunta: '¿Necesito imprimir mi pase de abordar?',
                    respuesta: 'No es necesario. Puedes mostrar tu pase de abordar digital desde tu teléfono móvil o recibirlo por WhatsApp.'
                },
                {
                    pregunta: '¿Con cuánta anticipación debo llegar al aeropuerto?',
                    respuesta: 'Recomendamos llegar 2 horas antes para vuelos nacionales y 3 horas antes para vuelos internacionales.'
                }
            ]
        },
        {
            categoria: 'Equipaje',
            preguntas: [
                {
                    pregunta: '¿Cuánto equipaje puedo llevar?',
                    respuesta: 'En clase económica: 1 maleta de 23kg + 1 equipaje de mano de 8kg. En clase ejecutiva: 2 maletas de 32kg cada una + 1 equipaje de mano de 10kg.'
                },
                {
                    pregunta: '¿Qué hago si mi equipaje se pierde?',
                    respuesta: 'Reporta inmediatamente en el mostrador de equipajes del aeropuerto. También puedes crear un ticket en nuestra sección de soporte para dar seguimiento.'
                },
                {
                    pregunta: '¿Puedo llevar artículos frágiles?',
                    respuesta: 'Sí, pero deben estar debidamente empacados. Recomendamos declararlos al momento del check-in. BOA no se hace responsable por daños en artículos frágiles no declarados.'
                }
            ]
        },
        {
            categoria: 'Mascotas',
            preguntas: [
                {
                    pregunta: '¿Puedo viajar con mi mascota?',
                    respuesta: 'Sí, aceptamos mascotas en cabina (hasta 8kg incluyendo transportadora) y en bodega. Debes notificarlo al momento de la reserva.'
                },
                {
                    pregunta: '¿Cuál es el costo de viajar con mascota?',
                    respuesta: 'El costo varía según el peso y destino. En promedio: Bs. 200-400 para cabina y Bs. 400-800 para bodega.'
                },
                {
                    pregunta: '¿Qué documentos necesita mi mascota?',
                    respuesta: 'Certificado de salud vigente (máximo 10 días), carnet de vacunación al día, y certificado de exportación para vuelos internacionales.'
                }
            ]
        },
        {
            categoria: 'Vuelos y Horarios',
            preguntas: [
                {
                    pregunta: '¿Qué pasa si mi vuelo se retrasa?',
                    respuesta: 'Te notificaremos por email y WhatsApp. Si el retraso es mayor a 2 horas, puedes solicitar compensación en nuestra página de compensaciones.'
                },
                {
                    pregunta: '¿Cómo puedo verificar el estado de mi vuelo?',
                    respuesta: 'Visita nuestra página de "Estado de Vuelos" e ingresa tu número de vuelo para ver información en tiempo real.'
                },
                {
                    pregunta: '¿Qué rutas opera BOA?',
                    respuesta: 'Operamos rutas nacionales (La Paz, Santa Cruz, Cochabamba, Tarija, etc.) e internacionales (Miami, Buenos Aires, Madrid, São Paulo).'
                }
            ]
        },
        {
            categoria: 'Servicios a Bordo',
            preguntas: [
                {
                    pregunta: '¿Hay WiFi en los vuelos?',
                    respuesta: 'Sí, todos nuestros aviones cuentan con WiFi gratuito. La velocidad puede variar según la ruta y condiciones climáticas.'
                },
                {
                    pregunta: '¿Qué comidas se sirven?',
                    respuesta: 'En vuelos internacionales servimos comidas completas. En vuelos nacionales ofrecemos snacks y bebidas. Menús especiales disponibles bajo solicitud.'
                },
                {
                    pregunta: '¿Hay entretenimiento a bordo?',
                    respuesta: 'Sí, nuestros aviones cuentan con pantallas individuales con películas, series, música y juegos.'
                }
            ]
        },
        {
            categoria: 'Programa de Millas',
            preguntas: [
                {
                    pregunta: '¿Cómo acumulo millas?',
                    respuesta: 'Las millas se acumulan automáticamente al volar con BOA. Asegúrate de proporcionar tu número de socio al momento de la reserva.'
                },
                {
                    pregunta: '¿Cuándo expiran mis millas?',
                    respuesta: 'Las millas expiran después de 24 meses de inactividad. Realiza al menos un vuelo cada 2 años para mantenerlas activas.'
                },
                {
                    pregunta: '¿Cómo canjeo mis millas?',
                    respuesta: 'Puedes canjear millas por vuelos, upgrades de clase, o servicios adicionales desde tu dashboard de usuario.'
                }
            ]
        }
    ]

    const filteredFAQs = faqs.map(categoria => ({
        ...categoria,
        preguntas: categoria.preguntas.filter(faq =>
            faq.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.respuesta.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(categoria => categoria.preguntas.length > 0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Preguntas Frecuentes</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Encuentra respuestas rápidas a las preguntas más comunes
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Buscar pregunta..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-14 text-lg bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <p className="text-4xl font-bold text-[#0033A0] mb-2">
                                {faqs.reduce((acc, cat) => acc + cat.preguntas.length, 0)}
                            </p>
                            <p className="text-gray-600">Preguntas Respondidas</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <p className="text-4xl font-bold text-[#FFC72C] mb-2">{faqs.length}</p>
                            <p className="text-gray-600">Categorías</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="pt-8 pb-8">
                            <p className="text-4xl font-bold text-green-600 mb-2">24/7</p>
                            <p className="text-gray-600">Soporte Disponible</p>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Sections */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {filteredFAQs.map((categoria, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-2 h-8 bg-[#0033A0] rounded"></div>
                                {categoria.categoria}
                            </h2>

                            <div className="space-y-3">
                                {categoria.preguntas.map((faq, faqIndex) => {
                                    const globalIndex = catIndex * 100 + faqIndex
                                    const isOpen = openIndex === globalIndex

                                    return (
                                        <Card
                                            key={faqIndex}
                                            className="cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                        >
                                            <CardHeader className="pb-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <CardTitle className="text-lg text-gray-900 font-semibold">
                                                        {faq.pregunta}
                                                    </CardTitle>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-5 w-5 text-[#0033A0] flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </CardHeader>

                                            {isOpen && (
                                                <CardContent className="pt-0">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {faq.respuesta}
                                                    </p>
                                                </CardContent>
                                            )}
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredFAQs.length === 0 && (
                        <Card className="text-center">
                            <CardContent className="py-12">
                                <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No se encontraron resultados
                                </h3>
                                <p className="text-gray-600">
                                    Intenta con otros términos de búsqueda
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Contact Section */}
                <Card className="mt-12 bg-gradient-to-r from-blue-50 to-white border-2 border-[#0033A0]">
                    <CardContent className="pt-8 pb-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-[#0033A0] mb-4">
                                ¿No encontraste lo que buscabas?
                            </h2>
                            <p className="text-gray-700 mb-6">
                                Nuestro equipo de soporte está disponible 24/7 para ayudarte
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.location.href = '/support'}
                                    className="px-6 py-3 bg-[#0033A0] text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                                >
                                    Crear Ticket de Soporte
                                </button>
                                <button
                                    onClick={() => window.open('https://wa.me/59170000000', '_blank')}
                                    className="px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors font-semibold"
                                >
                                    Contactar por WhatsApp
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
