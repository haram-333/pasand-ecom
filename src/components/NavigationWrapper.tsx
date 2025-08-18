"use client";

import { usePathname } from "next/navigation";
import TopStrip from "./TopStrip";
import Navbar from "./Navbar";
import CartSuccessMessage from "./CartSuccessMessage";
import GoToTop from "./GoToTop";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();
  const isSignInPage = pathname === "/sign-in";
  const isCheckoutPage = pathname === "/checkout";
  const isProductPage = pathname.startsWith("/product");
  const isSearchPage = pathname.startsWith("/search");

  return (
    <>
      {!isSignInPage && !isCheckoutPage && <TopStrip />}
      <div className="relative">
        {!isSignInPage && !isCheckoutPage && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <Navbar isProductPage={isProductPage || isSearchPage} />
          </div>
        )}
        <div className={`${isProductPage || isSearchPage ? 'pt-32' : ''}`}>
          {children}
        </div>
      </div>
      
      {/* Global Cart Success Message */}
      <CartSuccessMessage />
      
      {/* Go to Top Button - Don't show on checkout page */}
      {!isCheckoutPage && <GoToTop />}
    </>
  );
}
