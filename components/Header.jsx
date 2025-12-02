'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, LayoutDashboard, Plane } from 'lucide-react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session, status } = useSession()

    const navigation = [
        { name: 'Inicio', href: '/' },
        { name: 'Destinos', href: '/destinos/la-paz' },
        { name: 'Reservas', href: '/vuelos' },
        { name: 'Check-in', href: '/checkin' },
        { name: 'Info Vuelos', href: '/informacion' },
        { name: 'Promociones', href: '/#promociones' },
    ]

    return (
        <header className="fixed w-full top-0 z-50 bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-boa-blue rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">BOA</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-boa-blue font-bold text-xl">Boliviana de Aviación</div>
                            <div className="text-xs text-gray-600">Conectando Bolivia con el mundo</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-gray-700 hover:text-boa-blue font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {status === 'authenticated' ? (
                            <div className="relative ml-4 group">
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 text-boa-blue hover:bg-blue-100 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Hola, {session.user.name?.split(' ')[0]}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Link>
                                    <Link href="/my-bookings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Plane className="w-4 h-4 mr-2" />
                                        Mis Viajes
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="ml-4 btn-primary">
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-boa-blue hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-boa-blue"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Abrir menú de navegación"
                    >
                        <span className="sr-only">Abrir menú principal</span>
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
                            <div className="px-2 pt-2 pb-4 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-boa-blue hover:bg-blue-50 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {status === 'authenticated' ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-boa-blue hover:bg-blue-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setMobileMenuOpen(false)
                                            }}
                                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block w-full mt-4 text-center btn-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
