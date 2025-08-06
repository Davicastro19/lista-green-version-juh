import httpService from '@/shared/api/fetcher';
import { preferences } from '@/shared/constants/options';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import * as yup from 'yup';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

const schema = yup.object().shape({
    tagName: yup.string().required('O nome da tag é obrigatório'),
    selectedAreas: yup.array().of(
        yup.object().shape({ value: yup.string().required(), label: yup.string().required() })
    ).min(1, 'Selecione pelo menos uma área').required(),
    selectedThemes: yup.array().of(
        yup.object().shape({ value: yup.string().required(), label: yup.string().required() })
    ).min(1, 'Selecione pelo menos um tema').required()
});

type OptionType = {
    value: string;
    label: string;
};

type FormData = {
    tagName: string;
    selectedAreas: OptionType[];
    selectedThemes: OptionType[];
};

const areaOptions: OptionType[] = [
    { value: 'Construção Sustentável', label: 'Construção Sustentável' },
    { value: 'Produção da Terra', label: 'Produção da Terra' },
    { value: 'Design Consciente', label: 'Design Consciente' },
    { value: 'Saúde & Bem-Estar', label: 'Saúde & Bem-Estar' },
    { value: 'Cuidado & Preservação', label: 'Cuidado & Preservação' },
];

function AddTagModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            tagName: '',
            selectedAreas: [],
            selectedThemes: []
        }
    });

    const selectedAreas = watch('selectedAreas');
    const selectedThemes = watch('selectedThemes');

    const [availableThemes, setAvailableThemes] = useState<OptionType[]>([]);

    const handleAreaSelection = (selectedOptions: MultiValue<OptionType>) => {
        const optionsArray = selectedOptions ? [...selectedOptions] : [];
        setValue('selectedAreas', optionsArray, { shouldValidate: true });
        const themes = selectedOptions.flatMap(option => preferences[option.value]);

        setAvailableThemes([...new Set(themes)].map(theme => ({ value: theme, label: theme })));
    };

    const handleThemeSelection = (selectedOptions: MultiValue<OptionType>) => {
        setValue('selectedThemes', selectedOptions ? [...selectedOptions] : [], { shouldValidate: true });
    };

    const onSubmit = async (data: FormData) => {
        try {
            await httpService.post('/tags', {
                area: data.selectedAreas.map(area => area.value),
                name: data.tagName,
                theme: data.selectedThemes.map(theme => theme.value),
            })
        } catch (error) {
            console.log(error)

        }
    };

    return isOpen ? (
        <AlertDialog open >
            <AlertDialogContent className="max-w-md p-6 bg-white overflow-auto ">
                <AlertDialogHeader>
                    <AlertDialogTitle>Nova tag</AlertDialogTitle>

                </AlertDialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <div>
                        <label className="block font-medium">Nome da tag</label>
                        <input {...register('tagName')} placeholder="Ex: Compostagem" className="w-full border rounded-md p-2" />
                        {errors.tagName && <p className="text-red-500 text-sm">{errors.tagName.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">Área de atuação</label>
                        <Select
                            isMulti
                            options={areaOptions}
                            onChange={handleAreaSelection}
                            value={selectedAreas}
                            placeholder="Selecione uma área"
                        />
                        {errors.selectedAreas && <p className="text-red-500 text-sm">{errors.selectedAreas.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">Temas</label>
                        <Select
                            isMulti
                            options={availableThemes}
                            onChange={handleThemeSelection}
                            value={selectedThemes}
                            placeholder="Selecione um tema"
                        />
                        {errors.selectedThemes && <p className="text-red-500 text-sm">{errors.selectedThemes.message}</p>}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-red-300 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                            Criar
                        </button>
                    </div>
                </form>

            </AlertDialogContent>
        </AlertDialog>
    ) : null;
}

export default AddTagModal;
