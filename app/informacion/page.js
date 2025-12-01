import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Información de Vuelos - Boliviana de Aviación',
    description: 'Consulta el estado de tu vuelo, horarios y más información',
}

export default function InformacionPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-20">
                <div className="gradient-boa-radial py-12">
                    <div className="section-container text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Información de Vuelos
                        </h1>
                        <p className="text-xl text-blue-100">
                            Consulta el estado y horarios de vuelos BOA
                        </p>
                    </div>
                </div>

                <section className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-boa-dark mb-6">Buscar vuelo</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Número de vuelo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: BOA123"
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha
                                    </label>
                                    <input
                                        type="date"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <button className="w-full btn-primary mt-6">
                                Buscar vuelo
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-6">
                                <h3 className="text-xl font-bold text-boa-dark mb-4">Centro de Ayuda</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-boa-blue mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">Equipaje</div>
                                            <div className="text-sm text-gray-600">Políticas y restricciones</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-boa-blue mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">Documentación</div>
                                            <div className="text-sm text-gray-600">Requisitos de viaje</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-boa-blue mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">Pasajeros especiales</div>
                                            <div className="text-sm text-gray-600">Menores, mascotas, etc.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="card p-6">
                                <h3 className="text-xl font-bold text-boa-dark mb-4">Contacto</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-boa-blue mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">Call Center</div>
                                            <div className="text-boa-blue font-bold">901 105 105</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-boa-blue mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">Email</div>
                                            <div className="text-boa-blue font-bold">info@boa.bo</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
