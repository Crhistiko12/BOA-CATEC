'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, X, Send, Loader2, Plane, RefreshCw, Award, HelpCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Message {
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function ChatbotWidget() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            text: '¡Hola! Soy el asistente virtual de BOA 🛫\n\nComandos disponibles:\n📋 /vuelos - Ver tu próximo vuelo\n💰 /reembolso - Información de reembolsos\n🏆 /millas - Consultar tus millas\n❓ /ayuda - Mostrar ayuda\n\n¿En qué puedo ayudarte?',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const processCommand = async (command: string) => {
        const lowerCommand = command.toLowerCase().trim()

        if (!session?.user?.email) {
            return '⚠️ Debes iniciar sesión para usar esta función.'
        }

        try {
            if (lowerCommand === '/vuelos') {
                const response = await fetch(`/api/chatbot-data?action=get_next_flight&email=${session.user.email}`)
                const data = await response.json()

                if (data.success && data.flight) {
                    const flight = data.flight
                    return `✈️ **Tu Próximo Vuelo:**\n\n🛫 Origen: ${flight.origin}\n🛬 Destino: ${flight.destination}\n📅 Fecha: ${new Date(flight.departureTime).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n🕐 Hora: ${new Date(flight.departureTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}\n💺 Asientos: ${flight.seats}`
                }
                return '📭 No tienes vuelos programados.\n\n👉 Visita /flights para buscar vuelos.'
            }

            if (lowerCommand === '/millas') {
                const response = await fetch(`/api/chatbot-data?action=get_miles&email=${session.user.email}`)
                const data = await response.json()

                if (data.success) {
                    const miles = data.miles
                    return `🏆 **Tu Programa de Millas:**\n\n✨ Millas acumuladas: ${miles.total.toLocaleString()}\n🎖️ Categoría: ${miles.category}\n📈 Puntos para siguiente nivel: ${miles.pointsToNext}`
                }
                return '❌ No pude encontrar información de millas.'
            }

            if (lowerCommand === '/reembolso') {
                return `💰 **Políticas de Reembolso BOA:**\n\n🕐 **24 Horas**: Reembolso completo si cancelas dentro de las 24 horas.\n\n💼 **Tarifas Flexibles**: Reembolso con penalidad reducida.\n\n🎫 **Tarifas Promo**: No reembolsables.\n\n👉 Para solicitar reembolso, visita /refunds`
            }

            if (lowerCommand === '/ayuda' || lowerCommand === '/help') {
                return `📋 **Comandos Disponibles:**\n\n/vuelos - Ver próximo vuelo\n/reembolso - Políticas de reembolso\n/millas - Consultar millas\n/ayuda - Mostrar ayuda`
            }

            if (lowerCommand.includes('equipaje')) {
                return `🧳 **Equipaje BOA:**\n\n**Económica:** 1 maleta 23kg + mano 10kg\n**Ejecutiva:** 2 maletas 32kg + mano 10kg`
            }

            if (lowerCommand.includes('mascota')) {
                return `🐾 **Mascotas:**\n\nMáx 8kg en cabina\nCosto: $50 USD\nCertificado de salud requerido`
            }

            if (lowerCommand.match(/^(hola|hi|hello|buenos|buenas)/)) {
                return `¡Hola! 👋 Escribe /ayuda para ver comandos.`
            }

            return `🤔 No entendí. Escribe /ayuda para ver comandos.`

        } catch (error) {
            return '❌ Error al procesar solicitud.'
        }
    }

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return

        const userMessage: Message = {
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        const messageToProcess = inputMessage
        setInputMessage('')
        setIsLoading(true)

        try {
            const response = await processCommand(messageToProcess)
            setMessages(prev => [...prev, {
                text: response,
                sender: 'bot',
                timestamp: new Date()
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                text: '❌ Error. Intenta nuevamente.',
                sender: 'bot',
                timestamp: new Date()
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const quickCommands = [
        { icon: Plane, label: 'Vuelos', command: '/vuelos' },
        { icon: RefreshCw, label: 'Reembolso', command: '/reembolso' },
        { icon: Award, label: 'Millas', command: '/millas' },
        { icon: HelpCircle, label: 'Ayuda', command: '/ayuda' },
    ]

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-[#0052A5] to-blue-600 hover:from-[#003D80] hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 group"
                >
                    <MessageSquare className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-[#0052A5] to-blue-600 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Asistente BOA</h3>
                                <p className="text-white/80 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <X className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    <div className="p-3 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-800 dark:to-transparent border-b border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-4 gap-2">
                            {quickCommands.map((cmd, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setInputMessage(cmd.command)
                                        setTimeout(() => sendMessage(), 100)
                                    }}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors group"
                                    disabled={isLoading}
                                >
                                    <cmd.icon className="h-4 w-4 text-[#0052A5] dark:text-blue-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-[9px] text-gray-600 dark:text-gray-400 text-center leading-tight">{cmd.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-gradient-to-r from-[#0052A5] to-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm'}`}>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-[#0052A5]" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Escribiendo...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe un mensaje o comando..."
                                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 focus:border-[#0052A5] dark:bg-gray-800 dark:text-white"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="bg-gradient-to-r from-[#0052A5] to-blue-600 hover:from-[#003D80] hover:to-blue-700 text-white rounded-xl px-4"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
