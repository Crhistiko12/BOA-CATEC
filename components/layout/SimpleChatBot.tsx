'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Plane, Package, RefreshCw, HelpCircle, MapPin, Tag } from 'lucide-react'

interface Message {
    text: string
    sender: 'user' | 'bot'
}

const SUGGESTED_QUESTIONS = [
    { icon: Plane, text: "¿Cuál es el estado de mi vuelo?", category: "vuelo" },
    { icon: MapPin, text: "¿Dónde está mi puerta de embarque?", category: "vuelo" },
    { icon: Plane, text: "Hacer check-in online", category: "checkin" },
    { icon: Package, text: "Políticas de equipaje", category: "equipaje" },
    { icon: Package, text: "Rastrear mi equipaje", category: "equipaje" },
    { icon: RefreshCw, text: "¿Cómo cambio mi vuelo?", category: "cambios" },
    { icon: Tag, text: "Ver promociones disponibles", category: "info" },
    { icon: HelpCircle, text: "Contactar con soporte", category: "soporte" }
]

export default function SimpleChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { text: '¡Hola! Soy el asistente virtual de BOA. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setMounted(true)
        console.log('🤖 ChatBot montado correctamente!')
    }, [])

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
                text: 'Lo siento, no pude conectarme al servidor. Por favor, intenta de nuevo.',
                sender: 'bot'
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickQuestion = (question: string) => {
        handleSend(question)
    }

    if (!mounted) return null

    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}>
            {!isOpen ? (
                <button
                    onClick={() => {
                        console.log('ChatBot clicked!')
                        setIsOpen(true)
                    }}
                    style={{
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '50%',
                        border: 'none',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                        e.currentTarget.style.backgroundColor = '#0033A0'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.backgroundColor = '#1E3A8A'
                    }}
                >
                    <MessageCircle size={24} />
                </button>
            ) : (
                <div style={{
                    width: '400px',
                    maxWidth: '90vw',
                    height: '600px',
                    maxHeight: '80vh',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#FFC72C',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Plane size={20} color="#1E3A8A" />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>Asistente BOA</h3>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Siempre disponible</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setMessages([{ text: '¡Hola! Soy el asistente virtual de BOA. ¿En qué puedo ayudarte hoy?', sender: 'bot' }])
                                    setInput('')
                                }}
                                title="Reiniciar conversación"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <RefreshCw size={18} />
                            </button>
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        padding: '20px',
                        overflowY: 'auto',
                        backgroundColor: '#F9FAFB',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    backgroundColor: msg.sender === 'user' ? '#1E3A8A' : 'white',
                                    color: msg.sender === 'user' ? 'white' : '#1F2937',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    gap: '6px'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#9CA3AF',
                                        borderRadius: '50%',
                                        animation: 'bounce 1s infinite'
                                    }} />
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#9CA3AF',
                                        borderRadius: '50%',
                                        animation: 'bounce 1s infinite 0.2s'
                                    }} />
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#9CA3AF',
                                        borderRadius: '50%',
                                        animation: 'bounce 1s infinite 0.4s'
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggested Questions */}
                    {messages.length === 1 && (
                        <div style={{
                            padding: '16px',
                            borderTop: '1px solid #E5E7EB',
                            backgroundColor: 'white'
                        }}>
                            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>
                                Preguntas frecuentes:
                            </p>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px'
                            }}>
                                {SUGGESTED_QUESTIONS.slice(0, 4).map((question, idx) => {
                                    const Icon = question.icon
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickQuestion(question.text)}
                                            style={{
                                                padding: '10px',
                                                fontSize: '11px',
                                                backgroundColor: '#EFF6FF',
                                                color: '#1E3A8A',
                                                border: '1px solid #DBEAFE',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#DBEAFE'
                                                e.currentTarget.style.transform = 'translateY(-2px)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#EFF6FF'
                                                e.currentTarget.style.transform = 'translateY(0)'
                                            }}
                                        >
                                            <Icon size={14} />
                                            <span style={{ fontSize: '11px', lineHeight: '1.3' }}>{question.text}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid #E5E7EB',
                        backgroundColor: 'white'
                    }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#1E3A8A'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                style={{
                                    padding: '12px 16px',
                                    backgroundColor: input.trim() && !isLoading ? '#1E3A8A' : '#9CA3AF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.backgroundColor = '#0033A0'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.backgroundColor = '#1E3A8A'
                                    }
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    )
}
