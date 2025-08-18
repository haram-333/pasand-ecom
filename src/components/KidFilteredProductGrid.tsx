"use client";
import { useState, useEffect } from "react";
import KidFilter from "./KidFilter";
import KidProductCard from "./KidProductCard";
import { kidProducts } from "@/data/kid-products";

interface KidProduct {
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

export default function KidFilteredProductGrid() {
    const [filteredProducts, setFilteredProducts] = useState<KidProduct[]>(kidProducts);
    const [totalProducts, setTotalProducts] = useState(kidProducts.length);
    
    // Pagination state
    const [displayedProducts, setDisplayedProducts] = useState<KidProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const productsPerPage = 8;

    // Initialize displayed products
    useEffect(() => {
        setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
        setCurrentPage(1);
        setHasMore(filteredProducts.length > productsPerPage);
    }, [filteredProducts]);

    const loadMoreProducts = async () => {
        if (isLoading || !hasMore) return;
        
        setIsLoading(true);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = nextPage * productsPerPage;
        
        const newProducts = filteredProducts.slice(startIndex, endIndex);
        setDisplayedProducts(newProducts);
        setCurrentPage(nextPage);
        setHasMore(endIndex < filteredProducts.length);
        
        setIsLoading(false);
    };

    const handleFilterChange = (newFilteredProducts: KidProduct[]) => {
        setFilteredProducts(newFilteredProducts);
    };

    return (
        <div className="w-full">
            {/* Filter Component */}
            <div className="mb-8">
                <KidFilter onFilterChange={handleFilterChange} />
            </div>
            
            {/* Product Cards Grid */}
            {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {displayedProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`${
                                index >= (currentPage - 1) * productsPerPage 
                                    ? 'animate-bounce-in' 
                                    : 'animate-slide-in-from-bottom-4'
                            }`}
                            style={{
                                animationDelay: `${(index % productsPerPage) * 50}ms`
                            }}
                        >
                            <KidProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your filters to see more products.</p>
                </div>
            )}

            {/* Load More Section */}
            {hasMore && (
                <div className="text-center mt-12">
                    {/* Product Counter */}
                    <div className="mb-6">
                        <p className="text-gray-600 text-lg">
                            Showing {displayedProducts.length} of {totalProducts} products
                        </p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                                className="bg-black h-3 rounded-full transition-all duration-500 ease-out"
                                style={{ 
                                    width: `${(displayedProducts.length / totalProducts) * 100}%` 
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Load More Button */}
                    <button
                        onClick={loadMoreProducts}
                        disabled={isLoading}
                        className={`
                            px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg
                            transition-all duration-300 ease-out transform
                            hover:bg-gray-800 hover:scale-105 hover:shadow-xl
                            active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                            ${isLoading ? 'animate-pulse' : ''}
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Loading...</span>
                            </div>
                        ) : (
                            'Load More'
                        )}
                    </button>
                </div>
            )}

            {/* All Products Loaded Message */}
            {!hasMore && displayedProducts.length > 0 && (
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-lg">All products loaded</p>
                </div>
            )}
        </div>
    );
}
