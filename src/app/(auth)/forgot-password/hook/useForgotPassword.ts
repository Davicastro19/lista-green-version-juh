import httpService from "@/shared/api/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
interface SignUpFormInputs {
  email: string;
}


interface LoginResponse {
  access_token: string; // A estrutura depende da resposta real da sua API.
}
const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
});

export const useForgotPassword = (email:string) => {
  const { handleSubmit,register, formState: { errors, isSubmitting } ,control}  = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
    defaultValues:{email:email}
  });

  const router = useRouter();
  const onSubmit = async (data: SignUpFormInputs) => {
    try {

     await httpService.post<LoginResponse>('/users/forgotPassword', {email:data.email});


      router.push("/login");
    } catch (error) {
      console.error(error);
      toast( "Erro ao trocar senha. Tente novamente.");
    }
  };

  return { onSubmit ,errors,handleSubmit, isSubmitting ,control,register};
};
