import db from '@/lib/db'

export const refundService = {
    async createRefundRequest(data: {
        bookingId: string
        reason: string
        amount: number
    }) {
        // 1. Verificar si la reserva existe y es elegible
        const booking = await db.booking.findUnique({
            where: { id: data.bookingId },
            include: { payment: true }
        })

        if (!booking) {
            throw new Error('Reserva no encontrada')
        }

        if (booking.status === 'CANCELLED') {
            throw new Error('La reserva ya está cancelada')
        }

        // 2. Crear la solicitud de reembolso
        const refund = await db.refundRequest.create({
            data: {
                bookingId: data.bookingId,
                reason: data.reason,
                amount: data.amount, // Debería calcularse basado en políticas
                status: 'PENDING'
            }
        })

        // 3. Actualizar estado de reserva (opcional, depende de la lógica de negocio)
        // await db.booking.update({
        //   where: { id: data.bookingId },
        //   data: { status: 'CANCELLED' }
        // })

        return refund
    },

    async processRefund(refundId: string, approved: boolean, adminComment?: string) {
        const status = approved ? 'APPROVED' : 'REJECTED'

        const refund = await db.refundRequest.update({
            where: { id: refundId },
            data: {
                status,
                adminComment,
                updatedAt: new Date()
            }
        })

        if (approved) {
            // TODO: Trigger Stripe refund here
            // await stripeService.refund(booking.payment.stripeId)
        }

        return refund
    }
}
