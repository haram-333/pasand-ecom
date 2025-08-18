import React from "react";
import ProductPage from "@/components/ProductPage";
import { products } from "@/data/products";
import { kidProducts } from "@/data/kid-products";

export default async function ProductPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId) || kidProducts.find(p => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
}
