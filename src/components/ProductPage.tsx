"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { products } from "@/data/products";
import { kidProducts } from "@/data/kid-products";
import SizeModal from "./SizeModal";

interface Product {
  id: number;
  name: string;
  images: {
    main: string;
    hover: string;
  };
  discount: number;
  price: {
    current: number;
    original: number;
    currency: string;
  };
  sizes: string[];
  availability: string;
  sizeStock: {
    [key: string]: { available: boolean; quantity: number } | undefined;
  };
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images.main);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [openModalProductId, setOpenModalProductId] = useState<number | null>(null);

  // Get all images for the product (main + hover)
  const allImages = [product.images.main, product.images.hover];

  // Get related products (excluding current product)
  const isKidProduct = product.id >= 100; // Kid products have IDs 101+
  const relatedProducts = isKidProduct 
    ? kidProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4)
    : products
        .filter(p => p.id !== product.id)
        .slice(0, 4);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Add the selected quantity to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price.current,
        currency: product.price.currency,
        image: product.images.main,
        size: selectedSize,
      });
    }
    
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Store the product info in sessionStorage for checkout
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price.current,
      currency: product.price.currency,
      image: product.images.main,
      size: selectedSize,
      quantity: quantity
    };
    
    sessionStorage.setItem('buyNowItem', JSON.stringify(checkoutItem));
    
    // Reset quantity to 1
    setQuantity(1);
    
    // Redirect to checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Large Image */}
            <div className="aspect-[9/16] relative border rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-[9/16] w-20 relative border rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === image ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">
                  {product.price.current.toLocaleString()} {product.price.currency}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {product.price.original.toLocaleString()} {product.price.currency}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              
              {/* Total Price for Quantity - Always reserve space */}
              <div className="text-sm text-gray-600 min-h-[20px] transition-all duration-200">
                {quantity > 1 && (
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <span>Total:</span>
                    <span className="font-semibold text-lg">{(product.price.current * quantity).toLocaleString()} {product.price.currency}</span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        ({(product.price.original * quantity).toLocaleString()} {product.price.currency})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                product.availability === 'in-stock' ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              <span className="text-gray-700">
                {product.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const sizeInfo = product.sizeStock[size];
                  const isAvailable = sizeInfo?.available;
                  const isSelected = selectedSize === size;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-black text-white border-black'
                          : isAvailable
                          ? 'border-gray-300 hover:border-black hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {size}
                      {isAvailable && (
                        <span className="block text-xs text-gray-500 mt-1">
                          {sizeInfo?.quantity} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>



            {/* Quantity Selector */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-lg font-semibold">-</span>
                </button>
                
                <span className="w-16 text-center text-lg font-semibold">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || product.availability === 'out-of-stock'}
                className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || product.availability === 'out-of-stock'}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="mt-16 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Product Information</h2>
          
          {/* Description */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('description')}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-lg font-semibold">Description</span>
              <div className={`transition-transform duration-300 ${openAccordion === 'description' ? 'rotate-180' : ''}`}>
                <ChevronDown />
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordion === 'description' 
                  ? 'max-h-32 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-gray-700">
                <p>This is a high-quality product designed for comfort and style. Perfect for everyday wear and special occasions.</p>
              </div>
            </div>
          </div>

          {/* Material and Care */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('material')}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-lg font-semibold">Material & Care</span>
              <div className={`transition-transform duration-300 ${openAccordion === 'material' ? 'rotate-180' : ''}`}>
                <ChevronDown />
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordion === 'material' 
                  ? 'max-h-32 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-gray-700">
                <p>Made from premium materials. Machine washable at 30°C. Do not bleach. Iron on low heat if needed.</p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('refund')}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-lg font-semibold">Refund Policy</span>
              <div className={`transition-transform duration-300 ${openAccordion === 'refund' ? 'rotate-180' : ''}`}>
                <ChevronDown />
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordion === 'refund' 
                  ? 'max-h-32 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-gray-700">
                <p>30-day return policy. Return in original condition with tags attached. Free returns for defective items.</p>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg overflow-hidden group relative">
                {/* Product Link - covers most of the card */}
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="aspect-[9/16] relative">
                    <Image
                      src={relatedProduct.images.main}
                      alt={relatedProduct.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                      src={relatedProduct.images.hover}
                      alt={relatedProduct.name}
                      fill
                      loading="lazy"
                      className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    {relatedProduct.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{relatedProduct.discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">
                        {relatedProduct.price.current.toLocaleString()} {relatedProduct.price.currency}
                      </span>
                      {relatedProduct.discount > 0 && (
                        <span className="text-gray-500 text-sm line-through">
                          {relatedProduct.price.original.toLocaleString()} {relatedProduct.price.currency}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                
                {/* Cart Icon - positioned on the image */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenModalProductId(relatedProduct.id);
                  }}
                  disabled={relatedProduct.availability === 'out-of-stock'}
                  className={`absolute bottom-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                    relatedProduct.availability === 'in-stock'
                      ? 'bg-white/90 hover:bg-white text-black'
                      : 'bg-gray-300/90 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-label="Add to cart"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 21H20L19 8H5L4 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

             {openModalProductId && (() => {
         const product = relatedProducts.find(p => p.id === openModalProductId);
         if (product) {
           return (
             <SizeModal
               isOpen={true}
               onClose={() => setOpenModalProductId(null)}
               product={{
                 id: product.id,
                 name: product.name,
                 price: product.price.current,
                 currency: product.price.currency,
                 image: product.images.main,
                 sizes: product.sizes,
               }}
             />
           );
         }
         return null;
       })()}
    </div>
  );
}
