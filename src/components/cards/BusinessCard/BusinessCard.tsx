/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Shared from "@/components/share";
import { TagList } from "@/components/tag-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import httpService from "@/shared/api/fetcher";
import { startButtons } from "@/shared/constants/card";
import { BASE_URL } from "@/shared/constants/urls";


import { createSlug, imageReplace, navigateWhatsapp } from "@/shared/functions/cardsFunctions";
import { ICompany } from "@/shared/interfaces/ICompany";
import authStore from "@/shared/stores/authStore";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { observer } from "mobx-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { mutate } from "swr";
interface BusinessCardProps {
  data: ICompany; extraFunction?: () => void
}
const MAX_HEARTS = 5; // Número máximo de corações por clique
function BusinessCard({ data, extraFunction }: BusinessCardProps) {
  const { user, fetchUser } = authStore;
  const router = useRouter();

  const [hearts, setHearts] = useState<{ id: number; x: number; size: number, y: number }[]>([]);


  const handleLike = async () => {
    try {
      const res = await httpService.put<{ msg: string }>("/users/toggleLike", { companyId: data._id });
      toast.success(res.msg);
      fetchUser();

      const newHearts = Array.from({ length: MAX_HEARTS }).map(() => ({
        id: Date.now() + Math.random(), // ID único
        x: Math.random() * 160 - 80, // Espalhamento maior na horizontal
        y: Math.random() * 120 - 60, // Espalhamento maior na vertical
        size: Math.random() * 14 + 10, // Tamanho entre 10px e 24px
      }));

      setHearts((prev) => [...prev, ...newHearts]);
      mutate('/companies/likes?page=1&limit=8')
      // Remover corações após a animação
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
      }, 1200);
    } catch (e) {
      console.error(e);
      router.push("/login")
    }
  };
  const [fallbackSet, setFallbackSet] = useState<string>('');
  const areaname = data?.workType && data?.workType.toLowerCase().toLowerCase() || data?.area && data?.area[0]?.toLowerCase().toLowerCase() || ""

  const handleImageError = (event: any) => {
    if (!fallbackSet) {

      setFallbackSet(imageReplace(areaname || ''));  // Garantir que a fallback só seja aplicada uma vez
    }
  };


  const sh = startButtons[areaname?.replace(' e ', ' & ').toLowerCase() || '']?.bg

  const shadowStyle = {
    boxShadow: `0px 4px 4px 0px ${sh}`,
  };
  function handleLink() {
    if (extraFunction) {
      extraFunction()
    }
    router.push(`/home/negocios/${createSlug(data.name ?? "")}`)
  }

  return (
    <Card className="relative  gap-0  w-[330px] lg:w-[365px]   h-[412px] py-0  border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
      <div className="relative ">

        <div
          className={`absolute top-2 left-2 z-2 p-0 w-7 h-7 rounded-full  bg-white  `} style={shadowStyle}>
          <Image
            width={400}
            height={220}
            className="rounded-full w-full h-full object-cover"
            src={imageReplace(areaname || '')}
            alt={data.name || ''}

          />
        </div>
        <Image
          src={fallbackSet || `${BASE_URL}/companies/images/${data._id}`}
          alt={data.title}
          width={400}
          height={220}
          className="w-full h-56 object-cover"
          onError={handleImageError}
          onClick={() => handleLink()}
        />

        <div className="absolute top-2 right-2 space-x-2">
          <Button
            variant="outline" size="icon" className="cursor-pointer  bg-white hover:scale-110 border-0 shadow-md"
            onClick={handleLike}
          >
            <Heart className={cn("w-5 h-5 size-6 ", user?.likes.includes(data?._id) ? "text-[var(--glowgreen)] fill-green-600" : "text-black")} />
          </Button>
          <div className="absolute transform -translate-x-1/2 pointer-events-none">
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: heart.y - 100, x: heart.x, scale: 2.5 }} // Explosão e espalhamento
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-green-500"
                style={{ left: `${heart.x}px`, top: `${heart.y}px`, fontSize: `${heart.size}px` }}
              >
                <Heart className="text-[var(--glowgreen)] fill-green-600" />
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline" size="icon" className="cursor-pointer  bg-white hover:scale-110 border-0 shadow-md"
            onClick={() => navigateWhatsapp(data.whatsapp || '')}
          >
            <FaWhatsapp className={cn("w-5 h-5 size-6 ", false ? "text-green-600 fill-green-600" : "text-black")} />
          </Button>
          <Shared name={`home/negocios/${createSlug(data.name)}`} />

        </div>
      </div>
      <CardContent className="p-4  space-y-2 py-2  " onClick={() => handleLink()}>
        <p className="text-sm  line-clamp-1 w-full text-center text-[var(--basegreen)]"> {data.businessType} - {data.state}</p>
        <p className="text-lg font-semibold text-gray-800 w-full text-center line-clamp-1 ">{data.name}</p>
        <p className="text-sm text-gray-600 line-clamp-4 min-h-[77px] h-[77px]   ">{data.description}</p>
        <div className="flex w-full justify-center">
          <TagList tags={data.tags || []} initialDisplayCount={2} />
        </div>
      </CardContent>
    </Card>
  );
}


export default observer(BusinessCard)
