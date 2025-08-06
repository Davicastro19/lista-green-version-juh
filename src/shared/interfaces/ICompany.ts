import { ITags } from "./ITag";
import { IUser } from "./IUser";


export interface ICompany extends Document {
  owner: string,
  name: string;
  email:string;
  description: string;
  image: string;
  tags: ITags[];
  operatesNationwide?: boolean;
  isMember:boolean;
  state?: string;
  businessType: string;
  workType: string;
  area?: string[];
  website?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  promotionDescription?: string;
  _id: string;

  createdAt?: string
  updatedAt?: string

}

export interface ICompanyUNi extends Document {
  owner: IUser,
  name: string;
  email:string;
  description: string;
  image: string;
  tags: ITags[];
  operatesNationwide?: boolean;
  isMember:boolean;
  state?: string;
  businessType: string;
  workType: string;
  area: string[];
  website?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  promotionDescription?: string;
  _id: string;

  createdAt?: string
  updatedAt?: string

}



export interface CompanyFormData {
  name: string;
  description: string;
  image?: string;
  tags: Array<{ value: string; label: string }>;  // Certifique-se de que é sempre um array, não undefined
  operatesNationwide?: boolean;
  isMember?: boolean;
  state: string;
  businessType: string;
  workType?: string;
  website?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  area: Array<{ value: string; label: string }>;  // Mesmo ajuste para area
  promotionDescription?: string;
  owner?: string;
  facebook?: string;
  _id?: string;
}
export interface CompanyFormDataSave {
  name: string;
  description: string;
  image?: string;
  tags: Array<string>;  // Certifique-se de que é sempre um array, não undefined
  operatesNationwide?: boolean;
  isMember?: boolean;
  state: string;
  businessType: string;
  workType?: string;
  website?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  area: Array<string>;  // Mesmo ajuste para area
  promotionDescription?: string;
  owner?: string;
  facebook?: string;
  _id?: string;
}

export interface CompanResp {
  name: string;
  description: string;
  image?: string;
  tags: Array<string>;  // Certifique-se de que é sempre um array, não undefined
  operatesNationwide?: boolean;
  isMember?: boolean;
  state: string;
  businessType: string;
  workType?: string;
  website?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  area: Array<string>;  // Mesmo ajuste para area
  promotionDescription?: string;
  owner?: IUser;
  facebook?: string;
  _id?: string;
}


export interface ListFormData {
  name: string;
  description: string;
  tags: Array<{ value: string; label: string }>;  // Certifique-se de que é sempre um array, não undefined
  area: Array<{ value: string; label: string }>;  // Mesmo ajuste para area
  isPromoting?: boolean;

}
