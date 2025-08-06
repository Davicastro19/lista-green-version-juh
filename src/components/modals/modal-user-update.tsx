import httpService from "@/shared/api/fetcher"; // Importando serviço HTTP
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

interface ResetPasswordForm {
  oldPassword: string;
  newPassword: string;
}

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Senha antiga é obrigatória"),
  newPassword: yup
    .string()
    .min(6, "A nova senha deve ter pelo menos 6 caracteres")
    .required("Nova senha é obrigatória"),
});

const ResetPasswordModal = ({ isModalOpen, setModalOpen }: { isModalOpen: boolean; setModalOpen: (open: boolean) => void }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      await httpService.post("/users/resetPasswordAuth", data);
      toast.success("Senha alterada com sucesso!");
      setModalOpen(false);
      reset();
    } catch (error) {
      toast.error("Erro ao trocar senha. Tente novamente.");
      console.error("Erro ao trocar senha:", error);
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <h2 className="text-[var(--darkgreen)] font-bold text-lg text-center">Trocar a senha</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Senha antiga */}
            <label className="block mt-4 text-[var(--darkgreen)] font-semibold">Senha antiga</label>
            <div className="relative">
              <Controller
                name="oldPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type={showOldPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--darkgreenhome)] pr-10"
                    placeholder="Digite sua senha antiga"
                  />
                )}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}

            {/* Nova senha */}
            <label className="block mt-4 text-[var(--darkgreenhome)] font-semibold">Nova senha</label>
            <div className="relative">
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type={showNewPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--darkgreenhome)] pr-10"
                    placeholder="Digite sua nova senha"
                  />
                )}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

            {/* Botões */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full mt-4 bg-[var(--darkgreen)] text-white py-2 rounded hover:bg-[var(--darkgreenhome)]"
            >
              {isSubmitting ? "Alterando..." : "Trocar senha"}
            </button>
            <button
              type="button"
              className="w-full mt-2 border border-[var(--darkgreenhome)] py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ResetPasswordModal;
