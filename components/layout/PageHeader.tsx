import React from 'react'
import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
    icon: LucideIcon
    title: string
    subtitle: string
    action?: React.ReactNode
}

export function PageHeader({ icon: Icon, title, subtitle, action }: PageHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-[#0052A5] via-[#0052A5] to-[#003D7A] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="relative container mx-auto px-6 py-12">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">{title}</h1>
                            <p className="text-white/80 text-lg mt-1">{subtitle}</p>
                        </div>
                    </div>
                    {action && <div className="flex-shrink-0">{action}</div>}
                </div>
            </div>
        </div>
    )
}
