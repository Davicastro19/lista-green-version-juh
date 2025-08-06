/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ITags } from "@/shared/interfaces/ITag";

import LoadingSpinner from "@/components/loadin";
import httpService from "@/shared/api/fetcher";
import { optionsArea, preferences } from "@/shared/constants/options";
import { ChevronLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from 'react-select';
import useFetchTags from "./hooks/fetchTags";

import AddTagModal from "@/components/modals/moda-add-tag";
import { DeleteTagAlert } from "@/components/modals/modal-delete-tag";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ActionMeta, MultiValue } from 'react-select';
const TagsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [availableThemes, setAvailableThemes] = useState<any[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalDelete, setModalDelete] = useState<string|undefined>(undefined);
  const tagsPerPage = 12;
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const { tags, page, totalPages, isLoading, mutate } = useFetchTags(
    currentPage,
    tagsPerPage,
    selectedAreas,
    selectedThemes,
    searchTerm
  );

  const handleDelete = async (id: string) => {


    try {
      await httpService.delete(`/tags/${id}`);
      mutate(); // Atualiza os dados após a exclusão
      setModalDelete(undefined)
    } catch (error) {
      console.error("Erro ao excluir a tag:", error);
    }
  };

  const handleThemeSelection = (newValue: MultiValue<{ value: string, label: string }>, actionMeta: ActionMeta<{ value: string, label: string }>) => {

    const selectedOptions = newValue.map(option => option); // Convertendo de MultiValue para any[]
    setSelectedThemes(selectedOptions);
  };

  const handleAreaSelection = (newValue: MultiValue<{ value: string, label: string }>) => {
    const selectedOptions = newValue.map(option => option); // Convertendo de MultiValue para any[]

    setSelectedAreas(selectedOptions);
    const themes = selectedOptions.flatMap(option => preferences[option.value]);
    setAvailableThemes([...new Set(themes)].map(theme => ({ value: theme, label: theme })));
  };
  return (
    <div className="p-4 w-full bg-transparent rounded-lg  "
    >
      {modalDelete  &&
      <DeleteTagAlert handleDeleteTag={()=> handleDelete(modalDelete)} onClose={()=> setModalDelete(undefined)} />
      }
      {/* Header */}
      {addModal &&
      <AddTagModal isOpen={true} onClose={()=> setAddModal(false)} />}
      <div className="flex items-center mb-4">

      <button onClick={() => router.back()} className="pr-0 cursor-pointer  flex flex-row items-center jus text-gray-600 hover:text-gray-800 w-[13%]">
            <ChevronLeft /> <h2 className="text-xl font-bold ml-2">Tags</h2>
          </button>


      </div>
      <button onClick={()=> setAddModal(true)} className=" my-2 bg-[var(--darkgreen)] p-2 rounded-md text-white hover:bg-[var(--darkgreen2)]" >+ Criar tag</button>
      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="w-[70%] border p-2 rounded-md "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
     <Select
                  isMulti
                  value={selectedAreas}
                  options={optionsArea}
                  onChange={handleAreaSelection}
                  placeholder="Selecionar áreas"
                />
       <Select
                  isMulti
                  value={selectedThemes}
                  options={availableThemes}
                  onChange={handleThemeSelection}
                  placeholder="Selecionar temas"
                />

      </div>

      {/* Lista de Tags */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-wrap mt-6 justify-center gap-5">

          {tags.length === 0 ? (
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
       { tags.map((tag: ITags) => (
            <TableRow  className="border-gray-100" key={tag._id}>
              <TableCell className="py-4 ">
                <div className=" flex flex-col min-w-[100px] w-[170px]">
                  <span className="truncate ">{tag.name}</span>
                  </div>
                  </TableCell>
              <TableCell className="py-4">
              <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:shadow-md"
                  onClick={() => setModalDelete(tag._id)}
                >
                  <Trash />
                </button>
              </TableCell>
            </TableRow>
          ))}

       </TableBody>
      </Table>
      )}


      <div className="flex justify-between items-center mt-4 mb-10" >

        <div className="flex gap-2 justify-center items-center">
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
          <MdKeyboardDoubleArrowLeft   />
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft  />
          </button>
          <p>
        {page} de {totalPages}
        </p>
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <MdKeyboardArrowRight  />
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage >= totalPages}
          >
         <MdKeyboardDoubleArrowRight  />
          </button>
        </div>
      </div>

    </div>)}
    </div>
  )
}
export default TagsPage;
