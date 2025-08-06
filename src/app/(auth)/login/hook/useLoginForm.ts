/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from "@/shared/api/fetcher";
import { TOKEN } from "@/shared/constants/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginByEmailInputs {
  email: string;
}
interface LoginResponse {
  access_token: string; // A estrutura depende da resposta real da sua API.
}
const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

export const useLoginForm = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting }, control } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const isUser = await httpService.get<LoginByEmailInputs>(`/users/email/${data.email}`);

      if (isUser) {
        router.push(`/forgot-password?email=${data.email}`);
        return
      } else {
        const response = await httpService.post<LoginResponse>('/auth/login', data);


        Cookies.set(TOKEN, response.access_token, { expires: 1 });
        router.push("/home");
      }
    } catch (error: any) {
      console.error(error);
      toast(`O e-mail ou a senha estão incorretos.`)
    }
  };

  return { onSubmit, errors, handleSubmit, isSubmitting, control, register };
};
