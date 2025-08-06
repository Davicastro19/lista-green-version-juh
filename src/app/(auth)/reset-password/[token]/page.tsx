"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useResetPasswordForm } from "./hook/useResetPasswordForm";

export default function ResetPasswordPage() {

  const params = useParams(); // Captura os parâmetros da URL
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (params?.token) {
      setToken(params.token as string);
    }
  }, [params]);

  return token ? <ResetPasswordForm token={token} /> : <div>Carregando...</div>;
}

// Componente do formulário de reset
function ResetPasswordForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, handleSubmit, onSubmit, isSubmitting } = useResetPasswordForm(token);
  const router = useRouter();

  return (
    <div>
      <Card className="w-full max-w-md px-1 py-6 shadow-2xl rounded-lg bg-white border-0">
        <CardContent>
          <button
            className="bg-transparent cursor-pointer hidden md:block"
            onClick={() => router.push("/")}
          >
            <ChevronLeftIcon size={40} className="text-[var(--darkgreenhome)]" aria-label="Voltar" />
          </button>
          <h2 className="text-2xl font-bold text-center text-[var(--darkgreenhome)]">Recupere sua senha</h2>
          <p className="text-center text-gray-500">Informe sua nova senha para redefini-la.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
            {/* Campo de Nova Senha */}
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative mt-1">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="Digite sua senha"
                  className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>

            {/* Campo de Confirmação de Senha */}
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar senha</label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Digite sua senha novamente"
                  className="text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Botão de Redefinição */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-400"
            >
              {isSubmitting ? "Redefinindo..." : "Redefinir"}
            </button>
          </form>

          {/* Link para Login */}
          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500">Já tem cadastro? </span>
            <Link href="/login" className="text-[var(--darkgreenhome)] font-semibold hover:underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
