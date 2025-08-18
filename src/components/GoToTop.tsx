"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 ease-out transform hover:scale-110 hover:shadow-xl active:scale-95"
          aria-label="Go to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
