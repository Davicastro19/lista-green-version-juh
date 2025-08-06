// interfaces/articles/IArticle.ts
export interface IArticleSearch {

    uuid: string | null;
    url: string | null;
    type: string;
    slug:string;
    title:string;
    subtitle:string;
    image:string;
    href: string;
    tags: string[];
    first_publication_date: string;
    last_publication_date: string;
    slugs: string[];
    linked_documents: string[];
    lang: string;
    alternate_languages: string[];
    data: IArticleData;

  }

  export interface IArticleData {
    slug: string;
    image: string;
    title: string
    subtitle:string
    text:string
    text2:string
    text3: string
    text4:string
    text5: string
    text6: string
    meta_description: string;
    meta_image: string;
    meta_title: string
    updateAt:string
}


  // interfaces/articles/IArticle.ts
export interface IResponseArticleSearch {
  slug: string ;
  title: string;
  image:string;
  subtitle:string;
}
