/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { optionsArea } from "@/shared/constants/options";
import { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

const preferences: { [key: string]: string[] } = {
  "Construção Sustentável": ["Energia Renovável", "Bioconstrução", "Arquitetura e Engenharia"],
  "Produção da Terra": ["Consumo Local", "Orgânicos", "Agro"],
  "Design Consciente": ["Moda", "Lixo Zero", "Criativo Natural"],
  "Saúde & Bem-Estar": ["Cosméticos", "Terapia Holística", "Corpo e Mente"],
  "Cuidado & Preservação": ["Educação", "Vegetação Nativa", "Social e Ambiental"],
};

export function NewFilterCompanies({
  isOpen,
  onClose,
  setArea,
  setTags,
  setThemes,
  setIsMember,
  setIsNew
}: any) {
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectedTemas, setSelectedTemas] = useState<any[]>([]);
  const [availableThemes, setAvailableThemes] = useState<{ value: string; label: string }[]>([]);
  const [tagsOptions, setTagsOptions] = useState<{ value: string; label: string }[]>([]);


  useEffect(() => {
    setArea(selectedAreas.map((area) => area.value));
    setTags(selectedTags.map((tag: any) => tag.value));
    setThemes(selectedTemas.map((tema: any) => tema.value));
  }, [selectedAreas, selectedTags, selectedTemas]);

  const handleSelectChange = (selectedOptions: any, setSelected: any) => {
    setSelected(selectedOptions);
  };

  const fetchTags = async () => {

    try {
      const response = await fetch("/api/tags/getAll?all=true");
      const { data } = await response.json();

      const transformedTags = data.map((tag: { _id: string; name: string }) => ({
        value: tag._id,
        label: tag.name,
      }));
      setTagsOptions(transformedTags);
    } catch (error) {
      console.error("Erro ao buscar tags", error);
    } finally {

    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAreaSelection = (
    newValue: MultiValue<{ value: string; label: string }>,
    //actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selectedOptions = newValue.map((option) => option);
    setSelectedAreas(selectedOptions);
    const themes = selectedOptions.flatMap((option) => preferences[option.value] || []);
    setAvailableThemes([...new Set(themes)].map((theme) => ({ value: theme, label: theme })));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-white max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Filtro</DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <div className="space-y-4">
          <Select
            isMulti
            value={selectedAreas}
            options={optionsArea as any}
            onChange={handleAreaSelection}
            placeholder="Selecionar áreas"
          />
          <Select
            isMulti
            options={availableThemes as any}
            value={selectedTemas}
            noOptionsMessage={() => "Selecione uma área"}
            onChange={(value) => handleSelectChange(value, setSelectedTemas)}
            placeholder="Temas das tags"
          />
          <Select
            isMulti
            options={tagsOptions as any}
            value={selectedTags}
            onChange={(value) => handleSelectChange(value, setSelectedTags)}
            placeholder="Selecione as tags"
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2">
              <Checkbox onCheckedChange={setIsNew} />
              <span>Novos</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox onCheckedChange={setIsMember} />
              <span>Membro</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>Limpar</Button>
          <Button onClick={onClose}>Aplicar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
