"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { kidProducts } from "@/data/kid-products";
import IndividualProductCard from "@/components/IndividualProductCard";
import KidProductCard from "@/components/KidProductCard";

interface SearchResult {
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
  category: 'men' | 'kids';
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const performSearch = (searchQuery: string) => {
    setIsLoading(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const allProducts = [
        ...products.map(p => ({
          ...p,
          category: 'men' as const
        })),
        ...kidProducts.map(p => ({
          ...p,
          category: 'kids' as const
        }))
      ];

      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-full px-4 py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for &ldquo;{query}&rdquo;...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-full px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
        {/* Search Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query.trim() && (
            <p className="text-gray-600">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for &ldquo;${query}&rdquo;`
                : `No results found for &ldquo;${query}&rdquo;`
              }
            </p>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div key={`${product.category}-${product.id}`} className="animate-slide-in-from-bottom-4">
                {product.category === 'kids' ? (
                  <KidProductCard product={product} />
                ) : (
                  <IndividualProductCard product={product} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Try:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Checking your spelling</li>
                <li>• Using more general keywords</li>
                <li>• Browsing our categories instead</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-full px-4 py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
