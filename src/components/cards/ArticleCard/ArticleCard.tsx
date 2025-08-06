import Shared from "@/components/share";
import { Card, CardContent } from "@/components/ui/card";
import { IResponseArticleSearch } from "@/shared/interfaces/IArticle";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArticleCardProps {
  data: IResponseArticleSearch
  type?: string
}

export default function ArticleCard({ data, type = '' }: ArticleCardProps) {
  const router = useRouter();

  return (
    <Card className=" gap-0 w-[330px] lg:w-[365px]   h-[400px] py-0 sm:max-w-sm md:max-w-md border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
      <div className="relative ">
        <Image
          src={data.image}
          alt={data.title}
          width={400}
          height={220}
          className="w-full h-56  object-cover"
          onClick={() => router.push(`/${type ? 'explorar' : 'artigos'}/${data.slug}`)}
        />
        <div className="absolute top-2 right-2 ">
          <Shared name={`${type ? 'explorar' : 'artigos'}/${data.slug}`} />
        </div>
      </div>
      <CardContent onClick={() => router.push(`/${type ? 'explorar' : 'artigos'}/${data.slug}`)} className="p-4  space-y-2 py-2  ">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 w-full">{data.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-4 h-[85px] ">{data.subtitle}</p>
      </CardContent>
    </Card>
  );
}
