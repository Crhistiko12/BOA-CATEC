'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, LayoutDashboard, Plane, ChevronDown, Sparkles } from 'lucide-react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session, status } = useSession()

    const navigation = [
        { name: 'Inicio', href: '/' },
        { name: 'Destinos', href: '/destinos' },
        { name: 'Reservas', href: '/vuelos' },
        { name: 'Check-in', href: '/checkin' },
        { name: 'Info Vuelos', href: '/informacion' },
        { name: 'Promociones', href: '/#promociones' },
    ]

    return (
        <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-[#0052A5]/20 via-[#003D80]/20 to-purple-900/20 backdrop-blur-md border-b border-white/10">
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD600]/5 rounded-full blur-3xl"></div>
            </div>
            
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Navegación principal">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0052A5] to-[#003D7A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-2xl font-black text-white">BOA</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-white font-black text-lg">Boliviana de Aviación</div>
                            <div className="text-xs text-white/60">Conectando Bolivia con el mundo</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-5 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {status === 'authenticated' ? (
                            <div className="relative ml-8 group">
                                <button className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-white/20 to-white/10 text-white hover:from-white/30 hover:to-white/20 font-bold transition-all duration-300 backdrop-blur-md border border-white/20 group-hover:border-white/40">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#FFD600] to-yellow-400 rounded-lg flex items-center justify-center">
                                        <User className="w-4 h-4 text-[#0052A5] font-bold" />
                                    </div>
                                    <span>Hola, {session.user.name?.split(' ')[0]}</span>
                                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                <div className="absolute right-0 mt-3 w-56 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-white/20 group-hover:border-white/40">
                                    <Link href="/dashboard" className="flex items-center px-5 py-3 text-white hover:bg-white/10 transition-colors rounded-xl mx-2">
                                        <LayoutDashboard className="w-5 h-5 mr-3 text-[#FFD600]" />
                                        <span className="font-semibold">Dashboard</span>
                                    </Link>
                                    <Link href="/my-bookings" className="flex items-center px-5 py-3 text-white hover:bg-white/10 transition-colors rounded-xl mx-2">
                                        <Plane className="w-5 h-5 mr-3 text-[#FFD600]" />
                                        <span className="font-semibold">Mis Viajes</span>
                                    </Link>
                                    <div className="border-t border-white/10 my-2 mx-2"></div>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex w-full items-center px-5 py-3 text-red-300 hover:bg-red-500/20 transition-colors rounded-xl mx-2 font-semibold"
                                    >
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="ml-8 px-6 py-2 bg-gradient-to-r from-[#FFD600] to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-[#0052A5] font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm">
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Abrir menú de navegación"
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="px-3 pt-4 pb-4 space-y-2 bg-white/10 backdrop-blur-md border-t border-white/10">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-3 rounded-xl text-base font-semibold text-white hover:bg-white/20 transition-all duration-300"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {status === 'authenticated' ? (
                                    <>
                                        <div className="border-t border-white/10 my-2"></div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-4 py-3 rounded-xl text-base font-semibold text-white hover:bg-white/20 transition-all duration-300"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-5 h-5 mr-3 text-[#FFD600]" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setMobileMenuOpen(false)
                                            }}
                                            className="flex w-full items-center px-4 py-3 rounded-xl text-base font-semibold text-red-300 hover:bg-red-500/20 transition-all duration-300"
                                        >
                                            <LogOut className="w-5 h-5 mr-3" />
                                            Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="border-t border-white/10 my-2"></div>
                                        <Link
                                            href="/login"
                                            className="block w-full text-center py-3 px-4 bg-gradient-to-r from-[#FFD600] to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-[#0052A5] font-bold rounded-xl transition-all duration-300"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
