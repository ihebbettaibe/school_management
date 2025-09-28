import { AppLayout } from "@/components/layout/app-layout"
import { PaymentForm } from "@/components/payment/payment-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ParentPaymentPage() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <AppLayout>
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 space-y-10 sm:space-y-14 md:space-y-16 max-w-4xl w-full mx-auto bg-background min-h-[80vh]">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight font-sans mb-3 sm:mb-4">Payment Center</h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground font-semibold">Manage payments for your child profiles and school services</p>
          </div>

          <PaymentForm />
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
