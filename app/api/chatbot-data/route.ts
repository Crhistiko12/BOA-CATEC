import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const action = searchParams.get('action')
        const email = searchParams.get('email')
        const bookingId = searchParams.get('booking_id')

        switch (action) {
            case 'get_next_flight': {
                if (!email) {
                    return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 })
                }

                const booking = await prisma.booking.findFirst({
                    where: {
                        user: { email },
                        flight: {
                            departureTime: {
                                gte: new Date()
                            }
                        }
                    },
                    include: {
                        flight: true
                    },
                    orderBy: {
                        flight: {
                            departureTime: 'asc'
                        }
                    }
                })

                if (booking) {
                    return NextResponse.json({
                        success: true,
                        flight: {
                            origin: booking.flight.origin,
                            destination: booking.flight.destination,
                            departureTime: booking.flight.departureTime.toISOString(),
                            seats: booking.seats
                        }
                    })
                }

                return NextResponse.json({ success: false, message: 'No upcoming flights' })
            }

            case 'verify_booking': {
                if (!bookingId) {
                    return NextResponse.json({ success: false, error: 'Booking ID required' }, { status: 400 })
                }

                const booking = await prisma.booking.findUnique({
                    where: { id: bookingId },
                    include: {
                        flight: true,
                        user: true
                    }
                })

                if (booking) {
                    return NextResponse.json({
                        success: true,
                        booking: {
                            id: booking.id,
                            flight: {
                                origin: booking.flight.origin,
                                destination: booking.flight.destination,
                                departureTime: booking.flight.departureTime.toISOString()
                            },
                            seats: booking.seats,
                            totalPrice: booking.totalPrice
                        }
                    })
                }

                return NextResponse.json({ success: false, message: 'Booking not found' })
            }

            case 'get_miles': {
                if (!email) {
                    return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 })
                }

                // Mock miles data - you can replace this with actual database query
                return NextResponse.json({
                    success: true,
                    miles: {
                        total: 12450,
                        category: 'Plata',
                        pointsToNext: 345
                    }
                })
            }

            default:
                return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
        }
    } catch (error) {
        console.error('Chatbot data API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, booking_id, email } = body

        switch (action) {
            case 'check_refund_eligibility': {
                if (!booking_id) {
                    return NextResponse.json({ success: false, error: 'Booking ID required' }, { status: 400 })
                }

                const booking = await prisma.booking.findUnique({
                    where: { id: booking_id },
                    include: {
                        flight: true
                    }
                })

                if (!booking) {
                    return NextResponse.json({ success: false, message: 'Booking not found' })
                }

                // Check if booking is within 24 hours of purchase
                const purchaseDate = booking.createdAt
                const now = new Date()
                const hoursSincePurchase = (now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60)

                let eligible = false
                let policy = ''
                let reason = ''
                let amount = 0

                if (hoursSincePurchase <= 24) {
                    eligible = true
                    policy = '24 Horas - Reembolso Completo'
                    amount = booking.totalPrice
                } else {
                    // Check flight date
                    const daysUntilFlight = (booking.flight.departureTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)

                    if (daysUntilFlight > 7) {
                        eligible = true
                        policy = 'Tarifa Flexible - Penalidad 20%'
                        amount = booking.totalPrice * 0.8
                    } else {
                        eligible = false
                        reason = 'El vuelo está muy próximo (menos de 7 días). Las tarifas promocionales no son reembolsables.'
                    }
                }

                return NextResponse.json({
                    success: true,
                    eligibility: {
                        eligible,
                        policy,
                        amount,
                        reason
                    }
                })
            }

            default:
                return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
        }
    } catch (error) {
        console.error('Chatbot data POST API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
