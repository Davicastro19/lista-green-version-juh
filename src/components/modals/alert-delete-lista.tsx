/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";
import httpService from "@/shared/api/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "swr";


export function DeleteListModal({ onClose, listDataId}: any) {
  const router = useRouter()
  const handleDeleteListAdmin = async () => {
    try {
      await httpService.delete(
        `/lists/${listDataId}`);



      toast.success("Lista removida com sucesso");
      mutate('/lists/getListsByUser')
      router.push('/home/lista-promocoes');
      onClose();
    } catch (error) {
     toast.error(`${error||''}`)
    }

  };



  return (
    <AlertDialog
    open={true}


        >
          <AlertDialogOverlay>
            <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
          <AlertDialogTitle>              Excluir Lista</AlertDialogTitle>
          <AlertDialogDescription> Você tem certeza que deseja excluir esta lista?</AlertDialogDescription>
        </AlertDialogHeader>




              <AlertDialogFooter>
              <button className="px-6 py-2 bg-gray-200 rounded-md text-black"  onClick={onClose}>
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-red-500 rounded-md text-white"

                  onClick={handleDeleteListAdmin}

                >
                  Excluir
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  );
}
