import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AddDeleteCompanyInListModalProps {
  closeDeleteCompanyInListModal: (value: undefined) => void;
  handleDeleteCompanyInList: () => void;
}

export function AlertDeleteCompanyInList({ closeDeleteCompanyInListModal, handleDeleteCompanyInList, }: AddDeleteCompanyInListModalProps) {
  return (
    <AlertDialog open onOpenChange={(isOpen) => !isOpen && closeDeleteCompanyInListModal(undefined)}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja remover esse Negócio da lista?</AlertDialogTitle>
          <AlertDialogDescription>
            Depois de feita, não há como desfazer esta ação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeDeleteCompanyInListModal(undefined)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteCompanyInList}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
