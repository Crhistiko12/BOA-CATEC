'use server'

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';

const prisma = db;

// Middleware to check admin role
async function requireAdmin() {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (user?.role !== 'ADMIN') {
        throw new Error('Not authorized - Admin only');
    }

    return user;
}

// Flight Management
export async function createFlight(data: {
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    capacity: number;
    availableSeats: number;
}) {
    await requireAdmin();

    const flight = await prisma.flight.create({
        data: {
            ...data,
            status: 'SCHEDULED'
        }
    });

    revalidatePath('/admin/flights');
    revalidatePath('/vuelos');
    return { success: true, flight };
}

export async function updateFlight(id: string, data: any) {
    await requireAdmin();

    const flight = await prisma.flight.update({
        where: { id },
        data
    });

    revalidatePath('/admin/flights');
    revalidatePath('/vuelos');
    return { success: true, flight };
}

export async function deleteFlight(id: string) {
    await requireAdmin();

    await prisma.flight.delete({
        where: { id }
    });

    revalidatePath('/admin/flights');
    revalidatePath('/vuelos');
    return { success: true };
}

export async function getAllFlights() {
    await requireAdmin();

    return await prisma.flight.findMany({
        orderBy: { departureTime: 'asc' }
    });
}

// Support Ticket Management
export async function getAllSupportTickets() {
    await requireAdmin();

    return await prisma.supportTicket.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function updateSupportTicket(id: string, data: {
    status?: string;
    priority?: string;
}) {
    await requireAdmin();

    const ticket = await prisma.supportTicket.update({
        where: { id },
        data: data as any
    });

    revalidatePath('/admin/tickets');
    return { success: true, ticket };
}

// Statistics
export async function getAdminStats() {
    await requireAdmin();

    const [
        totalFlights,
        totalBookings,
        totalUsers,
        pendingTickets
    ] = await Promise.all([
        prisma.flight.count(),
        prisma.booking.count(),
        prisma.user.count(),
        prisma.supportTicket.count({ where: { status: 'OPEN' } })
    ]);

    return {
        totalFlights,
        totalBookings,
        totalUsers,
        pendingTickets
    };
}
