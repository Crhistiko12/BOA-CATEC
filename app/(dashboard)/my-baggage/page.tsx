'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Package, Dog } from 'lucide-react'

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
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-[#1E3A8A]">Gestión de Equipaje y Mascotas</h1>

            <div className="flex gap-4 mb-8">
                <Button
                    variant={activeTab === 'baggage' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('baggage')}
                    className={activeTab === 'baggage' ? 'bg-[#1E3A8A]' : ''}
                >
                    <Package className="mr-2 h-4 w-4" />
                    Registrar Equipaje
                </Button>
                <Button
                    variant={activeTab === 'pet' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('pet')}
                    className={activeTab === 'pet' ? 'bg-[#1E3A8A]' : ''}
                >
                    <Dog className="mr-2 h-4 w-4" />
                    Viajar con Mascota
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario */}
                <Card>
                    <CardHeader>
                        <CardTitle>
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
                            <form onSubmit={baggageForm.handleSubmit(onBaggageSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bookingId">Código de Reserva</Label>
                                    <Input id="bookingId" {...baggageForm.register('bookingId')} placeholder="Ej: BOA-123456" />
                                    {baggageForm.formState.errors.bookingId && (
                                        <p className="text-red-500 text-sm">{baggageForm.formState.errors.bookingId.message as string}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Peso (kg)</Label>
                                    <Input id="weight" type="number" step="0.1" {...baggageForm.register('weight')} placeholder="23.5" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dimensions">Dimensiones (L x A x A cm)</Label>
                                    <Input id="dimensions" {...baggageForm.register('dimensions')} placeholder="158 cm lineales" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción (Opcional)</Label>
                                    <Input id="description" {...baggageForm.register('description')} placeholder="Maleta roja..." />
                                </div>
                                <Button type="submit" className="w-full bg-[#1E3A8A]">Registrar Equipaje</Button>
                            </form>
                        ) : (
                            <form onSubmit={petForm.handleSubmit(onPetSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="petBookingId">Código de Reserva</Label>
                                    <Input id="petBookingId" {...petForm.register('bookingId')} placeholder="Ej: BOA-123456" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo de Mascota</Label>
                                    <Input id="type" {...petForm.register('type')} placeholder="Perro, Gato..." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breed">Raza</Label>
                                    <Input id="breed" {...petForm.register('breed')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="petWeight">Peso (kg)</Label>
                                    <Input id="petWeight" type="number" step="0.1" {...petForm.register('weight')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="carrier">Dimensiones Transportín</Label>
                                    <Input id="carrier" {...petForm.register('carrierDimensions')} placeholder="L x A x A cm" />
                                </div>
                                <Button type="submit" className="w-full bg-[#1E3A8A]">Registrar Mascota</Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Estado / Lista (Simulado) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mis Registros Activos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                                <div>
                                    <p className="font-bold">Maleta Facturada</p>
                                    <p className="text-sm text-gray-500">Reserva: BOA-998877</p>
                                    <p className="text-sm">23 kg - En proceso</p>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                                    REGISTRADO
                                </span>
                            </div>

                            {/* Empty state placeholder */}
                            <div className="text-center py-8 text-gray-400">
                                <p>No tienes más registros activos.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
