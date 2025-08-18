import React from "react";
import Hero from "@/components/Hero";
import KidFilteredProductGrid from "@/components/KidFilteredProductGrid";

export default function BroncooKidsPage() {
  return (
    <main>
      <Hero title="Broncoo Kids" />
      <div className="max-w-full px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
        <KidFilteredProductGrid />
      </div>
    </main>
  );
}
