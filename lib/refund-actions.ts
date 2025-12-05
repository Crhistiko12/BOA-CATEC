'use server'

import db from '@/lib/db';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = db;

// Crear solicitud de reembolso
export async function createRefundRequest(data: {
    bookingCode: string;
    reason: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return {
                success: false,
                error: 'No autenticado'
            };
        }

        // Buscar la reserva por código
        const booking = await prisma.booking.findFirst({
            where: {
                OR: [
                    { id: data.bookingCode },
                    { id: { startsWith: data.bookingCode.toLowerCase().replace('boa-', '') } }
                ],
                user: { email: session.user.email }
            },
            include: {
                flight: true,
                refundRequest: true
            }
        });

        if (!booking) {
            return {
                success: false,
                error: 'Código de reserva no encontrado o no pertenece a tu cuenta'
            };
        }

        // Verificar que no exista ya una solicitud de reembolso
        if (booking.refundRequest) {
            return {
                success: false,
                error: 'Ya existe una solicitud de reembolso para esta reserva'
            };
        }

        // Calcular monto de reembolso según política
        // Política simple: 100% si falta más de 48h, 50% si falta más de 24h, 0% si falta menos
        const hoursUntilFlight = (new Date(booking.flight.departureTime).getTime() - new Date().getTime()) / (1000 * 60 * 60);
        let refundAmount = 0;

        if (hoursUntilFlight > 48) {
            refundAmount = booking.totalPrice * 0.9; // 90% de reembolso
        } else if (hoursUntilFlight > 24) {
            refundAmount = booking.totalPrice * 0.5; // 50% de reembolso
        } else if (hoursUntilFlight > 0) {
            refundAmount = booking.totalPrice * 0.25; // 25% de reembolso
        }

        // Crear solicitud de reembolso
        const refundRequest = await prisma.refundRequest.create({
            data: {
                bookingId: booking.id,
                reason: data.reason,
                amount: refundAmount,
                status: 'PENDING'
            }
        });

        // Actualizar estado de la reserva
        await prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'CANCELLED' }
        });

        revalidatePath('/refunds');
        revalidatePath('/my-bookings');

        return {
            success: true,
            refundRequest: refundRequest,
            refundAmount: refundAmount
        };
    } catch (error: any) {
        console.error('Error creating refund request:', error);
        return {
            success: false,
            error: error.message || 'Error al crear solicitud de reembolso'
        };
    }
}

// Obtener solicitudes de reembolso del usuario
export async function getUserRefundRequests() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return [];
        }

        const refundRequests = await prisma.refundRequest.findMany({
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

        return refundRequests;
    } catch (error) {
        console.error('Error getting user refund requests:', error);
        return [];
    }
}

// Obtener detalles de solicitud de reembolso
export async function getRefundRequestById(id: string) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return null;
        }

        const refundRequest = await prisma.refundRequest.findFirst({
            where: {
                id: id,
                booking: {
                    user: { email: session.user.email }
                }
            },
            include: {
                booking: {
                    include: {
                        flight: true,
                        passengers: true
                    }
                }
            }
        });

        return refundRequest;
    } catch (error) {
        console.error('Error getting refund request:', error);
        return null;
    }
}
