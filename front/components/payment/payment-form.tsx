"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CreditCard,
  Building2,
  Banknote,
  User,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

interface ChildProfile {
  id: string
  name: string
  grade: string
  class: string
  fees: {
    registration: number
    monthly: number
    activities: number
  }
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  processingFee: number
}

const mockChildProfiles: ChildProfile[] = [
  {
    id: "1",
    name: "Ahmed Ben Ali",
    grade: "Grade 5",
    class: "5-A",
    fees: {
      registration: 15,
      monthly: 8,
      activities: 2,
    },
  },
  {
    id: "2",
    name: "Fatima Ben Ali",
    grade: "Grade 3",
    class: "3-B",
    fees: {
      registration: 15,
      monthly: 7,
      activities:3 ,
    },
  },
]

const paymentMethods: PaymentMethod[] = [
  {
    id: "poste-tunisienne",
    name: "Poste Tunisienne",
    icon: <Building2 className="w-6 h-6" />,
    description: "Pay through La Poste offices nationwide",
    processingFee: 2,
  },
  {
    id: "d17-card",
    name: "D17 Card",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Use your D17 prepaid card",
    processingFee: 1.5,
  },
  {
    id: "bank-card",
    name: "Bank Card",
    icon: <Banknote className="w-6 h-6" />,
    description: "Visa, Mastercard, or local bank cards",
    processingFee: 3,
  },
]

export function PaymentForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [paymentData, setPaymentData] = useState({
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    d17Number: "",
    posteReference: "",
  })
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const calculateTotal = () => {
    const selectedProfiles = mockChildProfiles.filter((child) => selectedChildren.includes(child.id))
    const subtotal = selectedProfiles.reduce(
      (sum, child) => sum + child.fees.registration + child.fees.monthly + child.fees.activities,
      0,
    )
    const selectedMethod = paymentMethods.find((method) => method.id === selectedPaymentMethod)
    const processingFee = selectedMethod ? selectedMethod.processingFee : 0
    return { subtotal, processingFee, total: subtotal + processingFee }
  }

  const handleChildSelection = (childId: string, checked: boolean) => {
    if (checked) {
      setSelectedChildren([...selectedChildren, childId])
    } else {
      setSelectedChildren(selectedChildren.filter((id) => id !== childId))
    }
  }

  const handlePayment = async () => {
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      // Randomly simulate success or failure for demo
      const success = Math.random() > 0.3

      if (success) {
        setPaymentStatus("success")
      } else {
        setPaymentStatus("error")
        setErrorMessage("Payment failed. Please check your payment details and try again.")
      }
    }, 2000)
  }

  const resetPayment = () => {
    setPaymentStatus("idle")
    setCurrentStep(1)
    setSelectedChildren([])
    setSelectedPaymentMethod("")
    setPaymentData({
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      d17Number: "",
      posteReference: "",
    })
    setErrorMessage("")
  }

  if (paymentStatus === "success") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your payment of {calculateTotal().total} TND has been processed successfully. You will receive a
            confirmation email shortly.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm">
              <strong>Transaction ID:</strong> TXN-{Date.now()}
            </p>
            <p className="text-sm">
              <strong>Payment Method:</strong> {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}
            </p>
            <p className="text-sm">
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <Button onClick={resetPayment} className="w-full">
            Make Another Payment
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "error") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
          <p className="text-muted-foreground mb-6">{errorMessage}</p>
          <div className="space-x-4">
            <Button onClick={() => setPaymentStatus("idle")} variant="outline">
              Try Again
            </Button>
            <Button onClick={resetPayment}>Start Over</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            <div
              className={`flex items-center space-x-2 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg font-sans">Select Children</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div
              className={`flex items-center space-x-2 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg font-sans">Payment Method</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div
              className={`flex items-center space-x-2 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                3
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg font-sans">Payment Details</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div
              className={`flex items-center space-x-2 ${currentStep >= 4 ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                4
              </div>
              <span className="font-semibold text-sm sm:text-base md:text-lg font-sans">Confirm</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select Children */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-7 h-7 text-primary" />
              <span className="text-xl font-bold text-primary font-sans">Select Child Profiles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockChildProfiles.map((child) => (
              <div key={child.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Checkbox
                  id={child.id}
                  checked={selectedChildren.includes(child.id)}
                  onCheckedChange={(checked) => handleChildSelection(child.id, checked as boolean)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-primary font-sans">{child.name}</h4>
                      <p className="text-base text-muted-foreground font-sans">{child.grade} - Class {child.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary font-sans">{child.fees.registration + child.fees.monthly + child.fees.activities} TND</p>
                      <p className="text-sm text-muted-foreground font-sans">Registration: {child.fees.registration} • Monthly: {child.fees.monthly} • Activities: {child.fees.activities}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {selectedChildren.length > 0 && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-primary">Selected: {selectedChildren.length} child(ren)</span>
                  <span className="font-bold text-xl text-primary">{calculateTotal().subtotal} TND</span>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={selectedChildren.length === 0}>
                Continue to Payment Method
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment Method */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
            <CardTitle className="text-xl font-bold text-primary font-sans">Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${selectedPaymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-primary font-sans">{method.name}</h4>
                    <p className="text-base text-muted-foreground font-sans">{method.description}</p>
                    <p className="text-sm text-muted-foreground font-sans">Processing fee: {method.processingFee} TND</p>
                  </div>
                  {selectedPaymentMethod === method.id && <CheckCircle className="w-5 h-5 text-primary" />}
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!selectedPaymentMethod}>
                Continue to Payment Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment Details */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
            <CardTitle className="text-xl font-bold text-primary font-sans">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parent Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center space-x-3 text-lg text-primary font-sans">
                    <User className="w-6 h-6 text-primary" />
                    <span>Parent Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Full Name</Label>
                      <Input
                        id="parentName"
                        value={paymentData.parentName}
                        onChange={(e) => setPaymentData({ ...paymentData, parentName: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Phone Number</Label>
                      <Input
                        id="parentPhone"
                        value={paymentData.parentPhone}
                        onChange={(e) => setPaymentData({ ...paymentData, parentPhone: e.target.value })}
                        placeholder="+216 XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={paymentData.parentEmail}
                      onChange={(e) => setPaymentData({ ...paymentData, parentEmail: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <Separator />

                {/* Payment Method Specific Fields */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-primary font-sans">
                    {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name} Details
                  </h4>

                  {selectedPaymentMethod === "bank-card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "d17-card" && (
                    <div className="space-y-2">
                      <Label htmlFor="d17Number">D17 Card Number</Label>
                      <Input
                        id="d17Number"
                        value={paymentData.d17Number}
                        onChange={(e) => setPaymentData({ ...paymentData, d17Number: e.target.value })}
                        placeholder="Enter your D17 card number"
                      />
                    </div>
                  )}

                  {selectedPaymentMethod === "poste-tunisienne" && (
                    <Alert>
                      <Building2 className="h-4 w-4" />
                      <AlertDescription>
                        You will receive a reference number to complete payment at any Poste Tunisienne office. Please
                        keep this reference number safe.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Review Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
            <CardTitle className="text-xl font-bold text-primary font-sans">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {mockChildProfiles
                    .filter((child) => selectedChildren.includes(child.id))
                    .map((child) => (
                      <div key={child.id} className="flex justify-between text-sm">
                        <span>{child.name}</span>
                        <span>{child.fees.registration + child.fees.monthly + child.fees.activities} TND</span>
                      </div>
                    ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{calculateTotal().subtotal} TND</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Processing Fee</span>
                    <span>{calculateTotal().processingFee} TND</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-2xl text-primary font-sans">
                  <span>Total</span>
                  <span>{calculateTotal().total} TND</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Payment</CardTitle>
            <CardTitle className="text-xl font-bold text-primary font-sans">Confirm Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Payment Details</h4>
                <h4 className="font-semibold mb-3 text-lg text-primary font-sans">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Parent:</span>
                    <span>{paymentData.parentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span>{paymentData.parentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>{paymentData.parentPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Selected Children</h4>
                <h4 className="font-semibold mb-3 text-lg text-primary font-sans">Selected Children</h4>
                <div className="space-y-2">
                  {mockChildProfiles
                    .filter((child) => selectedChildren.includes(child.id))
                    .map((child) => (
                      <div key={child.id} className="flex justify-between text-sm">
                        <span>
                          {child.name} ({child.grade})
                        </span>
                        <span>{child.fees.registration + child.fees.monthly + child.fees.activities} TND</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-primary font-sans">Total Amount:</span>
                <span className="font-bold text-2xl text-primary font-sans">{calculateTotal().total} TND</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handlePayment} disabled={paymentStatus === "processing"} className="min-w-32">
                {paymentStatus === "processing" ? "Processing..." : "Confirm Payment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
