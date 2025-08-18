"use client";

import { useCart, CartItem } from "@/components/CartContext";
import Image from "next/image";
import { Truck, Shield, CreditCard } from "lucide-react";

interface OrderSummaryProps {
  buyNowItem?: CartItem;
}

export default function OrderSummary({ buyNowItem }: OrderSummaryProps) {
  const { cartItems } = useCart();

  // Handle both cart items and buy now items
  const itemsToShow = buyNowItem ? [buyNowItem] : cartItems;
  
  // Calculate totals
  const subtotal = itemsToShow.reduce((sum, item) => {
    const price = item.price;
    return sum + (price * item.quantity);
  }, 0);

  // Dynamic shipping: free over 10,000 PKR, otherwise 500 PKR
  const shipping = subtotal >= 10000 ? 0 : 500;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {itemsToShow.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
            {/* Product Image */}
            <div className="relative w-16 h-32 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="lazy"
                className="object-cover rounded-md"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {(item.price * item.quantity).toLocaleString()} {item.currency}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Information */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Standard Shipping</span>
          </div>
          <span className="text-sm text-gray-600">5-7 business days</span>
        </div>
        <p className="text-xs text-gray-500">Free shipping on orders over 10,000 PKR</p>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemsToShow.length} items)</span>
          <span className="text-gray-900">{subtotal.toLocaleString()} PKR</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `${shipping.toLocaleString()} PKR`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">{tax.toLocaleString()} PKR</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{total.toLocaleString()} PKR</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Including tax and shipping</p>
        </div>
      </div>

      {/* Security & Trust */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Multiple payment methods accepted</span>
        </div>
      </div>

      {/* Return Policy */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
        <p className="text-sm text-gray-600">
          Free returns within 30 days. Items must be unworn and in original condition.
        </p>
      </div>
    </div>
  );
}
