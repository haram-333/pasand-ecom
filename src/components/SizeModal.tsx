"use client";

import React, { useState, useRef } from 'react';
import { useCart } from './CartContext';

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: string;
    sizes: string[];
  };
}

export default function SizeModal({ isOpen, onClose, product }: SizeModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Add the item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        size: selectedSize,
      });
    }

    onClose();
    setSelectedSize('');
    setQuantity(1);
  };

  if (!isOpen) return null;

  // Handler for clicking the overlay (outside modal content)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // If the click is on the overlay (not inside modal content), close
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'rgba(255,255,255,0.7)', // Use a white overlay with opacity for a faded effect
        backdropFilter: 'blur(2px)', // Optional: subtle blur for a modern modal
        WebkitBackdropFilter: 'blur(2px)',
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()} // Prevent bubbling to overlay
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Select Size</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-lg font-bold text-red-600">
            {product.price.toLocaleString()} {product.currency}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-lg font-medium w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
