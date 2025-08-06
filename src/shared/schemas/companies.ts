import * as yup from "yup";


export const companySchema = yup.object().shape({
  name: yup
    .string()
    .max(400, 'O nome deve ter no máximo 400 caracteres')
    .required('O nome é obrigatório'),

  description: yup
    .string()
    .max(400, 'A descrição deve ter no máximo 400 caracteres')
    .required('A descrição é obrigatória'),

  image: yup.string(),
  hasImage: yup.string(),
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

  operatesNationwide: yup.boolean(),

  isMember: yup.boolean(),

  state: yup
    .string()
    .max(400, 'O estado deve ter no máximo 400 caracteres')
    .required('O estado é obrigatório'),

  businessType: yup
    .string()
    .max(400, 'O tipo de negócio deve ter no máximo 400 caracteres')
    .required('O tipo de negócio é obrigatório'),

  workType: yup
    .string()
    .max(400, 'O tipo de trabalho deve ter no máximo 400 caracteres'),

  website: yup
    .string()
    .max(400, 'O site deve ter no máximo 400 caracteres'),

  email: yup
    .string()
    .email('Digite um e-mail válido')
    .max(400, 'O e-mail deve ter no máximo 400 caracteres'),

  whatsapp: yup
    .string()
    .max(400, 'O número de WhatsApp deve ter no máximo 400 caracteres'),

  instagram: yup
    .string()
    .max(400, 'O link do Instagram deve ter no máximo 400 caracteres'),

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

  promotionDescription: yup
    .string()
    .max(400, 'A descrição da promoção deve ter no máximo 400 caracteres'),

  facebook: yup
    .string()
    .max(400, 'O link do Facebook deve ter no máximo 400 caracteres'),

  _id: yup.string(),
});
