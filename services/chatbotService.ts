import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// URL del servidor Rasa (por defecto localhost:5005)
const RASA_API_URL = process.env.RASA_API_URL || 'http://localhost:5005/webhooks/rest/webhook'

// Respuestas simuladas para cuando Rasa no esté disponible
const FALLBACK_RESPONSES: Record<string, string[]> = {
    greet: [
        "¡Hola! Soy el asistente virtual de BOA. ¿En qué puedo ayudarte hoy?",
        "¡Bienvenido a BOA! ¿Cómo puedo asistirte?"
    ],
    goodbye: [
        "¡Hasta pronto! Que tengas un excelente vuelo con BOA.",
        "Gracias por contactar a BOA. ¡Buen viaje!"
    ],
    flight_status: [
        "Para consultar el estado de tu vuelo, por favor proporciona tu número de vuelo (ej: OB-760)."
    ],
    baggage: [
        "En BOA, cada pasajero puede llevar:\n- 1 maleta de mano (10kg)\n- 1 equipaje facturado (23kg en económica, 32kg en ejecutiva)\n\n¿Necesitas registrar equipaje especial?"
    ],
    refund: [
        "Para solicitar un reembolso:\n1. Ingresa a tu cuenta en boa.bo\n2. Ve a 'Mis Reservas'\n3. Selecciona 'Solicitar Reembolso'\n\nLos reembolsos se procesan en 7-15 días hábiles."
    ],
    ticket: [
        "Aquí tienes una copia digital de tu boleto para el vuelo OB-760.\n\n[📄 Descargar Boleto PDF](#)",
        "He enviado una copia de tu itinerario a tu correo electrónico registrado."
    ],
    gate: [
        "Tu vuelo OB-760 a Miami sale por la **Puerta 4**.\nEl embarque comienza a las 21:15.",
        "Estado actual: **A TIEMPO**. Puerta: 4."
    ],
    invoice: [
        "Puedes generar tu factura ingresando tu apellido y código de reserva en: boa.bo/facturacion",
        "¿Necesitas factura para el vuelo OB-760? He generado el borrador. Confirma tus datos fiscales."
    ],
    change: [
        "Para cambios de fecha o ruta:\n1. Ve a 'Mis Viajes'\n2. Selecciona 'Cambiar Vuelo'\n3. Elige la nueva fecha\n\nNota: Puede aplicar diferencia tarifaria.",
        "¿Quieres adelantar tu vuelo? Hay espacio disponible en el vuelo de las 18:00. ¿Te interesa?"
    ],
    checkin: [
        "¡Hagamos tu check-in ahora! He encontrado tu reserva OB-123456.\n\nAsiento asignado: 12F.\n[✅ Confirmar Check-in](#)",
    ],
    default: [
        "Lo siento, no entendí eso. ¿Podrías reformularlo?",
        "Disculpa, no comprendí. Puedo ayudarte con: vuelos, equipaje, reembolsos, check-in, mascotas, facturas, puerta de embarque o cambios de fecha."
    ]
}

function getSimulatedResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
        return FALLBACK_RESPONSES.greet[0]
    }
    if (lowerMessage.includes('adios') || lowerMessage.includes('chao')) {
        return FALLBACK_RESPONSES.goodbye[0]
    }
    if (lowerMessage.includes('vuelo') || lowerMessage.includes('flight') || lowerMessage.includes('estado')) {
        return FALLBACK_RESPONSES.flight_status[0]
    }
    if (lowerMessage.includes('equipaje') || lowerMessage.includes('maleta')) {
        return FALLBACK_RESPONSES.baggage[0]
    }
    if (lowerMessage.includes('reembolso') || lowerMessage.includes('devol')) {
        return FALLBACK_RESPONSES.refund[0]
    }
    if (lowerMessage.includes('ticket') || lowerMessage.includes('boleto') || lowerMessage.includes('pasaje')) {
        return FALLBACK_RESPONSES.ticket[0]
    }
    if (lowerMessage.includes('puerta') || lowerMessage.includes('gate') || lowerMessage.includes('embarque')) {
        return FALLBACK_RESPONSES.gate[0]
    }
    if (lowerMessage.includes('factura') || lowerMessage.includes('nit')) {
        return FALLBACK_RESPONSES.invoice[0]
    }
    if (lowerMessage.includes('cambio') || lowerMessage.includes('fecha') || lowerMessage.includes('reprogramar')) {
        return FALLBACK_RESPONSES.change[0]
    }
    if (lowerMessage.includes('check') || lowerMessage.includes('abordar')) {
        return FALLBACK_RESPONSES.checkin[0]
    }

    return FALLBACK_RESPONSES.default[0]
}

export const chatbotService = {
    async processMessage(sessionId: string, message: string) {
        try {
            let botMessages: string[] = []

            // Intentar conectar con Rasa
            try {
                const response = await fetch(RASA_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sender: sessionId,
                        message: message,
                    }),
                })

                if (response.ok) {
                    const rasaResponses = await response.json()

                    if (rasaResponses.length === 0) {
                        botMessages.push(getSimulatedResponse(message))
                    } else {
                        for (const r of rasaResponses) {
                            if (r.text) {
                                botMessages.push(r.text)
                            }
                        }
                    }
                } else {
                    console.log('Rasa server not available, using fallback responses')
                    botMessages.push(getSimulatedResponse(message))
                }
            } catch (fetchError) {
                console.log('Rasa connection error, using fallback responses:', fetchError)
                botMessages.push(getSimulatedResponse(message))
            }

            return botMessages

        } catch (error) {
            console.error('Chatbot Error:', error)
            return ['Lo siento, tengo problemas para procesar tu mensaje en este momento.']
        }
    }
}
