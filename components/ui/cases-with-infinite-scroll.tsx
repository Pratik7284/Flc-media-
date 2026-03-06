"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CaseProps {
  logos: { name: string; image: string }[];
}

function Case({ logos }: CaseProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000); // Slower for readability

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {logos.map((partner, index) => (
                <CarouselItem className="basis-1/2 md:basis-1/4 lg:basis-1/6" key={index}>
                  <div className="flex rounded-xl aspect-square bg-white/5 border border-white/10 items-center justify-center p-6 group hover:bg-white transition-all duration-500">
                    <img 
                      src={partner.image} 
                      alt={partner.name} 
                      className="max-w-full max-h-full object-contain filter brightness-200 group-hover:brightness-100 transition-all duration-500"
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

export { Case };
