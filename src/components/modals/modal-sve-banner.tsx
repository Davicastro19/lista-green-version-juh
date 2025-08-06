/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";
import httpService from "@/shared/api/fetcher";
import { IBanner } from "@/shared/interfaces/IBanner";

import { FileText, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner?: IBanner | null;
  mutate: () => void;
}

const BannerModal = ({ isOpen, onClose, banner, mutate}: BannerModalProps) => {
  const [title, setTitle] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [linkImageError, setLinkImageError] = useState("");


  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setLinkImage(banner.linkImage);
    } else {
      setTitle("");
      setLinkImage("");
    }
  }, [banner]);

  const handleSave = async () => {
    let hasError = false;

    if (!title.startsWith("http://") && !title.startsWith("https://")) {
      setTitleError("O link do conteúdo deve começar com 'http://' ou 'https://' ");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!linkImage.startsWith("http://") && !linkImage.startsWith("https://")) {
      setLinkImageError("O link da imagem deve começar com 'http://' ou 'https://' ");
      hasError = true;
    } else {
      setLinkImageError("");
    }

    if (hasError) {
      return;
    }




    const endpoint = banner ? `/banners/${banner._id}` : "/banners";

    try {
      if(banner){
        await httpService.put(endpoint,   {
            title,
            linkImage,
          })
      }else{
        await httpService.post(endpoint,   {
            title,
            linkImage,
          })
      }

mutate()
      onClose();

    } catch (error:any) {
      toast.error('Erro ao salvar ou atualizar banner');
    }
  };

  return (
    <AlertDialog
    open={true}


        >
          <AlertDialogOverlay>
            <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
          <AlertDialogTitle>{banner ? "Editar Banner" : "Novo Banner"}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Link do conteúdo</label>
              <div className="relative">
                <FileText className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input  className=" pl-8 text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:var(--darkgreenhome) "
               value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Link do conteúdo" />
                {titleError && <p className="text-sm text-red-500">{titleError}</p>}
              </div>
            </div>
            <div className="space-y-2">
                {linkImage &&
                <div className="flex items-center justify-center">
    <img src={linkImage} className="w-40 h-40" />
                </div>
                }
              <label className="text-sm font-medium">Link da Imagem</label>
              <div className="relative">
                <ImageIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input className="pl-8  text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:var(--darkgreenhome) "
               value={linkImage} onChange={(e) => setLinkImage(e.target.value)} placeholder="https://imgur.com/..." />
                {linkImageError && <p className="text-sm text-red-500">{linkImageError}</p>}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel className="cursor-pointer" onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {banner ? "Atualizar" : "Criar"}
          </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  );
};

export default BannerModal;
