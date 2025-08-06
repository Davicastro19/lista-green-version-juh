/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { IUser } from "@/shared/interfaces/IUser";


export function DeleteUserAlert({ handleDeleteUser,onClose, user}: { handleDeleteUser: ()=> void, onClose: ()=> void, user:IUser}) {



  return (
    <AlertDialog
    open={true}


        >
          <AlertDialogOverlay>
            <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
          <AlertDialogTitle>              Excluir Usuario</AlertDialogTitle>
          <AlertDialogDescription>{` Tem certeza que deseja excluir o usuário "
            ${user?.firstName} ${user?.lastName}"? Esta
            ação não pode ser desfeita.`}</AlertDialogDescription>
        </AlertDialogHeader>




              <AlertDialogFooter>
              <button className=" cursor-pointer px-6 py-2 bg-gray-200 rounded-md text-black"  onClick={onClose}>
                  Cancelar
                </button>
                <button className="cursor-pointer px-6 py-2 bg-red-500 rounded-md text-white"

                  onClick={handleDeleteUser}

                >
                  Excluir
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  );
}
