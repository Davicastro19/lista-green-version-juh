/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import useFetch from "@/shared/api/swrfetcher";
import { useState } from "react";
import BusinessCard from "../cards/BusinessCard/BusinessCard";

import { Filter, X } from "lucide-react";
import { Button } from "../ui/button";
import AlertAddDescriptionCompany from "./alert-add-description-company";
import { FilterAlertDialog } from "./filter-company";




export function DialogAddCompaniesInList({ onclose, listDataId, mutate }: any) {
  const [text, setText] = useState<string>("");
  const [areas, setAreasSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [themes, setThemesSelected] = useState<string[]>([]);
  const [tagsSelected, setTagsSelected] = useState<{ value: string; label: string }[]>([]);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(undefined);
  const [isFilterOpen, onFilterClose] = useState(false);

  const [textEnd, setTextEnd] = useState('')
  const { data, isLoading } = useFetch<any>( `/companies/search?page=${currentPage}&area=${areas.join(",")}&tags=${tagsSelected.join(",")}&themes=${themes.join(",")}&isMember=${isMember}&newBusiness=${isNew}&text=${textEnd}` );


  return (
    <div className=" fixed top-0 left-0 bg-white w-full h-[100vh] overflow-auto z-10">
 <FilterAlertDialog
        isOpen={isFilterOpen}
        onClose={()=>onFilterClose(false)}
          areas={areas}
          setArea={setAreasSelected}
          tags={tagsSelected}
          setTags={setTagsSelected}
          themes={themes}
          setThemes={setThemesSelected}
          isMember={isMember}
          setIsMember={setIsMember}
          isNew={isNew}
          setIsNew={setIsNew}
        />

      <div className="w-full h-screen p-6">
      <div className="flex justify-between">
      <text className="text-2xl font-bold text-[var(--foreground)]  ">Adicionar Negócio</text>
      <button className="cursor-pointer" onClick={()=>onclose(false)}>
        <X/>
      </button>
      </div>

      <div className="flex justify-between mb-4 w-full">
        <div className="flex gap-2 mb-4 w-full items-center">
          <input
            placeholder="Buscar negócio"
            className="text-[var(--darkgreenhome)] mt-1 px-3 py-1 border border-[var(--darkgreenhome)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
           <Button variant="outline" size="icon" className="bg-white hover:scale-110 border-0 shadow-md" onClick={() => onFilterClose(true)}>
    <Filter  className={cn("w-5 h-5 size-6 ", false ? "text-green-600 fill-green-600" : "text-black")} />
  </Button>
          <button
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
        disabled={isLoading}
        onClick={() => setTextEnd(text)}
      >
        Pesquisar

      </button>
        </div>
        <div/>
        </div>

        {isLoading ? null : (
          <div className="flex flex-wrap gap-3">
            { data?.data && data?.data?.companies?.map((company: any) => (
              <div key={company._id} className="relative w-90 h-[370px]">
                <div
                  className="absolute w-full h-full  z-30"
                  onClick={() => setIsModalOpen(company._id)}
                />
                <div className="absolute w-full h-full bg-transparent">
                  <BusinessCard data={company} />
                </div>
              </div>
            ))}
          </div>
        )}

{isLoading ? null : (
  <div className="flex justify-center mt-5 gap-2 py-5">
    <button
    className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"

      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Anterior
    </button>

    {currentPage > 2 && (
      <>
        <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
        onClick={() => setCurrentPage(1)}>1</button>
        {currentPage > 3 && <span>...</span>}
      </>
    )}

    {currentPage > 1 && (
      <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
      onClick={() => setCurrentPage(currentPage - 1)}>
        {currentPage - 1}
      </button>
    )}

    <button className="font-bold">{currentPage}</button>

    {currentPage < data.data.pagination.totalPages && (
      <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
      onClick={() => setCurrentPage(currentPage + 1)}>
        {currentPage + 1}
      </button>
    )}

    {currentPage < data.data.pagination.totalPages - 1 && (
      <>
        {currentPage < data.data.pagination.totalPages - 2 && <span>...</span>}

        <button onClick={() => setCurrentPage(data.data.pagination.totalPages)}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
          >
          {data.data.pagination.totalPages}
        </button>
      </>
    )}

    <button
    className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"

      disabled={currentPage === data.data.pagination.totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Próximo
    </button>
  </div>
)}

      </div>
      {isModalOpen &&  <AlertAddDescriptionCompany companyId={isModalOpen} listId={listDataId} onClose={() => [setIsModalOpen(undefined), onclose()]} mutate={mutate} />}
    </div>
  );
}
