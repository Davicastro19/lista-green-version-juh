import * as yup from "yup";


export const schemaSignIn = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatorio'),
    password: yup.string().required('Senha inválida').min(6, 'A senha deve ter pelo menos 6 caracteres'),

});
