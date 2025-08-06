import * as yup from "yup";


export const schemaSignUp = yup.object().shape({
    email: yup.string().email( 'E-mail inválido').required('E-mail obrigatorio'),
    password: yup.string().required('Senha inválida').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: yup.string().oneOf([yup.ref('password')],
         'Senhas não conferem').required( 'Confirmação de senha inválida')
});
