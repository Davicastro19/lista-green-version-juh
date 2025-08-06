/* eslint-disable @typescript-eslint/no-explicit-any */

import { BASE_URL } from '@/shared/constants/urls';
import type { Metadata } from 'next';


export async function generateMetadata({ params, }: { params: any }): Promise<Metadata> {
  // Lê os parâmetros da rota
  const slug = params.slug;

  // Fetch inicial para metadados
  const product = await fetch(`${BASE_URL}/explore/${slug}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      return null; // Retorne null ou um objeto padrão se ocorrer um erro
    });


  return {
    title: `Campanha | ${product?.title || 'Listagreen'}`,
    icons: {
      icon: 'https://www.listagreen.com.br/favicon.ico',
      apple: 'apple-touch-icon.png',
      shortcut: 'apple-touch-icon.png',
    },
    openGraph: {
      images: product?.meta_image || 'https://www.listagreen.com.br/favicon-32x32.png',
      description: product?.meta_description || 'Semeando conexões para um mundo mais verde.',
      type: 'article',
      url: `https://www.listagreen.com.br/explore/${slug}`,
      locale: 'pt_BR',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>

  );
}
