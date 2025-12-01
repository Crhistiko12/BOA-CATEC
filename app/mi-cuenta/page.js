import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Mi Cuenta - Boliviana de Aviación',
    description: 'Accede a tu cuenta BOA para gestionar reservas y preferencias',
}

export default function MiCuentaPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-20 bg-gray-50">
                <section className="section-container">
                    <div className="max-w-md mx-auto">
                        <div className="card p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-boa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-boa-dark mb-2">Iniciar Sesión</h1>
                                <p className="text-gray-600">Accede a tu cuenta BOA</p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-boa-blue focus:ring-boa-blue" />
                                        <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                                    </label>
                                    <a href="#" className="text-sm text-boa-blue hover:text-blue-800">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>

                                <button type="submit" className="w-full btn-primary">
                                    Iniciar Sesión
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    ¿No tienes cuenta?{' '}
                                    <a href="#" className="text-boa-blue hover:text-blue-800 font-semibold">
                                        Regístrate aquí
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 card p-6">
                            <h2 className="font-bold text-boa-dark mb-3">Beneficios de tener una cuenta</h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-boa-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Gestiona tus reservas fácilmente
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-boa-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Accede a ofertas exclusivas
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-boa-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Guarda tus preferencias de viaje
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
