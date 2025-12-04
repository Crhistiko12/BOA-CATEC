import { NextRequest, NextResponse } from 'next/server'

const RASA_URL = process.env.RASA_URL || 'http://localhost:5005'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { message, sender = 'user' } = body

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        // Forward message to Rasa
        const response = await fetch(`${RASA_URL}/webhooks/rest/webhook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender,
                message,
            }),
        })

        if (!response.ok) {
            throw new Error('Rasa server error')
        }

        const data = await response.json()

        return NextResponse.json({
            success: true,
            messages: data,
        })
    } catch (error) {
        console.error('Chatbot API error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to communicate with chatbot',
                messages: [{
                    text: 'Lo siento, el servicio de chat no está disponible en este momento. Por favor, intenta más tarde o contacta a soporte.'
                }]
            },
            { status: 500 }
        )
    }
}
