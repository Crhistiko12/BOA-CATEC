'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function CheckInWidget() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const onSubmit = (data) => {
        // Navigate to checkin page with booking reference and last name
        const params = new URLSearchParams({
            code: data.bookingRef.toUpperCase(),
            lastName: data.lastName
        })
        router.push(`/checkin?${params.toString()}`)
    }

    return (
        <section className="section-container bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-boa-blue rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-boa-dark mb-4">
                        Check-in <span className="text-gradient-boa">Online</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Ahorra tiempo y realiza tu check-in desde casa
                    </p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Booking Reference */}
                            <div>
                                <label htmlFor="bookingRef" className="block text-sm font-medium text-gray-700 mb-2">
                                    Código de reserva *
                                </label>
                                <input
                                    id="bookingRef"
                                    type="text"
                                    placeholder="Ej: BOA123456"
                                    {...register('bookingRef', {
                                        required: 'El código de reserva es obligatorio',
                                        pattern: {
                                            value: /^[A-Z0-9]{6,10}$/,
                                            message: 'Código inválido (6-10 caracteres alfanuméricos)'
                                        }
                                    })}
                                    className="input-field uppercase"
                                    maxLength={10}
                                />
                                {errors.bookingRef && (
                                    <p className="mt-1 text-sm text-red-600">{errors.bookingRef.message}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Apellido *
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Apellido del pasajero"
                                    {...register('lastName', {
                                        required: 'El apellido es obligatorio',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres'
                                        }
                                    })}
                                    className="input-field"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-boa-blue mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-gray-700">
                                    <p className="font-semibold mb-1">Información importante:</p>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>El check-in abre 24 horas antes del vuelo</li>
                                        <li>Cierra 2 horas antes para vuelos internacionales</li>
                                        <li>Imprime o descarga tu pase de abordar</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary text-lg py-4"
                        >
                            Continuar al check-in
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
