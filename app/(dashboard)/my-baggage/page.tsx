'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Package, Dog, CheckCircle2, AlertCircle } from 'lucide-react'

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

    const baggageForm = useForm({
        resolver: zodResolver(baggageSchema)
    })

    const petForm = useForm({
        resolver: zodResolver(petSchema)
    })

    const onBaggageSubmit = async (data: any) => {
        console.log('Baggage Data:', data)
        // TODO: Call API to register baggage
        alert('Equipaje registrado con éxito (Simulación)')
    }

    const onPetSubmit = async (data: any) => {
        console.log('Pet Data:', data)
        // TODO: Call API to register pet
        alert('Mascota registrada con éxito (Simulación)')
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-[#FFC72C] text-[#0033A0] py-12 mt-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">Equipaje y Mascotas</h1>
                    <p className="font-medium opacity-90">Gestiona tus pertenencias y compañeros de viaje</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex gap-4 bg-white p-2 rounded-xl shadow-sm">
                            <Button
                                variant={activeTab === 'baggage' ? 'default' : 'ghost'}
                                onClick={() => setActiveTab('baggage')}
                                className={`flex-1 ${activeTab === 'baggage' ? 'bg-[#0033A0] hover:bg-blue-800' : 'hover:bg-blue-50 text-gray-600'}`}
                            >
                                <Package className="mr-2 h-4 w-4" />
                                Registrar Equipaje
                            </Button>
                            <Button
                                variant={activeTab === 'pet' ? 'default' : 'ghost'}
                                onClick={() => setActiveTab('pet')}
                                className={`flex-1 ${activeTab === 'pet' ? 'bg-[#0033A0] hover:bg-blue-800' : 'hover:bg-blue-50 text-gray-600'}`}
                            >
                                <Dog className="mr-2 h-4 w-4" />
                                Viajar con Mascota
                            </Button>
                        </div>

                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-[#0033A0]">
                                    {activeTab === 'baggage' ? 'Nuevo Equipaje' : 'Nueva Mascota'}
                                </CardTitle>
                                <CardDescription>
                                    {activeTab === 'baggage'
                                        ? 'Registra tu equipaje adicional hasta 24 horas antes del vuelo.'
                                        : 'Registra a tu mascota para viajar en cabina o bodega.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {activeTab === 'baggage' ? (
                                    <form onSubmit={baggageForm.handleSubmit(onBaggageSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="bookingId">Código de Reserva</Label>
                                                <Input id="bookingId" {...baggageForm.register('bookingId')} placeholder="Ej: BOA-123456" className="h-11" />
                                                {baggageForm.formState.errors.bookingId && (
                                                    <p className="text-red-500 text-sm">{baggageForm.formState.errors.bookingId.message as string}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="weight">Peso (kg)</Label>
                                                <Input id="weight" type="number" step="0.1" {...baggageForm.register('weight')} placeholder="23.5" className="h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dimensions">Dimensiones (L x A x A cm)</Label>
                                            <Input id="dimensions" {...baggageForm.register('dimensions')} placeholder="158 cm lineales" className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Descripción (Opcional)</Label>
                                            <Input id="description" {...baggageForm.register('description')} placeholder="Maleta roja..." className="h-11" />
                                        </div>
                                        <Button type="submit" className="w-full bg-[#0033A0] hover:bg-blue-800 h-12 text-lg font-semibold shadow-lg">
                                            Registrar Equipaje
                                        </Button>
                                    </form>
                                ) : (
                                    <form onSubmit={petForm.handleSubmit(onPetSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="petBookingId">Código de Reserva</Label>
                                                <Input id="petBookingId" {...petForm.register('bookingId')} placeholder="Ej: BOA-123456" className="h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="type">Tipo de Mascota</Label>
                                                <Input id="type" {...petForm.register('type')} placeholder="Perro, Gato..." className="h-11" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="breed">Raza</Label>
                                                <Input id="breed" {...petForm.register('breed')} className="h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="petWeight">Peso (kg)</Label>
                                                <Input id="petWeight" type="number" step="0.1" {...petForm.register('weight')} className="h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="carrier">Dimensiones Transportín</Label>
                                            <Input id="carrier" {...petForm.register('carrierDimensions')} placeholder="L x A x A cm" className="h-11" />
                                        </div>
                                        <Button type="submit" className="w-full bg-[#0033A0] hover:bg-blue-800 h-12 text-lg font-semibold shadow-lg">
                                            Registrar Mascota
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Status */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-none shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">Mis Registros Activos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 border border-blue-100 rounded-xl bg-blue-50/50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2 bg-blue-100 rounded-lg text-[#0033A0]">
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-bold flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                EN PROCESO
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Maleta Facturada</p>
                                            <p className="text-sm text-gray-500">Reserva: BOA-998877</p>
                                            <p className="text-sm font-medium text-[#0033A0] mt-1">23 kg</p>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-green-100 rounded-xl bg-green-50/50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2 bg-green-100 rounded-lg text-green-700">
                                                <Dog className="h-5 w-5" />
                                            </div>
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                CONFIRMADO
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Mascota en Cabina</p>
                                            <p className="text-sm text-gray-500">Reserva: BOA-900</p>
                                            <p className="text-sm font-medium text-green-700 mt-1">Max (Bulldog)</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg">
                            <h3 className="font-bold text-lg mb-2">¿Necesitas ayuda?</h3>
                            <p className="text-blue-200 text-sm mb-4">
                                Revisa nuestra política de equipaje y transporte de mascotas.
                            </p>
                            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white">
                                Ver Políticas
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
