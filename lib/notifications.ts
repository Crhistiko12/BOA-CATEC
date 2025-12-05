'use server'

// Funciones de notificación para Email (Resend) y WhatsApp (Twilio)

// Enviar confirmación de check-in por email
export async function sendCheckInEmail(data: {
    email: string;
    name: string;
    bookingCode: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    seatNumber: string;
}) {
    try {
        // Verificar si Resend está configurado
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured');
            return { success: false, error: 'Email service not configured' };
        }

        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0033A0 0%, #0052A5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .flight-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC72C; }
            .info-row { display: flex; justify-content: space-between; margin: 10px 0; }
            .label { font-weight: bold; color: #0033A0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✈️ Check-in Confirmado</h1>
              <p>Boliviana de Aviación</p>
            </div>
            <div class="content">
              <h2>Hola ${data.name},</h2>
              <p>Tu check-in ha sido realizado exitosamente. Aquí están los detalles de tu vuelo:</p>
              
              <div class="flight-info">
                <div class="info-row">
                  <span class="label">Código de Reserva:</span>
                  <span>${data.bookingCode}</span>
                </div>
                <div class="info-row">
                  <span class="label">Número de Vuelo:</span>
                  <span>${data.flightNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Ruta:</span>
                  <span>${data.origin} → ${data.destination}</span>
                </div>
                <div class="info-row">
                  <span class="label">Fecha y Hora:</span>
                  <span>${new Date(data.departureTime).toLocaleString('es-BO')}</span>
                </div>
                <div class="info-row">
                  <span class="label">Asiento:</span>
                  <span><strong>${data.seatNumber}</strong></span>
                </div>
              </div>

              <p><strong>Importante:</strong></p>
              <ul>
                <li>Llega al aeropuerto al menos 2 horas antes del vuelo</li>
                <li>Presenta tu documento de identidad en el mostrador</li>
                <li>Revisa las restricciones de equipaje</li>
              </ul>

              <p>¡Buen viaje!</p>
            </div>
            <div class="footer">
              <p>Boliviana de Aviación - BOA</p>
              <p>Este es un correo automático, por favor no responder.</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const result = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: data.email,
            subject: `✈️ Check-in Confirmado - Vuelo ${data.flightNumber}`,
            html: emailHtml
        });

        return { success: true, messageId: result.data?.id };
    } catch (error: any) {
        console.error('Error sending check-in email:', error);
        return { success: false, error: error.message };
    }
}

// Enviar confirmación de check-in por WhatsApp
export async function sendCheckInWhatsApp(data: {
    phone: string;
    name: string;
    bookingCode: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    seatNumber: string;
}) {
    try {
        // Verificar si Twilio está configurado
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.warn('Twilio credentials not configured');
            return { success: false, error: 'WhatsApp service not configured' };
        }

        const twilio = await import('twilio');
        const client = twilio.default(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        const message = `
✈️ *BOA - Check-in Confirmado*

Hola ${data.name},

Tu check-in ha sido realizado exitosamente.

*Detalles del Vuelo:*
📋 Código: ${data.bookingCode}
✈️ Vuelo: ${data.flightNumber}
🛫 Ruta: ${data.origin} → ${data.destination}
📅 Fecha: ${new Date(data.departureTime).toLocaleString('es-BO')}
💺 Asiento: *${data.seatNumber}*

⚠️ *Importante:*
• Llega 2 horas antes
• Presenta tu documento de identidad
• Revisa restricciones de equipaje

¡Buen viaje con BOA! 🇧🇴
    `.trim();

        const result = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
            to: `whatsapp:${data.phone}`,
            body: message
        });

        return { success: true, messageSid: result.sid };
    } catch (error: any) {
        console.error('Error sending WhatsApp message:', error);
        return { success: false, error: error.message };
    }
}

// Enviar confirmación de reserva por email
export async function sendBookingConfirmationEmail(data: {
    email: string;
    name: string;
    bookingCode: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    totalPrice: number;
    passengers: number;
}) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured');
            return { success: false, error: 'Email service not configured' };
        }

        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0033A0 0%, #0052A5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC72C; }
            .info-row { display: flex; justify-content: space-between; margin: 10px 0; }
            .label { font-weight: bold; color: #0033A0; }
            .total { background: #FFC72C; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Reserva Confirmada</h1>
              <p>Boliviana de Aviación</p>
            </div>
            <div class="content">
              <h2>¡Gracias por tu compra, ${data.name}!</h2>
              <p>Tu reserva ha sido confirmada exitosamente.</p>
              
              <div class="booking-info">
                <div class="info-row">
                  <span class="label">Código de Reserva:</span>
                  <span><strong>${data.bookingCode}</strong></span>
                </div>
                <div class="info-row">
                  <span class="label">Número de Vuelo:</span>
                  <span>${data.flightNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Ruta:</span>
                  <span>${data.origin} → ${data.destination}</span>
                </div>
                <div class="info-row">
                  <span class="label">Fecha y Hora:</span>
                  <span>${new Date(data.departureTime).toLocaleString('es-BO')}</span>
                </div>
                <div class="info-row">
                  <span class="label">Pasajeros:</span>
                  <span>${data.passengers}</span>
                </div>
              </div>

              <div class="total">
                <h3 style="margin: 0;">Total Pagado: Bs ${data.totalPrice.toFixed(2)}</h3>
              </div>

              <p><strong>Próximos pasos:</strong></p>
              <ol>
                <li>Guarda tu código de reserva: <strong>${data.bookingCode}</strong></li>
                <li>Realiza el check-in 24 horas antes del vuelo</li>
                <li>Llega al aeropuerto 2 horas antes</li>
              </ol>

              <p>¡Nos vemos a bordo!</p>
            </div>
            <div class="footer">
              <p>Boliviana de Aviación - BOA</p>
              <p>Este es un correo automático, por favor no responder.</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const result = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: data.email,
            subject: `🎉 Reserva Confirmada - Vuelo ${data.flightNumber}`,
            html: emailHtml
        });

        return { success: true, messageId: result.data?.id };
    } catch (error: any) {
        console.error('Error sending booking confirmation email:', error);
        return { success: false, error: error.message };
    }
}
