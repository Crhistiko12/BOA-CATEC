import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import CheckInWidget from '@/components/CheckInWidget'
import Promotions from '@/components/Promotions'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Boliviana de Aviación (BOA) - Inicio',
    description: 'Vuela con BOA. Reserva tus vuelos a La Paz, Santa Cruz, Cochabamba y más destinos. Check-in online, promociones y ofertas especiales.',
}

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section with Flight Search */}
                <Hero />

                {/* Destinations Grid */}
                <Destinations />

                {/* Check-in Widget */}
                <CheckInWidget />

                {/* Promotions with Countdown */}
                <Promotions />
            </main>

            <Footer />
        </div>
    )
}
