import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FlightSearch from '@/components/FlightSearch'

export const metadata = {
    title: 'Reserva de Vuelos - Boliviana de Aviación',
    description: 'Busca y reserva vuelos con BOA a los mejores destinos de Bolivia y el mundo',
}

export default function FlightsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-20">
                <div className="gradient-boa-radial py-16">
                    <div className="section-container">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Reserva tu Vuelo
                            </h1>
                            <p className="text-xl text-blue-100">
                                Encuentra las mejores tarifas para tu próximo destino
                            </p>
                        </div>
                        <FlightSearch />
                    </div>
                </div>

                <section className="section-container">
                    <h2 className="text-3xl font-bold text-boa-dark mb-8">Información Importante</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-boa-dark mb-2">Equipaje Incluido</h3>
                            <p className="text-gray-600">23kg de equipaje facturado y 8kg de equipaje de mano incluidos en todas las tarifas</p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-boa-yellow" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-boa-dark mb-2">Cambios Flexibles</h3>
                            <p className="text-gray-600">Cambia tu fecha de vuelo sin costo adicional hasta 24 horas antes</p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-boa-dark mb-2">Mejor Precio</h3>
                            <p className="text-gray-600">Garantizamos las mejores tarifas. Encuentra un precio mejor y te igualamos</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
