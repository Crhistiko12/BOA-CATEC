// Utility for managing support tickets
export interface Ticket {
    id: string
    number: string
    subject: string
    category: string
    description: string
    priority: string
    flightNumber?: string
    status: 'En Proceso' | 'Resuelto' | 'Cerrado' | 'Abierto'
    createdAt: string
    updatedAt: string
}

const STORAGE_KEY = 'boa_support_tickets'

export const ticketStorage = {
    // Get all tickets
    getAll(): Ticket[] {
        if (typeof window === 'undefined') return []
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    },

    // Get ticket by ID
    getById(id: string): Ticket | null {
        const tickets = this.getAll()
        return tickets.find(t => t.id === id) || null
    },

    // Save new ticket
    save(ticket: Omit<Ticket, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'status'>): Ticket {
        const tickets = this.getAll()
        const ticketNumber = `TKT-${String(tickets.length + 1).padStart(3, '0')}`

        const newTicket: Ticket = {
            ...ticket,
            id: `ticket_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            number: ticketNumber,
            status: 'Abierto',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        tickets.push(newTicket)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
        return newTicket
    },

    // Update ticket
    update(id: string, updates: Partial<Ticket>): Ticket | null {
        const tickets = this.getAll()
        const index = tickets.findIndex(t => t.id === id)

        if (index === -1) return null

        tickets[index] = {
            ...tickets[index],
            ...updates,
            updatedAt: new Date().toISOString()
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
        return tickets[index]
    },

    // Delete ticket
    delete(id: string): boolean {
        const tickets = this.getAll()
        const filtered = tickets.filter(t => t.id !== id)

        if (filtered.length === tickets.length) return false

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
        return true
    },

    // Get recent tickets
    getRecent(limit: number = 3): Ticket[] {
        const tickets = this.getAll()
        return tickets
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit)
    },

    // Clear all tickets (for testing)
    clear(): void {
        localStorage.removeItem(STORAGE_KEY)
    }
}

// Helper to get status color
export function getStatusColor(status: Ticket['status']): string {
    const colors = {
        'Abierto': 'bg-blue-100 text-blue-800 border-blue-200',
        'En Proceso': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Resuelto': 'bg-green-100 text-green-800 border-green-200',
        'Cerrado': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || colors['Abierto']
}

// Helper to format date
export function formatTicketDate(isoDate: string): string {
    const date = new Date(isoDate)
    return date.toLocaleDateString('es-BO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
