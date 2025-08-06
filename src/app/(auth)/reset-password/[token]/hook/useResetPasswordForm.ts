import httpService from "@/shared/api/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  newPassword: yup.string().required("A senha é obrigatória"),
  confirmPassword: yup.string().required("A senha é obrigatória")
});

export const useResetPasswordForm = (token:string) => {
  const { handleSubmit,register, formState: { errors, isSubmitting } ,control}  = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(schema),

  });

  const router = useRouter();
  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {

      await httpService.post<ResetPasswordFormInputs>('/users/resetPassword', {...data,resetPasswordToken:token});


      router.push("/login");
    } catch (error) {
      console.error(error);
      toast( "Erro. Tente novamente.");
    }
  };

  return { onSubmit ,errors,handleSubmit, isSubmitting ,control,register};
};
