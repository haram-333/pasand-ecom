"use client";
import { useState } from "react";

const messages = [
  "🆓🚚 Free Shipping Above 5000 PKR For Pakistan",
  "🤝 Efficient customer care",
  "⇄ Easy Returns And Exchanges"
];

export default function TopStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const handlePrev = () => {
    setDirection("down");
    setCurrentIndex((prev) =>
      prev === 0 ? messages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection("up");
    setCurrentIndex((prev) =>
      prev === messages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="h-10 flex items-center justify-center relative w-full">
      {/* Left Chevron */}
      <button
        onClick={handlePrev}
        className="
          absolute 
          left-2 
          sm:left-[calc(50%-220px)] 
          cursor-pointer 
          select-none 
          text-lg 
          z-10
          flex
          items-center
          justify-center
          h-full
        "
        aria-label="Previous"
      >
        &lt;
      </button>

      {/* Text Container */}
      <div className="
        w-full 
        max-w-[400px] 
        text-center 
        overflow-hidden 
        px-10 
        sm:px-5 
        flex 
        items-center 
        justify-center
        h-full
      ">
        <div
          key={currentIndex}
          className={`transition-all duration-500 ${
            direction === "up"
              ? "animate-slide-up"
              : "animate-slide-down"
          }`}
        >
          {messages[currentIndex]}
        </div>
      </div>

      {/* Right Chevron */}
      <button
        onClick={handleNext}
        className="
          absolute 
          right-2 
          sm:right-[calc(50%-220px)] 
          cursor-pointer 
          select-none 
          text-lg 
          z-10
          flex
          items-center
          justify-center
          h-full
        "
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
