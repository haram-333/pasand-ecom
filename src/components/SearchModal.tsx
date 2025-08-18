"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchHistory } from "./SearchHistoryContext";
import { products } from "@/data/products";
import { kidProducts } from "@/data/kid-products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: 'men' | 'kids';
  discount?: number;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine all products for search
  const allProducts = [
    ...products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price.current,
      currency: p.price.currency,
      image: p.images.main,
      category: 'men' as const,
      discount: p.discount
    })),
    ...kidProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price.current,
      currency: p.price.currency,
      image: p.images.main,
      category: 'kids' as const,
      discount: p.discount
    }))
  ];

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filtered.slice(0, 8)); // Limit to 8 results for better UX
      setIsSearching(false);
    }, 200);
  };

  // Handle input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
        setShowSuggestions(true);
      } else {
        setResults([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

     // Handle escape key
   useEffect(() => {
     const handleEscape = (e: KeyboardEvent) => {
       if (e.key === 'Escape') {
         handleClose();
       }
     };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    setShowSuggestions(false);
    onClose();
  };

  const handleEnter = () => {
    if (query.trim()) {
      // Add to search history
      addToHistory(query.trim());
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setResults([]);
      setShowSuggestions(false);
      onClose();
    }
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setShowSuggestions(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
             {/* Backdrop */}
       <div 
         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
         onClick={handleClose}
       />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Search Products</h2>
                     <button
             onClick={handleClose}
             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
           >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
                     <div className="relative">
             <input
               ref={inputRef}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                   e.preventDefault();
                   handleEnter();
                 }
               }}
               placeholder="Search for products, categories..."
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
             />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to see all search results
            </p>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && (
            <>
              {isSearching ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="p-4">
                                     <div className="mb-4">
                     <p className="text-sm text-gray-500">
                       Found {results.length} result{results.length !== 1 ? 's' : ''}
                     </p>
                     <button
                       onClick={handleEnter}
                       className="mt-2 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                     >
                       View All Results
                     </button>
                   </div>
                  
                  <div className="space-y-3">
                    {results.map((result) => (
                      <Link
                        key={`${result.category}-${result.id}`}
                        href={`/product/${result.id}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-20 flex-shrink-0">
                          <Image
                            src={result.image}
                            alt={result.name}
                            fill
                            loading="lazy"
                            className="object-cover rounded-md"
                          />
                          {result.category === 'kids' && (
                            <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                              Kids
                            </span>
                          )}
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate group-hover:text-black">
                            {result.name}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {result.category} Collection
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-gray-900">
                              {result.price.toLocaleString()} {result.currency}
                            </span>
                            {result.discount && result.discount > 0 && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                -{result.discount}%
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse our categories
                  </p>
                </div>
              )}
            </>
          )}

                     {/* Popular Searches (when no query) */}
           {!query.trim() && (
             <div className="p-4">
               <h3 className="font-medium text-gray-900 mb-3">Popular Searches</h3>
               <div className="flex flex-wrap gap-2">
                 {['Tees', 'Polos', 'Trousers', 'Kids', 'Summer', 'Limited Edition'].map((term) => (
                   <button
                     key={term}
                     onClick={() => setQuery(term)}
                     className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                   >
                     {term}
                   </button>
                 ))}
               </div>
               
               {/* Search History */}
               {searchHistory.length > 0 && (
                 <div className="mt-6">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="font-medium text-gray-900">Recent Searches</h3>
                     <button
                       onClick={clearHistory}
                       className="text-xs text-red-500 hover:text-red-700 transition-colors"
                     >
                       Clear All
                     </button>
                   </div>
                   <div className="space-y-2">
                     {searchHistory.map((term, index) => (
                       <div key={index} className="flex items-center justify-between group">
                         <button
                           onClick={() => setQuery(term)}
                           className="flex-1 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                         >
                           {term}
                         </button>
                         <button
                           onClick={() => removeFromHistory(term)}
                           className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-2 py-1 bg-white border rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
