"use client";

import useFetch from "@/shared/api/swrfetcher";
import { createSlug } from "@/shared/functions/cardsFunctions";
import { IList } from "@/shared/interfaces/IList";
import { ListButton } from "./list-button";


export default function PromotionItens({set}:{set:()=>void}) {
    const { data, error, isLoading } = useFetch<{data:IList[]}>(`/lists/getListsByUser`)
   if(isLoading || error){
    return <div />
   }

  return (
    <nav className="w-full bg-[var(--bggreen2)] p-0 flex flex-col justify-start gap-4 py-2 overflow-auto h-[20vh] scroll-smooth justify-items-start align-top start-0 items-start content-start ">
      { data?.data && data.data.map((item:IList, index:number) => (
        <ListButton  key={index} set={set} href={`/home/lista/${createSlug(item.name)}`} label={item.name} name={item.name}  />
      ))}
    </nav>
  );
}
