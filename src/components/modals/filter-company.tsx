/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { optionsArea } from "@/shared/constants/options";
import { useEffect, useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

const preferences: { [key: string]: string[] } = {
  "Construção Sustentável": ["Energia Renovável", "Bioconstrução", "Arquitetura e Engenharia"],
  "Produção da Terra": ["Consumo Local", "Orgânicos", "Agro"],
  "Design Consciente": ["Moda", "Lixo Zero", "Criativo Natural"],
  "Saúde & Bem-Estar": ["Cosméticos", "Terapia Holística", "Corpo e Mente"],
  "Cuidado & Preservação": ["Educação", "Vegetação Nativa", "Social e Ambiental"],
};

export function FilterAlertDialog({
  isOpen,
  onClose,
  areas,
  setArea,
  tags,
  setTags,
  themes,
  setThemes,
  isMember,
  setIsMember,
  isNew,
  setIsNew
}: any) {
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [selectedTemas, setSelectedTemas] = useState<any>([]);
  const [availableThemes, setAvailableThemes] = useState<{ value: string; label: string }[]>([]);
  const [tagsOptions, setTagsOptions] = useState<{ value: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setArea(selectedAreas.map((area) => area.value));
    setTags(selectedTags.map((tag: any) => tag.value));
    setThemes(selectedTemas.map((tema: any) => tema.value));

  }, [selectedAreas, selectedTags, selectedTemas]);

  const handleSelectChange = (selectedOptions: any, setSelected: any) => {
    setSelected(selectedOptions);
  };


  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tags/getAll?all=true");
      const { data } = await response.json();

      const transformedTags = data.map(
        (tag: { _id: string; name: string }) => ({
          value: tag._id,
          label: tag.name,
        })
      );
      setTagsOptions(transformedTags);
    } catch (error) {
      console.error("Erro ao buscar tags", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const handleAreaSelection = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selectedOptions = newValue.map((option) => option); // Convertendo de MultiValue para any[]
    setSelectedAreas(selectedOptions);
    const themes = selectedOptions.flatMap(
      (option) => preferences[option.value]
    );
    setAvailableThemes(
      [...new Set(themes)].map((theme) => ({ value: theme, label: theme }))
    );

  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>Filtro</AlertDialogTitle>
          <AlertDialogDescription>Selecione suas preferências para filtrar os resultados.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <Select isMulti value={selectedAreas} options={optionsArea as any} onChange={handleAreaSelection} placeholder="Selecionar áreas" />
          <Select isMulti options={availableThemes as any} value={selectedTemas} noOptionsMessage={() => "Selecione uma área"} onChange={(value: any) => handleSelectChange(value, setSelectedTemas)} placeholder="Temas das tags" />
          <Select isMulti options={tagsOptions as any} value={selectedTags} onChange={(value: any) => handleSelectChange(value, setSelectedTags)} placeholder="Selecione as tags" />
          <div className="flex justify-between">
            <label className="flex items-center gap-2">
              <Checkbox onCheckedChange={(checked: any) => setIsNew(checked)} />
              Novos
            </label>
            <label className="flex items-center gap-2">
              <Checkbox onCheckedChange={(checked: any) => setIsMember(checked)} />
              Membro
            </label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Limpar</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Aplicar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
