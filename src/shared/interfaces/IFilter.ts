// Definindo as opções de cada tipo de filtro
export interface Option {
    id?: string; // Agora é obrigatório, evitando verificações desnecessárias
    label: string;
    value?: string; // Pode ser opcional
    area?: AreaOption; // Área é opcional para algumas opções
  }

  // Definindo a tipagem de Área para garantir consistência
  export interface AreaOption {
    id: string;
    color: string;
    bg: string;
    icon: string;
  }

  // Interface para as propriedades do componente Filter
  export interface FilterProps {
    block: boolean;
    description: string;
    options: Option[]; // Lista de opções de filtro
    selected: string;
    isArea: boolean;

    isState: boolean;
    isType: boolean;
    handleUrl: (selectedType: string, selectedArea: string, selectedState: string, searchQuery: string, value: number) => void;
    selectedArea: string;
    selectedState: string;
    searchQuery: string;
    selectedType: string;

  }
