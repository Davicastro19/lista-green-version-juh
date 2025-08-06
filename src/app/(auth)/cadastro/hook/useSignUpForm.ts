/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from "@/shared/api/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
interface SignUpFormInputs {
  email: string;
  password: string;
  passwordMatch: string;
}
interface SignUpResponse {
  access_token: string; // A estrutura depende da resposta real da sua API.
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória"),
  passwordMatch: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});


export const useSignUpForm = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting }, control } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),

  });

  const router = useRouter();
  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await httpService.post<SignUpResponse>('/auth/register', data);
      toast.success("Conta criada com sucesso!");
      // redirecionar ou atualizar interface
      router.push("/login");
    } catch (error: any) {
      // backend deve enviar status 400 + mensagem em `message`
      console.log(error)
      const errorMessage = error?.message || "Erro ao criar conta.";

      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return { onSubmit, errors, handleSubmit, isSubmitting, control, register };
};
