module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/services/chatbotService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatbotService",
    ()=>chatbotService
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// URL del servidor Rasa (por defecto localhost:5005)
const RASA_API_URL = process.env.RASA_API_URL || 'http://localhost:5005/webhooks/rest/webhook';
// Respuestas simuladas para cuando Rasa no esté disponible
const FALLBACK_RESPONSES = {
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
        "¡Hagamos tu check-in ahora! He encontrado tu reserva OB-123456.\n\nAsiento asignado: 12F.\n[✅ Confirmar Check-in](#)"
    ],
    default: [
        "Lo siento, no entendí eso. ¿Podrías reformularlo?",
        "Disculpa, no comprendí. Puedo ayudarte con: vuelos, equipaje, reembolsos, check-in, mascotas, facturas, puerta de embarque o cambios de fecha."
    ]
};
function getSimulatedResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
        return FALLBACK_RESPONSES.greet[0];
    }
    if (lowerMessage.includes('adios') || lowerMessage.includes('chao')) {
        return FALLBACK_RESPONSES.goodbye[0];
    }
    if (lowerMessage.includes('vuelo') || lowerMessage.includes('flight') || lowerMessage.includes('estado')) {
        return FALLBACK_RESPONSES.flight_status[0];
    }
    if (lowerMessage.includes('equipaje') || lowerMessage.includes('maleta')) {
        return FALLBACK_RESPONSES.baggage[0];
    }
    if (lowerMessage.includes('reembolso') || lowerMessage.includes('devol')) {
        return FALLBACK_RESPONSES.refund[0];
    }
    if (lowerMessage.includes('ticket') || lowerMessage.includes('boleto') || lowerMessage.includes('pasaje')) {
        return FALLBACK_RESPONSES.ticket[0];
    }
    if (lowerMessage.includes('puerta') || lowerMessage.includes('gate') || lowerMessage.includes('embarque')) {
        return FALLBACK_RESPONSES.gate[0];
    }
    if (lowerMessage.includes('factura') || lowerMessage.includes('nit')) {
        return FALLBACK_RESPONSES.invoice[0];
    }
    if (lowerMessage.includes('cambio') || lowerMessage.includes('fecha') || lowerMessage.includes('reprogramar')) {
        return FALLBACK_RESPONSES.change[0];
    }
    if (lowerMessage.includes('check') || lowerMessage.includes('abordar')) {
        return FALLBACK_RESPONSES.checkin[0];
    }
    return FALLBACK_RESPONSES.default[0];
}
const chatbotService = {
    async processMessage (sessionId, message) {
        try {
            let botMessages = [];
            // Intentar conectar con Rasa
            try {
                const response = await fetch(RASA_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: sessionId,
                        message: message
                    })
                });
                if (response.ok) {
                    const rasaResponses = await response.json();
                    if (rasaResponses.length === 0) {
                        botMessages.push(getSimulatedResponse(message));
                    } else {
                        for (const r of rasaResponses){
                            if (r.text) {
                                botMessages.push(r.text);
                            }
                        }
                    }
                } else {
                    console.log('Rasa server not available, using fallback responses');
                    botMessages.push(getSimulatedResponse(message));
                }
            } catch (fetchError) {
                console.log('Rasa connection error, using fallback responses:', fetchError);
                botMessages.push(getSimulatedResponse(message));
            }
            return botMessages;
        } catch (error) {
            console.error('Chatbot Error:', error);
            return [
                'Lo siento, tengo problemas para procesar tu mensaje en este momento.'
            ];
        }
    }
};
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$chatbotService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/chatbotService.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { message, sessionId } = await request.json();
        if (!message) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Mensaje requerido'
            }, {
                status: 400
            });
        }
        // Generar un ID de sesión si no existe
        const currentSessionId = sessionId || crypto.randomUUID();
        // El servicio devuelve un array de strings (mensajes del bot)
        const botMessages = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$chatbotService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chatbotService"].processMessage(currentSessionId, message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            responses: botMessages,
            sessionId: currentSessionId
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error interno del chat'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da20ba83._.js.map