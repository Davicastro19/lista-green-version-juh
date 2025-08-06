import * as yup from "yup";


export const schemaResetPassword = yup.object().shape({
    newPassword: yup.string().required('Senha inválida').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')],
         'Senhas não conferem').required( 'Confirmação de senha inválida')
});
