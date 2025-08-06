
import BannerSlider from "@/components/banner-slider";
import ArticleRandom from "@/components/home/randomArticle";
import ListRandom from "@/components/home/randomList";

export default function Home() {

  return (
    <>
      <BannerSlider />
      <h2 className="text-lg lg:text-2xl font-bold text-[var(--foreground)]">
        <div className="flex w-full justify-center items-center py-2 space-x-1.5 border border-x-0 border-gray-300 mb-4">
          <h2 className="text-lg lg:text-2xl font-bold text-[var(--foreground)]">
            Sugestões
          </h2>


        </div>
      </h2>
      <a className="flex w-full justify-center items-center py-2 space-x-1.5 bg-gray-50 hover:bg-gray-100 my-0 cursor-pointer rounded-sm" href="/busca">
        <h2 className="text-md lg:text-md font-bold text-[var(--foreground)]">
          Buscar negócios
        </h2>
      </a>
      <ArticleRandom />
      <ListRandom />
      <div className="mb-20" />
    </>
  );
}
