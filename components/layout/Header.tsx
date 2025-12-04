'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plane, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession()

    const navigation = [
        { name: 'Reservar', href: '/flights' },
        { name: 'Mis Viajes', href: '/my-bookings' },
        { name: 'Check-in', href: '/checkin' },
        { name: 'Estado de Vuelo', href: '/flight-status' },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-2xl bg-gradient-to-r from-[#0052A5]/30 via-[#003D80]/25 to-purple-900/20 border-b border-white/10 shadow-2xl shadow-black/20">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between py-4 lg:py-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="sr-only">BOA - Boliviana de Aviación</span>
                            <div className="group flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                                <div className="p-2 bg-gradient-to-br from-[#FFD600] to-yellow-400 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#FFD600]/30">
                                    <Plane className="h-6 w-6 text-[#0052A5]" />
                                </div>
                                <span className="text-2xl font-black bg-gradient-to-r from-[#FFD600] to-yellow-300 bg-clip-text text-transparent">BOA</span>
                            </div>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden ml-12 space-x-2 lg:flex items-center">
                            {navigation.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/20"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Desktop User Menu */}
                    <div className="ml-10 space-x-3 hidden lg:flex items-center">
                        {session?.user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-white/70 hidden md:inline">
                                    {session.user.name?.split(' ')[0]}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-11 w-11 rounded-xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 shadow-lg transition-all duration-300 hover:border-white/40">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                                                <AvatarFallback className="bg-gradient-to-br from-[#FFD600] to-yellow-400 text-[#0052A5] font-bold text-lg">
                                                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/40" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal px-4 py-3 border-b border-white/10">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-semibold text-white">{session.user.name}</p>
                                                <p className="text-xs text-white/60">
                                                    {session.user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/my-bookings" className="cursor-pointer px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                                Mis Viajes
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="cursor-pointer px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Cerrar Sesión</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-sm font-semibold text-white/80 px-4 py-2 rounded-xl hover:text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/20">
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-[#FFD600] to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-[#0052A5] font-bold px-6 py-2 rounded-xl shadow-lg shadow-[#FFD600]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD600]/50 transform hover:scale-105">
                                        Registrarse
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/20"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="py-4 flex flex-col space-y-2 lg:hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-xl border border-white/10 mt-2 px-2">
                        {navigation.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-3 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-white/10">
                            {session ? (
                                <>
                                    <div className="px-4 py-2 text-xs font-semibold text-white/50">
                                        Conectado como {session.user?.name}
                                    </div>
                                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                        onClick={() => {
                                            signOut()
                                            setIsOpen(false)
                                        }}
                                    >
                                        Cerrar Sesión
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-[#FFD600] to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-[#0052A5] font-bold rounded-lg transition-all">
                                            Registrarse
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
