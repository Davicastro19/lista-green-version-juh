/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ArticleRandom from '@/components/home/randomArticle';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import useFetch from '@/shared/api/swrfetcher';
import { areaOptions, states } from '@/shared/constants/options';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface SearchResultsData {
  companies: any[];
  pagination: any; // 🚩 ajuste conforme retorno real
}

function App() {
  const searchParamsURL = useSearchParams();
  const pathname = usePathname();

  const [searchParams, setSearchParams] = useState({
    areas: [] as string[],
    text: '',
    state: '',
    page: 1,
  });

  useEffect(() => {
    const params = Object.fromEntries([...searchParamsURL.entries()]);
    setSearchParams({
      text: params.text || '',
      areas: params.areas ? params.areas.split(',') : [],
      state: params.state || '',
      page: params.page ? Number(params.page) : 1,
    });
  }, []);

  useEffect(() => {
    const qp = new URLSearchParams();
    if (searchParams.text) qp.set('text', searchParams.text);
    if (searchParams.areas.length) qp.set('areas', searchParams.areas.join(','));
    if (searchParams.state) qp.set('state', searchParams.state);
    qp.set('page', searchParams.page.toString());

    window.history.replaceState(null, '', `${pathname}?${qp.toString()}`);
  }, [searchParams, pathname]);

  const queryUrl = `/companies/search?${new URLSearchParams({
    page: searchParams.page.toString(),
    areas: searchParams.areas.join(','),
    text: searchParams.text,
    state: searchParams.state,
    perPage: '9',
  }).toString()}`;

  const { data, isLoading } = useFetch<{ msg: string; data: SearchResultsData }>(
    queryUrl,
    {},
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const [allResults, setAllResults] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      setAllResults(data.data.companies);
    }
  }, [data]);



  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };



  const handleSearch = (newParams: Partial<typeof searchParams>) => {
    setSearchParams(prev => ({ ...prev, ...newParams, page: 1 }));
  };

  const totalPages = data?.data?.pagination?.totalPages || 1;
  const currentPage = data?.data?.pagination?.currentPage || 1;

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-0">
        <SearchForm
          initialValues={searchParams}
          onSearch={handleSearch}
          areaOptions={areaOptions}
          stateOptions={states}
          type="companies"
        />
        <a className="flex mt-2 w-full justify-center items-center py-2 space-x-1.5 bg-gray-50 hover:bg-gray-100 my-0 cursor-pointer rounded-sm" href="/listas">
          <h2 className="text-md lg:text-md font-bold text-[var(--foreground)]">
            Buscar listas
          </h2>
        </a>
        <SearchResults
          results={allResults}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          type="business"
        />

      </div>


      <ArticleRandom />
      <div className="mb-20" />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Carregando...</div>}>
      <App />
    </Suspense>
  );
}
