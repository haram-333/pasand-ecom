"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
  sizeStock: Record<string, { available: boolean; quantity: number } | undefined>;
}

interface SizeModalContextType {
  isOpen: boolean;
  product: Product | null;
  openSizeModal: (product: Product) => void;
  closeSizeModal: () => void;
}

const SizeModalContext = createContext<SizeModalContextType | undefined>(undefined);

export function useSizeModal() {
  const context = useContext(SizeModalContext);
  if (context === undefined) {
    throw new Error("useSizeModal must be used within a SizeModalProvider");
  }
  return context;
}

export function SizeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openSizeModal = (productData: Product) => {
    setProduct(productData);
    setIsOpen(true);
  };

  const closeSizeModal = () => {
    setIsOpen(false);
    setProduct(null);
  };

  return (
    <SizeModalContext.Provider value={{ isOpen, product, openSizeModal, closeSizeModal }}>
      {children}
      
      {/* Global Size Modal */}
      {isOpen && product && (
        <SizeModal
          isOpen={isOpen}
          onClose={closeSizeModal}
          product={{
            id: product.id,
            name: product.name,
            price: product.price.current,
            currency: product.price.currency,
            image: product.images.main,
            sizes: product.sizes,
          }}
        />
      )}
    </SizeModalContext.Provider>
  );
}
