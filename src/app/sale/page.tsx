import React from "react";
import Hero from "@/components/Hero";
import FilteredProductGrid from "@/components/FilteredProductGrid";

export default function SalePage() {
  return (
    <main>
      <Hero title="Sale" />
      <div className="max-w-full px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
        <FilteredProductGrid />
      </div>
    </main>
  );
}
