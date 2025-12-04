'use server'

import { getUserNextFlight } from '@/lib/db-actions';
import { auth } from '@/lib/auth';

export async function processChat(message: string) {
    const session = await auth();
    const lowerMsg = message.toLowerCase();

    // 1. Flight Status
    if (lowerMsg.includes('status') || lowerMsg.includes('estado') || lowerMsg.includes('flight') || lowerMsg.includes('vuelo')) {
        if (!session?.user?.email) {
            return ["Please log in to check your flight status.", "Por favor inicia sesión para ver el estado de tu vuelo."];
        }

        const nextFlight: any = await getUserNextFlight(session.user.email);
        if (nextFlight) {
            return [
                `Your next flight ${nextFlight.flight.flightNumber} from ${nextFlight.flight.origin} to ${nextFlight.flight.destination} is scheduled for ${new Date(nextFlight.flight.departureTime).toLocaleString()}. Status: ${nextFlight.flight.status}.`,
                `Tu próximo vuelo ${nextFlight.flight.flightNumber} de ${nextFlight.flight.origin} a ${nextFlight.flight.destination} está programado para el ${new Date(nextFlight.flight.departureTime).toLocaleString()}. Estado: ${nextFlight.flight.status}.`
            ];
        } else {
            return ["You don't have any upcoming flights.", "No tienes vuelos próximos."];
        }
    }

    // 2. Baggage
    if (lowerMsg.includes('baggage') || lowerMsg.includes('equipaje') || lowerMsg.includes('maleta')) {
        return [
            "You are allowed 1 carry-on (10kg) and 1 checked bag (23kg) for Economy class.",
            "Tienes permitido 1 equipaje de mano (10kg) y 1 maleta facturada (23kg) en clase Económica."
        ];
    }

    // 3. Refund
    if (lowerMsg.includes('refund') || lowerMsg.includes('reembolso') || lowerMsg.includes('cancel')) {
        return [
            "To request a refund, please go to 'Manage Booking' in your dashboard or visit the Refunds page.",
            "Para solicitar un reembolso, ve a 'Gestionar Reserva' en tu panel o visita la página de Reembolsos."
        ];
    }

    // Default
    return [
        "I can help you with flight status, baggage info, and refunds. How can I assist you?",
        "Puedo ayudarte con el estado de vuelos, equipaje y reembolsos. ¿En qué puedo ayudarte?"
    ];
}
