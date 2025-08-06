/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { IResponseArticleSearch } from "@/shared/interfaces/IArticle";
import { ICompany } from "@/shared/interfaces/ICompany";
import { IList } from "@/shared/interfaces/IList";
import React from 'react';
import ArticleCard from "../cards/ArticleCard/ArticleCard";
import BusinessCard from "../cards/BusinessCard/BusinessCard";
import ListCard from "../cards/ListCard/ListCard";
import LoadingSpinner from '../loadin';

interface SearchResultsProps {
    results: any[];
    isLoading: boolean;
    onPageChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
    type: "article" | 'list' | 'business';
    error?: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({
    results,
    isLoading,
    onPageChange,
    currentPage,
    totalPages,
    type,
    error
}) => {
    if (error || !results) {
        return (
            <div className="mt-8 text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-red-500 text-lg">Erro ao carregar resultados. Tente novamente.</p>
            </div>
        );
    }

    if (isLoading && results?.length === 0) {
        return (
            <div className="mt-8 flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoading && results?.length === 0) {
        return (
            <div className="mt-8 text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">Nenhum resultado encontrado</p>
                <p className="text-gray-400 mt-2">Tente ajustar os critérios de busca</p>
            </div>
        );
    }

    const renderPageNumbers = () => {
        const pages = [];

        const pageLimit = 5; // Quantidade de páginas visíveis no meio
        let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
        let endPage = startPage + pageLimit - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageLimit + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={i === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    disabled={isLoading}
                >
                    {i}
                </Button>
            );
        }

        return pages;
    };

    return (
        <div className="mt-8 flex flex-col items-center w-full px-2 sm:px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {type === "article" ? "Artigos encontrados" :
                    type === "list" ? "Listas encontradas" :
                        "Empresas encontradas"}
            </h2>

            <div className="
                grid
                gap-4
                w-full
                max-w-[1400px]
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                justify-items-center
            ">
                {results.map((item, index) => (
                    type === "article" ? (
                        <ArticleCard key={index} data={item as IResponseArticleSearch} />
                    ) : type === "list" ? (
                        <ListCard key={index} data={item as IList} />
                    ) : (
                        <BusinessCard key={index} data={item as ICompany} />
                    )
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap gap-2 justify-center mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={isLoading || currentPage === 1}
                    >
                        Anterior
                    </Button>

                    {renderPageNumbers()}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={isLoading || currentPage === totalPages}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
