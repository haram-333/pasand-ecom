import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { SearchHistoryProvider } from "@/components/SearchHistoryContext";
import { SizeModalProvider } from "@/components/SizeModalContext";
import NavigationWrapper from "@/components/NavigationWrapper";

export const metadata = {
  title: "Broncoo - Premium Streetwear & Tracksuits",
  description: "Discover premium streetwear, tracksuits, and casual wear. From classic designs to limited editions, elevate your style with Broncoo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased"
      suppressHydrationWarning>
        <CartProvider>
          <SearchHistoryProvider>
            <SizeModalProvider>
              <NavigationWrapper>
                {children}
              </NavigationWrapper>
            </SizeModalProvider>
          </SearchHistoryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
