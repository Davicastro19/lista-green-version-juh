import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-[110px] mt-5  rounded-2xl flex items-center justify-center">
      <div className="flex flex-col items-center space-y-5">
        <div className="relative w-12 h-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 border-4 border-green-300 rounded-full"
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
          <motion.div
            className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center overflow-hidden"
            animate={{ scale: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo-icon-basegreen.svg"
              alt="Loading Icon"
              width={48}
              height={48}
              className="object-contain"
            />
          </motion.div>
        </div>
        <p
          className="text-xs font-medium text-[var(--foreground)]"

        >
          Carregando...
        </p>
      </div>
    </div>
  );
}
