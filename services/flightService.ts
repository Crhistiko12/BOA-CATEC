import db from '@/lib/db'

export const flightService = {
    async searchFlights(params: {
        origin: string
        destination: string
        date: string
        passengers: number
    }) {
        // En un escenario real, esto consultaría la base de datos con filtros complejos
        // Por ahora, simularemos o haremos una consulta básica
        const { origin, destination, date } = params

        // Convertir fecha string a objeto Date para rango (inicio y fin del día)
        const startDate = new Date(date)
        const endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)

        try {
            const flights = await db.flight.findMany({
                where: {
                    origin: {
                        contains: origin,
                        mode: 'insensitive',
                    },
                    destination: {
                        contains: destination,
                        mode: 'insensitive',
                    },
                    departureTime: {
                        gte: startDate,
                        lt: endDate,
                    },
                    capacity: {
                        gte: params.passengers
                    }
                },
                orderBy: {
                    price: 'asc'
                }
            })
            return flights
        } catch (error) {
            console.error('Error searching flights:', error)
            return []
        }
    },

    async getFlightById(id: string) {
        return await db.flight.findUnique({
            where: { id }
        })
    }
}
