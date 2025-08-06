import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";



const depArray = [
  {
    name: "Maria Albuquerque",
    image: "/images/landingPage/depoimentos/Maria_Delma.jpg",
    text: "O que me impactou é a forma dedicada de olhar para a preservação da natureza. Deus tudo fez perfeito, o homem deve preservá-la.",
  },
  {
    name: "Lúcia Macedo",
    image: "/images/landingPage/depoimentos/Lúcia_Macedo.jpg",
    text: "Os conhecimentos adquiridos e os produtos ofertados proporcionaram uma mudança no meu estilo de consumo!!! Mais consciente!!!!",
  },
  {
    name: "Aline Andrade",
    image: "/images/landingPage/depoimentos/Aline_Andrade.jpg",
    text: "Acredito que a LG consegue me apresentar diferentes produtos aumentando o meu leque de opções para as minhas escolhas.",
  },
  {
    name: "Cláudia Ferreira",
    image: "/images/landingPage/depoimentos/Cláudia_Ferreira.jpg",
    text: "Através das matérias exibidas no canal da Lista Green adquiro mais conhecimentos de como viver neste mundo de forma sustentável, protegendo a natureza e por consequência a nossa vida.",
  },
  {
    name: "Metilde Carvalho",
    image: "/images/landingPage/depoimentos/Metilde_Ferreira.jpg",
    text: "Através da ListaGreen aprendo cada vez mais a consumir mais conscientemente, buscando minimizar os impactos à natureza e contribuindo para um desenvolvimento sustentável.",
  },

];

export default function SliderCards() {
  return (
    <div className="flex flex-col items-center py-0 w-full">
      <h2 className="text-lg md:text-2xl font-bold text-[var(--darkgreenhome)] mb-8">
        O que estão falando sobre nós?
      </h2>

     <Carousel


       className="w-[90%]  overflow-hidden p-2 pt-2 lg:pt-20"
                plugins={[Autoplay({ delay: 1900 })]}>
        <CarouselContent>
          {depArray.map((dep, index) => (
            <CarouselItem key={`${dep.name}-${index}`} className="md:basis-1/3 lg:basis-1/3 flex flex-col px-6 md:px-20 ">
               <div className=" flex flex-row justify-center items-center content-center space-x-6">
              {dep.image && (
                <Image
                  src={dep.image}
                  alt={dep.name}
                  width={50}
                  height={10}
                  className="rounded-full mb-4 shadow-lg"
                />
              )} <p className="text-center font-semibold">{dep.name}</p>
              </div>

              <p className="text-center text-sm text-gray-700 ">{dep.text}</p>

            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
