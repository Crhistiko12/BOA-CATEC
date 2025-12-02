import { NextResponse } from 'next/server'
import { chatbotService } from '@/services/chatbotService'

export async function POST(request: Request) {
    try {
        const { message, sessionId } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 })
        }

        // Generar un ID de sesión si no existe
        const currentSessionId = sessionId || crypto.randomUUID()

        // El servicio devuelve un array de strings (mensajes del bot)
        const botMessages = await chatbotService.processMessage(currentSessionId, message)

        return NextResponse.json({
            responses: botMessages,
            sessionId: currentSessionId
        })
    } catch (error) {
        console.error('Chat API Error:', error)
        return NextResponse.json(
            { error: 'Error interno del chat' },
            { status: 500 }
        )
    }
}
