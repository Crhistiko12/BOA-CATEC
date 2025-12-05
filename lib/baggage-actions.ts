'use server'

import db from '@/lib/db';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = db;

// Generar código de seguimiento único para equipaje
function generateTrackingCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'BAG-';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Registrar equipaje
export async function registerBaggage(data: {
    bookingCode: string;
    weight: number;
    dimensions: string;
    special: boolean;
    description?: string;
}) {
    try {
        // Buscar la reserva por código
        const booking = await prisma.booking.findFirst({
            where: {
                OR: [
                    { id: data.bookingCode },
                    { id: { startsWith: data.bookingCode.toLowerCase().replace('boa-', '') } }
                ]
            },
            include: {
                flight: true
            }
        });

        if (!booking) {
            return {
                success: false,
                error: 'Código de reserva no encontrado'
            };
        }

        // Verificar que el vuelo no haya partido
        if (new Date(booking.flight.departureTime) < new Date()) {
            return {
                success: false,
                error: 'No se puede registrar equipaje para un vuelo que ya partió'
            };
        }

        // Crear registro de equipaje
        const baggage = await prisma.baggage.create({
            data: {
                bookingId: booking.id,
                weight: data.weight,
                dimensions: data.dimensions,
                special: data.special,
                description: data.description,
                trackingCode: generateTrackingCode(),
                status: 'REGISTERED'
            }
        });

        revalidatePath('/my-baggage');

        return {
            success: true,
            baggage: baggage,
            trackingCode: baggage.trackingCode
        };
    } catch (error: any) {
        console.error('Error registering baggage:', error);
        return {
            success: false,
            error: error.message || 'Error al registrar equipaje'
        };
    }
}

// Registrar mascota
export async function registerPet(data: {
    bookingCode: string;
    type: string;
    breed: string;
    weight: number;
    carrierDimensions: string;
    healthCertificate: string;
}) {
    try {
        // Buscar la reserva por código
        const booking = await prisma.booking.findFirst({
            where: {
                OR: [
                    { id: data.bookingCode },
                    { id: { startsWith: data.bookingCode.toLowerCase().replace('boa-', '') } }
                ]
            },
            include: {
                flight: true
            }
        });

        if (!booking) {
            return {
                success: false,
                error: 'Código de reserva no encontrado'
            };
        }

        // Verificar que el vuelo no haya partido
        if (new Date(booking.flight.departureTime) < new Date()) {
            return {
                success: false,
                error: 'No se puede registrar mascota para un vuelo que ya partió'
            };
        }

        // Crear registro de mascota
        const pet = await prisma.pet.create({
            data: {
                bookingId: booking.id,
                type: data.type,
                breed: data.breed,
                weight: data.weight,
                carrierDimensions: data.carrierDimensions,
                healthCertificate: data.healthCertificate,
                status: 'registered'
            }
        });

        revalidatePath('/my-baggage');

        return {
            success: true,
            pet: pet
        };
    } catch (error: any) {
        console.error('Error registering pet:', error);
        return {
            success: false,
            error: error.message || 'Error al registrar mascota'
        };
    }
}

// Obtener equipaje del usuario
export async function getUserBaggage() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const baggage = await prisma.baggage.findMany({
            where: {
                booking: {
                    user: { email: session.user.email }
                }
            },
            include: {
                booking: {
                    include: {
                        flight: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return baggage;
    } catch (error) {
        console.error('Error getting user baggage:', error);
        return [];
    }
}

// Obtener mascotas del usuario
export async function getUserPets() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const pets = await prisma.pet.findMany({
            where: {
                booking: {
                    user: { email: session.user.email }
                }
            },
            include: {
                booking: {
                    include: {
                        flight: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return pets;
    } catch (error) {
        console.error('Error getting user pets:', error);
        return [];
    }
}

// Obtener equipaje por código de seguimiento
export async function getBaggageByTrackingCode(trackingCode: string) {
    try {
        const baggage = await prisma.baggage.findUnique({
            where: { trackingCode },
            include: {
                booking: {
                    include: {
                        flight: true,
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        return baggage;
    } catch (error) {
        console.error('Error getting baggage by tracking code:', error);
        return null;
    }
}
