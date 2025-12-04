import { auth } from '@/lib/auth'
import { getUserBookings } from '@/lib/db-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plane, Calendar, Clock, ArrowRight, Plus, MapPin } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { redirect } from 'next/navigation'

export default async function MyBookingsPage() {
    const session = await auth()

    if (!session?.user?.email) {
        redirect('/login')
    }

    const bookings: any[] = await getUserBookings(session.user.email)

    const upcomingBookings = bookings.filter((b: any) =>
        (b.status === 'CONFIRMED' || b.status === 'PENDING') &&
        new Date(b.flight.departureTime) > new Date()
    )

    const pastBookings = bookings.filter((b: any) =>
        b.status === 'COMPLETED' ||
        b.status === 'CANCELLED' ||
        new Date(b.flight.departureTime) <= new Date()
    )

    const calculateDuration = (start: Date, end: Date) => {
        const diff = new Date(end).getTime() - new Date(start).getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20">
            {/* Hero Header */}
            <div className="relative bg-gradient-to-r from-[#0033A0] via-blue-700 to-[#0055D4] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-20 -mb-20"></div>
                </div>

                <div className="relative container mx-auto px-4 py-12 mt-16">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Mis Compras</h1>
                            <p className="text-blue-100 text-lg">Gestiona tus próximos viajes y revisa tu historial</p>
                        </div>
                        <Link href="/vuelos">
                            <Button className="bg-white text-[#0033A0] hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all">
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Compra
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 space-y-8">
                {/* Upcoming Flights */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 ml-1 flex items-center gap-2">
                        <Plane className="h-6 w-6 text-[#0033A0]" />
                        Próximos Vuelos
                    </h2>

                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map((booking) => (
                            <Card key={booking.id} className="border-none shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white">
                                <div className="bg-gradient-to-r from-[#0033A0] to-[#0055D4] p-1"></div>
                                <CardHeader className="bg-gradient-to-br from-blue-50 to-white border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-xl">
                                                <Plane className="h-5 w-5 text-[#0033A0]" />
                                            </div>
                                            <div>
                                                <span className="bg-blue-100 text-[#0033A0] px-3 py-1 rounded-full text-sm font-bold">
                                                    {booking.status === 'CONFIRMED' ? 'Confirmado' : 'Pendiente'}
                                                </span>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Compra: <span className="font-mono text-gray-900">{booking.id.slice(0, 8).toUpperCase()}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Link href={`/booking-details/${booking.id}`}>
                                            <Button variant="ghost" className="text-[#0033A0] hover:bg-blue-50">
                                                Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 bg-white">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                        {/* Flight Route */}
                                        <div className="flex-1 w-full">
                                            <div className="flex items-center gap-4 justify-center">
                                                <div className="text-center">
                                                    <div className="p-3 bg-blue-50 rounded-xl mb-2">
                                                        <MapPin className="h-5 w-5 text-[#0033A0]" />
                                                    </div>
                                                    <div className="text-3xl font-bold text-gray-900">{booking.flight.origin}</div>
                                                </div>

                                                <div className="flex flex-col items-center px-4 flex-1 max-w-xs">
                                                    <Plane className="h-6 w-6 text-[#0033A0] rotate-90 mb-2" />
                                                    <div className="h-1 w-full bg-gradient-to-r from-[#0033A0] to-blue-400 rounded relative">
                                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-500 whitespace-nowrap">
                                                            {calculateDuration(booking.flight.departureTime, booking.flight.arrivalTime)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <div className="p-3 bg-green-50 rounded-xl mb-2">
                                                        <MapPin className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div className="text-3xl font-bold text-gray-900">{booking.flight.destination}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Flight Details */}
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                                <Calendar className="h-5 w-5 text-[#0033A0]" />
                                                <div>
                                                    <div className="text-xs text-gray-600">Fecha</div>
                                                    <div className="font-bold text-gray-900">
                                                        {format(new Date(booking.flight.departureTime), "d MMM, yyyy", { locale: es })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                                <Clock className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <div className="text-xs text-gray-600">Hora</div>
                                                    <div className="font-bold text-gray-900">
                                                        {format(new Date(booking.flight.departureTime), "HH:mm")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-3 w-full md:w-auto">
                                            <Link href="/checkin">
                                                <Button className="bg-gradient-to-r from-[#0033A0] to-blue-700 hover:from-blue-800 hover:to-blue-900 w-full md:w-auto shadow-lg text-white">
                                                    Check-in Online
                                                </Button>
                                            </Link>
                                            <Link href={`/manage-booking/${booking.id}`}>
                                                <Button variant="outline" className="w-full md:w-auto border-2 border-[#0033A0] text-[#0033A0] hover:bg-blue-50">
                                                    Gestionar Compra
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="p-12 text-center shadow-xl bg-white">
                            <Plane className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 mb-4 text-lg">No tienes vuelos próximos.</p>
                            <Link href="/vuelos">
                                <Button className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white shadow-lg">
                                    Buscar Vuelos
                                </Button>
                            </Link>
                        </Card>
                    )}
                </div>

                {/* Past Flights */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 ml-1 flex items-center gap-2">
                        <Clock className="h-6 w-6 text-gray-600" />
                        Historial de Viajes
                    </h2>
                    {pastBookings.length > 0 ? (
                        pastBookings.map((booking) => (
                            <Card key={booking.id} className="hover:shadow-lg transition-shadow cursor-pointer group bg-white">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-6">
                                            <div className="h-14 w-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all">
                                                <Plane className="h-7 w-7 text-gray-400 group-hover:text-[#0033A0] transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900">
                                                    {booking.flight.origin} - {booking.flight.destination}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {format(new Date(booking.flight.departureTime), "d MMM, yyyy", { locale: es })} • Vuelo {booking.flight.flightNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {booking.status === 'COMPLETED' ? 'Completado' : booking.status}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 ml-1 text-center py-8">No tienes viajes pasados.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
