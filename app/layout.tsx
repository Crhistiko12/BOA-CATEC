import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/layout/ChatWidget'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'BOA - Boliviana de Aviación | Vuelos, Reservas y Servicios',
    description: 'Sitio oficial de Boliviana de Aviación. Reserva vuelos, gestiona tu equipaje, solicita reembolsos y obtén soporte 24/7. La mejor experiencia de vuelo en Bolivia.',
    keywords: ['BOA', 'Boliviana de Aviación', 'Vuelos Bolivia', 'Pasajes aéreos', 'Turismo Bolivia'],
    authors: [{ name: 'BOA Digital Team' }],
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={inter.className} suppressHydrationWarning>
                <AuthProvider>
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <ChatWidget />
                </AuthProvider>
            </body>
        </html>
    )
}
