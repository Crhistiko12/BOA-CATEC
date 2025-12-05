'use server'

import { auth } from '@/lib/auth';
import db from '@/lib/db';

const prisma = db;

export async function createBooking(data: { flightId: string, passengers: any[], paymentMethod: string }) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error('User not authenticated');
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error('User not found');

    const flight = await prisma.flight.findUnique({ where: { id: data.flightId } });
    if (!flight) throw new Error('Flight not found');

    // 1. Create Booking
    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            flightId: flight.id,
            status: 'CONFIRMED', // Auto-confirm for demo
            totalPrice: flight.price * data.passengers.length,
            passengers: {
                create: data.passengers.map(p => ({
                    firstName: p.firstName,
                    lastName: p.lastName,
                    type: p.type,
                    seatNumber: '12A' // Auto-assign for demo
                }))
            }
        }
    });

    // 2. Create Tickets
    // Fetch passengers with IDs
    const createdPassengers = await prisma.passenger.findMany({ where: { bookingId: booking.id } });

    for (const p of createdPassengers) {
        await prisma.ticket.create({
            data: {
                bookingId: booking.id,
                passengerId: p.id,
                ticketNumber: `930${Date.now()}${Math.floor(Math.random() * 1000)}`,
                seatNumber: p.seatNumber || 'ANY',
                class: 'ECONOMY',
                status: 'ISSUED'
            }
        });
    }

    // 3. Decrease Stock
    await prisma.flight.update({
        where: { id: flight.id },
        data: { availableSeats: { decrement: data.passengers.length } }
    });

    return { success: true, bookingId: booking.id };
}

// Obtener reserva por código
export async function getBookingByCode(code: string) {
    try {
        // El código puede ser el ID completo o los primeros 10 caracteres
        const booking = await prisma.booking.findFirst({
            where: {
                OR: [
                    { id: code },
                    { id: { startsWith: code.toLowerCase().replace('boa-', '') } }
                ]
            },
            include: {
                flight: true,
                passengers: true,
                tickets: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return booking;
    } catch (error) {
        console.error('Error getting booking:', error);
        return null;
    }
}

// Realizar check-in
export async function performCheckIn(bookingCode: string) {
    try {
        const booking = await getBookingByCode(bookingCode);

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
                error: 'El vuelo ya ha partido'
            };
        }

        // Verificar que no se haya hecho check-in antes
        const alreadyCheckedIn = booking.tickets.some(t => t.status === 'CHECKED_IN');
        if (alreadyCheckedIn) {
            return {
                success: false,
                error: 'Ya se realizó el check-in para esta reserva'
            };
        }

        // Actualizar estado de todos los tickets
        await prisma.ticket.updateMany({
            where: { bookingId: booking.id },
            data: { status: 'CHECKED_IN' }
        });

        return {
            success: true,
            booking: {
                ...booking,
                tickets: booking.tickets.map(t => ({ ...t, status: 'CHECKED_IN' as const }))
            }
        };
    } catch (error: any) {
        console.error('Error performing check-in:', error);
        return {
            success: false,
            error: error.message || 'Error al realizar check-in'
        };
    }
}

// Obtener todas las reservas del usuario autenticado
export async function getUserBookingsAuth() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const bookings = await prisma.booking.findMany({
            where: {
                user: { email: session.user.email }
            },
            include: {
                flight: true,
                passengers: true,
                tickets: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return bookings;
    } catch (error) {
        console.error('Error getting user bookings:', error);
        return [];
    }
}
