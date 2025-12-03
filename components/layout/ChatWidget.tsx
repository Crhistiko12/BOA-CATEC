'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
    text: string
    sender: 'user' | 'bot'
}

const SUGGESTED_QUESTIONS = [
    "¿Cuál es el estado de mi vuelo?",
    "Información sobre equipaje",
    "¿Cómo solicito un reembolso?",
    "¿Puedo viajar con mi mascota?",
    "Destinos disponibles"
]

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { text: '¡Hola! Soy el asistente virtual de BOA. ¿En qué puedo ayudarte?', sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Efecto para manejar inactividad
    useEffect(() => {
        if (!isOpen || messages.length <= 1) return

        const inactivityTimer = setTimeout(() => {
            setMessages([
                { text: 'La sesión ha expirado por inactividad. ¿En qué más puedo ayudarte?', sender: 'bot' }
            ])
        }, 60000) // 60 segundos de inactividad

        return () => clearTimeout(inactivityTimer)
    }, [messages, isOpen])

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input
        if (!textToSend.trim()) return

        const userMessage: Message = { text: textToSend, sender: 'user' }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: textToSend })
            })

            if (!response.ok) throw new Error('Network response was not ok')

            const data = await response.json()
            const botMessages = data.responses || ['Lo siento, hubo un error.']

            botMessages.forEach((text: string) => {
                setMessages(prev => [...prev, { text, sender: 'bot' }])
            })
        } catch (error) {
            setMessages(prev => [...prev, {
                text: 'Lo siento, no pude conectarme al servidor.',
                sender: 'bot'
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickQuestion = (question: string) => {
        handleSend(question)
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-[#1E3A8A] text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all z-[9999]"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-[9999]">
                    <div className="bg-[#1E3A8A] text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold">Asistente BOA</h3>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user'
                                    ? 'bg-[#1E3A8A] text-white'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {messages.length === 1 && (
                        <div className="px-4 pb-2">
                            <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_QUESTIONS.map((question, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="text-xs bg-blue-50 text-[#1E3A8A] px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                            />
                            <Button
                                onClick={() => handleSend()}
                                className="bg-[#1E3A8A]"
                                disabled={isLoading}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
