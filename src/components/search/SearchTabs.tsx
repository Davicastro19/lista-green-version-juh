import { Building2, ListChecks } from 'lucide-react';
import React from 'react';

interface SearchTabsProps {
    activeTab: 'lists' | 'companies';
    onTabChange: (tab: 'lists' | 'companies') => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-gray-200 w-full">


            <button
                className={`flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors   w-full duration-200 border-b-2 ${activeTab === 'companies'
                    ? 'text-[var(--basegreen)] border-[var(--basegreen)]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                onClick={() => onTabChange('companies')}
            >
                <Building2 className="w-5 h-5 mr-2" />
                Negócios
            </button>
            <button
                className={`flex items-center justify-center  px-4 py-3  w-full text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === 'lists'
                    ? 'text-[var(--basegreen)] border-[var(--basegreen)]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                onClick={() => onTabChange('lists')}
            >
                <ListChecks className="w-5 h-5 mr-2" />
                Listas
            </button>
        </div>
    );
};

export default SearchTabs;
