/* eslint-disable @typescript-eslint/no-explicit-any */
import { startButtons } from '@/shared/constants/card';
import { Option } from '@/shared/interfaces/IFilter';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface SearchFormProps {
    initialValues: {
        areas: string[];
        text: string;
        state: string;
    };
    onSearch: (values: any) => void;
    areaOptions: Option[];
    stateOptions: Option[];
    type: string
}



const SearchForm: React.FC<SearchFormProps> = ({
    initialValues,
    onSearch,
    areaOptions,
    stateOptions,
    type
}) => {
    const [formValues, setFormValues] = useState({
        areas: initialValues.areas || [],
        text: initialValues.text || '',
        state: initialValues.state || ''
    });
    const handleAreaClick = (value: string) => {
        if (value === 'Tudo') {
            setFormValues(prev => {
                const updated = { ...prev, areas: [] };
                onSearch(updated);
                return updated;
            });
        } else {
            const newAreas = formValues.areas.includes(value)
                ? formValues.areas.filter(a => a !== value)
                : [...formValues.areas, value];

            setFormValues(prev => {
                const updated = { ...prev, areas: newAreas };
                onSearch(updated);
                return updated;
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'state') {
                onSearch(updated);
            }
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(formValues);
    };
    useEffect(() => {
        setFormValues({
            areas: initialValues.areas || [],
            text: initialValues.text || '',
            state: initialValues.state || ''
        });
    }, [initialValues]);
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Selecione a área de interesse</h2>
                <div className="flex flex-wrap gap-3 w-full justify-around">
                    {areaOptions.map(option => {

                        const selected = formValues.areas.includes(option.value?.toString() || '') || ((formValues.areas.length === 0 && option.value === 'Tudo') ? true : false)
                        const sh = startButtons[option.label?.replace(' e ', ' & ').toLowerCase() || '']

                        return (
                            <Button style={{ boxShadow: `0px 1px 2px 0px ${sh}` }}
                                key={option.id}
                                // disabled={block}
                                className={`cursor-pointer flex items-center space-x-0 border border-gray-300  px-2 lg:px-8 py-2 transition-all text-[var(--foreground)] rounded-full
${selected ? "border-[var(--darkgreen)] bg-[var(--darkgreen)] text-[var(--background)] shadow-[0px_1px_3px_0px_var(--darkgreen)]" : ""}
                                    `}
                                //
                                onClick={() => handleAreaClick(option.value?.toString() || '')}
                            >
                                <img src={sh?.icon || '/images/favicon-32x32.png'} alt={option.label} className="h-6 w-6 rounded-full" style={{ backgroundColor: option?.area?.bg, boxShadow: `0px 1px 4px 0px ${sh?.color || ''}` }} />
                                <span className="hidden md:inline-block text-sm font-medium">{option.label}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Digite palavras-chave para refinar sua busca</h2>
                <form onSubmit={handleSubmit} className="flex gap-4 flex-col lg:flex-row">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            name="text"
                            value={formValues.text}
                            onChange={handleChange}
                            placeholder="Digite sua busca..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {type !== 'lists' &&
                        <select
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                            {stateOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    }
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                    >
                        Buscar
                    </button>
                </form>
            </div>
        </div >
    );
};

export default SearchForm;
