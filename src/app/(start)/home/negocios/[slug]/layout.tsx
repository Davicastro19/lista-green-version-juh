/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BASE_URL } from '@/shared/constants/urls';
import type { Metadata } from 'next';


export async function generateMetadata({ params, }: { params: any }): Promise<Metadata> {
  // Lê os parâmetros da rota
  const slug = params.slug.replace("'", "");

  // Fetch inicial para metadados
  const product = await fetch(`${BASE_URL}/companies/getByNameUrl?name=${slug}`)
    .then((res) => res.json())
    .catch((error) => {

      return null; // Retorne null ou um objeto padrão se ocorrer um erro
    });



  const image = await fetch(`${BASE_URL}/companies/image/${product?.data._id}`)
    .then((res) => res.json())
    .catch((error) => {

      return null; // Retorne null ou um objeto padrão se ocorrer um erro
    });
  console.log(`${BASE_URL}/companies/images/${product?.data?._id}`)
  return {
    title: `Négocio | ${product?.data?.name || 'Listagreen'}`,
    description: product?.data?.description || 'Semeando conexões para um mundo mais verde.',
    openGraph: {
      images: [`${BASE_URL}/companies/images/${product?.data?._id}` || 'https://www.listagreen.com.br/favicon-32x32.png'],//product?.data?.image || 'https://www.listagreen.com.br/favicon-32x32.png'],
      description: product?.data?.description || 'Semeando conexões para um mundo mais verde.',
      type: 'article',
      url: `https://www.listagreen.com.br/home/negocios/${slug}`,
      locale: 'pt_BR',
    },

    // icons: {
    //   icon:  `${BASE_URL}/companies/images/${product?.data?._id}`,
    //   apple:`${BASE_URL}/companies/images/${product?.data?._id}`,
    //   shortcut:`${BASE_URL}/companies/images/${product?.data?._id}`
    // },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>

  );
}
