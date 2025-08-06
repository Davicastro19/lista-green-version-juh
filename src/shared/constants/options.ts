import { Option } from "../interfaces/IFilter";

interface AreaOption {
  id: string;
  color: string;
  bg: string;
  icon: string;
}

export const areaOptionsObj: Record<string, AreaOption> = {
  "Tudo": { id: '0', color: "#207a6b", bg: "#34b9a3", icon: "/images/favicon-32x32.png" },
  "Cuidado & Preservação": { id: '1', color: "#00D1FF", bg: "#004972", icon: "/images/assets/ui/icons/cuidadoepreservacao.png" },
  "Construção Sustentável": { id: '2', color: "#FFDEAC", bg: "#EB8D00", icon: "/images/assets/ui/icons/construcaosustentavel.png" },
  "Produção da Terra": { id: '3', color: "#A3FFA6", bg: "#33A838", icon: "/images/assets/ui/icons/producaodaterra.png" },
  "Design Consciente": { id: '4', color: "#FAE058", bg: "#ffca41", icon: "/images/assets/ui/icons/designconsciente.png" },
  "Saúde & Bem-Estar": { id: '5', color: "#eb8dff", bg: "#A162D3", icon: "/images/assets/ui/icons/saudeebemestar.png" },
};

export const areaOptions: Option[] = Object.entries(areaOptionsObj).map(([label, area]) => ({
  id: area.id, // Adiciona o id aqui
  value: label, // Você pode mapear o label para value, se necessário
  label,
  area
}));


export const states: Option[] = [
  { id: "", value: "", label: "Brasil" },
  { id: "AC", value: "AC", label: "Acre" },
  { id: "AL", value: "AL", label: "Alagoas" },
  { id: "AP", value: "AP", label: "Amapá" },
  { id: "AM", value: "AM", label: "Amazonas" },
  { id: "BA", value: "BA", label: "Bahia" },
  { id: "CE", value: "CE", label: "Ceará" },
  { id: "DF", value: "DF", label: "Distrito Federal" },
  { id: "ES", value: "ES", label: "Espírito Santo" },
  { id: "GO", value: "GO", label: "Goiás" },
  { id: "MA", value: "MA", label: "Maranhão" },
  { id: "MT", value: "MT", label: "Mato Grosso" },
  { id: "MS", value: "MS", label: "Mato Grosso do Sul" },
  { id: "MG", value: "MG", label: "Minas Gerais" },
  { id: "PA", value: "PA", label: "Pará" },
  { id: "PB", value: "PB", label: "Paraíba" },
  { id: "PR", value: "PR", label: "Paraná" },
  { id: "PE", value: "PE", label: "Pernambuco" },
  { id: "PI", value: "PI", label: "Piauí" },
  { id: "RJ", value: "RJ", label: "Rio de Janeiro" },
  { id: "RN", value: "RN", label: "Rio Grande do Norte" },
  { id: "RS", value: "RS", label: "Rio Grande do Sul" },
  { id: "RO", value: "RO", label: "Rondônia" },
  { id: "RR", value: "RR", label: "Roraima" },
  { id: "SC", value: "SC", label: "Santa Catarina" },
  { id: "SP", value: "SP", label: "São Paulo" },
  { id: "SE", value: "SE", label: "Sergipe" },
  { id: "TO", value: "TO", label: "Tocantins" },
];


export const contentTypes: { id: string; label: string; icon: string }[] = [
  { id: 'todos', label: 'Todos', icon: 'ListTodo' },
  { id: 'negócios', label: 'Negócios', icon: 'Building2' },
  { id: 'artigos', label: 'Artigos', icon: 'BookText' },
  { id: 'listas', label: 'Listas', icon: 'ListTodo' },
];
export const optionsArea = [
  { value: "Cuidado & Preservação", label: "Cuidado & Preservação" },
  { value: "Construção Sustentável", label: "Construção Sustentável" },
  { value: "Produção da Terra", label: "Produção da Terra" },
  { value: "Design Consciente", label: "Design Consciente" },
  { value: "Saúde & Bem-Estar", label: "Saúde & Bem-Estar" },
];


export const initialInterests = [
  { value: "energia_renovavel", label: "Energia Renovável" },
  { value: "arquitetura_e_engenharia", label: "Arquitetura e Engenharia" },
  { value: "consumo_local", label: "Consumo Local" },
  { value: "organicos", label: "Orgânicos" },
  { value: "agro", label: "Agro" },
  { value: "moda", label: "Moda" },
  { value: "lixo_zero", label: "Lixo Zero" },
  { value: "criativo_natural", label: "Criativo Natural" },
  { value: "cosmeticos", label: "Cosméticos" },
  { value: "terapia_hidrica", label: "Terapia Hídrica" },
  { value: "corpo_e_mente", label: "Corpo e Mente" },
  { value: "educacao", label: "Educação" }
];


export const preferences: { [key: string]: string[] } = {
  "Construção Sustentável": [
    "Energia Renovável",
    "Bioconstrução",
    "Arquitetura e Engenharia"
  ],
  "Produção da Terra": [
    "Consumo Local",
    "Orgânicos",
    "Agro"
  ],
  "Design Consciente": [
    "Moda",
    "Lixo Zero",
    "Criativo Natural"
  ],
  "Saúde & Bem-Estar": [
    "Cosméticos",
    "Terapia Holística",
    "Corpo e Mente"
  ],
  "Cuidado & Preservação": [
    "Educação",
    "Vegetação Nativa",
    "Social e Ambiental"
  ]
};
