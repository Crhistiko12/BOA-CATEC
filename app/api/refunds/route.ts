import { NextResponse } from 'next/server'
import { refundService } from '@/services/refundService'
import { z } from 'zod'

const refundSchema = z.object({
    bookingId: z.string().uuid(),
    reason: z.string().min(10),
    amount: z.number().positive()
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = refundSchema.parse(body)

        const refund = await refundService.createRefundRequest(validatedData)

        return NextResponse.json(refund, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        return NextResponse.json(
            { error: 'Error al procesar la solicitud de reembolso' },
            { status: 500 }
        )
    }
}
