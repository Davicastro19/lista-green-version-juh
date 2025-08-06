"use client";



import Shared from "@/components/share";
import { TagList } from "@/components/tag-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import httpService from "@/shared/api/fetcher";
import { startButtons } from "@/shared/constants/card";


import { createSlug, imageReplace } from "@/shared/functions/cardsFunctions";
import { IList } from "@/shared/interfaces/IList";
import authStore from "@/shared/stores/authStore";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { observer } from "mobx-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";


interface BusinessCardProps {
  data: IList;
  extraFunction?: () => void
}



function ListCard({ data, extraFunction }: BusinessCardProps) {

  const { user, fetchUser } = authStore
  const [makes, setMakes] = useState<{ id: number; x: number; size: number, y: number }[]>([]);

  const router = useRouter();

  const handleSave = async () => {
    try {
      const res = await httpService.put<{ msg: string }>("/users/toggleSave", { listId: data._id });
      toast.success(res.msg);
      fetchUser();

      const newHearts = Array.from({ length: 5 }).map(() => ({
        id: Date.now() + Math.random(), // ID único
        x: Math.random() * 160 - 80, // Espalhamento maior na horizontal
        y: Math.random() * 120 - 60, // Espalhamento maior na vertical
        size: Math.random() * 14 + 10, // Tamanho entre 10px e 24px
      }));

      setMakes((prev) => [...prev, ...newHearts]);
      mutate(`/lists/saves?page=1&limit=8`)
      // Remover corações após a animação
      setTimeout(() => {
        setMakes((prev) => prev.filter((h) => !newHearts.includes(h)));
      }, 1200);
    } catch (e) {
      console.error(e);
      router.push("/login")
    }
  };



  const areaname = data?.area?.[0]?.toLowerCase().toLowerCase() || ''

  const sh = startButtons[areaname?.replace(' e ', ' & ').toLowerCase() || '']?.bg
  const shadowStyle = {
    boxShadow: `0px 4px 4px 0px ${sh}`,
  };

  function handleClose() {
    if (extraFunction) {
      extraFunction()
    }
    router.push(`/home/lista/${createSlug(data.name ?? "")}`)
  }


  return (<Card className=" gap-0 w-[310px] lg:w-[365px]  min-h-[422px]  h-[422px]   py-0 sm:max-w-sm md:max-w-md border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
    <div className="relative ">



      <div
        className={`absolute top-2 left-2 z-2 p-0 w-7 h-7 rounded-full  bg-white  `} style={shadowStyle}>
        <Image
          width={400}
          height={220}
          className="rounded-full w-full h-full object-cover"
          src={imageReplace(data?.area?.[0] || '')}
          alt={data.name || ''}

        />
      </div>


      <Image
        src={data.image ? (data.image.includes('https') ? data.image : `/images${data.image}`) : '/images/logo/logo-lista-dark.svg'}
        alt={data.image}
        width={400}
        height={220}
        className="w-full h-56 object-cover"
        onClick={handleClose}
      />
      <div className="absolute top-2 right-2 space-x-2">
        <Button
          variant="outline" size="icon" className="cursor-pointer  bg-white hover:scale-110 border-0 shadow-md"
          onClick={handleSave}
        >
          <Bookmark className={cn("  w-5 h-5 size-6 ", user?.saved.includes(data._id) ? "text-[var(--glowgreen)] fill-green-600" : "text-black")} />
        </Button>


        <div className="absolute transform -translate-x-1/2 pointer-events-none">
          {makes.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: heart.y - 100, x: heart.x, scale: 2.5 }} // Explosão e espalhamento
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute text-green-500"
              style={{ left: `${heart.x}px`, top: `${heart.y}px`, fontSize: `${heart.size}px` }}
            >
              <Bookmark className="text-[var(--glowgreen)] fill-green-600" />
            </motion.div>
          ))}
        </div>
        <Shared name={`/home/lista/${createSlug(data.name ?? "")}`} />

      </div>
    </div>
    <CardContent onClick={() => router.push(`/home/lista/${createSlug(data.name ?? "")}`)} className="p-4  space-y-2 py-2  ">
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 w-full text-center">{data.name}</h3>

      <p className={`text-sm  w-full text-center line-clamp-3 h-[90px] ${data.description ? 'text-gray-600' : 'text-gray-300 italic'}`}>{data.description || ''}</p>
      <div className="flex w-full justify-center">
        <TagList tags={data.tags || []} initialDisplayCount={3} />
      </div>
    </CardContent>
  </Card>)
}
export default observer(ListCard)
