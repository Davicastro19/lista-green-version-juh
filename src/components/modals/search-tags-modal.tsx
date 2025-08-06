import httpService from "@/shared/api/fetcher";
import useFetch from "@/shared/api/swrfetcher";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface AddToListModalProps {
  onClose: () => void;

  tagsSelected: TagDTO[];
  idList: string;
  mutate: () => void;
}

interface TagDTO {
  _id?: string;
  theme: string[];
  name: string;
  area: string[];
  totalConnections?: number;
}

const tagsPerPage = 10;

const SearchTagsModal: React.FC<AddToListModalProps> = ({
  onClose,
  tagsSelected,
  idList,
  mutate,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTags, setSelectedTags] = useState<TagDTO[]>(tagsSelected);
  const { data, isLoading } = useFetch<{data:TagDTO[]}>(`/tags/getAll?all=true&page=${currentPage}`);

  const tags: TagDTO[] = data?.data || [];
  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const visibleTags = filteredTags.slice((currentPage - 1) * tagsPerPage, currentPage * tagsPerPage);

  const handleTagClick = (tag: TagDTO) => {
    setSelectedTags((prevTags) =>
      prevTags.some((selectedTag) => selectedTag._id === tag._id)
        ? prevTags.filter((selectedTag) => selectedTag._id !== tag._id)
        : [...prevTags, tag]
    );
  };

  async function handleEditList() {
    try {
      await httpService.put<{ message: string }>(
        `/lists/editTag?id=${idList}`,
        { tags: selectedTags.map((tag) => tag._id) }
      );
      mutate();
      onClose();
    } catch (error) {
      console.error("Erro ao editar a lista:", error);
      toast.error("Erro ao editar a lista");
    }
  }

  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Tags</AlertDialogTitle>
          <AlertDialogDescription>Selecione as tags desejadas para adicionar à lista.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="relative flex items-center mb-4">
          <SearchIcon className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Nome da Tag"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500" />
            </div>
          ) : (
            visibleTags.map((tag) => (
              <button
                key={tag._id}
                className={`px-3 py-1 text-xs rounded-md ${
                  selectedTags.some((t) => t._id === tag._id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </button>
            ))
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <AlertDialogFooter>
          <button className="px-6 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancelar</button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700" onClick={handleEditList}>Salvar</button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SearchTagsModal;
