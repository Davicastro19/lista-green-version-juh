/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ListCard from "@/components/cards/ListCard/ListCard";
import LoadingSpinner from "@/components/loadin";
import useFetch from "@/shared/api/swrfetcher";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    data: promotions,
    error,
    isLoading,
  } = useFetch<any>("/lists/getListPromotion");

  return (
    <div className="min-h-screen bg-graygreen p-6 md:p-8">
      <button
        onClick={() => router.push("/home")}
        className="pr-0 cursor-pointer flex flex-row text-gray-600 hover:text-gray-800 w-[13%]"
      >
        <ChevronLeft /> <span className="hidden lg:block">Início</span>
      </button>

      <div className="mx-auto mt-4">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Listas de Promoções
        </h1>
        <p className="text-darkgreen2 mb-8">
          Fizemos essa lista com base nos negócios que vendem produtos que
          vieram direto da terra.
        </p>
<div className="flex flex-wrap gap-4 items-center justify-center w-full md:w-full ">
        {isLoading ? (
         <LoadingSpinner/>
        ) : error ? (
          <p className="text-red-500">Erro ao carregar as promoções.</p>
        ) : (
     <>
            {promotions?.data.map((promo: any,key:any) => (
             <ListCard key={key} data={promo}/>
            ))}
          </>
        )}</div>
      </div>
    </div>
  );
}
