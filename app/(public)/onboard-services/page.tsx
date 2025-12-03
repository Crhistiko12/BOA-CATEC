'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Wifi, Monitor, Coffee, Utensils, Star, Headphones, Plane } from 'lucide-react'

export default function OnboardServicesPage() {
    const servicios = {
        ejecutiva: [
            { icono: <Utensils className="h-8 w-8" />, titulo: 'Comida Gourmet', descripcion: 'Menú de 3 tiempos preparado por chefs' },
            { icono: <Wifi className="h-8 w-8" />, titulo: 'WiFi Premium', descripcion: 'Internet de alta velocidad ilimitado' },
            { icono: <Monitor className="h-8 w-8" />, titulo: 'Entretenimiento HD', descripcion: 'Pantalla personal de 15" con películas y series' },
            { icono: <Star className="h-8 w-8" />, titulo: 'Asientos Reclinables', descripcion: 'Asientos con reclinación de 160° y espacio extra' },
            { icono: <Headphones className="h-8 w-8" />, titulo: 'Auriculares Premium', descripcion: 'Cancelación de ruido y audio de alta calidad' },
            { icono: <Coffee className="h-8 w-8" />, titulo: 'Bar Completo', descripcion: 'Bebidas alcohólicas y no alcohólicas premium' }
        ],
        economica: [
            { icono: <Coffee className="h-8 w-8" />, titulo: 'Snacks y Bebidas', descripcion: 'Refrigerios y bebidas durante el vuelo' },
            { icono: <Wifi className="h-8 w-8" />, titulo: 'WiFi Gratuito', descripcion: 'Internet básico en todos los vuelos' },
            { icono: <Monitor className="h-8 w-8" />, titulo: 'Entretenimiento', descripcion: 'Pantalla personal con películas y música' },
            { icono: <Star className="h-8 w-8" />, titulo: 'Asientos Cómodos', descripcion: 'Asientos ergonómicos con espacio adecuado' }
        ]
    }

    const menu = {
        desayuno: [
            'Omelette con vegetales',
            'Pan francés con frutas',
            'Yogurt con granola',
            'Jugo natural',
            'Café o té'
        ],
        almuerzo: [
            'Pollo a la plancha con vegetales',
            'Pescado al horno con arroz',
            'Pasta con salsa de tomate',
            'Ensalada fresca',
            'Postre del día'
        ],
        cena: [
            'Lomo de res con puré',
            'Salmón con quinoa',
            'Risotto de champiñones',
            'Pan artesanal',
            'Mousse de chocolate'
        ]
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Plane className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-5xl font-bold mb-4">Servicios a Bordo</h1>
                        <p className="text-xl text-blue-100">
                            Disfruta de una experiencia de vuelo excepcional con BOA
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Clase Ejecutiva */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Clase Ejecutiva</h2>
                        <p className="text-xl text-gray-600">Lujo y comodidad en cada detalle</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {servicios.ejecutiva.map((servicio, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-[#FFC72C]">
                                <CardContent className="pt-8 pb-8 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4 text-[#FFC72C]">
                                        {servicio.icono}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-gray-600">
                                        {servicio.descripcion}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-[#FFC72C]">
                        <CardContent className="pt-8 pb-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <Star className="h-12 w-12 mx-auto text-[#FFC72C] mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Experiencia Premium
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    La clase ejecutiva de BOA te ofrece el máximo confort con asientos que se reclinan hasta 160°,
                                    espacio adicional para las piernas, y un servicio personalizado que hará de tu viaje una experiencia inolvidable.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Clase Económica */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Clase Económica</h2>
                        <p className="text-xl text-gray-600">Comodidad y calidad a buen precio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {servicios.economica.map((servicio, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-[#0033A0]">
                                <CardContent className="pt-8 pb-8 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-[#0033A0]">
                                        {servicio.icono}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-gray-600">
                                        {servicio.descripcion}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-gradient-to-r from-blue-50 to-white border-2 border-[#0033A0]">
                        <CardContent className="pt-8 pb-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <Plane className="h-12 w-12 mx-auto text-[#0033A0] mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Calidad Garantizada
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    Nuestra clase económica ofrece todo lo que necesitas para un viaje cómodo:
                                    asientos ergonómicos, entretenimiento a bordo, WiFi gratuito y un servicio amable que te hará sentir como en casa.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Menú */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Menú a Bordo</h2>
                        <p className="text-xl text-gray-600">Sabores que elevan tu experiencia</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-t-4 border-t-orange-500">
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-2xl text-orange-700 flex items-center gap-2">
                                    <Coffee className="h-6 w-6" />
                                    Desayuno
                                </CardTitle>
                                <CardDescription>Vuelos matutinos</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {menu.desayuno.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-green-500">
                            <CardHeader className="bg-green-50">
                                <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                                    <Utensils className="h-6 w-6" />
                                    Almuerzo
                                </CardTitle>
                                <CardDescription>Vuelos de mediodía</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {menu.almuerzo.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-purple-500">
                            <CardHeader className="bg-purple-50">
                                <CardTitle className="text-2xl text-purple-700 flex items-center gap-2">
                                    <Utensils className="h-6 w-6" />
                                    Cena
                                </CardTitle>
                                <CardDescription>Vuelos nocturnos</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {menu.cena.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-purple-500 mt-1">•</span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 bg-blue-50 border-blue-200">
                        <CardContent className="pt-6 pb-6">
                            <p className="text-center text-gray-700">
                                <strong>Menús especiales disponibles:</strong> Vegetariano, Vegano, Sin gluten, Kosher, Halal.
                                <br />
                                Solicítalos al momento de tu reserva o hasta 24 horas antes del vuelo.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Entretenimiento */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                    <CardContent className="pt-12 pb-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <Monitor className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Entretenimiento a Bordo
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contenido Disponible</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700"><strong>50+ películas</strong> - Estrenos y clásicos</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700"><strong>30+ series</strong> - Episodios completos</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700"><strong>200+ canciones</strong> - Todos los géneros</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700"><strong>Juegos interactivos</strong> - Para todas las edades</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Características</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700">Pantallas HD individuales</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700">Control táctil intuitivo</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700">Auriculares de calidad</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">✓</span>
                                            <span className="text-gray-700">Contenido actualizado mensualmente</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
