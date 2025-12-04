import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import ClientProviders from '@/components/providers/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Boliviana de Aviación (BOA) - Vuelos nacionales e internacionales',
    description: 'Reserva tu vuelo con Boliviana de Aviación. Conectamos Bolivia con el mundo. Vuelos a La Paz, Santa Cruz, Cochabamba, Sucre, Tarija, Trinidad y más destinos.',
    keywords: 'BOA, Boliviana de Aviación, vuelos Bolivia, aerolínea boliviana, reservar vuelos, La Paz, Santa Cruz, Cochabamba',
    openGraph: {
        title: 'Boliviana de Aviación (BOA)',
        description: 'La aerolínea que conecta Bolivia con el mundo',
        type: 'website',
        locale: 'es_BO',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Boliviana de Aviación (BOA)',
        description: 'La aerolínea que conecta Bolivia con el mundo',
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: 'verification_token',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Airline',
                            name: 'Boliviana de Aviación',
                            alternateName: 'BOA',
                            url: 'https://www.boa.bo',
                            logo: 'https://www.boa.bo/logo.png',
                            description: 'Aerolínea boliviana de bandera',
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: 'BO',
                                addressLocality: 'Cochabamba',
                            },
                            sameAs: [
                                'https://www.facebook.com/BolivianadeAviacion',
                                'https://twitter.com/boa_bo',
                                'https://www.instagram.com/boa_bo',
                            ],
                        }),
                    }}
                />
            </head>
            <body className={inter.className}>
                <AuthProvider>
                    <ClientProviders>
                        {children}
                    </ClientProviders>
                </AuthProvider>
            </body>
        </html>
    )
}
