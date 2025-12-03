'use client'

import SimpleChatBot from '@/components/layout/SimpleChatBot'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <SimpleChatBot />
            <WhatsAppButton />
        </>
    )
}
