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
