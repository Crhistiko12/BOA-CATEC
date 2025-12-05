'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Package, Dog, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react'
import { registerBaggage, registerPet, getUserBaggage, getUserPets } from '@/lib/baggage-actions'

const baggageSchema = z.object({
    bookingId: z.string().min(1, 'Código de reserva requerido'),
    weight: z.string().transform((val) => parseFloat(val)),
    dimensions: z.string().min(1, 'Dimensiones requeridas'),
    description: z.string().optional(),
})

const petSchema = z.object({
    bookingId: z.string().min(1, 'Código de reserva requerido'),
    type: z.string().min(1, 'Tipo de mascota requerido'),
    breed: z.string().min(1, 'Raza requerida'),
    weight: z.string().transform((val) => parseFloat(val)),
    carrierDimensions: z.string().min(1, 'Dimensiones del transportín requeridas'),
})

export default function MyBaggagePage() {
    const [activeTab, setActiveTab] = useState<'baggage' | 'pet'>('baggage')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [baggageList, setBaggageList] = useState<any[]>([])
    const [petList, setPetList] = useState<any[]>([])

    const baggageForm = useForm({
        resolver: zodResolver(baggageSchema)
    })

    const petForm = useForm({
        resolver: zodResolver(petSchema)
    })

    // Load user's baggage and pets on mount
    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            const [baggage, pets] = await Promise.all([
                getUserBaggage(),
                getUserPets()
            ])
            setBaggageList(baggage)
            setPetList(pets)
        } catch (err) {
            console.error('Error loading data:', err)
        }
    }

    const onBaggageSubmit = async (data: any) => {
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const result = await registerBaggage({
                bookingCode: data.bookingId,
                weight: parseFloat(data.weight),
                dimensions: data.dimensions,
                special: false,
                description: data.description
            })

            if (!result.success) {
                setError(result.error || 'Error al registrar equipaje')
                setLoading(false)
                return
            }

            setSuccess(`✓ Equipaje registrado con código: ${result.trackingCode}`)
            baggageForm.reset()
            await loadUserData()
            setLoading(false)
        } catch (err: any) {
            setError(err.message || 'Error al registrar equipaje')
            setLoading(false)
        }
    }

    const onPetSubmit = async (data: any) => {
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const result = await registerPet({
                bookingCode: data.bookingId,
                type: data.type,
                breed: data.breed,
                weight: parseFloat(data.weight),
                carrierDimensions: data.carrierDimensions,
                healthCertificate: 'pending' // Placeholder
            })

            if (!result.success) {
                setError(result.error || 'Error al registrar mascota')
                setLoading(false)
                return
            }

            setSuccess('✓ Mascota registrada exitosamente')
            petForm.reset()
            await loadUserData()
            setLoading(false)
        } catch (err: any) {
            setError(err.message || 'Error al registrar mascota')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-[#0a0e27] bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 transition-colors duration-300 pt-40 pb-20">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -right-40 w-80 h-80 dark:bg-cyan-500/15 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 dark:bg-[#FFD600]/10 bg-yellow-200/15 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 dark:bg-purple-500/5 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 7s ease-in-out infinite 4s' }}></div>
            </div>

            {/* Hero Banner */}
            <div className="relative z-10 dark:bg-gradient-to-br dark:from-cyan-500 dark:via-teal-500 dark:to-emerald-600 bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-500 overflow-hidden pt-20 pb-20">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '60px 60px' }}></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="flex items-start gap-6">
                        <div className="p-4 dark:bg-white/20 bg-white/40 backdrop-blur-xl rounded-3xl dark:border-2 dark:border-white/30 border-2 border-white/50 shadow-2xl">
                            <Package className="h-10 w-10 dark:text-white text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black dark:text-white text-white leading-tight">
                                Equipaje y Mascotas
                            </h1>
                            <p className="dark:text-white/90 text-white/95 text-lg mt-3 flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Gestiona tus pertenencias y compañeros de viaje
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 container mx-auto px-6 -mt-10 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tab Buttons */}
                        <div className="flex gap-4 dark:bg-white/5 bg-white/40 backdrop-blur-xl p-2 rounded-2xl dark:border dark:border-white/10 border border-white/40 shadow-2xl">
                            <Button
                                onClick={() => setActiveTab('baggage')}
                                className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'baggage'
                                        ? 'dark:bg-gradient-to-r dark:from-cyan-500 dark:to-emerald-500 bg-gradient-to-r from-cyan-400 to-emerald-400 dark:text-white text-white dark:shadow-lg dark:shadow-cyan-500/50 shadow-lg shadow-cyan-400/50'
                                        : 'dark:bg-white/10 dark:text-white/70 bg-white/30 text-slate-600 dark:hover:bg-white/15 dark:hover:text-white hover:bg-white/50 hover:text-slate-700'
                                    }`}
                            >
                                <Package className="mr-2 h-5 w-5 inline" />
                                Registrar Equipaje
                            </Button>
                            <Button
                                onClick={() => setActiveTab('pet')}
                                className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'pet'
                                        ? 'dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 bg-gradient-to-r from-purple-400 to-pink-400 dark:text-white text-white dark:shadow-lg dark:shadow-purple-500/50 shadow-lg shadow-purple-400/50'
                                        : 'dark:bg-white/10 dark:text-white/70 bg-white/30 text-slate-600 dark:hover:bg-white/15 dark:hover:text-white hover:bg-white/50 hover:text-slate-700'
                                    }`}
                            >
                                <Dog className="mr-2 h-5 w-5 inline" />
                                Viajar con Mascota
                            </Button>
                        </div>

                        {/* Form Card */}
                        <div className="group relative">
                            <div className={`absolute -inset-1 bg-gradient-to-r rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 ${activeTab === 'baggage' ? 'dark:from-cyan-500 dark:via-teal-500 dark:to-emerald-500 from-cyan-400 via-teal-400 to-emerald-400' : 'dark:from-purple-500 dark:via-pink-500 dark:to-red-500 from-purple-400 via-pink-400 to-red-400'}`}></div>

                            <div className="relative dark:bg-white/10 bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 dark:border dark:border-white/20 border border-white/40 overflow-hidden dark:hover:border-white/40 hover:border-white/60 transition-all duration-500">
                                <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-white/5 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative">
                                    <h2 className="text-3xl font-black dark:bg-gradient-to-r dark:from-white dark:to-white/70 bg-gradient-to-r from-slate-800 to-slate-600 dark:bg-clip-text dark:text-transparent bg-clip-text text-transparent mb-2">
                                        {activeTab === 'baggage' ? 'Nuevo Equipaje' : 'Nueva Mascota'}
                                    </h2>
                                    <p className="dark:text-white/60 text-slate-600 mb-8">
                                        {activeTab === 'baggage'
                                            ? 'Registra tu equipaje adicional hasta 24 horas antes del vuelo.'
                                            : 'Registra a tu mascota para viajar en cabina o bodega.'}
                                    </p>

                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-green-800 dark:text-green-300 text-sm">{success}</p>
                                        </div>
                                    )}

                                    {activeTab === 'baggage' ? (
                                        <form onSubmit={baggageForm.handleSubmit(onBaggageSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bookingId" className="dark:text-white/80 text-slate-700 font-semibold">Código de Reserva</Label>
                                                    <Input id="bookingId" {...baggageForm.register('bookingId')} placeholder="Ej: BOA-123456"
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-cyan-400 focus:border-cyan-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                    {baggageForm.formState.errors.bookingId && (
                                                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">{baggageForm.formState.errors.bookingId.message as string}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="weight" className="dark:text-white/80 text-slate-700 font-semibold">Peso (kg)</Label>
                                                    <Input id="weight" type="number" step="0.1" {...baggageForm.register('weight')} placeholder="23.5"
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-cyan-400 focus:border-cyan-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dimensions" className="dark:text-white/80 text-slate-700 font-semibold">Dimensiones (L x A x A cm)</Label>
                                                <Input id="dimensions" {...baggageForm.register('dimensions')} placeholder="158 cm lineales"
                                                    className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-cyan-400 focus:border-cyan-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="description" className="dark:text-white/80 text-slate-700 font-semibold">Descripción (Opcional)</Label>
                                                <Input id="description" {...baggageForm.register('description')} placeholder="Maleta roja..."
                                                    className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-cyan-400 focus:border-cyan-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                            </div>
                                            <Button type="submit" disabled={loading} className="w-full dark:bg-gradient-to-r dark:from-cyan-500 dark:via-teal-500 dark:to-emerald-500 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 dark:hover:from-cyan-400 dark:hover:via-teal-400 dark:hover:to-emerald-400 hover:from-cyan-500 hover:via-teal-500 hover:to-emerald-500 dark:text-white text-white font-bold h-13 rounded-xl dark:shadow-lg dark:shadow-cyan-500/50 shadow-lg shadow-cyan-400/50 transition-all duration-300 dark:hover:shadow-xl dark:hover:shadow-cyan-500/70 hover:shadow-xl hover:shadow-cyan-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                                {loading ? (
                                                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Registrando...</>
                                                ) : (
                                                    <><Sparkles className="h-5 w-5 mr-2" /> Registrar Equipaje</>
                                                )}
                                            </Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={petForm.handleSubmit(onPetSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="petBookingId" className="dark:text-white/80 text-slate-700 font-semibold">Código de Reserva</Label>
                                                    <Input id="petBookingId" {...petForm.register('bookingId')} placeholder="Ej: BOA-123456"
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-purple-400 focus:border-purple-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="type" className="dark:text-white/80 text-slate-700 font-semibold">Tipo de Mascota</Label>
                                                    <Input id="type" {...petForm.register('type')} placeholder="Perro, Gato..."
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-purple-400 focus:border-purple-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="breed" className="dark:text-white/80 text-slate-700 font-semibold">Raza</Label>
                                                    <Input id="breed" {...petForm.register('breed')}
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-purple-400 focus:border-purple-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="petWeight" className="dark:text-white/80 text-slate-700 font-semibold">Peso (kg)</Label>
                                                    <Input id="petWeight" type="number" step="0.1" {...petForm.register('weight')}
                                                        className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-purple-400 focus:border-purple-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="carrier" className="dark:text-white/80 text-slate-700 font-semibold">Dimensiones Transportín</Label>
                                                <Input id="carrier" {...petForm.register('carrierDimensions')} placeholder="L x A x A cm"
                                                    className="h-12 dark:bg-white/10 bg-white/40 dark:border-2 dark:border-white/20 border-2 border-white/40 dark:focus:border-purple-400 focus:border-purple-600 dark:text-white text-slate-800 dark:placeholder:text-white/40 placeholder:text-slate-500 rounded-xl transition-all duration-300" />
                                            </div>
                                            <Button type="submit" disabled={loading} className="w-full dark:bg-gradient-to-r dark:from-purple-500 dark:via-pink-500 dark:to-red-500 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 dark:hover:from-purple-400 dark:hover:via-pink-400 dark:hover:to-red-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 dark:text-white text-white font-bold h-13 rounded-xl dark:shadow-lg dark:shadow-purple-500/50 shadow-lg shadow-purple-400/50 transition-all duration-300 dark:hover:shadow-xl dark:hover:shadow-purple-500/70 hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                                {loading ? (
                                                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Registrando...</>
                                                ) : (
                                                    <><Sparkles className="h-5 w-5 mr-2" /> Registrar Mascota</>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Status */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Active Records */}
                        <div className="group relative">
                            <div className="absolute -inset-1 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-teal-500 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500"></div>

                            <div className="relative dark:bg-white/10 bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 dark:border dark:border-white/20 border border-white/40 overflow-hidden dark:hover:border-white/40 hover:border-white/60 transition-all duration-500">
                                <h3 className="text-xl font-black dark:text-white text-slate-800 mb-6">Registros Activos</h3>

                                <div className="space-y-4">
                                    {/* Real Baggage Items */}
                                    {baggageList.length > 0 ? (
                                        baggageList.map((baggage) => (
                                            <div key={baggage.id} className="p-4 dark:border-2 dark:border-cyan-500/30 border-2 border-cyan-300/50 rounded-2xl dark:bg-gradient-to-br dark:from-cyan-500/10 dark:to-teal-500/10 bg-gradient-to-br from-cyan-300/30 to-teal-300/20 dark:hover:from-cyan-500/20 dark:hover:to-teal-500/20 hover:from-cyan-300/50 hover:to-teal-300/40 transition-all duration-300">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="p-2 dark:bg-gradient-to-br dark:from-cyan-500 dark:to-teal-500 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg">
                                                        <Package className="h-5 w-5 text-white" />
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${baggage.status === 'REGISTERED' ? 'dark:bg-yellow-500/80 bg-yellow-400/80 dark:text-yellow-50 text-yellow-900' :
                                                            baggage.status === 'LOADED' ? 'dark:bg-green-500/80 bg-green-400/80 dark:text-green-50 text-green-900' :
                                                                'dark:bg-gray-500/80 bg-gray-400/80 dark:text-gray-50 text-gray-900'
                                                        }`}>
                                                        <AlertCircle className="h-3 w-3" />
                                                        {baggage.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-bold dark:text-white text-slate-800">{baggage.description || 'Equipaje'}</p>
                                                    <p className="text-sm dark:text-white/60 text-slate-600">Código: {baggage.trackingCode}</p>
                                                    <p className="text-sm font-semibold dark:text-cyan-300 text-cyan-700 mt-2">{baggage.weight} kg • {baggage.dimensions}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}

                                    {/* Real Pet Items */}
                                    {petList.length > 0 ? (
                                        petList.map((pet) => (
                                            <div key={pet.id} className="p-4 dark:border-2 dark:border-purple-500/30 border-2 border-purple-300/50 rounded-2xl dark:bg-gradient-to-br dark:from-purple-500/10 dark:to-pink-500/10 bg-gradient-to-br from-purple-300/30 to-pink-300/20 dark:hover:from-purple-500/20 dark:hover:to-pink-500/20 hover:from-purple-300/50 hover:to-pink-300/40 transition-all duration-300">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="p-2 dark:bg-gradient-to-br dark:from-purple-500 dark:to-pink-500 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg">
                                                        <Dog className="h-5 w-5 text-white" />
                                                    </div>
                                                    <span className="px-3 py-1 dark:bg-green-500/80 bg-green-400/80 dark:text-green-50 text-green-900 rounded-lg text-xs font-bold flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {pet.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-bold dark:text-white text-slate-800">{pet.type} - {pet.breed}</p>
                                                    <p className="text-sm dark:text-white/60 text-slate-600">Peso: {pet.weight} kg</p>
                                                    <p className="text-sm font-semibold dark:text-pink-300 text-pink-700 mt-2">Transportín: {pet.carrierDimensions}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}

                                    {baggageList.length === 0 && petList.length === 0 && (
                                        <div className="text-center py-8">
                                            <p className="dark:text-white/60 text-slate-600">No hay registros activos</p>
                                            <p className="text-sm dark:text-white/40 text-slate-500 mt-2">Registra tu equipaje o mascota usando el formulario</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="group relative">
                            <div className="absolute -inset-1 dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-500 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500"></div>

                            <div className="relative dark:bg-gradient-to-br dark:from-amber-500/20 dark:to-orange-500/20 bg-gradient-to-br from-amber-300/40 to-orange-300/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 dark:border dark:border-amber-500/30 border border-amber-400/50 overflow-hidden dark:hover:border-amber-500/60 hover:border-amber-500/80 transition-all duration-500">
                                <h3 className="font-bold dark:text-white text-slate-800 mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 dark:text-amber-400 text-amber-600" />
                                    ¿Necesitas ayuda?
                                </h3>
                                <p className="dark:text-white/80 text-slate-700 text-sm mb-4">
                                    Revisa nuestra política de equipaje y transporte de mascotas.
                                </p>
                                <Button className="w-full dark:bg-gradient-to-r dark:from-amber-500 dark:to-orange-500 bg-gradient-to-r from-amber-400 to-orange-400 dark:hover:from-amber-400 dark:hover:to-orange-400 hover:from-amber-500 hover:to-orange-500 dark:text-white text-white font-bold rounded-xl dark:shadow-lg dark:shadow-amber-500/50 shadow-lg shadow-amber-400/50 transition-all duration-300 dark:hover:shadow-xl dark:hover:shadow-amber-500/70 hover:shadow-xl hover:shadow-amber-500/50">
                                    Ver Políticas
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    )
}
