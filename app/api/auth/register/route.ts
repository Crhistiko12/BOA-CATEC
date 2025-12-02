import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password } = registerSchema.parse(body)

        // Verificar si el usuario ya existe
        const existingUser = await db.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'El correo electrónico ya está registrado' },
                { status: 400 }
            )
        }

        // Crear usuario
        // NOTA: En producción, la contraseña debe ser hasheada con bcrypt
        const user = await db.user.create({
            data: {
                name,
                email,
                password, // Guardando en texto plano por simplicidad en este entorno demo
                role: 'USER'
            }
        })

        // Eliminar password de la respuesta
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
        }
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
