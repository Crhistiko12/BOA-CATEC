'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Clock, ArrowRight, Filter, BarChart3 } from 'lucide-react'

interface Flight {
    id: string
    flightNumber: string
    origin: string
    destination: string
    departureTime: string
    arrivalTime: string
    price: number
}

export default function FlightsPage() {
    const searchParams = useSearchParams()
    const [flights, setFlights] = useState<Flight[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true)
            try {
                const query = searchParams.toString()
                const res = await fetch(`/api/flights?${query}`)
                if (res.ok) {
                    const data = await res.json()
                    setFlights(data)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchFlights()
    }, [searchParams])

    return (
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-[#0a0e27] bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 transition-colors duration-300">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -right-40 w-80 h-80 dark:bg-[#0052A5]/20 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 dark:bg-[#FFD600]/10 bg-yellow-300/15 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite 2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 dark:bg-purple-500/5 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 7s ease-in-out infinite 4s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto py-10 px-4">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-black dark:text-white text-[#0052A5] mb-4 flex items-center gap-3">
                        <div className="p-4 dark:bg-[#FFD600]/20 bg-[#FFD600]/30 rounded-2xl">
                            <Plane className="h-8 w-8 dark:text-[#FFD600] text-[#0052A5]" />
                        </div>
                        Resultados de Búsqueda
                    </h1>
                    <p className="dark:text-white/80 text-slate-700 text-lg">Encuentra el vuelo perfecto para tu próximo viaje</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filtros */}
                    <div className="hidden lg:block space-y-6">
                        <div className="dark:bg-white/10 bg-white/60 backdrop-blur-2xl rounded-3xl dark:border dark:border-white/20 border border-white/40 p-6 hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <Filter className="h-6 w-6 dark:text-[#FFD600] text-[#0052A5]" />
                                <h3 className="font-bold dark:text-white text-[#0052A5] text-lg">Filtros</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" className="rounded dark:text-[#FFD600] text-[#0052A5] w-5 h-5 transition-all" />
                                    <span className="dark:text-white/80 text-slate-700 group-hover:dark:text-[#FFD600] group-hover:text-[#0052A5] transition-colors">Vuelos Directos</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" className="rounded dark:text-[#FFD600] text-[#0052A5] w-5 h-5 transition-all" />
                                    <span className="dark:text-white/80 text-slate-700 group-hover:dark:text-[#FFD600] group-hover:text-[#0052A5] transition-colors">1 Escala</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" className="rounded dark:text-[#FFD600] text-[#0052A5] w-5 h-5 transition-all" />
                                    <span className="dark:text-white/80 text-slate-700 group-hover:dark:text-[#FFD600] group-hover:text-[#0052A5] transition-colors">Económico</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Resultados */}
                    <div className="lg:col-span-3 space-y-4">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="dark:bg-white/10 bg-white/60 backdrop-blur-xl rounded-3xl dark:border dark:border-white/20 border border-white/40 p-6 animate-pulse h-32"></div>
                                ))}
                            </div>
                        ) : flights.length > 0 ? (
                            flights.map((flight, idx) => (
                                <div key={flight.id} className="group relative">
                                    <div className="absolute -inset-1 dark:bg-gradient-to-r dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    <div className="relative dark:bg-white/10 bg-white/60 backdrop-blur-2xl rounded-3xl dark:border dark:border-white/20 border border-white/40 p-6 dark:hover:border-white/40 hover:border-white/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-cyan-500/20 group-hover:-translate-y-2">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div className="flex-1 w-full">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-2xl dark:text-white text-[#0052A5]">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        <span className="text-xs dark:text-white/60 text-slate-500">{flight.origin}</span>
                                                    </div>
                                                    <div className="flex-1 mx-6 flex flex-col items-center">
                                                        <span className="text-xs dark:text-white/60 text-slate-500 font-semibold mb-2">Vuelo Directo</span>
                                                        <div className="w-full h-1 dark:bg-gradient-to-r dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full relative">
                                                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 dark:text-white text-white rotate-90 drop-shadow-lg" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col text-right">
                                                        <span className="font-black text-2xl dark:text-white text-[#0052A5]">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        <span className="text-xs dark:text-white/60 text-slate-500">{flight.destination}</span>
                                                    </div>
                                                </div>
                                                <div className="hidden md:flex gap-4 text-xs dark:text-white/60 text-slate-500 font-medium">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{Math.round((new Date(flight.arrivalTime).getTime() - new Date(flight.departureTime).getTime()) / 3600000)}h</span>
                                                    </div>
                                                    <span>•</span>
                                                    <span>Vuelo {flight.flightNumber}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3 min-w-[180px] dark:bg-white/10 bg-white/50 rounded-2xl p-4">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xs dark:text-white/60 text-slate-500">desde</span>
                                                    <span className="text-3xl font-black dark:text-[#FFD600] text-[#0052A5]">${flight.price}</span>
                                                </div>
                                                <Button
                                                    className="w-full bg-gradient-to-r from-[#0052A5] to-blue-600 hover:from-[#FFD600] hover:to-yellow-400 hover:text-[#0052A5] dark:text-white text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12 rounded-xl"
                                                    onClick={() => window.location.href = `/book/${flight.id}`}
                                                >
                                                    Seleccionar <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="dark:bg-white/10 bg-white/60 backdrop-blur-xl rounded-3xl dark:border dark:border-white/20 border border-white/40 text-center py-16 px-6">
                                <div className="inline-flex p-6 dark:bg-white/10 bg-white/50 rounded-3xl mb-6">
                                    <Plane className="h-16 w-16 dark:text-white/40 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold dark:text-white text-[#0052A5] mb-2">No se encontraron vuelos</h3>
                                <p className="dark:text-white/80 text-slate-600">Intenta cambiar los filtros o las fechas de búsqueda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    )
}
