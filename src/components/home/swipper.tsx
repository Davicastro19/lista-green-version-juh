"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { IResponseArticleSearch } from "@/shared/interfaces/IArticle";
import { ICompany } from "@/shared/interfaces/ICompany";
import { IList } from "@/shared/interfaces/IList";
import ArticleCard from "../cards/ArticleCard/ArticleCard";
import ListCard from "../cards/ListCard/ListCard";


interface CardSwiperProps {
    type: "article" | "list" | "business";
    data: IList[] | ICompany[] | IResponseArticleSearch[];

}

export default function CardSwipperArticleOrList({
    type,
    data,
}: CardSwiperProps) {
    if (!data?.length) return null;

    return (
        <div className="px-0 py-0 ">
            <Carousel>
                <CarouselContent className="py-0 max-w-[95vw] lg:max-w-[70vw] mb-4">
                    {data.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/1.5 lg:basis-1/2.5" // Isso faz com que cada item ocupe 100% no mobile e 33% no desktop
                        >
                            {type === "article" && <ArticleCard data={item as IResponseArticleSearch} />}
                            {type === "list" && <ListCard data={item as IList} />}
                        </CarouselItem>
                    ))}


                </CarouselContent>
            </Carousel>
        </div>

    );
}
