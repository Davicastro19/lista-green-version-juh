"use client";
import Greenflix from "@/../public/images/memberField/greenflix.png";
import FourOnOne from "@/../public/images/memberField/promo_list.png";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function isMember() {




  return (
    <div className="w-full flex flex-col  items-center gap-4 p-6  pb-20 bg-white">
      {/* Header */}
      <div className="flex flex-row items-center gap-4 mb-4 w-full">
          <button onClick={() => window.location.href ='/home/gerenciar' } className="pr-0 cursor-pointer  flex flex-row text-gray-600 hover:text-gray-800 w-[13%]">
            <ChevronLeft /> <span className='hidden lg:block'>Voltar</span>
          </button>
          <span className="text-lg font-semibold w-full text-center cursor-pointer"  >Área do Membro</span>
          <div className="w-[13%]"/>
        </div>

        <p className="text-lg text-center text-[var(--darkgreen)] w-full">
          Acesse os descontos exclusivos que preparamos especialmente para você!
        </p>



      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Card Lista de Promoções */}
        <div

          className="flex items-center gap-4 p-5 w-full max-w-sm bg-[var(--basegreen)] rounded-xl cursor-pointer
          hover:bg-[var(--glowgreen)] hover:shadow-lg "
        >
          <Image
            className="rounded-md object-cover"
            src={FourOnOne}
            alt="Lista de Promoções"
            width={120}
            height={146}
          />
          <div className="flex flex-col w-full  justify-between gap-4 p-0 ">
          <div className="flex flex-col w-full">
                        <p className="font-semibold text-white text-lg">Lista de Promoções</p>
            <p className="text-sm text-white">Descontos imperdíveis</p>
            </div>

            <button
            className="  cursor-pointer px-6 py-2 text-white bg-[var(--lightgreen)] font-semibold rounded-lg self-end
            hover:bg-[var(--fulldarkgreen)] hover:scale-105 transition-all duration-200"
            onClick={() => window.location.href = "/home/lista-promocoes"}
          >
            Acessar
          </button>
          </div>
        </div>

        {/* Card Greenflix */}
        <div className="flex items-center gap-4 p-5 w-full max-w-sm  rounded-xl cursor-pointer bg-[var(--darkgreen)]  space-y-3">
          <div className="flex flex-col">
          <Image
            className="rounded-md object-cover"
            src={Greenflix}
            alt="Greenflix"
            width={120}
            height={146}
          />
          <p className="text-lg font-semibold text-white">Greenflix</p>
          </div>
          <div className="flex flex-col w-full  justify-between gap-4 p-5 ">
          <p className="text-sm text-white leading-5">
            Plataforma de streaming sustentável feita para você!
          </p>
          <button
            className="  cursor-pointer px-6 py-2 text-white bg-[var(--lightgreen)] font-semibold rounded-lg self-end
            hover:bg-[var(--fulldarkgreen)] hover:scale-105 transition-all duration-200"
            onClick={() => window.location.href ="/home/member-field/greenflix"}
          >
            Acessar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
