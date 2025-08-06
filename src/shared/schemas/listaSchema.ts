import * as yup from "yup";


export const listSchema = yup.object().shape({
    name: yup.string().min(1,'Nome inválido').required('Nome obrigatorio'),
    description: yup.string().required('Senha inválida').min(1, 'A descrição deve ter pelo menos 1 caracteres'),

});


export const schemaCompaniesDescription = yup.object().shape({
    description: yup.string().min(1, 'A descrição deve ter pelo menos 1 caracteres').required("Descrição é obrigatória"),
  });

  export const listSchemaCreate = yup.object().shape({
    name: yup
      .string()
      .max(400, 'O nome deve ter no máximo 400 caracteres')
      .required('O nome é obrigatório'),

    description: yup
      .string()
      .max(400, 'A descrição deve ter no máximo 400 caracteres')
      .required('A descrição é obrigatória'),

    image: yup.string(),

    tags: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required('O valor da tag é obrigatório'),
          label: yup.string().required('O rótulo da tag é obrigatório'),
        })
      )
      .min(1, 'Selecione pelo menos uma tag')
      .required('As tags são obrigatórias'),

    area: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required('O valor da área é obrigatório'),
          label: yup.string().required('O nome da área é obrigatório'),
        })
      )
      .min(1, 'Selecione pelo menos uma área de atuação')
      .required('A área de atuação é obrigatória'),

    isPromoting: yup.boolean(),
  });
