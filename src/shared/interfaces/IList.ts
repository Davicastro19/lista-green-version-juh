
import { ICompany } from './ICompany';
import { ITags } from './ITag';

export interface IList {
  _id:  string;
  owner: string;
  name: string;
  isPromoting?: boolean;
  description: string;
  area: string[];
  image: string;
  tags: ITags[];
  businesses: ICompany[];
  companiesDescription?: ICompaniesDescription[];
  createdAt:string
  updatedAt:string
}

interface ICompaniesDescription {
  description?: string;
  companyId: string;
}




interface Business {
  _id: string;
  businessType: string;
  email: string;
  instagram: string;
  name: string;
  state: string;
  tags: ITags[];
  website: string;
  whatsapp: string;
  workType: string;
  area: string[];
  infoWork: string;
  owner: string;
  updatedAt: string;
  description: string;
  operatesNationwide: boolean;
}

export interface CompanyDescription {
  description: string;
  companyId: string;
}

interface ListData {
  id: string;
  name: string;
  tags: ITags[];
  description: string;
  businesses: string[];
  companiesDescription: CompanyDescription[];
  isPromoting: boolean;
}

export interface ResponseData {
  data: Business[];
  listData: ListData;
  totalPages: number;
  currentPage: number;
}
