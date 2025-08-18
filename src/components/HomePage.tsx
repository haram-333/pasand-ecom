"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [borderProgress, setBorderProgress] = useState(0);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel images
  const carouselImages = [
    { desktop: "/images/home/1.webp", mobile: "/images/home-mobile/mobile-1.webp" },
    { desktop: "/images/home/2.webp", mobile: "/images/home-mobile/mobile-2.webp" },
    { desktop: "/images/home/3.webp", mobile: "/images/home-mobile/mobile-3.webp" },
    { desktop: "/images/home/4.webp", mobile: "/images/home-mobile/mobile-4.webp" },
  ];

  // Category showcase data
  const categories = [
    {
      name: "Summer Tracksuits",
      image: "/images/home/1.webp",
      mobileImage: "/images/home-mobile/mobile-1.webp",
      href: "/summer-tracksuits"
    },
    {
      name: "Trousers",
      image: "/images/home/2.webp",
      mobileImage: "/images/home-mobile/mobile-2.webp",
      href: "/trousers"
    },
    {
      name: "Tees & Polos",
      image: "/images/home/3.webp",
      mobileImage: "/images/home-mobile/mobile-3.webp",
      href: "/tees-polos"
    },
    {
      name: "Kids Collection",
      image: "/images/home/4.webp",
      mobileImage: "/images/home-mobile/mobile-4.webp",
      href: "/broncoo-kids"
    }
  ];

  // Top performers (first 4 products)
  const topPerformers = products.slice(0, 4);

  // FAQ data
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in their original condition with tags attached. Returns are free and easy to process."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. We also offer express shipping options for faster delivery."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within Pakistan only. We're working on expanding our international shipping options."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers. All payments are processed securely."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email and SMS to monitor your delivery."
    }
  ];

  // Reviews data
  const reviews = [
    {
      name: "Ahmed Khan",
      rating: 5,
      comment: "Amazing quality tracksuits! The fabric is so comfortable and the fit is perfect. Will definitely buy again!"
    },
    {
      name: "Fatima Ali",
      rating: 5,
      comment: "Love the kids collection! My son looks so stylish in these clothes. Great value for money."
    },
    {
      name: "Usman Hassan",
      rating: 5,
      comment: "Fast delivery and excellent customer service. The trousers fit perfectly and the quality is outstanding."
    }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

    // Auto-advance carousel and border animation
  useEffect(() => {
    // Clear any existing timer
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
    }
    
    // Start new timer
    autoAdvanceTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      setBorderProgress(0);
    }, 5000);
    
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [carouselImages.length]);

  // Border progress animation
  useEffect(() => {
    const borderTimer = setInterval(() => {
      setBorderProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(borderTimer);
  }, [currentSlide]);

  const restartAutoAdvance = () => {
    // Clear existing timer
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
    }
    
    // Start new timer
    autoAdvanceTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      setBorderProgress(0);
    }, 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setBorderProgress(0);
    restartAutoAdvance();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setBorderProgress(0);
    restartAutoAdvance();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setBorderProgress(0);
    restartAutoAdvance();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[95vh] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={isMobile ? image.mobile : image.desktop}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        {/* Carousel Controls - Bottom Right */}
        <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-10">
          {/* Left/Right Navigation */}
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dynamic Number Circle with Animated Border */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white text-lg font-bold bg-black/20 backdrop-blur-sm">
              {currentSlide + 1}
            </div>

            {/* Animated Border */}
            <svg className="absolute inset-0 w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="125.6"
                strokeDashoffset={`${125.6 - (125.6 * borderProgress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to Broncoo
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
              Discover premium sportswear and casual fashion
            </p>
            <Link href="/product">
              <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-2">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-full px-4 md:px-10 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From casual wear to premium tracksuits, discover your perfect style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 block"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={isMobile ? category.mobileImage : category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Category Name */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-20 bg-white">
        <div className="max-w-full px-4 md:px-10 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Performers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most loved and bestselling products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {topPerformers.map((product) => (
              <div key={product.id} className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                <ProductCard product={product} showOnlyFirst={true} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{review.comment}&rdquo;</p>
                <p className="font-semibold text-gray-900">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Stay in Touch Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Background Image */}
            <div className="relative h-96 lg:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/home/1.webp"
                alt="Stay in Touch"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Newsletter Form */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Stay in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to our newsletter for exclusive offers, new arrivals, and style tips
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// FAQ Accordion Component
function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
            <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="px-6 pb-4 text-gray-700">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
