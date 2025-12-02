'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Seat {
    id: string
    number: string
    status: 'available' | 'occupied' | 'selected'
    price: number
}

interface SeatSelectorProps {
    onSeatSelect: (seats: Seat[]) => void
    maxSeats: number
}

// Generar asientos simulados
const generateSeats = (): Seat[] => {
    const seats: Seat[] = []
    const rows = 20
    const cols = ['A', 'B', 'C', 'D', 'E', 'F']

    for (let i = 1; i <= rows; i++) {
        cols.forEach(col => {
            seats.push({
                id: `${i}${col}`,
                number: `${i}${col}`,
                status: Math.random() > 0.8 ? 'occupied' : 'available',
                price: i <= 5 ? 50 : 20 // Asientos delanteros más caros
            })
        })
    }
    return seats
}

export default function SeatSelector({ onSeatSelect, maxSeats }: SeatSelectorProps) {
    const [seats, setSeats] = useState<Seat[]>(generateSeats())
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'occupied') return

        if (seat.status === 'selected') {
            // Deseleccionar
            const newSeats = seats.map(s => s.id === seat.id ? { ...s, status: 'available' } : s) as Seat[]
            setSeats(newSeats)
            const newSelected = selectedSeats.filter(s => s.id !== seat.id)
            setSelectedSeats(newSelected)
            onSeatSelect(newSelected)
        } else {
            // Seleccionar
            if (selectedSeats.length >= maxSeats) return

            const newSeats = seats.map(s => s.id === seat.id ? { ...s, status: 'selected' } : s) as Seat[]
            setSeats(newSeats)
            const newSelected = [...selectedSeats, { ...seat, status: 'selected' }] as Seat[]
            setSelectedSeats(newSelected)
            onSeatSelect(newSelected)
        }
    }

    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-3xl border-4 border-gray-200 relative">
                {/* Cockpit */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-t-full -z-10" />

                <div className="grid grid-cols-7 gap-2">
                    {/* Aisle labels */}
                    <div className="col-span-3 grid grid-cols-3 gap-2 text-center font-bold text-gray-400 mb-4">
                        <div>A</div><div>B</div><div>C</div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-3 grid grid-cols-3 gap-2 text-center font-bold text-gray-400 mb-4">
                        <div>D</div><div>E</div><div>F</div>
                    </div>

                    {/* Seats */}
                    {seats.map((seat, idx) => {
                        const isAisle = idx % 6 === 3
                        return (
                            <>
                                {isAisle && <div className="col-span-1 flex items-center justify-center text-xs text-gray-400">{Math.ceil((idx + 1) / 6)}</div>}
                                <button
                                    key={seat.id}
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={seat.status === 'occupied'}
                                    className={cn(
                                        "h-8 w-8 rounded-t-lg text-[10px] flex items-center justify-center transition-colors",
                                        seat.status === 'available' && "bg-blue-100 hover:bg-blue-200 text-blue-800",
                                        seat.status === 'occupied' && "bg-gray-300 cursor-not-allowed text-gray-500",
                                        seat.status === 'selected' && "bg-[#1E3A8A] text-white"
                                    )}
                                >
                                    {seat.number}
                                </button>
                            </>
                        )
                    })}
                </div>
            </div>

            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded" /> Disponible
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1E3A8A] rounded" /> Seleccionado
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded" /> Ocupado
                </div>
            </div>
        </div>
    )
}
