import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';


function TermsModal({ onClose }: { onClose: () => void }) {


    return (
        <AlertDialog open >
            <AlertDialogContent className="max-w-md p-6 bg-white overflow-auto ">
                <AlertDialogHeader>
                    <AlertDialogTitle>Termos</AlertDialogTitle>

                </AlertDialogHeader>
                <iframe src="/images/termodeuso.html" width="100%" height="500px" />
                <button type="button" onClick={onClose} className="bg-red-300 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                    Sair
                </button>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default TermsModal;
