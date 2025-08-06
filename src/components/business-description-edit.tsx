
import httpService from '@/shared/api/fetcher';
import { CompanyDescription, ResponseData } from '@/shared/interfaces/IList';
import { schemaCompaniesDescription } from '@/shared/schemas/listaSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { KeyedMutator } from 'swr';


const BusinessDescriptionEdit = ({ company, mutate, listDataId, isEdit }: {isEdit: boolean, company: CompanyDescription | undefined, mutate: KeyedMutator<ResponseData>, listDataId:string}) => {
  const { control, handleSubmit, formState: { isSubmitting, isDirty } } = useForm({
    resolver: yupResolver(schemaCompaniesDescription),
    defaultValues: { description: company?.description||'' },
  });

  const onSubmit = (data: { description: string; }) => {
    onSave(company?.companyId||'', data.description);
    mutate();
  };

  const onSave = async (companyId: string, newDescription: string) => {
    try {
      await httpService.put(`/lists/${listDataId}/update-description/${companyId}`, { description: newDescription });

      toast.success('Descrição salva.');
      mutate();
    } catch (error) {
      console.log(error)
      toast.error('Erro ao salvar a descrição');
    }
  };

  if (isSubmitting || !company) {
    return <></>;
  }

  return (
    <div className="bg-transparent w-full p-4 rounded-lg">
      <div className="w-full flex items-center">
        <text className="text-gray-500 text-sm">Descrição:</text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {isEdit ? (
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full mt-2 bg-white p-2"
                placeholder="Digite a descrição"
                //isInvalid={!!errors.description}
              />
            )}
          />
        ) : (
          <text className="mt-2">{company.description}</text>
        )}
        {isDirty && (
           <button
           className=" w-full mt-2 cursor-pointer  bg-[var(--glowgreen)] text-white px-4 py-2 rounded-md hover:bg-[var(--basegreen)] focus:outline-none disabled:opacity-50"
           type="submit"
           disabled={!isDirty  || isSubmitting}

         >
           Salvar
         </button>
        )}
      </form>
    </div>
  );
};

export default BusinessDescriptionEdit;
