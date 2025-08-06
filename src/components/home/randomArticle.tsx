/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


import useFetch from "@/shared/api/swrfetcher";

import { IResponseArticleSearch } from "@/shared/interfaces/IArticle";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoadingSpinner from "../loadin";
import { Button } from "../ui/button";
import CardSwipperArticleOrList from "./swipper";




function ArticleRandomBuild() {
    const router = useRouter()
    const { data, isLoading } = useFetch<IResponseArticleSearch[]>('/search/article');


    if (isLoading) {
        return <div className="flex justify-center py-8"><LoadingSpinner /></div>;
    }

    if (!data) {
        return (
            <div className="py-8 text-center">
                <p className="text-gray-500">No articles available</p>
            </div>
        );
    }




    return (
        <div className="space-y-6 py-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Artigos
                </h2>
                <Button
                    onClick={() => router.push('/home/artigos')}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                    Ver Mais Artigos
                </Button>
            </div>


            <CardSwipperArticleOrList data={data} type="article" />




        </div>
    );
}

export default function ArticleRandom() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ArticleRandomBuild />
        </Suspense>
    );
}
