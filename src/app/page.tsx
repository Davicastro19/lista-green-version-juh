'use client';

import { motion } from "framer-motion";


import { HeroCarousel } from '@/components/hero-carousel';

import SliderCards from '@/components/slider-cards';




import AnimatedCurveBox from "@/components/animadet-curve";
import AreaCarousel from "@/components/areaa-carousel";
import Separator from "@/components/sepa-rator";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const buildSearchURL = ({
    text = '',
    type = 'companies',
    state = '',
    areas = [],
    page = 1,
  }: {
    text?: string;
    type?: 'companies' | 'lists';
    state?: string;
    areas?: string[];
    page?: number;
  }) => {
    const params = new URLSearchParams();
    if (text) params.set('text', text);
    if (areas.length) params.set('areas', areas.join(','));
    if (state) params.set('state', state);
    params.set('type', type);
    params.set('page', page.toString());

    return `/busca?${params.toString()}`;
  };

  const handleSearchClick = () => {
    router.push(buildSearchURL({ text: search, type: 'companies' }));
  };


  return (
    <>
      <HeroCarousel />
      <Separator />
      <div className="bg-[var(--bggreen)] flex justify-center py-12">

        <div className="max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 py-12 md:py-28">
            <div className="w-full md:w-3/5">
              <Image className="rounded-2xl" src="/images/landingPage/busc.jpg" width={500} height={300} alt="Busca" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-bold text-[var(--darkgreenhome)]">Conectando Sustentabilidade, Construindo um Futuro Verde</h1>
              <p className="text-gray-600 text-sm lg:text-lg mt-4">Encontre e conecte-se com ofertantes de produtos e serviços sustentáveis de forma simples e rápida.</p>
              <p className="text-gray-600 text-sm lg:text-lg mt-2">Promova um estilo de vida consciente e contribua para um futuro equilibrado com a Lista Green.</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <AreaCarousel />
      <Separator />
      <div className="bg-[var(--bggreen)] flex justify-center py-12">
        <div className="max-w-7xl px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 py-12 md:py-28">
            <div className="text-center md:text-left">
              <h1 className=" md:text-2xl font-bold text-[var(--darkgreenhome)]">Busca Green</h1>
              <p className="text-gray-600 text-sm lg:text-lg mt-4">Nossa busca avançada permite que você encontre produtos, artigos e negócios Greens em um só lugar.</p>
              <div className="mt-4 flex bg-gray-200 rounded-full shadow-md p-2">
                <input
                  className="flex-1 bg-transparent outline-none text-sm lg:text-lg p-2 text-gray-700"
                  type="text"
                  placeholder="Buscar por negócio, lista ou artigo"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <motion.button
                  className=" cursor-pointer rounded-full w-[30%] py-2 text-md lg:text-lg font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)]  shadow-md transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSearchClick}
                >
                  Buscar
                </motion.button>
              </div>
            </div>
            <Image className="rounded-2xl" src="/images/landingPage/happ.jpg" width={500} height={250} alt="Felicidade" />
          </div>
        </div>
      </div>
      <Separator />
      <div className=" mx-auto px-6 py-12 flex items-center justify-center bg-[var(--graygreen)]/10">
        <div className=" max-w-7xl flex flex-col md:flex-row  gap-10 py-12 md:py-28 w-full  ">
          <Image className="rounded-2xl" src="/images/landingPage/homem.png" width={400} height={400} alt="Benefícios" />
          <div className="text-center md:text-left">
            <h1 className="text-lg md:text-2xl font-bold text-darkgreenhome">Benefícios Exclusivos</h1>
            <p className=" text-sm lg:text-lg mt-4">Junte-se à Lista Green e impulsione a mudança! Aproveite descontos em produtos sustentáveis, apoie iniciativas ecológicas e participe de eventos verdes.
            </p> <p className="text-sm lg:text-lg mt-4">
              Conecte-se com uma comunidade comprometida com um futuro sustentável.</p>


            <motion.button
              className="cursor-pointer mt-4 rounded-full w-full py-3 text-md lg:text-lg font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)]  shadow-md transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/home/member-field')}
            >
              Acessar Benefícios
            </motion.button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="bg-[var(--bggreen)] py-16 flex justify-center">
        <SliderCards />
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-center ">
        <div className="flex flex-col   py-12 md:py-28 w-full  ">

          <h1 className="text-[var(--basegreen)] font-bold text-3xl mb-4 text-left w-full">
            Vantagens do Clube Lista Green!

          </h1>
          <p className="text-[var(--basegreen)] font-bold mb-2  text-left w-full">Mais do que sustentabilidade, um clube de benefícios para você.</p>
          <div className="w-full flex justify-center md:justify-start">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full rounded-2xl"
            >
              <source src="https://i.imgur.com/8rgYknH.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="mt-2 text-sm lg:text-lg w-full">
            Somos seu guia no Mundo Sustentável, oferecendo descontos e promoções
          </p>
          <p className=" mt-2 text-sm lg:text-lg w-full">
            em uma vasta gama de produtos e serviços ecológicos. Tenha acesso a  </p>
          <p className="mt-2 text-sm lg:text-lg  text-left w-full">conteúdos exclusivos no Green Flix e participe de eventos especiais. Faça parte da nossa Rede Intencional e amplie seu impacto positivo. Estamos à disposição para tirar suas dúvidas e te ajudar a explorar todas as possibilidades do nosso Clube! Juntos, podemos construir um futuro mais sustentável, um produto e serviço de cada vez.
          </p>

        </div>
      </div>
      <Separator />
      <AnimatedCurveBox />
    </>
  );
}
