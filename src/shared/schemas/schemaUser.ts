import * as yup from "yup";


export const listSchema = yup.object().shape({
  name: yup.string().min(1, 'Nome inválido').required('Nome obrigatorio'),
  description: yup.string().required('Senha inválida').min(1, 'A descrição deve ter pelo menos 1 caracteres'),

});


export const schemaCompaniesDescription = yup.object().shape({
  description: yup.string().min(1, 'A descrição deve ter pelo menos 1 caracteres').required("Descrição é obrigatória"),
});


export const profileSchema = yup.object().shape({
  firstName: yup.string().max(400, 'O nome deve ter no máximo 400 caracteres').required("O nome é obrigatório"),
  lastName: yup.string().max(400, 'O sobrenome deve ter no máximo 400 caracteres').required("O sobrenome é obrigatório"),
  image: yup.string(), // A imagem agora é obrigatória
  phone: yup.string().max(20, 'O número de telefone deve ter no máximo 20 caracteres').required("O telefone é obrigatório"),
  type: yup.string().max(400, 'O tipo deve ter no máximo 400 caracteres').required("O tipo é obrigatório"),
  accept_term: yup.boolean().required('').oneOf([true], 'É obrigatório aceitar os termos de uso'), // Agora é um booleano obrigatório
  interests: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione ao menos um interesse')
    .required('Os interesses são obrigatórios'),
});
//export const profileSchema = yup.object().shape({
//  firstName: yup
//    .string()
//    .max(400, 'O nome deve ter no máximo 400 caracteres')
//    .required('O nome é obrigatório'),
//
//  lastName: yup
//    .string()
//    .max(400, 'O sobrenome deve ter no máximo 400 caracteres')
//    .required('O sobrenome é obrigatório'),
//
//  image: yup.string(), // Se quiser tornar obrigatório, adicione `.required('A imagem é obrigatória')`
//
//  phone: yup
//    .string()
//    .max(20, 'O número de telefone deve ter no máximo 20 caracteres')
//    .required('O telefone é obrigatório'),
//
//  type: yup
//    .string()
//    .max(400, 'O tipo deve ter no máximo 400 caracteres')
//    .required('O tipo é obrigatório'),
//
//  accept_term: yup
//    .boolean()
//    .oneOf([true], 'É obrigatório aceitar os termos de uso')
//    .required('É obrigatório aceitar os termos de uso'),
//
//  interests: yup
//    .array()
//    .of(yup.string().required('O interesse não pode estar vazio'))
//    .min(1, 'Selecione ao menos um interesse')
//    .required('Os interesses são obrigatórios'),
//});
export const profileSchemaEdit = yup.object().shape({
  firstName: yup.string().max(400, 'O nome deve ter no máximo 400 caracteres').required("O nome é obrigatório"),
  lastName: yup.string().max(400, 'O sobrenome deve ter no máximo 400 caracteres').required("O sobrenome é obrigatório"),
  image: yup.string(), // A imagem agora é obrigatória
  phone: yup.string().max(20, 'O número de telefone deve ter no máximo 20 caracteres').required("O telefone é obrigatório"),
  type: yup.string().max(400, 'O tipo deve ter no máximo 400 caracteres').required("O tipo é obrigatório"),
  //  accept_term: yup.boolean().required('').oneOf([true], 'É obrigatório aceitar os termos de uso'), // Agora é um booleano obrigatório
  interests: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione ao menos um interesse')
    .required('Os interesses são obrigatórios'),
});
