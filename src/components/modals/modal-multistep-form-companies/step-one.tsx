import useFetch from "@/shared/api/swrfetcher";
import { optionsArea, states } from "@/shared/constants/options";
import { Option } from "@/shared/interfaces/IFilter";
import { ITags } from "@/shared/interfaces/ITag";
import { Controller, useFormContext } from "react-hook-form";
import Select2 from "react-select";


export const StepOne: React.FC = () => {
  const { data, isLoading, } = useFetch<{data:ITags[], page:number, limit:number, totalPages:number}>(`/tags/getAll?all=true`);
  const { control } = useFormContext();



  const tagsOptions =
    data?.data?.map((tag:ITags) => ({
      value: tag._id,
      label: tag.name,
    })) || [];



  if (isLoading || !data?.data) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center text-center w-full space-y-4">
        {/* Nome do negócio */}
        <div className="w-full">
          <label className="block font-medium w-full text-start">Nome do negócio</label>
          <Controller
            control={control}
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

        {/* Área de atuação e Tipo de negócio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Área de atuação */}
          <div className="w-full">
            <label className="block font-medium w-full text-start">Área de atuação</label>
            <Controller
              control={control}
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

          {/* Tipo de negócio */}
          <div className="w-full">
            <label className="block font-medium w-full text-start">Tipo de negócio</label>
            <Controller
              control={control}
              name="businessType"
              render={({ field }) => (
                <select
                  className="w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="">Selecionar</option>
                  <option value="Negócio Local">Negócio Local</option>
                  <option value="Profissional">Profissional</option>
                  <option value="Empresa">Empresa</option>
                  <option value="Instituição">Instituição</option>
                  <option value="Pessoa Pública">Pessoa Pública</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Localização e Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Localização */}
          <div className="w-full">
            <label className="block font-medium w-full text-start">Localização</label>
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <select
                  className="w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="">Selecione o estado</option>
                  {states.map((state: Option) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Tags */}
          <div className="w-full">
            <label className="block font-medium w-full text-start">Tags</label>
            <Controller
              control={control}
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
        <div className="w-full">
          <label className="block font-medium w-full text-start">Descrição</label>
          <Controller
            control={control}
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

        {/* Checkbox para atuar em todo o Brasil */}
        <div className="flex items-center gap-2 w-full">
          <Controller
            control={control}
            name="operatesNationwide"
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <span>Atuo em todo o Brasil</span>
        </div>
      </div>
    </div>
  );
};
