import Link from "next/link";

// Social icons are now SVGs in public/images/social
export default function Footer() {
  return (
    <footer className="bg-white text-gray-900">
      {/* First Layer */}
      <div className="max-w-full flex flex-wrap gap-8 p-6 sm:p-8 border-b border-gray-200 mt-5">
        {/* About Us */}
        <div className="flex-1 min-w-[220px] max-w-full">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-600">
            We are a fashion store bringing you the latest trends at affordable prices.
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 min-w-[180px] max-w-full">
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/product" className="hover:text-blue-600">Mens</Link></li>
            <li><Link href="/broncoo-kids" className="hover:text-blue-600">Broncoo Kids</Link></li>
            <li><Link href="/limited-edition" className="hover:text-blue-600">Limited Edition</Link></li>
            <li><Link href="/sale" className="hover:text-blue-600">Sale</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex-1 min-w-[180px] max-w-full">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Shipping & Return Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Refund Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex-1 min-w-[220px] max-w-full">
          <h3 className="text-lg font-semibold mb-4">Stay in Touch</h3>
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full rounded-lg sm:rounded-l-lg sm:rounded-r-none text-black border border-gray-300"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-700">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Second Layer - Social Links */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 py-4 border-b border-gray-200">
        <a href="#" className="hover:opacity-80 transition-opacity group">
          <img
            src="/images/socials/facebook.svg"
            alt="Facebook"
            width={28}
            height={28}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-125"
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity group">
          <img
            src="/images/socials/youtube.svg"
            alt="Youtube"
            width={28}
            height={28}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-125"
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity group">
          <img
            src="/images/socials/instagram.svg"
            alt="Instagram"
            width={28}
            height={28}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-125"
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity group">
          <img
            src="/images/socials/tiktok.svg"
            alt="Tiktok"
            width={28}
            height={28}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-125"
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity group">
          <img
            src="/images/socials/pintrest.svg"
            alt="Pinterest"
            width={28}
            height={28}
            loading="lazy"
            className="transition-transform duration-200 group-hover:scale-125"
          />
        </a>
      </div>

      {/* Third Layer */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center p-4 text-sm text-gray-500 gap-4">
        {/* Payment Logos */}
        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-7" role="list">
          <li>
            {/* Apple Pay */}
            <img
              src="/images/payments/apple-pay.svg"
              alt="Apple Pay"
              className="payment-icon"
              width={38}
              height={24}
              loading="lazy"
            />
          </li>
          <li>
            {/* Google Pay */}
            <img
              src="/images/payments/google-pay.svg"
              alt="Google Pay"
              className="payment-icon"
              width={38}
              height={24}
              loading="lazy"
            />
          </li>
          <li>
            {/* Mastercard */}
            <img
              src="/images/payments/mastercard.svg"
              alt="Mastercard"
              className="payment-icon"
              width={38}
              height={24}
              loading="lazy"
            />
          </li>
          <li>
            {/* Union Pay */}
            <img
              src="/images/payments/union-pay.svg"
              alt="Union Pay"
              className="payment-icon"
              width={38}
              height={24}
              loading="lazy"
            />
          </li>
          <li>
            {/* Visa */}
            <img
              src="/images/payments/visa.svg"
              alt="Visa"
              className="payment-icon"
              width={38}
              height={24}
              loading="lazy"
            />
          </li>
        </ul>
        {/* Copyright */}
        <p className="mt-2 md:mt-0 text-center">© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
}