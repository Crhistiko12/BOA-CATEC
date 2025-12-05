'use server'

import db from '@/lib/db';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = db;

export type TicketCategory = 'equipaje' | 'cambio_vuelo' | 'reembolso' | 'millas' | 'otro';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

// Crear ticket de soporte
export async function createSupportTicket(data: {
    category: TicketCategory;
    subject: string;
    flightNumber?: string;
    priority: TicketPriority;
    description: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return {
                success: false,
                error: 'No autenticado'
            };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return {
                success: false,
                error: 'Usuario no encontrado'
            };
        }

        // Crear el ticket con toda la información
        const ticket = await prisma.supportTicket.create({
            data: {
                userId: user.id,
                subject: `[${data.category.toUpperCase()}] ${data.subject}`,
                message: `Categoría: ${data.category}\nNúmero de vuelo: ${data.flightNumber || 'N/A'}\nPrioridad: ${data.priority}\n\nDescripción:\n${data.description}`,
                status: 'OPEN',
                priority: data.priority
            }
        });

        revalidatePath('/support');
        revalidatePath('/create-ticket');

        return {
            success: true,
            ticket: ticket,
            ticketId: ticket.id
        };
    } catch (error: any) {
        console.error('Error creating support ticket:', error);
        return {
            success: false,
            error: error.message || 'Error al crear ticket de soporte'
        };
    }
}

// Obtener tickets del usuario
export async function getUserSupportTickets() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const tickets = await prisma.supportTicket.findMany({
            where: {
                user: { email: session.user.email }
            },
            orderBy: { createdAt: 'desc' }
        });

        return tickets;
    } catch (error) {
        console.error('Error getting user support tickets:', error);
        return [];
    }
}

// Obtener detalles de un ticket
export async function getSupportTicketById(id: string) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return null;
        }

        const ticket = await prisma.supportTicket.findFirst({
            where: {
                id: id,
                user: { email: session.user.email }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return ticket;
    } catch (error) {
        console.error('Error getting support ticket:', error);
        return null;
    }
}

// Actualizar estado de ticket (para admin)
export async function updateSupportTicketStatus(id: string, status: TicketStatus) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return {
                success: false,
                error: 'No autenticado'
            };
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        // Solo admin puede actualizar estado
        if (user?.role !== 'ADMIN') {
            return {
                success: false,
                error: 'No autorizado'
            };
        }

        const ticket = await prisma.supportTicket.update({
            where: { id },
            data: { status }
        });

        revalidatePath('/admin/tickets');
        revalidatePath('/support');

        return {
            success: true,
            ticket: ticket
        };
    } catch (error: any) {
        console.error('Error updating support ticket:', error);
        return {
            success: false,
            error: error.message || 'Error al actualizar ticket'
        };
    }
}

// Obtener todos los tickets (para admin)
export async function getAllSupportTicketsAdmin() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (user?.role !== 'ADMIN') {
            return [];
        }

        const tickets = await prisma.supportTicket.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return tickets;
    } catch (error) {
        console.error('Error getting all support tickets:', error);
        return [];
    }
}

// Obtener estadísticas de tickets (para chatbot)
export async function getTicketStats(userId?: string) {
    try {
        const where = userId ? { userId } : {};

        const [total, open, inProgress, resolved] = await Promise.all([
            prisma.supportTicket.count({ where }),
            prisma.supportTicket.count({ where: { ...where, status: 'OPEN' } }),
            prisma.supportTicket.count({ where: { ...where, status: 'IN_PROGRESS' } }),
            prisma.supportTicket.count({ where: { ...where, status: 'RESOLVED' } })
        ]);

        return {
            total,
            open,
            inProgress,
            resolved,
            closed: total - open - inProgress - resolved
        };
    } catch (error) {
        console.error('Error getting ticket stats:', error);
        return {
            total: 0,
            open: 0,
            inProgress: 0,
            resolved: 0,
            closed: 0
        };
    }
}
