'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Plane } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden")
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            })

            if (response.ok) {
                router.push('/login?registered=true')
            } else {
                const data = await response.json()
                alert(data.error || "Error al registrarse")
            }
        } catch (error) {
            console.error('Registration error:', error)
            alert("Error de conexión")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Plane className="h-8 w-8 text-[#1E3A8A]" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#1E3A8A]">Crear Cuenta</CardTitle>
                    <CardDescription>
                        Únete al Club BOA y gestiona tus viajes fácilmente
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" placeholder="Juan Pérez" required onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" placeholder="nombre@ejemplo.com" required onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" required onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <Input id="confirmPassword" type="password" required onChange={handleChange} />
                        </div>

                        <Button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-800" disabled={loading}>
                            {loading ? 'Creando cuenta...' : 'Registrarse'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/login" className="text-[#1E3A8A] font-semibold hover:underline">
                            Inicia Sesión
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
