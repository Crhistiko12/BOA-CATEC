'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plane, User, LogOut } from 'lucide-react'
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
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="sr-only">BOA - Boliviana de Aviación</span>
                            <div className="flex items-center gap-2">
                                <Plane className="h-8 w-8 text-[#1E3A8A]" />
                                <span className="text-2xl font-bold text-[#1E3A8A]">BOA</span>
                            </div>
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-gray-700 hover:text-[#1E3A8A]"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4 hidden lg:flex items-center">
                        {session?.user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-[#1E3A8A]">
                                    Hola, {session.user.name?.split(' ')[0]}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-200">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                                                <AvatarFallback className="bg-[#1E3A8A] text-white">
                                                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {session.user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/my-bookings" className="cursor-pointer">Mis Viajes</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="cursor-pointer text-red-600 focus:text-red-600"
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
                                    <Button variant="ghost" className="text-base font-medium text-gray-700 hover:text-[#1E3A8A]">
                                        Iniciar Sesión
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-[#1E3A8A] hover:bg-blue-800 text-white">
                                        Registrarse
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="-mx-2 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
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
                    <div className="py-4 flex flex-col space-y-4 lg:hidden">
                        {navigation.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-gray-700 hover:text-[#1E3A8A]"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 mt-4">
                            {session ? (
                                <>
                                    <div className="px-3 py-2 text-sm font-medium text-gray-500">
                                        Conectado como {session.user?.name}
                                    </div>
                                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-red-600"
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
                                        <Button variant="ghost" className="w-full justify-start">
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white">
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
