'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plane, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Credenciales inválidas')
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-[#0a0e27] bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -right-40 w-80 h-80 dark:bg-[#0052A5]/20 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 dark:bg-[#FFD600]/10 bg-yellow-300/15 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite 2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 dark:bg-purple-500/5 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 7s ease-in-out infinite 4s' }}></div>
            </div>

            <div className="w-full max-w-md dark:bg-white/10 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 relative z-10 animate-in fade-in zoom-in duration-500 dark:border dark:border-white/20 border border-white/40 hover:shadow-2xl hover:shadow-[#0052A5]/20 dark:hover:shadow-[#FFD600]/10 transition-all duration-500">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 dark:bg-[#FFD600]/20 bg-[#FFD600]/30 rounded-full mb-4 group hover:dark:bg-[#FFD600]/40 hover:bg-[#FFD600]/50 transition-all duration-300">
                        <Plane className="h-8 w-8 dark:text-[#FFD600] text-[#0052A5] group-hover:scale-110 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                    <h1 className="text-2xl font-bold dark:text-white text-[#0052A5]">Bienvenido de nuevo</h1>
                    <p className="dark:text-white/80 text-slate-700 mt-2 text-sm">Ingresa a tu cuenta BOA para gestionar tus viajes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="dark:text-white/80 text-[#0052A5] font-medium">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 dark:border-white/20 dark:bg-white/10 dark:focus:border-[#FFD600] dark:focus:bg-white/20 dark:text-white border-white/40 bg-white/50 focus:border-[#0052A5] focus:ring-[#0052A5]/20 transition-all duration-200 focus:bg-white text-[#0052A5] dark:placeholder:text-white/50 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="dark:text-white/80 text-[#0052A5] font-medium">Contraseña</Label>
                                <Link href="#" className="text-xs font-medium dark:text-[#FFD600] text-[#0052A5] hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 pr-10 dark:border-white/20 dark:bg-white/10 dark:focus:border-[#FFD600] dark:focus:bg-white/20 dark:text-white border-white/40 bg-white/50 focus:border-[#0052A5] focus:ring-[#0052A5]/20 transition-all duration-200 focus:bg-white text-[#0052A5] dark:placeholder:text-white/50 placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white/60 dark:hover:text-[#FFD600] text-[#0052A5] hover:text-[#FFD600] transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-200 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center animate-in slide-in-from-top-2 duration-300">
                            <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-[#0052A5] to-blue-600 hover:from-[#FFD600] hover:to-yellow-400 hover:text-[#0052A5] dark:text-white text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Iniciando...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                Iniciar Sesión
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </Button>

                    <p className="text-center text-sm dark:text-white/80 text-[#0052A5] pt-2">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="font-semibold dark:text-[#FFD600] text-[#FFD600] hover:underline dark:hover:text-white hover:text-[#0052A5] transition-colors">
                            Regístrate gratis
                        </Link>
                    </p>
                </form>

                <div className="mt-8 pt-6 dark:border-white/10 border-white/30 border-t">
                    <div className="flex items-center justify-center space-x-2 dark:text-white/60 text-[#0052A5]">
                        <Plane className="h-4 w-4" />
                        <span className="text-xs font-medium">La aerolínea de todos los bolivianos</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    )
}
