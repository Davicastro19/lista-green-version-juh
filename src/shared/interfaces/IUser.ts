export interface IUser {
  _id: string; // Agora é o _id retornado pela API
  email: string;
  isMember: boolean;
  type: string; // Ex: "admin"
  firstName: string;
  lastName: string;
  image: string; // URL da imagem de avatar
  phone: string; // Número de telefone
  likes: string[]; // Lista de ids de itens que o usuário gosta
  saved: string[]; // Lista de ids de itens salvos
  state: string; // Estado do usuário
  verified: boolean; // Se o usuário foi verificado
  accept_term: boolean; // Se o usuário aceitou os termos
  provider: string; // Ex: "credential"
  interests: string[]; // Lista de interesses do usuário
  promotionList: string[]; // Lista de promoções do usuário
  createdAt: string; // Data de criação
  updatedAt: string; // Data de última atualização
}


export interface UserProfileSendData {
  firstName: string;
  lastName: string;
  image?: string;
  phone: string;
  type: string;
  accept_term: NonNullable<boolean | undefined>;
  interests: (string | undefined)[];
}



export interface UserProfileSendDataEdit {
  firstName: string;
  lastName: string;
  image?: string;
  phone: string;
  type: string;

  interests: (string | undefined)[];
}
