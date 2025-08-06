/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";




import httpService from "@/shared/api/fetcher";
import useFetch from "@/shared/api/swrfetcher";
import { optionsArea } from "@/shared/constants/options";

import { CompanyFormDataSave, ListFormData } from "@/shared/interfaces/ICompany";
import { Option } from "@/shared/interfaces/IFilter";
import { ITags } from "@/shared/interfaces/ITag";
import { listSchemaCreate } from "@/shared/schemas/listaSchema";

import authStore from "@/shared/stores/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlert, List, X } from "lucide-react";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";
import Select2 from "react-select";
import { toast } from "sonner";





type MultiStepFormProps = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void
};




const DialogCreateList = ({ isOpen, onClose, mutate }: MultiStepFormProps) => {
  const { user } = authStore;
  const methods = useForm<ListFormData>({
    resolver: yupResolver(listSchemaCreate),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      area: [],  // Garantir que nunca seja undefined
      isPromoting: false,


    },
  });
  const { data, isLoading, } = useFetch<{ data: ITags[], page: number, limit: number, totalPages: number }>(`/tags/getAll?all=true`);



  const tagsOptions = data?.data?.map((tag: ITags) => ({ value: tag._id!, label: tag.name, })) || [];



  const isInvalidForm = Object.keys(methods.formState.errors).length > 0



  const onSubmit = async (formData: ListFormData) => {
    if (user) {
      const formDataToSend: any = { ...formData };
      formDataToSend.tags = formData.tags.map((tag: Option) => tag.value);
      formDataToSend.area = formData.area.map((area: Option) => area.value);
      formDataToSend.owner = user._id
      formDataToSend.companiesDescription = []
      formDataToSend.businesses = []
      const formatedData: CompanyFormDataSave = formDataToSend

      try {


        await httpService.post(`/lists`, formatedData)

        toast.success("Lista criada com sucesso!");

        mutate()
        onClose();
      } catch (error) {
        console.log(error)
        toast.error((error as any)?.message || "Erro ao salvar negócio");
      }
    }
  };


  return (
    <div className={`fixed inset-0 flex z-29 items-center justify-center   bg-black/70 bg-opacity-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed bg-white rounded-lg shadow-lg w-full lg:w-[30%]  p-6 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <List className="text-xl" />
            <h2 className="text-lg font-bold">Criar Lista</h2>
          </div>
          <button onClick={onClose} className="text-black cursor-pointer"><X /></button>
        </div>




        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-0">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-col items-center text-center w-full space-y-4">
              {/* Nome do negócio */}
              <div className="w-full">
                <label className="block font-medium w-full text-start">Nome da lista</label>
                <Controller
                  control={methods.control}
                  name="name"
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Nome usado pelo negócio"
                      className="w-full p-2 border rounded-md"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block font-medium w-full text-start">Descrição</label>
                <Controller
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <textarea
                      placeholder="Algo que fale sobre o seu negócio"
                      className="w-full p-2 border rounded-md h-20"
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Área de atuação e Tipo de negócio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Área de atuação */}
                <div className="w-full">
                  <label className="block font-medium w-full text-start">Área de atuação</label>
                  <Controller
                    control={methods.control}
                    name="area"
                    render={({ field }) => (
                      <Select2
                        isMulti
                        placeholder="Selecionar área"
                        value={field.value || []}
                        onChange={(selected) => field.onChange(selected)}
                        options={optionsArea as {
                          value: string;
                          label: string;
                        }[]}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            borderColor: "#CBD5E0",
                            borderRadius: "0.375rem",
                            padding: "2px",
                            maxHeight: "80px",
                            overflowY: "auto",
                          }),
                        }}
                      />
                    )}
                  />
                </div>

                <div className="w-full">
                  <label className="block font-medium w-full text-start">Tags</label>
                  <Controller
                    control={methods.control}
                    name="tags"
                    render={({ field }) => (
                      <Select2
                        isMulti
                        options={tagsOptions}
                        value={field.value || []}
                        onChange={(selected) => field.onChange(selected)}
                        isDisabled={isLoading}
                        className="w-full"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            borderColor: "#CBD5E0",
                            borderRadius: "0.375rem",
                            padding: "2px",
                            maxHeight: "80px",
                            overflowY: "auto",
                          }),
                        }}
                      />
                    )}
                  />
                </div>


              </div>



              {/* Descrição */}

              {/* Checkbox para atuar em todo o Brasil */}
              <div className="flex items-center gap-2 w-full">
                <Controller
                  control={methods.control}
                  name="isPromoting"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <span>Promover Lista</span>
              </div>
            </div>
          </div>
          {
            Object.keys(methods.formState.errors).map((fieldName) => {
              const error = methods.formState.errors[fieldName as keyof ListFormData];
              return error ? <p key={fieldName} className="text-red-500 text-xs flex flex-row gap-2"><CircleAlert size={12} className="mt-[2px]" /> {error.message}</p> : null;
            })
          }

          {/* Adicione outros steps aqui */}
          <div className="flex flex-col  gap-2">

            <button
              type="submit"
              disabled={methods.formState.isSubmitting || isInvalidForm || !methods.formState.isDirty}
              className="cursor-pointer w-full bg-[var(--darkgreenhome)]  text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-950/50"
            >
              {methods.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>

        </form>
      </div> </div>
  );
};

export default observer(DialogCreateList)
