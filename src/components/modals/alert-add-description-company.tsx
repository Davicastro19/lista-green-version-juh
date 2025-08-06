/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { BASE_URL } from "@/shared/constants/urls";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import * as Yup from "yup";

const schema = Yup.object().shape({
  description: Yup.string()
    .required("A descrição é obrigatória.")
    .max(400, "A descrição não pode exceder 400 caracteres."),
});

const AlertAddDescriptionCompany = ({ companyId, listId, onClose, mutate }: { companyId: string, listId: string, onClose: () => void, mutate:any }) => {
  const [description, setDescription] = useState("");

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { description: "" },
  });


  const onSubmit = async (data: { description: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/lists/add/${listId}/addCompanyDescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, description: data.description }),
      });

      if (!response.ok) {
        const repo = await response.json();
        toast.error(`${repo.message}`);
      } else {
        mutate();
        toast.success("Descrição adicionada com sucesso!");
        onClose();
      }
    } catch (error) {
      console.error("Erro ao adicionar a descrição:", error);
    }
  };

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md p-6 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Descrição</AlertDialogTitle>
          <AlertDialogDescription>
            Insira uma descrição para a empresa. Máximo de 400 caracteres.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Digite a descrição aqui..."
                maxLength={400}
                className="border rounded-md p-2 w-full"
                onChange={(e) => {
                  setDescription(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit(onSubmit)}
            disabled={!description.trim() || isSubmitting}
          >
            {isSubmitting ? "Adicionando..." : "Adicionar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAddDescriptionCompany;
