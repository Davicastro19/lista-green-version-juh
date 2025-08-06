'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const areasDeEspecializacao = [
  { id: '1', color: "#00D1FF", bg: "#004972", icon: '/images/assets/ui/icons/cuidadoepreservacao.png', image: '/images/cuidado-e-preservacao.png', title: 'Cuidado & Preservação' },
  { id: '2', color: "#FFDEAC", bg: "#EB8D00", icon: '/images/assets/ui/icons/construcaosustentavel.png', image: '/images/construcao-sustentavel.png', title: 'Construção Sustentável' },
  { id: '3', color: "#A3FFA6", bg: "#33A838", icon: '/images/assets/ui/icons/producaodaterra.png', image: '/images/producao-da-terra.png', title: 'Produção da Terra' },
  { id: '4', color: "#FAE058", bg: "#ffca41", icon: '/images/assets/ui/icons/designconsciente.png', image: '/images/design-consciente.png', title: 'Design Consciente' },
  { id: '5', color: "#eb8dff", bg: "#A162D3", icon: '/images/assets/ui/icons/saudeebemestar.png', image: '/images/saude-e-bem-estar.png', title: 'Saúde & Bem-Estar' },
];

// Create a full array with just 5 items (without duplication)
const uniqueAreas = areasDeEspecializacao.slice(0, 5);

const AreaCarousel = () => {
  const router = useRouter();
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  return (
    <div className="flex flex-col items-center gap-6 py-8 md:py-16">
      <h2 className="text-lg md:text-2xl font-bold text-darkgreen mb-2">Áreas de Especialização</h2>
      <div className="relative w-[85%] md:w-[70%] lg:w-[60%] max-w-4xl mx-auto  ">
        <Carousel
          opts={{
            align: "center",

            loop: true,
            dragFree: false,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
          plugins={[autoplayRef.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-4">
            {[...uniqueAreas, ...uniqueAreas, ...uniqueAreas].map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-4/4 md:basis-1/2 lg:basis-1/3 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => router.push(
                  `/busca?text=&type=companies&state=&areas=${encodeURIComponent(category.title)}&page=1`
                )}

              >
                <div className="relative flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] p-6">
                  <div className="w-full rounded-t-lg overflow-hidden aspect-square">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={240}
                      height={240}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className={cn("w-full flex items-center justify-center gap-2 py-2.5 rounded-b-lg", category.bg)}>
                    <div className="flex items-center justify-center rounded-full w-6 h-6" style={{ backgroundColor: category.bg }}>
                      <Image
                        src={category.icon}
                        alt={category.title}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-basegreen font-bold text-sm">{category.title}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>
      </div>
    </div>
  );
};

export default AreaCarousel;
