"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet";
import { useCart } from "./CartContext";
import CartMenu from "./CartMenu";
import SearchModal from "./SearchModal";

interface NavbarProps {
    isProductPage?: boolean;
}

export default function Navbar({ isProductPage = false }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { getTotalItems } = useCart();

    const handleSearchClick = () => setSearchOpen(true);
    const handleCartClick = () => setCartOpen(true);

    // Dynamic text and icon colors based on page type
    const textColor = isProductPage ? "text-black" : "text-white";
    const iconColor = isProductPage ? "text-black" : "text-white";
    const hoverColor = isProductPage ? "hover:text-gray-600" : "hover:text-gray-300";

    return (
        <>
            <style jsx global>{`
                @media (min-width: 767px) and (max-width: 828px) {
                    .navbar-nav-link,
                    .navbar-nav-link-trigger,
                    .navbar-nav-link-listitem {
                        font-size: 0.92rem !important;
                    }
                }
            `}</style>
            <nav className={`w-full ${isProductPage ? 'bg-white' : ''}`}>
                {/* Mobile Navbar */}
                <div className="md:hidden w-full flex items-center justify-between h-16 px-4">
                    {/* Hamburger */}
                    <button
                        className="flex flex-col justify-center items-center w-10 h-10"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className={`block w-6 h-0.5 mb-1 ${isProductPage ? 'bg-black' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 mb-1 ${isProductPage ? 'bg-black' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 ${isProductPage ? 'bg-black' : 'bg-white'}`}></span>
                    </button>
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/logo.avif"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                            loading="lazy"
                        />
                    </div>
                    {/* Icons */}
                    <div className={`flex items-center space-x-2 text-lg ${iconColor}`}>
                        {/* Search Icon */}
                        <button
                            type="button"
                            aria-label="Open search"
                            className="p-0 bg-transparent border-none focus:outline-none"
                            onClick={handleSearchClick}
                        >
                            <svg
                                className="text-2xl cursor-pointer"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M20.5 20.5L14.5 14.5"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="6.25"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                        />
                            </svg>
                        </button>
                        {/* User Icon */}
                        <Link href="/sign-in" aria-label="Sign in">
                            <svg
                                className="text-2xl cursor-pointer"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="9"
                                    r="5"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        {/* Cart Icon */}
                        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open cart"
                                    className="p-0 bg-transparent border-none focus:outline-none relative"
                                    onClick={handleCartClick}
                                >
                                    <svg
                                        className="text-2xl cursor-pointer"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V11"
                                            stroke={isProductPage ? "black" : "white"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 21H20L19 8H5L4 21Z"
                                            stroke={isProductPage ? "black" : "white"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {/* Cart Badge */}
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-md p-0">
                                <CartMenu onClose={() => setCartOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                {/* Mobile Menu Sheet */}
                <div
                    className={`fixed inset-0 z-50 flex`}
                    style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
                >
                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 bg-black transition-opacity duration-300`}
                        style={{
                            opacity: mobileMenuOpen ? 0.4 : 0,
                            pointerEvents: mobileMenuOpen ? "auto" : "none",
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Sheet Content */}
                    <div
                        className={`
                            relative h-full bg-white w-3/4 max-w-xs p-6 flex flex-col ml-auto
                            transition-transform duration-300 ease-in-out
                            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
                        `}
                        style={{
                            willChange: "transform",
                            pointerEvents: mobileMenuOpen ? "auto" : "none",
                        }}
                    >
                        <button
                            className="self-end mb-6"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
                                <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="font-bold text-base px-2 py-2 cursor-pointer hover:text-gray-500 transition-colors duration-200 navbar-nav-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <div>
                                <div className="font-bold text-base px-2 py-2 cursor-pointer hover:text-gray-500 transition-colors duration-200 navbar-nav-link">
                                    Mens
                                </div>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>
                                        <Link
                                            href="/summer-tracksuits"
                                            className="cursor-pointer py-2 text-sm font-medium hover:bg-gray-100 px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Summer Tracksuits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/trousers"
                                            className="cursor-pointer py-2 text-sm font-medium hover:bg-gray-100 px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Trousers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/tees-polos"
                                            className="cursor-pointer py-2 text-sm font-medium hover:bg-gray-100 px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Tees & Polos
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="font-bold text-base px-2 py-2 cursor-pointer hover:text-gray-500 transition-colors duration-200 navbar-nav-link">
                                    Broncoo Kids
                                </div>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>
                                        <Link
                                            href="/broncoo-kids"
                                            className="cursor-pointer py-2 text-sm font-medium hover:bg-gray-100 px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Summer Tracksuits
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/limited-edition"
                                className="font-bold text-base px-2 py-2 cursor-pointer hover:text-gray-500 transition-colors duration-200 navbar-nav-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Limited Edition
                            </Link>
                            <Link
                                href="/sale"
                                className="font-bold text-base px-2 py-2 cursor-pointer hover:text-gray-500 transition-colors duration-200 navbar-nav-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                SALE
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Desktop Navbar */}
                <div className="w-full mx-auto px-4 sm:px-8 md:px-10 lg:px-14 flex items-center justify-between h-20 hidden md:flex">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/logo.avif"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="object-contain
                                w-[70px] h-[70px]
                                sm:w-[90px] sm:h-[90px]
                                md:w-[110px] md:h-[110px]
                                lg:w-[120px] lg:h-[120px]
                                transition-all duration-200"
                            priority
                        />
                    </div>
                    {/* Center Navigation */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href="/"
                                    className={`font-bold text-base md:text-[1.05rem] lg:text-lg md:px-2 lg:px-4 py-2 cursor-pointer transition-colors duration-200 navbar-nav-link ${textColor} ${hoverColor}`}
                                >
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`font-bold text-base md:text-[1.05rem] lg:text-lg cursor-pointer transition-colors duration-200 md:px-2 lg:px-4 navbar-nav-link-trigger bg-transparent border-none data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent ${textColor} ${hoverColor} data-[state=open]:${hoverColor}`}
                                >
                                    Mens
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-[220px] md:w-[250px]">
                                        <ul className="mt-4 space-y-3 w-full mx-0">
                                            <li>
                                                <Link
                                                    href="/summer-tracksuits"
                                                    className="w-full cursor-pointer my-6 md:my-8 py-3 md:py-4 text-base md:text-lg font-bold hover:bg-gray-100 px-4 md:px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                                >
                                                    Summer Tracksuits
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/trousers"
                                                    className="w-full cursor-pointer my-6 md:my-8 py-3 md:py-4 text-base md:text-lg font-bold hover:bg-gray-100 px-4 md:px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                                >
                                                    Trousers
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/tees-polos"
                                                    className="w-full cursor-pointer my-6 md:my-8 py-3 md:py-4 text-base md:text-lg font-bold hover:bg-gray-100 px-4 md:px-2 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                                >
                                                    Tees & Polos
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`font-bold text-base md:text-[1.05rem] lg:text-lg cursor-pointer transition-colors duration-200 md:px-2 lg:px-4 navbar-nav-link-trigger bg-transparent border-none data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent ${textColor} ${hoverColor} data-[state=open]:${hoverColor}`}
                                >
                                    Broncoo Kids
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-[220px] md:w-[250px] flex flex-col items-center">
                                        <ul className="space-y-2 w-full flex flex-col items-center">
                                            <li>
                                                <Link
                                                    href="/broncoo-kids"
                                                    className="w-full text-center cursor-pointer py-2 md:py-3 text-base md:text-lg font-bold hover:bg-gray-100 !px-0 rounded transition-colors duration-200 navbar-nav-link-listitem block"
                                                >
                                                    Summer Tracksuits
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/limited-edition"
                                    className={`font-bold text-base md:text-[1.05rem] lg:text-lg md:px-2 lg:px-4 py-2 cursor-pointer transition-colors duration-200 navbar-nav-link ${textColor} ${hoverColor}`}
                                >
                                    Limited Edition
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/sale"
                                    className={`font-bold text-base md:text-[1.05rem] lg:text-lg md:px-2 lg:px-4 py-2 cursor-pointer transition-colors duration-200 navbar-nav-link ${textColor} ${hoverColor}`}
                                >
                                    SALE
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    {/* Icons */}
                    <div className={`flex items-center space-x-3 md:space-x-4 text-lg ${iconColor}`}>
                        {/* Search Icon */}
                        <button
                            type="button"
                            aria-label="Open search"
                            className="p-0 bg-transparent border-none focus:outline-none"
                            onClick={handleSearchClick}
                        >
                            <svg
                                className="text-3xl md:text-4xl cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M20.5 20.5L14.5 14.5"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="6.25"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        {/* User Icon */}
                        <Link href="/sign-in" aria-label="Sign in">
                            <svg
                                className="text-3xl md:text-4xl cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="9"
                                    r="5"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21"
                                    stroke={isProductPage ? "black" : "white"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        {/* Cart Icon */}
                        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open cart"
                                    className="p-0 bg-transparent border-none focus:outline-none relative"
                                    onClick={handleCartClick}
                                >
                                    <svg
                                        className="text-3xl md:text-4xl cursor-pointer"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V11"
                                            stroke={isProductPage ? "black" : "white"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 21H20L19 8H5L4 21Z"
                                            stroke={isProductPage ? "black" : "white"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {/* Cart Badge */}
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-md p-0">
                                <CartMenu onClose={() => setCartOpen(false)} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
            
            {/* Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
