/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ListCard from "@/components/cards/ListCard/ListCard";
import LoadingSpinner from "@/components/loadin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useFetch from "@/shared/api/swrfetcher";
import { startButtons } from "@/shared/constants/card";
import { IList } from "@/shared/interfaces/IList";
import { Share2 } from "lucide-react";
import { observer } from "mobx-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
  const [page, setPage] = useState(1);
  const limit = 8; // Número de Negóciospor página

  const { data, isLoading } = useFetch<any>(`/lists/saves?id=${slug}&page=${page}&limit=${limit}`);

  const handleNextPage = () => {
    if (data?.currentPage < data?.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleCopyLink = () => {
    const link = window.location.href; // Obtém o link atual do navegador
    navigator.clipboard.writeText(link)
      .then(() => toast.success("Link copiado!")) // Opcional: Feedback ao usuário
      .catch(err => console.error("Erro ao copiar:", err));
  };

  return (
    <div className="p-2" >

<div className="flex flex-row justify-between px-6 pb-10">
     <h2 className="text-xl font-bold mb-4">Listas Salvas</h2>
     <Button  onClick={handleCopyLink} variant="outline" size="icon" className="cursor-pointer bg-white hover:scale-110 border-0 shadow-md">
    <Share2  className={cn("w-5 h-5 size-6 ", false ? "text-green-600 fill-green-600" : "text-black")} />
  </Button>
     </div>



      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-wrap gap-3 justify-center">
            {data?.data?.map((company: IList) => (
              <ListCard key={company._id} data={company} />

            ))}
          </div>

          {/* PAGINAÇÃO */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={data?.currentPage === 1}
              className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded disabled:bg-gray-400"
            >
              <FaArrowLeft/>
            </button>

            <span className="text-lg font-semibold">
              Página {data?.currentPage} de {data?.totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={data?.currentPage === data?.totalPages}
              className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded disabled:bg-gray-400"
            >
                <FaArrowRight/>
            </button>
          </div>
        </>
      )}
    </div>
    );
  }


const APP = observer(NegocioContent)
