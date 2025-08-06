'use client';


import Separator from "@/components/sepa-rator";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import authStore from "@/shared/stores/authStore";
import { Accordion } from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";



export default function Plans() {
  const router = useRouter();
  const { user } = authStore

  const handleCurrentPlanButton = async () => {
    if (user) {
      toast.info("Você já possui esse plano!");
    } else if (!user) {
      router.push("/login");
    }
  };

  const handleMembrePlanButton = async () => {
    if (user && !user.isMember) {
      window.open("https://wa.me/558588000440?text=Olá,%20gostaria%20de%20aderir%20ao%20plano%20MEMBRO!", "_blank");
      router.push("/home");
    } else if (user && user.isMember) {
      toast.info("Você já possui esse plano!");
    } else if (!user) {
      window.open("https://wa.me/558588000440?text=Olá,%20gostaria%20de%20aderir%20ao%20plano%20MEMBRO!", "_blank");
      router.push("/../login");
    }
  };

  const handleOfferingMembrePlanButton = async () => {
    if (user && !user.isMember) {
      window.open("https://wa.me/558588000440?text=Olá,%20gostaria%20de%20aderir%20ao%20plano%20MEMBRO%20OFERTANTE!", "_blank");
      router.push("/home");
    } else if (user && user.isMember) {
      toast.info("Você já é mebro!");
    } else if (!user) {
      window.open("https://wa.me/558588000440?text=Olá,%20gostaria%20de%20aderir%20ao%20plano%20MEMBRO%20OFERTANTE!", "_blank");
      router.push("/../login");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Título centralizado */}
      <h2 className="text-3xl font-bold text-center text-[#26847B] mb-4">
        Faça o upgrade!
      </h2>
      {/* Parágrafo centralizado */}
      <p className="text-center mb-8">
        Você está atualmente no plano gratuito. Faça o upgrade, troque ou
        cancele seu plano a qualquer momento!
      </p>

      <div className="flex flex-col lg:flex-row gap-28 justify-center items-stretch">
        {/* Card Básico */}
        <div className="flex-1 max-w-[336px] lg:max-w-none">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold">BÁSICO</h3>
          </div>
          <div className="flex flex-col bg-green-50 rounded-md p-4 lg:p-12 shadow-md h-full justify-between">
            <div className="relative mb-6">

              <div className="text-4xl font-bold text-gray-800">
                <span className="text-[80px]">0</span>
                <span className="text-xl">/mês</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <PlanFeature active>Buscas ilimitadas na plataforma</PlanFeature>
              <PlanFeature active>Registro ilimitado de negócios (para ofertantes)</PlanFeature>

            </div>

            <Button
              onClick={handleCurrentPlanButton}
              className="mt-4 cursor-pointer text-white bg-[var(--darkgreen)] text-md font-semibold"
            >
              Plano atual
            </Button>
          </div>
        </div>

        {/* Card Membro */}
        <div className="flex-1 max-w-[336px] lg:max-w-none">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold">MEMBRO</h3>
          </div>
          <div className="flex flex-col bg-gray-800 text-white rounded-md p-4 lg:p-12  shadow-md h-full justify-between">
            <div className="relative mb-6">

              <div className="text-4xl font-bold">
                <span className="text-[80px]">15</span>
                <span className="text-xl">/mês</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <PlanFeature active light>Todas as vantagens do Plano Básico</PlanFeature>
              <PlanFeature active light>Descontos especiais em produtos e serviços sustentáveis</PlanFeature>
              <PlanFeature active light>Produtos Exclusivos da marca Listagreen com preços especiais</PlanFeature>
              <PlanFeature active light>Passe para eventos especiais</PlanFeature>
              <PlanFeature active light>Acesso à área de membro com Greenflix</PlanFeature>
            </div>

            <Button
              onClick={handleMembrePlanButton}
              variant="secondary"
              className="mt-4 cursor-pointer bg-white text-[var(--darkgreen)] text-md font-semibold"
            >
              Começar
            </Button>
          </div>
        </div>

        {/* Card Membro Ofertante */}
        <div className="flex-1 max-w-[336px] lg:max-w-none">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold">MEMBRO OFERTANTE</h3>
          </div>
          <div className="flex flex-col bg-teal-500 text-white rounded-md p-4 lg:p-12 shadow-md h-full justify-between">
            <div className="relative mb-6 gap-2">

              <div className="text-4xl font-bold">
                <span className="text-[80px]">125</span>
                <span className="text-xl">/mês</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <PlanFeature active light>Todas as vantagens do Plano Membro</PlanFeature>
              <PlanFeature active light>Registro ilimitado de negócios</PlanFeature>
              <PlanFeature active light>Destaque nas buscas e listas da plataforma</PlanFeature>
              <PlanFeature active light>Mentorias online para impulsionar seu negócio</PlanFeature>
              <PlanFeature active light>Participação em grupo exclusivo para Membros Ofertantes</PlanFeature>
              <PlanFeature active light>Um artigo + um vídeo sobre o seu negócio</PlanFeature>
              <PlanFeature active light>Acesso à Sessão de Negócios exclusiva</PlanFeature>
            </div>

            <Button
              onClick={handleOfferingMembrePlanButton}
              variant="secondary"
              className="mt-4 cursor-pointer bg-white text-[var(--darkgreen)] text-md font-semibold"
            >
              Começar
            </Button>
          </div>
        </div>
      </div>



      {/* Perguntas Frequentes */}
      <div className="mt-10 mb-5">
        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="text-[#26847B] font-bold text-2xl">Alguma dúvida?</h3>
          <p className="text-sm">Temos respostas que podem ajudar.</p>
          <p className="text-base">
            Caso seu questionamento não esteja aqui, entre em contato pelo{' '}
            <a
              href="https://wa.me/558588000440?text=Olá,%20gostaria%20de%20tirar%20umas%20dúvidas."
              className="text-[#26847B] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            . Adoraremos conhece-lo. 💚😊
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-2 mb-20">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer">Como funciona o plano Básico gratuito da Lista Green?</AccordionTrigger>
            <AccordionContent>
              O plano Básico é totalmente gratuito e oferece buscas ilimitadas na plataforma. Se você for um ofertante, também poderá registrar seus negócios de forma ilimitada.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">Como faço para me tornar um Membro da Lista Green?</AccordionTrigger>
            <AccordionContent>
              {`Para se tornar um Membro, basta escolher um plano e fazer a sua assinatura pelo cartão ou pix, sendo validada a sua assinatura você será liberado o acesso e comunicado pelo whatsapp de nossa programação.`}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">Qual a diferença entre o plano Membro e o Membro Ofertante?</AccordionTrigger>
            <AccordionContent>
              O plano Membro é voltado para consumidores, enquanto o Membro Ofertante é ideal para negócios sustentáveis. O Membro Ofertante tem benefícios adicionais como destaque nas buscas, mentorias online e ferramentas para promover seu negócio.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="cursor-pointer">Como funciona o Greenflix?</AccordionTrigger>
            <AccordionContent>
              O Greenflix é nossa plataforma de conteúdo exclusivo sobre sustentabilidade, disponível para Membros e Membros Ofertantes. Lá você encontrará vídeos, cursos e mentorias sobre práticas sustentáveis e economia verde. Todos os mês são é atualizada a lista de conteúdos!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="cursor-pointer">
              Quanto custa o plano Membro Ofertante?
            </AccordionTrigger>
            <AccordionContent>
              O plano Membro Ofertante começa a partir de R$ 125/mês. Temos uma oferta especial do Plano Reciprocidade para quem deseja um desconto de + de 50%.{' '}
              <a
                href="https://api.whatsapp.com/send/?phone=558588000440&text&type=phone_number&app_absent=0"
                className="text-blue-600 underline hover:text-blue-800 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clique aqui
              </a>{' '}
              para saber mais.
            </AccordionContent>
          </AccordionItem>


          <AccordionItem value="item-6">
            <AccordionTrigger className="cursor-pointer">Como posso cancelar minha assinatura?</AccordionTrigger>
            <AccordionContent>
              Você pode cancelar sua assinatura a qualquer momento através da sua área de membro no site ou aplicativo. Se precisar de ajuda, nossa equipe de suporte está disponível para auxiliá-lo no processo.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="cursor-pointer">Jornada Sustentável</AccordionTrigger>
            <AccordionContent>
              A Jornada Sustentável é um grupo fechado(Whatsapp) para membros que comunica diariamente, dicas, informações, sugestões de produtos e serviços. Além disso, temos atualizações sobre promoções disponíveis e desafios mensais que incentivam ações conscientes.  </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>


      {/* Floating Chat Button */}
      <div className="absolute flex justify-end right-6 bottom-16 bg-white rounded-2xl border-1 shadow-lg">
        <a
          href="https://wa.me/558588000440?text=Olá,%20gostaria%20de%20tirar%20umas%20dúvidas."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button size="lg" className="p-8 py-4 text-xl">
            <FaWhatsapp className=" mr-2 h-8 w-8" />
            Dúvidas
          </Button>
        </a>
      </div>
    </div>
  );
}

interface PlanFeatureProps {
  children: React.ReactNode;
  active?: boolean;
  light?: boolean;
}

function PlanFeature({ children, active = false, light = false }: PlanFeatureProps) {
  return (
    <div className="flex flex-col text-center">
      <p className={`${active ? '' : 'line-through'} ${light ? 'text-white font-bold' : 'text-gray-800'}`}>
        {children}
      </p>
      <Separator />
    </div>
  );
}
