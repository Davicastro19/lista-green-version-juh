'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

function TypographyH1({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h1 className={cn('text-3xl md:text-4xl font-bold', className)}>{children}</h1>;
}

function TypographyH2({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <h2 className={cn('text-2xl md:text-3xl font-semibold', className)}>{children}</h2>;
}

function TypographyP({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <p className={cn('text-base md:text-lg leading-relaxed', className)}>{children}</p>;
}

export default function SobrePage() {
    return (
        <div className="w-full overflow-x-hidden">
            {/* Seção 1 */}
            <div
                className="h-[90vh] bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: 'url(/images/sobrenos-01.webp)' }}
            >
                <div className="absolute inset-0 bg-black/50 flex items-center px-6 md:px-20">
                    <div className="text-white space-y-6 max-w-xl">
                        <TypographyH1 className="text-white">Sobre a listagreen</TypographyH1>
                        <TypographyP className="text-lg md:text-xl">
                            a primeira plataforma brasileira 100% dedicada a promover a Economia Verde em todo o nosso país!
                        </TypographyP>
                    </div>
                </div>
            </div>

            {/* Seção 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center py-16 px-6 md:px-20 gap-12">
                <div className="max-w-md space-y-4 text-center md:text-left">
                    <TypographyH2>Vamos conectar</TypographyH2>
                    <TypographyP className="text-green-800">
                        todas as pessoas e empresas que já entenderam a urgente necessidade de apoiar um novo modelo de
                        desenvolvimento: economicamente sustentável, socialmente justo e ambientalmente responsável!
                    </TypographyP>
                </div>
                <Image
                    src="/images/sobrenos-02.webp"
                    alt="Imagem"
                    width={400}
                    height={300}
                    className="rounded-2xl w-[300px] md:w-[400px] h-auto"
                />
            </div>

            {/* Seção 3 */}
            <div
                className="h-[90vh] bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: 'url(/images/sobrenos-03.webp)' }}
            >
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
                    <div className="text-white space-y-6 max-w-2xl">
                        <TypographyH2 className="text-white">
                            Aqui, você pode adquirir ou ofertar produtos e serviços,
                        </TypographyH2>
                        <TypographyP className="text-white text-xl">
                            conhecer e consumir de quem já oferta, ou fazer as duas coisas. Enfim, você pode decidir ser green e
                            contribuir para um mundo melhor!
                        </TypographyP>
                    </div>
                </div>
            </div>

            {/* Seção 4 */}
            <div className="flex flex-col md:flex-row items-center justify-center py-16 px-6 md:px-20 gap-12">
                <div className="max-w-md space-y-4 text-center md:text-left">
                    <TypographyH2>Queremos que a sua experiência</TypographyH2>
                    <TypographyP className="text-green-800">
                        seja a melhor possível. Te convidamos a se cadastrar, explorar as funcionalidades e fazer parte de nossa
                        comunidade. Vem com a gente fazer um mundo melhor.
                    </TypographyP>
                    <TypographyH2 className="text-green-800 text-lg md:text-xl">Seja Green!</TypographyH2>
                </div>
                <div
                    className="rounded-2xl w-[300px] md:w-[500px] h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/sobrenos-04.webp)' }}
                />
            </div>
        </div>
    );
}
