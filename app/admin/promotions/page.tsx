import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tag, Plus } from 'lucide-react'

export default function AdminPromotionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-gradient-to-r from-[#FFC72C] to-yellow-600 text-gray-900 py-12 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Gestión de Promociones</h1>
                            <p className="text-gray-800">Crea y administra ofertas especiales</p>
                        </div>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100">
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Promoción
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Promociones Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12 text-gray-500">
                            <Tag className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>No hay promociones activas</p>
                            <p className="text-sm mt-2">Crea una nueva promoción para comenzar</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
