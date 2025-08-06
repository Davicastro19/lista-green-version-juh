"use client"
import ArticleCard from '@/components/cards/ArticleCard/ArticleCard';
import LoadingSpinner from '@/components/loadin';
import useFetch from '@/shared/api/swrfetcher';
import { IArticleData } from '@/shared/interfaces/IArticle';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

export default function Artigos() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { data, error, isLoading } = useFetch<{items: IArticleData[]
    total: number,
    page: number,
    pageSize: number,
    totalPages:number }>(`/articles?page=${page}&pageSize=6&search=${query}`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <div className="text-red-500 text-center">Erro ao carregar artigos</div>;
  }

  const articles = data.items;
  const totalPages = data.totalPages;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setQuery(search);
    setPage(1);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-5 mt-2">Todos os Artigos</h1>

      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Buscar artigos..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleKeyPress(e)}

          className="text-[var(--darkgreenhome)] cursor-pointer  px-3 py-1 border border-[var(--darkgreenhome)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome)"
        />
        <button onClick={handleSearchSubmit} className="ml-2 px-3 py-1 bg-[var(--darkgreen)] hover:bg-[var(--basegreen)] text-white rounded-lg">Buscar</button>
      </div>

      <div className="flex flex-wrap space-y-10 justify-around w-full">
        {articles.map((article: IArticleData) => (
          <ArticleCard key={article.slug} data={article} />
        ))}
      </div>

      <div className="flex justify-center mt-5 mb-20 space-x-2 items-center">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className={` cursor-pointer px-3 py-2 rounded-lg ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--darkgreen)] hover:bg-[var(--basegreen)] text-white'}`}
        >
          <ArrowLeftIcon/>
        </button>
        {page > 2 && <button onClick={() => goToPage(page - 2)} className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg">{page - 2}</button>}
        {page > 1 && <button onClick={() => goToPage(page - 1)} className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg">{page - 1}</button>}
        <span className="cursor-pointer px-3 py-2 font-bold text-[var(--darkgreen)]">{page}/{totalPages}</span>
        {page < totalPages && <button onClick={() => goToPage(page + 1)} className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg">{page + 1}</button>}
        {page < totalPages - 1 && <button onClick={() => goToPage(page + 2)} className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg">{page + 2}</button>}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className={` cursor-pointer px-3 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--darkgreen)] hover:bg-[var(--basegreen)] text-white'}`}
        >
         <ArrowRightIcon/>
        </button>
      </div>
    </>
  );
}
