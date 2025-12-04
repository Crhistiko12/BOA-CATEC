import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-t from-[#0a0e27] via-gray-950 to-gray-900 text-white mt-auto border-t border-white/10">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0052A5]/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 mb-8">
                    {/* Company Info */}
                    <div className="group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0052A5] to-[#003D7A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span className="text-lg font-black text-white">BOA</span>
                            </div>
                            <div className="font-bold text-lg">Boliviana de Aviación</div>
                        </div>
                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            La aerolínea nacional de Bolivia, conectando el país con el mundo desde 2009. Tu confianza, nuestro compromiso.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com/BolivianadeAviacion" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-[#0052A5] hover:to-[#003D7A] rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/boa_bo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-[#0052A5] hover:to-[#003D7A] rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/boa_bo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-[#FFD600] hover:to-yellow-400 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-3 text-white/60">
                            <li><Link href="/vuelos" className="hover:text-[#FFD600] transition-colors font-medium">Reservar vuelo</Link></li>
                            <li><Link href="/checkin" className="hover:text-[#FFD600] transition-colors font-medium">Check-in online</Link></li>
                            <li><Link href="/informacion" className="hover:text-[#FFD600] transition-colors font-medium">Estado de vuelos</Link></li>
                            <li><Link href="/destinos" className="hover:text-[#FFD600] transition-colors font-medium">Destinos</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Atención al Cliente</h3>
                        <ul className="space-y-3 text-white/60">
                            <li><Link href="/support" className="hover:text-[#FFD600] transition-colors font-medium">Centro de ayuda</Link></li>
                            <li><Link href="/my-baggage" className="hover:text-[#FFD600] transition-colors font-medium">Equipaje</Link></li>
                            <li><Link href="/informacion" className="hover:text-[#FFD600] transition-colors font-medium">Políticas</Link></li>
                            <li><Link href="/support" className="hover:text-[#FFD600] transition-colors font-medium">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Contacto</h3>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#FFD600]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>901 105 105</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#FFD600]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>info@boa.bo</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#FFD600]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>Cochabamba, Bolivia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                        <p>&copy; {currentYear} Boliviana de Aviación. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <Link href="/informacion" className="hover:text-[#FFD600] transition-colors font-medium">Términos y condiciones</Link>
                            <Link href="/informacion" className="hover:text-[#FFD600] transition-colors font-medium">Política de privacidad</Link>
                            <Link href="/informacion" className="hover:text-[#FFD600] transition-colors font-medium">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
