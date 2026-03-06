"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const partnerImages = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=contain&q=80",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=200&fit=contain&q=80",
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=200&fit=contain&q=80",
  "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=contain&q=80",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=contain&q=80",
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=contain&q=80",
];

function Case() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-primary font-medium tracking-wider uppercase mb-2">Our Partners</h3>
            <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
              Trusted by leading pharmaceutical brands
            </h2>
          </div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                  <div className="flex rounded-md aspect-square bg-muted items-center justify-center p-6">
                    <img 
                      src={partnerImages[index % partnerImages.length]} 
                      alt={`Partner ${index + 1}`} 
                      className="w-full h-full object-contain mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

function CaseDemo() {
  return (
    <div className="block">
      <Case />
    </div>
  );
}

export { Case, CaseDemo };
