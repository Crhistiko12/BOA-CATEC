'use server'

import db from '@/lib/db';

const prisma = db;

export async function getPopularDestinations() {
    return await prisma.destination.findMany({
        where: { popular: true },
        take: 4,
    });
}

export async function getAllDestinations() {
    return await prisma.destination.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function searchFlights(origin?: string, destination?: string, date?: string) {
    const where: any = {
        status: 'SCHEDULED',
        departureTime: {
            gte: new Date(), // Only future flights
        }
    };

    if (origin) where.origin = { contains: origin, mode: 'insensitive' };
    if (destination) where.destination = { contains: destination, mode: 'insensitive' };
    if (date) {
        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(nextDay.getDate() + 1);

        where.departureTime = {
            gte: searchDate,
            lt: nextDay,
        };
    }

    return await prisma.flight.findMany({
        where,
        orderBy: { departureTime: 'asc' },
    });
}

export async function getUserNextFlight(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            bookings: {
                where: {
                    status: 'CONFIRMED',
                    flight: {
                        departureTime: { gte: new Date() }
                    }
                },
                orderBy: { flight: { departureTime: 'asc' } },
                take: 1,
                include: { flight: true }
            }
        }
    });

    return user?.bookings[0] || null;
}

export async function getUserBookings(email: string) {
    return await prisma.booking.findMany({
        where: { user: { email } },
        include: {
            flight: true,
            tickets: true,
            passengers: true
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getBookingDetails(bookingId: string) {
    return await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            flight: true,
            tickets: true,
            passengers: true,
            payment: true
        }
    });
}
