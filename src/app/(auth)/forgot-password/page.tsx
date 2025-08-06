'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Suspense } from 'react';
import { useForgotPassword } from './hook/useForgotPassword';



 function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || ''; // Obtém o email da URL



  const { onSubmit, handleSubmit, register, errors, isSubmitting } = useForgotPassword(email||'');
    const router = useRouter()
  return (

<div>

      <Card className="w-full max-w-md px-1  py-6 shadow-2xl rounded-lg bg-white border-0">
        <CardContent>
        <button className="bg-transparent cursor-pointer hidden flex-row justify-center items-center  text-[var(--darkgreenhome)]  md:block" onClick={()=> router.push('/')}>
                          <ChevronLeftIcon size={40} className="text-[var(--darkgreenhome)]" aria-label="Voltar" />

                        </button>
          <h2 className="text-2xl font-bold text-center text-[var(--darkgreenhome)]">Esqueceu a sua senha?</h2>
          <p className="text-center text-gray-500">Informe seu email para que possamos te ajudar.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="exemplo@gmail.com"
                className=" text-[var(--darkgreenhome)] mt-1 px-3 py-2 border  border-[var(--darkgreenhome)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:var(--darkgreenhome) "
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>







            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-400"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
          <span className='text-gray-500'>Já tem cadastro? </span>
            <Link href="/cadastro" className="text-[var(--darkgreenhome)] font-semibold hover:underline">Faça login</Link>
          </div>
        </CardContent>
      </Card>
      </div>
  );
}


export default function ForgotPassword() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
