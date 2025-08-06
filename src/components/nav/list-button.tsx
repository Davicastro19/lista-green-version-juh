/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookmarkIcon, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface ListButtonProps {
    href: string;
    label: string;
    name:string
    set: ()=> void
  }
export  function ListButton({ href, label, name }: ListButtonProps) {


    const path = usePathname();
  const router = useRouter();

  return (<>
    <Button
    onClick={() => {

        router.push(href)

    }}
      variant="ghost"
      className={cn(
        "p-0 w-full font-normal gap-0 cursor-pointer h-16 flex items-center  hover:shadow-2xl justify-center text-white rounded-lg bg-[var(--graygreen2)] shadow-md",
        path.includes(href) ? "transform-3d shadow-xl font-semibold" : ""
      )}
    >

      {name.includes("Salvas") || name.includes('Negócios Curtidos') ?
      (<div className="bg-[var(--darkgreen)] w-22 h-full flex items-center justify-center rounded-lg">
        {name.includes("Salvas") ?(
        <BookmarkIcon className="size-10 text-white" fill="white"/>):(
          <Heart className="size-10 text-white" fill="white"/>
        )}
      </div>):(
        <img

          src={
            name.includes('Negócios Curtidos')
              ? '/images/menu/likedList.svg'
              : name === 'Listas de Promoções'
              ? '/images/menu/promotingList.svg'
              :  '/images/menu/144x144.svg'
          }
          alt="Imagem da Lista"
          className={` ] h-full  rounded-lg ${ !name.includes('Negócios Curtidos')  && name !== 'Listas de Promoções'
            ? 'p-1'
            :  ''}`}
        />
      )
      }



      <div className="flex w-full h-full bg-[var(--graygreen2)] rounded-lg justify-center items-center px-2">
        <span className="w-full text-start  text-sm text-[var(--fulldarkgreen)] break-words text-wrap">
          {label}
        </span>
      </div>
    </Button>
    </>
  );
}
