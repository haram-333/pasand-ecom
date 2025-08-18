import React from "react";

interface HeroProps {
  title: string;
  backgroundImage?: string;
}

export default function Hero({ 
  title, 
  backgroundImage = "/hero.webp" 
}: HeroProps) {
  return (
    <div 
      className="relative h-[75vh] min-h-[550px] w-full bg-cover bg-center bg-no-repeat pt-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay for better text readability and reduced opacity */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content positioned at bottom left */}
      <div className="absolute bottom-8 left-8 text-white">
        <h1 className="text-xl md:text-6xl font-bold mb-2 drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
