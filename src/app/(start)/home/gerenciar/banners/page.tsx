/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import LoadingSpinner from "@/components/loadin";
import httpService from "@/shared/api/fetcher";
import { ChevronLeft, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DeleteBanneAlert } from "@/components/modals/modal-delete-banner";
import BannerModal from "@/components/modals/modal-sve-banner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IBanner } from "@/shared/interfaces/IBanner";
import useFetchBanners from "./hooks/fetchTags";
const BannersPage = () => {
  const router = useRouter();

  const [addModal, setAddModal] = useState(false);

  const [modalDelete, setModalDelete] = useState<string|undefined>(undefined);
  const [modalEdit, setModalEdit] = useState<IBanner|undefined>(undefined);

  const { banners,  isLoading, mutate } = useFetchBanners();

  const handleDelete = async (id: string) => {


    try {
      await httpService.delete(`/banners/${id}`);
      mutate(); // Atualiza os dados após a exclusão
      setModalDelete(undefined)
    } catch (error) {
      console.error("Erro ao excluir a tag:", error);
    }
  };


  return (
    <div className="p-4 w-full bg-transparent rounded-lg  mb-10 "
    >

      {/* Header */}
      {modalDelete &&
      <DeleteBanneAlert handleDelete={()=>  handleDelete(modalDelete)} onClose={()=> setAddModal(false)} />}

{modalEdit &&
     <BannerModal isOpen={true} onClose={() => setModalEdit(undefined)} banner={modalEdit} mutate={mutate} />
    }
{addModal &&
     <BannerModal isOpen={true} onClose={() => setAddModal(false)} banner={undefined} mutate={mutate} />
    }



      <div className="flex items-center mb-4">
      <button onClick={() => router.back()} className="pr-0 cursor-pointer  flex flex-row items-center jus text-gray-600 hover:text-gray-800 w-[13%]">
            <ChevronLeft /> <h2 className="text-xl font-bold ml-2">Banners</h2>
          </button>

      </div>
      <button onClick={()=> setAddModal(true)} className="cursor-pointer my-2 bg-[var(--darkgreen)] p-2 rounded-md text-white hover:bg-[var(--darkgreen2)]" >+ Criar banner</button>


      {/* Lista de Tags */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-wrap mt-6 justify-center gap-5">

          {banners.length === 0 ? (
            <p className="text-gray-500">Nenhuma tag encontrada.</p>
          ) : (
              <Table >
             <TableHeader className="bg-[var(--darkgreen)] ">
          <TableRow  className="border-gray-100 rounded-lg  " >
            <TableHead className="text-white  py-4">Nome</TableHead>
            <TableHead className="text-white  py-4 w-[10%]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
       { banners.map((ban: IBanner) => (
            <TableRow  className="border-gray-100" key={ban._id}>
              <TableCell className="py-4 ">
                <div className=" flex flex-col min-w-[100px] w-[170px]">
                 <img src={ban.linkImage} alt='sd'  />
                  </div>
                  </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-row gap-2">
              <button
                  className="bg-white text-white px-2 py-1 rounded-md cursor-pointer hover:shadow-md"
                  onClick={() => setModalDelete(ban._id)}
                >
                  <Trash className="text-red-500" />
                </button>
                <button
                  className="bg-white text-white px-2 py-1 rounded-md cursor-pointer hover:shadow-md"
                  onClick={() => setModalEdit(ban)}
                >
                  <Pencil  className="text-blue-500"/>
                </button>
                </div>
              </TableCell>

            </TableRow>
          ))}

       </TableBody>
      </Table>
      )}




    </div>)}
    </div>
  )
}
export default BannersPage  ;
