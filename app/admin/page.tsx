import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getAdminStats } from '@/lib/admin-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Users, Ticket, MessageSquare, BarChart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
    const session = await auth()

    if (!session?.user?.email) {
        redirect('/login')
    }

    // Check if user is admin
    const prisma = (await import('@/lib/db')).default
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (user?.role !== 'ADMIN') {
        redirect('/dashboard')
    }

    const stats = await getAdminStats()

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0033A0] to-blue-700 text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
                    <p className="text-blue-100">Gestiona vuelos, promociones y tickets de soporte</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-t-4 border-t-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Vuelos</CardTitle>
                            <Plane className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.totalFlights}</div>
                            <p className="text-xs text-gray-500 mt-1">Vuelos programados</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-green-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reservas</CardTitle>
                            <Ticket className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.totalBookings}</div>
                            <p className="text-xs text-gray-500 mt-1">Reservas realizadas</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-purple-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <Users className="h-5 w-5 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-gray-500 mt-1">Usuarios registrados</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-orange-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tickets Pendientes</CardTitle>
                            <MessageSquare className="h-5 w-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.pendingTickets}</div>
                            <p className="text-xs text-gray-500 mt-1">Requieren atención</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/admin/flights">
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-[#0033A0] group">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-blue-50 rounded-full group-hover:bg-[#0033A0] transition-colors duration-300">
                                    <Plane className="h-8 w-8 text-[#0033A0] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Gestionar Vuelos</h3>
                                    <p className="text-sm text-gray-500 mt-1">Crear, editar y eliminar vuelos</p>
                                </div>
                                <Button className="w-full bg-[#0033A0] hover:bg-blue-800">
                                    Ir a Vuelos
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/promotions">
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-[#FFC72C] group">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-yellow-50 rounded-full group-hover:bg-[#FFC72C] transition-colors duration-300">
                                    <Ticket className="h-8 w-8 text-[#FFC72C] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Promociones</h3>
                                    <p className="text-sm text-gray-500 mt-1">Gestionar ofertas especiales</p>
                                </div>
                                <Button className="w-full bg-[#FFC72C] hover:bg-yellow-600 text-gray-900">
                                    Ir a Promociones
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/tickets">
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-purple-500 group">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-purple-50 rounded-full group-hover:bg-purple-500 transition-colors duration-300">
                                    <MessageSquare className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Tickets de Soporte</h3>
                                    <p className="text-sm text-gray-500 mt-1">Atender consultas de usuarios</p>
                                </div>
                                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                                    Ir a Tickets
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/dashboard">
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-t-green-500 group">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-500 transition-colors duration-300">
                                    <BarChart className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Calidad de Servicio</h3>
                                    <p className="text-sm text-gray-500 mt-1">Métricas y KPIs de servicio</p>
                                </div>
                                <Button className="w-full bg-green-500 hover:bg-green-600">
                                    Ver Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}
