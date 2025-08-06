/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


import useFetch from "@/shared/api/swrfetcher";


import { IList } from "@/shared/interfaces/IList";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoadingSpinner from "../loadin";
import { Button } from "../ui/button";
import CardSwipperListOrList from "./swipper";




export function ListRandomBuild() {
    const router = useRouter()
    const { data, isLoading } = useFetch<{ lists: IList[], pagination: any }>('/search/list?page=0');


    if (isLoading) {
        return <div className="flex justify-center py-8"><LoadingSpinner /></div>;
    }

    if (!data) {
        return (
            <div className="py-8 text-center">
                <p className="text-gray-500">No Lists available</p>
            </div>
        );
    }




    return (
        <div className="space-y-6 py-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Listas
                </h2>
                <Button
                    onClick={() => router.push('/listas?page=1')}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                    Ver Mais Listas
                </Button>
            </div>


            <CardSwipperListOrList data={data.lists} type="list" />




        </div>
    );
}

export default function ListRandom() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ListRandomBuild />
        </Suspense>
    );
}
