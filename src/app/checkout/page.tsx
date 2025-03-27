'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/lib/features/cartSlice'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function CheckoutPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()
  const dispatch = useDispatch()

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16)
    setCardNumber(value)
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: '' }))
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (value.length >= 2) {
      setExpiryDate(value.slice(0, 2) + '/' + value.slice(2))
    } else {
      setExpiryDate(value)
    }
    if (errors.expiryDate) {
      setErrors(prev => ({ ...prev, expiryDate: '' }))
    }
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3)
    setCvc(value)
    if (errors.cvc) {
      setErrors(prev => ({ ...prev, cvc: '' }))
    }
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    if (!expiryDate) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)'
    }

    if (!cvc) {
      newErrors.cvc = 'CVC is required'
    } else if (cvc.length !== 3) {
      newErrors.cvc = 'CVC must be 3 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = () => {
    if (validateInputs()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    dispatch(clearCart())
    router.push('/')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter your address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter your city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="Enter ZIP code" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input 
                id="card" 
                placeholder="Enter card number" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                pattern="[0-9]*"
                inputMode="numeric"
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && (
                <Alert variant="destructive" className="mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.cardNumber}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/YY" 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                  pattern="[0-9/]*"
                  inputMode="numeric"
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && (
                  <Alert variant="destructive" className="mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.expiryDate}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  placeholder="Enter CVC" 
                  value={cvc}
                  onChange={handleCvcChange}
                  maxLength={3}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={errors.cvc ? "border-red-500" : ""}
                />
                {errors.cvc && (
                  <Alert variant="destructive" className="mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.cvc}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <Button className="w-full" onClick={handlePlaceOrder}>Place Order</Button>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium mb-2">Test Card Information:</p>
                <div className="space-y-1 text-sm">
                  <p>Card Number: <span className="font-mono">4242 4242 4242 4242</span></p>
                  <p>Expiry Date: <span className="font-mono">Any future date (e.g., 12/25)</span></p>
                  <p>CVC: <span className="font-mono">Any 3 digits (e.g., 123)</span></p>
                  <p className="text-xs text-gray-500 mt-2">This is a test card that will always be accepted.</p>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Confirmed!</DialogTitle>
          </DialogHeader>
          <p className="text-center py-4">Your order has been successfully placed.</p>
          <DialogFooter>
            <Button onClick={handleConfirmationClose} className="w-full">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 