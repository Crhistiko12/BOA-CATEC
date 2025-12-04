interface SeatSelectorProps {
    onSeatSelect?: (seats: any[]) => void
    maxSeats?: number
}

export default function SeatSelector({ onSeatSelect, maxSeats }: SeatSelectorProps) {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#0052A5] mb-4">Selecciona tu Asiento</h2>
            <p className="text-gray-600">Componente de selección de asientos (máx: {maxSeats})</p>
        </div>
    )
}
