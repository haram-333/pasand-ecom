"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
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

interface IndividualProductCardProps {
    product: Product;
}

export default function IndividualProductCard({ product }: IndividualProductCardProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="w-full border rounded-2xl shadow-md overflow-hidden group">
            {/* Image Container - Clickable to go to product page */}
            <Link href={`/product/${product.id}`} className="block">
                <div className="relative w-full aspect-[9/16] cursor-pointer">
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
                    
                    {/* Availability Badge */}
                    <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md ${
                        product.availability === 'in-stock' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                    }`}>
                        {product.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    {/* Cart Icon - positioned on the image */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenModal(true);
                        }}
                        disabled={product.availability === 'out-of-stock'}
                        className={`absolute bottom-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                            product.availability === 'in-stock'
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
            </Link>
            
            {/* Details */}
            <div className="p-4">
                <Link href={`/product/${product.id}`} className="block">
                    <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors truncate" title={product.name}>{product.name}</h2>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-600 font-bold">
                        {product.price.current.toLocaleString()} {product.price.currency}
                    </span>
                    <span className="line-through text-gray-500 text-sm">
                        {product.price.original.toLocaleString()} {product.price.currency}
                    </span>
                </div>

                {/* Sizes with availability */}
                <div className="mt-3 flex gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                        const sizeInfo = product.sizeStock[size];
                        const isAvailable = sizeInfo?.available;
                        
                        return (
                            <span
                                key={size}
                                className={`border px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                                    isAvailable
                                        ? 'hover:bg-black hover:text-white'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                                title={isAvailable ? `Available: ${sizeInfo?.quantity} left` : 'Out of stock'}
                            >
                                {size}
                            </span>
                        );
                    })}
                </div>
            </div>



            {/* Size Selection Modal */}
            <SizeModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                product={{
                    id: product.id,
                    name: product.name,
                    price: product.price.current,
                    currency: product.price.currency,
                    image: product.images.main,
                    sizes: product.sizes,
                }}
            />
        </div>
    );
}
