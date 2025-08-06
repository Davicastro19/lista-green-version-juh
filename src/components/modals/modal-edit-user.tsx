/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import httpService from "@/shared/api/fetcher";
import { initialInterests } from "@/shared/constants/options";
import { phoneMask } from "@/shared/functions/manipulatorStrings";
import { IUser, UserProfileSendDataEdit } from "@/shared/interfaces/IUser";
import { profileSchemaEdit } from "@/shared/schemas/schemaUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image as LucideImage } from "lucide-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

const ModalEditUser = ({ fetchUser, onClose, user }: { fetchUser: () => void; onClose: () => void; user: IUser }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserProfileSendDataEdit>({
    resolver: yupResolver(profileSchemaEdit),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      image: user?.image || "",
      phone: user?.phone || "",
      interests: user?.interests || [],
      type: user?.type || ""
    },
  });

  useEffect(() => {
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    setValue("phone", user?.phone || "");
    setValue("image", user?.image || "");
    setValue("interests", user?.interests || []);
  }, [user, setValue]);

  const image = watch("image");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB.");
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

  const onSubmit = async (data: UserProfileSendDataEdit) => {
    setLoading(true);
    try {
      await httpService.put(`/users/complete`, { ...data, accept_term: true });
      toast.success("Perfil atualizado com sucesso!");
      fetchUser();
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex items-center justify-center border-2 border-dashed border-green-700 rounded-full w-32 h-32 bg-teal-50 mx-auto relative">
            {!image ? <LucideImage /> : <img src={image} alt="Imagem selecionada" className="w-full h-full object-cover rounded-full" />}
          </div>
        </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <Controller name="firstName" control={control} render={({ field }) => <input className="input px-3 py-1" {...field} />} />
        {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Sobrenome</label>
        <Controller name="lastName" control={control} render={({ field }) => <input className="input px-3 py-1" {...field} />} />
        {errors.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Telefone</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <input className="input px-3 py-1" value={field.value} onChange={(e) => field.onChange(phoneMask(e.target.value))} />}
        />
        {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Tipo de usuário</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <select className="input px-3 py-1" {...field}>
              <option value="">Selecione uma opção</option>
              <option value="consumidor">Consumidor</option>
              <option value="ofertante">Ofertante</option>
            </select>
          )}
        />
        {errors.type && <span className="text-red-500 text-xs mt-1">{errors.type.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Selecione no mínimo 1 interesse</label>
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2">
              {initialInterests.map(({ value, label }) => (
                <label key={value} className="cursor-pointer flex items-center space-x-2">
                  <Checkbox
                    className="cursor-pointer"
                    checked={field.value.includes(value)}
                    onCheckedChange={(checked) =>
                      field.onChange(
                        checked
                          ? [...field.value, value]
                          : field.value.filter((item) => item !== value)
                      )
                    }
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.interests && <span className="text-red-500 text-xs mt-1">{errors.interests.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="cursor-pointer w-full bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-400/30 disabled:cursor-auto"
      >
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default observer(ModalEditUser);
