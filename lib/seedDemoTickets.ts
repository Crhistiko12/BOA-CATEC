// Seed data for demo tickets
import { ticketStorage, type Ticket } from './ticketStorage'

export function seedDemoTickets(userEmail: string) {
    // Only seed for demo user
    if (userEmail !== 'diego.test@boa.bo') return

    // Check if already seeded
    const existing = ticketStorage.getAll()
    if (existing.length > 0) return

    // Demo tickets based on the images
    const demoTickets = [
        {
            subject: 'Equipaje demorado - Vuelo OB-760',
            category: 'equipaje',
            description: 'Mi equipaje no llegó en el vuelo OB-760 desde Miami. El vuelo aterrizó hace 3 horas pero mi maleta no apareció en la banda transportadora. Tengo el ticket de equipaje #BOA123456. La maleta es de color negro con una etiqueta roja. Necesito que me ayuden a localizarla lo antes posible ya que contiene medicamentos importantes.',
            priority: 'urgent',
            flightNumber: 'OB-760'
        },
        {
            subject: 'Solicitud de cambio de fecha',
            category: 'vuelo',
            description: 'Necesito cambiar la fecha de mi vuelo de La Paz a Santa Cruz. Reserva #BOA-2025-001. Fecha actual: 15 de diciembre. Nueva fecha solicitada: 20 de diciembre. Motivo: reunión de trabajo reprogramada. ¿Cuál sería el costo del cambio? Agradezco su pronta respuesta.',
            priority: 'normal',
            flightNumber: 'OB-654'
        },
        {
            subject: 'Consulta sobre millas',
            category: 'millas',
            description: 'Tengo una consulta sobre el programa de millas BOA Plus. Realicé un vuelo internacional a Madrid el mes pasado (vuelo OB-920) pero las millas aún no se reflejan en mi cuenta. El vuelo fue el 15 de noviembre y según el programa deberían acreditarse en 48 horas. Mi número de socio es 123456789. ¿Podrían verificar el estado de estas millas?',
            priority: 'low',
            flightNumber: 'OB-920'
        }
    ]

    // Create tickets with specific statuses
    const statuses: Array<Ticket['status']> = ['En Proceso', 'Resuelto', 'Cerrado']

    demoTickets.forEach((ticketData, index) => {
        const ticket = ticketStorage.save(ticketData)
        // Update status
        ticketStorage.update(ticket.id, { status: statuses[index] })
    })
}
