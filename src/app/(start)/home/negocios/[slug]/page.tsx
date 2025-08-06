/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingSpinner from "@/components/loadin";
import ReportCompanyModal from "@/components/modals/modal-report";
import Shared from "@/components/share";
import { TagList } from "@/components/tag-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import httpService from "@/shared/api/fetcher";
import useFetch from "@/shared/api/swrfetcher";
import { startButtons } from "@/shared/constants/card";
import { BASE_URL } from "@/shared/constants/urls";
import { createSlug, imageReplace } from "@/shared/functions/cardsFunctions";
import { ICompanyUNi } from "@/shared/interfaces/ICompany";
import authStore from "@/shared/stores/authStore";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  FileWarningIcon,
  Flag,
  Globe,
  Heart
} from "lucide-react";
import { observer } from "mobx-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

export default function NegocioPage() {

  const params = useParams();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string);
    }
  }, [params]);

  return slug ? <APP slug={slug} /> : <div className="flex justify-center items-center h-screen bg-white">
    <LoadingSpinner />
  </div>;
}

const getGradientByArea = (area: string) => {
  const areaConfig = startButtons[area];
  if (!areaConfig) return { backgroundImage: "linear-gradient(to right, #38a169, #2f855a)" };

  return {
    backgroundImage: `linear-gradient(to right, ${areaConfig.bg}, ${areaConfig.color})`,
  };
};


function NegocioContent({ slug }: { slug: any }) {

  const { isLoading, data: datas } = useFetch<{ msg: string, data: ICompanyUNi }>(`/companies/getByNameUrl?name=${slug}`)
  const data: any = datas?.data
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number, y: number }[]>([]);
  const [fallbackSet, setFallbackSet] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const router = useRouter();

  const { user, fetchUser } = authStore




  const handleLike = async () => {
    try {
      if (data?._id) {
        const res = await httpService.put<{ msg: string }>("/users/toggleLike", { companyId: data._id });
        toast.success(res.msg);
        fetchUser();

        const newHearts = Array.from({ length: 5 }).map(() => ({
          id: Date.now() + Math.random(), // ID único
          x: Math.random() * 160 - 80, // Espalhamento maior na horizontal
          y: Math.random() * 120 - 60, // Espalhamento maior na vertical
          size: Math.random() * 14 + 10, // Tamanho entre 10px e 24px
        }));

        setHearts((prev) => [...prev, ...newHearts]);

        // Remover corações após a animação
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
        }, 1200);
      }
    } catch (e) {
      console.error(e);
      router.push("/login")
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        //transition={{ duration: 0.5 }}


        >
          <FileWarningIcon />
          <text >
            Negócio não encontrado
          </text>
          <text >
            Parece que o negócio que você está procurando não está disponível.
          </text>
          <motion.button
            //colorScheme="whiteAlpha"
            onClick={() => router.push("/home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voltar para a página inicial
          </motion.button>
        </motion.div>
      </div>
    );
  }
  const areanames = data?.workType && data?.workType.toLowerCase().toLowerCase() || data?.area && data?.area[0]?.toLowerCase().toLowerCase() || ""

  const areaname = () => {

    try {
      return data?.workType ? data?.workType.toLowerCase() : data.area.length > 0 ? data.area[0].toLowerCase() : ''
    } catch (erro) {
      return ''
    }
  }

  const handleImageError = (event: any) => {
    if (!fallbackSet) {

      setFallbackSet(imageReplace(areanames || ''));  // Garantir que a fallback só seja aplicada uma vez
    }
  };


  return (
    <div className="max-h-[100vh] w-full bg-white py-0 lg:py-4   rounded-lg ">
      {isReportModalOpen && <ReportCompanyModal email={user?.email || ''} isOpen={true} onClose={() => setIsReportModalOpen(false)} companyName={data.name} companyLink={`/home/negocios/${createSlug(data.name ?? "")}`} />}
      <div className="mx-auto w-full px-0 md:px-8 ">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>


          <div className="space-y-8  pb-24 lg:pb-0">

            <div className="w-full  p-2 rounded-xl  " style={getGradientByArea(areaname())}>
              <div className="w-full bg-white p-4 md:p-8 rounded-xl h-auto lg:h-[90vh] ">
                <div className="flex justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => window.history.back()} className="cursor-pointer mb-0 p-2 rounded-full hover:bg-gray-100">
                      <ChevronLeft size={24} />
                    </button>
                    <span className="text-white hidden lg:block  px-4 py-1 rounded-full capitalize" style={{ backgroundColor: startButtons[areaname()]?.bg }}>
                      {data?.workType || data?.area?.[0] || 'Área verde'}
                    </span>
                    <div style={{ backgroundColor: startButtons[areaname()]?.bg }} className="p-2 rounded-full">
                      <Image
                        src={startButtons[areaname()]?.icon}
                        alt={'as'}
                        //  layout="fill"

                        objectFit="cover"
                        style={{ borderRadius: "12px" }}
                        width={19}
                        height={19}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="rounded-full hover:bg-gray-100">
                      <Shared name={`/home/negocios/${createSlug(data.name ?? "")}`} />
                    </button>
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
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 ">
                  <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-auto overflow-hidden bg-white">
                    {/* Para telas grandes */}
                    <div className="hidden lg:flex w-auto h-[70vh] mx-auto overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={fallbackSet || `${BASE_URL}/companies/images/${data._id}`}
                        alt={data.title}
                        width={400} onError={handleImageError}
                        height={400}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Para telas pequenas */}
                    <div className="block lg:hidden w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
                      <Image onError={handleImageError}
                        src={data.image || startButtons[areaname()]?.img}
                        alt="company"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>


                  <div className="flex flex-col justify-center space-y-2 lg:space-y-6 w-full lg:w-1/2">
                    <h2 className="text-xl lg:text-2xl  font-bold">{data.name}</h2>
                    <div className="flex items-center space-x-2">
                      <p className="text-md lg:text-2xl font-semibold">Por: {data.owner?.firstName} {data.owner?.lastName}</p>
                      <Avatar>
                        <AvatarImage src={data.owner.image} />
                      </Avatar>
                    </div>
                    <p className="text-md lg:text-lg  text-gray-600">{data.businessType} • {data.state}</p>
                    <p className="text-md lg:text-lg ">{data.description}</p>

                    <div className="flex space-x-4 mt-0">
                      {data.website && (
                        <button className="cursor-pointer  p-2 rounded-full hover:bg-gray-100" onClick={() => {
                          let url = data?.website?.trim();
                          if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
                            url = `https://${url}`; // Adiciona "https://" caso esteja faltando
                          }
                          window.open(url, "_blank");
                        }}>
                          <Globe size={45} />
                        </button>
                      )}
                      {data.instagram && (
                        <button className="cursor-pointer  p-2 rounded-full hover:bg-gray-100" onClick={() => {
                          let url = data?.instagram?.trim();
                          if (url) {
                            if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
                              url = `https://www.instagram.com/${url.replace("@", "")}`; // Adiciona "https://" caso esteja faltando
                            }
                            window.open(url, "_blank");
                          }
                        }}>
                          <FaInstagram size={45} />
                        </button>
                      )}
                      {data.email && (
                        <button className=" cursor-pointer  p-2 rounded-full hover:bg-gray-100" onClick={() => {
                          window.open(`mailto:${data.email}`, "_blank");
                        }}>
                          <MdEmail size={50} />
                        </button>
                      )}
                      {data.whatsapp && (
                        <button className=" cursor-pointer p-2 rounded-full hover:bg-gray-100 " onClick={() => window.open(`https://api.whatsapp.com/send/?phone=55${data.whatsapp || ''.replace(/\)/g, '').replace(/\(/g, '').replace(/-/g, '').replace(" ", "")}&text=Encontrei+o+seu+neg%C3%B3cio+na+Listagreen.com.br.+Gostaria+de+saber+mais+sobre+...&type=phone_number&app_absent=0`, '_blank')}
                        >
                          <FaWhatsapp size={45} />
                        </button>
                      )}
                    </div>
                    <TagList tags={data.tags || []} initialDisplayCount={20} />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="cursor-pointer hover:shadow-lg  w-full border-red-400 text-red-400" onClick={() => setIsReportModalOpen(true)}>
                        <Flag className="  mr-2 h-4 w-4 text-red-400" /> Reportar
                      </Button>
                      {/*  <Button variant="outline"  className="cursor-pointer hover:shadow-lg w-[48%]">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar à lista
                </Button>*/}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


const APP = observer(NegocioContent)
