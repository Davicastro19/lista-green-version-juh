'use client';

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { MotionCenter } from './motion-center';
export default function AnimatedCurveBox() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden w-full ">
      {/* Fundo animado */}
      <MotionCenter className="relative flex py-28 pt-6 w-full flex-col overflow-hidden md:flex-row ">
        <div className="flex flex-col items-center gap-4 mt-0 w-full  ">
          <h1 className="text-white text-xl sm:text-xl md:text-5xl lg:text-5xl text-center w-full">
            Conheça mais sobre a nossa história
          </h1>


          <motion.button
            className="cursor-pointer w-[60%] lg:w-[20%] py-3 text-md font-medium text-white bg-gradient-to-r from-[var(--darkgreen)] via-[var(--basegreen)] to-[var(--lightgreen)] rounded-lg shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.location.href = "/sobrenos"}
          >
            Sobre nós
          </motion.button>

          <motion.button
            onClick={() => router.push('/cadastro')}
            className="cursor-pointer w-[60%] lg:w-[20%] py-3 text-md font-medium text-[var(--darkgreen)] bg-gradient-to-r from-white to-[#c8ffea] rounded-lg shadow-md transition-all hover:from-white hover:via-[#defff2] hover:to-[var(--basegreen)]"
            whileHover={{ scale: 1.05 }} >
            Crie sua conta
          </motion.button>
        </div>
      </MotionCenter>

      {/* Curva */}
      <div className="absolute bottom-0 w-full h-20  bg-[var(--background)] rounded-t-[100%] shadow-2xl" />
    </div>
  );
}
