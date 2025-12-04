interface PaymentFormProps {
    onSubmit?: (data: any) => void
    amount?: number
    onPaymentComplete?: () => void
}

export default function PaymentForm({ onSubmit, amount, onPaymentComplete }: PaymentFormProps) {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#0052A5] mb-4">Información de Pago</h2>
            <p className="text-gray-600">Monto: ${amount}</p>
        </div>
    )
}
