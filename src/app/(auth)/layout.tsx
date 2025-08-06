"use client";

import { MotionCenter } from "@/components/motion-center";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Fundo Animado */}
      <MotionCenter
className="absolute inset-0"
      />

      {/* Mobile Header */}
      <div className="flex flex-row  md:hidden  bg-cover bg-center z-10 py-2 ">
          <button onClick={()=> router.push('/')} className="bg-transparent">
              <ChevronLeftIcon size={40} className="text-white" aria-label="Voltar" />
            </button>


      </div>

      {/* Desktop Left Section */}
      <div className="hidden md:flex flex-1 relative z-10">
        <div className="relative flex items-center justify-center w-full">

          <Image
            width={460}
            height={100}
            alt="Logo do Listagreen"
            src="/images/logo/logo-lista-texto.svg"
            className="w-[200px] sm:w-[300px] md:w-[370px] lg:w-[460px]"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white flex items-center justify-center p-4 relative z-20">
        <div className="w-full max-w-[500px] p-4 pt-4 md:pt-24 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
