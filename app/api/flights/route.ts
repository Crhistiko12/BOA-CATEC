import { NextResponse } from 'next/server'
import { flightService } from '@/services/flightService'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const date = searchParams.get('date')
    const passengers = searchParams.get('passengers')

    if (!origin || !destination || !date) {
        return NextResponse.json(
            { error: 'Faltan parámetros de búsqueda requeridos' },
            { status: 400 }
        )
    }

    try {
        const flights = await flightService.searchFlights({
            origin,
            destination,
            date,
            passengers: passengers ? parseInt(passengers) : 1
        })

        return NextResponse.json(flights)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
