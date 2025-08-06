"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { IResponseArticleSearch } from "@/shared/interfaces/IArticle";
import { ICompany } from "@/shared/interfaces/ICompany";
import { IList } from "@/shared/interfaces/IList";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "../loadin";
import ArticleCard from "./ArticleCard/ArticleCard";
import BusinessCard from "./BusinessCard/BusinessCard";
import ListCard from "./ListCard/ListCard";

interface CardSwiperProps {
  type: "article" | "list" | "business";
  data: IList[] | ICompany[] | IResponseArticleSearch[];
  selectedArea: string;
  onLoadMore: () => void;
  loading: boolean;
}

export default function CardSwiper({
  loading,
  selectedArea,
  type,
  data,
  onLoadMore
}: CardSwiperProps) {
  const router = useRouter()
  const path = usePathname();
  if (!data?.length) return null;

  return (
    <div className="px-0 py-0">
      <Carousel>
        <CarouselContent className="py-8 max-w-[95vw] lg:max-w-[70vw]">
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/1.5 lg:basis-1/2.5" // Isso faz com que cada item ocupe 100% no mobile e 33% no desktop
            >
              {type === "article" && <ArticleCard data={item as IResponseArticleSearch} />}
              {type === "list" && <ListCard data={item as IList} />}
              {type === "business" && <BusinessCard data={item as ICompany} />}
            </CarouselItem>
          ))}

          {selectedArea !== "no" && (
            <CarouselItem className="flex justify-center items-center basis-full lg:basis-1/4  bg-gray-200/20 border-0 mx-4 border-[var(--background)] rounded-[10px] shadow-md">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Button
                  variant="outline"
                  className="cursor-pointer border-green-500 text-green-600"
                  onClick={() => {
                    if (type === 'list') {
                      onLoadMore()
                    } else
                      if (path === "/home") {
                        router.push('/home/artigos')

                      } else {
                        onLoadMore()
                      }
                  }
                  }
                  disabled={loading}
                >
                  Ver Mais
                </Button>
              )}
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>

  );
}
