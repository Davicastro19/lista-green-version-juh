/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BusinessCard from '@/components/cards/BusinessCard/BusinessCard';
import LoadingSpinner from '@/components/loadin';
import { AletConfimation } from '@/components/modals/alert-confirmation';
import { motion } from "framer-motion";
import { ChevronLeft, Pencil, Plus, Trash } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';

import MultiStepFormCreateCompanies from '@/components/modals/modal-multistep-form-companies/modal-multistep-form-create-companies';
import MultiStepFormEditCompanies from '@/components/modals/modal-multistep-form-companies/modal-multistep-form-edit-companies';
import httpService from '@/shared/api/fetcher';
import useFetch from '@/shared/api/swrfetcher';
import { ICompany } from '@/shared/interfaces/ICompany';
import authStore from '@/shared/stores/authStore';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';


function Business() {
  const router = useRouter();
  const { user } = authStore

  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState('');
  const [ptext, setPText] = useState('');
  const searchParams = useSearchParams();
  const [isDeleteAlert, setIsDeleteAlert] = useState<null | ICompany>(null);
  const [edit, setEdit] = useState<null | ICompany>(null);
  const [create, setCreate] = useState<boolean>(false);
  // Construção dinâmica dos parâmetros da URL
  const queryParams = new URLSearchParams();
  queryParams.append('page', currentPage.toString());
  queryParams.append('isMember', 'true');

  if (text) queryParams.append('text', text);

  const { data, error, mutate, isLoading } = useFetch<any>(`/companies/byUser?${queryParams.toString()}`);

  const companies = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleDeleteCompanyAdmin = async () => {
    if (isDeleteAlert?._id) {
      try {
        await httpService.delete(`/companies/${isDeleteAlert._id}`);

        toast.success('Negócio deletado com sucesso');
        mutate(); // Atualiza a lista após a exclusão
        setIsDeleteAlert(null);
      } catch (error: any) {

        toast.error('Erro ao remover negócio');
      }
    }
  };
  useEffect(() => {
    const from = searchParams.get('from');
    if (from === 'interests') {
      setCreate(true);

    }
  }, []);

  if (!user) {
    return (<div className="p-4 flex justify-center items-center ">
      <div className="flex flex-col  w-full sm:w-[30%] gap-4 ">
        <text className="text-center">Para conseguir salvar listas, faça o login ou cadastre-se na Lista Green.</text>
        <motion.button
          className="cursor-pointer w-full py-2 lg:py-3 text-sm lg:text-md font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)] rounded-lg shadow-xl transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.location.href = "/login"}
        >
          Faça o login
        </motion.button>
        <motion.button
          className=" cursor-pointer w-full  py-2 lg:py-3  text-sm  lg:text-md font-medium text-[var(--darkgreenhome)] bg-gradient-to-r from-white to-[#c8ffea] rounded-lg shadow-xl transition-all hover:from-[#c8ffea] hover:via-[#defff2] hover:to-[#fff]"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.location.href = "/cadastro"}
        >
          Crie sua conta
        </motion.button>
      </div>
    </div>)
  }
  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <span className="text-red-500">Ocorreu um erro ao carregar os dados.</span> {/* Exibe uma mensagem de erro */}
      </div>
    );
  }

  return (
    <div className="p-4">
      {create &&
        <MultiStepFormCreateCompanies isOpen={true} onClose={() => setCreate(false)} mutate={mutate} />}
      {edit &&
        <MultiStepFormEditCompanies isOpen={true} onClose={() => setEdit(null)} company={edit} mutate={mutate} />}
      {isDeleteAlert && <AletConfimation onClose={() => setIsDeleteAlert(null)} Handle={() => handleDeleteCompanyAdmin()} title={`Deletar negócio`} text={`Tem certeza que deseja excluir "${isDeleteAlert.name}"? Essa ação não pode ser desfeita.`} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-row items-center gap-4 mb-4 w-full">
            <button onClick={() => router.push('/home/gerenciar')} className="pr-0 cursor-pointer  flex flex-row text-gray-600 hover:text-gray-800 w-[13%]">
              <ChevronLeft /> <span className='hidden lg:block'>Voltar</span>
            </button>
            <span className="text-lg font-semibold w-full text-center cursor-pointer"  >Meus negócios</span>
            <button onClick={() => setCreate(true)} className="  flex-row hidden lg:block justify-around cursor-pointer bg-[var(--darkgreen)]  hover:bg-green-950 p-2  rounded-lg text-white  w-[13%]">
              <Plus /> <span className=''>Novo negócio</span>
            </button>
          </div>
          <button onClick={() => setCreate(true)} className="flex  mb-2 flex-row  lg:hidden justify-center cursor-pointer bg-[var(--darkgreen)]  hover:bg-green-950 p-2  rounded-lg text-white  w-full
          ">
            <Plus /> <span className=''>Novo negócio</span>
          </button>
          <div className="flex justify-center items-center w-full space-x-2 ">
            <input
              placeholder="Buscar negócio"
              className="w-full max-w-md text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={(e) => setPText(e.target.value)}
            />
            <button onClick={() => setText(ptext)} className="cursor-pointer bg-[var(--darkgreen)] text-sm p-2 rounded-lg text-white  hover:bg-green-950 ">
              Pesquisar
            </button>

          </div>

          <div className="flex flex-wrap mt-6 justify-center">
            {companies.map((company: any) => (
              <div key={company._id} className="p-2  rounded-lg bg-white flex flex-col items-center justify-center ">
                <BusinessCard data={company} />
                <div className="flex justify-between my-2 w-full gap-2">
                  <button onClick={() => setEdit(company)} className="text-xs cursor-pointer hover:shadow-sm flex items-center gap-1 text-blue-500 p-2 rounded-lg bg-[var(--darkgreen)]/20 w-full justify-center font-bold"> <Pencil fill='#03aef1' size={16} /> Editar </button>
                  <button onClick={() => setIsDeleteAlert(company)} className="text-xs cursor-pointer hover:shadow-sm flex items-center gap-1 text-red-400 p-2 rounded-lg bg-[var(--darkgreen)]/20 w-full justify-center font-bold"> <Trash fill='#ff6969' size={16} /> Excluir </button>
                </div>
              </div>
            ))}
            {companies.length === 0 && (
              <>

                <div className="w-[310px] md:w-[427px] h-[310px] md:h-[427px]  my-10">
                  <Image
                    src="/images/negocios/empatiaNegocios.svg"
                    alt="Empatia de Negócios"
                    className="w-[427px] h-[427px] object-contain"
                    width={100}
                    height={200}
                  />
                  <p className="font-bold text-[#26847B] text-center sm:text-start text-[18px] sm:text-[22px] mt-2">
                    Crie seu primeiro negócio agora!
                  </p>
                </div>

              </>)}
          </div>



          <div className="flex justify-center  items-center gap-2 mt-4 mb-[180px]">
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




const BusinessPage = () => (
  <Suspense fallback={<div className="p-4">Carregando...</div>}>
    <Business />
  </Suspense>
)

export default observer(BusinessPage)
