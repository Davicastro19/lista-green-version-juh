import { IResponseArticleSearch } from "./IArticle";
import { ICompany } from "./ICompany";
import { IList } from "./IList";

export interface IFilteredResults {
    companies: ICompany[];
    lists: IList[];
    articles: IResponseArticleSearch[];
    pagination: {
      totalPages: number,
      currentPage: number,
      pageSize: number,
    }
  }




export interface Area {
  id: string;
  color: string;
  bg: string;
  icon: string;
}

export interface AreaOption {
  label: string;
  area: Area;
}

export interface SearchStepProps {
  title: string;
  description: string;
  options: AreaOption[];
  selected: string;
  onSelect: (id: string) => void;
  isArea?: boolean;
  isState?: boolean;
  block:boolean
  isType?: boolean;
  handleUrl: () => void;
}

export interface SearchFilters {
  key: string;
  area?: string;
  state?: string;
  type?: string;
}

export interface SearchResults {
  articles: IResponseArticleSearch[];
  lists: IList[];
  companies: ICompany[];
}

export interface ICompaniesResponse {
    companies: ICompany[],
    pagination: {
      totalPages: number,
      currentPage: number,
      pageSize: number,
    }}


export interface IListsResponse {
    lists: IList[],
    pagination: {
      totalPages: number,
      currentPage: number,
      pageSize: number,
    }
}
