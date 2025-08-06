"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useFetch from "@/shared/api/swrfetcher";
import { IBanner } from "@/shared/interfaces/IBanner";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function BannerSlider() {
  const { data: banners, isLoading } = useFetch<IBanner[]>(`/banners`,{revalidateOnFocus: false});
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (isLoading)
    return <div className="w-full h-[160px] bg-gray-200 animate-pulse rounded-2xl" />;

  return (
    <div className="relative w-full mx-auto h-[210px] lg:h-[230px]">
      {/* Embla Carousel com autoplay */}
      <div ref={emblaRef} className="overflow-hidden ">
        <Carousel plugins={[Autoplay({ delay: 1900 })]}>
          <CarouselContent>
            {banners && [...banners, ...banners].map((item: IBanner, index: number) => (
              <CarouselItem key={index} className="w-full sm:basis-1/4 sm:m-4 sm:px-2 sm:h-auto">
                <div className="overflow-hdden">
                  <Image
                    src={item.linkImage}
                    alt={item.title}
                    width={400}
                    height={100}
                    className="w-full h-[200px] object-cover cursor-pointer rounded-2xl"
                    onClick={() => router.push(item.title)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default BannerSlider;
