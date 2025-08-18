import FilteredProductGrid from "@/components/FilteredProductGrid";
import Footer from "@/components/Footer";

export default function ProductPage() {
  return (
    <div className="min-h-screen">
      <main>
        <div className="max-w-full px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
            <p className="text-gray-600 mb-8">
              From casual wear to premium tracksuits, we have everything you need to elevate your style.
            </p>
          </div>

          <FilteredProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
