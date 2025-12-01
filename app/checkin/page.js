import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckInWidget from '@/components/CheckInWidget'

export const metadata = {
    title: 'Check-in Online - Boliviana de Aviación',
    description: 'Realiza tu check-in online con BOA y ahorra tiempo en el aeropuerto',
}

export default function CheckInPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-20 bg-gray-50">
                <CheckInWidget />

                <section className="section-container bg-white">
                    <h2 className="text-3xl font-bold text-boa-dark mb-8 text-center">Preguntas Frecuentes</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <details className="card p-6 cursor-pointer">
                            <summary className="font-bold text-boa-dark text-lg">¿Cuándo puedo hacer check-in?</summary>
                            <p className="mt-4 text-gray-600">
                                El check-in online abre 24 horas antes de la salida de tu vuelo y cierra 2 horas antes
                                para vuelos internacionales y 1 hora antes para vuelos nacionales.
                            </p>
                        </details>

                        <details className="card p-6 cursor-pointer">
                            <summary className="font-bold text-boa-dark text-lg">¿Necesito imprimir mi pase de abordar?</summary>
                            <p className="mt-4 text-gray-600">
                                Puedes usar el pase de abordar digital en tu teléfono móvil, o imprimirlo si lo prefieres.
                                Ambas opciones son válidas.
                            </p>
                        </details>

                        <details className="card p-6 cursor-pointer">
                            <summary className="font-bold text-boa-dark text-lg">¿Qué hago si tengo equipaje para facturar?</summary>
                            <p className="mt-4 text-gray-600">
                                Debes dirigirte a los mostradores de documentación de BOA con tu pase de abordar para
                                facturar tu equipaje al menos 1 hora antes del vuelo.
                            </p>
                        </details>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
