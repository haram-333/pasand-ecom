"use client";

import Image from "next/image";
import Link from "next/link";
import { useSizeModal } from "./SizeModalContext";

import { products } from "@/data/products";

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
  sizeStock: Record<string, { available: boolean; quantity: number } | undefined>;
}

interface ProductCardProps {
  product: Product;
  showOnlyFirst?: boolean;
  isMobile?: boolean;
}

export default function ProductCard({ product, showOnlyFirst = false, isMobile = false }: ProductCardProps) {
  const { openSizeModal } = useSizeModal();

  return (
    <>
      <div className="w-full border rounded-2xl shadow-md overflow-hidden group">
        {/* Image Container - Clickable to go to product page */}
        <Link href={`/product/${product.id}`} className="block">
          <div className={`relative w-full cursor-pointer ${
            isMobile ? 'h-80' : 'aspect-[9/16]'
          }`}>
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              loading="lazy"
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={product.images.hover}
              alt={product.name}
              fill
              loading="lazy"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Discount Badge */}
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              -{product.discount}%
            </span>
            
            {/* Cart Icon - positioned on the image */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openSizeModal(product);
              }}
              className={`absolute bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                isMobile ? 'bottom-3 right-3' : 'top-3 right-3'
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
        </Link>

        {/* Details */}
        <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
          <Link href={`/product/${product.id}`} className="block">
            <h2 className={`font-semibold hover:text-blue-600 transition-colors ${
              isMobile ? 'text-sm' : 'text-lg'
            }`}>{product.name}</h2>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-red-600 font-bold ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              {product.price.current.toLocaleString()} {product.price.currency}
            </span>
            <span className={`line-through text-gray-500 ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {product.price.original.toLocaleString()} {product.price.currency}
            </span>
          </div>

          {/* Sizes */}
          <div className={`mt-3 flex gap-1 ${isMobile ? 'flex-wrap' : 'gap-2'}`}>
            {(isMobile ? product.sizes.slice(0, 3) : product.sizes).map((size) => (
              <span
                key={size}
                className={`border rounded-md hover:bg-black hover:text-white cursor-pointer ${
                  isMobile 
                    ? 'px-1.5 py-0.5 text-xs' 
                    : 'px-2 py-1 text-sm'
                }`}
              >
                {size}
              </span>
            ))}
            {isMobile && product.sizes.length > 3 && (
              <span className="text-xs text-gray-500 px-1.5 py-0.5">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>


    </>
  );
}

// Keep the existing ProductCardList for backward compatibility
export function ProductCardList({ showOnlyFirst = false, isMobile = false }: { showOnlyFirst?: boolean; isMobile?: boolean } = {}) {
  const { openSizeModal } = useSizeModal();

  // Add a condition to only render the first product if showOnlyFirst is true
  const productsToRender = showOnlyFirst ? products.slice(0, 1) : products;

  return (
    <>
      {productsToRender.map((product) => (
        <div
          key={product.id}
          className="w-full border rounded-2xl shadow-md overflow-hidden group"
        >
                    {/* Image Container - Clickable to go to product page */}
          <Link href={`/product/${product.id}`} className="block">
            <div className={`relative w-full cursor-pointer ${
              isMobile ? 'h-32' : 'aspect-[9/16]'
            }`}>
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                loading="lazy"
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <Image
                src={product.images.hover}
                alt={product.name}
                fill
                loading="lazy"
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* Discount Badge */}
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                -{product.discount}%
              </span>
              
              {/* Cart Icon - positioned on the image */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openSizeModal(product as Product);
                }}
                className={`absolute bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                isMobile ? 'bottom-3 right-3' : 'top-3 right-3'
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
          </Link>

          {/* Details */}
          <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
            <Link href={`/product/${product.id}`} className="block">
              <h2 className={`font-semibold hover:text-blue-600 transition-colors ${
                isMobile ? 'text-sm' : 'text-lg'
              }`}>{product.name}</h2>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-red-600 font-bold ${
                isMobile ? 'text-sm' : 'text-base'
              }`}>
                {product.price.current.toLocaleString()} {product.price.currency}
              </span>
              <span className={`line-through text-gray-500 ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                {product.price.original.toLocaleString()} {product.price.currency}
              </span>
            </div>

            {/* Sizes */}
            <div className={`mt-3 flex gap-1 ${isMobile ? 'flex-wrap' : 'gap-2'}`}>
              {(isMobile ? product.sizes.slice(0, 3) : product.sizes).map((size) => (
                <span
                  key={size}
                  className={`border rounded-md hover:bg-black hover:text-white cursor-pointer ${
                    isMobile 
                      ? 'px-1.5 py-0.5 text-xs' 
                      : 'px-2 py-1 text-sm'
                  }`}
                >
                  {size}
                </span>
              ))}
              {isMobile && product.sizes.length > 3 && (
                <span className="text-xs text-gray-500 px-1.5 py-0.5">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

    </>
  );
}
