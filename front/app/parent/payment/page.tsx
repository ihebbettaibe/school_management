import { AppLayout } from "@/components/layout/app-layout"
import { PaymentForm } from "@/components/payment/payment-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ParentPaymentPage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="p-6 space-y-6 bg-background min-h-[80vh]">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-primary tracking-tight font-sans">Payment Center</h1>
            <p className="text-lg text-primary font-medium font-sans mt-1">Manage payments for your child profiles and school services</p>
          </div>

          <PaymentForm />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
