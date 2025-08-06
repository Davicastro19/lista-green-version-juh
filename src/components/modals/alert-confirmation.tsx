/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";


export function AletConfimation({ Handle,onClose, text, title}: { Handle: ()=> void, onClose: ()=> void, title:string, text:string}) {



  return (
    <AlertDialog
    open={true}>
          <AlertDialogOverlay>
            <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>




              <AlertDialogFooter>
              <button className=" cursor-pointer px-6 py-2 bg-gray-200 rounded-md text-black"  onClick={onClose}>
                  Cancelar
                </button>
                <button className="cursor-pointer px-6 py-2 bg-green-500 rounded-md text-white"

                  onClick={Handle}

                >
                  Confirmar
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  );
}
