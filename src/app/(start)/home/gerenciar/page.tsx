'use client'
import useFetch from '@/shared/api/swrfetcher';
import { Building2, ChevronLeft, ListChecks, Newspaper, Tags, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface Statistics {
  banners: {
    total: number;
  };
  companies: {
    total: number;
    withImageAndDescription: number;
    withoutImageOrDescription: number;
    businessTypeDistribution: Array<{ _id: string; count: number }>;
    workTypeDistribution: Array<{ _id: string; count: number }>;
    nationwide: number;
  };
  lists: {
    total: number;
    withImageAndDescription: number;
    areaDistribution: Array<{ _id: string; count: number }>;
    avgCompaniesPerList: number;
    recentLists: number;
  };
  tags: {
    total: number;

  };
  users: {
    total: number;
    active: number;
    verified: number;
    userTypeDistribution: Array<{ _id: string; count: number }>;
    avgInterestsPerUser: number;
    recentUsers: number;
  };
}

function App() {
  const router = useRouter();
  const { data, error, isLoading } = useFetch<Statistics>('/statistics');

  const cards = [
    {
      title: 'Usuários',
      icon: Users,
      mainStat: data?.users.total || 0,
      subStats: [
        { label: 'Ativos', value: data?.users.active || 0 },
        { label: 'Verificados', value: data?.users.verified || 0 }
      ],
      color: 'from-basegreen to-glowgreen',
      path: '/home/gerenciar/usuarios'
    },
    {
      title: 'Tags',
      icon: Tags,
      mainStat: data?.tags.total || 0,
      color: 'from-darkgreen to-basegreen',
      path: '/home/gerenciar/tags'
    },
    {
      title: 'Banners',
      icon: Newspaper,
      mainStat: data?.banners.total || 0,
      color: 'from-darkgreen to-basegreen',
      path: '/home/gerenciar/banners'
    },
    {
      title: 'Listas',
      icon: ListChecks,
      mainStat: data?.lists.total || 0,
      subStats: [
        { label: 'Com Imagem', value: data?.lists.withImageAndDescription || 0 },
        { label: 'Negócios/Lista', value: data?.lists.avgCompaniesPerList || 0 }
      ],
      color: 'from-darkgreen2 to-darkgreen',
      path: '/home/gerenciar/tags'
    },
    {
      title: 'Negócios',
      icon: Building2,
      mainStat: data?.companies.total || 0,
      subStats: [
        { label: 'Completos', value: data?.companies.withImageAndDescription || 0 },
        { label: 'Nacional', value: data?.companies.nationwide || 0 }
      ],
      color: 'from-glowgreen to-lightgreen',
      path: '/home/gerenciar/negocios'
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-graygreen p-6 md:p-8 flex items-center justify-center">
        <div className="text-foreground text-xl">Erro ao carregar estatísticas</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graygreen p-6 md:p-8">
        <button onClick={() => router.push('/home')} className="pr-0 cursor-pointer  flex flex-row text-gray-600 hover:text-gray-800 w-[13%]">
            <ChevronLeft /> <span className='hidden lg:block'>Início</span>
          </button>
      <div className="max-w-7xl mx-auto p pb-10 lg:pb-0">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Gerenciar
        </h1>
        <p className="text-darkgreen2 mb-8">
          Edite, Crie e visualize todas as informações cadastradas na plataforma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => router.push(card.path)}
              className=" cursor-pointer group relative bg-background rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              <div className="relative flex flex-col items-center">
                <div className="p-3 rounded-full bg-graygreen2 group-hover:bg-background transition-colors duration-300">
                  <card.icon className="w-8 h-8 text-basegreen group-hover:text-glowgreen" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <div className="mt-2 text-3xl font-bold text-darkgreen">
                  {isLoading ? "..." : card.mainStat.toLocaleString()}
                </div>
                {card.subStats && (
                  <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                    {card.subStats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm text-darkgreen2">{stat.label}</div>
                        <div className="text-lg font-semibold text-darkgreen">
                          {isLoading ? "..." : stat.value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
