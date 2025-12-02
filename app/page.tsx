import Image from 'next/image'
import Link from 'next/link'
import FlightSearch from '@/components/booking/FlightSearch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, Clock, HeartHandshake, MapPin } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop"
                        alt="Avión BOA"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                            Descubre Bolivia y el Mundo
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            La mejor experiencia de vuelo con Boliviana de Aviación. Seguridad, puntualidad y el mejor servicio a bordo.
                        </p>
                    </div>

                    <FlightSearch />
                </div>
            </section>

            {/* Servicios Destacados */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#1E3A8A]">Experiencia BOA</h2>
                        <p className="mt-4 text-gray-600">Todo lo que necesitas para un viaje perfecto</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-blue-100 rounded-full">
                                    <ShieldCheck className="h-8 w-8 text-[#1E3A8A]" />
                                </div>
                                <h3 className="text-xl font-semibold">Viaje Seguro</h3>
                                <p className="text-gray-600">
                                    Protocolos de seguridad de clase mundial y flota moderna para tu tranquilidad.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-blue-100 rounded-full">
                                    <Clock className="h-8 w-8 text-[#1E3A8A]" />
                                </div>
                                <h3 className="text-xl font-semibold">Puntualidad</h3>
                                <p className="text-gray-600">
                                    Comprometidos con tu tiempo. Líderes en puntualidad en la región.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-blue-100 rounded-full">
                                    <HeartHandshake className="h-8 w-8 text-[#1E3A8A]" />
                                </div>
                                <h3 className="text-xl font-semibold">Atención 24/7</h3>
                                <p className="text-gray-600">
                                    Soporte continuo a través de nuestro nuevo sistema de atención digital.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Destinos Populares */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#1E3A8A] mb-12">Destinos Populares</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { city: 'La Paz', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop' },
                            { city: 'Santa Cruz', img: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=400&h=300&fit=crop' },
                            { city: 'Cochabamba', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
                            { city: 'Miami', img: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=400&h=300&fit=crop' }
                        ].map((dest) => (
                            <div key={dest.city} className="group relative h-64 rounded-xl overflow-hidden cursor-pointer">
                                <Image
                                    src={dest.img}
                                    alt={dest.city}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        {dest.city}
                                    </h3>
                                    <p className="text-sm opacity-90">Desde $150 USD</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-[#1E3A8A] py-20 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Únete al Club BOA</h2>
                    <p className="text-xl opacity-90">
                        Regístrate para acumular millas, gestionar tus reservas fácilmente y acceder a ofertas exclusivas.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="font-bold text-[#1E3A8A]">
                                Crear Cuenta Gratis
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                                Iniciar Sesión
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
