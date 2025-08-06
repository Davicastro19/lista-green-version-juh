'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeftIcon, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignUpForm } from './hook/useSignUpForm';


export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const { onSubmit, handleSubmit, register, errors, isSubmitting } = useSignUpForm();
    const router = useRouter()
  return (

<div>

      <Card className="w-full max-w-md px-1  py-6 shadow-2xl rounded-lg bg-white border-0">
        <CardContent>
        <button className="bg-transparent cursor-pointer hidden flex-row justify-center items-center  text-[var(--darkgreenhome)]  md:block" onClick={()=> router.push('/')}>
                          <ChevronLeftIcon size={40} className="text-[var(--darkgreenhome)]" aria-label="Voltar" />

                        </button>
          <h2 className="text-2xl font-bold text-center text-[var(--darkgreenhome)]">Crie sua conta!</h2>
          <p className="text-center text-gray-500">Faça o cadastro para acessar a plataforma da Lista Green.</p>

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
            <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
            <div className="relative mt-1">

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Digite sua senha"
                  className=" text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:var(--darkgreenhome) "
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="passwordMatch" className="text-sm font-medium text-gray-700">Repetir senha</label>
              <div className="relative mt-1">
                <input
                  id="passwordMatch"
                  type={showPassword ? 'text' : 'password'}
                  {...register('passwordMatch')}
                  placeholder="Digite sua senha novamente"
                  className=" text-[var(--darkgreenhome)] w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:var(--darkgreenhome) "
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.passwordMatch && <p className="text-red-500 text-sm mt-1">{errors.passwordMatch.message}</p>}
            </div>



            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--darkgreenhome)] text-white py-2 rounded-md font-medium hover:bg-green-950 transition disabled:bg-green-400"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
          <span className='text-gray-500'>Já tem cadastro? </span>
            <Link href="/login" className="text-[var(--darkgreenhome)] font-semibold hover:underline">Faça login</Link>
          </div>
        </CardContent>
      </Card>
      </div>
  );
}
