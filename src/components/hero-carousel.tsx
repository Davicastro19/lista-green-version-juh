/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { MotionCenter } from "@/components/motion-center"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import useFetch from "@/shared/api/swrfetcher"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function HeroCarousel() {
  const {
    data,
    isLoading,
  } = useFetch<any[]>(
    "/banners",
    {},
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Mantém o cache por 1 minuto
      fallbackData: [], // Dados iniciais para exibição instantânea
     }
  );

  const router = useRouter()

  return (
    <MotionCenter className="relative flex h-screen w-full flex-col overflow-hidden md:flex-row">
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)]">
          <div className="absolute flex flex-col items-center text-white">
            <Image
              alt="Logo Listagreen"
              src="/images/logo/logo-lista-texto.svg"
              width={460}
              height={100}
              className="w-[300px] lg:w-[460px]"
            />
            <h1 className="text-3xl font-semibold md:text-5xl lg:text-6xl text-center">
              Conectando Pessoas e Negócios em uma Comunidade Sustentável.
            </h1>
            <p className="text-md md:text-lg lg:text-xl font-light hidden md:block">
              Descubra soluções inovadoras e construa com sustentabilidade.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="z-10 m-6 w-[95%] flex flex-col gap-2 lg:gap-8 text-lg">
            <Image
              alt="Logo Listagreen"
              src="/images/logo/logo-lista-texto.svg"
              width={460}
              height={100}
              className="w-[300px] sm:w-[300px] md:w-[370px] lg:w-[460px]"
            />
            <h1 className="text-2xl  sm:text-xl md:text-5xl lg:text-5xl text-white font-semibold">
              Conectando Pessoas e Negócios<br/> em uma Comunidade Sustentável.
            </h1>
            <p className="text-sm lg:text-lg text-white font-light">
              Descubra soluções inovadoras e construa com sustentabilidade.
            </p>
            <div className="flex flex-col gap-4">
              <motion.button
                className="cursor-pointer w-[50%] py-2 lg:py-3 text-sm lg:text-md font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)] rounded-lg shadow-md transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.href = "/login"}
              >
                Faça o login
              </motion.button>
              <motion.button
                className=" cursor-pointer w-[50%]  py-2 lg:py-3  text-sm  lg:text-md font-medium text-[var(--darkgreenhome)] bg-gradient-to-r from-white to-[#c8ffea] rounded-lg shadow-md transition-all hover:from-white hover:via-[#defff2] hover:to-[var(--basegreen)]"
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.href = "/cadastro"}
              >
                Crie sua conta
              </motion.button>
            </div>
          </div>

          <div className="w-full overflow-hidden p-2 pt-2 lg:pt-20">
            <Carousel  plugins={[Autoplay({ delay: 1900 })]}>
              <CarouselContent>
                {data?.map((item: any, index: number) => (
                  <CarouselItem key={index} className="relative  rounded-4xl h-[50vh] w-full cursor-pointer md:h-screen">
                    <div
                      className="relative h-full w-full rounded-4xl"
                      onClick={() => router.push(item.title)}
                    >
                      <Image
                        src={item.linkImage}
                        alt={item.title}
                        fill
                        className="absolute h-full w-full object-cover rounded-4xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </>
      )}
    </MotionCenter>
  )
}
