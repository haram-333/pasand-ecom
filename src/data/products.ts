export const products = [
  {
    id: 1,
    name: "Broncoo Spandex Button Up Set",
    images: {
      main: "/images/products/broncoo/main-1.webp",
      hover: "/images/products/broncoo/hover-1.webp",
    },
    discount: 52,
    price: {
      current: 3290,
      original: 6980,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 5 },
      "M": { available: true, quantity: 8 },
      "L": { available: true, quantity: 6 },
      "XL": { available: true, quantity: 4 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 2,
    name: "Broncoo Premium Tracksuit",
    images: {
      main: "/images/products/broncoo/main-2.webp",
      hover: "/images/products/broncoo/hover-2.webp",
    },
    discount: 40,
    price: {
      current: 3990,
      original: 6650,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 8 },
      "XL": { available: true, quantity: 3 }
    }
  },
  {
    id: 3,
    name: "Broncoo Classic Hoodie",
    images: {
      main: "/images/products/broncoo/main-3.webp",
      hover: "/images/products/broncoo/hover-3.webp",
    },
    discount: 35,
    price: {
      current: 2590,
      original: 3990,
      currency: "PKR",
    },
    sizes: ["M", "L", "XL", "XXL"],
    availability: "out-of-stock",
    sizeStock: {
      "M": { available: false, quantity: 0 },
      "L": { available: false, quantity: 0 },
      "XL": { available: false, quantity: 0 },
      "XXL": { available: false, quantity: 0 }
    }
  },
  {
    id: 4,
    name: "Broncoo Essential T-Shirt",
    images: {
      main: "/images/products/broncoo/main-4.webp",
      hover: "/images/products/broncoo/hover-4.webp",
    },
    discount: 25,
    price: {
      current: 1290,
      original: 1720,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 10 },
      "M": { available: true, quantity: 12 },
      "L": { available: true, quantity: 8 },
      "XL": { available: true, quantity: 6 },
      "XXL": { available: true, quantity: 4 }
    }
  },
  {
    id: 5,
    name: "Broncoo Sport Joggers",
    images: {
      main: "/images/products/broncoo/main-5.webp",
      hover: "/images/products/broncoo/hover-5.webp",
    },
    discount: 30,
    price: {
      current: 1890,
      original: 2700,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 3 },
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 7 },
      "XL": { available: true, quantity: 4 }
    }
  },
  {
    id: 6,
    name: "Broncoo Urban Streetwear Set",
    images: {
      main: "/images/products/broncoo/main-1.webp",
      hover: "/images/products/broncoo/hover-1.webp",
    },
    discount: 45,
    price: {
      current: 3590,
      original: 6520,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 5 },
      "XL": { available: true, quantity: 3 },
      "XXL": { available: true, quantity: 2 }
    }
  },
  {
    id: 7,
    name: "Broncoo Athletic Performance Wear",
    images: {
      main: "/images/products/broncoo/main-2.webp",
      hover: "/images/products/broncoo/hover-2.webp",
    },
    discount: 38,
    price: {
      current: 2890,
      original: 4660,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 5 },
      "M": { available: true, quantity: 7 },
      "L": { available: true, quantity: 6 },
      "XL": { available: true, quantity: 4 }
    }
  },
  {
    id: 8,
    name: "Broncoo Casual Comfort Hoodie",
    images: {
      main: "/images/products/broncoo/main-3.webp",
      hover: "/images/products/broncoo/hover-3.webp",
    },
    discount: 42,
    price: {
      current: 2190,
      original: 3780,
      currency: "PKR",
    },
    sizes: ["M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "M": { available: true, quantity: 4 },
      "L": { available: true, quantity: 6 },
      "XL": { available: true, quantity: 5 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 9,
    name: "Broncoo Premium Cotton Tee",
    images: {
      main: "/images/products/broncoo/main-4.webp",
      hover: "/images/products/broncoo/hover-4.webp",
    },
    discount: 28,
    price: {
      current: 1490,
      original: 2070,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 8 },
      "M": { available: true, quantity: 10 },
      "L": { available: true, quantity: 7 },
      "XL": { available: true, quantity: 5 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 10,
    name: "Broncoo Active Lifestyle Pants",
    images: {
      main: "/images/products/broncoo/main-5.webp",
      hover: "/images/products/broncoo/hover-5.webp",
    },
    discount: 33,
    price: {
      current: 2290,
      original: 3420,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 3 },
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 6 },
      "XL": { available: true, quantity: 4 }
    }
  },
  {
    id: 11,
    name: "Broncoo Street Style Collection",
    images: {
      main: "/images/products/broncoo/main-1.webp",
      hover: "/images/products/broncoo/hover-1.webp",
    },
    discount: 50,
    price: {
      current: 2990,
      original: 5980,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 3 },
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 4 },
      "XL": { available: true, quantity: 3 },
      "XXL": { available: true, quantity: 2 }
    }
  },
  {
    id: 12,
    name: "Broncoo Performance Training Gear",
    images: {
      main: "/images/products/broncoo/main-2.webp",
      hover: "/images/products/broncoo/hover-2.webp",
    },
    discount: 36,
    price: {
      current: 2690,
      original: 4200,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 5 },
      "XL": { available: true, quantity: 3 }
    }
  },
  {
    id: 13,
    name: "Broncoo Relaxed Fit Sweatshirt",
    images: {
      main: "/images/products/broncoo/main-3.webp",
      hover: "/images/products/broncoo/hover-3.webp",
    },
    discount: 39,
    price: {
      current: 1890,
      original: 3100,
      currency: "PKR",
    },
    sizes: ["M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 7 },
      "XL": { available: true, quantity: 4 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 14,
    name: "Broncoo Signature Collection Tee",
    images: {
      main: "/images/products/broncoo/main-4.webp",
      hover: "/images/products/broncoo/hover-4.webp",
    },
    discount: 26,
    price: {
      current: 1390,
      original: 1880,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 9 },
      "M": { available: true, quantity: 11 },
      "L": { available: true, quantity: 8 },
      "XL": { available: true, quantity: 6 },
      "XXL": { available: true, quantity: 4 }
    }
  },
  {
    id: 15,
    name: "Broncoo Modern Fit Trousers",
    images: {
      main: "/images/products/broncoo/main-5.webp",
      hover: "/images/products/broncoo/hover-5.webp",
    },
    discount: 31,
    price: {
      current: 2490,
      original: 3610,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 5 },
      "XL": { available: true, quantity: 3 }
    }
  },
  {
    id: 16,
    name: "Broncoo Elite Sportswear Set",
    images: {
      main: "/images/products/broncoo/main-1.webp",
      hover: "/images/products/broncoo/hover-1.webp",
    },
    discount: 47,
    price: {
      current: 3790,
      original: 7150,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 3 },
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 4 },
      "XL": { available: true, quantity: 3 },
      "XXL": { available: true, quantity: 2 }
    }
  },
  {
    id: 17,
    name: "Broncoo Dynamic Training Wear",
    images: {
      main: "/images/products/broncoo/main-2.webp",
      hover: "/images/products/broncoo/hover-2.webp",
    },
    discount: 34,
    price: {
      current: 2790,
      original: 4230,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 5 },
      "XL": { available: true, quantity: 3 }
    }
  },
  {
    id: 18,
    name: "Broncoo Comfort Zone Sweatshirt",
    images: {
      main: "/images/products/broncoo/main-3.webp",
      hover: "/images/products/broncoo/hover-3.webp",
    },
    discount: 41,
    price: {
      current: 1990,
      original: 3370,
      currency: "PKR",
    },
    sizes: ["M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "M": { available: true, quantity: 5 },
      "L": { available: true, quantity: 7 },
      "XL": { available: true, quantity: 4 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 19,
    name: "Broncoo Heritage Collection Tee",
    images: {
      main: "/images/products/broncoo/main-4.webp",
      hover: "/images/products/broncoo/hover-4.webp",
    },
    discount: 27,
    price: {
      current: 1590,
      original: 2180,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 7 },
      "M": { available: true, quantity: 9 },
      "L": { available: true, quantity: 6 },
      "XL": { available: true, quantity: 4 },
      "XXL": { available: true, quantity: 3 }
    }
  },
  {
    id: 20,
    name: "Broncoo Contemporary Fit Pants",
    images: {
      main: "/images/products/broncoo/main-5.webp",
      hover: "/images/products/broncoo/hover-5.webp",
    },
    discount: 32,
    price: {
      current: 2690,
      original: 3950,
      currency: "PKR",
    },
    sizes: ["S", "M", "L", "XL"],
    availability: "in-stock",
    sizeStock: {
      "S": { available: true, quantity: 4 },
      "M": { available: true, quantity: 6 },
      "L": { available: true, quantity: 5 },
      "XL": { available: true, quantity: 3 }
    }
  }
];
