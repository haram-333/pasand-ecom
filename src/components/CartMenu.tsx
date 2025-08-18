"use client";

import React from 'react';
import Image from 'next/image';
import { useCart, CartItem } from './CartContext';
import { Trash2, ShoppingBag, X } from 'lucide-react';

interface CartMenuProps {
  onClose: () => void;
}

export default function CartMenu({ onClose }: CartMenuProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
        </div>

        {/* Empty Cart State */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
            <button
              onClick={onClose}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
             {/* Header */}
       <div className="flex items-center justify-center p-6 border-b">
         <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
       </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Product Image */}
            <div className="relative w-20 h-32 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="lazy"
                className="object-cover rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                <p className="font-semibold text-gray-900">
                  {item.price.toLocaleString()} {item.currency}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 bg-white rounded-lg border px-3 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-6 space-y-4">
        {/* Total and Clear All */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">
              {getTotalPrice().toLocaleString()} PKR
            </span>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => {
            onClose();
            window.location.href = '/checkout';
          }}
          disabled={cartItems.length === 0}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
            cartItems.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
        </button>

        {/* Continue Shopping */}
        <button
          onClick={onClose}
          className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
