import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#1E3A8A] text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Sobre BOA</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-blue-200">Nuestra Historia</Link></li>
                            <li><Link href="/fleet" className="hover:text-blue-200">Flota</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-200">Trabaja con nosotros</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-2">
                            <li><Link href="/baggage" className="hover:text-blue-200">Equipaje</Link></li>
                            <li><Link href="/pets" className="hover:text-blue-200">Mascotas</Link></li>
                            <li><Link href="/refunds" className="hover:text-blue-200">Reembolsos</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="hover:text-blue-200">Contacto</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-200">Preguntas Frecuentes</Link></li>
                            <li><Link href="/support" className="hover:text-blue-200">Centro de Soporte</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-200"><Facebook /></a>
                            <a href="#" className="hover:text-blue-200"><Twitter /></a>
                            <a href="#" className="hover:text-blue-200"><Instagram /></a>
                            <a href="#" className="hover:text-blue-200"><Youtube /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-blue-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Boliviana de Aviación. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
