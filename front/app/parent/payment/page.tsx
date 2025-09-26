import { AppLayout } from "@/components/layout/app-layout"
import { PaymentForm } from "@/components/payment/payment-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ParentPaymentPage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="p-16 space-y-16 max-w-4xl mx-auto bg-background min-h-[80vh]">
          <div className="mb-8">
            <h1 className="text-6xl font-extrabold text-primary tracking-tight font-sans mb-4">Payment Center</h1>
            <p className="text-2xl text-muted-foreground font-semibold">Manage payments for your child profiles and school services</p>
          </div>

          <PaymentForm />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
