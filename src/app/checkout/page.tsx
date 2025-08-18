"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/components/CartContext";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";

// Define the form data type
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
  saveInfo: boolean;
  terms: boolean;
}

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check for "Buy Now" item in sessionStorage
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);

  // Load buy now item on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('buyNowItem');
      if (stored) {
        setBuyNowItem(JSON.parse(stored));
        // Clear it from sessionStorage after loading
        sessionStorage.removeItem('buyNowItem');
      }
    }
  }, []);

  // Debug logging
  console.log('Checkout page - cart items:', cartItems);
  console.log('Checkout page - cart items length:', cartItems.length);
  console.log('Checkout page - buy now item:', buyNowItem);

  // Check if we have either cart items or a buy now item
  const hasItems = cartItems.length > 0 || buyNowItem;

  // Redirect if no items
  if (!hasItems) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Centered Logo */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.avif"
                  alt="Broncoo Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-full px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = async (formData: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Prepare order data including items
    const orderData = {
      ...formData,
      items: buyNowItem ? [buyNowItem] : cartItems,
      orderType: buyNowItem ? 'buy-now' : 'cart'
    };
    
    // Here you would typically send the order to your backend
    console.log("Processing order:", orderData);
    
    // Redirect to OTP verification (we'll create this next)
    // router.push('/verify-otp');
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered Logo */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.avif"
                alt="Broncoo Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="lg:order-1">
            <CheckoutForm onSubmit={handleCheckout} isProcessing={isProcessing} />
          </div>

          {/* Order Summary */}
          <div className="lg:order-2">
            <OrderSummary buyNowItem={buyNowItem ?? undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
