import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean DB
  try {
    await prisma.supportTicket.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.passenger.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.refundRequest.deleteMany();
    await prisma.baggage.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.flight.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    console.log('⚠️ Error cleaning DB (might be empty):', e);
  }

  // 2. Create Users
  const password = await hash('password123', 12);
  const adminPassword = await hash('admin123', 12);

  const user = await prisma.user.create({
    data: {
      email: 'test@demo.com',
      name: 'Diego Demo',
      password,
      role: 'USER',
    },
  });
  console.log('👤 User created:', user.email);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@boa.bo',
      name: 'Admin BOA',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('👨‍💼 Admin created:', admin.email);

  // 3. Create Destinations
  const destinations = [
    // Destinos Nacionales - 9 Departamentos de Bolivia
    { code: 'LPB', name: 'La Paz', country: 'Bolivia', description: 'La ciudad maravilla situada a más de 3,600 metros de altura', imageUrl: 'https://images.unsplash.com/photo-1588611910602-0941e7c536e4?q=80&w=1000&auto=format&fit=crop', popular: true },
    { code: 'VVI', name: 'Santa Cruz', country: 'Bolivia', description: 'Tierra de oportunidades y centro económico de Bolivia', imageUrl: 'https://images.unsplash.com/photo-1598396006622-446757530699?q=80&w=1000&auto=format&fit=crop', popular: true },
    { code: 'CBB', name: 'Cochabamba', country: 'Bolivia', description: 'Corazón gastronómico y ciudad de la eterna primavera', imageUrl: 'https://images.unsplash.com/photo-1569388330292-7a6a84176db9?q=80&w=1000&auto=format&fit=crop', popular: true },
    { code: 'TJA', name: 'Tarija', country: 'Bolivia', description: 'Valle de vinos y tradiciones', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'SRE', name: 'Sucre', country: 'Bolivia', description: 'Capital constitucional y ciudad blanca', imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'POI', name: 'Potosí', country: 'Bolivia', description: 'Ciudad imperial con historia minera', imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'ORU', name: 'Oruro', country: 'Bolivia', description: 'Capital del folklore boliviano', imageUrl: 'https://images.unsplash.com/photo-1533094602577-198d3beab8ea?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'TDD', name: 'Trinidad', country: 'Bolivia', description: 'Puerta de la Amazonía boliviana', imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'CIJ', name: 'Cobija', country: 'Bolivia', description: 'Perla de la Amazonía en Pando', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop', popular: false },

    // Destinos Internacionales
    { code: 'MIA', name: 'Miami', country: 'USA', description: 'Playas paradisíacas y destino de compras', imageUrl: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1000&auto=format&fit=crop', popular: true },
    { code: 'MAD', name: 'Madrid', country: 'España', description: 'Puerta de Europa con historia y cultura', imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop', popular: true },
    { code: 'EZE', name: 'Buenos Aires', country: 'Argentina', description: 'París de Sudamérica', imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'LIM', name: 'Lima', country: 'Perú', description: 'Capital gastronómica de América', imageUrl: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?q=80&w=1000&auto=format&fit=crop', popular: false },
    { code: 'SCL', name: 'Santiago', country: 'Chile', description: 'Moderna ciudad rodeada de montañas', imageUrl: 'https://images.unsplash.com/photo-1555365634-c8f9c4aae1b5?q=80&w=1000&auto=format&fit=crop', popular: false },
  ];


  for (const dest of destinations) {
    await prisma.destination.create({ data: dest });
  }
  console.log('🌍 Destinations created');

  // 4. Create Flights (Minimum 6 available)
  const today = new Date();

  // Helper function to create date with specific time
  const createDate = (daysFromNow: number, hours: number, minutes: number = 0) => {
    const date = new Date(today);
    date.setDate(date.getDate() + daysFromNow);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const flights = [
    // Vuelos Nacionales
    {
      flightNumber: 'OB-101',
      origin: 'LPB',
      destination: 'VVI',
      departureTime: createDate(1, 8, 30),
      arrivalTime: createDate(1, 9, 30),
      price: 85.00,
      capacity: 150,
      availableSeats: 120,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-102',
      origin: 'VVI',
      destination: 'LPB',
      departureTime: createDate(1, 14, 0),
      arrivalTime: createDate(1, 15, 0),
      price: 85.00,
      capacity: 150,
      availableSeats: 95,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-201',
      origin: 'LPB',
      destination: 'CBB',
      departureTime: createDate(2, 10, 0),
      arrivalTime: createDate(2, 10, 45),
      price: 65.00,
      capacity: 120,
      availableSeats: 80,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-202',
      origin: 'CBB',
      destination: 'VVI',
      departureTime: createDate(2, 16, 30),
      arrivalTime: createDate(2, 17, 15),
      price: 70.00,
      capacity: 120,
      availableSeats: 100,
      status: 'SCHEDULED',
    },

    // Vuelos adicionales nacionales - Completar 9 departamentos
    {
      flightNumber: 'OB-203',
      origin: 'TJA',
      destination: 'VVI',
      departureTime: createDate(3, 7, 0),
      arrivalTime: createDate(3, 8, 15),
      price: 95.00,
      capacity: 100,
      availableSeats: 75,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-204',
      origin: 'SRE',
      destination: 'LPB',
      departureTime: createDate(3, 12, 0),
      arrivalTime: createDate(3, 13, 0),
      price: 75.00,
      capacity: 100,
      availableSeats: 80,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-205',
      origin: 'POI',
      destination: 'CBB',
      departureTime: createDate(4, 9, 30),
      arrivalTime: createDate(4, 10, 45),
      price: 80.00,
      capacity: 90,
      availableSeats: 70,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-206',
      origin: 'ORU',
      destination: 'LPB',
      departureTime: createDate(4, 15, 0),
      arrivalTime: createDate(4, 16, 0),
      price: 60.00,
      capacity: 100,
      availableSeats: 85,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-207',
      origin: 'TDD',
      destination: 'VVI',
      departureTime: createDate(5, 10, 30),
      arrivalTime: createDate(5, 11, 30),
      price: 110.00,
      capacity: 80,
      availableSeats: 60,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-208',
      origin: 'CIJ',
      destination: 'LPB',
      departureTime: createDate(5, 13, 0),
      arrivalTime: createDate(5, 15, 30),
      price: 150.00,
      capacity: 70,
      availableSeats: 50,
      status: 'SCHEDULED',
    },

    // Vuelos Internacionales
    {
      flightNumber: 'OB-760',
      origin: 'VVI',
      destination: 'MIA',
      departureTime: createDate(5, 22, 0),
      arrivalTime: createDate(6, 5, 0),
      price: 450.00,
      capacity: 200,
      availableSeats: 150,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-761',
      origin: 'MIA',
      destination: 'VVI',
      departureTime: createDate(12, 23, 30),
      arrivalTime: createDate(13, 6, 30),
      price: 420.00,
      capacity: 200,
      availableSeats: 180,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-800',
      origin: 'LPB',
      destination: 'MAD',
      departureTime: createDate(7, 20, 0),
      arrivalTime: createDate(8, 13, 0),
      price: 850.00,
      capacity: 280,
      availableSeats: 220,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-801',
      origin: 'MAD',
      destination: 'LPB',
      departureTime: createDate(14, 18, 0),
      arrivalTime: createDate(15, 7, 0),
      price: 820.00,
      capacity: 280,
      availableSeats: 200,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-300',
      origin: 'LPB',
      destination: 'EZE',
      departureTime: createDate(3, 11, 0),
      arrivalTime: createDate(3, 14, 30),
      price: 280.00,
      capacity: 180,
      availableSeats: 140,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-400',
      origin: 'VVI',
      destination: 'LIM',
      departureTime: createDate(4, 9, 0),
      arrivalTime: createDate(4, 11, 30),
      price: 220.00,
      capacity: 160,
      availableSeats: 130,
      status: 'SCHEDULED',
    },
    {
      flightNumber: 'OB-500',
      origin: 'LPB',
      destination: 'SCL',
      departureTime: createDate(6, 8, 0),
      arrivalTime: createDate(6, 11, 0),
      price: 240.00,
      capacity: 160,
      availableSeats: 120,
      status: 'SCHEDULED',
    },

    // Vuelo pasado para historial
    {
      flightNumber: 'OB-555',
      origin: 'VVI',
      destination: 'LPB',
      departureTime: createDate(-30, 14, 0),
      arrivalTime: createDate(-30, 15, 0),
      price: 75.00,
      capacity: 150,
      availableSeats: 0,
      status: 'LANDED',
    },
  ];

  for (const f of flights) {
    // @ts-ignore
    await prisma.flight.create({ data: f });
  }
  console.log(`✈️ ${flights.length} Flights created`);

  // 5. Create Past Booking (History)
  const pastFlight = await prisma.flight.findUnique({ where: { flightNumber: 'OB-555' } });
  if (pastFlight) {
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        flightId: pastFlight.id,
        status: 'COMPLETED',
        totalPrice: 75.00,
      }
    });

    const passenger = await prisma.passenger.create({
      data: {
        bookingId: booking.id,
        firstName: 'Diego',
        lastName: 'Demo',
        type: 'ADULT',
        seatNumber: '12A'
      }
    });

    await prisma.ticket.create({
      data: {
        bookingId: booking.id,
        passengerId: passenger.id,
        ticketNumber: '9300000001',
        seatNumber: '12A',
        class: 'ECONOMY',
        status: 'USED',
      }
    });
    console.log('📜 Past booking created');
  }

  console.log('✅ Seed finished successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('   User: test@demo.com / password123');
  console.log('   Admin: admin@boa.bo / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
