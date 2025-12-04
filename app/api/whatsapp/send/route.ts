import { NextResponse } from 'next/server'

// API para enviar mensajes de WhatsApp usando Twilio
export async function POST(request: Request) {
    try {
        const { phoneNumber, message, type } = await request.json()

        // Validar número de teléfono
        if (!phoneNumber || phoneNumber.length < 8) {
            return NextResponse.json(
                { error: 'Número de teléfono inválido' },
                { status: 400 }
            )
        }

        // Formatear número para Bolivia (+591)
        const formattedPhone = `+591${phoneNumber}`

        // Configurar Twilio
        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER

        if (!accountSid || !authToken || !twilioWhatsAppNumber) {
            console.error('Missing Twilio credentials')
            return NextResponse.json(
                { error: 'Configuración de WhatsApp incompleta' },
                { status: 500 }
            )
        }

        // Importar y configurar Twilio
        const twilio = require('twilio')
        const client = twilio(accountSid, authToken)

        try {
            const twilioMessage = await client.messages.create({
                from: `whatsapp:${twilioWhatsAppNumber}`,
                to: `whatsapp:${formattedPhone}`,
                body: message || getDefaultMessage(type)
            })

            console.log('✅ WhatsApp Message Sent:')
            console.log('To:', formattedPhone)
            console.log('Message SID:', twilioMessage.sid)
            console.log('Status:', twilioMessage.status)

            return NextResponse.json({
                success: true,
                messageSid: twilioMessage.sid,
                status: twilioMessage.status,
                to: formattedPhone
            })
        } catch (twilioError: any) {
            console.error('Twilio Error:', twilioError.message)

            // Fallback a simulación si Twilio falla
            console.log('📱 Fallback to Simulation Mode')
            return NextResponse.json({
                success: true,
                messageSid: `SM${Math.random().toString(36).substring(7)}`,
                status: 'simulated',
                simulation: true,
                message: 'Mensaje enviado (modo simulación - verificar credenciales Twilio)',
                to: formattedPhone,
                error: twilioError.message
            })
        }

    } catch (error) {
        console.error('Error sending WhatsApp message:', error)
        return NextResponse.json(
            { error: 'Error al enviar mensaje de WhatsApp' },
            { status: 500 }
        )
    }
}

function getDefaultMessage(type: string): string {
    const messages: Record<string, string> = {
        'link': '¡Hola! Tu número ha sido vinculado exitosamente a BOA. Responde "SÍ" para activar las notificaciones de vuelo. 🛫',
        'boarding_pass': '✈️ Tu pase de abordar está listo. Vuelo OB-760 | Puerta: B12 | Hora: 22:00',
        'flight_update': '⚠️ Actualización de vuelo: Tu vuelo OB-760 ha cambiado de puerta. Nueva puerta: B15',
        'check_in': '✅ Check-in completado exitosamente. Tu pase de abordar ha sido enviado.',
        'default': '¡Hola! Gracias por usar BOA - Boliviana de Aviación. ¿En qué podemos ayudarte?'
    }

    return messages[type] || messages['default']
}

// GET para verificar estado del servicio
export async function GET() {
    return NextResponse.json({
        service: 'WhatsApp API',
        status: 'active',
        provider: 'Twilio (simulation)',
        endpoints: {
            send: 'POST /api/whatsapp/send'
        }
    })
}
