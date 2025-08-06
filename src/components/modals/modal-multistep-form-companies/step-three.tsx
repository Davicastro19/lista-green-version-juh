import { Image } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const StepThree: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const image = watch("image");

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

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center text-center w-full max-w-md space-y-4">
        <h1 className="text-lg font-semibold">Selecionar imagem de capa</h1>
        <div className="w-full">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center justify-center border-2 border-dashed border-[var(--darkgreenhome)]  rounded-md w-64 h-64 bg-teal-50 mx-auto relative">
              {!image ? (
               <Image className="text-[var(--darkgreenhome)] "/>
              ) : (
                <img
                  src={image}
                  alt="Imagem selecionada"
                  className="w-full h-full object-cover rounded-md"
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
        <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
          <span>ℹ️</span>
          <span>A imagem deve ter o limite de 5MB.</span>
        </p>
      </div>
    </div>
  );
};
