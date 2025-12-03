'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function FlightSearch() {
    const [tripType, setTripType] = useState('roundtrip')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const cities = [
        { code: 'LPB', name: 'La Paz' },
        { code: 'SRZ', name: 'Santa Cruz' },
        { code: 'CBB', name: 'Cochabamba' },
        { code: 'SRE', name: 'Sucre' },
        { code: 'TJA', name: 'Tarija' },
        { code: 'TDD', name: 'Trinidad' },
    ]

    const onSubmit = (data) => {
        // Build query string with search parameters
        const params = new URLSearchParams({
            origin: data.origin,
            destination: data.destination,
            departureDate: data.departureDate,
            ...(tripType === 'roundtrip' && data.returnDate && { returnDate: data.returnDate }),
            passengers: data.passengers || '1',
            class: data.class || 'economy',
            tripType: tripType
        })

        // Navigate to vuelos page with parameters
        router.push(`/vuelos?${params.toString()}`)
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto -mt-12 relative z-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Trip Type Toggle */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setTripType('roundtrip')}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${tripType === 'roundtrip'
                            ? 'bg-boa-blue text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Ida y vuelta
                    </button>
                    <button
                        type="button"
                        onClick={() => setTripType('oneway')}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${tripType === 'oneway'
                            ? 'bg-boa-blue text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Solo ida
                    </button>
                </div>

                {/* Flight Search Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Origin */}
                    <div>
                        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                            Origen
                        </label>
                        <select
                            id="origin"
                            {...register('origin', { required: 'Seleccione origen' })}
                            className="input-field"
                        >
                            <option value="">Seleccionar ciudad</option>
                            {cities.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name} ({city.code})
                                </option>
                            ))}
                        </select>
                        {errors.origin && (
                            <p className="mt-1 text-sm text-red-600">{errors.origin.message}</p>
                        )}
                    </div>

                    {/* Destination */}
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                            Destino
                        </label>
                        <select
                            id="destination"
                            {...register('destination', { required: 'Seleccione destino' })}
                            className="input-field"
                        >
                            <option value="">Seleccionar ciudad</option>
                            {cities.map((city) => (
                                <option key={city.code} value={city.code}>
                                    {city.name} ({city.code})
                                </option>
                            ))}
                        </select>
                        {errors.destination && (
                            <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
                        )}
                    </div>

                    {/* Departure Date */}
                    <div>
                        <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de salida
                        </label>
                        <input
                            id="departureDate"
                            type="date"
                            {...register('departureDate', { required: 'Seleccione fecha' })}
                            className="input-field"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.departureDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.departureDate.message}</p>
                        )}
                    </div>

                    {/* Return Date */}
                    {tripType === 'roundtrip' && (
                        <div>
                            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de regreso
                            </label>
                            <input
                                id="returnDate"
                                type="date"
                                {...register('returnDate', { required: tripType === 'roundtrip' && 'Seleccione fecha' })}
                                className="input-field"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.returnDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.returnDate.message}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Passengers and Class */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Passengers */}
                    <div>
                        <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
                            Pasajeros
                        </label>
                        <select
                            id="passengers"
                            {...register('passengers')}
                            className="input-field"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Class */}
                    <div>
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                            Clase
                        </label>
                        <select
                            id="class"
                            {...register('class')}
                            className="input-field"
                        >
                            <option value="economy">Económica</option>
                            <option value="business">Ejecutiva</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Buscar vuelos
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
