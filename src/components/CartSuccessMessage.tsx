"use client";

import { useCart } from "./CartContext";

export default function CartSuccessMessage() {
  const { successMessage } = useCart();

  if (!successMessage) return null;

  return (
    <div className="fixed top-24 right-4 z-50 transition-all duration-300 ease-in-out transform translate-x-0">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Product added to cart!</p>
            <p className="text-sm text-green-600 mt-1">Check your cart to view all items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
