import React from "react";
import { useEffect, useState } from "react";

const banners = [
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1338bd4fc60390d8.jpg?q=60",
    title: "Big Savings Sale 🔥",
    subtitle: "Mobiles, Fashion, Electronics & More",
    btn: "Shop Now",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/b9423f4fafdeff72.jpg?q=60",
    title: "Latest Mobiles 📱",
    subtitle: "Top Brands | Best Prices",
    btn: "Explore",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/78c3cfa787e8acbe.jpg?q=60",
    title: "Fashion Fiesta 👗",
    subtitle: "Min 40% OFF on Trending Styles",
    btn: "Shop Fashion",
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div key={i} className="min-w-full relative">
            <img
              src={banner.img}
              alt="banner"
              className="w-full h-[280px] object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute top-1/2 left-16 -translate-y-1/2 text-white">
              <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
                {banner.title}
              </h1>
              <p className="text-lg mb-4 drop-shadow-md">
                {banner.subtitle}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium">
                {banner.btn}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
