import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create test user
    const user = await prisma.user.upsert({
        where: { email: 'diego.test@boa.bo' },
        update: {},
        create: {
            email: 'diego.test@boa.bo',
            password: 'password123', // Plain text for demo - in production use bcrypt
            name: 'Diego Programador',
            role: 'USER',
        },
    })

    console.log('✅ Created user:', user.email)

    // Create flights
    const flight1 = await prisma.flight.upsert({
        where: { flightNumber: 'OB-760' },
        update: {},
        create: {
            flightNumber: 'OB-760',
            origin: 'Santa Cruz (VVI)',
            destination: 'Miami (MIA)',
            departureTime: new Date('2025-12-15T22:00:00'),
            arrivalTime: new Date('2025-12-16T06:30:00'),
            price: 450.00,
            capacity: 180,
        },
    })

    const flight2 = await prisma.flight.upsert({
        where: { flightNumber: 'OB-123' },
        update: {},
        create: {
            flightNumber: 'OB-123',
            origin: 'La Paz (LPB)',
            destination: 'Buenos Aires (EZE)',
            departureTime: new Date('2025-12-20T14:00:00'),
            arrivalTime: new Date('2025-12-20T18:00:00'),
            price: 320.00,
            capacity: 150,
        },
    })

    console.log('✅ Created flights:', flight1.flightNumber, flight2.flightNumber)

    // Create booking with complete data
    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            flightId: flight1.id,
            status: 'CONFIRMED',
            totalPrice: 450.00,
            passengers: {
                create: [
                    {
                        firstName: 'Diego',
                        lastName: 'Programador',
                        type: 'ADULT',
                        seatNumber: '12F',
                    },
                ],
            },
            baggage: {
                create: [
                    {
                        weight: 20,
                        dimensions: '60x40x30',
                        special: false,
                        description: 'Maleta estándar',
                        status: 'REGISTERED',
                        trackingCode: 'BOA-VVI-MIA-001',
                    },
                ],
            },
            payment: {
                create: {
                    stripeId: 'pi_test_123456789',
                    amount: 450.00,
                    status: 'succeeded',
                },
            },
        },
    })

    console.log('✅ Created booking:', booking.id)

    // Create a second booking for "Mis Viajes"
    const booking2 = await prisma.booking.create({
        data: {
            userId: user.id,
            flightId: flight2.id,
            status: 'CONFIRMED',
            totalPrice: 320.00,
            passengers: {
                create: [
                    {
                        firstName: 'Diego',
                        lastName: 'Programador',
                        type: 'ADULT',
                        seatNumber: '8A',
                    },
                ],
            },
            baggage: {
                create: [
                    {
                        weight: 15,
                        dimensions: '55x35x25',
                        special: false,
                        description: 'Equipaje de mano',
                        status: 'REGISTERED',
                        trackingCode: 'BOA-LPB-EZE-002',
                    },
                ],
            },
            payment: {
                create: {
                    stripeId: 'pi_test_987654321',
                    amount: 320.00,
                    status: 'succeeded',
                },
            },
        },
    })

    console.log('✅ Created second booking:', booking2.id)

    console.log('\n🎉 Seed completed successfully!')
    console.log('\n📧 Test User Credentials:')
    console.log('   Email: diego.test@boa.bo')
    console.log('   Password: password123')
    console.log('\n✈️ User has 2 confirmed bookings:')
    console.log('   1. OB-760: Santa Cruz → Miami (Dec 15)')
    console.log('   2. OB-123: La Paz → Buenos Aires (Dec 20)')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Error seeding database:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
