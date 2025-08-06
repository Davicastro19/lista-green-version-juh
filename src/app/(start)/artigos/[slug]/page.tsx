/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Shared from "@/components/share";
import { Button } from "@/components/ui/button";
import useFetch from "@/shared/api/swrfetcher";
import { IArticleData } from "@/shared/interfaces/IArticle";
import * as cheerio from "cheerio";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function ArticlePost({ params }: { params: any }) {

  const router = useRouter();
  const slug = params.slug.replace("'", "");

  const { data, error } = useFetch<IArticleData>(`/articles/${slug}`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
  });

  if (error) {
    return <p className="text-red-500 text-center">Erro ao carregar o artigo.</p>;
  }

  if (!data) {
    return (
      <div className="p-4 space-y-4">
        <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-5 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-5 bg-gray-300 animate-pulse"></div>
      </div>
    );
  }
  console.log(data)
  const post: IArticleData = {
    slug: data?.slug || "",
    image: data?.image || "",
    title: data?.title || "",
    subtitle: data?.subtitle || "",
    text: data?.text || "",
    text2: data?.text2 || "",
    text3: data?.text3 || "",
    text4: data?.text4 || "",
    text5: data?.text5 || "",
    text6: data?.text6 || "",
    meta_description: data?.meta_description || "",
    meta_image: data?.meta_image || "",
    meta_title: data?.meta_title || "",
    updateAt: data?.updateAt || "",
  };



  function TEXT_HTML(text: string) {
    const adjustedText = text.replace(/<p><\/p>/g, "");
    const adjustVideoSize = (htmlString: string) => {
      const $ = cheerio.load(htmlString);
      $("video, iframe").each((i: any, element: any) => {
        $(element).attr("style", "width: 100%; height: 50vh;");
      });
      return $.html();
    };
    return (
      <div
        className="w-[95%] text-justify text-black leading-7 my-4 my-content-box"
        dangerouslySetInnerHTML={{ __html: adjustVideoSize(adjustedText) }}
      />
    );
  }

  return (
    <>

      <div className="flex flex-col items-center justify-center w-full">

        <div className="relative w-full md:w-3/4 p-2">
          <Image
            className="w-full rounded-lg shadow-md"
            src={post.image}
            alt={`Imagem de ${post.title}`}
            width={1000}
            height={1000}
          />
          <text className="text-gray-500 text-sm mt-4">  Publicação: {post.updateAt}</text>
          <div className="absolute flex top-3 p-2 pr-3 justify-between w-[99%]  ">
            <Button onClick={() => router.back()} variant="outline" size="icon" className="cursor-pointer bg-white hover:scale-110 border-0 shadow-md">
              <ChevronLeft className={`w-5 h-5 size-6 ${false ? "text-green-600 fill-green-600" : "text-black"}`} />
            </Button>

            <Shared name={`artigos/${post.slug}`} />
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-500 mt-2">{post.subtitle}</p>
          {TEXT_HTML(post.text || "")}
        </div>

      </div>
    </>
  );
}
