/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { profileSchema } from "@/shared/schemas/schemaUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

import httpService from "@/shared/api/fetcher";
import { initialInterests } from "@/shared/constants/options";
import { phoneMask } from "@/shared/functions/manipulatorStrings";
import { UserProfileSendData } from "@/shared/interfaces/IUser";
import { motion } from "framer-motion";
import { Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TermsModal from "./modaltermo";



const ModalCompleteUser = ({ fetchUser }: { fetchUser: () => void }) => {
  const router = useRouter()
  const [opn, setOpn] = useState(false)
  // Converte a imagem para base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String);
      };

      reader.onerror = (error) => {
        console.error("Erro ao ler o arquivo:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting }, watch } = useForm<UserProfileSendData>({
    resolver: yupResolver(profileSchema), // Agora o schema de validação está correto
    defaultValues: {
      firstName: "",
      lastName: "",
      image: "",
      phone: "",
      accept_term: true, // Valor padrão de accept_term deve ser um booleano
      interests: [],
      type: "",
    },
  });



  const image = watch("image");
  const onSubmit = async (data: UserProfileSendData) => {
    try {
      await httpService.put(`/users/complete`, data)

      toast.success("Dados atualizados com sucesso!");

      fetchUser()
      if (watch('type') === 'ofertante') {
        router.push("/home/negocios?from=interests");
      }


    } catch (error) {
      console.error("Erro ao adicionar a descrição:", error);
    }
  };


  return (
    <AlertDialog open >
      <AlertDialogContent className="max-w-md p-6 bg-white overflow-auto h-[94vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>Complete o seu perfil</AlertDialogTitle>

        </AlertDialogHeader>
        {opn &&

          <TermsModal onClose={() => setOpn(false)} />}
        <form className="flex flex-col gap-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center justify-center border-2 border-dashed border-[var(--darkgreenhome)]  rounded-full w-32 h-32 bg-teal-50 mx-auto relative">
                {!image ? (
                  <Image />
                ) : (
                  <img
                    src={image}
                    alt="Imagem selecionada"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
          </div>
          <div className='flex flex-col '>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Nome</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""

              render={({ field }) => (
                <input
                  id="firstName"

                  placeholder="Digite seu nome"
                  className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome)"
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">{errors.firstName.message}</span>
            )}
          </div>
          <div className='flex flex-col '>
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Sobrenome</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""

              render={({ field }) => (
                <input
                  id="lastName"

                  placeholder="Digite seu sobrenome"
                  className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome)"
                  {...field}
                />
              )}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">{errors.lastName.message}</span>
            )}
          </div>
          <div className='flex flex-col '>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone</label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  id="phone"
                  placeholder="Digite seu Telefone"
                  className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome)"
                  value={field.value} // Garante que o valor seja atualizado corretamente
                  onChange={(e) => field.onChange(phoneMask(e.target.value))} // Chama diretamente o formatador
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone.message}</span>
            )}
          </div>
          <div className='flex flex-col '>
            <label htmlFor="type" className="text-sm font-medium text-gray-700">Tipo  de usuário</label>
            <Controller
              name="type"
              control={control}
              defaultValue=""

              render={({ field }) => (

                <select id={'type'}       {...field} className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome)" aria-required="true" >
                  <option value="">Selecione uma opção</option>
                  <option value="consumidor">Consumidor</option>
                  <option value="ofertante">Ofertante</option>
                </select>
              )}
            />
            {errors.type && (
              <span className="text-red-500 text-xs">{errors.type.message}</span>
            )}
          </div>
          <div className='flex flex-col '>
            <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2">Selecione no mínimo 1 interesse</label>
            <Controller
              name="interests"
              control={control}
              defaultValue={[]} // Começa como um array vazio
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {initialInterests.map(({ value, label }) => (
                    <label key={value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, value] // Adiciona ao array
                            : field.value.filter((item) => item !== value); // Remove do array
                          field.onChange(newValue);
                        }}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.interests && (
              <span className="text-red-500 text-xs">{errors.interests.message}</span>
            )}
          </div>

          <div className='flex flex-col '>

            <Controller
              name="accept_term"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <label className="flex items-center space-x-2">

                  <Checkbox
                    id="accept_term"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  />
                  <span >Eu aceito os termos e condições</span>
                </label>
              )}
            />
            {errors.accept_term && (
              <span className="text-red-500 text-xs">{errors.accept_term.message}</span>
            )}
          </div>
          <span onClick={() => setOpn(true)}> Ver termos</span>
          <motion.button disabled={isSubmitting} type="submit"
            className="cursor-pointer w-full py-2 mb-4 lg:py-3 text-sm lg:text-md font-medium text-white bg-gradient-to-r from-[var(--darkgreenhome)] via-[var(--basegreen)] to-[var(--lightgreen)] rounded-lg shadow-md transition-all hover:from-[var(--basegreen)] hover:via-[var(--darkgreenhome)] hover:[var(--lightgreen)]"
            whileHover={{ scale: 1.05 }}

          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </motion.button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalCompleteUser;
