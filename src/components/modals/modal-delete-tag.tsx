/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";


export function DeleteTagAlert({ handleDeleteTag,onClose}: { handleDeleteTag: ()=> void, onClose: ()=> void}) {



  return (
    <AlertDialog
    open={true}


        >
          <AlertDialogOverlay>
            <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
          <AlertDialogTitle>              Excluir Tag</AlertDialogTitle>
          <AlertDialogDescription>{` Tem certeza que deseja excluir essa tag?`}</AlertDialogDescription>
        </AlertDialogHeader>




              <AlertDialogFooter>
              <button className=" cursor-pointer px-6 py-2 bg-gray-200 rounded-md text-black"  onClick={onClose}>
                  Cancelar
                </button>
                <button className="cursor-pointer px-6 py-2 bg-red-500 rounded-md text-white"

                  onClick={handleDeleteTag}

                >
                  Excluir
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  );
}
