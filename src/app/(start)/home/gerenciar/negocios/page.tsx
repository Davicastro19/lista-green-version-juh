/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChevronLeft, Filter, Pencil, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import BusinessCard from '@/components/cards/BusinessCard/BusinessCard';
import LoadingSpinner from '@/components/loadin';
import { AletConfimation } from '@/components/modals/alert-confirmation';
import { NewFilterCompanies } from '@/components/modals/filter-companies';

import MultiStepFormCreateCompanies from '@/components/modals/modal-multistep-form-companies/modal-multistep-form-create-companies';
import MultiStepFormEditCompanies from '@/components/modals/modal-multistep-form-companies/modal-multistep-form-edit-companies';
import httpService from '@/shared/api/fetcher';
import useFetch from '@/shared/api/swrfetcher';
import { ICompany } from '@/shared/interfaces/ICompany';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';


export default function CompaniesList() {
  const router = useRouter();

  const [isFilterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMember, setIsMember] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [text, setText] = useState('');
  const [ptext, setPText] = useState('');
  const [areas, setAreasSelected] = useState<string[]>([]);
  const [themes, setThemesSelected] = useState<string[]>([]);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  const [isDeleteAlert, setIsDeleteAlert] = useState<null | ICompany>(null);
  const [edit, setEdit] = useState<null | ICompany>(null);
  const [create, setCreate] = useState<boolean>(false);
  // Construção dinâmica dos parâmetros da URL
  const queryParams = new URLSearchParams();
  queryParams.append('page', currentPage.toString());
  if (areas.length) queryParams.append('areas', areas.join(','));
  if (tagsSelected.length) queryParams.append('tags', tagsSelected.join(','));
  if (themes.length) queryParams.append('themes', themes.join(','));
  if (isMember) queryParams.append('isMember', 'true');
  if (isNew) queryParams.append('newBusiness', 'true');
  if (text) queryParams.append('text', text);

  const { data, error, mutate, isLoading } = useFetch<any>(`/companies/search?${queryParams.toString()}`);

  const companies = data?.data?.companies || [];
  const totalPages = data?.data?.pagination?.totalPages || 1;

  const handleDeleteCompanyAdmin = async () => {
    if (isDeleteAlert?._id) {
      try {
        await httpService.delete(`/companies/${isDeleteAlert._id}`);

        toast.success('Negócio deletado com sucesso');
        mutate(); // Atualiza a lista após a exclusão
        setIsDeleteAlert(null);
      } catch (error) {
        console.error('Erro ao excluir empresa:', error);
        toast.error('Erro ao remover negócio');
      }
    }
  };



  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <span className="text-red-500">Ocorreu um erro ao carregar os dados.</span> {/* Exibe uma mensagem de erro */}
      </div>
    );
  }

  return (
    <div className="p-4 ">
      {create &&
        <MultiStepFormCreateCompanies isOpen={true} onClose={() => setCreate(false)} mutate={mutate} />}
      {edit &&
        <MultiStepFormEditCompanies isOpen={true} onClose={() => setEdit(null)} company={edit} mutate={mutate} />}
      {isDeleteAlert && <AletConfimation onClose={() => setIsDeleteAlert(null)} Handle={() => handleDeleteCompanyAdmin()} title={`Deletar negócio`} text={`Tem certeza que deseja excluir "${isDeleteAlert.name}"? Essa ação não pode ser desfeita.`} />}
      {isFilterOpen &&
        <NewFilterCompanies
          isOpen={true}
          onClose={() => setFilterOpen(false)}
          setArea={setAreasSelected}
          setTags={setTagsSelected}
          setThemes={setThemesSelected}
          setIsMember={setIsMember}
          setIsNew={setIsNew}
        />}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-row items-center gap-4 mb-4 w-full">
            <button onClick={() => router.push('/home/gerenciar')} className="pr-0 cursor-pointer  flex flex-row text-gray-600 hover:text-gray-800 w-[13%]">
              <ChevronLeft /> <span className='hidden lg:block'>Voltar</span>
            </button>
            <span className="text-lg font-semibold w-full text-center cursor-pointer"  >Gerenciar negócios</span>
            <button onClick={() => setCreate(true)} className=" flex flex-row justify-between cursor-pointer bg-[var(--darkgreen)]  hover:bg-green-950 p-2  rounded-lg text-white  w-[9%]">
              <Plus /> <span className='hidden lg:block'>Novo negócio</span>
            </button>
          </div>

          <div className="flex justify-center items-center w-full space-x-2 ">
            <input
              placeholder="Buscar negócio"
              className="w-full max-w-md text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={(e) => setPText(e.target.value)}
            />
            <button onClick={() => setText(ptext)} className="cursor-pointer bg-[var(--darkgreen)] text-sm p-2 rounded-lg text-white  hover:bg-green-950 ">
              Pesquisar
            </button>
            <button onClick={() => setFilterOpen(true)} aria-label="Filtro" className=" cursor-pointer bg-[var(--darkgreen)] p-2  rounded-lg text-white   hover:bg-green-950 <">
              <Filter size={20} />
            </button>
          </div>

          <div className="flex flex-wrap mt-6 justify-center">
            {companies.map((company: any) => (
              <div key={company._id} className="p-2  rounded-lg bg-white flex flex-col items-center justify-center ">
                <BusinessCard data={company} />
                <div className="flex justify-between my-2 w-full gap-2">
                  <button onClick={() => setEdit(company)} className="text-xs cursor-pointer hover:shadow-sm flex items-center gap-1 text-blue-400 p-2 rounded-lg bg-[var(--darkgreen)]/20 w-full justify-center"> <Pencil fill='#03aef1' size={16} /> Editar </button>
                  <button onClick={() => setIsDeleteAlert(company)} className="text-xs cursor-pointer hover:shadow-sm flex items-center gap-1 text-red-400 p-2 rounded-lg bg-[var(--darkgreen)]/20 w-full justify-center"> <Trash fill='#ff6969' size={16} /> Excluir </button>
                </div>
              </div>
            ))}
          </div>



          <div className="flex justify-center items-center gap-2 mt-4 mb-[60px]">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-4 py-1 border rounded font-bold hover:bg-gray-100 disabled:opacity-50 text-md"
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 2))}
              disabled={currentPage <= 2}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaAngleLeft />
            </button>
            <span className="px-2">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className=" cursor-pointer p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 2))}
              disabled={currentPage >= totalPages - 1}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaAngleDoubleRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-4 py-1 border font-bold rounded hover:bg-gray-100 disabled:opacity-50"
            >
              {totalPages}
            </button>
          </div></>)}
    </div>
  );
}
