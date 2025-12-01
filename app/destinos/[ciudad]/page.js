import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Destinos - Boliviana de Aviación',
    description: 'Explora todos los destinos nacionales e internacionales de BOA',
}

const cities = ['la-paz', 'santa-cruz', 'cochabamba', 'sucre', 'tarija', 'trinidad']

export async function generateStaticParams() {
    return cities.map((ciudad) => ({
        ciudad,
    }))
}

const destinationData = {
    'la-paz': {
        name: 'La Paz',
        title: 'La Paz - Sede de Gobierno',
        description: 'La ciudad más alta del mundo te espera con el imponente Illimani, teleféricos urbanos y una rica cultura.',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80',
        attractions: ['Teleférico', 'Valle de la Luna', 'Mercado de las Brujas', 'Calle Jaén'],
        weather: '5°C - 18°C',
        altitude: '3,640 m',
    },
    'santa-cruz': {
        name: 'Santa Cruz',
        title: 'Santa Cruz - Capital Económica',
        description: 'El corazón económico de Bolivia con clima tropical, moderna infraestructura y gastronomía excepcional.',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc1c2f86?w=1200&q=80',
        attractions: ['Plaza 24 de Septiembre', 'Biocentro Güembé', 'Lomas de Arena', 'Samaipata'],
        weather: '20°C - 32°C',
        altitude: '416 m',
    },
    'cochabamba': {
        name: 'Cochabamba',
        title: 'Cochabamba - Ciudad de la Eterna Primavera',
        description: 'Conocida por su clima primaveral, el Cristo de la Concordia y su deliciosa gastronomía.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
        attractions: ['Cristo de la Concordia', 'Parque Tunari', 'Laguna Alalay', 'Convento de Santa Teresa'],
        weather: '8°C - 25°C',
        altitude: '2,570 m',
    },
    'sucre': {
        name: 'Sucre',
        title: 'Sucre - Capital Constitucional',
        description: 'Patrimonio de la Humanidad, conocida como la Ciudad Blanca por su arquitectura colonial.',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
        attractions: ['Casa de la Libertad', 'Parque Cretácico', 'Convento de la Recoleta', 'Plaza 25 de Mayo'],
        weather: '8°C - 22°C',
        altitude: '2,810 m',
    },
    'tarija': {
        name: 'Tarija',
        title: 'Tarija - Valle de Vinos',
        description: 'Tierra de vinos, tradición y hospitalidad. Famosa por sus viñedos y clima cálido.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        attractions: ['Ruta del Vino', 'Valle de la Concepción', 'Represa San Jacinto', 'Centro Histórico'],
        weather: '10°C - 28°C',
        altitude: '1,854 m',
    },
    'trinidad': {
        name: 'Trinidad',
        title: 'Trinidad - Puerta del Beni',
        description: 'Portal a la Amazonía boliviana, con biodiversidad única y cultura moxeña.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
        attractions: ['Laguna Suárez', 'Lomas de Bala', 'Catedral de Trinidad', 'Reserva Pilon Lajas'],
        weather: '22°C - 35°C',
        altitude: '236 m',
    },
}

export default function DestinationPage({ params }) {
    const destination = destinationData[params.ciudad]

    if (!destination) {
        return <div>Destino no encontrado</div>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-20">
                {/* Hero Image */}
                <div className="relative h-[400px] md:h-[500px]">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 section-container text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{destination.title}</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{destination.description}</p>
                    </div>
                </div>

                {/* Content */}
                <section className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-boa-dark mb-6">Principales Atractivos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {destination.attractions.map((attraction, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                                        <svg className="w-6 h-6 text-boa-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium text-gray-700">{attraction}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="prose max-w-none">
                                <h3 className="text-2xl font-bold text-boa-dark mb-4">¿Por qué visitar {destination.name}?</h3>
                                <p className="text-gray-700 mb-4">
                                    {destination.name} es uno de los destinos más fascinantes de Bolivia. Con una combinación única de
                                    cultura, historia y belleza natural, esta ciudad ofrece experiencias inolvidables para todo tipo de viajeros.
                                </p>
                                <p className="text-gray-700">
                                    Vuela con BOA y descubre todo lo que {destination.name} tiene para ofrecer. Nuestros vuelos directos
                                    te llevan cómodamente desde las principales ciudades de Bolivia.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Flight Info Card */}
                            <div className="card p-6">
                                <h3 className="text-xl font-bold text-boa-dark mb-4">Información del Destino</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-boa-blue mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold text-gray-900">Clima</div>
                                            <div className="text-gray-600">{destination.weather}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-boa-blue mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold text-gray-900">Altitud</div>
                                            <div className="text-gray-600">{destination.altitude}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="card p-6 bg-gradient-to-br from-boa-blue to-blue-700 text-white">
                                <h3 className="text-xl font-bold mb-3">¿Listo para volar?</h3>
                                <p className="text-blue-100 mb-6">
                                    Reserva tu vuelo a {destination.name} con las mejores tarifas
                                </p>
                                <button className="w-full bg-boa-yellow hover:bg-yellow-500 text-boa-dark font-bold py-3 px-6 rounded-lg transition-all duration-300">
                                    Buscar vuelos
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
