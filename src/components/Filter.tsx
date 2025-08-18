"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { X, Filter as FilterIcon, SortAsc } from "lucide-react";
import { products } from "@/data/products";

interface FilterState {
    availability: string[];
    size: string[];
    sortBy: string;
}

interface AppliedFilter {
    type: 'availability' | 'size';
    value: string;
    label: string;
}

// Use the actual product interface from the data
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

interface FilterProps {
    onFilterChange?: (filteredProducts: Product[]) => void;
}

// Use the actual products data instead of hardcoded data
const allProducts: Product[] = products;

export default function Filter({ onFilterChange }: FilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        availability: [],
        size: [],
        sortBy: 'featured'
    });

    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);

    // Calculate availability options based on actual data
    const availabilityOptions = [
        { value: 'in-stock', label: 'In Stock', count: allProducts.filter(p => p.availability === 'in-stock').length },
        { value: 'out-of-stock', label: 'Out of Stock', count: allProducts.filter(p => p.availability === 'out-of-stock').length }
    ];

    const sizeOptions = [
        { value: 'S', label: 'S', count: allProducts.filter(p => p.sizes.includes('S') && p.sizeStock.S?.available).length },
        { value: 'M', label: 'M', count: allProducts.filter(p => p.sizes.includes('M') && p.sizeStock.M?.available).length },
        { value: 'L', label: 'L', count: allProducts.filter(p => p.sizes.includes('L') && p.sizeStock.L?.available).length },
        { value: 'XL', label: 'XL', count: allProducts.filter(p => p.sizes.includes('XL') && p.sizeStock.XL?.available).length },
        { value: 'XXL', label: 'XXL', count: allProducts.filter(p => p.sizes.includes('XXL') && p.sizeStock.XXL?.available).length }
    ];

    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'best-selling', label: 'Best Selling' },
        { value: 'a-z', label: 'Alphabetically A-Z' },
        { value: 'z-a', label: 'Alphabetically Z-A' },
        { value: 'price-low-high', label: 'Price Low to High' },
        { value: 'price-high-low', label: 'Price High to Low' },
        { value: 'date-old-new', label: 'Date Old to New' },
        { value: 'date-new-old', label: 'Date New to Old' }
    ];

    const handleAvailabilityChange = (value: string) => {
        const newAvailability = filters.availability.includes(value)
            ? filters.availability.filter(item => item !== value)
            : [...filters.availability, value];

        const newFilters = { ...filters, availability: newAvailability };
        setFilters(newFilters);
        updateAppliedFilters(newFilters);
    };

    const handleSizeChange = (value: string) => {
        const newSize = filters.size.includes(value)
            ? filters.size.filter(item => item !== value)
            : [...filters.size, value];

        const newFilters = { ...filters, size: newSize };
        setFilters(newFilters);
        updateAppliedFilters(newFilters);
    };

    const handleSortChange = (value: string) => {
        const newFilters = { ...filters, sortBy: value };
        setFilters(newFilters);
        // Don't update applied filters for sort changes
    };

    const updateAppliedFilters = (newFilters: FilterState) => {
        const applied: AppliedFilter[] = [];

        // Add availability filters
        newFilters.availability.forEach(value => {
            const option = availabilityOptions.find(opt => opt.value === value);
            if (option) {
                applied.push({
                    type: 'availability',
                    value,
                    label: option.label
                });
            }
        });

        // Add size filters
        newFilters.size.forEach(value => {
            const option = sizeOptions.find(opt => opt.value === value);
            if (option) {
                applied.push({
                    type: 'size',
                    value,
                    label: option.label
                });
            }
        });

        setAppliedFilters(applied);
    };

    const removeFilter = (type: string, value: string) => {
        if (type === 'availability') {
            const newAvailability = filters.availability.filter(item => item !== value);
            const newFilters = { ...filters, availability: newAvailability };
            setFilters(newFilters);
            updateAppliedFilters(newFilters);
        } else if (type === 'size') {
            const newSize = filters.size.filter(item => item !== value);
            const newFilters = { ...filters, size: newSize };
            setFilters(newFilters);
            updateAppliedFilters(newFilters);
        }
    };

    const clearAllFilters = () => {
        const newFilters = {
            availability: [],
            size: [],
            sortBy: 'featured'
        };
        setFilters(newFilters);
        setAppliedFilters([]);
    };

    // Filtering logic for products
    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // Filter by availability
        if (filters.availability.length > 0) {
            result = result.filter(product =>
                filters.availability.includes(product.availability)
            );
        }
        
        // Filter by size (only show products where the selected sizes are available)
        if (filters.size.length > 0) {
            result = result.filter(product =>
                filters.size.some(size => 
                    product.sizes.includes(size) && 
                    product.sizeStock[size]?.available
                )
            );
        }

        // Sorting logic
        if (filters.sortBy === "a-z") {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === "z-a") {
            result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        } else if (filters.sortBy === "price-low-high") {
            result = [...result].sort((a, b) => a.price.current - b.price.current);
        } else if (filters.sortBy === "price-high-low") {
            result = [...result].sort((a, b) => b.price.current - a.price.current);
        }

        return result;
    }, [filters, allProducts]);

    const totalProducts = allProducts.length;
    const filteredCount = filteredProducts.length;

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(filteredProducts);
        }
    }, [filteredProducts, onFilterChange]);

    return (
        <div className="w-full bg-white p-4 md:p-6 mx-auto max-w-7xl">
            <h2 className="text-gray-900 text-lg md:text-xl font-bold mb-4">Filter Products</h2>
            
            {/* Main Filter Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6 lg:items-start">
                {/* Sort By - Left Side */}
                <div className="lg:w-1/4 flex-shrink-0">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="w-full font-bold text-sm md:text-base cursor-pointer transition-colors duration-200 px-3 md:px-4 py-2 text-white bg-purple-600 border border-purple-500 rounded-md data-[state=open]:bg-purple-700 data-[state=open]:text-gray-300">
                                    <SortAsc className="w-4 h-4 mr-2" />
                                    Sort By
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-80 p-4 bg-white rounded-lg shadow-lg border">
                                        <h3 className="font-bold text-gray-900 mb-3">Sort By</h3>
                                        <div className="space-y-2">
                                            {sortOptions.map((option) => (
                                                <label key={option.value} className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        name="sortBy"
                                                        value={option.value}
                                                        checked={filters.sortBy === option.value}
                                                        onChange={() => handleSortChange(option.value)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-3 text-gray-700 text-sm">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Filters - Right Side */}
                <div className="lg:w-3/4 flex flex-col">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 lg:justify-end">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="w-full font-bold text-sm md:text-base cursor-pointer transition-colors duration-200 px-3 md:px-4 py-2 text-white bg-blue-600 border border-blue-500 rounded-md data-[state=open]:bg-blue-700 data-[state=open]:text-gray-300">
                                        <FilterIcon className="w-4 h-4 mr-2" />
                                        Availability
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-52 p-4 bg-white rounded-lg shadow-lg border">
                                            <h3 className="font-bold text-gray-900 mb-3">Availability</h3>
                                            <div className="space-y-3">
                                                {availabilityOptions.map((option) => (
                                                    <label key={option.value} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={filters.availability.includes(option.value)}
                                                                onChange={() => handleAvailabilityChange(option.value)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                            />
                                                            <span className="ml-3 text-gray-700 text-sm">{option.label}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">({option.count})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="w-full font-bold text-sm md:text-base cursor-pointer transition-colors duration-200 px-3 md:px-4 py-2 text-white bg-green-600 border border-green-500 rounded-md data-[state=open]:bg-green-700 data-[state=open]:text-gray-300">
                                        <FilterIcon className="w-4 h-4 mr-2" />
                                        Size
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-44 p-3 bg-white rounded-lg shadow-lg border overflow-hidden">
                                            <h3 className="font-bold text-gray-900 mb-3 text-sm">Size</h3>
                                            <div className="space-y-2">
                                                {sizeOptions.map((option) => (
                                                    <label key={option.value} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={filters.size.includes(option.value)}
                                                                onChange={() => handleSizeChange(option.value)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                            />
                                                            <span className="ml-2 text-gray-700 text-sm">{option.label}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">({option.count})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Applied Filters and Clear All - Now always directly below the filter buttons */}
                    {(appliedFilters.length > 0 || (filters.availability.length > 0 || filters.size.length > 0)) && (
                        <div className="mt-4 flex flex-col gap-2">
                            {appliedFilters.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-gray-900 font-medium">Applied Filters:</span>
                                    {appliedFilters.map((filter) => (
                                        <div
                                            key={`${filter.type}-${filter.value}`}
                                            className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm"
                                        >
                                            <span>{filter.label}</span>
                                            <button
                                                onClick={() => removeFilter(filter.type, filter.value)}
                                                className="rounded-full p-1 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={clearAllFilters}
                                className="text-blue-600 text-sm underline transition-colors self-start"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            <div className="text-gray-700 text-sm mb-4">
                Showing {filteredCount} product{filteredCount !== 1 ? "s" : ""}
                {filteredCount !== totalProducts && ` (filtered from ${totalProducts} total)`}
            </div>
        </div>
    );
}
