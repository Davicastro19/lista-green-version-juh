import { phoneMask } from "@/shared/functions/manipulatorStrings";
import { useFormContext } from "react-hook-form";

export const StepTwo: React.FC = () => {
  const { register,setValue} = useFormContext();

   function PhoneInput (e: React.ChangeEvent<HTMLInputElement>  ) {
    const formattedPhone = phoneMask(e.target.value);
    setValue("whatsapp", formattedPhone);  // Atualiza o valor no form
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold mb-4">Links e acessos</h1>

      <div className="space-y-2">
        <label className="block font-medium">WhatsApp</label>
        <input
          {...register("whatsapp")}
          placeholder="(99) 99999-9999"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          onInput={PhoneInput}
        />
      </div>

      {[
        { label: "Instagram", placeholder: "@seunegocio", field: "instagram" },
        { label: "Site", placeholder: "www.seunegocio.com", field: "website" },
        { label: "Facebook", placeholder: "facebook.com.br/seunegocio", field: "facebook" },
        { label: "E-mail", placeholder: "seunegocio@example.br", field: "email" },
      ].map(({ label, placeholder, field }) => (
        <div key={field} className="space-y-2">
          <label className="block font-medium">{label}</label>
          <input
            {...register(field)}
            type="text"
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
      ))}
    </div>
  );
};
