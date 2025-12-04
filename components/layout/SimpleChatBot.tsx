'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Plane, Package, RefreshCw, HelpCircle, MapPin, Tag, Sparkles } from 'lucide-react'

interface Message {
    text: string
    sender: 'user' | 'bot'
}

const SUGGESTED_QUESTIONS = [
    { icon: Plane, text: "¿Cuál es el estado de mi vuelo?", category: "vuelo", color: "from-blue-500 to-cyan-500" },
    { icon: MapPin, text: "¿Dónde está mi puerta de embarque?", category: "vuelo", color: "from-purple-500 to-pink-500" },
    { icon: Plane, text: "Hacer check-in online", category: "checkin", color: "from-cyan-500 to-teal-500" },
    { icon: Package, text: "Políticas de equipaje", category: "equipaje", color: "from-green-500 to-emerald-500" },
    { icon: Package, text: "Rastrear mi equipaje", category: "equipaje", color: "from-orange-500 to-red-500" },
    { icon: RefreshCw, text: "¿Cómo cambio mi vuelo?", category: "cambios", color: "from-pink-500 to-rose-500" },
    { icon: Tag, text: "Ver promociones disponibles", category: "info", color: "from-yellow-500 to-amber-500" },
    { icon: HelpCircle, text: "Contactar con soporte", category: "soporte", color: "from-indigo-500 to-purple-500" }
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
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100000 }}>
            {!isOpen ? (
                <button
                    onClick={() => {
                        console.log('ChatBot clicked!')
                        setIsOpen(true)
                    }}
                    style={{
                        background: 'linear-gradient(135deg, #0052A5 0%, #003D80 50%, #9333EA 100%)',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '9999px',
                        border: '3px solid rgba(255, 214, 0, 0.3)',
                        boxShadow: '0 20px 40px rgba(0, 82, 165, 0.4), 0 0 20px rgba(255, 214, 0, 0.5)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        width: '60px',
                        height: '60px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)'
                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 82, 165, 0.6), 0 0 30px rgba(255, 214, 0, 0.8)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 82, 165, 0.4), 0 0 20px rgba(255, 214, 0, 0.5)'
                    }}
                >
                    <MessageCircle size={28} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </button>
            ) : (
                <div style={{
                    width: '420px',
                    maxWidth: '90vw',
                    height: '650px',
                    maxHeight: '85vh',
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 30px 80px rgba(0, 82, 165, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 214, 0, 0.2)'
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0, 82, 165, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255, 214, 0, 0.15)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: 'linear-gradient(135deg, #FFD600 0%, #FFA500 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(255, 214, 0, 0.4)',
                                animation: 'bounce 2s ease-in-out infinite'
                            }}>
                                <Plane size={22} color="#0052A5" style={{ fontWeight: 'bold' }} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: '900', margin: 0, fontSize: '17px', background: 'linear-gradient(135deg, #FFD600 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Asistente BOA</h3>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7, color: '#10B981' }}>● En línea</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => {
                                    setMessages([{ text: '¡Hola! Soy el asistente virtual de BOA. ¿En qué puedo ayudarte hoy?', sender: 'bot' }])
                                    setInput('')
                                }}
                                title="Reiniciar conversación"
                                style={{
                                    background: 'rgba(255, 214, 0, 0.1)',
                                    border: '1px solid rgba(255, 214, 0, 0.2)',
                                    color: '#FFD600',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 214, 0, 0.2)'
                                    e.currentTarget.style.transform = 'scale(1.1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 214, 0, 0.1)'
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
                            >
                                <RefreshCw size={18} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    color: '#EF4444',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'
                                    e.currentTarget.style.transform = 'scale(1.1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
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
                        background: 'rgba(10, 14, 39, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                animation: 'slideIn 0.3s ease-out'
                            }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                    background: msg.sender === 'user' 
                                        ? 'linear-gradient(135deg, #0052A5 0%, #003D80 100%)'
                                        : 'linear-gradient(135deg, rgba(100, 116, 139, 0.3) 0%, rgba(71, 85, 105, 0.3) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: msg.sender === 'user' 
                                        ? '1px solid rgba(255, 214, 0, 0.3)'
                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                    color: msg.sender === 'user' ? '#FFFFFF' : '#E2E8F0',
                                    boxShadow: msg.sender === 'user' 
                                        ? '0 8px 20px rgba(0, 82, 165, 0.3)'
                                        : '0 4px 12px rgba(0, 0, 0, 0.2)',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                    fontWeight: msg.sender === 'user' ? '500' : '400'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'slideIn 0.3s ease-out' }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.3) 0%, rgba(71, 85, 105, 0.3) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '12px 16px',
                                    borderRadius: '16px 16px 16px 4px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    gap: '6px'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#10B981',
                                        borderRadius: '50%',
                                        animation: 'bounce 1s infinite'
                                    }} />
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#10B981',
                                        borderRadius: '50%',
                                        animation: 'bounce 1s infinite 0.2s'
                                    }} />
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#10B981',
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
                            borderTop: '1px solid rgba(255, 214, 0, 0.1)',
                            background: 'rgba(10, 14, 39, 0.3)',
                            maxHeight: '140px',
                            overflowY: 'auto'
                        }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#FFD600', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                ✨ Preguntas frecuentes:
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
                                                background: `linear-gradient(135deg, ${question.color})`,
                                                color: 'white',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.2s',
                                                fontWeight: '600',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-3px)'
                                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)'
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'
                                            }}
                                        >
                                            <Icon size={13} style={{ flexShrink: 0 }} />
                                            <span style={{ fontSize: '10px', lineHeight: '1.2' }}>{question.text}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(255, 214, 0, 0.1)',
                        background: 'rgba(10, 14, 39, 0.5)',
                        backdropFilter: 'blur(10px)'
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
                                    padding: '12px 14px',
                                    border: '2px solid rgba(255, 214, 0, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    color: 'white',
                                    fontWeight: '500'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#FFD600'
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 214, 0, 0.2)'
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 214, 0, 0.2)'
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                style={{
                                    padding: '12px 14px',
                                    background: input.trim() && !isLoading 
                                        ? 'linear-gradient(135deg, #FFD600 0%, #FFA500 100%)'
                                        : 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
                                    color: input.trim() && !isLoading ? '#0052A5' : '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    fontWeight: '700',
                                    boxShadow: input.trim() && !isLoading 
                                        ? '0 8px 16px rgba(255, 214, 0, 0.4)'
                                        : '0 4px 8px rgba(0, 0, 0, 0.2)'
                                }}
                                onMouseEnter={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.transform = 'scale(1.05)'
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 214, 0, 0.5)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.transform = 'scale(1)'
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 214, 0, 0.4)'
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
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                input::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </div>
    )
}
