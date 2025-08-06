/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import LoadingSpinner from "@/components/loadin";
import useFetch from "@/shared/api/swrfetcher";

import { formatListName } from "@/shared/functions/cardsFunctions";
import { ResponseData } from "@/shared/interfaces/IList";
import { ITags } from "@/shared/interfaces/ITag";
import { listSchema } from "@/shared/schemas/listaSchema";
import authStore from "@/shared/stores/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";




import BusinessDescriptionEdit from "@/components/business-description-edit";
import BusinessCard from "@/components/cards/BusinessCard/BusinessCard";
import { AlertDeleteCompanyInList } from "@/components/modals/alert-delete-company-in-list";
import { DeleteListModal } from "@/components/modals/alert-delete-lista";
import { DialogAddCompaniesInList } from "@/components/modals/dialog-add-company-in-list";
import SearchTagsModal from "@/components/modals/search-tags-modal";
import Shared from "@/components/share";
import httpService from "@/shared/api/fetcher";
import { ChevronLeftIcon, ChevronRightIcon, Pencil } from "lucide-react";
import { observer } from "mobx-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";




export default function ListaPage() {

  const params = useParams();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string);
    }
  }, [params]);

  return slug ? <APP slug={slug} /> : <div className="flex justify-center items-center h-screen bg-white">
  <LoadingSpinner />
</div>;
}

function ListaContent({ slug }: { slug: string }) {

    const currentList = slug;
    const { control, handleSubmit, formState: { isSubmitting, isDirty }, setValue } = useForm({ resolver: yupResolver(listSchema) });
    const [isOpenSearchTag, setIsOpenSearchTag] = useState(false);
    const formattedListName = formatListName(slug);
    const [page, setPage] = useState(1);
    const { isLoading, data, mutate } = useFetch<ResponseData>(`/lists/search?nameList=${formattedListName}&page=${page}&limit=10`)
    const { user } = authStore
    const [isAddBusinessOpen, setAddBusinessClose] = useState(false);
    const [isDeleteCompanyInList, closeDeleteCompanyInList] = useState<{ id: string, listId: string } | undefined>(undefined)
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    //const { companysIds, addCompanyId, removeCompanyId } = useCompanyLikedStore();
    const [tags, setTags] = useState<ITags[]>([]);

  useEffect(() => {
    if (data) {
      setValue('name', data.listData?.name);
      setValue('description', data.listData?.description);
      setTags(data.listData.tags);
      //setPage(1);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  async function handleDeleteCompanyInList() {
    try {
      await httpService.delete(`/lists/deleteCompanyInList?id=${isDeleteCompanyInList?.id}&listId=${isDeleteCompanyInList?.listId}`);

      toast.success("Negócio deletado com sucesso");
      mutate();
      closeDeleteCompanyInList(undefined);
    } catch (error) {
      console.error("Erro ao remover negócio:", error);
      toast.error("Erro ao remover negócio");
    }
  }

  async function handleEditList(data_base: { name: string; description: string }) {
    try {
    await httpService.put<{ message: string }>(
        `/lists/edit?id=${data?.listData.id}`,
        {

          name: data_base.name,
          description: data_base.description,
        }
      );


      toast.success("Lista editada com sucesso");


    } catch (error) {

      toast.error(`Erro ao editar a lista: ${error || ''}`);
    }
  }

  return (
    <div className="p-1 lg:p-5 w-full bg-white rounded-lg overflow-auto min-h-screen">

<form onSubmit={handleSubmit(handleEditList)} className="w-full flex justify-between items-start gap-2">
        <div className="flex flex-col items-start w-full gap-2">
          {user?.type === 'admin' ? (
            <>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="w-full text-xl lg:text-3xl font-bold"
                    {...field}
                   // isInvalid={!!errors.name} // Erro de validação
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    className="w-full  text-md lg:text-lg"
                    {...field}
                    //isInvalid={!!errors.description} // Erro de validação
                  />
                )}
              />
            </>
          ) : (
            <>
              <h1 className="text-start text-lg w-full">{data?.listData.name}</h1>
              <p>{data?.listData.description}</p>
            </>
          )}
          <div className="flex space-x-2 ">
            {data?.listData.tags.slice(0, 6).map((tag, index: number) => (
              <span
                key={index}
                className="flex justify-center items-center  py-0 px-2 lg:py-1 lg:px-3 text-xs lgtext-sm bg-[var(--basegreen)] text-white rounded-full"
              >
                <text>{tag.name}</text>
              </span>
            ))}
              <span
                   className="flex justify-center items-center  py-0 px-2 lg:py-1 lg:px-3 text-xs lgtext-sm bg-[var(--basegreen)] text-white rounded-full"
              >
                <text>...</text>
              </span>
            {user?.type === "admin" && (
              <button
              type="button"
                className="text-gray-700 cursor-pointer"
                onClick={() => setIsOpenSearchTag(true)}
              >
                <Pencil/>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
         <Shared name={currentList} />
         {user?.type === 'admin' && (
  <>

    <button
      className=" cursor-pointer  bg-[var(--glowgreen)] text-white w-30 lg:w-40 px-2 lg:px-4 py-1 lg:py-2 rounded-md hover:bg-[var(--basegreen)] focus:outline-none disabled:opacity-50"
      type="submit"
      disabled={!isDirty || isLoading || isSubmitting}

    >
      Salvar
    </button>


    <button
      className=" cursor-pointer bg-red-500 text-white w-30 lg:w-40 px-2 lg:px-4 py-1 lg:py-2 rounded-md hover:bg-red-600 focus:outline-none mt-2"
      onClick={() => setIsOpenDelete(true)}
    >
      Excluir
    </button>


  </>
)}


        </div>
      </form>

      <div className="flex w-full justify-between  items-center bg-[var(--basegreen)] mt-10 rounded-md p-1">
        <div/>
        <text className="font-semibold text-white text-lg lg:text-2xl ">Negócios da Lista</text>
        <button
      className="  cursor-pointer  bg-white text-[var(--darkgreen)]  w-30 lg:w-40 px-2 lg:px-4 py-1 lg:py-2 rounded-md hover:bg-[var(--graygreen2)] focus:outline-none "
      onClick={() => setAddBusinessClose(true)}
    >
      Adicionar
    </button>
      </div>

      <div className="flex flex-wrap gap-10 mt-10 justify-between">
      {data?.data.map((company: any) =>
        company && company._id ? (
          <div className=" flex flex-col bg-gray-100 rounded-lg  " key={company._id}>
            <BusinessCard
              data={company}
              //addCompanyId={()=> {} }
              //removeCompanyId={()=>{}}
              //deleteHandle={() => closeDeleteCompanyInList({ id: company._id, listId: data.listData.id })}
              //selectedArea="no"
              //user={user}
              //companysIds={[]}
            />
            {data.listData.isPromoting &&
            <div className="w-full ">
              <BusinessDescriptionEdit
                isEdit={user?.type === 'admin'}
                company={data.listData.companiesDescription.find((c) => c.companyId === company._id)}
                mutate={mutate}
                listDataId={data.listData.id}
              />
            </div>}
          </div>
        ) : null
      )}
    </div>

    <div className="flex justify-center mt-10 space-x-2">
      <button
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
        disabled={data.currentPage === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2" />
        Anterior
      </button>

      {[...Array(data.totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            className={`px-4 py-2 rounded-md ${data.currentPage === pageNum ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-gray-300`}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
        disabled={data.currentPage === data.totalPages}
        onClick={() => setPage(page + 1)}
      >
        Próximo
        <ChevronRightIcon className="w-5 h-5 ml-2" />
      </button>
    </div>
    {isDeleteCompanyInList && <AlertDeleteCompanyInList closeDeleteCompanyInListModal={closeDeleteCompanyInList} handleDeleteCompanyInList={handleDeleteCompanyInList} />}
    {isAddBusinessOpen && <DialogAddCompaniesInList onclose={setAddBusinessClose} listDataId={data.listData.id} mutate={mutate} />}
    {isOpenSearchTag && ( <SearchTagsModal idList={String(data.listData.id)}  onClose={() => setIsOpenSearchTag(false)} tagsSelected={tags} mutate={mutate} /> )}
    {isOpenDelete && <DeleteListModal listDataId={data.listData.id} onClose={() => setIsOpenDelete(false)} />}
    </div>
  );
}



const APP = observer(ListaContent)
